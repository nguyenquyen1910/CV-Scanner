from sqlalchemy.orm import Session
from src.models.analyst_result import AnalystResult
from src.models.jd import JobDescription
from src.models.cv import CV
from src.extract.llm_extractor import LLMExtractor
from typing import Dict, List
from src.models.education import Education
from src.models.experience import Experience
from src.models.skill import Skill
from src.models.certificate import Certificate
from src.models.project import Project
import json
from datetime import datetime


class AnalystMatchingService:
    def __init__(self, db: Session):
        self.db = db
        self.llm_extractor = LLMExtractor()

    def analyze_cv_jd(self, cv_id: int, jd_id: int) -> Dict:
        cv = self.db.query(CV).filter(CV.id == cv_id).first()
        jd = self.db.query(JobDescription).filter(JobDescription.id == jd_id).first()

        if not cv or not jd:
            raise ValueError("CV or JD not found")

        education_list = self.db.query(Education).filter(Education.cv_id == cv_id).all()
        experience_list = (
            self.db.query(Experience).filter(Experience.cv_id == cv_id).all()
        )
        skill_list = self.db.query(Skill).filter(Skill.cv_id == cv_id).all()
        certificate_list = (
            self.db.query(Certificate).filter(Certificate.cv_id == cv_id).all()
        )
        project_list = self.db.query(Project).filter(Project.cv_id == cv_id).all()

        cv_text = {
            "base_information": {
                "fullname": cv.full_name,
                "email": cv.email,
                "phone": cv.phone,
                "gender": cv.gender,
                "date_of_birth": cv.date_of_birth,
                "address": cv.address,
                "summary": cv.summary,
            },
            "education": json.loads(self._format_education(education_list)),
            "experience": json.loads(self._format_experience(experience_list)),
            "skills": json.loads(self._format_skills(skill_list)),
            "certificates": json.loads(self._format_certificates(certificate_list)),
            "projects": json.loads(self._format_projects(project_list)),
        }

        cv_text = json.dumps(cv_text, ensure_ascii=False, indent=2)

        jd_text = self._format_jd(jd)

        prompt = """
            Bạn là một trợ lý AI chuyên đánh giá CV ứng viên theo Mô tả công việc (JD) để xác định mức độ phù hợp. CV và JD được cung cấp dưới định dạng JSON, chứa dữ liệu có cấu trúc về thông tin cơ bản, học vấn, kỹ năng, kinh nghiệm, dự án và chứng chỉ. Nhiệm vụ của bạn là so sánh các trường này, tính điểm cho học vấn, kinh nghiệm, kỹ năng và chứng chỉ, rồi trả về kết quả dạng JSON với điểm số và nhận xét ngắn gọn. Đánh giá cần nhanh, chính xác và được tối ưu hóa cho tìm kiếm và ra quyết định.

            ### Định dạng đầu vào:
            CV và JD đều ở định dạng JSON với cấu trúc sau:
            - CV: `base_information`, `education, skills`, `experience`, `projects`, `certificates`
            - JD: `job_title`, `level`, `required_education, experience_years, required_skills, required_certificates

            ### Hướng dẫn đánh giá chi tiết:

            1. **Thông tin cơ bản (Basic Information)**:
            - Sử dụng `base_information.summary` để đánh giá sự phù hợp với `job_title` của JD 
            - Không tính điểm cho phần này, nhưng đưa mục tiêu nghề nghiệp và tư duy vào nhận xét
            - Nếu `base_information.summary` không được cung cấp, đánh giá dựa trên thông tin từ các trường khác

            2. **Học vấn (Education)**:
            - So sánh `education` với `required_education` (loại bằng cấp, lĩnh vực)
            - Tính điểm (0-100):
                - +60: Bằng cấp và lĩnh vực khớp chính xác
                - +30: Lĩnh vực liên quan
                - +10: Thành tích học tập nổi bật
            - Nếu CV có nhiều bằng cấp, ưu tiên bằng có liên quan nhất đến vị trí công việc
            - **Quy tắc so khớp lĩnh vực**:
                - Lĩnh vực CNTT: Khoa học máy tính, Kỹ thuật phần mềm, Công nghệ thông tin, Khoa học dữ liệu, An ninh mạng
                - Nếu JD yêu cầu lĩnh vực cụ thể (ví dụ: Khoa học máy tính) nhưng CV có lĩnh vực liên quan (ví dụ: Kỹ thuật phần mềm), tính +30 điểm

            3. **Kinh nghiệm (Experience)**:
            - Tính tổng số năm kinh nghiệm từ `experience` dựa vào `start_date` và `end_date`
                - Nếu `end_date` là "Hiện tại" hoặc "Present", sử dụng ngày hiện tại 
            - So sánh với `experience_years` trong JD
            - Tính điểm (0-100):
                - +10 điểm/năm kinh nghiệm liên quan (tối đa 50)
                - +30: Đáp ứng/vượt yêu cầu năm kinh nghiệm
                - +20: Vị trí Senior/Lead (với JD cấp Senior)
                - +10: Kinh nghiệm ở công ty lớn/nổi tiếng
            - Nếu có nhiều vị trí kinh nghiệm, ưu tiên các vị trí gần đây và liên quan hơn

            4. **Kỹ năng (Skills)**:
            - So sánh kỹ năng trong CV với JD, đánh giá mức độ thành thạo (Beginner=1 → Expert=4)
            - **Tính điểm (0-100)**:
                - +15 điểm cho mỗi `required_skill` phù hợp, tối đa 60 điểm
                - +5 điểm cho mỗi `optional_skill` phù hợp, tối đa 20 điểm
                - +10 điểm cho `technologies` phù hợp trong `projects` (ưu tiên 2 kỹ năng đầu tiên)
                - +10 điểm cho kỹ năng có nhiều giá trị `source` (thể hiện qua nhiều nguồn)
            - **Xử lý đồng nghĩa**: 
                - Nhận diện các kỹ năng đồng nghĩa (VD: "JavaScript" và "JS", "ReactJS" và "React")
                - Các kỹ năng trong cùng một họ có thể được tính là liên quan

            5. **Chứng chỉ (Certificates)**:
            - Tính điểm (0-100):
                - +25 điểm/chứng chỉ khớp (tối đa 50)
                - +10: Chứng chỉ có kỹ năng khớp với yêu cầu (tối đa 20)
                - +15: Chứng chỉ cấp cao hoặc cập nhật (<3 năm)
            - **Xử lý đồng nghĩa chứng chỉ**:
                - Nhận diện các tên chứng chỉ khác nhau nhưng cùng giá trị 

            6. **Tổng điểm (Total Score)**:
            - **Senior/Middle**: 
                - `total_score` = (0.25 * `education_score`) + (0.35 * `experience_score`) + (0.30 * `skill_score`) + (0.10 * `certificate_score`)
            - **Junior**: 
                - `total_score` = (0.25 * `education_score`) + (0.20 * `experience_score`) + (0.45 * `skill_score`) + (0.10 * `certificate_score`)
            - **Intern/Fresher**:
                - `total_score` = (0.30 * `education_score`) + (0.10 * `experience_score`) + (0.50 * `skill_score`) + (0.10 * `certificate_score`)
            - Điều chỉnh ±10 điểm cho các yếu tố đặc biệt:
                - +5->10 điểm cho thành tích nổi bật
                - -5->10 điểm cho thiếu kỹ năng bắt buộc
            - Giới hạn trong khoảng 0-100
            - **Ngưỡng phân loại**:
                - Phân loại: Senior (≥70), Middle (≥50), Junior (≥30), Intern/Fresher (≥20)

            7. **Nhận xét (Comment)**:
            - Cung cấp nhận xét ngắn gọn (80-120 từ) có cấu trúc:
                - Điểm mạnh nổi bật của ứng viên
                - Điểm còn thiếu hoặc cần cải thiện so với yêu cầu JD.
                - Đánh giá mức độ phù hợp tổng thể với vị trí JD.
            - Gợi ý các lĩnh vực cần phát triển để ứng viên phù hợp hơn trong tương lai

            CV:
            {cv_text}
            JD:
            {jd_text}

            Vui lòng trả về kết quả theo định dạng JSON sau:
            {{
                "fullname": tên ứng viên,
                "company": tên công ty,
                "location": vị trí công việc,
                "education_score": điểm từ 0-100,
                "experience_score": điểm từ 0-100,
                "skill_score": điểm từ 0-100,
                "certificate_score": điểm từ 0-100,
                "total_score": điểm từ 0-100 (tổng điểm dựa trên education_score, experience_score, skill_score, certificate_score và kiến thức tổng thể của ứng viên so với yêu cầu JD),
                "comment": "Đánh giá chi tiết về kiến thức, kinh nghiệm, kỹ năng và sự phù hợp của ứng viên với công ty, những điểm công ty đánh giá chưa cao"
            }}
        """

        result = self.llm_extractor.analyst_result(prompt, cv_text, jd_text)
        result["fullname"] = cv.full_name
        result["company"] = jd.company
        result["location"] = jd.title

        analyst_result = AnalystResult(
            cv_id=cv_id,
            jd_id=jd_id,
            education_score=result["education_score"],
            experience_score=result["experience_score"],
            skill_score=result["skill_score"],
            certificate_score=result["certificate_score"],
            total_score=result["total_score"],
            comment=result["comment"],
            created_at=datetime.now(),
        )

        self.db.add(analyst_result)
        self.db.commit()
        self.db.refresh(analyst_result)

        return analyst_result

    def _format_education(self, education_list) -> str:
        educations = []

        for edu in education_list:
            education = {
                "school": edu.school,
                "degree": edu.degree,
                "major": edu.major,
                "start_year": edu.start_year,
                "end_year": edu.end_year,
                "description": edu.description,
            }
            educations.append(education)
        return json.dumps(educations, ensure_ascii=False, indent=2)

    def _format_experience(self, experience_list) -> str:
        experiences = []

        for exp in experience_list:
            if not self._validate_date(exp.start_date) or not self._validate_date(
                exp.end_date
            ):
                continue

            experience = {
                "position": exp.position,
                "company": exp.company,
                "start_date": exp.start_date,
                "end_date": exp.end_date,
                "description": exp.description,
                "duration": self._calculate_duration(exp.start_date, exp.end_date),
            }
            experiences.append(experience)

        return json.dumps(experiences, ensure_ascii=False, indent=2)

    def _validate_date(self, date_str: str) -> bool:
        if not date_str:
            return False
        if len(date_str.split("-")) == 3:
            try:
                return True
            except:
                return False
        elif len(date_str.split("-")) == 2:
            try:
                month, year = map(int, date_str.split("-"))
                if month < 1 or month > 12:
                    return False
                if year < 1900 or year > 2100:
                    return False
                return True
            except:
                return False
        else:
            try:
                year = int(date_str)
                if year < 1900 or year > 2100:
                    return False
                return True
            except:
                return False
        return False

    def _calculate_duration(self, start_date, end_date) -> str:
        if not start_date or not end_date:
            return "N/A"

        try:
            if len(start_date.split("-")) == 3:
                start_month, start_year = map(int, start_date.split("-"))
            elif len(start_date.split("-")) == 2:
                start_month, start_year = map(int, start_date.split("-"))
            else:
                start_year = int(start_date)
                start_month = 1

            if len(end_date.split("-")) == 3:
                end_month, end_year = map(int, end_date.split("-"))
            elif len(end_date.split("-")) == 2:
                end_month, end_year = map(int, end_date.split("-"))
            else:
                end_year = int(end_date)
                end_month = 1
            total_months = (end_year - start_year) * 12 + (end_month - start_month)
            years = total_months // 12
            months = total_months % 12
            duration = []
            if years > 0:
                duration.append(f"{years} năm")
            if months > 0:
                duration.append(f"{months} tháng")
            return " ".join(duration) if duration else "Dưới 1 tháng"
        except:
            return "N/A"

    def _format_skills(self, skills_list) -> str:
        skill_groups = {
            "expert": [],
            "advanced": [],
            "intermediate": [],
            "beginner": [],
        }

        for skill in skills_list:
            level = skill.level.lower()
            if "expert" in level or "master" in level:
                skill_groups["expert"].append(skill.skill_name)
            elif "advanced" in level or "senior" in level:
                skill_groups["advanced"].append(skill.skill_name)
            elif "intermediate" in level or "mid" in level:
                skill_groups["intermediate"].append(skill.skill_name)
            else:
                skill_groups["beginner"].append(skill.skill_name)

        return json.dumps(skill_groups, ensure_ascii=False, indent=2)

    def _format_certificates(self, certificates_list) -> list:
        return json.dumps(
            [
                {
                    "name": cert.name,
                    "organization": cert.organization,
                    "issued_date": cert.issued_date,
                    "description": cert.description,
                }
                for cert in certificates_list
            ],
            ensure_ascii=False,
            indent=2,
        )

    def _format_projects(self, projects_list) -> list:
        projects = []
        for prj in projects_list:
            tech_list = [tech.strip() for tech in prj.technologies.split(",")]
            project = {
                "name": prj.name,
                "role": prj.role,
                "period": {"start": prj.start_date, "end": prj.end_date},
                "description": prj.description,
                "technologies": {
                    "main_tech": tech_list[:3] if len(tech_list) > 3 else tech_list,
                    "all_tech": tech_list,
                },
                "responsibilities": (
                    [res.strip() for res in prj.description.split(".") if res.strip()]
                    if prj.description
                    else []
                ),
            }
            projects.append(project)
        return json.dumps(projects, ensure_ascii=False, indent=2)

    def _format_jd(self, jd: JobDescription) -> str:
        jd_text = {
            "title": jd.title,
            "company": jd.company,
            "description": jd.description,
            "requirements": jd.requirements,
            "education_requirements": jd.education_requirements,
            "experience_requirements": jd.experience_requirements,
            "skill_requirements": jd.skill_requirements,
        }
        return json.dumps(jd_text, ensure_ascii=False, indent=2)

    def get_analyst_result(self, cv_id: int, jd_id: int) -> Dict:
        result = (
            self.db.query(AnalystResult)
            .filter(AnalystResult.cv_id == cv_id, AnalystResult.jd_id == jd_id)
            .first()
        )

        if result:
            cv = self.db.query(CV).filter(CV.id == cv_id).first()
            jd = (
                self.db.query(JobDescription).filter(JobDescription.id == jd_id).first()
            )

            result_dict = {
                "id": result.id,
                "cv_id": result.cv_id,
                "jd_id": result.jd_id,
                "fullname": cv.full_name if cv else None,
                "company": jd.company if jd else None,
                "location": jd.title if jd else None,
                "education_score": result.education_score,
                "experience_score": result.experience_score,
                "skill_score": result.skill_score,
                "certificate_score": result.certificate_score,
                "total_score": result.total_score,
                "comment": result.comment,
                "created_at": result.created_at,
            }
        return result_dict

    def save_analyst_result(self, analyst_result: AnalystResult):
        self.db.add(analyst_result)
        self.db.commit()
        self.db.refresh(analyst_result)
        return analyst_result

    def get_all_analyst_results(self) -> List[AnalystResult]:
        return self.db.query(AnalystResult).all()

    def get_analyst_result_by_jd(self, jd_id: int) -> List[AnalystResult]:
        return self.db.query(AnalystResult).filter(AnalystResult.jd_id == jd_id).all()

    def get_analyst_result_by_jd(self, jd_id: int) -> List[AnalystResult]:
        return self.db.query(AnalystResult).filter(AnalystResult.jd_id == jd_id).all()

# CV Scanner Project

## 🚀 Giới thiệu

**CV Scanner Project** là một hệ thống backend ứng dụng AI (GPT-4.1) để tự động hóa quy trình xử lý, phân tích và đánh giá mức độ phù hợp giữa CV ứng viên và mô tả công việc (JD). Dự án hướng tới việc hỗ trợ các doanh nghiệp, nhà tuyển dụng tối ưu hóa quy trình tuyển dụng, tiết kiệm thời gian và nâng cao chất lượng sàng lọc ứng viên.

---

## 🎯 Mục tiêu dự án

- Tự động hóa việc thu thập, trích xuất, lưu trữ và quản lý thông tin CV.
- Sử dụng AI để đánh giá, so sánh mức độ phù hợp giữa CV và JD một cách khách quan, nhanh chóng.
- Hỗ trợ nhà tuyển dụng ra quyết định chính xác hơn dựa trên dữ liệu và phân tích AI.
- Dễ dàng tích hợp vào các hệ thống tuyển dụng hiện có.

---

## 🏗️ Quy trình hoạt động (Workflow)

1. **Upload CV:** Người dùng upload file CV (PDF) lên hệ thống qua API.
2. **Trích xuất thông tin:** Hệ thống tự động trích xuất các trường thông tin quan trọng từ CV: học vấn, kinh nghiệm, kỹ năng, chứng chỉ, dự án...
3. **Lưu trữ:** Thông tin CV và JD được lưu vào database PostgreSQL.
4. **So sánh & Đánh giá:** Khi cần, hệ thống sử dụng AI (GPT-4.1) để so sánh một CV với một JD, trả về điểm số và nhận xét tự động.
5. **Lưu kết quả phân tích:** Kết quả phân tích (điểm số, nhận xét) được lưu lại để tra cứu, báo cáo hoặc phục vụ các bước tuyển dụng tiếp theo.

---

## 🛠️ Công nghệ sử dụng

- **Python 3.8+**
- **FastAPI** — Xây dựng RESTful API hiện đại, hiệu suất cao
- **SQLAlchemy** — ORM cho thao tác database
- **PostgreSQL** — Lưu trữ dữ liệu
- **Azure OpenAI GPT-4.1** — Phân tích, đánh giá AI
- **Swagger UI** — Tài liệu & thử nghiệm API trực quan
- **pytest** — Unit test

---

## 📂 Cấu trúc dự án

```
CV Scanner Project/
│
├── src/
│   ├── api/
│   │   ├── main.py
│   │   ├── upload.py
│   │   └── routers/
│   │       ├── cv_router.py
│   │       ├── jd_router.py
│   │       └── result_router.py
│   ├── database/
│   │   └── database.py
│   ├── models/
│   │   ├── base.py
│   │   ├── cv.py
│   │   ├── jd.py
│   │   ├── analyst_result.py
│   │   └── ...
│   └── services/
│       ├── cv_database_service.py
│       ├── jd_service.py
│       ├── analyst_matching_service.py
│       └── ...
│
├── test/
│   ├── test_analyst_matching.py
│   └── result_jsons/
│
├── requirements.txt
├── README.md
└── .env (nếu có)
```

---

## ⚙️ Hướng dẫn cài đặt & chạy dự án

### 1. Clone dự án

```bash
git clone https://github.com/yourusername/cv-scanner-project.git
cd cv-scanner-project
```

### 2. Tạo và kích hoạt virtual environment

```bash
python -m venv venv
# Trên Windows:
venv\Scripts\activate
# Trên Linux/Mac:
source venv/bin/activate
```

### 3. Cài đặt dependencies

```bash
pip install -r requirements.txt
```

### 4. Cấu hình biến môi trường

Tạo file `.env` hoặc export biến môi trường:

- `GITHUB_TOKEN`: API key cho AI service (hoặc key tương ứng)
- Cấu hình database trong `src/database/database.py` nếu cần.

### 5. Khởi tạo database

- Đảm bảo PostgreSQL đã chạy.
- Tạo database và các bảng (có thể dùng Alembic hoặc SQLAlchemy).

### 6. Chạy server FastAPI

```bash
uvicorn src.api.main:app --reload
```

Truy cập tài liệu API tại: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🌟 Tính năng nổi bật

- **Upload & Trích xuất CV:** Hỗ trợ upload file PDF, tự động trích xuất thông tin học vấn, kinh nghiệm, kỹ năng, chứng chỉ, dự án...
- **Quản lý CV & JD:** Lưu trữ, tìm kiếm, phân trang, xóa, truy vấn chi tiết CV và JD.
- **So sánh & Đánh giá AI:** Sử dụng GPT-4.1 để phân tích, chấm điểm mức độ phù hợp giữa CV và JD, trả về nhận xét tự động.
- **Lưu trữ kết quả:** Lưu lại toàn bộ kết quả phân tích vào database, dễ dàng tra cứu lịch sử.
- **API RESTful:** Thiết kế chuẩn REST, dễ dàng tích hợp với các hệ thống khác.
- **Swagger UI:** Tự động sinh tài liệu API, hỗ trợ test trực tiếp trên trình duyệt.

---

## 🧩 Mô tả chi tiết các module

### 1. **API Layer (FastAPI)**

- Định nghĩa các endpoint RESTful cho upload, lưu, truy vấn CV/JD, phân tích AI, lấy kết quả.
- Swagger UI tự động sinh tài liệu API.

### 2. **Database Layer (SQLAlchemy + PostgreSQL)**

- Các model: CV, JD, AnalystResult, Education, Experience, Skill, Certificate, Project...
- Quản lý kết nối, session, migration (nên dùng Alembic nếu triển khai thực tế).

### 3. **Service Layer**

- Xử lý logic nghiệp vụ: lưu, truy vấn, phân tích, so sánh, chấm điểm.
- Tích hợp AI: Gửi dữ liệu lên GPT-4.1, nhận kết quả, xử lý và lưu lại.

### 4. **AI Integration**

- Gửi prompt và dữ liệu lên endpoint GPT-4.1 (Azure OpenAI hoặc tương thích).
- Nhận kết quả phân tích, điểm số, nhận xét.

---

## 📝 Ví dụ request/response

### 1. Upload CV

**Request:**  
`POST /upload-cv/`  
Body: file PDF

**Response:**

```json
{
  "message": "Upload thành công",
  "data": {
    "base_information": {...},
    "education": [...],
    "experience": [...],
    "skill": [...],
    "certificate": [...],
    "project": [...]
  }
}
```

### 2. Lưu CV

**Request:**  
`POST /cv-storage/save-cv`  
Body: JSON thông tin CV

**Response:**

```json
{
  "message": "CV saved successfully",
  "cv_id": 1
}
```

### 3. Phân tích AI

**Request:**  
`POST /result-storage/analyze`  
Body:

```json
{
  "cv_id": 1,
  "jd_id": 2
}
```

**Response:**

```json
{
  "education_score": 80,
  "experience_score": 70,
  "skill_score": 90,
  "certificate_score": 20,
  "total_score": 78,
  "comment": "Ứng viên có kỹ năng và kinh nghiệm phù hợp, cần bổ sung thêm chứng chỉ chuyên môn."
}
```

---

## 🔄 Hướng dẫn mở rộng & bảo trì

- **Thêm trường mới cho CV/JD:** Cập nhật models, migration, service và API tương ứng.
- **Tích hợp AI model khác:** Thay đổi endpoint, prompt, hoặc logic xử lý kết quả.
- **Tối ưu hiệu năng:** Sử dụng cache, phân trang, tối ưu truy vấn SQL.
- **Bảo mật:** Thêm xác thực, phân quyền, kiểm soát upload file.

---

## 🚀 Đề xuất phát triển tương lai

- Xây dựng dashboard quản trị, báo cáo thống kê.
- Tích hợp thêm các nguồn dữ liệu CV (LinkedIn, Job boards...).
- Phân tích sâu hơn về soft skills, tiềm năng phát triển.
- Đề xuất vị trí phù hợp cho ứng viên dựa trên dữ liệu lớn.
- Tích hợp chatbot hỗ trợ tư vấn tuyển dụng tự động.

---

## ⚠️ Lưu ý triển khai thực tế

- Đảm bảo bảo mật dữ liệu cá nhân ứng viên.
- Kiểm soát dung lượng file upload, validate dữ liệu đầu vào.
- Giới hạn số tokens gửi lên AI để tránh lỗi vượt giới hạn.
- Cấu hình biến môi trường, secret key cẩn thận (không hardcode).

---

## 🔗 Một số API tiêu biểu

| Method | Endpoint              | Chức năng                    |
| ------ | --------------------- | ---------------------------- |
| POST   | `/upload-cv/`         | Upload CV PDF                |
| POST   | `/cv-storage/save-cv` | Lưu CV vào database          |
| GET    | `/cv-storage/`        | Lấy danh sách CV             |
| GET    | `/cv-storage/{cv_id}` | Lấy chi tiết CV              |
| POST   | `/jd-storage/save-jd` | Lưu JD vào database          |
| GET    | `/jd-storage/all_jds` | Lấy danh sách JD             |
| GET    | `/result-storage/`    | Lấy tất cả kết quả phân tích |

---

## 🧪 Kiểm thử

Chạy unit test với pytest:

```bash
pytest test/
```

---

## 💡 Đóng góp

Mọi đóng góp, issue hoặc pull request đều được hoan nghênh!  
Vui lòng tạo issue hoặc PR trên Github để cùng phát triển dự án.

---

## 📬 Liên hệ

- **Email:** your.email@example.com
- **Github:** [Nguyen Quyen](https://github.com/nguyenquyen1910)

---

> **CV Scanner Project** — Nâng tầm tuyển dụng với sức mạnh AI!

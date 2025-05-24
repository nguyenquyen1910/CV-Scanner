import { API_ENDPOINTS } from "@/lib/api-config";

export type AnalysisResult = {
  education_score: number;
  experience_score: number;
  skill_score: number;
  certificate_score: number;
  total_score: number;
  comment: string;
};

export const analyzeCompatibility = async (
  cvId: number,
  jdId: number
): Promise<AnalysisResult> => {
  try {
    const url = `${API_ENDPOINTS.ANALYZE}?cv_id=${cvId}&jd_id=${jdId}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Không thể phân tích tài liệu");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(
      `Lỗi khi phân tích: ${
        error instanceof Error ? error.message : "Lỗi không xác định"
      }`
    );
  }
};

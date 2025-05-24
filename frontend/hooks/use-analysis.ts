"use client";

import { useState } from "react";
import { API_ENDPOINTS } from "@/lib/api-config";

// Cập nhật kiểu dữ liệu AnalysisResult để phù hợp với cấu trúc API mới
export type AnalysisResult = {
  ok: boolean;
  status: string;
  data: {
    analysis: {
      id: number;
      education_score: number;
      experience_score: number;
      skill_score: number;
      certificate_score: number;
      total_score: number;
      comment: string;
    };
    cv_details: {
      id: number;
      name: string;
      email: string;
      phone: string;
      location: string;
      education: Array<{
        school: string;
        degree: string;
        year: string;
      }>;
      experience: Array<{
        company: string;
        position: string;
        duration: string;
        description: string;
      }>;
      skills: string[];
      certificates: string[];
    };
    jd_details: {
      id: number;
      title: string;
      company: string;
      requirements: string;
      education_requirement: string;
      experience_requirement: string;
      skills_requirement: string;
    };
  };
};

export function useAnalysis() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const analyze = async (cvId: string, jdId: string): Promise<boolean> => {
    setIsAnalyzing(true);
    setError(undefined);

    try {
      // Gọi API phân tích
      const response = await fetch(
        `${API_ENDPOINTS.ANALYZE}?cv_id=${cvId}&jd_id=${jdId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Không thể phân tích tài liệu");
      }

      const analysisResult = await response.json();
      setResult(analysisResult);

      // Lưu kết quả vào localStorage để hiển thị
      localStorage.setItem("analysisResult", JSON.stringify(analysisResult));

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Lỗi không xác định";
      setError(errorMessage);
      return false;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(undefined);
    localStorage.removeItem("analysisResult");
  };

  return {
    result,
    isAnalyzing,
    error,
    analyze,
    resetAnalysis,
  };
}

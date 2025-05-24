"use client";

import { useState } from "react";
import { AnalysisCard } from "@/components/analysis-card";
import { AnalysisResults } from "@/components/analysis-results";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

type AnalysisResult = {
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

interface AnalysisContainerProps {
  result: AnalysisResult;
  onReset?: () => void;
}

export function AnalysisContainer({ result, onReset }: AnalysisContainerProps) {
  const [showDetailedView, setShowDetailedView] = useState(false);

  const handleViewDetails = () => {
    setShowDetailedView(true);
  };

  const handleBackToSummary = () => {
    setShowDetailedView(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-gray-100">Kết quả phân tích</h2>
        {onReset && (
          <Button
            variant="default"
            onClick={onReset}
            className="font-medium bg-gradient-to-r from-cyan-700 to-indigo-700 text-white hover:from-cyan-600 hover:to-indigo-600"
          >
            Phân tích CV khác
          </Button>
        )}
      </div>

      {!showDetailedView ? (
        <AnalysisCard
          result={{
            id: result.analysis.id,
            cv_id: result.cv_details.id,
            jd_id: result.jd_details.id,
            fullname: result.cv_details.name,
            company: result.jd_details.company,
            location: result.jd_details.title,
            education_score: result.analysis.education_score,
            experience_score: result.analysis.experience_score,
            skill_score: result.analysis.skill_score,
            certificate_score: result.analysis.certificate_score,
            total_score: result.analysis.total_score,
            comment: result.analysis.comment,
            created_at: new Date().toISOString(),
          }}
          onViewDetails={handleViewDetails}
        />
      ) : (
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={handleBackToSummary}
            className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại tổng quan
          </Button>
          <AnalysisResults result={result} />
        </div>
      )}
    </motion.div>
  );
}

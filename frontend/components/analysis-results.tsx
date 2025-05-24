"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  Download,
  Share2,
  FileText,
  User,
  Building,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CvViewerModal } from "./cv-viewer-model";

type AnalysisResultProps = {
  result: {
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

export function AnalysisResults({ result }: AnalysisResultProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-gradient-to-r from-emerald-400 to-emerald-600";
    if (score >= 60) return "bg-gradient-to-r from-amber-400 to-amber-600";
    return "bg-gradient-to-r from-red-400 to-red-600";
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return "Phù hợp tuyệt vời";
    if (score >= 60) return "Phù hợp tốt";
    if (score >= 40) return "Phù hợp trung bình";
    return "Ít phù hợp";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return "🌟";
    if (score >= 60) return "👍";
    if (score >= 40) return "👌";
    return "👎";
  };

  const analyzeSkillMatch = () => {
    const cvSkills = result.cv_details.skills.map((skill) =>
      skill.toLowerCase()
    );

    const skillsText = result.jd_details.skills_requirement.toLowerCase();
    const commonSkillKeywords = [
      "python",
      "java",
      "mysql",
      "postgresql",
      "mongodb",
      "redis",
      "aws",
      "azure",
      "gcp",
      "ci/cd",
      "docker",
      "kubernetes",
    ];

    const jdSkills = commonSkillKeywords.filter((skill) =>
      skillsText.includes(skill.toLowerCase())
    );

    const matching = jdSkills.filter((skill) =>
      cvSkills.some((cvSkill) =>
        cvSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );

    const missing = jdSkills.filter(
      (skill) =>
        !cvSkills.some((cvSkill) =>
          cvSkill.toLowerCase().includes(skill.toLowerCase())
        )
    );

    const additional = cvSkills
      .filter(
        (cvSkill) =>
          !jdSkills.some((jdSkill) =>
            cvSkill.toLowerCase().includes(jdSkill.toLowerCase())
          ) &&
          commonSkillKeywords.some((keyword) =>
            cvSkill.toLowerCase().includes(keyword.toLowerCase())
          )
      )
      .slice(0, 10);

    return { matching, missing, additional };
  };

  const extractRecommendations = () => {
    const comment = result.analysis.comment;
    const sentences = comment.split(/[.!?]/);

    return sentences
      .filter(
        (sentence) =>
          sentence.toLowerCase().includes("nên") ||
          sentence.toLowerCase().includes("cần") ||
          sentence.toLowerCase().includes("bổ sung")
      )
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 10);
  };

  const skillMatch = analyzeSkillMatch();
  const recommendations = extractRecommendations();

  return (
    <div className="space-y-8">
      {/* Header với thông tin cơ bản */}
      <Card className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700 shadow-lg rounded-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="h-5 w-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-gray-100">
                {result.cv_details.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="h-5 w-5 text-indigo-400" />
              <p className="text-gray-300">{result.jd_details.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-emerald-400" />
              <p className="text-gray-300">{result.jd_details.company}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-100">
                Độ phù hợp: {result.analysis.total_score}%
              </span>
              <div
                className={`px-3 py-1 rounded-full text-sm ${
                  result.analysis.total_score >= 80
                    ? "bg-emerald-900/30 text-emerald-400"
                    : result.analysis.total_score >= 60
                    ? "bg-amber-900/30 text-amber-400"
                    : "bg-red-900/30 text-red-400"
                }`}
              >
                {getScoreText(result.analysis.total_score)}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs cho các phần thông tin */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-800">
          <TabsTrigger
            value="overview"
            className="text-sm text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-cyan-400"
          >
            Tổng quan
          </TabsTrigger>
          <TabsTrigger
            value="cv"
            className="text-sm text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-cyan-400"
          >
            Thông tin CV
          </TabsTrigger>
          <TabsTrigger
            value="jd"
            className="text-sm text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-cyan-400"
          >
            Thông tin JD
          </TabsTrigger>
        </TabsList>

        {/* Tab Tổng quan */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Điểm tổng quan */}
            <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-lg rounded-2xl">
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 relative mb-4">
                  <div className="w-full h-full rounded-full bg-gray-800 shadow-inner flex items-center justify-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                      {result.analysis.total_score}%
                    </div>
                  </div>
                  <div className="absolute inset-0">
                    <div className="w-full h-2 bg-gray-700 rounded-full relative">
                      <div
                        className={`absolute top-0 left-0 h-2 rounded-full ${
                          result.analysis.total_score >= 80
                            ? "bg-emerald-400"
                            : result.analysis.total_score >= 60
                            ? "bg-amber-400"
                            : "bg-red-400"
                        }`}
                        style={{ width: `${result.analysis.total_score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-100">
                  Độ phù hợp tổng thể
                </h3>
                <div className="text-base text-gray-300 mb-4 flex items-center">
                  <span>{getScoreText(result.analysis.total_score)}</span>
                  <span className="ml-2 text-xl">
                    {getScoreEmoji(result.analysis.total_score)}
                  </span>
                </div>

                <div className="flex space-x-3 mt-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          className="font-medium bg-gradient-to-r from-cyan-700 to-indigo-700 text-white hover:from-cyan-600 hover:to-indigo-600"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Tải xuống
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tải xuống báo cáo chi tiết</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          className="font-medium bg-gradient-to-r from-cyan-700 to-indigo-700 text-white hover:from-cyan-600 hover:to-indigo-600"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Chia sẻ
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chia sẻ kết quả phân tích</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </Card>

            {/* Điểm chi tiết */}
            <Card className="p-6 bg-gray-900 border-gray-700 shadow-lg rounded-2xl col-span-1 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-200 border-b border-gray-800 pb-2">
                Điểm số chi tiết
              </h3>
              <div className="space-y-4">
                <div className="p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-cyan-900 flex items-center justify-center mr-3">
                      <BookOpen className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-300">
                          Học vấn
                        </span>
                        <span className="font-semibold text-gray-200">
                          {result.analysis.education_score}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full relative">
                        <div
                          className={`absolute top-0 left-0 h-2 rounded-full ${
                            result.analysis.education_score >= 80
                              ? "bg-emerald-400"
                              : result.analysis.education_score >= 60
                              ? "bg-amber-400"
                              : "bg-red-400"
                          }`}
                          style={{
                            width: `${result.analysis.education_score}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-900 flex items-center justify-center mr-3">
                      <Briefcase className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-300">
                          Kinh nghiệm
                        </span>
                        <span className="font-semibold text-gray-200">
                          {result.analysis.experience_score}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full relative">
                        <div
                          className={`absolute top-0 left-0 h-2 rounded-full ${
                            result.analysis.experience_score >= 80
                              ? "bg-emerald-400"
                              : result.analysis.experience_score >= 60
                              ? "bg-amber-400"
                              : "bg-red-400"
                          }`}
                          style={{
                            width: `${result.analysis.experience_score}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-emerald-900 flex items-center justify-center mr-3">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-300">
                          Kỹ năng
                        </span>
                        <span className="font-semibold text-gray-200">
                          {result.analysis.skill_score}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full relative">
                        <div
                          className={`absolute top-0 left-0 h-2 rounded-full ${
                            result.analysis.skill_score >= 80
                              ? "bg-emerald-400"
                              : result.analysis.skill_score >= 60
                              ? "bg-amber-400"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${result.analysis.skill_score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-amber-900 flex items-center justify-center mr-3">
                      <Award className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-300">
                          Chứng chỉ
                        </span>
                        <span className="font-semibold text-gray-200">
                          {result.analysis.certificate_score}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full relative">
                        <div
                          className={`absolute top-0 left-0 h-2 rounded-full ${
                            result.analysis.certificate_score >= 80
                              ? "bg-emerald-400"
                              : result.analysis.certificate_score >= 60
                              ? "bg-amber-400"
                              : "bg-red-400"
                          }`}
                          style={{
                            width: `${result.analysis.certificate_score}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Phân tích kỹ năng */}
          <Card className="p-6 bg-gray-900 border-gray-700 shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-200 border-b border-gray-800 pb-2">
              Phân tích kỹ năng
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <ThumbsUp className="h-4 w-4 text-emerald-400 mr-2" />
                  Kỹ năng phù hợp
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillMatch.matching.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-emerald-900/30 text-emerald-400"
                    >
                      {skill}
                    </span>
                  ))}
                  {skillMatch.matching.length === 0 && (
                    <p className="text-sm text-gray-400">
                      Không tìm thấy kỹ năng phù hợp
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <ThumbsDown className="h-4 w-4 text-red-400 mr-2" />
                  Kỹ năng còn thiếu
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillMatch.missing.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-red-900/30 text-red-400"
                    >
                      {skill}
                    </span>
                  ))}
                  {skillMatch.missing.length === 0 && (
                    <p className="text-sm text-gray-400">
                      Không có kỹ năng nào còn thiếu
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <Plus className="h-4 w-4 text-blue-400 mr-2" />
                  Kỹ năng bổ sung
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillMatch.additional.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-blue-900/30 text-blue-400"
                    >
                      {skill}
                    </span>
                  ))}
                  {skillMatch.additional.length === 0 && (
                    <p className="text-sm text-gray-400">
                      Không có kỹ năng bổ sung
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Phản hồi và đề xuất */}
          <Card className="p-6 rounded-xl border-gray-700 bg-gray-900 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">
              Nhận xét:
            </h3>
            <div className="prose prose-sm max-w-none prose-invert">
              <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                {result.analysis.comment}
              </p>
            </div>

            {recommendations.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-800">
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Đề xuất cải thiện:
                </h4>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-cyan-900 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-cyan-400 text-xs">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Tab Thông tin CV */}
        <TabsContent value="cv" className="space-y-6">
          <Card className="p-6 bg-gray-900 border-gray-700 shadow-lg rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-800 pb-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center text-cyan-500">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-100">
                    {result.cv_details.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <div className="flex items-center text-sm text-gray-400">
                      <Mail className="h-3.5 w-3.5 mr-1" />
                      {result.cv_details.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Phone className="h-3.5 w-3.5 mr-1" />
                      {result.cv_details.phone}
                    </div>
                    {result.cv_details.location && (
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {result.cv_details.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                className="font-medium bg-gradient-to-r from-cyan-700 to-indigo-700 text-white hover:from-cyan-600 hover:to-indigo-600"
                onClick={() => setIsCvModalOpen(true)}
              >
                <FileText className="h-4 w-4 mr-1" />
                Xem CV gốc
              </Button>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="education" className="border-b-0">
                <AccordionTrigger className="py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-750 text-gray-200">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-cyan-400 mr-2" />
                    <span>Học vấn</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-2">
                  <div className="space-y-3">
                    {result.cv_details.education.map((edu, index) => (
                      <div key={index} className="bg-gray-800 p-3 rounded-lg">
                        <div className="font-medium text-gray-200">
                          {edu.school}
                        </div>
                        <div className="text-sm text-gray-400">
                          {edu.degree}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {edu.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="experience" className="border-b-0">
                <AccordionTrigger className="py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-750 text-gray-200">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-indigo-400 mr-2" />
                    <span>Kinh nghiệm</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-2">
                  <div className="space-y-3">
                    {result.cv_details.experience.map((exp, index) => (
                      <div key={index} className="bg-gray-800 p-3 rounded-lg">
                        <div className="font-medium text-gray-200">
                          {exp.position}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <Building className="h-3.5 w-3.5 mr-1" />
                          {exp.company}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {exp.duration}
                        </div>
                        {exp.description && (
                          <div className="text-sm text-gray-400 mt-2">
                            {exp.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="skills" className="border-b-0">
                <AccordionTrigger className="py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-750 text-gray-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-2" />
                    <span>Kỹ năng</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-2">
                  <div className="flex flex-wrap gap-2">
                    {result.cv_details.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          skillMatch.matching.includes(skill.toLowerCase())
                            ? "bg-emerald-900/30 text-emerald-400"
                            : "bg-gray-800 text-gray-300"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {result.cv_details.certificates &&
                result.cv_details.certificates.length > 0 && (
                  <AccordionItem value="certificates" className="border-b-0">
                    <AccordionTrigger className="py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-750 text-gray-200">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-amber-400 mr-2" />
                        <span>Chứng chỉ</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 px-2">
                      <div className="space-y-2">
                        {result.cv_details.certificates.map((cert, index) => (
                          <div
                            key={index}
                            className="bg-gray-800 p-2 rounded-lg text-gray-300"
                          >
                            {cert}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
            </Accordion>
          </Card>
        </TabsContent>

        {/* Tab Thông tin JD */}
        <TabsContent value="jd" className="space-y-6">
          <Card className="p-6 bg-gray-900 border-gray-700 shadow-lg rounded-2xl">
            <div className="border-b border-gray-800 pb-4 mb-4">
              <h3 className="text-xl font-bold text-gray-100">
                {result.jd_details.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center text-sm text-gray-400">
                  <Building className="h-3.5 w-3.5 mr-1" />
                  {result.jd_details.company}
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="education" className="border-b-0">
                <AccordionTrigger className="py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-750 text-gray-200">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-cyan-400 mr-2" />
                    <span>Yêu cầu học vấn</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-2">
                  <p className="text-gray-300 p-3 bg-gray-800 rounded-lg">
                    {result.jd_details.education_requirement}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="experience" className="border-b-0">
                <AccordionTrigger className="py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-750 text-gray-200">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-indigo-400 mr-2" />
                    <span>Yêu cầu kinh nghiệm</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-2">
                  <p className="text-gray-300 p-3 bg-gray-800 rounded-lg">
                    {result.jd_details.experience_requirement}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="skills" className="border-b-0">
                <AccordionTrigger className="py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-750 text-gray-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-2" />
                    <span>Yêu cầu kỹ năng</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-2">
                  <p className="text-gray-300 p-3 bg-gray-800 rounded-lg">
                    {result.jd_details.skills_requirement}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="requirements" className="border-b-0">
                <AccordionTrigger className="py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-750 text-gray-200">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-400 mr-2" />
                    <span>Yêu cầu đầy đủ</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-2">
                  <p className="text-gray-300 p-3 bg-gray-800 rounded-lg whitespace-pre-line">
                    {result.jd_details.requirements}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bước tiếp theo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="p-6 rounded-xl border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">
            Bước tiếp theo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="default"
              className="bg-gray-800 text-cyan-400 hover:bg-gray-700 border border-gray-700"
            >
              Lưu kết quả phân tích
            </Button>
            <Button
              variant="default"
              className="bg-gray-800 text-indigo-400 hover:bg-gray-700 border border-gray-700"
            >
              Xem CV được đề xuất
            </Button>
            <Button
              variant="default"
              className="bg-gradient-to-r from-cyan-700 to-indigo-700 text-white hover:from-cyan-600 hover:to-indigo-600"
            >
              Liên hệ ứng viên
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Award, BookOpen, Briefcase, CheckCircle, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import React from "react"

type AnalysisResult = {
  education_score: number
  experience_score: number
  skill_score: number
  certificate_score: number
  total_score: number
  comment: string
}

export function Results() {
  const [result, setResult] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    const storedResult = localStorage.getItem("analysisResult")
    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult))
      } catch (error) {
        console.error("Error parsing stored result:", error)
      }
    }
  }, [])

  if (!result) {
    return (
      <div className="text-center py-16 text-gray-400">
        <AlertCircle className="mx-auto h-16 w-16 text-gray-500 mb-4" />
        <h3 className="text-xl font-medium">Chưa có kết quả phân tích</h3>
        <p className="mt-2">Tải lên CV và mô tả công việc để xem phân tích độ phù hợp</p>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  const getScoreText = (score: number) => {
    if (score >= 80) return "Phù hợp tuyệt vời"
    if (score >= 60) return "Phù hợp tốt"
    if (score >= 40) return "Phù hợp trung bình"
    return "Ít phù hợp"
  }

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return "🌟"
    if (score >= 60) return "👍"
    if (score >= 40) return "👌"
    return "👎"
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-8">
      <motion.div className="flex flex-col md:flex-row gap-6" variants={container} initial="hidden" animate="show">
        <motion.div className="flex-1" variants={item}>
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-lg rounded-2xl">
            <div className="flex flex-col items-center justify-center">
              <div className="w-48 h-48 relative mb-6">
                <div className="w-full h-full rounded-full bg-gray-800 shadow-inner flex items-center justify-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                    {result.total_score}%
                  </div>
                </div>
                <div className="absolute inset-0">
                  <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={result.total_score >= 80 ? "#10b981" : result.total_score >= 60 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="8"
                      strokeDasharray={`${result.total_score * 2.83} 283`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-100">Độ phù hợp tổng thể</h3>
              <div className="text-lg text-gray-300 mb-4 flex items-center">
                <span>{getScoreText(result.total_score)}</span>
                <span className="ml-2 text-2xl">{getScoreEmoji(result.total_score)}</span>
              </div>

              <div className="flex space-x-3 mt-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
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
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
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
        </motion.div>

        <motion.div className="flex-1" variants={item}>
          <Tabs defaultValue="scores" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-800">
              <TabsTrigger
                value="scores"
                className="text-sm data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100"
              >
                Chi tiết điểm số
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className="text-sm data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100"
              >
                Phản hồi AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scores" className="space-y-4">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                <motion.div variants={item}>
                  <Card className="p-5 hover:shadow-md transition-shadow rounded-xl bg-gray-900 border-gray-700">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-cyan-900 flex items-center justify-center mr-3">
                        <BookOpen className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-300">Học vấn</span>
                          <span className="font-semibold text-gray-200">{result.education_score}%</span>
                        </div>
                        <Progress
                          value={result.education_score}
                          className={`h-2 ${getScoreColor(result.education_score)}`}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 ml-13">
                      {result.education_score >= 80
                        ? "Trình độ học vấn phù hợp tuyệt vời với yêu cầu công việc"
                        : result.education_score >= 60
                          ? "Trình độ học vấn đáp ứng tốt yêu cầu công việc"
                          : "Cần bổ sung thêm về trình độ học vấn"}
                    </p>
                  </Card>
                </motion.div>

                <motion.div variants={item}>
                  <Card className="p-5 hover:shadow-md transition-shadow rounded-xl bg-gray-900 border-gray-700">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-900 flex items-center justify-center mr-3">
                        <Briefcase className="h-5 w-5 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-300">Kinh nghiệm</span>
                          <span className="font-semibold text-gray-200">{result.experience_score}%</span>
                        </div>
                        <Progress
                          value={result.experience_score}
                          className={`h-2 ${getScoreColor(result.experience_score)}`}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 ml-13">
                      {result.experience_score >= 80
                        ? "Kinh nghiệm làm việc rất phù hợp với vị trí"
                        : result.experience_score >= 60
                          ? "Kinh nghiệm làm việc đáp ứng tốt yêu cầu"
                          : "Cần tích lũy thêm kinh nghiệm liên quan"}
                    </p>
                  </Card>
                </motion.div>

                <motion.div variants={item}>
                  <Card className="p-5 hover:shadow-md transition-shadow rounded-xl bg-gray-900 border-gray-700">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-900 flex items-center justify-center mr-3">
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-300">Kỹ năng</span>
                          <span className="font-semibold text-gray-200">{result.skill_score}%</span>
                        </div>
                        <Progress value={result.skill_score} className={`h-2 ${getScoreColor(result.skill_score)}`} />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 ml-13">
                      {result.skill_score >= 80
                        ? "Kỹ năng chuyên môn rất phù hợp với yêu cầu"
                        : result.skill_score >= 60
                          ? "Kỹ năng đáp ứng tốt yêu cầu công việc"
                          : "Cần phát triển thêm kỹ năng chuyên môn"}
                    </p>
                  </Card>
                </motion.div>

                <motion.div variants={item}>
                  <Card className="p-5 hover:shadow-md transition-shadow rounded-xl bg-gray-900 border-gray-700">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-amber-900 flex items-center justify-center mr-3">
                        <Award className="h-5 w-5 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-300">Chứng chỉ</span>
                          <span className="font-semibold text-gray-200">{result.certificate_score}%</span>
                        </div>
                        <Progress
                          value={result.certificate_score}
                          className={`h-2 ${getScoreColor(result.certificate_score)}`}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 ml-13">
                      {result.certificate_score >= 80
                        ? "Có đầy đủ chứng chỉ cần thiết cho vị trí"
                        : result.certificate_score >= 60
                          ? "Có một số chứng chỉ phù hợp với yêu cầu"
                          : "Cần bổ sung thêm chứng chỉ chuyên môn"}
                    </p>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="feedback">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="p-6 rounded-xl border-gray-700 bg-gray-900 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">
                    Phân tích của AI
                  </h3>
                  <div className="prose prose-sm max-w-none prose-invert">
                    <p className="text-gray-300 whitespace-pre-line leading-relaxed">{result.comment}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-800">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Đề xuất cải thiện:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-cyan-900 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-cyan-400 text-xs">1</span>
                        </div>
                        <span className="text-sm text-gray-400">
                          Bổ sung thêm chứng chỉ chuyên môn liên quan đến vị trí
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-cyan-900 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-cyan-400 text-xs">2</span>
                        </div>
                        <span className="text-sm text-gray-400">Làm nổi bật hơn các kỹ năng kỹ thuật trong CV</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-cyan-900 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-cyan-400 text-xs">3</span>
                        </div>
                        <span className="text-sm text-gray-400">
                          Cập nhật thông tin về các dự án đã thực hiện để phù hợp hơn với vị trí
                        </span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="p-6 rounded-xl border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Bước tiếp theo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="default" className="bg-gray-800 text-cyan-400 hover:bg-gray-700 border border-gray-700">
              Lưu kết quả phân tích
            </Button>
            <Button variant="default" className="bg-gray-800 text-indigo-400 hover:bg-gray-700 border border-gray-700">
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
  )
}

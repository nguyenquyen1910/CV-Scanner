"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

type AnalysisResult = {
  id: number
  cv_id: number
  jd_id: number
  fullname: string
  company: string
  location: string
  education_score: number
  experience_score: number
  skill_score: number
  certificate_score: number
  total_score: number
  comment: string
  created_at: string
}

interface AnalysisCardProps {
  result: AnalysisResult
  onViewDetails?: () => void
}

export function AnalysisCard({ result, onViewDetails }: AnalysisCardProps) {
  // Hàm tạo màu dựa trên điểm số
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  // Hàm tạo text dựa trên điểm số
  const getScoreText = (score: number) => {
    if (score >= 80) return "phù hợp tuyệt vời"
    if (score >= 60) return "phù hợp tốt"
    if (score >= 40) return "phù hợp trung bình"
    return "ít phù hợp"
  }

  // Rút gọn comment nếu quá dài
  const shortenComment = (comment: string, maxLength = 200) => {
    if (comment.length <= maxLength) return comment
    return comment.substring(0, maxLength) + "..."
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-100">Kết quả phân tích CV</h3>
            <p className="text-gray-400 mt-1">Ứng viên: {result.fullname}</p>
            <p className="text-gray-400 text-sm mt-1">
              <span className="text-cyan-400">{result.location}</span> tại{" "}
              <span className="text-indigo-400">{result.company}</span>
            </p>
          </div>
          <div
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              result.total_score >= 80
                ? "bg-emerald-900/30 text-emerald-400"
                : result.total_score >= 60
                  ? "bg-amber-900/30 text-amber-400"
                  : "bg-red-900/30 text-red-400"
            }`}
          >
            {result.total_score}% {getScoreText(result.total_score)}
          </div>
        </div>

        {/* Progress bars */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Học vấn</span>
              <span className="text-gray-300">{result.education_score}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.education_score}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full ${getScoreColor(result.education_score)}`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Kinh nghiệm</span>
              <span className="text-gray-300">{result.experience_score}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.experience_score}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className={`h-full ${getScoreColor(result.experience_score)}`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Kỹ năng</span>
              <span className="text-gray-300">{result.skill_score}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.skill_score}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className={`h-full ${getScoreColor(result.skill_score)}`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Chứng chỉ</span>
              <span className="text-gray-300">{result.certificate_score}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.certificate_score}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className={`h-full ${getScoreColor(result.certificate_score)}`}
              />
            </div>
          </div>
        </div>

        {/* AI Comment */}
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Nhận xét:</h4>
          <p className="text-sm text-gray-400">{shortenComment(result.comment)}</p>
        </div>

        {/* Action button */}
        <div className="flex justify-end">
          <Button
            onClick={onViewDetails}
            className="bg-gradient-to-r from-cyan-700 to-indigo-700 hover:from-cyan-600 hover:to-indigo-600 text-white"
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
    </Card>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FileSearch, BarChart3, Zap, Shield, Users, Database } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <FileSearch className="h-10 w-10 text-cyan-400" />,
      title: "Phân tích CV thông minh",
      description:
        "Trích xuất thông tin quan trọng từ CV như học vấn, kinh nghiệm, kỹ năng và chứng chỉ một cách tự động.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-indigo-400" />,
      title: "Đánh giá độ phù hợp",
      description: "So sánh CV với mô tả công việc để đánh giá mức độ phù hợp của ứng viên với vị trí cần tuyển.",
    },
    {
      icon: <Zap className="h-10 w-10 text-amber-400" />,
      title: "Tiết kiệm thời gian",
      description:
        "Giảm thời gian sàng lọc CV từ hàng giờ xuống còn vài phút, giúp nhà tuyển dụng tập trung vào các ứng viên tiềm năng.",
    },
    {
      icon: <Shield className="h-10 w-10 text-emerald-400" />,
      title: "Bảo mật dữ liệu",
      description:
        "Đảm bảo an toàn thông tin cá nhân của ứng viên với hệ thống bảo mật tiên tiến và tuân thủ quy định về dữ liệu.",
    },
    {
      icon: <Users className="h-10 w-10 text-red-400" />,
      title: "Đánh giá khách quan",
      description:
        "Loại bỏ định kiến trong quá trình tuyển dụng với phân tích dựa trên dữ liệu và tiêu chí khách quan.",
    },
    {
      icon: <Database className="h-10 w-10 text-purple-400" />,
      title: "Tích hợp dễ dàng",
      description: "Tích hợp liền mạch với các hệ thống quản lý tuyển dụng hiện có thông qua API tiêu chuẩn.",
    },
  ]

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
    <section className="py-16 bg-gray-950" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Tính năng nổi bật</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            CV Scanner cung cấp các công cụ mạnh mẽ để tối ưu hóa quy trình tuyển dụng của bạn
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="p-6 h-full border border-gray-800 hover:border-gray-700 hover:shadow-md transition-all duration-300 rounded-xl bg-gray-900">
                <div className="h-14 w-14 rounded-lg bg-gray-800 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

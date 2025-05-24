"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle, TrendingUp, Clock, Users } from "lucide-react"

export function BusinessValue() {
  const benefits = [
    {
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      title: "Tăng hiệu quả tuyển dụng",
      description: "Giảm 70% thời gian sàng lọc CV và tăng 40% tỷ lệ tuyển dụng thành công",
    },
    {
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      title: "Tiết kiệm thời gian",
      description: "Tự động hóa quy trình đánh giá CV, giúp nhà tuyển dụng tập trung vào các ứng viên tiềm năng",
    },
    {
      icon: <Users className="h-5 w-5 text-purple-600" />,
      title: "Tìm đúng người tài",
      description: "Phân tích khách quan dựa trên AI giúp xác định chính xác ứng viên phù hợp nhất với vị trí",
    },
  ]

  return (
    <section className="py-16 bg-white" id="business">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-1 w-20 mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tối ưu hóa quy trình tuyển dụng của doanh nghiệp
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              CV Scanner giúp doanh nghiệp tiết kiệm thời gian và chi phí tuyển dụng, đồng thời nâng cao chất lượng ứng
              viên được chọn thông qua phân tích AI tiên tiến.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Đăng ký dùng thử
              </Button>
              <Button variant="outline">Tìm hiểu thêm</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-gray-800">Gói doanh nghiệp</h3>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Phổ biến nhất
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">2.990.000</span>
                  <span className="text-gray-600 ml-2">VNĐ/tháng</span>
                </div>
                <p className="text-gray-500 mt-2">Dành cho doanh nghiệp vừa và nhỏ</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Phân tích không giới hạn CV và JD</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Báo cáo phân tích chi tiết</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Tích hợp với hệ thống tuyển dụng hiện có</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Hỗ trợ kỹ thuật 24/7</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Đào tạo và hướng dẫn sử dụng</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Bắt đầu dùng thử 14 ngày
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-blue-100 rounded-full opacity-70 blur-xl"></div>
            <div className="absolute -top-6 -left-6 h-24 w-24 bg-purple-100 rounded-full opacity-70 blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

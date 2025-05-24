"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import React from "react"
export function Testimonials() {
  const testimonials = [
    {
      name: "Nguyễn Thị Minh",
      position: "Giám đốc nhân sự, Tech Solutions",
      content:
        "CV Scanner đã giúp chúng tôi giảm 70% thời gian sàng lọc CV. Giờ đây, chúng tôi có thể tập trung vào việc phỏng vấn những ứng viên thực sự phù hợp với công ty.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Trần Văn Hùng",
      position: "Trưởng phòng tuyển dụng, FintechVN",
      content:
        "Phân tích AI của CV Scanner rất chính xác. Chúng tôi đã tìm được nhiều ứng viên tài năng mà có thể đã bị bỏ qua trong quy trình tuyển dụng truyền thống.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Lê Thị Hương",
      position: "CEO, StartupX",
      content:
        "Là một startup nhỏ, chúng tôi không có nhiều nguồn lực cho tuyển dụng. CV Scanner đã giúp chúng tôi tìm được những nhân tài phù hợp mà không cần đội ngũ HR lớn.",
      rating: 4,
      image: "/placeholder.svg?height=80&width=80",
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Khách hàng nói gì về chúng tôi</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hàng trăm doanh nghiệp đã tối ưu hóa quy trình tuyển dụng với CV Scanner
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={item}>
              <Card className="p-6 h-full border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            <span className="mr-2 text-blue-600 font-bold">4.9/5</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-blue-600 fill-blue-600" />
              ))}
            </div>
            <span className="ml-2">từ hơn 200+ đánh giá</span>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Code, Database } from "lucide-react";
import { ScrollLink } from "@/components/scroll-link";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900 py-16 md:py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-900/20 blur-3xl"></div>
        <div className="absolute top-40 -left-20 h-60 w-60 rounded-full bg-cyan-900/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <div className="inline-block bg-cyan-900/30 text-cyan-400 px-4 py-1 rounded-full text-sm font-medium mb-6">
              Công nghệ AI tiên tiến
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-100 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Tìm ứng viên phù hợp nhất với AI
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
              CV Scanner sử dụng trí tuệ nhân tạo để phân tích CV và mô tả công
              việc, giúp doanh nghiệp tìm được ứng viên phù hợp nhất một cách
              nhanh chóng và chính xác.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <ScrollLink href="#scanner">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-700 to-indigo-700 hover:from-cyan-600 hover:to-indigo-600 text-lg px-8 py-6 rounded-xl shadow-lg"
                >
                  Phân tích CV ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </ScrollLink>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Terminal className="h-4 w-4 text-cyan-500 mr-2" />
                <span>Phân tích AI chính xác</span>
              </div>
              <div className="flex items-center">
                <Code className="h-4 w-4 text-cyan-500 mr-2" />
                <span>Công nghệ tiên tiến</span>
              </div>
              <div className="flex items-center">
                <Database className="h-4 w-4 text-cyan-500 mr-2" />
                <span>Bảo mật dữ liệu</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
              <div className="bg-gradient-to-r from-cyan-700 to-indigo-700 h-2"></div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">
                      Kết quả phân tích CV
                    </h3>
                    <p className="text-sm text-gray-400">
                      Ứng viên: Nguyễn Văn A
                    </p>
                  </div>
                  <div className="bg-emerald-900/30 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full">
                    92% phù hợp
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-300">Học vấn</span>
                      <span className="text-gray-300">95%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div
                        className="h-2 bg-emerald-500 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-300">
                        Kinh nghiệm
                      </span>
                      <span className="text-gray-300">88%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div
                        className="h-2 bg-emerald-500 rounded-full"
                        style={{ width: "88%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-300">Kỹ năng</span>
                      <span className="text-gray-300">90%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div
                        className="h-2 bg-emerald-500 rounded-full"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-300">
                        Chứng chỉ
                      </span>
                      <span className="text-gray-300">75%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div
                        className="h-2 bg-amber-500 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg text-sm text-gray-300">
                  <p className="font-medium mb-2">Nhận xét của AI:</p>
                  <p>
                    Ứng viên có kỹ năng và kinh nghiệm rất phù hợp với vị trí.
                    Điểm mạnh là các kỹ năng kỹ thuật và kinh nghiệm làm việc
                    với các công nghệ hiện đại.
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-700 to-indigo-700"
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-cyan-900/20 rounded-full blur-xl"></div>
            <div className="absolute -top-6 -left-6 h-24 w-24 bg-indigo-900/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Cpu, Database, Server, Code, Cloud, Lock, Layers } from "lucide-react";

export function TechStack() {
  const technologies = [
    {
      icon: <Code className="h-8 w-8 text-cyan-400" />,
      name: "Next.js & React",
      description:
        "Xây dựng giao diện người dùng hiện đại, tối ưu SEO và trải nghiệm.",
      techs: [
        "Next.js",
        "React",
        "TypeScript",
        "Shadcn UI",
        "Framer Motion",
        "Lucide Icons",
      ],
    },
    {
      icon: <Server className="h-8 w-8 text-emerald-400" />,
      name: "FastAPI & Python",
      description: "API backend mạnh mẽ, hiệu suất cao với Python.",
      techs: ["FastAPI", "Python", "SQLAlchemy", "Pydantic", "Passlib"],
    },
    {
      icon: <Database className="h-8 w-8 text-indigo-400" />,
      name: "Cơ sở dữ liệu",
      description: "Lưu trữ dữ liệu an toàn, mạnh mẽ và mở rộng tốt.",
      techs: ["PostgreSQL"],
    },
    {
      icon: <Cpu className="h-8 w-8 text-amber-400" />,
      name: "Xử lý AI",
      description: "Phân tích, đánh giá CV và JD bằng các thuật toán AI.",
      techs: ["NLP", "Scikit-learn", "spaCy"],
    },
    {
      icon: <Layers className="h-8 w-8 text-purple-400" />,
      name: "Giao diện & Thiết kế",
      description: "Thiết kế UI đẹp, responsive và dễ tuỳ biến.",
      techs: ["Tailwind CSS", "Shadcn UI"],
    },
    {
      icon: <Cloud className="h-8 w-8 text-blue-400" />,
      name: "Docker & DevOps",
      description: "Đóng gói, triển khai và quản lý ứng dụng dễ dàng.",
      techs: ["Docker", "Docker Compose"],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-gray-900" id="tech">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Công nghệ sử dụng
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            CV Scanner được xây dựng trên nền tảng công nghệ hiện đại và tiên
            tiến
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {technologies.map((tech, index) => (
            <motion.div key={index} variants={item}>
              <Card className="p-6 h-full border border-gray-800 hover:border-gray-700 hover:shadow-md transition-all duration-300 rounded-xl bg-gray-900">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center mr-4">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100">
                    {tech.name}
                  </h3>
                </div>
                <p className="text-gray-400 mb-4">{tech.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tech.techs.map((item, i) => (
                    <span
                      key={i}
                      className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-gray-800 text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { Upload } from "@/components/upload";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Features } from "@/components/features";
import { TechStack } from "@/components/tech-stack";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-200">
      <Header />
      <main className="flex-grow">
        <section id="home">
          <HeroSection />
        </section>

        <section
          className="py-16 px-4 container mx-auto max-w-6xl"
          id="scanner"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Phân tích CV thông minh
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Tải lên CV và mô tả công việc để nhận phân tích chi tiết về mức độ
              phù hợp
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-800">
            <Upload />
          </div>
        </section>

        <section id="features">
          <Features />
        </section>

        <section id="tech">
          <TechStack />
        </section>
      </main>
      <Footer />
    </div>
  );
}

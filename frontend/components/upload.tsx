"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  UploadCloud,
  FileText,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type React from "react";
import { API_ENDPOINTS } from "@/lib/api-config";
import { useAnalysis } from "@/hooks/use-analysis";
import { AnalysisContainer } from "@/components/analysis-container";

export function Upload() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const router = useRouter();

  // Hook phải được gọi ở cấp cao nhất của component
  const analysis = useAnalysis();

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast({
          title: "Định dạng file không hợp lệ",
          description: "Vui lòng tải lên file PDF cho CV",
          variant: "destructive",
        });
        return;
      }
      setCvFile(file);
    }
  };

  const handleJdFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (
        file.type !== "application/pdf" &&
        file.type !== "text/plain" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        toast({
          title: "Định dạng file không hợp lệ",
          description: "Vui lòng tải lên file PDF hoặc TXT cho mô tả công việc",
          variant: "destructive",
        });
        return;
      }
      setJdFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleCvDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type !== "application/pdf") {
        toast({
          title: "Định dạng file không hợp lệ",
          description: "Vui lòng tải lên file PDF cho CV",
          variant: "destructive",
        });
        return;
      }
      setCvFile(file);
    }
  };

  const handleJdDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (
        file.type !== "application/pdf" &&
        file.type !== "text/plain" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        toast({
          title: "Định dạng file không hợp lệ",
          description:
            "Vui lòng tải lên file PDF, TXT hoặc DOCX cho mô tả công việc",
          variant: "destructive",
        });
        return;
      }
      setJdFile(file);
    }
  };

  // Hàm upload file với XMLHttpRequest để theo dõi tiến trình
  const uploadFileWithProgress = (url: string, file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);

      // Theo doi tien trinh upload
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      });

      // Xu ly khi hoan thanh
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error("Không thể phân tích phản hồi từ server"));
          }
        } else {
          try {
            const errorResponse = JSON.parse(xhr.responseText);
            reject(new Error(errorResponse.error || `Lỗi: ${xhr.status}`));
          } catch (error) {
            reject(new Error(`Lỗi: ${xhr.status}`));
          }
        }
      });

      // Xu ly loi mang
      xhr.addEventListener("error", () => {
        reject(new Error("Lỗi mạng hoặc server không phản hồi"));
      });

      // Xu ly timeout
      xhr.addEventListener("timeout", () => {
        reject(new Error("Thời gian chờ đã hết"));
      });

      // Gui du lieu
      xhr.open("POST", url, true);
      xhr.timeout = 60000; // 60s
      xhr.send(formData);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvFile || !jdFile) {
      toast({
        title: "Thiếu file",
        description: "Vui lòng tải lên cả CV và mô tả công việc",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Step 1: Upload CV & JD
      setUploadProgress(0);
      const [cvData, jdData] = await Promise.all([
        uploadFileWithProgress(API_ENDPOINTS.UPLOAD_CV, cvFile),
        uploadFileWithProgress(API_ENDPOINTS.UPLOAD_JD, jdFile),
      ]);

      console.log("CV Data:", cvData);
      console.log("JD Data:", jdData);

      const [saveCvResponse, saveJDResponse] = await Promise.all([
        fetch(API_ENDPOINTS.SAVE_CV, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cvData.data),
        }),
        fetch(API_ENDPOINTS.SAVE_JD, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jdData.data),
        }),
      ]);

      if (!saveCvResponse.ok) throw new Error("Không thể lưu CV");
      if (!saveJDResponse.ok) throw new Error("Không thể lưu JD");

      const saveCvResult = await saveCvResponse.json();
      const saveJDResult = await saveJDResponse.json();

      console.log("Save CV Result:", saveCvResult);
      console.log("Save JD Result:", saveJDResult);

      const cvId = saveCvResult.cv_id || saveCvResult.id;
      const jdId = saveJDResult.jd_id || saveJDResult.id;

      // Step 2: Start analysis
      const success = await analysis.analyze(cvId, jdId);

      if (success) {
        toast({
          title: "Phân tích hoàn tất",
          description: "Tài liệu của bạn đã được phân tích thành công",
          variant: "success",
        });

        setTimeout(() => {
          setShowResults(true);
        }, 500);
      } else {
        toast({
          title: "Phân tích thất bại",
          description:
            analysis.error || "Đã xảy ra lỗi trong quá trình phân tích",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Lỗi trong quá trình tải lên:", error);
      toast({
        title: "Tải lên thất bại",
        description:
          error instanceof Error
            ? error.message
            : "Đã xảy ra lỗi không xác định",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setShowResults(false);
    setCvFile(null);
    setJdFile(null);
    analysis.resetAnalysis();
  };

  // Hiển thị kết quả phân tích nếu có
  if (showResults && analysis.result) {
    return (
      <AnalysisContainer result={analysis.result.data} onReset={resetForm} />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
              className={`p-6 border-2 ${
                cvFile
                  ? "border-emerald-600 bg-gray-900"
                  : "border-dashed border-gray-700 hover:border-cyan-700 hover:bg-gray-800"
              } transition-all duration-300 rounded-xl bg-gray-900`}
              onDragOver={handleDragOver}
              onDrop={handleCvDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div
                  className={`h-16 w-16 rounded-full ${
                    cvFile ? "bg-emerald-900" : "bg-cyan-900"
                  } flex items-center justify-center`}
                >
                  {cvFile ? (
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  ) : (
                    <FileText className="h-8 w-8 text-cyan-400" />
                  )}
                </div>
                <div className="text-center">
                  <Label
                    htmlFor="cv-upload"
                    className="text-lg font-medium cursor-pointer text-gray-200"
                  >
                    {cvFile ? "CV đã sẵn sàng" : "Tải lên CV (PDF)"}
                  </Label>
                  <p className="text-sm text-gray-400 mt-2">
                    {cvFile
                      ? "Nhấp để thay đổi file"
                      : "Kéo thả hoặc nhấp để chọn file"}
                  </p>
                </div>
                <input
                  id="cv-upload"
                  type="file"
                  className="hidden"
                  onChange={handleCvFileChange}
                  accept=".pdf"
                />
                {cvFile && (
                  <div className="text-sm text-emerald-400 font-medium bg-emerald-900/30 px-3 py-1 rounded-full">
                    {cvFile.name}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
              className={`p-6 border-2 ${
                jdFile
                  ? "border-emerald-600 bg-gray-900"
                  : "border-dashed border-gray-700 hover:border-indigo-700 hover:bg-gray-800"
              } transition-all duration-300 rounded-xl bg-gray-900`}
              onDragOver={handleDragOver}
              onDrop={handleJdDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div
                  className={`h-16 w-16 rounded-full ${
                    jdFile ? "bg-emerald-900" : "bg-indigo-900"
                  } flex items-center justify-center`}
                >
                  {jdFile ? (
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  ) : (
                    <Briefcase className="h-8 w-8 text-indigo-400" />
                  )}
                </div>
                <div className="text-center">
                  <Label
                    htmlFor="jd-upload"
                    className="text-lg font-medium cursor-pointer text-gray-200"
                  >
                    {jdFile
                      ? "Mô tả công việc đã sẵn sàng"
                      : "Tải lên mô tả công việc (PDF/TXT/DOCX)"}
                  </Label>
                  <p className="text-sm text-gray-400 mt-2">
                    {jdFile
                      ? "Nhấp để thay đổi file"
                      : "Kéo thả hoặc nhấp để chọn file"}
                  </p>
                </div>
                <input
                  id="jd-upload"
                  type="file"
                  className="hidden"
                  onChange={handleJdFileChange}
                  accept=".pdf,.txt,.docx"
                />
                {jdFile && (
                  <div className="text-sm text-emerald-400 font-medium bg-emerald-900/30 px-3 py-1 rounded-full">
                    {jdFile.name}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="flex justify-center pt-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              disabled={isUploading || !cvFile || !jdFile}
              className="px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-cyan-700 to-indigo-700 hover:from-cyan-600 hover:to-indigo-600 shadow-lg"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Đang phân tích...
                </>
              ) : (
                <>
                  <UploadCloud className="mr-2 h-5 w-5" />
                  Phân tích độ phù hợp
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
}

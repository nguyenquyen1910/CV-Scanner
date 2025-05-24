"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { UploadIcon, X, AlertCircle, FileIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploadProps {
  accept: string;
  maxSize: number; // in MB
  label: string;
  icon: React.ReactNode;
  onFileSelected: (file: File) => void;
  onFileRemoved: () => void;
  file: File | null;
  isUploading?: boolean;
  uploadProgress?: number;
  error?: string;
}

export function FileUpload({
  accept,
  maxSize,
  label,
  icon,
  onFileSelected,
  onFileRemoved,
  file,
  isUploading = false,
  uploadProgress = 0,
  error,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = useCallback(
    (file: File): boolean => {
      // Kiểm tra định dạng file
      const fileType = file.type;
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const isValidType = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          // Kiểm tra phần mở rộng
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return (
          fileType === type || fileType.startsWith(`${type.split("/")[0]}/`)
        );
      });

      if (!isValidType) {
        toast({
          title: "Định dạng file không hợp lệ",
          description: `Vui lòng tải lên file ${accept.replace(/\./g, "")}`,
          variant: "destructive",
        });
        return false;
      }

      // Kiểm tra kích thước file
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > maxSize) {
        toast({
          title: "File quá lớn",
          description: `Kích thước file tối đa là ${maxSize}MB`,
          variant: "destructive",
        });
        return false;
      }

      return true;
    },
    [accept, maxSize, toast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (validateFile(file)) {
          onFileSelected(file);
        }
      }
    },
    [onFileSelected, validateFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (validateFile(file)) {
          onFileSelected(file);
        }
      }
    },
    [onFileSelected, validateFile]
  );

  const handleRemoveFile = useCallback(() => {
    onFileRemoved();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onFileRemoved]);

  const formatFileSize = (size: number): string => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  return (
    <div
      className={`relative rounded-lg border-2 transition-all duration-300 ${
        error
          ? "border-red-500 bg-red-50/5"
          : file
          ? "border-emerald-500 bg-emerald-50/5"
          : isDragging
          ? "border-cyan-500 bg-cyan-50/5 border-dashed"
          : "border-dashed border-gray-700 hover:border-cyan-700 hover:bg-gray-800/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-6">
        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="file-info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center mr-3">
                    <FileIcon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-200 mb-1 truncate max-w-[200px]">
                      {file.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                {!isUploading && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                    onClick={handleRemoveFile}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Xóa file</span>
                  </Button>
                )}
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Đang tải lên...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress
                    value={uploadProgress}
                    className="h-1 bg-gray-700"
                  />
                </div>
              )}

              {error && (
                <div className="mt-3 flex items-center text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>{error}</span>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              <div className="h-14 w-14 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className="text-lg font-medium text-gray-200 mb-2">
                {label}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Kéo thả file vào đây hoặc nhấp để chọn file
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadIcon className="h-4 w-4 mr-2" />
                Chọn file
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept={accept}
                onChange={handleFileChange}
                disabled={isUploading}
              />
              <p className="text-xs text-gray-500 mt-4">
                Định dạng hỗ trợ: {accept.replace(/\./g, "").toUpperCase()} (tối
                đa {maxSize}MB)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

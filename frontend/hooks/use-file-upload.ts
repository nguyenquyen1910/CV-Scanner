"use client";

import { useState } from "react";
import { uploadCV, uploadJD } from "@/lib/services/file-service";

type FileType = "cv" | "jd";

export function useFileUpload(fileType: FileType) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const [fileId, setFileId] = useState<string | null>(null);

  const uploadFile = async (): Promise<string | null> => {
    if (!file) return null;

    setIsUploading(true);
    setProgress(0);
    setError(undefined);

    try {
      const uploadFunction = fileType === "cv" ? uploadCV : uploadJD;
      const id = await uploadFunction(file, (progress) => {
        setProgress(progress);
      });

      setFileId(id);
      return id;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Lỗi không xác định";
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const resetFile = () => {
    setFile(null);
    setProgress(0);
    setError(undefined);
    setFileId(null);
  };

  return {
    file,
    setFile,
    isUploading,
    progress,
    error,
    fileId,
    uploadFile,
    resetFile,
  };
}

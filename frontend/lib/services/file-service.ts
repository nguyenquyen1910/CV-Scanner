import { API_ENDPOINTS } from "@/lib/api-config";

// Hàm upload file với XMLHttpRequest để theo dõi tiến trình
export const uploadFileWithProgress = (
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);

    // Theo dõi tiến trình upload
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });

    // Xử lý khi hoàn thành
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
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

    // Xử lý lỗi mạng
    xhr.addEventListener("error", () => {
      reject(new Error("Lỗi kết nối mạng"));
    });

    // Xử lý timeout
    xhr.addEventListener("timeout", () => {
      reject(new Error("Yêu cầu hết thời gian chờ"));
    });

    // Mở kết nối và gửi request
    xhr.open("POST", url, true);
    xhr.timeout = 30000; // 30 giây timeout
    xhr.send(formData);
  });
};

export const uploadCV = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const response = await uploadFileWithProgress(
      API_ENDPOINTS.UPLOAD_CV,
      file,
      onProgress
    );
    return response.cv_id || response.id;
  } catch (error) {
    throw new Error(
      `Lỗi khi tải lên CV: ${
        error instanceof Error ? error.message : "Lỗi không xác định"
      }`
    );
  }
};

export const uploadJD = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const response = await uploadFileWithProgress(
      API_ENDPOINTS.UPLOAD_JD,
      file,
      onProgress
    );
    return response.jd_id || response.id;
  } catch (error) {
    throw new Error(
      `Lỗi khi tải lên mô tả công việc: ${
        error instanceof Error ? error.message : "Lỗi không xác định"
      }`
    );
  }
};

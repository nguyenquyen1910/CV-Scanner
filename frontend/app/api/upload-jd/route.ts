import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Không có file được cung cấp" }, { status: 400 })
    }

    // In a real implementation, you would send this file to your backend API
    // For now, we'll simulate a successful response

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock response from backend
    return NextResponse.json({
      message: "Upload thành công",
      jd_id: Math.floor(Math.random() * 1000) + 1, // Mock JD ID
      data: {
        title: "Lập trình viên Frontend Senior",
        company: "Công ty Giải pháp Công nghệ",
        requirements: [
          "5+ năm kinh nghiệm với JavaScript và React",
          "Kinh nghiệm với các framework frontend hiện đại",
          "Kỹ năng giải quyết vấn đề tốt",
          "Bằng cử nhân Khoa học Máy tính hoặc tương đương",
        ],
        responsibilities: [
          "Phát triển và bảo trì các ứng dụng frontend",
          "Hợp tác với các lập trình viên backend",
          "Tối ưu hóa ứng dụng để đạt hiệu suất tối đa",
        ],
      },
    })
  } catch (error) {
    console.error("Lỗi khi tải lên mô tả công việc:", error)
    return NextResponse.json({ error: "Không thể tải lên mô tả công việc" }, { status: 500 })
  }
}

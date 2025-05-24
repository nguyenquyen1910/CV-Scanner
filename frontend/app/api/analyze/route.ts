import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { cv_id, jd_id } = body

    if (!cv_id || !jd_id) {
      return NextResponse.json({ error: "Cần cung cấp cả CV ID và JD ID" }, { status: 400 })
    }

    // In a real implementation, you would send this data to your backend API
    // For now, we'll simulate a successful response

    // Simulate API call delay and processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock analysis result
    // In a real implementation, this would come from your AI analysis backend
    return NextResponse.json({
      education_score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
      experience_score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      skill_score: Math.floor(Math.random() * 25) + 75, // Random score between 75-100
      certificate_score: Math.floor(Math.random() * 60) + 40, // Random score between 40-100
      total_score: Math.floor(Math.random() * 20) + 75, // Random score between 75-95
      comment:
        "Ứng viên có kỹ năng và kinh nghiệm phù hợp với vị trí. Điểm mạnh là các kỹ năng kỹ thuật và kinh nghiệm làm việc với các công nghệ hiện đại. Tuy nhiên, cần bổ sung thêm chứng chỉ chuyên môn để tăng tính cạnh tranh. Khuyến nghị phỏng vấn để đánh giá sâu hơn về khả năng giải quyết vấn đề và làm việc nhóm.",
    })
  } catch (error) {
    console.error("Lỗi khi phân tích tài liệu:", error)
    return NextResponse.json({ error: "Không thể phân tích tài liệu" }, { status: 500 })
  }
}

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
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock response from backend
    return NextResponse.json({
      message: "Upload thành công",
      cv_id: Math.floor(Math.random() * 1000) + 1, // Mock CV ID
      data: {
        base_information: {
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          phone: "0123456789",
        },
        education: [
          {
            school: "Đại học Bách Khoa",
            degree: "Cử nhân Khoa học Máy tính",
            year: "2015-2019",
          },
        ],
        experience: [
          {
            company: "Công ty Công nghệ XYZ",
            position: "Lập trình viên",
            duration: "2019-2022",
          },
        ],
        skill: ["JavaScript", "React", "Node.js", "Python"],
        certificate: ["AWS Certified Developer"],
        project: [
          {
            name: "Website Thương mại điện tử",
            description: "Xây dựng nền tảng thương mại điện tử full-stack",
          },
        ],
      },
    })
  } catch (error) {
    console.error("Lỗi khi tải lên CV:", error)
    return NextResponse.json({ error: "Không thể tải lên CV" }, { status: 500 })
  }
}

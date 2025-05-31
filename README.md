# CV Scanner & Job Matching System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.2-green.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)

</div>

## 📋 Overview

CV Scanner is an AI-powered recruitment automation system that leverages advanced natural language processing to streamline the hiring process. The system automatically analyzes CVs, matches them with job descriptions, and provides intelligent insights to help recruiters make data-driven decisions.

## ✨ Key Features

- **Intelligent CV Analysis**: Automated extraction of key information from CVs including education, experience, skills, and certifications
- **AI-Powered Matching**: Advanced matching algorithm using GPT-4.1 to evaluate CV-JD compatibility
- **Real-time Processing**: Fast and efficient processing of CVs and job descriptions
- **Secure Storage**: Robust database system for storing and managing CVs and job descriptions
- **RESTful API**: Well-documented API endpoints for seamless integration
- **Modern UI**: Responsive and intuitive user interface built with Next.js and Tailwind CSS

## 🛠️ Tech Stack

### Backend

- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **AI Integration**: OpenAI GPT-4.1
- **Testing**: pytest
- **Documentation**: Swagger UI

### Frontend

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL
- Docker (optional)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/nguyenquyen1910/CV-Scanner
cd cv-scanner
```

2. **Set up environment variables**
   Create a `.env` file in the root directory:

```env
OPENROUTER_API_KEY=your_api_key
OPENROUTER_MODEL=qwen/qwen3-235b-a22b
```

3. **Install dependencies**

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

4. **Run with Docker**

```bash
docker-compose up --build
```

## 📁 Project Structure

```
cv-scanner/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   ├── database/
│   │   ├── models/
│   │   └── services/
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── components/
│   ├── pages/
│   └── public/
└── docker-compose.yml
```

## 🔌 API Endpoints

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | `/upload-cv/`         | Upload and process CV |
| POST   | `/cv-storage/save-cv` | Save CV to database   |
| GET    | `/cv-storage/`        | Retrieve CV list      |
| POST   | `/jd-storage/save-jd` | Save job description  |
| GET    | `/result-storage/`    | Get analysis results  |

## 🧪 Testing

Run the test suite:

```bash
pytest tests/
```

## 📊 Performance

- Average CV processing time: < 5 seconds
- Matching accuracy: > 85%
- API response time: < 200ms

## 🔒 Security

- JWT-based authentication
- File upload validation
- Rate limiting
- Input sanitization
- Secure API endpoints

## 🚀 Deployment

The application is containerized using Docker and can be deployed using:

```bash
docker-compose up -d
```

## 📈 Future Enhancements

- [ ] Advanced analytics dashboard
- [ ] Integration with job boards
- [ ] Enhanced AI matching algorithms
- [ ] Candidate ranking system
- [ ] Automated interview scheduling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Nguyen Quyen** - _Initial work_ - [GitHub](https://github.com/nguyenquyen1910)

## 📞 Contact

- **Email**: jrnguyen14@gmail.com
- **GitHub**: [@nguyenquyen1910](https://github.com/nguyenquyen1910)

---

<div align="center">
Made with ❤️ by Nguyen Quyen
</div>

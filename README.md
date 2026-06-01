# Sonus

**A full-stack music recognition application that identifies songs from audio uploads.**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-sonus--sable.vercel.app-brightgreen.svg)](https://sonus-sable.vercel.app)

## Overview

Sonus is a modern, full-stack web application that enables users to upload audio files and instantly identify the song, artist, and metadata. Built with a React frontend and Python Flask backend, it leverages the ACRCloud API for accurate music recognition.

## Features

- **Audio Upload & Recognition** - Upload any audio file and instantly identify the song
- **Accurate Identification** - Powered by ACRCloud's music recognition API
- **Modern UI** - Built with React, Tailwind CSS, and Lucide React icons
- **Production Ready** - Containerized with Docker for easy deployment
- **CORS Enabled** - Seamless frontend-backend communication

## Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Node.js** - JavaScript runtime

### Backend
- **Python 3.11** - Server language
- **Flask** - Web framework
- **ACRCloud** - Music recognition API
- **Gunicorn** - Production WSGI server

### DevOps
- **Docker** - Containerization
- **Vercel** - Frontend hosting

## Project Structure

```
Sonus/
├── frontend/                 # React application
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── app.py                   # Flask server
├── recognizer.py            # Audio recognition logic
├── requirements.txt         # Python dependencies
├── Dockerfile              # Container configuration
└── README.md               # This file
```

## Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Docker (optional, for containerization)
- ACRCloud API credentials

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/TuheliRay/Sonus.git
   cd Sonus
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   ACR_HOST=your_acrcloud_host
   ACR_ACCESS_KEY=your_acrcloud_access_key
   ACR_ACCESS_SECRET=your_acrcloud_access_secret
   ```

5. **Run the Flask server**
   ```bash
   python app.py
   ```
   The server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

### Docker Setup (Optional)

1. **Build the Docker image**
   ```bash
   docker build -t sonus-backend .
   ```

2. **Run the container**
   ```bash
   docker run -p 10000:10000 --env-file .env sonus-backend
   ```

## API Documentation

### POST `/identify-upload`

Uploads an audio file and returns song identification details.

**Request:**
- **Method:** POST
- **Content-Type:** multipart/form-data
- **Parameter:** `audio` (required) - Audio file (WAV, MP3, etc.)

**Response (Success):**
```json
{
  "title": "Song Title",
  "artist": "Artist Name",
  "acrcloud_time": 250,
  "total_backend_time": 1.234
}
```

**Response (Error):**
```json
{
  "error": "Song not recognized"
}
```

## Usage

1. Open the application in your browser
2. Click the upload button or drag-and-drop an audio file
3. Wait for the recognition process to complete
4. View the identified song details including title and artist

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ACR_HOST` | ACRCloud API host | Yes |
| `ACR_ACCESS_KEY` | ACRCloud API access key | Yes |
| `ACR_ACCESS_SECRET` | ACRCloud API access secret | Yes |

## Performance

- **Average Recognition Time:** ~250-500ms (via ACRCloud)
- **Total Backend Processing:** ~1-2 seconds including file upload and cleanup
- **Frontend Build:** Optimized with Vite for minimal bundle size

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Live Demo

Visit the live application: [https://sonus-sable.vercel.app](https://sonus-sable.vercel.app)

## Author

Created by [TuheliRay](https://github.com/TuheliRay)

## Support

For issues, questions, or suggestions, please open an [issue](https://github.com/TuheliRay/Sonus/issues) on GitHub.

---

**Built with ❤️ for music lovers**

from flask import Flask, jsonify, request
from downloader import download_audio
from recognizer import recognize_audio
from parser import _parse_time_to_seconds
from flask_cors import CORS
import os
import uuid

app = Flask(__name__)
CORS(app)

TEMP_DIR = "temp"
if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)


def process_audio_file(file_path):
    try:
        result = recognize_audio(file_path)
        return result
    except Exception as exc:
        return {"error": f"Failed to process audio file: {exc}"}, 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)


@app.route("/identify", methods=["POST"])
def identify_song():
    data = request.get_json(silent=True) or {}
    url = (data.get("url") or "").strip()

    if not url:
        return jsonify({"error": "A YouTube video or Shorts link is required."}), 400

    try:
        timestamp = _parse_time_to_seconds(data.get("start_time"))
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400

    try:
        audio_file = download_audio(url, timestamp)
    except Exception as exc:
        return jsonify({"error": f"Failed to download audio clip: {exc}"}), 500

    result = process_audio_file(audio_file)
    return jsonify(result)


@app.route("/identify-upload", methods=["POST"])
def identify_uploaded_audio():
    if "audio" not in request.files:
        return jsonify({"error":"No audio file uploaded"}) , 400

    audio_file = request.files["audio"]

    # Process the uploaded audio file here
    if audio_file.filename == "":
        return jsonify({"error" : "No selected file"}) , 400
    
    clip_id = uuid.uuid4().hex
    filename = audio_file.filename
    ext = os.path.splitext(filename)[1]
    temp_path = os.path.join("temp" , f"audio-{clip_id}{ext}")
    audio_file.save(temp_path)

    result = process_audio_file(temp_path)
    return jsonify(result)
    
if __name__ == "__main__":
    app.run(debug=True)
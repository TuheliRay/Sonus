from flask import Flask, jsonify, request
from recognizer import recognize_audio
from flask_cors import CORS
import time
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
    start_time = time.time()
    result = process_audio_file(temp_path)
    print(f"Identified song in {time.time() - start_time} seconds")
    return jsonify(result)
    
if __name__ == "__main__":
    app.run(debug=True)
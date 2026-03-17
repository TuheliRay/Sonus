from flask import Flask, jsonify, request
from downloader import download_audio
from recognizer import recognize_audio
import os

app = Flask(__name__)


def _parse_time_to_seconds(value):
    if isinstance(value, (int, float)):
        return max(int(value), 0)

    text = str(value or "").strip()
    if not text:
        raise ValueError("Time value is required.")

    parts = text.split(":")
    if not all(part.isdigit() for part in parts):
        raise ValueError("Use seconds or a mm:ss / hh:mm:ss format.")

    seconds = 0
    for part in parts:
        seconds = seconds * 60 + int(part)
    return seconds


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

    try:
        result = recognize_audio(audio_file)
    finally:
        if os.path.exists(audio_file):
            os.remove(audio_file)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)

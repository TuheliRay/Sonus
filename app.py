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

    # Validate input
    if not all(part.isdigit() for part in parts):
        raise ValueError("Use seconds or mm:ss / hh:mm:ss format.")

    parts = list(map(int, parts))

    if len(parts) == 1:
        # "90"
        return parts[0]

    elif len(parts) == 2:
        # "mm:ss"
        minutes, seconds = parts
        return minutes * 60 + seconds

    elif len(parts) == 3:
        # "hh:mm:ss"
        hours, minutes, seconds = parts
        return hours * 3600 + minutes * 60 + seconds

    else:
        raise ValueError("Invalid time format")


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
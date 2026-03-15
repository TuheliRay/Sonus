from flask import Flask, jsonify, request
from downloader import download_audio
from recognizer import recognize_clip
app = Flask(__name__)
@app.route('/identify' , method = ['POST'])
def identify_song():
    data = request.json
    url = data['url']
    timestamp = data['timestamp']
    audio_file = download_audio(url , timestamp)
    result = recognize_clip(audio_file)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
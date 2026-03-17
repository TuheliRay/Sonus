from acrcloud.recognizer import ACRCloudRecognizer
from dotenv import load_dotenv
import json
import os

load_dotenv()

config = {
    'host': os.getenv('ACR_HOST'),
    'access_key': os.getenv('ACR_ACCESS_KEY'),
    'access_secret': os.getenv('ACR_ACCESS_SECRET'),
    'timeout': 10
}

# create recognizer object
recognizer = ACRCloudRecognizer(config)


def recognize_audio(audio_file):
    try:
        result = recognizer.recognize_by_file(audio_file, 0)
        result_json = json.loads(result)
    except Exception as e:
        return {"error": f"Error recognizing audio: {e}"}

    music_list = result_json.get("metadata", {}).get("music")
    if not music_list:
        return {"error": "Song not recognized"}

    music = music_list[0]
    artists = music.get("artists", [])

    return {
        "title": music.get("title", "Unknown title"),
        "artist": artists[0].get("name", "Unknown artist") if artists else "Unknown artist",
    }

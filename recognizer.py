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
    result = recognizer.recognize_by_file(audio_file, 0)
    result_json = json.loads(result)
    if 

# identify music from audio file
# result = recognizer.recognize_by_file("portrait.mp3", 0)

# # parse JSON result
# result_json = json.loads(result)

# if result_json.get("status", {}).get("code") == 0:
#     music = result_json.get("metadata", {}).get("music", [{}])[0]

#     title = music.get("title", "Unknown title")
#     artists_list = music.get("artists", [])
#     artists = ", ".join([a.get("name", "Unknown artist") for a in artists_list]) if artists_list else "Unknown artist"
#     album = music.get("album", {}).get("name", "Unknown album")
#     genres_list = music.get("genres", [])
#     genre = genres_list[0].get("name", "Unknown genre") if genres_list else "Unknown genre"

#     print("Song:", title)
#     print("Artist:", artists)
#     print("Album:", album)
#     print("Genre:", genre)
# else:
#     print("No song recognized")
import yt_dlp
import os
def download_audio(url , timestamp):
    os.makedirs('temp' , exist_ok = True)
    output_path = 'temp/audio.%(ext)s'
    start = max(timestamp - 3, 0)
    end = timestamp + 12
    ydl_opts = {
        'format': 'bestaudio/best',
        "download_ranges": lambda info , ctx :[{
            'start_time': start,
            'end_time': end
        }],
        'outtmpl': output_path,
        'quiet': True
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    for file in os.listdir('temp'):
        if file.startswith('audio'):
            return os.path.join('temp' , file)
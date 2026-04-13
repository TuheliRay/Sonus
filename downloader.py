import os
import uuid

import yt_dlp


def download_audio(url, timestamp):
    clip_id = uuid.uuid4().hex
    output_path = os.path.join('temp', f'audio-{clip_id}.%(ext)s')
    start = max(timestamp - 3, 0)
    end = timestamp + 12
    ydl_opts = {
        'format': 'bestaudio/best',
        "download_ranges": lambda info, ctx: [{
            'start_time': start,
            'end_time': end
        }],
        'no_js_runtimes': True,
        'outtmpl': output_path,
        'quiet': True,
        'noplaylist': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    for file in os.listdir('temp'):
        if file.startswith(f'audio-{clip_id}'):
            return os.path.join('temp', file)
    raise FileNotFoundError('Downloaded audio clip was not found.')

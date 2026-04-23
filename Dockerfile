FROM python:3.11-slim

# No extra system dependencies needed anymore!

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py recognizer.py ./

RUN mkdir -p temp

EXPOSE 10000

CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:10000"]

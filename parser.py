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
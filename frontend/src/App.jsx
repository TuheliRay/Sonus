import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    url: '',
    start_time: '',
  })
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('loading')
    setResult(null)
    setError('')

    try {
      const response = await fetch('/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Something went wrong while identifying the song.')
      }

      setResult(data)
      setStatus('success')
    } catch (submitError) {
      setError(submitError.message)
      setStatus('error')
    }
  }

  return (
    <main className="mx-auto grid w-[min(1100px,calc(100%-2rem))] items-start gap-6 py-12 pb-16 md:grid-cols-[1.15fr_0.85fr] md:pt-16">
      <section className="grid gap-8 rounded-[28px] border border-white/45 bg-card p-8 shadow-glass backdrop-blur-[14px] max-[720px]:rounded-[22px] max-[720px]:p-5">
        <div>
          <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-dark">
            YouTube song finder
          </p>
          <h3 className="m-0 max-w-[12ch] font-heading text-[clamp(2.8rem,8vw,5.5rem)] font-bold leading-none">
            Paste a video link, choose the exact moment, and let Sonus identify the music.
          </h3>
          <p className="mt-4 text-muted leading-relaxed">
            Works with standard YouTube videos and Shorts links. Enter the section where the soundtrack is clearest,
            and Sonus will send that clip to the backend for recognition.
          </p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-[0.92rem] font-medium">YouTube or Shorts URL</span>
            <input
              name="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
              required
              className="w-full rounded-[18px] border border-line bg-white/70 px-4 py-[1.05rem] text-ink transition-[border-color,transform,box-shadow] duration-150 ease-out focus:outline-none focus:border-accent/75 focus:-translate-y-0.5 focus:shadow-[0_0_0_4px_rgba(201,107,59,0.12)]"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2 max-[720px]:grid-cols-1">
            <label className="grid gap-2">
              <span className="text-[0.92rem] font-medium">Timestamp</span>
              <input
                name="start_time"
                type="text"
                value={formData.start_time}
                onChange={handleChange}
                placeholder="0:30"
                required
                className="w-full rounded-[18px] border border-line bg-white/70 px-4 py-[1.05rem] text-ink transition-[border-color,transform,box-shadow] duration-150 ease-out focus:outline-none focus:border-accent/75 focus:-translate-y-0.5 focus:shadow-[0_0_0_4px_rgba(201,107,59,0.12)]"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="cursor-pointer rounded-full bg-linear-to-br from-accent to-[#b34c1f] px-6 py-4 font-bold text-[#fff8ef] shadow-[0_14px_34px_rgba(179,76,31,0.28)] transition-[transform,box-shadow,opacity] duration-150 ease-out hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {status === 'loading' ? 'Identifying...' : 'Identify music'}
          </button>
        </form>
      </section>

      <section
        className="min-h-[280px] rounded-[28px] border border-white/45 bg-card p-7 shadow-glass backdrop-blur-[14px] md:sticky md:top-8 max-[720px]:rounded-[22px] max-[720px]:p-5"
        aria-live="polite"
      >
        {status === 'success' && result ? (
          <div className="grid gap-4">
            <p className="m-0 text-xs uppercase tracking-[0.16em] text-success">Match found</p>
            <h2 className="m-0 text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[0.95]">
              {result.title || 'Unknown title'}
            </h2>
            <p className="m-0 text-[1.1rem] font-medium text-accent-dark">{result.artist || 'Unknown artist'}</p>
            <div className="mt-1 grid gap-3">
              <div className="flex justify-between gap-4 border-t border-line pt-3">
                <strong className="text-[0.92rem]">Checked clip</strong>
                <span className="text-muted leading-relaxed">Around {formData.start_time}</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-line pt-3">
                <strong className="text-[0.92rem]">Source</strong>
                <span className="text-muted leading-relaxed">YouTube or Shorts link</span>
              </div>
            </div>
          </div>
        ) : null}

        {status === 'loading' ? (
          <div className="grid gap-3">
            <p className="m-0 text-xs uppercase tracking-[0.16em] text-accent-dark">Loading</p>
            <h2 className="m-0 text-3xl font-bold leading-tight">Listening to your selected clip...</h2>
            <p className="text-muted leading-relaxed">Downloading the chosen timeframe and sending it for recognition.</p>
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="grid gap-3">
            <p className="m-0 text-xs uppercase tracking-[0.16em] text-error">Error</p>
            <h2 className="m-0 text-3xl font-bold leading-tight">No match returned</h2>
            <p className="text-muted leading-relaxed">{error || 'Something went wrong while identifying the song.'}</p>
          </div>
        ) : null}

        {status === 'idle' ? (
          <div className="grid gap-3">
            <p className="m-0 text-xs uppercase tracking-[0.16em] text-muted">Ready</p>
            <h2 className="m-0 text-3xl font-bold leading-tight">Results will appear here.</h2>
            <p className="text-muted leading-relaxed">
              Pick a timestamp with audible music, like <strong className="font-semibold text-ink">0:30</strong>.
            </p>
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default App

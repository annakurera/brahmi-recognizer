import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import { MAX_IMAGE_EDGE, recognizeCharacter, type Prediction } from '../config'
import PredictionsPanel from './PredictionsPanel'

const ACCEPT = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

const SERVICE_ERROR =
  'Unable to reach the recognition service. Please try again later.'

async function downscaleImage(file: File, maxEdge = MAX_IMAGE_EDGE): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const longest = Math.max(bitmap.width, bitmap.height)
  const scale = longest > maxEdge ? maxEdge / longest : 1
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) {
    bitmap.close()
    return file
  }
  context.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((result) => resolve(result), mime, 0.9)
  })
  return blob ?? file
}

function Spinner({ waking }: { waking: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-uop-gold/30 border-t-uop-blue" />
      <p className="font-serif text-lg text-charcoal">
        {waking
          ? 'Waking up the model... this may take up to 60 seconds'
          : 'Analyzing inscription...'}
      </p>
      {!waking && <p className="text-sm text-stone-500">This may take a few moments.</p>}
    </div>
  )
}

export default function UploadSection() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isWaking, setIsWaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasImage = Boolean(previewUrl)

  const reset = useCallback(() => {
    setPredictions([])
    setError(null)
    setIsLoading(false)
    setIsWaking(false)
    setIsDragging(false)
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current)
      return null
    })
    if (inputRef.current) inputRef.current.value = ''
  }, [])

  const processFile = useCallback(async (file: File) => {
    if (!ACCEPT.includes(file.type) && !file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, or WebP).')
      return
    }

    setError(null)
    setPredictions([])
    setIsWaking(false)
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current)
      return URL.createObjectURL(file)
    })
    setIsLoading(true)

    try {
      const payload = await downscaleImage(file)
      const result = await recognizeCharacter(payload, () => setIsWaking(true))
      setPredictions(result)
    } catch {
      setError(SERVICE_ERROR)
    } finally {
      setIsLoading(false)
      setIsWaking(false)
    }
  }, [])

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) void processFile(file)
  }

  const onDrop = (event: DragEvent<HTMLButtonElement | HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file) void processFile(file)
  }

  const onDragOver = (event: DragEvent<HTMLButtonElement | HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.24em] text-uop-blue/80">
          Recognition
        </p>
        <h2 className="mt-2 text-center font-serif text-3xl text-charcoal sm:text-4xl">
          Upload an inscription
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-stone-500">
          Drop a photograph or rubbing of an Early Brahmi character. The model
          returns a ranked list of likely classes.
        </p>
      </motion.div>

      <div className="mt-10">
        {!hasImage ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={() => setIsDragging(false)}
            className={`group w-full rounded-3xl border-2 border-dashed px-6 py-16 text-center transition-all duration-300 sm:py-20 ${
              isDragging
                ? 'border-uop-blue bg-uop-blue/5'
                : 'border-stone-400/70 bg-white/50 hover:border-uop-blue/60 hover:bg-white'
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-stone-400/40 bg-white shadow-soft transition-transform duration-300 group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-uop-blue"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-7.5L12 3m0 0 4.5 6m-4.5-6v12.75"
                />
              </svg>
            </div>
            <p className="mt-5 font-serif text-2xl text-charcoal">Drop an image here</p>
            <p className="mt-2 text-sm text-stone-500">
              or click to browse from your device
            </p>
          </button>
        ) : (
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={() => setIsDragging(false)}
            className={`rounded-3xl border-2 p-4 transition-colors duration-300 sm:p-6 ${
              hasImage && !error
                ? 'border-success-border bg-success-bg/60'
                : 'border-stone-400/50 bg-white/40'
            } ${error ? 'border-red-300 bg-red-50/50' : ''} ${
              isDragging ? 'border-uop-blue' : ''
            }`}
          >
            <div className="grid items-start gap-6 lg:grid-cols-2">
              <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
                <img
                  src={previewUrl ?? ''}
                  alt="Uploaded inscription"
                  className="max-h-[420px] w-full object-contain"
                />
              </div>
              <div className="min-h-[260px]">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Spinner waking={isWaking} />
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-white/80 p-8 text-center"
                    >
                      <p className="font-serif text-xl text-charcoal">{error}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preds"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <PredictionsPanel predictions={predictions} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-uop-blue/20 bg-white px-6 py-2.5 text-sm font-medium text-uop-blue shadow-sm transition hover:border-uop-gold hover:text-charcoal"
              >
                Clear / Try Another
              </button>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onInputChange}
        />
      </div>
    </section>
  )
}

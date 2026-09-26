import { motion } from 'framer-motion'
import type { Prediction } from '../config'

type PredictionsPanelProps = {
  predictions: Prediction[]
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

export default function PredictionsPanel({ predictions }: PredictionsPanelProps) {
  const topFive = predictions.slice(0, 5)
  const top = topFive[0]

  if (!top) {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-stone-400/50 bg-white/50 p-8 text-center text-stone-500">
        Predictions will appear here after analysis.
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-center rounded-2xl border border-stone-400/20 bg-white/80 p-6 shadow-card sm:p-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-uop-blue/80">
        Top prediction
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <h3 className="font-serif text-4xl font-semibold capitalize text-charcoal sm:text-5xl">
          {top.label}
        </h3>
        <p className="text-lg font-medium text-uop-gold">{formatPercent(top.confidence)}</p>
      </div>
      <div className="mt-3 h-px bg-gradient-to-r from-uop-gold/80 to-transparent" />

      <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500">
        Top-5 candidates
      </p>
      <ul className="mt-4 space-y-3.5">
        {topFive.map((item, index) => {
          const isTop = index === 0
          return (
            <li key={`${item.label}-${index}`}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className={`capitalize ${isTop ? 'font-medium text-charcoal' : 'text-stone-600'}`}>
                  {item.label}
                </span>
                <span className={isTop ? 'text-uop-blue' : 'text-stone-400'}>
                  {formatPercent(item.confidence)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-ivory">
                <motion.div
                  className={`progress-fill h-full rounded-full ${
                    isTop
                      ? 'bg-gradient-to-r from-uop-blue to-uop-gold'
                      : 'bg-stone-400/70'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: Math.min(Math.max(item.confidence, 0.03), 1) }}
                  transition={{ duration: 0.7, delay: 0.08 * index, ease: 'easeOut' }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

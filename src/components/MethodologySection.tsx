import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ivory text-uop-blue">
      {children}
    </span>
  )
}

const cube = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3 4.5 7.5v9L12 21l7.5-4.5v-9L12 3Z" />
    <path d="M12 21V12M4.5 7.5 12 12l7.5-4.5" />
  </svg>
)

const mountain = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m3 18 6-8 4 5 2-3 6 6H3Z" />
  </svg>
)

const layers = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path strokeLinejoin="round" d="m12 4 8 4-8 4-8-4 8-4Z" />
    <path strokeLinecap="round" d="m4 12 8 4 8-4M4 16l8 4 8-4" />
  </svg>
)

const archive = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="4" y="4" width="16" height="6" rx="1" />
    <path strokeLinecap="round" d="M6 10v8h12v-8M10 13h4" />
  </svg>
)

const network = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="M8 12h8M16.2 7.6 8 11.2M8 12.8l8.2 3.6" />
  </svg>
)

const mirror = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path strokeLinecap="round" d="M12 4v16M8 8 4 12l4 4M16 8l4 4-4 4" />
  </svg>
)

const balance = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path strokeLinecap="round" d="M12 4v16M6 20h12M12 6 6 12h12L12 6Z" />
  </svg>
)

const flask = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path strokeLinejoin="round" d="M9 4h6M10 4v5L5 18a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 18l-5-9V4" />
  </svg>
)

const chart = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path strokeLinecap="round" d="M4 19h16M7 16v-5M12 16V8M17 16v-8" />
  </svg>
)

export default function MethodologySection() {
  return (
    <section className="bg-ivory/70 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <motion.div {...fade} className="max-w-2xl">
          <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">For Anyone Interested</h2>
          <p className="mt-3 text-stone-500">
            Curious about how this works? Here's a brief look at the research behind this tool.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <motion.article
            {...fade}
            className="rounded-2xl border border-stone-400/20 bg-white p-7 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-soft sm:p-8"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-uop-gold">
              Data
            </p>
            <h3 className="mt-2 font-serif text-2xl text-charcoal">
              Dataset Preparation using 3D Rendering
            </h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-stone-600">
              <li className="flex gap-3">
                <IconWrap>{cube}</IconWrap>
                <span>
                  A procedural 3D synthesis pipeline built in Blender generates photorealistic synthetic Brahmi character samples.
                </span>
              </li>
              <li className="flex gap-3">
                <IconWrap>{mountain}</IconWrap>
                <span>
                  Realistic stone micro-textures derived from actual Sri Lankan geological sites (Wanni and Vijayan Complex gneiss rock).
                </span>
              </li>
              <li className="flex gap-3">
                <IconWrap>{layers}</IconWrap>
                <span>
                  Displacement height-mapping simulates real carving depth, while domain randomization varies lighting, camera position, and stone texture across 26,000+ renders.
                </span>
              </li>
              <li className="flex gap-3">
                <IconWrap>{archive}</IconWrap>
                <span>This approach overcomes the severe scarcity of real-world inscription data.</span>
              </li>
            </ul>
          </motion.article>

          <motion.article
            {...fade}
            transition={{ ...fade.transition, delay: 0.08 }}
            className="rounded-2xl border border-stone-400/20 bg-white p-7 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-soft sm:p-8"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-uop-blue">
              Model
            </p>
            <h3 className="mt-2 font-serif text-2xl text-charcoal">
              Training the Visformer-Small Architecture
            </h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-stone-600">
              <li className="flex gap-3">
                <IconWrap>{network}</IconWrap>
                <span>
                  A hybrid CNN-Transformer model (Visformer-Small) combines local stroke detection with global character structure understanding.
                </span>
              </li>
              <li className="flex gap-3">
                <IconWrap>{mirror}</IconWrap>
                <span>
                  Script-aware augmentation: horizontal flipping is disabled to preserve the directional identity (chirality) of Brahmi characters.
                </span>
              </li>
              <li className="flex gap-3">
                <IconWrap>{balance}</IconWrap>
                <span>
                  Weighted Focal Loss handles class imbalance; MixUp, CutMix, and EMA regularization prevent overfitting on scarce data.
                </span>
              </li>
              <li className="flex gap-3">
                <IconWrap>{flask}</IconWrap>
                <span>
                  Test-Time Augmentation (TTA) averages multiple prediction views for robustness.
                </span>
              </li>
              <li className="flex gap-3">
                <IconWrap>{chart}</IconWrap>
                <span>
                  <strong className="font-medium text-charcoal">
                    Key result: 98.67% TTA accuracy on the combined real + synthetic dataset
                  </strong>{' '}
                  — a +19% improvement over training on real data alone (79.66%).
                </span>
              </li>
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

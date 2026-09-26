import { motion } from 'framer-motion'
import { useState } from 'react'
import uopLogo from '../assets/images/uop_logo.png'

export default function Header() {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <header className="relative overflow-hidden bg-parchment">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.08),_transparent_42%)]" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-[3rem_1fr_3rem] items-start gap-3 px-6 pb-10 pt-8 sm:grid-cols-[3.5rem_1fr_3.5rem] sm:px-8">
        <div className="flex h-12 items-center justify-start sm:h-14">
          {logoFailed ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-uop-gold/50 bg-uop-blue text-[10px] font-semibold tracking-wide text-parchment sm:h-14 sm:w-14">
              UoP
            </div>
          ) : (
            <img
              src={uopLogo}
              alt="University of Peradeniya"
              className="h-12 w-auto max-w-[3.5rem] object-contain sm:h-14"
              onError={() => setLogoFailed(true)}
            />
          )}
        </div>

        <motion.div
          className="min-w-0 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="font-serif text-[1.65rem] font-semibold leading-tight text-charcoal sm:text-5xl">
            Brahmi Character Recognizer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-500 sm:text-base">
            AI-powered recognition of Early Brahmi inscriptions — a research
            project by the University of Peradeniya
          </p>
        </motion.div>

        <div aria-hidden="true" />
      </div>
      <div className="h-px w-full bg-uop-gold" />
    </header>
  )
}

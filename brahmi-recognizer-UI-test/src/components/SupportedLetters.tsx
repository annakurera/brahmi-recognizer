import ga from '../assets/letters/ga.png'
import ka from '../assets/letters/ka.png'
import ma from '../assets/letters/ma.png'
import pa from '../assets/letters/pa.png'
import sha from '../assets/letters/sha.png'
import tha from '../assets/letters/tha.png'

type SupportedLetter = {
  /** Romanized name, matching the label the model returns. */
  name: string
  /** Sinhala equivalent. */
  sinhala: string
  image: string
}

// To support a new character: add its image to src/assets/letters/,
// import it above, and add an entry here.
const SUPPORTED_LETTERS: SupportedLetter[] = [
  { name: 'ga', sinhala: 'ග', image: ga },
  { name: 'ka', sinhala: 'ක', image: ka },
  { name: 'ma', sinhala: 'ම', image: ma },
  { name: 'pa', sinhala: 'ප', image: pa },
  { name: 'sha', sinhala: 'ශ', image: sha },
  { name: 'tha', sinhala: 'ත', image: tha },
]

export default function SupportedLetters() {
  return (
    <div className="mt-10">
      <p className="text-center text-lg italic text-ink-soft">
        The model currently recognizes only these characters
      </p>

      <ul className="mx-auto mt-5 grid max-w-4xl grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-6 sm:gap-x-5">
        {SUPPORTED_LETTERS.map((letter) => (
          <li key={letter.name}>
            <figure className="m-0">
              <div className="border border-rule bg-paper p-1.5">
                <img
                  src={letter.image}
                  alt={`Brahmi character ${letter.name} (${letter.sinhala}) carved in stone`}
                  width={224}
                  height={224}
                  className="block aspect-square w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 flex items-baseline justify-center gap-2.5 leading-none">
                <span className="font-serif text-xl text-ink">{letter.name}</span>
                <span className="font-sinhala text-2xl font-medium text-bronze" lang="si">
                  {letter.sinhala}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  )
}

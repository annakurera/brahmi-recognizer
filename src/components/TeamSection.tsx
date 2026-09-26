import { motion } from 'framer-motion'
import { useState } from 'react'
import supervisorMaheshi from '../assets/images/supervisor_maheshi.png'
import developerAnna from '../assets/images/developer_anna.png'
import developerNamidu from '../assets/images/developer_namidu.png'

type Member = {
  name: string
  role: string
  email: string
  department: string
  photo: string
  featured?: boolean
}

const team: Member[] = [
  {
    name: 'Prof. Maheshi B. Dissanayake',
    role: 'Supervisor',
    email: 'maheshid@eng.pdn.ac.lk',
    department: 'Department of Electrical & Electronic Engineering, University of Peradeniya',
    photo: supervisorMaheshi,
    featured: true,
  },
  {
    name: 'Anna Kurera',
    role: 'Developer',
    email: 'anna.kurera@gmail.com',
    department: 'Department of Computer Engineering, University of Peradeniya',
    photo: developerAnna,
  },
  {
    name: 'Namidu S. Wickamanayaka',
    role: 'Developer',
    email: 'n.s.wick.303@gmail.com',
    department: 'Department of Computer Engineering, University of Peradeniya',
    photo: developerNamidu,
  },
]

function Avatar({ src, name, featured }: { src: string; name: string; featured?: boolean }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`mx-auto h-32 w-32 overflow-hidden rounded-full ring-2 ${
        featured ? 'ring-uop-gold' : 'ring-stone-400/40'
      } ring-offset-4 ring-offset-white transition-transform duration-300 group-hover:scale-105`}
    >
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-ivory text-stone-400">
          <svg viewBox="0 0 24 24" className="h-14 w-14" fill="currentColor" aria-hidden="true">
            <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2c-4.2 0-8 2.1-8 5v1h16v-1c0-2.9-3.8-5-8-5Z" />
          </svg>
        </div>
      ) : (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

export default function TeamSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">The Team</h2>
          <p className="mt-3 text-stone-500">Researchers and developers behind this project.</p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((member, index) => (
            <motion.article
              key={member.email}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
              className={`group rounded-2xl bg-white p-8 text-center shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-soft ${
                member.featured
                  ? 'border-2 border-uop-gold'
                  : 'border border-stone-400/20'
              }`}
            >
              <Avatar src={member.photo} name={member.name} featured={member.featured} />
              <h3 className="mt-6 font-serif text-xl text-charcoal">{member.name}</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.16em] text-uop-blue">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">{member.department}</p>
              <a
                href={`mailto:${member.email}`}
                className="mt-5 inline-flex items-center gap-2 text-sm text-stone-600 transition hover:text-uop-blue"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path strokeLinejoin="round" d="m4 7 8 6 8-6" />
                </svg>
                {member.email}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

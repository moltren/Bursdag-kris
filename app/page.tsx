import { BirthdayPage } from '@/components/birthday-page'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={playfair.className}>
      <BirthdayPage />
    </main>
  )
}

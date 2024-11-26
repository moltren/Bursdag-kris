'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import TransitionDoodle from './transition-doodle'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion, AnimatePresence } from 'framer-motion'

// Real memories data with images and captions
const memories = [
  { id: 1, src: 'https://i.imgur.com/OcnSB51.jpeg', alt: 'Wedding plans', text: 'Sånn blir det når vi skal gifte oss.' },
  { id: 2, src: 'https://i.imgur.com/z8H8c41.jpeg', alt: 'First vacation', text: 'Første ferie sammen – Bulgaria.' },
  { id: 3, src: 'https://i.imgur.com/R3cLUzQ.jpeg', alt: 'Pizza date', text: 'Pizza-date på UNA.' },
  { id: 4, src: 'https://i.imgur.com/5sv3JCG.jpeg', alt: 'Beautiful eyes', text: 'Du har de peneste øynene i verden.' },
  { id: 5, src: 'https://i.imgur.com/joeY4uW.jpeg', alt: 'Dressed up', text: 'Pyntet oss før vi skulle på date i Bulgaria.' },
  { id: 6, src: 'https://i.imgur.com/VzA9ZIH.jpeg', alt: 'Beach date', text: 'Strand-date.' },
  { id: 7, src: 'https://i.imgur.com/2HXWQj0.jpeg', alt: 'Beautiful night', text: 'Datenight – da var du veldig pen.' },
  { id: 8, src: 'https://i.imgur.com/Az5kLIF.jpeg', alt: 'Anniversary', text: '1 år med verdens beste kjæreste.' },
  { id: 9, src: 'https://i.imgur.com/ej4e3pc.jpeg', alt: 'BBQ', text: 'Røft BBQ – NOM NOM NOM.' },
  { id: 10, src: 'https://i.imgur.com/loTFf8s.jpeg', alt: 'Ice cream date', text: 'Datenight med is.' },
  { id: 11, src: 'https://i.imgur.com/JRP1qRX.jpeg', alt: 'Happy together', text: 'Du gjør meg alltid blid.' },
  { id: 12, src: 'https://i.imgur.com/WJuW0uX.jpeg', alt: 'Hair braiding', text: 'Lærer meg å flette hår.' },
  { id: 13, src: 'https://i.imgur.com/pf7FaYI.jpeg', alt: 'Elevator fun', text: 'Bare tuller i heisen – CUTE.' },
  { id: 14, src: 'https://i.imgur.com/VYL5QRS.jpeg', alt: 'Always beautiful', text: 'Du er alltid så pen.' },
  { id: 15, src: 'https://i.imgur.com/ImgU7FA.jpeg', alt: 'Much love', text: 'Much love – vil bare spise deg opp.' },
  { id: 16, src: 'https://i.imgur.com/l5wQmGj.jpeg', alt: 'Billiards lesson', text: 'Lærer deg biljard – du var overraskende god!' },
  { id: 17, src: 'https://i.imgur.com/IHPIlxZ.jpeg', alt: 'Elevator selfie', text: 'Liten heis-selfie.' },
  { id: 18, src: 'https://i.imgur.com/z12fYd5.jpeg', alt: 'Fantastic you', text: 'Du er så fantastisk.' },
  { id: 19, src: 'https://i.imgur.com/fPAFrN0.jpeg', alt: 'Happiest', text: 'Ingen gjør meg lykkeligere enn deg.' },
  { id: 20, src: 'https://i.imgur.com/0DGDcW4.jpeg', alt: 'Hole in one', text: 'HOLE IN ONE – du er bare helt unik!' },
  { id: 21, src: 'https://i.imgur.com/TMUaewJ.jpeg', alt: 'Bad drink', text: 'Datenight med en drink som smakte piss.' },
  { id: 22, src: 'https://i.imgur.com/pDQKh0R.jpeg', alt: 'Vacation selfie', text: 'Bad selfie på ferie.' },
  { id: 23, src: 'https://i.imgur.com/qoteMW0.jpeg', alt: 'Sunburned', text: 'Litt solbrent kanskje? Men superpen uansett!' },
  { id: 24, src: 'https://i.imgur.com/EfqSNZ3.jpeg', alt: 'Mirror selfie', text: 'Speil-selfie – seriøs.' },
  { id: 25, src: 'https://i.imgur.com/Fh9PBTs.jpeg', alt: 'Swollen face', text: 'Hoven i ansiktet.' },
  { id: 26, src: 'https://i.imgur.com/e5MiUb1.jpeg', alt: 'Sexy', text: 'Så sexy!' },
  { id: 27, src: 'https://i.imgur.com/2oOGhsq.jpeg', alt: 'Dressed up', text: 'Pyntet seg.' },
  { id: 28, src: 'https://i.imgur.com/gky0VPb.jpeg', alt: 'Love you too', text: 'Jeg elsker deg også.' },
  { id: 29, src: 'https://i.imgur.com/AYblKR4.jpeg', alt: 'Road trip', text: 'Roadtrip.' },
  { id: 30, src: 'https://i.imgur.com/9QHK1ck.jpeg', alt: 'Smiling', text: 'Kristine og Amalie smiler.' },
  { id: 31, src: 'https://i.imgur.com/KHu7jdt.jpeg', alt: 'Nut allergy', text: 'Kristine og hennes nøtteallergi – men alltid med en positiv innstilling!' },
  { id: 32, src: 'https://i.imgur.com/azhuIKL.jpeg', alt: 'Drunk call', text: 'Når Kristine ringer i fylla – alltid et høydepunkt.' },
  { id: 33, src: 'https://i.imgur.com/9lnKLUG.jpeg', alt: 'Roblox', text: 'Kristine som Roblox-karakter – søt og uforglemmelig.' },
  { id: 34, src: 'https://i.imgur.com/kfWfA2o.jpeg', alt: 'Dressed up beauty', text: 'Når Kristine pynter seg, stopper verden opp for å beundre.' },
  { id: 35, src: 'https://i.imgur.com/D9mXg3N.jpeg', alt: 'Car ride', text: 'Ut på kjøretur med deg – det beste selskapet.' },
  { id: 36, src: 'https://i.imgur.com/WYQYliQ.jpeg', alt: 'Cabin', text: 'På hytta med Balder – så koselig og avslappende.' },
  { id: 37, src: 'https://i.imgur.com/leVp4KM.jpeg', alt: 'Drinks', text: 'Ut og tar en drink – du gjør alt mer spennende.' },
  { id: 38, src: 'https://i.imgur.com/jdJRuXw.jpeg', alt: 'Peace', text: 'Peace og full av kjærlighet.' },
  { id: 39, src: 'https://i.imgur.com/xuRJzjG.jpeg', alt: 'Party', text: 'Party med Fardin – og selvfølgelig Kristine som stjernen.' },
  { id: 40, src: 'https://i.imgur.com/RUGbYGQ.jpeg', alt: 'Just woke up', text: 'Nettopp våknet, men fortsatt vakker som alltid.' },
  { id: 41, src: 'https://i.imgur.com/3RQVRAF.jpeg', alt: 'Boat trip', text: 'Båttur til Brasøy – med hull i bunnj!' },
  { id: 42, src: 'https://i.imgur.com/GK3qO0q.jpeg', alt: 'Shopping', text: 'Kjøpe koseklær sammen – den beste typen shopping.' },
  { id: 43, src: 'https://i.imgur.com/iC3JNUc.jpeg', alt: 'Painting', text: 'Male litt – du finner alltid en måte å gjøre alt morsommere på.' },
  { id: 44, src: 'https://i.imgur.com/rkpBZX1.jpeg', alt: 'Taking pictures', text: 'Tar bilde sammen – minner vi kan se tilbake på for alltid.' },
  { id: 45, src: 'https://i.imgur.com/5NTsIux.jpeg', alt: 'Train ride', text: 'Togtur hjem fra meg – savner deg allerede før du er borte.' },
  { id: 46, src: 'https://i.imgur.com/c7y5jDl.jpeg', alt: 'Christmas', text: 'Juletider med deg – den beste tiden på året.' },
  { id: 47, src: 'https://i.imgur.com/ngO8kbv.jpeg', alt: 'Home office', text: 'Kristine på hjemmekontor med Simba – verdens beste selskap.' },
  { id: 48, src: 'https://i.imgur.com/HfGFkmw.jpeg', alt: 'Waiting for pizza', text: 'Venter på pizza <3 – enda et perfekt øyeblikk med deg.' }
]

export function MinneBoks() {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState(0)
  const [maxDurationReached, setMaxDurationReached] = useState(false)
  const [showSplitScreen, setShowSplitScreen] = useState(false)
  const [showDinnerPopup, setShowDinnerPopup] = useState(false)
  const imagePositions = useRef<{ [key: number]: { top: number; left: number } }>({})

  useEffect(() => {
    const timer = setTimeout(() => {
      setMaxDurationReached(true)
      setIsLoading(false)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const imagePromises = memories.map((memory) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = memory.src
        img.crossOrigin = "anonymous"
        img.onload = () => {
          setLoadedImages((prev) => prev + 1)
          resolve(null)
        }
        img.onerror = () => {
          // Still resolve on error to prevent hanging
          setLoadedImages((prev) => prev + 1)
          resolve(null)
        }
      })
    })

    Promise.all(imagePromises).then(() => {
      if (!maxDurationReached) {
        setIsLoading(false)
      }
    })

    // Initialize image positions
    memories.forEach((memory) => {
      imagePositions.current[memory.id] = {
        top: Math.random() * 80,
        left: Math.random() * 80,
      }
    })
  }, [maxDurationReached])

  const handleImageClick = (id: number) => {
    setSelectedMemory(id)
  }

  const handleMenClick = () => {
    setShowSplitScreen(true)
  }

  const handleFoodChoice = () => {
    setShowSplitScreen(false)
    setShowDinnerPopup(true)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-300 to-purple-400">
      <TransitionDoodle isVisible={isLoading} duration={15} />
      
      <AnimatePresence>
        {!isLoading && !showSplitScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 px-6 py-3 rounded-full text-gray-800 z-10 shadow-lg text-lg font-medium">
              Trykk på ett av bildene
            </div>
            <Button
              className="absolute bottom-4 right-4 bg-white text-pink-500 hover:bg-pink-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={handleMenClick}
            >
              Hva vil du ha til mat?
            </Button>
            {memories.map((memory) => (
              <motion.div
                key={memory.id}
                className="absolute cursor-pointer"
                style={{
                  top: `${imagePositions.current[memory.id].top}%`,
                  left: `${imagePositions.current[memory.id].left}%`,
                }}
                animate={{
                  x: [0, Math.random() * 40 - 20, 0],
                  y: [0, Math.random() * 40 - 20, 0],
                  rotate: [0, Math.random() * 10 - 5, 0],
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleImageClick(memory.id)}
              >
                <Image
                  src={memory.src}
                  alt={memory.alt}
                  width={120}
                  height={120}
                  className="rounded-lg shadow-lg"
                  unoptimized
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSplitScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-screen"
          >
            <div className="w-1/2 bg-yellow-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-yellow-200" onClick={handleFoodChoice}>
              <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                <Image
                  src="https://i.imgur.com/R3cLUzQ.jpeg"
                  alt="Pizza"
                  width={300}
                  height={300}
                  className="rounded-xl shadow-lg mb-4"
                  unoptimized
                />
                <h2 className="text-4xl font-bold">Pizza</h2>
              </motion.div>
            </div>
            <div className="w-1/2 bg-red-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-red-200" onClick={handleFoodChoice}>
              <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                <Image
                  src="https://i.imgur.com/ej4e3pc.jpeg"
                  alt="BBQ"
                  width={300}
                  height={300}
                  className="rounded-xl shadow-lg mb-4"
                  unoptimized
                />
                <h2 className="text-4xl font-bold">BBQ</h2>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMemory !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-4 rounded-lg w-full max-w-3xl max-h-[90vh] relative shadow-2xl overflow-y-auto"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 hover:bg-gray-100 transition-colors duration-300 z-10"
                onClick={() => setSelectedMemory(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              <div className="w-full h-[80vh] relative mb-4">
                <Image
                  src={memories[selectedMemory - 1].src}
                  alt={memories[selectedMemory - 1].alt}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                  unoptimized
                />
              </div>
              <p className="text-center text-gray-800 text-lg font-medium">{memories[selectedMemory - 1].text}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="fixed bottom-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded-full text-gray-800 shadow-lg">
          {maxDurationReached 
            ? "Loading completed" 
            : `Loading: ${loadedImages} / ${memories.length}`}
        </div>
      )}

      <Dialog open={showDinnerPopup} onOpenChange={setShowDinnerPopup}>
        <DialogContent className="sm:max-w-[425px]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Gjør deg klar for middag i kveld!</h2>
            <div className="fireworks"></div>
          </motion.div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .fireworks {
          width: 100%;
          height: 100px;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="%23ff00ff" stroke-width="4" fill="none"><animate attributeName="r" from="0" to="40" dur="1s" repeatCount="indefinite"/></circle></svg>');
          background-repeat: no-repeat;
          background-position: center;
          animation: fireworks 2s ease-out infinite;
        }

        @keyframes fireworks {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}


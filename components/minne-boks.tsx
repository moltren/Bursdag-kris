'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion, AnimatePresence } from 'framer-motion'
import { memories } from '@/data/memories'

export function MinneBoks({ onBack }: { onBack: () => void }) {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null)
  const [loadedImages, setLoadedImages] = useState(0)
  const [showSplitScreen, setShowSplitScreen] = useState(false)
  const [showDinnerPopup, setShowDinnerPopup] = useState(false)
  const imagePositions = useRef<{ [key: number]: { top: number; left: number; x: number; y: number; rotate: number } }>({})

  useEffect(() => {
    memories.forEach((memory) => {
      if (!imagePositions.current[memory.id]) {
        imagePositions.current[memory.id] = {
          top: Math.random() * 80,
          left: Math.random() * 80,
          x: Math.random() * 40 - 20,
          y: Math.random() * 40 - 20,
          rotate: Math.random() * 10 - 5,
        }
      }
    })
  }, [])

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1)
  }

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

  const isLoading = loadedImages < memories.length

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-300 to-purple-400">
      <AnimatePresence>
        {!showSplitScreen && (
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
              className="absolute top-4 left-4 bg-white text-pink-500 hover:bg-pink-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={onBack}
            >
              Tilbake
            </Button>
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
                  top: `${imagePositions.current[memory.id]?.top ?? 0}%`,
                  left: `${imagePositions.current[memory.id]?.left ?? 0}%`,
                  opacity: isLoading ? 0 : 1,
                }}
                animate={{
                  x: [0, imagePositions.current[memory.id]?.x ?? 0, 0],
                  y: [0, imagePositions.current[memory.id]?.y ?? 0, 0],
                  rotate: [0, imagePositions.current[memory.id]?.rotate ?? 0, 0],
                }}
                transition={{
                  duration: 10 + (imagePositions.current[memory.id]?.top ?? 0) / 8,
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
                  onLoad={handleImageLoad}
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
            className="fixed inset-0 flex h-screen z-50"
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
        <div className="fixed inset-0 bg-pink-300 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Laster minner...</h2>
            <p>{`${loadedImages} / ${memories.length}`}</p>
          </div>
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


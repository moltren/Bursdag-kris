'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { MinneBoks } from './minne-boks'
import { BirthdayCake } from './birthday-cake'
import { MusicPlayer } from './music-player'

export function BirthdayPage() {
  const [showMinneBoks, setShowMinneBoks] = useState(false)

  return (
    <AnimatePresence mode="wait">
      {showMinneBoks ? (
        <motion.div
          key="minne-boks"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MinneBoks onBack={() => setShowMinneBoks(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="main-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 to-purple-400 p-4"
        >
          <BirthdayCake />
          <h1 className="text-5xl font-bold text-white mt-8 mb-4 text-center">
            ❤️ Gratulere med dagen Kristine ❤️
          </h1>
          <Button 
            onClick={() => setShowMinneBoks(true)}
            className="bg-white text-pink-500 hover:bg-pink-100 transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
          >
            Minne Boks
          </Button>
          <MusicPlayer audioSrc="/birthday-song.mp3" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}


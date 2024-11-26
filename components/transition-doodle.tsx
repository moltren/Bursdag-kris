'use client'

import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const CssDoodle = dynamic(() => import('css-doodle'), { ssr: false })

interface TransitionDoodleProps {
  isVisible: boolean
  duration: number
}

export default function TransitionDoodle({ isVisible, duration }: TransitionDoodleProps) {
  const doodleRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (doodleRef.current) {
      doodleRef.current.update()
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-300 to-purple-400">
      <CssDoodle
        ref={doodleRef}
        onClick={() => doodleRef.current?.update()}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {`
          :doodle {
            @grid: 10 / 100%;
            background: @pick(#ff69b4, #ff1493, #ff00ff);
          }
          transition: .2s ease @r(.6s);
          will-change: transform;
          transform: scale(@r(.2, 1.5)) translate3d(@r(-50%, 50%), @r(-50%, 50%), 0);
          background: @p(
            radial-gradient(
              circle at @r(100%) @r(100%),
              @p(#ff69b4, #ff1493, #ff00ff) 50%,
              transparent 50%
            ),
            linear-gradient(
              @p(#ff69b4, #ff1493, #ff00ff) 50%,
              transparent 50%
            )
          );
        `}
      </CssDoodle>
    </div>
  )
}

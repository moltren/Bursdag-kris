'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { memories } from '../data/memories'

interface Memory {
  src: string;
  caption: string;
}

interface MinneBoksProps {
  onBack: () => void;
}

export function MinneBoks({ onBack }: MinneBoksProps) {
  const [loadedMemories, setLoadedMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = memories.map((memory) => {
        return new Promise<Memory>((resolve) => {
          const img = new Image();
          img.src = memory.src;
          img.crossOrigin = "anonymous";
          img.onload = () => {
            resolve(memory);
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${memory.src}`);
            resolve(memory);
          };
        });
      });

      const loadedMemories = await Promise.all(imagePromises);
      setLoadedMemories(loadedMemories);
    };

    loadImages();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Button onClick={onBack} className="mb-4">Back</Button>
      <h2 className="text-3xl font-bold mb-6 text-center">Minner</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadedMemories.map((memory, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Image
              src={memory.src}
              alt={memory.caption}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-800">{memory.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <ChevronDown className="w-8 h-8 mx-auto text-gray-400 animate-bounce" />
      </div>
    </div>
  )
}


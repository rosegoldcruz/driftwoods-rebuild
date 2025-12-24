'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// Real images from Driftwoods website
const galleryImages = [
  {
    src: 'https://cdn.ing/assets/i/r/285213/5zggi7whevnjowisv0iko7t1ay8m/spaghetti-alle-vongole-seafood-pasta-with-clams-in-bowl.jpg',
    alt: 'Spaghetti alle Vongole - Seafood Pasta with Clams',
    span: 'col-span-1 row-span-1 md:col-span-1 md:row-span-2', // Tall
  },
  {
    src: 'https://cdn.ing/assets/i/r/285215/snku51nt3d72yxtxw8ecc4ya3he5/penne-pasta-with-tomato-sauce-and-toast-overhead.jpg',
    alt: 'Penne Pasta with Tomato Sauce',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://cdn.ing/assets/i/r/285216/ojv7h31dqmvubx3rgouju9soo25q/grilled-chicken-fettuccine-alfredo-in-white-bowl.jpg',
    alt: 'Grilled Chicken Fettuccine Alfredo',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://cdn.ing/assets/i/r/285217/g1mr05q1hdm62w1sb7ljkq1poqqs/spaghetti-and-meatballs-with-garlic-bread-overhead.jpg',
    alt: 'Spaghetti and Meatballs with Garlic Bread',
    span: 'col-span-1 row-span-1 md:col-span-1 md:row-span-2', // Tall
  },
  {
    src: 'https://cdn.ing/assets/i/r/285218/z27tk3a4sp6wwkgdpf5b28zqcgz1/crispy-fish-and-chips-basket-at-bar-with-tartar-sauce.jpg',
    alt: 'Crispy Fish and Chips with Tartar Sauce',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://cdn.ing/assets/i/r/285219/g8qxh8z80gx4n5x5rpirkopctc8y/grilled-chicken-salad-bowl-with-avocado-carrot-egg.jpg',
    alt: 'Grilled Chicken Salad with Avocado',
    span: 'col-span-1 row-span-1',
  },
]

export function FoodGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (selectedImage === null) return
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
    }
  }, [selectedImage])

  return (
    <section className="py-16 sm:py-20 bg-dark-lighter" id="gallery">
      <div className="container">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream mb-3">
            From Our Kitchen
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
            Every dish made with care and the freshest ingredients
          </p>
        </motion.div>

        {/* Masonry-style Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          {galleryImages.map((image, index) => (
            <motion.button
              key={index}
              className={`relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer ${image.span}`}
              onClick={() => setSelectedImage(index)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15, delay: index * 0.05 }}
              aria-label={`View ${image.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
              {/* Label on hover - desktop only */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
                <span className="text-cream text-sm font-medium drop-shadow-lg">{image.alt}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Lightbox - Fast 200ms transitions */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setSelectedImage(null)}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 p-3 text-cream/70 hover:text-cream transition-colors z-10 min-w-[48px] min-h-[48px] flex items-center justify-center"
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
              >
                <X size={28} />
              </button>

              {/* Navigation arrows - desktop */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-cream/50 hover:text-cream transition-colors hidden md:flex min-w-[48px] min-h-[48px] items-center justify-center"
                onClick={(e) => { e.stopPropagation(); navigate('prev') }}
                aria-label="Previous image"
              >
                <ChevronLeft size={36} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-cream/50 hover:text-cream transition-colors hidden md:flex min-w-[48px] min-h-[48px] items-center justify-center"
                onClick={(e) => { e.stopPropagation(); navigate('next') }}
                aria-label="Next image"
              >
                <ChevronRight size={36} />
              </button>

              {/* Image */}
              <motion.div
                className="relative w-full max-w-3xl mx-4 aspect-[4/3]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="w-full h-full object-contain rounded-lg"
                />
              </motion.div>

              {/* Caption */}
              <motion.p 
                className="absolute bottom-8 left-0 right-0 text-center text-cream font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: 0.05 }}
              >
                {galleryImages[selectedImage].alt}
              </motion.p>

              {/* Dots navigation */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all min-w-[32px] min-h-[32px] flex items-center justify-center ${
                      index === selectedImage ? 'bg-primary' : 'bg-cream/20'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage(index)
                    }}
                    aria-label={`View image ${index + 1}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${index === selectedImage ? 'bg-primary' : 'bg-cream/30'}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

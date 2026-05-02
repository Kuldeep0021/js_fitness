"use client";

import Image from 'next/image';

export default function GallerySection() {
  const images = [
    { src: '/images/gym-exterior.jpg', alt: 'JS Fitness Gym Exterior', label: 'Our Gym' },
    { src: '/images/gym-interior-weights.jpg', alt: 'Free Weights & Machines', label: 'Strength Zone' },
    { src: '/images/gym-interior-cardio.jpg', alt: 'Treadmills and Cardio', label: 'Cardio Area' },
    { src: '/images/gym-interior-spin.jpg', alt: 'Spin Bikes & Cycles', label: 'Cycling Zone' },
    { src: '/images/hero-bg.jpg', alt: 'Full Gym View', label: 'Interior View' },
  ];

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">Tour Our Space</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            Our Gym <span className="gradient-text">Facility in Sohna</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Take a look inside Sohna&apos;s most premium fitness center. State-of-the-art Nortus &amp; Fitline equipment with vibrant LED ambiance.
          </p>
        </div>

        {/* Masonry-style Gallery */}
        <div className="max-w-6xl mx-auto">
          {/* Top row: 2 images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {images.slice(0, 2).map((img, idx) => (
              <div key={idx} className="relative h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden group card-hover">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <span className="text-orange-500 text-xs font-bold tracking-wider uppercase">{img.label}</span>
                    <p className="text-white font-bold text-lg mt-1">{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row: 3 images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {images.slice(2, 5).map((img, idx) => (
              <div key={idx} className="relative h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden group card-hover">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div>
                    <span className="text-orange-500 text-xs font-bold tracking-wider uppercase">{img.label}</span>
                    <p className="text-white font-bold mt-1">{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Chresten Soelberg - Frontend Udvikler & HTX Elev',
    short_name: 'Chresten Portfolio',
    description: 'Chresten Soelberg er en kreativ HTX-elev og frontend udvikler med ekspertise i React, Next.js, TypeScript og moderne webteknologier.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/avatar.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
} 
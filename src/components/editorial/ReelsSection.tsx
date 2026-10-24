
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Play,
  ShoppingBag,
  ArrowRight,
  Volume2,
  VolumeX,
  ExternalLink,
  Pause,
  ArrowUpRight,
} from 'lucide-react'

import sampleVideo from '@/assets/sample-5s-360p.mp4'

const reels = [
  {
    id: 1,
    product: 'The Festive Edit',
    productHref: '/product/hat',
    instagramHref: 'https://www.instagram.com/',
  },
  {
    id: 2,
    product: 'Statement Jewellery',
    productHref: '/shop',
    instagramHref: 'https://www.instagram.com/',
  },
  {
    id: 3,
    product: 'The Signature Look',
    productHref: '/shop',
    instagramHref: 'https://www.instagram.com/',
  },
  {
    id: 4,
    product: 'Occasion Wear',
    productHref: '/shop',
    instagramHref: 'https://www.instagram.com/',
  },
  {
    id: 5,
    product: 'Everyday Elegance',
    productHref: '/shop',
    instagramHref: 'https://www.instagram.com/',
  },
]

type Reel = (typeof reels)[number]

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [videoFailed, setVideoFailed] = useState(false)

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video || videoFailed) return

    if (video.paused) {
      try {
        await video.play()
      } catch {
        setPlaying(false)
      }
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
  <article className="group relative aspect-[9/16] min-w-0 overflow-hidden rounded-[10px] bg-[#d8d0c7]">
    {/* Video preview */}
    <video
      ref={videoRef}
      src={sampleVideo}
      autoPlay
      muted={muted}
      loop
      playsInline
      preload="metadata"
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onError={() => setVideoFailed(true)}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    />

    {/* Fallback if the video cannot load */}
    {videoFailed && (
      <div className="absolute inset-0 flex items-center justify-center bg-[#d8d0c7] px-4 text-center">
        <p className="font-serif text-lg text-[#49413b]">{reel.product}</p>
      </div>
    )}

    {/* Tap anywhere to play / pause */}
    <button
      type="button"
      onClick={togglePlayback}
      disabled={videoFailed}
      aria-label={playing ? 'Pause reel' : 'Play reel'}
      className="absolute inset-0 z-[1] flex items-center justify-center focus-visible:outline-none"
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-all duration-300 ${
          playing ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {playing ? (
          <Pause size={20} fill="currentColor" />
        ) : (
          <Play size={20} fill="currentColor" className="ml-0.5" />
        )}
      </span>
    </button>

    {/* Soft gradient for legibility */}
    <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/25 via-transparent to-black/50" />

    {/* Top row: Instagram + mute */}
    <div className="absolute inset-x-3 top-3 z-[3] flex items-center justify-between">
      <a
        href={reel.instagramHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${reel.product} on Instagram`}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/50"
      >
        <InstagramIcon size={16} />
      </a>

      <button
        type="button"
        onClick={toggleMute}
        disabled={videoFailed}
        aria-label={muted ? 'Unmute reel' : 'Mute reel'}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/50 disabled:opacity-50"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>

    {/* Product bar */}
    <Link
      to={reel.productHref}
      className="absolute bottom-3 left-3 right-3 z-[3] flex items-center justify-between gap-3 rounded-lg bg-white/90 py-2.5 pl-3.5 pr-2.5 backdrop-blur-md transition-colors hover:bg-white"
    >
      <span className="min-w-0">
        <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#77706a]">
          Shop the look
        </span>
        <span
          className="block truncate text-[17px] italic leading-tight text-[#292522]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {reel.product}
        </span>
      </span>

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#201e1d] text-white transition-transform duration-300 group-hover:rotate-12">
        <ArrowUpRight size={15} strokeWidth={1.7} />
      </span>
    </Link>
  </article>
)
}

export default function ReelsSection() {
  return (
    <section className="overflow-hidden bg-[#faf7f2] px-4 py-16 sm:px-6 sm:py-20 lg:px-[4.1%] lg:py-24">
      <div className="mx-auto max-w-[1700px]">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#77706a] sm:text-xs">
            In Motion
          </p>

          <h2
            className="mt-5 text-[clamp(2.7rem,5vw,4.1rem)] italic leading-none text-[#292522]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Shop by reels
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-[30px]">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-14">
          <Link
            to="/stories"
            className="inline-flex min-h-[60px] items-center justify-center gap-3 rounded-[5px] bg-[#201e1d] px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.19em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-colors hover:bg-[#49413b]"
          >
            View all reels
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}

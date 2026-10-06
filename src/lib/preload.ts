import { criticalImages, preloadOrder } from '@/data/images'

// Held at module level so the browser keeps the decoded bitmaps around.
const held: HTMLImageElement[] = []

function load(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.src = url
    held.push(img)
    // decode() resolves once the bitmap is ready to paint — no decode hitch on first view.
    img.decode().then(() => resolve(), () => resolve())
  })
}

/** Resolves when the hero is decoded (or after a safety timeout). */
export function preloadCritical(timeoutMs = 6000): Promise<void> {
  return Promise.race([
    Promise.all(criticalImages.map(load)).then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ])
}

/** Warms every other photo in the background, two at a time, so scrolling never waits on a download. */
export function preloadRest(concurrency = 2) {
  const queue = [...new Set(preloadOrder)].filter((u) => !criticalImages.includes(u))
  const worker = async () => {
    while (queue.length) {
      const next = queue.shift()
      if (next) await load(next)
    }
  }
  for (let i = 0; i < concurrency; i++) void worker()
}

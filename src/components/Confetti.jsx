import { useEffect, useMemo, useState } from 'react'

function rnd(min, max) {
  return Math.random() * (max - min) + min
}

export function Confetti({ count = 300 }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2200)
    return () => window.clearTimeout(timer)
  }, [])

  // Build pieces with randomized inline styles so many pieces look varied
  const pieces = useMemo(() => {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#01a3a4', '#f368e0']
    return Array.from({ length: count }).map(() => {
      const corner = Math.random() < 0.5 ? 'left' : 'right'
      const left = corner === 'left' ? `${rnd(0, 18)}%` : `${rnd(82, 100)}%`
      const burstX = `${corner === 'left' ? rnd(-160, 200) : rnd(-200, 160)}px`
      const burstY = `${-rnd(140, 420)}px`
      const rot = `${rnd(-720, 720)}deg`
      const delay = `${rnd(0, 0.35)}s`
      const w = `${Math.round(rnd(7, 16))}px`
      const h = `${Math.round(rnd(6, 16))}px`
      const bg = colors[Math.floor(Math.random() * colors.length)]
      const radius = Math.random() < 0.5 ? '50%' : `${Math.round(rnd(2, 4))}px`
      return { left, burstX, burstY, rot, delay, w, h, bg, radius }
    })
  }, [count])

  if (!visible) return null

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: p.left,
            '--burst-x': p.burstX,
            '--burst-y': p.burstY,
            '--burst-r': p.rot,
            animationDelay: p.delay,
            width: p.w,
            height: p.h,
            background: p.bg,
            borderRadius: p.radius,
          }}
        />
      ))}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import LogoMark from './LogoMark'
import LogotypeText from './LogotypeText'
import { MARK_H, MARK_W } from '../logoHexes'
import { TEXT_VB } from '../logotypeText'
import './IntroOverlay.css'

const MARK_SIZE = 220
const SLIDE_MS = 900
const ASSEMBLE_MS = 350
const REVEAL_MS = 650
const HOLD_MS = 150
const SHRINK_MS = 500

const scale = MARK_SIZE / MARK_W
const MARK_H_PX = MARK_H * scale
const TEXT_W = TEXT_VB.w * scale
const TEXT_H = TEXT_VB.h * scale
// gap between mark right edge (x=378) and text left edge (x=474) in logotype.svg
const GAP = 96 * scale

type Phase = 'slide' | 'assembled' | 'reveal' | 'shrink'

export default function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>('slide')
  const stageRef = useRef<HTMLDivElement>(null)
  const fitRef = useRef<HTMLDivElement>(null)
  const fitScaleRef = useRef(1)

  // base (unscaled) width of the stage
  const STAGE_W = MARK_SIZE + GAP + TEXT_W

  // scale the whole intro to fit the viewport width (mobile fix)
  useEffect(() => {
    const fit = () => {
      const el = fitRef.current
      if (!el) return
      const s = Math.min(1, (window.innerWidth - 24) / STAGE_W)
      fitScaleRef.current = s
      el.style.transform = `translate(-50%, -50%) scale(${s})`
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [STAGE_W])

  useEffect(() => {
    const revealStart = SLIDE_MS + ASSEMBLE_MS
    const shrinkAt = revealStart + REVEAL_MS + HOLD_MS
    const timers = [
      setTimeout(() => setPhase('assembled'), SLIDE_MS),
      setTimeout(() => setPhase('reveal'), revealStart),
      setTimeout(() => setPhase('shrink'), shrinkAt),
      setTimeout(onComplete, shrinkAt + SHRINK_MS),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  useEffect(() => {
    if (phase !== 'shrink') return
    const stage = stageRef.current
    const navLogo = document.querySelector<HTMLElement>('.tabbar-logo')
    if (!stage || !navLogo) return
    const sr = stage.getBoundingClientRect()
    const nr = navLogo.getBoundingClientRect()
    const s = nr.width / sr.width
    const f = fitScaleRef.current
    // sr is the fit-scaled visual rect; stage's own transform lives in unscaled
    // space, so the translate must be divided by the fit scale to land correctly.
    const dx = (nr.left + nr.width / 2 - (sr.left + sr.width / 2)) / f
    const dy = (nr.top + nr.height / 2 - (sr.top + sr.height / 2)) / f
    stage.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`
  }, [phase])

  const stageStyle: CSSProperties & Record<string, string> = {
    '--mark-w': `${MARK_SIZE}px`,
    '--mark-h': `${MARK_H_PX}px`,
    '--gap': `${GAP}px`,
    '--text-w': `${TEXT_W}px`,
  }

  return (
    <div className={`intro-overlay${phase === 'shrink' ? ' fade' : ''}`}>
      <div ref={fitRef} className="intro-fit">
        <div
          ref={stageRef}
          className={`intro-stage ${phase === 'shrink' ? 'shrinking' : ''}`}
          style={stageStyle}
        >
          <div className={`intro-mark ${phase === 'reveal' || phase === 'shrink' ? 'revealed' : ''}`}>
            <LogoMark
              size={MARK_SIZE}
              hexClass={(id) => `intro-hex hex-${id}`}
            />
          </div>
          <div className="intro-text">
            <LogotypeText height={TEXT_H} />
          </div>
        </div>
      </div>
    </div>
  )
}

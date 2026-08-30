import { HEXAGONS, MARK_H, MARK_W } from '../logoHexes'
import Hexagon from './Hexagon'

interface LogoMarkProps {
  size?: number
  className?: string
  hexClass?: (id: string) => string
}

export default function LogoMark({ size = 260, className, hexClass }: LogoMarkProps) {
  const scale = size / MARK_W
  const height = MARK_H * scale

  return (
    <div
      className={className}
      style={{ position: 'relative', width: size, height }}
    >
      {HEXAGONS.map((hex) => (
        <Hexagon key={hex.id} hex={hex} scale={scale} className={hexClass?.(hex.id)} />
      ))}
    </div>
  )
}

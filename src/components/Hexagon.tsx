import type { Hexagon as HexagonData } from '../logoHexes'

interface HexagonProps {
  hex: HexagonData
  scale: number
  className?: string
}

export default function Hexagon({ hex, scale, className }: HexagonProps) {
  return (
    <svg
      className={className}
      viewBox={hex.vb}
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: hex.x * scale,
        top: hex.y * scale,
        width: hex.w * scale,
        height: hex.h * scale,
      }}
    >
      <g transform={`translate(${hex.tx} ${hex.ty})`}>
        <path d={hex.d} fill={hex.fill} />
      </g>
    </svg>
  )
}

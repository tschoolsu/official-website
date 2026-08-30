import { TEXT_PATHS, TEXT_VB } from '../logotypeText'

interface LogotypeTextProps {
  height?: number
  className?: string
}

export default function LogotypeText({ height = 245, className }: LogotypeTextProps) {
  const scale = height / TEXT_VB.h
  return (
    <svg
      className={className}
      width={TEXT_VB.w * scale}
      height={height}
      viewBox={`${TEXT_VB.x} ${TEXT_VB.y} ${TEXT_VB.w} ${TEXT_VB.h}`}
      aria-hidden="true"
    >
      {TEXT_PATHS.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill={p.fill}
          transform={`translate(${p.tx} ${p.ty})`}
        />
      ))}
    </svg>
  )
}

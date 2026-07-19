'use client'

export function VerseDiffHighlight({
  text,
  refText,
}: {
  text: string
  refText: string
}) {
  const normalize = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()

  const refWords = new Set(
    refText
      .split(/\s+/)
      .filter((w) => w.length > 3)
      .map((w) => normalize(w))
  )

  const tokens = text.split(/(\s+|[.,;:!?()\-—–""''«»])/)

  return (
    <span>
      {tokens.map((token, i) => {
        const stripped = token.replace(/[.,;:!?()\-—–""''«»]/g, '')
        if (stripped.length > 3 && !refWords.has(normalize(stripped))) {
          return (
            <span key={i} className="bg-amber-200/40 dark:bg-amber-500/20 rounded px-0.5">
              {token}
            </span>
          )
        }
        return <span key={i}>{token}</span>
      })}
    </span>
  )
}

interface ProgressBarProps {
  label: string
  value: number
  goal: number
  unit: string
  tone?: 'green' | 'blue' | 'orange' | 'slate'
}

export function ProgressBar({
  label,
  value,
  goal,
  unit,
  tone = 'green',
}: ProgressBarProps) {
  const percentage = goal > 0 ? Math.min(Math.round((value / goal) * 100), 100) : 0

  return (
    <div className="progress-row">
      <div className="progress-row__meta">
        <span>{label}</span>
        <strong>
          {value}
          {unit} / {goal}
          {unit}
        </strong>
      </div>
      <div
        className={`progress-bar progress-bar--${tone}`}
        aria-label={`${label}: ${percentage}%`}
      >
        <span style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

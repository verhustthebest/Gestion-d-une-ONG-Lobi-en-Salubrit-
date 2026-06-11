export function BarChart() {
  return (
    <div className="bar-chart">
      {[40, 56, 59, 72, 74, 86].map((height, index) => (
        <i style={{ height: `${height}%` }} key={index}>
          <b>{height}</b>
        </i>
      ))}
    </div>
  )
}

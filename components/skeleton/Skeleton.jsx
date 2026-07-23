import "./Skeleton.css"

export function CardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-title"></div>
      <div className="skeleton-badge"></div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-header"></div>
      <div className="skeleton-grid">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}
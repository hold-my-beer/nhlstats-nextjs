const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

export default function LeaderListsSkeleton() {
  return (
    <div
      className={`${shimmer} leader-lists flex flex-col justify-start items-center w-full p-2 bg-white`}
    >
      <LeaderListSkeleton />
      <LeaderListSkeleton />
      <LeaderListSkeleton />
      <LeaderListSkeleton />
      <LeaderListSkeleton />
      <LeaderListSkeleton />
    </div>
  )
}

export function LeaderListSkeleton() {
  return (
    <div className="leader-list w-72 mb-2 p-2 bg-white rounded">
      <div className="leader-list-header flex flex-row justify-between items-center h-10 mt-1 mb-2 bg-gray"></div>
      <div className="leader-list-content h-40 bg-gray"></div>
      <div className="leader-list-footer h-10 bg-gray"></div>
    </div>
  )
}

import { Suspense } from 'react'
import LeaderListWrapper from '@/app/ui/leaders/leader-list'
import LeaderListsSkeleton from '@/app/ui/leaders/leader-list-skeleton'

export default function Home() {
  return (
    <main className="flex flex-col justify-start items-center min-h-screen pt-6">
      <h1 className="text-2xl mb-5 font-bold">Leaders</h1>
      <Suspense
        // fallback={<LeaderListsSkeleton />}
        fallback={<h2>Loading...</h2>}
      >
        <LeaderListWrapper />
      </Suspense>
    </main>
  )
}

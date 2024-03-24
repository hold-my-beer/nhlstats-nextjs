import { Player } from '@/app/lib/definitions'
import { unstable_noStore as noStore } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'

export async function fetchLeadersData() {
  noStore()

  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    const pointsResponse = await fetch(
      'https://api-web.nhle.com/v1/skater-stats-leaders/current?categories=points&limit=5'
    )
    const goalsResponse = await fetch(
      'https://api-web.nhle.com/v1/skater-stats-leaders/current?categories=goals&limit=5'
    )
    const assistsResponse = await fetch(
      'https://api-web.nhle.com/v1/skater-stats-leaders/current?categories=assists&limit=5'
    )
    const gaaResponse = await fetch(
      'https://api-web.nhle.com/v1/goalie-stats-leaders/current?categories=goalsAgainstAverage&limit=5'
    )
    const spResponse = await fetch(
      'https://api-web.nhle.com/v1/goalie-stats-leaders/current?categories=savePctg&limit=5'
    )
    const winsResponse = await fetch(
      'https://api-web.nhle.com/v1/goalie-stats-leaders/current?categories=wins&limit=5'
    )

    const data = await Promise.all([
      pointsResponse.json(),
      goalsResponse.json(),
      assistsResponse.json(),
      gaaResponse.json(),
      spResponse.json(),
      winsResponse.json(),
    ])

    return {
      points: data[0].points,
      goals: data[1].goals,
      assists: data[2].assists,
      goalsAgainstAverage: data[3].goalsAgainstAverage,
      savePctg: data[4].savePctg,
      wins: data[5].wins,
    }
  } catch (error) {
    console.error('Fetch Error:', error)
    throw new Error('Failed to fetch leaders data.')
  }
}

export default async function LeaderListWrapper() {
  const data = await fetchLeadersData()

  return (
    <div className="leader-lists flex flex-col justify-start items-center w-full p-2 bg-light">
      <LeaderList
        name="POINTS"
        abbreviation="PTS"
        data={data.points}
        href="/skaters"
      />
      <LeaderList
        name="GOALS"
        abbreviation="G"
        data={data.goals}
        href="/skaters"
      />
      <LeaderList
        name="ASSISTS"
        abbreviation="A"
        data={data.assists}
        href="/skaters"
      />
      <LeaderList
        name="GOALS AGAINST AVERAGE"
        abbreviation="GAA"
        data={data.goalsAgainstAverage.map((item: Player) => ({
          ...item,
          value: Number(item.value).toFixed(2),
        }))}
        href="/goalies"
      />
      <LeaderList
        name="SAVE PERCENTAGE"
        abbreviation="S%"
        data={data.savePctg.map((item: Player) => ({
          ...item,
          value: Number(item.value).toFixed(3),
        }))}
        href="/goalies"
      />
      <LeaderList
        name="WINS"
        abbreviation="W"
        data={data.wins}
        href="/goalies"
      />
    </div>
  )
}

export function LeaderList({
  name,
  abbreviation,
  data,
  href,
}: {
  name: string
  abbreviation: string
  data: Player[]
  href: string
}) {
  return (
    <div className="leader-list w-72 mb-2 p-2 bg-white rounded">
      <div className="leader-list-header flex flex-row justify-between items-center mt-1 mb-2">
        <span className="font-bold">{name}</span>
        <span>{abbreviation}</span>
      </div>
      <div className="leader-list-content">
        {data.map(
          (
            {
              id,
              firstName: { default: firstNameDefault },
              lastName: { default: lastNameDefault },
              sweaterNumber,
              headshot,
              teamAbbrev,
              position,
              value,
            },
            index
          ) => (
            <div
              key={id}
              className="leader-list-item flex flex-row justify-start items-center py-1"
            >
              <div className="leader-rank w-6 text-center">
                <span>{index + 1}</span>
              </div>
              <div className="leader-headshot flex flex-row justify-center items-center w-10">
                <Image
                  src={headshot}
                  width={40}
                  height={40}
                  quality={100}
                  alt="headshot"
                />
              </div>
              <div className="leader-data w-40 px-2">
                <div className="leader-name font-bold truncate">
                  <span>{firstNameDefault + ' ' + lastNameDefault}</span>
                </div>
                <div className="leader-specs">
                  <span>
                    {teamAbbrev + ' - #' + sweaterNumber + ' - ' + position}
                  </span>
                </div>
              </div>
              <div className="leader-stat-value w-12 text-right">
                <span className="font-bold">{value}</span>
              </div>
            </div>
          )
        )}
      </div>
      <div className="leader-list-footer">
        <Link
          href={href}
          className="flex flex-row justify-center items-center h-10 text-primary font-semibold"
        >
          <span>See All</span>
        </Link>
      </div>
    </div>
  )
}

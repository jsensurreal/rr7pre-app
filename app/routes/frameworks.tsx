import { Button } from '~/components/ui/button'
import type * as Route from './+types.frameworks'
import { fetchFrameworks } from '~/services/sqliteService'
import { Link } from 'react-router'

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url)
  const frameworks = await fetchFrameworks(searchParams.get('search') || '')
  return { frameworks }
}

export default function Frameworks({ loaderData }: Route.ComponentProps) {
  const { frameworks } = loaderData
  return (
    <div className='flex flex-col items-center gap-10 p-10'>
      <header className='flex flex-col items-center gap-4'>
        <h1 className='leading text-2xl font-bold text-gray-800 dark:text-gray-100'>
          Frameworks
        </h1>
      </header>
      <nav className='flex flex-col items-center justify-center gap-2 rounded border border-gray-200 p-6 dark:border-gray-500'>
        <p className='leading-6 text-gray-700 dark:text-gray-200'>
          What&apos;s next?
        </p>
        <ul>
          {frameworks.map(({ value, label }) => (
            <li key={value}>
              <a
                className='group flex items-center gap-3 self-stretch leading-normal text-blue-700 hover:underline dark:text-blue-500'
                href={`/frameworks/${value}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <Link to='/' prefetch='intent'>
          <Button>Home</Button>
        </Link>
      </nav>
    </div>
  )
}

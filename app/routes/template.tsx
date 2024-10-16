// provides type safety/inference
import type * as Route from './+types.template'

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  return { search }
}

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData()
  let search = await formData.get('search')
  let users: string[] = [] // await searchUsers({ search });
  return { search, users }
}

export default function Frameworks({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { search } = loaderData
  const { users = [] } = actionData || {}

  return (
    <div>
      <h1>{search}</h1>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  )
}

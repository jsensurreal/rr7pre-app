import type * as Route from './+types.api.v1.users'
import { getUsers } from '~/services/sqliteService'

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search') || ''
  const users = await getUsers(search)
  return Response.json({
    users
  })
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const search = formData.get('search') as string
  const users = await getUsers(search)
  return Response.json({
    search,
    users
  })
}
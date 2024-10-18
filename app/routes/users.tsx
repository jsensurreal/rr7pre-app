// provides type safety/inference
import { getUsers, User } from '~/services/sqliteService'
import type * as Route from './+types.users'
import { Form } from 'react-router'

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const users = await getUsers(search) 
  return { initialSearch: search, initialUsers: users }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const search = formData.get('search') as string
  const users = await getUsers(search) 
  return { search, users }
}

export default function Frameworks({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { initialSearch, initialUsers } = loaderData
  const { search, users } = actionData || {}

  return (
    <Form method='post' className='p-6'>
      <h1 className='text-2xl font-bold'>Search users</h1>
      <div className='flex gap-2 py-2'>
        <input type='text' name='search' />
        <button type='submit' className='border border-gray-500 px-2 py-1 hover:bg-white hover:text-gray-700'>Search</button>
      </div>
      { (search || initialSearch) && <p className='font-bold italic underline py-2'>Searching for: {search !== undefined ? search : initialSearch}</p> }
      <ul>
        {(users ? users : initialUsers).map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </Form>
  )
}

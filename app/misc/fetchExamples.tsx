// This is not a valid component, but a collection of examples on how to use the fetcher.

import { useRef } from 'react'
import { FetcherWithComponents, Form, useFetcher } from 'react-router'

function SomeComponent() {
  const someFormRef = useRef<HTMLFormElement>(null)
  let fetcher: FetcherWithComponents<any> = useFetcher()

  // states are available on the fetcher
  fetcher.state // "idle" | "loading" | "submitting"
  fetcher.data // the data returned from the action or loader

  // Example 1: load data
  fetcher.load('/some/route')

  // Example 2: submit data with form
  fetcher.submit(someFormRef.current, { method: 'post' })

  // Example 3: submit data with json
  fetcher.submit(
    { data: 'test' },
    {
      method: 'post',
      encType: 'application/json',
    }
  )

  return (
    <>
      {/* Form for use with example 2 above. */}
      <Form ref={someFormRef} method='post'>
        <input type='text' name='name' />
        <button type='submit'>Submit</button>
      </Form>

      {/* Example 4: Direct form submission */}
      <fetcher.Form method='post'>
        <input type='text' name='name' />
        <button type='submit'>Submit</button>
      </fetcher.Form>
    </>
  )
}

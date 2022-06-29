import type { FindAudios } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Audios from 'src/components/Audio/Audios'

export const QUERY = gql`
  query FindAudios {
    audios {
      id
      title
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No audios yet. '}
      <Link
        to={routes.newAudio()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ audios }: CellSuccessProps<FindAudios>) => {
  return <Audios audios={audios} />
}

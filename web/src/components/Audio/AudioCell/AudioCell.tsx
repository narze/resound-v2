import type { FindAudioById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Audio from 'src/components/Audio/Audio'

export const QUERY = gql`
  query FindAudioById($id: Int!) {
    audio: audio(id: $id) {
      id
      title
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Audio not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ audio }: CellSuccessProps<FindAudioById>) => {
  return <Audio audio={audio} />
}

import type { EditAudioById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AudioForm from 'src/components/Audio/AudioForm'

export const QUERY = gql`
  query EditAudioById($id: Int!) {
    audio: audio(id: $id) {
      id
      title
      url
    }
  }
`
const UPDATE_AUDIO_MUTATION = gql`
  mutation UpdateAudioMutation($id: Int!, $input: UpdateAudioInput!) {
    updateAudio(id: $id, input: $input) {
      id
      title
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ audio }: CellSuccessProps<EditAudioById>) => {
  const [updateAudio, { loading, error }] = useMutation(UPDATE_AUDIO_MUTATION, {
    onCompleted: () => {
      toast.success('Audio updated')
      navigate(routes.audios())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateAudio({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Audio {audio.id}</h2>
      </header>
      <div className="rw-segment-main">
        <AudioForm audio={audio} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}

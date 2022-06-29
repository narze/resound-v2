import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AudioForm from 'src/components/Audio/AudioForm'

const CREATE_AUDIO_MUTATION = gql`
  mutation CreateAudioMutation($input: CreateAudioInput!) {
    createAudio(input: $input) {
      id
    }
  }
`

const NewAudio = () => {
  const [createAudio, { loading, error }] = useMutation(CREATE_AUDIO_MUTATION, {
    onCompleted: () => {
      toast.success('Audio created')
      navigate(routes.audios())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createAudio({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Audio</h2>
      </header>
      <div className="rw-segment-main">
        <AudioForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAudio

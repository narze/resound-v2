import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Audio/AudiosCell'

const AudioPlayer = ({ url }) => {
  return (
    <audio controls>
      <source src={url} type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
  )
}

const DELETE_AUDIO_MUTATION = gql`
  mutation DeleteAudioMutation($id: Int!) {
    deleteAudio(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const AudiosList = ({ audios }) => {
  const [deleteAudio] = useMutation(DELETE_AUDIO_MUTATION, {
    onCompleted: () => {
      toast.success('Audio deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete audio ' + id + '?')) {
      deleteAudio({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Url</th>
            <th>Preview</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {audios.map((audio) => (
            <tr key={audio.id}>
              <td>{truncate(audio.id)}</td>
              <td>{truncate(audio.title)}</td>
              <td>{truncate(audio.url)}</td>
              <td>
                <AudioPlayer url={truncate(audio.url)} />
              </td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.audio({ id: audio.id })}
                    title={'Show audio ' + audio.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAudio({ id: audio.id })}
                    title={'Edit audio ' + audio.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete audio ' + audio.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(audio.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AudiosList

import { useRef } from 'react'

import { Howl } from 'howler'
import Peer, { DataConnection } from 'peerjs'
import type { AudioButtonsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

const peer = new Peer(null, { debug: 1 })
let conn: DataConnection
let connectionReady = false

peer.on('open', (id) => {
  console.log({ id })
  conn = peer.connect('resound-v2')

  conn.on('open', function () {
    connectionReady = true
    // Send messages
    // conn.send('Hello!')
  })
})

export const QUERY = gql`
  query AudioButtonsQuery {
    audios {
      id
      title
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

const AudioButton = ({ audio }) => {
  const sound = useRef<Howl>()

  function playSound() {
    // if (!sound.current) {
    //   sound.current = new Howl({
    //     src: [audio.url],
    //     format: ['mp3'],
    //     volume: 0.1,
    //   })
    // }

    // sound.current.play()

    if (connectionReady) {
      conn.send(audio)
    } else {
      alert('WebRTC connection is not ready yet.')
    }
  }

  return (
    <button
      className="flex items-center justify-center h-32 border rounded-xl bg-orange-400 font-bold"
      onClick={playSound}
    >
      {audio.title}
    </button>
  )
}

export const Success = ({ audios }: CellSuccessProps<AudioButtonsQuery>) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {audios.map((item) => {
        return <AudioButton key={item.id} audio={item} />
      })}
    </div>
  )
}

import { useRef } from 'react'

import { Howl } from 'howler'
import Peer, { DataConnection } from 'peerjs'
import { useRecoilState } from 'recoil'
import type { AudioButtonsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { volumeState } from 'src/pages/AudiosSoundboardPage/AudiosSoundboardPage'

const peer = new Peer(null, { debug: 1 })
let conn: DataConnection
let connectionReady = false

peer.on('error', (_id) => {
  console.log('peer error, reconnecting in 5 seconds')
  setTimeout(() => {
    console.log('reconnecting')

    connectToOverlay()
  }, 5000)
})

function connectToOverlay() {
  conn = peer.connect('resound-v2')

  conn.on('open', function () {
    console.log('connected')

    connectionReady = true
  })
}

peer.on('open', (_id) => {
  connectToOverlay()
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

const AudioButton = ({ audio, volume }) => {
  function playSound() {
    console.log({ audio, volume })

    if (connectionReady) {
      conn.send({ audio, volume })
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
  const [volume] = useRecoilState(volumeState)

  return (
    <div className="grid grid-cols-5 gap-2">
      {audios.map((item) => {
        return <AudioButton key={item.id} audio={item} volume={volume} />
      })}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

import { Howl } from 'howler'
import Peer, { DataConnection } from 'peerjs'
import { atom, useRecoilState } from 'recoil'
import type { AudioButtonsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import {
  columnState,
  volumeState,
} from 'src/pages/AudiosSoundboardPage/AudiosSoundboardPage'

export const connectionReadyState = atom({
  key: 'connectionReady',
  default: false,
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

const AudioButton = ({ audio, volume, conn }) => {
  const [connectionReady] = useRecoilState(connectionReadyState)

  function playSound() {
    if (connectionReady) {
      conn.send({ audio, volume })
    } else {
      alert('WebRTC connection is not ready yet.')
    }
  }

  return (
    <button
      className="flex items-center justify-center h-32 rounded bg-orange-400 font-bold"
      onClick={playSound}
    >
      {audio.title}
    </button>
  )
}

const usePeerJs = () => {
  const [peerConnection, setPeerConnection] = useState<DataConnection>(null)
  const [, setConnectionReady] = useRecoilState(connectionReadyState)

  useEffect(() => {
    function connectToOverlay() {
      const conn = peer.connect('resound-v2')
      setPeerConnection(conn)

      conn.on('open', function () {
        console.log('connected')

        setConnectionReady(true)
      })
    }

    const peer = new Peer(null, { debug: 1 })

    peer.on('error', (_id) => {
      console.log('peer error, reconnecting in 5 seconds')

      setTimeout(() => {
        console.log('reconnecting')

        connectToOverlay()
      }, 5000)
    })

    peer.on('open', (_id) => {
      connectToOverlay()
    })
  }, [setConnectionReady])

  return [peerConnection]
}

export const Success = ({ audios }: CellSuccessProps<AudioButtonsQuery>) => {
  const [volume] = useRecoilState(volumeState)
  const [column] = useRecoilState(columnState)
  const [conn] = usePeerJs()

  return (
    <div
      className={`grid grid-cols-3 gap-1 p-1`}
      style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }}
    >
      {audios.map((item) => {
        return (
          <AudioButton key={item.id} audio={item} volume={volume} conn={conn} />
        )
      })}
    </div>
  )
}

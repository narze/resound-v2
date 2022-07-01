import { useEffect, useRef, useState } from 'react'

import { Howl } from 'howler'
import Peer, { DataConnection } from 'peerjs'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const peer = new Peer('resound-v2')

const OverlayPage = () => {
  const [ready, setReady] = useState(false)
  const [audioName, setAudioName] = useState('')

  useEffect(() => {
    peer.on('open', (id) => {
      console.log({ id })
    })

    peer.on('connection', function (conn) {
      console.log('connection received')
      setReady(true)

      conn.on('data', function (data) {
        console.log('Received', data)

        setAudioName(data['title'])

        const sound = new Howl({
          src: [data['url']],
          format: ['mp3'],
          volume: 0.1,
          onend: () => {
            setAudioName('')
          },
        })

        sound.play()
      })
    })
  }, [])
  return (
    <>
      <MetaTags title="Overlay" description="Overlay page" />

      <p>{ready ? 'Ready' : 'Connecting...'}</p>

      <p>
        {audioName.length > 0 ? `Playing ${audioName}` : 'No audio playing'}
      </p>
    </>
  )
}

export default OverlayPage

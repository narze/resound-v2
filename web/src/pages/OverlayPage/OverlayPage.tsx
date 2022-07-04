import { useEffect, useRef, useState } from 'react'

import { Howl } from 'howler'
import Peer, { DataConnection } from 'peerjs'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const peer = new Peer('resound-v2')

const OverlayPage = () => {
  const [ready, setReady] = useState(false)
  const [audioName, setAudioName] = useState('')
  const [volume, setVolume] = useState(0)

  useEffect(() => {
    peer.on('open', (id) => {
      console.log({ id })
    })

    peer.on('connection', function (conn) {
      console.log('connection received')
      setReady(true)

      conn.on('data', function (data) {
        console.log('Received', data)
        const audio = data['audio']
        const volume = data['volume']

        setAudioName(audio['title'])
        setVolume(volume)

        const sound = new Howl({
          src: audio['url'],
          format: 'mp3',
          volume,
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
        {audioName.length > 0
          ? `Playing ${audioName} @ ${volume}`
          : 'No audio playing'}
      </p>
    </>
  )
}

export default OverlayPage

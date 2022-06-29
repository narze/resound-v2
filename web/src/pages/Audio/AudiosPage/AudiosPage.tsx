import { Link, routes } from '@redwoodjs/router'

import AudiosCell from 'src/components/Audio/AudiosCell'

const AudiosPage = () => {
  return (
    <>
      <AudiosCell />
      <Link
        to={routes.audiosSoundboard()}
        title={'Soundboard'}
        className="mt-8 rw-button rw-button-small"
      >
        Soundboard
      </Link>
    </>
  )
}

export default AudiosPage

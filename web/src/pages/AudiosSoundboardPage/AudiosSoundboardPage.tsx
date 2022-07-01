import { MetaTags } from '@redwoodjs/web'

import AudioButtonsCell from 'src/components/AudioButtonsCell'

const AudiosSoundboardPage = () => {
  return (
    <>
      <MetaTags title="AudiosSoundboard" description="AudiosSoundboard page" />

      <AudioButtonsCell />
    </>
  )
}

export default AudiosSoundboardPage

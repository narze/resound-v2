import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'

import { MetaTags } from '@redwoodjs/web'

import AudioButtonsCell from 'src/components/AudioButtonsCell'

export const volumeState = atom({
  key: 'volume',
  default: 0.2,
})

const Volume = () => {
  const [volume, setVolume] = useRecoilState(volumeState)

  function onChange(event) {
    setVolume(+event.target.value)
  }

  return (
    <div>
      Volume:{' '}
      <input
        type="number"
        value={volume}
        onChange={onChange}
        step=".01"
        min="0"
        max="1"
      />
    </div>
  )
}

const AudiosSoundboardPage = () => {
  return (
    <RecoilRoot>
      <MetaTags title="AudiosSoundboard" description="AudiosSoundboard page" />

      <AudioButtonsCell />

      <Volume />
    </RecoilRoot>
  )
}

export default AudiosSoundboardPage

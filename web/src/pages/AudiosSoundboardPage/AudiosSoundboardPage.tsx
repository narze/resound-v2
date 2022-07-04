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

export const columnState = atom({
  key: 'column',
  default: 4,
})

const Volume = () => {
  const [volume, setVolume] = useRecoilState(volumeState)

  function onChange(event) {
    setVolume(+event.target.value)
  }

  return (
    <div>
      Volume
      <input
        type="range"
        value={volume}
        onChange={onChange}
        step=".01"
        min="0"
        max="1"
      />
      {volume}
    </div>
  )
}

const Column = () => {
  const [column, setColumn] = useRecoilState(columnState)

  function onChange(event) {
    setColumn(+event.target.value)
  }

  return (
    <div>
      Column
      <input
        type="range"
        value={column}
        onChange={onChange}
        step="1"
        min="3"
        max="10"
      />
      {column}
    </div>
  )
}

const AudiosSoundboardPage = () => {
  return (
    <RecoilRoot>
      <MetaTags title="AudiosSoundboard" description="AudiosSoundboard page" />

      <Volume />
      <Column />

      <AudioButtonsCell />
    </RecoilRoot>
  )
}

export default AudiosSoundboardPage

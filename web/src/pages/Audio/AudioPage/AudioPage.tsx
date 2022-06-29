import AudioCell from 'src/components/Audio/AudioCell'

type AudioPageProps = {
  id: number
}

const AudioPage = ({ id }: AudioPageProps) => {
  return <AudioCell id={id} />
}

export default AudioPage

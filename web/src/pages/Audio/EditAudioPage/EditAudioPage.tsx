import EditAudioCell from 'src/components/Audio/EditAudioCell'

type AudioPageProps = {
  id: number
}

const EditAudioPage = ({ id }: AudioPageProps) => {
  return <EditAudioCell id={id} />
}

export default EditAudioPage

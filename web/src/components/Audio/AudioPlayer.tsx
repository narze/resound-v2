export const AudioPlayer = ({ url }) => {
  return (
    <audio controls>
      <source src={url} type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
  )
}

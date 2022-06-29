import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type AudioLayoutProps = {
  children: React.ReactNode
}

const AudiosLayout = ({ children }: AudioLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.audios()}
            className="rw-link"
          >
            Audios
          </Link>
        </h1>
        <Link
          to={routes.newAudio()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Audio
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default AudiosLayout

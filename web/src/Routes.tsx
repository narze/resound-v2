// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import AudiosLayout from 'src/layouts/AudiosLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/overlay" page={OverlayPage} name="overlay" />
      <Route path="/audios/soundboard" page={AudiosSoundboardPage} name="audiosSoundboard" />
      <Set wrap={AudiosLayout}>
        <Route path="/audios/new" page={AudioNewAudioPage} name="newAudio" />
        <Route path="/audios/{id:Int}/edit" page={AudioEditAudioPage} name="editAudio" />
        <Route path="/audios/{id:Int}" page={AudioAudioPage} name="audio" />
        <Route path="/audios" page={AudioAudiosPage} name="audios" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

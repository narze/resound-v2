import { render } from '@redwoodjs/testing/web'

import AudiosSoundboardPage from './AudiosSoundboardPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AudiosSoundboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AudiosSoundboardPage />)
    }).not.toThrow()
  })
})

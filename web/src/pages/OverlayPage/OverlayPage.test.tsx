import { render } from '@redwoodjs/testing/web'

import OverlayPage from './OverlayPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('OverlayPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OverlayPage />)
    }).not.toThrow()
  })
})

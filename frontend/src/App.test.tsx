import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'

import { store } from '@/app/store'

import App from './App'

describe('App', () => {
  it('renders heading and visitor form', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    expect(screen.getByRole('heading', { name: 'FrontDesk' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Name *')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add visitor' })).toBeInTheDocument()
  })
})

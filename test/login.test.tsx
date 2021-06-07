import React from 'react'
import Index from '../pages/login'
import renderer from 'react-test-renderer'

describe('Index', () => {
  it('renders the html we want', async () => {
    const component = renderer.create(
        <Index />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

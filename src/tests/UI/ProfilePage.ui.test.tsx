import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'

import { User } from '../../models/User'
import ProfilePage from '../../pages/Profile'
import { GetUserProfileSpy } from './helpers/GetUserProfileSpy'
import { simulateTyping } from './helpers/SharedHelpers'
import { UserLocalStoreSpy } from './helpers/UserLocalStoreSpy'

describe('ProfilePage', () => {
  test('displays loading indicator while loading user', async () => {
    renderSUT()
    expect(screen.getByText('Loading...')).toBeVisible()
  })

  test('should render validation error on empty fields', async () => {
    renderSUT()

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

    await simulateTyping("Email address", "")
    expect(screen.queryAllByText('Invalid email address')).toHaveLength(1)

    await simulateTyping("First name", "")
    expect(screen.queryAllByText('Invalid first name')).toHaveLength(1)

    await simulateTyping("Last name", "")
    expect(screen.queryAllByText('Invalid last name')).toHaveLength(1)
  })

  test('should render Profile edit form fields with initial values' , async () => {
    const expectedUser = anyUserWithEmail("another@mail.com")
    renderSUT(expectedUser)

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))
    const email = screen.getByLabelText('Email address')
    expect(email).toBeVisible()
    expect(email).toHaveValue(expectedUser.email)

    const firstName = screen.getByLabelText('First name')
    expect(firstName).toBeVisible()
    expect(firstName).toHaveValue(expectedUser.first_name)

    const lastName = screen.getByLabelText('Last name')
    expect(lastName).toBeVisible()
    expect(lastName).toHaveValue(expectedUser.last_name)
  })

  function renderSUT(user: User = anyUserWithEmail("any-email@mail.com")) {
    const spy = new GetUserProfileSpy()
    spy.user = user
    render(<ProfilePage loader={spy} cache={new UserLocalStoreSpy()} />)
  }

  function anyUserWithEmail(email: string): User {
    return {
      id: Math.random(),
      email: email,
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg',
      updatedAt: new Date()
    }
  }
})

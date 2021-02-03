import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { AuthenticatedUser } from '../../models/AuthenticatedUser'

import { GetUserProfile } from '../../models/GetUserProfile'
import { User } from '../../models/User'
import ProfilePage from '../../pages/Profile'
import { UserStore } from '../../services/cache/UserLocalStore'

class GetUserProfileSpy implements GetUserProfile {
  user?: User

  async find(): Promise<User> {
    return this.user!
  }
}

class UserLocalStoreSpy implements UserStore {
  insert(user: AuthenticatedUser): void {
  }

  retrieve(): AuthenticatedUser | null {
    return { user: { email: "any-email@mail.com" }, token: "any-token" }
  }

  delete(): void {
  }
}

describe('ProfilePage', () => {
  test('displays loading indicator while loading user', async () => {
    const spy = new GetUserProfileSpy()
    spy.user = anyUserWithEmail("any-email@mail.com")
    render(<ProfilePage loader={spy} cache={new UserLocalStoreSpy()} />)

    expect(screen.getByText('Loading...')).toBeVisible()
  })

  test('should render validation error on empty fields', async () => {
    const spy = new GetUserProfileSpy()
    spy.user = anyUserWithEmail("any-email@mail.com")
    render(<ProfilePage loader={spy} cache={new UserLocalStoreSpy()} />)

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

    await simulateTyping("Email address", "")
    expect(screen.queryAllByText('Invalid email address')).toHaveLength(1)

    await simulateTyping("First name", "")
    expect(screen.queryAllByText('Invalid first name')).toHaveLength(1)

    await simulateTyping("Last name", "")
    expect(screen.queryAllByText('Invalid last name')).toHaveLength(1)

  })

  test('should render Profile edit form fields with initial values' , async () => {
    const expectedUser = anyUserWithEmail("any-email@mail.com")
    const spy = new GetUserProfileSpy()
    spy.user = expectedUser
    render(<ProfilePage loader={spy} cache={new UserLocalStoreSpy()} />)

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

  async function simulateTyping(label: string, value: string): Promise<void> {
    const input = screen.getByLabelText(label)
    await waitFor(() => fireEvent.change(input, { target: { value } }));
    await waitFor(() => fireEvent.blur(input));
  }
})

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

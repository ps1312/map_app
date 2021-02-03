import { render, screen } from '@testing-library/react'
import { AuthenticatedUser } from '../../models/AuthenticatedUser'

import { GetUserProfile } from '../../models/GetUserProfile'
import { User } from '../../models/User'
import ProfilePage from '../../pages/Profile'
import { UserStore } from '../../services/cache/UserLocalStore'

class GetUserProfileSpy implements GetUserProfile {
  async find(email: string): Promise<User> {
    return anyUserWithEmail(email)
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
    render(<ProfilePage loader={new GetUserProfileSpy()} cache={new UserLocalStoreSpy()} />)

    expect(screen.getByText('Loading...')).toBeVisible()
  })

  test('should render email field with loaded email' , async () => {
    const user = anyUserWithEmail("any-email@mail.com")
    render(<ProfilePage loader={new GetUserProfileSpy()} cache={new UserLocalStoreSpy()} />)

    // wait for load
    const input = await screen.findByLabelText('Email address')
    expect(input).toBeVisible()
    expect(input).toHaveValue(user.email)
  })
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

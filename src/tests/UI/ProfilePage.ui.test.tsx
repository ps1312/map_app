import { render, screen, waitForElementToBeRemoved, waitFor, wait } from '@testing-library/react'
import { UserEditModel } from '../../models/EditUserProfile'

import { User } from '../../models/User'
import ProfilePage from '../../pages/Profile'
import { EditUserProfileSpy } from './helpers/EditUserProfileSpy'
import { GetUserProfileSpy } from './helpers/GetUserProfileSpy'
import { simulateTyping, submitForm } from './helpers/SharedHelpers'
import { UserLocalStoreSpy } from './helpers/UserLocalStoreSpy'

describe('ProfilePage', () => {
  test('displays loading indicator while loading user', async () => {
    renderSUT()
    expect(screen.getByText('Loading...')).toBeVisible()
  })

  test('submit button should be disabled on form load', async () => {
    renderSUT()
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
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

  test('submit button should not be disabled on at least one field edited with valid values', async () => {
    renderSUT()
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))
    await simulateTyping("Email address", "valid@mail.com")
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  test('submit button with valid fields should request user update with correct params', async () => {
    const userUpdateSpy = renderSUT()
    const updatedUser = anyEditUserModel()

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))
    await simulateTyping("Email address", updatedUser.email!)
    await simulateTyping("First name", updatedUser.first_name!)
    await simulateTyping("Last name", updatedUser.last_name!)
    await submitForm()

    expect(userUpdateSpy.lastUpdatedUser).toStrictEqual(updatedUser)
  })

  function renderSUT(
    user: User = anyUserWithEmail("any-email@mail.com"),
    editUserModel: UserEditModel = anyEditUserModel(),
    ): EditUserProfileSpy {
    const userUpdateSpy = new EditUserProfileSpy()
    userUpdateSpy.lastUpdatedUser = editUserModel

    const getUserSpy = new GetUserProfileSpy()
    getUserSpy.lastUserCalled = user

    render(<ProfilePage loader={getUserSpy} updater={userUpdateSpy} cache={new UserLocalStoreSpy()} />)

    return userUpdateSpy;
  }

  function anyEditUserModel(): UserEditModel {
    return { email: "updated@mail.com", first_name: "updatedFristName", last_name: "updatedLastName" }
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

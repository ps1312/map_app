import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { UserLoginModel } from '../../models/UserLogin'
import LoginPage from '../../pages/Login/index'
import { UserLocalStore } from '../../services/cache/UserLocalStore'
import { simulateTyping } from './helpers/SharedHelpers'
import { UserLoginSpy } from './helpers/UserLoginSpy'

describe('LoginPage', () => {
  test('submit button should be disabled on empty formulary', async () => {
    render(<LoginPage authentication={new UserLoginSpy()} cache={new UserLocalStore()} />)

    expect(screen.getByRole('button')).toHaveAttribute('disabled')
  })

  test('should have validation error given input field is touched and error exists on form', async () => {
    render(<LoginPage authentication={new UserLoginSpy()} cache={new UserLocalStore()} />)
    const input = screen.getByLabelText('Email address')
    await waitFor(() => fireEvent.blur(input));
    expect(screen.queryAllByText('Invalid email address')).toHaveLength(1)
  })

  test('should have validation error given invalid email and field is touched', async () => {
    render(<LoginPage authentication={new UserLoginSpy()} cache={new UserLocalStore()} />)
    const input = screen.getByLabelText('Email address')
    await waitFor(() => fireEvent.change(input, { target: { value: "invalid email" } }));
    await waitFor(() => fireEvent.blur(input));
    expect(screen.queryAllByText('Invalid email address')).toHaveLength(1)
  })

  test('delivers validation error on password input field empty and touched', async () => {
    render(<LoginPage authentication={new UserLoginSpy()} cache={new UserLocalStore()} />)
    const input = screen.getByLabelText('Password')
    await waitFor(() => fireEvent.blur(input));
    expect(screen.queryAllByText('Invalid password')).toHaveLength(1)
  })

  test('submit should not be disabled on valid formulary', async () => {
    render(<LoginPage authentication={new UserLoginSpy()} cache={new UserLocalStore()} />)

    const userLoginModel: UserLoginModel = { email: "valid@email.com", password: "any-password" }

    await simulateTyping("Email address", userLoginModel.email)
    await simulateTyping("Password", userLoginModel.password)

    const button = screen.getByRole('button')
    expect(button).not.toHaveAttribute('disabled')
  })

  test('submit should call login with correct values', async () => {
    const spy = new UserLoginSpy()
    render(<LoginPage authentication={spy} cache={new UserLocalStore()} />)

    const userLoginModel: UserLoginModel = { email: "valid@email.com", password: "any-password" }

    await simulateTyping("Email address", userLoginModel.email)
    await simulateTyping("Password", userLoginModel.password)
    await submitForm()

    expect(spy.lastUserLoginModel).not.toBeUndefined()
    expect(spy.lastUserLoginModel).toStrictEqual(userLoginModel)
  })

  async function submitForm() {
    await waitFor(() => fireEvent.click(screen.getByRole('button')))
  }
})

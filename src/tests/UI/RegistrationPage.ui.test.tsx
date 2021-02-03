import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthenticatedUser } from '../../models/AuthenticatedUser'
import { UserRegister, UserRegisterModel } from '../../models/UserRegister'

import RegistrationPage from '../../pages/Registration/index'

class UserRegisterSpy implements UserRegister {
  lastUserRegisterModel?: UserRegisterModel

  async register(userRegisterModel: UserRegisterModel): Promise<AuthenticatedUser> {
    this.lastUserRegisterModel = userRegisterModel
    return { user: { id: 4 }, token: "any-token" }
  }
}

describe('RegistrationPage', () => {
  test('submit button should be disabled on empty formulary', async () => {
    render(<RegistrationPage registration={new UserRegisterSpy()} />)

    expect(screen.getByRole('button')).toHaveAttribute('disabled')
  })

  test('should have validation error given input field is touched and error exists on form', async () => {
    render(<RegistrationPage registration={new UserRegisterSpy()} />)
    const input = screen.getByLabelText('Email address')
    await waitFor(() => fireEvent.blur(input));
    expect(screen.queryAllByText('Invalid email address')).toHaveLength(1)
  })

  test('should have validation error given invalid email and field is touched', async () => {
    render(<RegistrationPage registration={new UserRegisterSpy()} />)
    const input = screen.getByLabelText('Email address')
    await waitFor(() => fireEvent.change(input, { target: { value: "invalid email" } }));
    await waitFor(() => fireEvent.blur(input));
    expect(screen.queryAllByText('Invalid email address')).toHaveLength(1)
  })

  test('delivers validation error on password input field empty and touched', async () => {
    render(<RegistrationPage registration={new UserRegisterSpy()} />)
    const input = screen.getByLabelText('Password')
    await waitFor(() => fireEvent.blur(input));
    expect(screen.queryAllByText('Invalid password')).toHaveLength(1)
  })

  test('submit should not be disabled on valid formulary', async () => {
    render(<RegistrationPage registration={new UserRegisterSpy()} />)

    const userRegisterModel: UserRegisterModel = { email: "valid@email.com", password: "any-password" }

    await simulateTyping("Email address", userRegisterModel.email)
    await simulateTyping("Password", userRegisterModel.password)

    const button = screen.getByRole('button')
    expect(button).not.toHaveAttribute('disabled')
  })

  test('submit should call registration with correct values', async () => {
    const spy = new UserRegisterSpy()
    render(<RegistrationPage registration={spy} />)

    const userRegisterModel: UserRegisterModel = { email: "valid@email.com", password: "any-password" }

    await simulateTyping("Email address", userRegisterModel.email)
    await simulateTyping("Password", userRegisterModel.password)
    await submitForm()

    expect(spy.lastUserRegisterModel).not.toBeUndefined()
    expect(spy.lastUserRegisterModel).toStrictEqual(userRegisterModel)
  })

  async function simulateTyping(label: string, value: string): Promise<void> {
    const input = screen.getByLabelText(label)
    await waitFor(() => fireEvent.change(input, { target: { value } }));
    await waitFor(() => fireEvent.blur(input));
  }

  async function submitForm() {
    await waitFor(() => fireEvent.click(screen.getByRole('button')))
  }
})

import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { UserRegisterModel } from '../../models/UserRegister'
import RegistrationPage from '../../pages/Registration/index'
import { UserLocalStore } from '../../services/cache/UserLocalStore'
import { simulateTyping, submitForm } from './helpers/SharedHelpers'
import { UserRegisterSpy } from './helpers/UserRegisterSpy'

describe('RegistrationPage', () => {
  test('submit button should be disabled on empty formulary', async () => {
    render(<RegistrationPage registration={new UserRegisterSpy()} cache={new UserLocalStore()} />)

    expect(screen.getByRole('button')).toHaveAttribute('disabled')
  })

  test('should have validation error given input field is touched and error exists on form', async () => {
    render(<RegistrationPage registration={new UserRegisterSpy()} cache={new UserLocalStore()}/>)
    const input = screen.getByLabelText('Email address')
    await waitFor(() => fireEvent.blur(input));
    expect(screen.queryAllByText('Invalid email address')).toHaveLength(1)
  })

  test('should have validation error given invalid email and field is touched', async () => {
    render(<RegistrationPage registration={new UserRegisterSpy()} cache={new UserLocalStore()}/>)
    const input = screen.getByLabelText('Email address')
    await waitFor(() => fireEvent.change(input, { target: { value: "invalid email" } }));
    await waitFor(() => fireEvent.blur(input));
    expect(screen.queryAllByText('Invalid email address')).toHaveLength(1)
  })

  test('delivers validation error on password input field empty and touched', async () => {
    render(<RegistrationPage registration={new UserRegisterSpy()} cache={new UserLocalStore()}/>)
    const input = screen.getByLabelText('Password')
    await waitFor(() => fireEvent.blur(input));
    expect(screen.queryAllByText('Invalid password')).toHaveLength(1)
  })

  test('submit should not be disabled on valid formulary', async () => {
    render(<RegistrationPage registration={new UserRegisterSpy()} cache={new UserLocalStore()}/>)

    const userRegisterModel: UserRegisterModel = { email: "valid@email.com", password: "any-password" }

    await simulateTyping("Email address", userRegisterModel.email)
    await simulateTyping("Password", userRegisterModel.password)

    const button = screen.getByRole('button')
    expect(button).not.toHaveAttribute('disabled')
  })

  test('submit should call registration with correct values', async () => {
    const spy = new UserRegisterSpy()
    render(<RegistrationPage registration={spy} cache={new UserLocalStore()} />)

    const userRegisterModel: UserRegisterModel = { email: "valid@email.com", password: "any-password" }

    await simulateTyping("Email address", userRegisterModel.email)
    await simulateTyping("Password", userRegisterModel.password)
    await submitForm()

    expect(spy.lastUserRegisterModel).not.toBeUndefined()
    expect(spy.lastUserRegisterModel).toStrictEqual(userRegisterModel)
  })

  test('should display error message on failure', async () => {
    const spy = new UserRegisterSpy()
    render(<RegistrationPage registration={spy} cache={new UserLocalStore()} />)

    const userRegisterModel: UserRegisterModel = { email: "valid@email.com", password: "any-password" }

    await simulateTyping("Email address", userRegisterModel.email)
    await simulateTyping("Password", userRegisterModel.password)
    await submitForm()

    expect(screen.getByText("Something went wrong.")).toBeVisible()
  })
})

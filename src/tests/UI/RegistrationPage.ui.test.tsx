import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthenticatedUser } from '../../models/AuthenticatedUser'
import { UserRegister, UserRegisterModel } from '../../models/UserRegister'

import RegistrationPage from '../../pages/Registration/index'

class UserRegisterSpy implements UserRegister {
  register(_userRegisterModel: UserRegisterModel): Promise<AuthenticatedUser> {
    throw new Error('Method not implemented.')
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
})

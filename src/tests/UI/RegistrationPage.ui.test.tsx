import { render, screen, fireEvent } from '@testing-library/react'
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

  test('should render invalid email error on invalid email', async () => {
    render(<RegistrationPage registration={new UserRegisterSpy()} />)

    fireEvent.change(screen.getByLabelText('email-input'), { target: { value: "invalid email" }});

    expect(screen.getByLabelText('invalid-email')).toBeVisible()
  })
})

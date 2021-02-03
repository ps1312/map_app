import { render, screen } from '@testing-library/react'
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
})

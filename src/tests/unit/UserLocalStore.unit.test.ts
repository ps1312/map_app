class UserLocalStore {}

describe('UserLocalStore', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('init does not have any side effect', () => {
    new UserLocalStore()
    expect(localStorage.length).toEqual(0)
  })
})

export {}
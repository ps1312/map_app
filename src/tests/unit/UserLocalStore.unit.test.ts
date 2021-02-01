class UserLocalStore {
  constructor(
    private readonly store: Storage,
  ) {}

  retrieve() {
    return this.store.getItem("user")
  }
}

describe('UserLocalStore', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('init does not have any side effect', () => {
    new UserLocalStore(localStorage)
    expect(localStorage.length).toEqual(0)
  })

  test('delivers null result on empty local store', () => {
    const sut = new UserLocalStore(localStorage)
    const result = sut.retrieve()
    expect(result).toStrictEqual(null)
  })
})

export {}
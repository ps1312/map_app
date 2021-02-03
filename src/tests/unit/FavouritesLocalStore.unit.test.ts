class FavouritesLocalStore {}

describe('FavouritesLocalStore', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('init does not have side effects', () => {
    new FavouritesLocalStore()
    expect(localStorage.length).toEqual(0)
  })
})

export {}
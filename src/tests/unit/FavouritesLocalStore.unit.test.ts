class FavouritesLocalStore {
  static localStorageKey = "favourites"

  insert(placeId: string) {
    localStorage.setItem(FavouritesLocalStore.localStorageKey, JSON.stringify([placeId]))
  }

  retrieve() {
    const string = localStorage.getItem(FavouritesLocalStore.localStorageKey)
    const favourites = JSON.parse(string as string)
    return favourites
  }
}

describe('FavouritesLocalStore', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('init does not have side effects', () => {
    new FavouritesLocalStore()
    expect(localStorage.length).toEqual(0)
  })

  test('retrieve array of inserted favourites places in local storage', () => {
    const sut = new FavouritesLocalStore()
    sut.insert("any-place-id")
    expect(sut.retrieve()).toHaveLength(1)
  })
})

export {}
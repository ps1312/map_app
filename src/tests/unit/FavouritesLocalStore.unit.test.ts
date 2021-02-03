class FavouritesLocalStore {
  static localStorageKey = "favourites"

  insert(placeId: string) {
    const favourites = this.retrieve()
    const updatedFavourites = [...favourites, placeId]
    localStorage.setItem(FavouritesLocalStore.localStorageKey, JSON.stringify(updatedFavourites))
  }

  retrieve(): string[] {
    const string = localStorage.getItem(FavouritesLocalStore.localStorageKey)
    const favourites = JSON.parse(string as string)
    return favourites ? favourites : []
  }

  delete(deletionPlaceId: string): string[] {
    const favourites = this.retrieve()
    const updatedFavourites = favourites.filter((placeId) => deletionPlaceId !== placeId)
    localStorage.setItem(FavouritesLocalStore.localStorageKey, JSON.stringify(updatedFavourites))
    return updatedFavourites
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

  test('retrieve empty array on empty storage', () => {
    const sut = new FavouritesLocalStore()
    expect(sut.retrieve()).toHaveLength(0)
  })

  test('retrieve array of inserted favourites places in local storage', () => {
    const sut = new FavouritesLocalStore()
    sut.insert(anyPlaceId())
    expect(sut.retrieve()).toHaveLength(1)
  })

  test('retrieve two inserted places_id', async () => {
    const sut = new FavouritesLocalStore()
    const id1 = "any-id-1"
    sut.insert(id1)

    const id2 = "any-id-2"
    sut.insert(id2)

    const favourites = sut.retrieve()
    expect(favourites).toHaveLength(2)
    expect(favourites[0]).toStrictEqual(id1)
    expect(favourites[1]).toStrictEqual(id2)
  })

  test('deletes inserted place_id', () => {
    const sut = new FavouritesLocalStore()

    const id1 = "id1"
    sut.insert(id1)
    const id2 = "id2"
    sut.insert(id2)

    sut.delete(id1)

    const favourites = sut.retrieve()
    expect(favourites).toHaveLength(1)
    expect(favourites[0]).toStrictEqual(id2)
  })

  function anyPlaceId(): string {
    return "any-id-1"
  }
})

export {}
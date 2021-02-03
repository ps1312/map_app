export class FavouritesLocalStore {
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
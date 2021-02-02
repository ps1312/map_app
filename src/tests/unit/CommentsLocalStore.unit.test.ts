class CommentsLocalStore {
  retrieve(placeId: string): string | null {
    return localStorage.getItem(`${placeId}`)
  }
}

describe('CommentsLocalStore', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('does not have side effects on init', () => {
    new CommentsLocalStore()
    expect(localStorage.length).toEqual(0)
  })

  test('retrieve with place_id returns null on empty store', () => {
    const sut = new CommentsLocalStore()

    expect(sut.retrieve(anyPlaceId())).toStrictEqual(null)
  })

  function anyPlaceId(): string {
    return "ChIJi0DllG8ZqwcRpuO9gvcOgOU"
  }
})

export {}
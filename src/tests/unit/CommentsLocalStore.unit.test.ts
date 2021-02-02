class CommentsLocalStore {}

describe('CommentsLocalStore', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('does not have side effects on init', () => {
    new CommentsLocalStore()
    expect(localStorage.length).toEqual(0)
  })
})

export {}
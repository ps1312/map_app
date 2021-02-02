import { CommentsLocalStore, Comment } from "../../services/cache/CommentsLocalStore"

describe('CommentsLocalStore', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('does not have side effects on init', () => {
    new CommentsLocalStore()
    expect(localStorage.length).toEqual(0)
  })

  test('retrieve with place_id returns empty array on empty store', () => {
    const sut = new CommentsLocalStore()

    expect(sut.retrieve(anyPlaceId())).toStrictEqual([])
  })

  test('retrieve two inserted comments on same place_id delivers array with two comment elements in same order', () => {
    const sut = new CommentsLocalStore()
    const placeId = anyPlaceId()
    const firstComment = anyComment()
    const secondComment = anyComment()

    sut.insert(placeId, firstComment)
    sut.insert(placeId, secondComment)

    const comments = sut.retrieve(placeId)

    expect(comments).toHaveLength(2)
    expect(comments[0]).toStrictEqual(firstComment)
    expect(comments[1]).toStrictEqual(secondComment)
  })

  test('retrieve twice does not have any side effects', () => {
    const sut = new CommentsLocalStore()
    const placeId = anyPlaceId()
    const comment = anyComment()
    sut.insert(anyPlaceId(), comment)

    const firstRetrieve = sut.retrieve(placeId)
    expect(firstRetrieve).toHaveLength(1)
    expect(firstRetrieve[0]).toStrictEqual(comment)

    const secondRetrieve = sut.retrieve(placeId)
    expect(secondRetrieve).toHaveLength(1)
    expect(secondRetrieve[0]).toStrictEqual(comment)

  })

  function anyComment(): Comment {
    return { content: `text ${Math.random()}`, score: 5 };
  }

  function anyPlaceId(): string {
    return "ChIJi0DllG8ZqwcRpuO9gvcOgOU"
  }
})

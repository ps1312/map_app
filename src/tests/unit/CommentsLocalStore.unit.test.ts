type Comment = {
  content: string;
  score: number;
}

class CommentsLocalStore {
  retrieve(placeId: string): Comment[] | null {
    const placeComments = localStorage.getItem(`${placeId}`)

    if (placeComments) {
      return JSON.parse(placeComments)
    }

    return null
  }

  insert(placeId: string, comment: Comment) {
    const currentComments = this.retrieve(placeId)

    if (!currentComments) {
      localStorage.setItem(placeId, JSON.stringify([comment]))
    } else {
      const updatedComments = [...currentComments, comment]
      localStorage.setItem(placeId, JSON.stringify(updatedComments))
    }
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

  test('retrieve inserted comment on place_id key delivers array with one comment element', () => {
    const sut = new CommentsLocalStore()
    const placeId = anyPlaceId()
    const comment = anyComment()

    sut.insert(placeId, comment)
    const comments = sut.retrieve(placeId) as Comment[]

    expect(comments).toHaveLength(1)
    expect(comments[0]).toStrictEqual(comment)
  })

  test('retrieve two inserted comments on same place_id delivers array with two comment elements in same order', () => {
    const sut = new CommentsLocalStore()
    const placeId = anyPlaceId()
    const firstComment = anyComment()
    const secondComment = anyComment()

    sut.insert(placeId, firstComment)
    sut.insert(placeId, secondComment)

    const comments = sut.retrieve(placeId) as Comment[]

    expect(comments).toHaveLength(2)
    expect(comments[0]).toStrictEqual(firstComment)
    expect(comments[1]).toStrictEqual(secondComment)
  })

  function anyComment(): Comment {
    return { content: `text ${Math.random()}`, score: 5 };
  }

  function anyPlaceId(): string {
    return "ChIJi0DllG8ZqwcRpuO9gvcOgOU"
  }
})

export {}
export type Comment = {
  content: string;
  score: number;
  author: string;
}

export class CommentsLocalStore {
  retrieve(placeId: string): Comment[] {
    const placeComments = localStorage.getItem(`${placeId}`)
    if (placeComments) return JSON.parse(placeComments)
    return []
  }

  insert(placeId: string, comment: Comment) {
    const currentComments = this.retrieve(placeId)
    const updatedComments = [...currentComments, comment]
    localStorage.setItem(placeId, JSON.stringify(updatedComments))
  }
}
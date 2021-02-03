import { Container, Box, Heading, Text, Stack } from "@chakra-ui/react"
import { CacheComment } from "../../../services/cache/CommentsLocalStore";
import RatingDisabled from "./RatingStarDisabled";

type CommentsListProps = {
  comments: CacheComment[]
}

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <Container>
      {comments.map((comment, index) => {
        return (
          <Box key={index} borderBottom="1px solid" borderColor="gray.400" p={5}>
            <Stack mb={5}>
              <Heading size="xm">{comment.author}</Heading>
              <RatingDisabled rating={comment.score} />
            </Stack>
            <Text fontSize="sm">{comment.content}</Text>
          </Box>
        )
      })}
    </Container>
  )
}

export default CommentsList;
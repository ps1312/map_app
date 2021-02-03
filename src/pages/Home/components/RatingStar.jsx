import StarRatings from 'react-star-ratings';

const Rating = ({ rating, setRating }) => (
  <StarRatings
    rating={rating}
    starRatedColor="blue"
    changeRating={(newRating) => setRating(newRating)}
    numberOfStars={5}
    name='rating'
    starDimension="20px"
    starSpacing="5px"
    starRatedColor="#3182CE"
    starHoverColor="#3182CE"
  />
)

export default Rating;
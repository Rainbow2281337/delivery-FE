import { Button, Rating, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { useParams } from "react-router-dom";
import { addReview } from "../../state/review/add-review.slice";

const AddReviewForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState("");

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reviewData = {
      restaurantId: id,
      rating,
      comment,
    };
    try {
      dispatch(addReview(reviewData));
    } catch (error) {
      console.error("Error posting comment: ", error);
    }
  };

  return (
    <form className="mb-8" onSubmit={handleSubmit}>
      <div>
        <div>
          <TextField
            id="userComment"
            variant="outlined"
            fullWidth
            multiline
            maxRows={15}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div>
            <Rating
              id="userRating"
              value={rating}
              max={5}
              name="unique-rating"
              onChange={(event, newValue) => setRating(newValue)}
            />
          </div>
          <div>
            <Button variant="contained" type="submit">
              Post Review
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddReviewForm;
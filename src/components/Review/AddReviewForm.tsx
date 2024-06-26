import { Button, Rating, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { useParams } from "react-router-dom";
import { addReview } from "../../state/review/add-review.slice";
import { translate } from "../../assets/i18n";

const AddReviewForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error: string | null = useSelector<RootState, string | null>(
    (state) => state.addReview.error
  );
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  const { id } = useParams();
  const [rating, setRating] = useState<number | null>(1);
  const [comment, setComment] = useState<string>("");

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
      <div className="">
        <div className="dark:bg-white rounded-lg">
          <TextField
            id="userComment"
            variant="outlined"
            fullWidth
            multiline
            maxRows={15}
            value={comment}
            placeholder="Type here..."
            onChange={handleCommentChange}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="my-4">
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
              {translate("post_review", preferredLanguage)}
            </Button>
          </div>
        </div>
        {error && (
          <div className="mt-2">
            <span className="text-lg text-red-500 font-semibold">{error}</span>
          </div>
        )}
      </div>
    </form>
  );
};

export default AddReviewForm;

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store";
import { useEffect, useState } from "react";
import { getDishes } from "../../state/restaurant/dish/dish-slice";
import DishItem from "./DishItem";
import { Dish } from "../../interfaces/dish-interface";
import DishFilter from "./DishFilter";
import Container from "../Container";
import NoMatches from "../NoMatches";
import SkeletonComponent from "../ui/SkeletonComponent";

const DishList = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const dishes = useSelector<RootState, Dish[]>(
    (state) => state.getDishes.dishes
  );
  const status = useSelector<RootState>((state) => state.getDishes.status);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    try {
      dispatch(getDishes(id));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [id, dispatch]);

  const filteredFood = selectedType
    ? dishes.filter((dish) => dish.category === selectedType)
    : dishes;

  // handle type selection
  const handleTypeSelect = (type: string | null) => {
    setSelectedType(type === selectedType ? null : type);
  };

  return (
    <Container>
      <div className="pb-20">
        <DishFilter
          selectedType={selectedType}
          handleTypeSelect={handleTypeSelect}
        />
        {filteredFood.length === 0 ? (
          <NoMatches />
        ) : (
          <div
            className="
              pt-8
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              md:grid-cols-3
              md:gap-4
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
            "
          >
            {status === "loading" ? (
              <SkeletonComponent />
            ) : (
              filteredFood.map((food) => <DishItem key={food.id} dish={food} />)
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default DishList;

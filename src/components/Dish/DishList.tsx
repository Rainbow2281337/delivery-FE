import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store";
import { useEffect, useState } from "react";
import { getDishes } from "../../state/restaurant/dish/dish-slice";
import DishItem from "./DishItem";
import { Dish } from "../../interfaces/dish-interface";
import DishFilter from "./DishFilter";

const DishList = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const dishes = useSelector<RootState, Dish[]>(
    (state) => state.getDishes.dishes
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    try {
      dispatch(getDishes(id));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [id, dispatch]);

  const filteredItems = selectedCategory
    ? dishes.filter((dish) => dish.category === selectedCategory)
    : dishes;

  // handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const clearFilter = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="mt-8 w-[80%] mx-auto">
      <DishFilter
        dishes={dishes}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
        clearFilter={clearFilter}
      />
      <ul className="flex items-center justify-center 2xl:items-start 2xl:justify-start gap-4 flex-wrap">
        {filteredItems.map((dish) => (
          <li key={dish.id}>
            <DishItem dish={dish} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishList;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Dish } from "../../../../interfaces/dish-interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store";
import { translate } from "../../../../assets/i18n";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useParams } from "react-router-dom";
import { getDishes } from "../../../../state/restaurant/dish/dish-slice";
import { deleteDish } from "../../../../api/deleteDish";
import SkeletonComponent from "../../../ui/SkeletonComponent";
import Container from "../../../Container";
import NoMatches from "../../../NoMatches";

const DishTable = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const dishes = useSelector<RootState, Dish[]>(
    (state) => state.getDishes.dishes
  );
  const status = useSelector<RootState>((state) => state.getDishes.status);
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const handleDishDelete = (
    restaurantId: string | undefined,
    dishId: string
  ) => {
    try {
      deleteDish(restaurantId, dishId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefresh = () => {
    try {
      dispatch(getDishes(id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container>
      {dishes && dishes.length > 0 ? (
        <div className="pt-40">
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("title", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("price", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("weight", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("description", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("calories", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("category", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("actions", preferredLanguage)}
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dishes.map((dish) => (
                <TableRow key={dish.id}>
                  <TableCell>
                    <div className="dark:text-neutral-400">{dish.title}</div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">{dish.price}₴</div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">
                      {dish.weight} {translate("gram", preferredLanguage)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">
                      {dish.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">{dish.calories}</div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">{dish.category}</div>
                  </TableCell>
                  <TableCell>
                    <div
                      title="Delete"
                      className="cursor-pointer"
                      onClick={() => handleDishDelete(id, dish.id)}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            <div className="flex mt-2">
              <div
                title="Refresh"
                className="cursor-pointer dark:text-white"
                onClick={handleRefresh}
              >
                <RefreshIcon fontSize="large" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-40">
          {status === "loading" ? (
            <div>
              <SkeletonComponent />
            </div>
          ) : (
            <NoMatches title="No food found" subtitle="Try again later" />
          )}
        </div>
      )}
    </Container>
  );
};

export default DishTable;

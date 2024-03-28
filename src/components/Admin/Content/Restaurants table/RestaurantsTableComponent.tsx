import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store";
import { Restaurant } from "../../../../interfaces/restaurant-interface";
import SkeletonComponent from "../../../ui/SkeletonComponent";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { getRestaurants } from "../../../../state/restaurant/restaurant-slice";
import { deleteRestaurant } from "../../../../state/admin/delete-restaurant-slice";
import { useState } from "react";
import AdminModalAddRestaurantComponent from "../../Modal/AdminModalAddRestaurantComponent";
import Container from "../../../Container";
import { translate } from "../../../../assets/i18n";
import { CSVDownload } from "react-csv";
import { useNavigate } from "react-router-dom";
import { ADMIN_RESTAURANT_DISHES_ROUTE } from "../../../../consts";

const RestaurantsTableComponent = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataDownload, setIsDataDownload] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const restaurants = useSelector<RootState, Restaurant[]>(
    (state) => state.getRestaurants.restaurants
  );
  const status = useSelector<RootState>((state) => state.getRestaurants.status);
  const deletionStatus = useSelector<RootState>(
    (state) => state.deleteRestaurant.status
  );
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const data = restaurants.map((restaurant) => ({
    Title: restaurant.title,
    "Cusine type": restaurant.cuisineType,
    Address: restaurant.address,
    "Working hours": `${restaurant.openHours} ${restaurant.closeHours}`,
    "Phone number": restaurant.phoneNumber,
  }));

  const handleDataDownload = () => {
    setIsDataDownload((value) => !value);
  };

  const handleRefresh = () => {
    try {
      dispatch(getRestaurants());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleDelete = (restaurantId: string | null) => {
    try {
      dispatch(deleteRestaurant(restaurantId));
    } catch (error) {
      console.error("Restaurant deletion error: ", error);
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      {restaurants && restaurants.length > 0 ? (
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
                    {translate("cuisineType", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("address", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("workingHours", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("phoneNumber", preferredLanguage)}
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
              {restaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell>
                    <div
                      onClick={() =>
                        navigate(
                          ADMIN_RESTAURANT_DISHES_ROUTE + "/" + restaurant.id
                        )
                      }
                      className="dark:text-neutral-400 cursor-pointer underline"
                    >
                      {restaurant.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">
                      {restaurant.cuisineType}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">
                      {restaurant.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">
                      {`${restaurant.openHours} - ${restaurant.closeHours}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">
                      {restaurant.phoneNumber}
                    </div>
                  </TableCell>
                  <TableCell sx={{ display: "flex", gap: 1 }}>
                    <div title="Edit" className="cursor-pointer">
                      <EditIcon color="primary" />
                    </div>
                    <div
                      title="Delete"
                      className="cursor-pointer"
                      onClick={() => handleDelete(restaurant.id)}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </div>
                    {deletionStatus === "loading" && (
                      <div>
                        <CircularProgress />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            <div className="flex mt-2">
              <div
                title="Add user"
                className="cursor-pointer"
                onClick={handleModal}
              >
                <AddIcon color="success" fontSize="large" />
              </div>
              <div
                title="Refresh"
                className="cursor-pointer dark:text-white"
                onClick={handleRefresh}
              >
                <RefreshIcon fontSize="large" />
              </div>
              <div
                title="Download"
                className="cursor-pointer dark:text-white"
                onClick={handleDataDownload}
              >
                <DownloadOutlinedIcon fontSize="large" />
                {isDataDownload && (
                  <CSVDownload data={data} filename="Restaurants"></CSVDownload>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {status === "loading" ? (
            <div>
              <SkeletonComponent />
            </div>
          ) : (
            <p>No restaurants found.</p>
          )}
        </div>
      )}
      {isModalOpen && (
        <AdminModalAddRestaurantComponent
          isOpen={isModalOpen}
          handleModal={handleModal}
        />
      )}
    </Container>
  );
};

export default RestaurantsTableComponent;

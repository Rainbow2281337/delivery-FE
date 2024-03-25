import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { Restaurant } from "../../../interfaces/restaurant-interface";
import SkeletonComponent from "../../ui/SkeletonComponent";

const RestaurantHeroComponent = () => {
  const restaurant = useSelector<RootState, Restaurant>(
    (state) => state.findRestaurantById
  );
  const status = useSelector<RootState>(
    (state) => state.findRestaurantById.status
  );
  return (
    <div className="pt-14">
      <Box
        sx={{
          flex: 1,
          height: "30vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          position: "relative",
        }}
      >
        <img
          src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="hero"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: "white",
            zIndex: 1,
          }}
        >
          {status === "loading" ? <SkeletonComponent /> : restaurant.title}
        </Typography>
      </Box>
    </div>
  );
};

export default RestaurantHeroComponent;

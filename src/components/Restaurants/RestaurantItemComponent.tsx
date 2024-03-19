import React from "react";
import { Restaurant } from "../../interfaces/restaurant-interface";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RESTAURANT_ROUTE } from "../../consts";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";

interface RestaurantItemComponentProps {
  data: Restaurant;
}

const RestaurantItemComponent: React.FC<RestaurantItemComponentProps> = ({
  data,
}) => {
  const navigate = useNavigate();
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  return (
    <Card
      sx={{
        maxWidth: 385,
        borderRadius: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardActionArea
        onClick={() => navigate(RESTAURANT_ROUTE + "/" + data.id)}
      >
        <CardMedia
          component="img"
          height="140"
          image="https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="food"
        />
        <div className="bg-white dark:bg-neutral-800">
          <CardContent>
            <div className="dark:text-white">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ textTransform: "uppercase" }}
              >
                {data.title}
              </Typography>
            </div>
            <Chip
              color="info"
              sx={{ position: "absolute", top: 5, right: 3, fontWeight: 700 }}
              label={`${translate("workingHours", preferredLanguage)}: ${
                data.openHours
              } - ${data.closeHours}`}
            />
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2 dark:text-white">
                <MenuBookOutlinedIcon />
                <span>{data.cuisineType}</span>
              </div>
              <div className="flex flex-row items-center gap-2 dark:text-white">
                <LocationOnOutlinedIcon />
                <span>{data.address}</span>
              </div>
              <div className="flex flex-row items-center gap-2 dark:text-white">
                <PhoneInTalkOutlinedIcon />
                <span>{data.phoneNumber}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default RestaurantItemComponent;

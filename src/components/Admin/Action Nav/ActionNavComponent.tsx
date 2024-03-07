import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { ADMIN_RESTAURANTS_ROUTE, ADMIN_ROUTE } from "../../../consts";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: <AccountCircleOutlinedIcon fontSize="large" />,
    name: "Users",
    route: ADMIN_ROUTE,
  },
  {
    icon: <RestaurantMenuOutlinedIcon fontSize="large" />,
    name: "Restaurants",
    route: ADMIN_RESTAURANTS_ROUTE,
  },
  {
    icon: <BookmarkBorderOutlinedIcon fontSize="large" />,
    name: "Orders",
    route: "*",
  },
];

const ActionNavComponent = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full">
      <div className="p-4">
        <ul className="flex items-center justify-center gap-3">
          {actions.map((action) => (
            <li
              key={action.name}
              title={action.name}
              onClick={() => navigate(action.route)}
              className="cursor-pointer"
            >
              {action.icon}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default ActionNavComponent;

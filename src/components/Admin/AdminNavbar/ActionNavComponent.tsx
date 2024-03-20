import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { ADMIN_RESTAURANTS_ROUTE, ADMIN_ROUTE } from "../../../consts";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-[#ffc244]">
      <div className="py-6 px-2">
        <ul className="flex items-center justify-center gap-3">
          {actions.map((action) => (
            <li
              key={action.name}
              title={action.name}
              onClick={() => navigate(action.route)}
              className={`cursor-pointer p-2 rounded-lg hover:opacity-70 duration-200 ${
                currentPath === action.route ? "bg-white/80" : "bg-white/30"
              }`}
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

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const actions = [
  { icon: <AccountCircleOutlinedIcon fontSize="large" />, name: "Users" },
  {
    icon: <RestaurantMenuOutlinedIcon fontSize="large" />,
    name: "Restaurants",
  },
  { icon: <BookmarkBorderOutlinedIcon fontSize="large" />, name: "Orders" },
];

const ActionNavComponent = () => {
  return (
    <nav className="w-full">
      <div className="p-4">
        <ul className="flex items-center justify-center gap-3">
          {actions.map((action) => (
            <li
              key={action.name}
              title={action.name}
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

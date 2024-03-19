import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ROUTE, PROFILE_ROUTE } from "../../consts";
import { logoutAction } from "../../state/profile/profile-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import ThemeSwitcher from "../ThemeSwitcher";

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const firstName = useSelector<RootState, string | null>(
    (state) => state.profileInfo.firstName
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleLogout = () => {
    try {
      dispatch(logoutAction());

      sessionStorage.removeItem("access_token");
      navigate(DEFAULT_ROUTE);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            dark:text-white
            dark:hover:bg-neutral-700
          "
        >
          Hello, {firstName === null ? "User" : `${firstName}`}
        </div>
        <div>
          <ThemeSwitcher />
        </div>
        <div className="dark:text-white">
          <LanguageOutlinedIcon />
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            dark:text-white
          "
        >
          <ListOutlinedIcon />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            dark:bg-black
            dark:text-white
          "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem
                icon={<InfoOutlinedIcon fontSize="small" />}
                onClick={() => navigate(PROFILE_ROUTE)}
                label="Profile"
              />
              <MenuItem
                icon={<ShoppingCartOutlinedIcon fontSize="small" />}
                onClick={() => navigate("*")}
                label="Cart"
              />
              <MenuItem
                icon={<ExitToAppOutlinedIcon fontSize="small" />}
                onClick={handleLogout}
                label="Logout"
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

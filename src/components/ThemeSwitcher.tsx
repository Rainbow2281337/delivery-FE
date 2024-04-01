import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { toggleTheme } from "../state/theme/theme-switcher-slice";

const ThemeSwitcher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector<RootState, boolean>(
    (state) => state.theme.darkMode
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };
  return (
    <div
      onClick={toggleDarkMode}
      title="Theme selector"
      className="
            hidden
            md:flex
            items-center
            gap-2
            border
            py-1
            px-3
            rounded-full
			      cursor-pointer
            dark:border-neutral-800
          "
    >
      <div className={darkMode ? "text-neutral-500" : "text-yellow-500"}>
        <WbSunnyOutlinedIcon />
      </div>
      <div className={darkMode ? "text-neutral-100" : "text-neutral-500"}>
        <DarkModeOutlinedIcon />
      </div>
    </div>
  );
};

export default ThemeSwitcher;

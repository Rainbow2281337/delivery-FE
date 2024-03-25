import CategoryBox from "../CategoryBox";
import Container from "../Container";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import BakeryDiningOutlinedIcon from "@mui/icons-material/BakeryDiningOutlined";
import RamenDiningOutlinedIcon from "@mui/icons-material/RamenDiningOutlined";
import KebabDiningOutlinedIcon from "@mui/icons-material/KebabDiningOutlined";
import TakeoutDiningOutlinedIcon from "@mui/icons-material/TakeoutDiningOutlined";
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined";
import RiceBowlOutlinedIcon from "@mui/icons-material/RiceBowlOutlined";
import EggAltOutlinedIcon from "@mui/icons-material/EggAltOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";

interface CategoriesProps {
  selectedType: string | null;
  handleTypeSelect: (type: string | null) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  selectedType,
  handleTypeSelect,
}) => {
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const categories = [
    {
      cuisine: translate("chinese", preferredLanguage),
      value: "Chinese",
      icon: <RiceBowlOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("mexican", preferredLanguage),
      value: "Mexican",
      icon: <EggAltOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("korean", preferredLanguage),
      value: "Korean",
      icon: <RamenDiningOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("vietnamese", preferredLanguage),
      value: "Vietnamese",
      icon: <EggAltOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("italian", preferredLanguage),
      value: "Italian",
      icon: <LocalPizzaOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("thai", preferredLanguage),
      value: "Thai",
      icon: <RamenDiningOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("french", preferredLanguage),
      value: "French",
      icon: <BakeryDiningOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("american", preferredLanguage),
      value: "American",
      icon: <FastfoodOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("spanish", preferredLanguage),
      value: "Spanish",
      icon: <KebabDiningOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("indian", preferredLanguage),
      value: "Indian",
      icon: <RamenDiningOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("japanese", preferredLanguage),
      value: "Japanese",
      icon: <TakeoutDiningOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("greek", preferredLanguage),
      value: "Greek",
      icon: <RiceBowlOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("turkish", preferredLanguage),
      value: "Turkish",
      icon: <KebabDiningOutlinedIcon fontSize="large" />,
    },
    {
      cuisine: translate("ukrainian", preferredLanguage),
      value: "Ukrainian",
      icon: <SoupKitchenOutlinedIcon fontSize="large" />,
    },
  ];
  return (
    <Container>
      <div
        className="
          pt-4
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <div key={item.cuisine} onClick={() => handleTypeSelect(item.value)}>
            <CategoryBox
              category={item.cuisine}
              icon={item.icon}
              selected={selectedType === item.value}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Categories;

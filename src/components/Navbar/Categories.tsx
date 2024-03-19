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
      icon: <RiceBowlOutlinedIcon fontSize="large" />,
      description: "This property is close to the beach!",
    },
    {
      cuisine: translate("mexican", preferredLanguage),
      icon: <EggAltOutlinedIcon fontSize="large" />,
      description: "This property is has windmills!",
    },
    {
      cuisine: translate("korean", preferredLanguage),
      icon: <RamenDiningOutlinedIcon fontSize="large" />,
      description: "This property is modern!",
    },
    {
      cuisine: translate("vietnamese", preferredLanguage),
      icon: <EggAltOutlinedIcon fontSize="large" />,
      description: "This property is in the countryside!",
    },
    {
      cuisine: translate("italian", preferredLanguage),
      icon: <LocalPizzaOutlinedIcon fontSize="large" />,
      description: "This is property has a beautiful pool!",
    },
    {
      cuisine: translate("thai", preferredLanguage),
      icon: <RamenDiningOutlinedIcon fontSize="large" />,
      description: "This property is on an island!",
    },
    {
      cuisine: translate("french", preferredLanguage),
      icon: <BakeryDiningOutlinedIcon fontSize="large" />,
      description: "This property is near a lake!",
    },
    {
      cuisine: translate("american", preferredLanguage),
      icon: <FastfoodOutlinedIcon fontSize="large" />,
      description: "This property has skiing activies!",
    },
    {
      cuisine: translate("spanish", preferredLanguage),
      icon: <KebabDiningOutlinedIcon fontSize="large" />,
      description: "This property is an ancient castle!",
    },
    {
      cuisine: translate("indian", preferredLanguage),
      icon: <RamenDiningOutlinedIcon fontSize="large" />,
      description: "This property is in a spooky cave!",
    },
    {
      cuisine: translate("japanese", preferredLanguage),
      icon: <TakeoutDiningOutlinedIcon fontSize="large" />,
      description: "This property offers camping activities!",
    },
    {
      cuisine: translate("greek", preferredLanguage),
      icon: <RiceBowlOutlinedIcon fontSize="large" />,
      description: "This property is in arctic environment!",
    },
    {
      cuisine: translate("turkish", preferredLanguage),
      icon: <KebabDiningOutlinedIcon fontSize="large" />,
      description: "This property is in the desert!",
    },
    {
      cuisine: translate("ukrainian", preferredLanguage),
      icon: <SoupKitchenOutlinedIcon fontSize="large" />,
      description: "This property is in a barn!",
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
          <div
            key={item.cuisine}
            onClick={() => handleTypeSelect(item.cuisine)}
          >
            <CategoryBox
              cuisine={item.cuisine}
              icon={item.icon}
              selected={selectedType === item.cuisine}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Categories;

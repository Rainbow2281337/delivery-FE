import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";
import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import SetMealOutlinedIcon from "@mui/icons-material/SetMealOutlined";
import TakeoutDiningOutlinedIcon from "@mui/icons-material/TakeoutDiningOutlined";
import Container from "../Container";
import CategoryBox from "../CategoryBox";

interface CategoriesProps {
  selectedType: string | null;
  handleTypeSelect: (type: string | null) => void;
}

const DishFilter: React.FC<CategoriesProps> = ({
  selectedType,
  handleTypeSelect,
}) => {
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const categories = [
    {
      category: translate("pizza", preferredLanguage),
      icon: <LocalPizzaOutlinedIcon fontSize="large" />,
    },
    {
      category: translate("burger", preferredLanguage),
      icon: <LunchDiningOutlinedIcon fontSize="large" />,
    },
    {
      category: translate("sushi", preferredLanguage),
      icon: <SetMealOutlinedIcon fontSize="large" />,
    },
    {
      category: translate("salad", preferredLanguage),
      icon: <TakeoutDiningOutlinedIcon fontSize="large" />,
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
            key={item.category}
            onClick={() => handleTypeSelect(item.category)}
          >
            <CategoryBox
              category={item.category}
              icon={item.icon}
              selected={selectedType === item.category}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default DishFilter;

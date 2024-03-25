import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";
import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import SetMealOutlinedIcon from "@mui/icons-material/SetMealOutlined";
import TakeoutDiningOutlinedIcon from "@mui/icons-material/TakeoutDiningOutlined";
import KebabDiningOutlinedIcon from "@mui/icons-material/KebabDiningOutlined";
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
      value: "Pizza",
      icon: <LocalPizzaOutlinedIcon fontSize="large" />,
    },
    {
      category: translate("burger", preferredLanguage),
      value: "Burger",
      icon: <LunchDiningOutlinedIcon fontSize="large" />,
    },
    {
      category: translate("sushi", preferredLanguage),
      value: "Sushi",
      icon: <SetMealOutlinedIcon fontSize="large" />,
    },
    {
      category: translate("salad", preferredLanguage),
      value: "Salad",
      icon: <TakeoutDiningOutlinedIcon fontSize="large" />,
    },
    {
      category: translate("meat", preferredLanguage),
      value: "Meat",
      icon: <KebabDiningOutlinedIcon fontSize="large" />,
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
          <div key={item.category} onClick={() => handleTypeSelect(item.value)}>
            <CategoryBox
              category={item.category}
              icon={item.icon}
              selected={selectedType === item.value}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default DishFilter;

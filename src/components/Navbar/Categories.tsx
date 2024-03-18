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

// eslint-disable-next-line react-refresh/only-export-components
export const categories = [
  {
    cuisine: "Chinese",
    icon: <RiceBowlOutlinedIcon fontSize="large" />,
    description: "This property is close to the beach!",
  },
  {
    cuisine: "Mexican",
    icon: <EggAltOutlinedIcon fontSize="large" />,
    description: "This property is has windmills!",
  },
  {
    cuisine: "Korean",
    icon: <RamenDiningOutlinedIcon fontSize="large" />,
    description: "This property is modern!",
  },
  {
    cuisine: "Vietnamese",
    icon: <EggAltOutlinedIcon fontSize="large" />,
    description: "This property is in the countryside!",
  },
  {
    cuisine: "Italian",
    icon: <LocalPizzaOutlinedIcon fontSize="large" />,
    description: "This is property has a beautiful pool!",
  },
  {
    cuisine: "Thai",
    icon: <RamenDiningOutlinedIcon fontSize="large" />,
    description: "This property is on an island!",
  },
  {
    cuisine: "French",
    icon: <BakeryDiningOutlinedIcon fontSize="large" />,
    description: "This property is near a lake!",
  },
  {
    cuisine: "American",
    icon: <FastfoodOutlinedIcon fontSize="large" />,
    description: "This property has skiing activies!",
  },
  {
    cuisine: "Spanish",
    icon: <KebabDiningOutlinedIcon fontSize="large" />,
    description: "This property is an ancient castle!",
  },
  {
    cuisine: "Indian",
    icon: <RamenDiningOutlinedIcon fontSize="large" />,
    description: "This property is in a spooky cave!",
  },
  {
    cuisine: "Japanese",
    icon: <TakeoutDiningOutlinedIcon fontSize="large" />,
    description: "This property offers camping activities!",
  },
  {
    cuisine: "Greek",
    icon: <RiceBowlOutlinedIcon fontSize="large" />,
    description: "This property is in arctic environment!",
  },
  {
    cuisine: "Turkish",
    icon: <KebabDiningOutlinedIcon fontSize="large" />,
    description: "This property is in the desert!",
  },
  {
    cuisine: "Ukrainian",
    icon: <SoupKitchenOutlinedIcon fontSize="large" />,
    description: "This property is in a barn!",
  },
];

interface CategoriesProps {
  selectedType: string | null;
  handleTypeSelect: (type: string | null) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  selectedType,
  handleTypeSelect,
}) => {
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

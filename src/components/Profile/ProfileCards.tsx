import Container from "../Container";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import ProfileCard from "./ProfileCard";
import Heading from "../Heading";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import {
  ADMIN_ROUTE,
  PROFILE_DEACTIVATE_ACCOUNT_ROUTE,
  PROFILE_PERSONAL_INFO_ROUTE,
  PROFILE_PREFERENCES_ROUTE,
} from "../../consts";

const profileActions = [
  {
    icon: <FeedOutlinedIcon fontSize="large" />,
    title: "Personal info",
    description: "Provide personal details",
    navigation: PROFILE_PERSONAL_INFO_ROUTE,
  },
  {
    icon: <DisplaySettingsOutlinedIcon fontSize="large" />,
    title: "Preferences",
    description: "Set your default language and theme",
    navigation: PROFILE_PREFERENCES_ROUTE,
  },
  {
    icon: <GppBadOutlinedIcon fontSize="large" />,
    title: "Deactivate account",
    description: "Need to deactivate your account? Take care of that now",
    navigation: PROFILE_DEACTIVATE_ACCOUNT_ROUTE,
  },
  {
    icon: <AdminPanelSettingsOutlinedIcon fontSize="large" />,
    title: "Admin panel",
    description: "Admin panel for authorized users only",
    navigation: ADMIN_ROUTE,
  },
];

const ProfileCards = () => {
  const firstName = useSelector<RootState>(
    (state) => state.profileInfo.firstName
  );
  const lastName = useSelector<RootState>(
    (state) => state.profileInfo.lastName
  );
  const role = useSelector<RootState>((state) => state.profileInfo.role);
  return (
    <Container>
      <div className="pt-28">
        <Heading
          title="Account"
          subtitle={`${firstName} ${lastName}`}
        ></Heading>
      </div>
      <div
        className="
          pt-8
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
          md:grid-cols-3
          md:gap-4
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {profileActions
          .filter(
            (action) => action.title !== "Admin panel" || role === "ADMIN"
          )
          .map((action) => (
            <ProfileCard
              key={action.title}
              icon={action.icon}
              title={action.title}
              description={action.description}
              redirectTo={action.navigation}
            />
          ))}
      </div>
    </Container>
  );
};

export default ProfileCards;

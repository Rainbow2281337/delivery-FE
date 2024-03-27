import Container from "../Container";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ProfileCard from "./ProfileCard";
import Heading from "../Heading";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import {
  ADMIN_ROUTE,
  PROFILE_DEACTIVATE_ACCOUNT_ROUTE,
  PROFILE_ORDERS_ROUTE,
  PROFILE_PERSONAL_INFO_ROUTE,
  PROFILE_PREFERENCES_ROUTE,
} from "../../consts";
import { translate } from "../../assets/i18n";

const ProfileCards = () => {
  const firstName = useSelector<RootState>(
    (state) => state.profileInfo.firstName
  );
  const lastName = useSelector<RootState>(
    (state) => state.profileInfo.lastName
  );
  const role = useSelector<RootState>((state) => state.profileInfo.role);
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const profileActions = [
    {
      icon: <FeedOutlinedIcon fontSize="large" />,
      title: translate("personalInfo", preferredLanguage),
      description: translate("see_personal_details", preferredLanguage),
      navigation: PROFILE_PERSONAL_INFO_ROUTE,
    },
    {
      icon: <DisplaySettingsOutlinedIcon fontSize="large" />,
      title: translate("preferences", preferredLanguage),
      description: translate(
        "set_your_default_language_and_theme",
        preferredLanguage
      ),
      navigation: PROFILE_PREFERENCES_ROUTE,
    },
    {
      icon: <GppBadOutlinedIcon fontSize="large" />,
      title: translate("deactivateAccount", preferredLanguage),
      description: translate(
        "need_to_deactivate_your_account_?_take_care_of_that_now",
        preferredLanguage
      ),
      navigation: PROFILE_DEACTIVATE_ACCOUNT_ROUTE,
    },
    {
      icon: <AdminPanelSettingsOutlinedIcon fontSize="large" />,
      title: translate("adminPanel", preferredLanguage),
      description: translate(
        "admin_panel_for_authorized_users_only",
        preferredLanguage
      ),
      navigation: ADMIN_ROUTE,
    },
    {
      icon: <BookmarkBorderOutlinedIcon fontSize="large" />,
      title: translate("my_orders", preferredLanguage),
      description: translate("see_my_orders", preferredLanguage),
      navigation: PROFILE_ORDERS_ROUTE,
    },
  ];
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
            (action) =>
              (action.title !== "Admin panel" &&
                action.title !== "Панель адміністратора") ||
              role === "ADMIN"
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

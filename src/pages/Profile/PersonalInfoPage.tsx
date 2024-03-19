import { useSelector } from "react-redux";
import TopBar from "../../components/Navbar/TopBar";
import ListOfFields from "../../components/Profile/ListOfFields";
import ListOfLinks from "../../components/Profile/ListOfLinks";
import { RootState } from "../../state/store";
import { User } from "../../interfaces/user-interface";
import { translate } from "../../assets/i18n";

const PersonalInfoPage = () => {
  const userInfo = useSelector<RootState, User>((state) => state.profileInfo);
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const personalInfoFields = [
    {
      title: translate("fullName", preferredLanguage),
      value: `${userInfo.firstName} ${userInfo.lastName}`,
    },
    {
      title: translate("emailAddress", preferredLanguage),
      value: `${userInfo.email}`,
    },
    {
      title: translate("phoneNumber", preferredLanguage),
      value: `+38${userInfo.phoneNumber}`,
    },
    {
      title: translate("address", preferredLanguage),
      value: `${userInfo.address}`,
    },
  ];

  return (
    <>
      <TopBar />
      <ListOfLinks pageTitle={translate("personalInfo", preferredLanguage)} />
      {personalInfoFields.map((field) => (
        <ListOfFields
          key={field.title}
          title={field.title}
          value={field.value}
        />
      ))}
    </>
  );
};

export default PersonalInfoPage;

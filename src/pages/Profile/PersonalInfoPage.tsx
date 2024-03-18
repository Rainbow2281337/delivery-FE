import { useSelector } from "react-redux";
import TopBar from "../../components/Navbar/TopBar";
import ListOfFields from "../../components/Profile/ListOfFields";
import ListOfLinks from "../../components/Profile/ListOfLinks";
import { RootState } from "../../state/store";
import { User } from "../../interfaces/user-interface";

const PersonalInfoPage = () => {
  const userInfo = useSelector<RootState, User>((state) => state.profileInfo);
  const personalInfoFields = [
    {
      title: "Full name",
      value: `${userInfo.firstName} ${userInfo.lastName}`,
    },
    {
      title: "Email address",
      value: `${userInfo.email}`,
    },
    {
      title: "Phone number",
      value: `+38${userInfo.phoneNumber}`,
    },
    {
      title: "Address",
      value: `${userInfo.address}`,
    },
  ];

  return (
    <>
      <TopBar />
      <ListOfLinks pageTitle="Personal info" />
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

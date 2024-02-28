import NavbarComponent from "../../components/Navbar/Navbar-component";
import ProfileComponent from "../../components/Profile/ProfileComponent";

const ProfilePage = () => {
  return (
    <>
      <ProfileComponent />
      <NavbarComponent clickedPageValue="profile" />
    </>
  );
};

export default ProfilePage;

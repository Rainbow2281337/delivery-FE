import NavbarComponent from "../../components/Navbar/Navbar-component";
import TopBar from "../../components/Navbar/TopBar";

const MainPage = () => {
  return (
    <>
      <TopBar />
      <NavbarComponent clickedPageValue="main" />
    </>
  );
};

export default MainPage;

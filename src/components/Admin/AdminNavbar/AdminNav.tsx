import Container from "../../Container";
import Logo from "../../Navbar/Logo";
import UserMenu from "../../Navbar/UserMenu";
import Navigation from "./Navigation";

const AdminNav = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm dark:bg-neutral-900">
      <div
        className="
          py-4
          border-b-[1px]
          dark:border-b-neutral-700
        "
      >
        <Container>
          <div
            className="
              flex
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
            "
          >
            <Logo />
            <Navigation />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminNav;

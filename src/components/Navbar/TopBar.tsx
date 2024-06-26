import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const TopBar = () => {
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
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TopBar;

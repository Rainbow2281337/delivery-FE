import { Breadcrumbs } from "@mui/material";
import Container from "../Container";
import { PROFILE_ROUTE } from "../../consts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";

interface ListOfLinksProps {
  pageTitle: string;
}

const ListOfLinks: React.FC<ListOfLinksProps> = ({ pageTitle }) => {
  const navigate = useNavigate();
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  return (
    <Container>
      <div role="presentation" className="pt-44">
        <Breadcrumbs aria-label="breadcrumb">
          <div
            onClick={() => navigate(PROFILE_ROUTE)}
            className="hover:underline cursor-pointer dark:text-neutral-400"
          >
            {translate("account", preferredLanguage)}
          </div>
          <div className="dark:text-white">{pageTitle}</div>
        </Breadcrumbs>
        <div className="mt-2 mb-16 text-xl md:text-3xl font-bold dark:text-white">
          {pageTitle}
        </div>
      </div>
    </Container>
  );
};

export default ListOfLinks;

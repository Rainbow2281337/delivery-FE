import { Breadcrumbs, Typography } from "@mui/material";
import Container from "../Container";
import { PROFILE_ROUTE } from "../../consts";
import { useNavigate } from "react-router-dom";

interface ListOfLinksProps {
  pageTitle: string;
}

const ListOfLinks: React.FC<ListOfLinksProps> = ({ pageTitle }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div role="presentation" className="pt-44">
        <Breadcrumbs aria-label="breadcrumb">
          <div
            onClick={() => navigate(PROFILE_ROUTE)}
            className="hover:underline cursor-pointer"
          >
            Account
          </div>
          <Typography color="text.primary">{pageTitle}</Typography>
        </Breadcrumbs>
        <div className="mt-2 mb-16 text-xl md:text-3xl font-bold">
          {pageTitle}
        </div>
      </div>
    </Container>
  );
};

export default ListOfLinks;

import { Box, Grid, Modal } from "@mui/material";
import LangBox from "./LangBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setLanguage } from "../../state/language/select-language-slice";
import { translate } from "../../assets/i18n";

interface LanguageSelectModalProps {
  handleModal: () => void;
  isOpen: boolean;
}

const languages = [
  {
    language: "English",
    region: "United States",
    value: "en",
  },
  {
    language: "Ukrainian",
    region: "Україна",
    value: "ua",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "background.paper",
  border: "1px solid white",
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const LanguageSelectModal: React.FC<LanguageSelectModalProps> = ({
  handleModal,
  isOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  return (
    <div>
      <Modal open={isOpen} onClose={handleModal}>
        <Box sx={style}>
          <div className="mb-6 text-xl md:text-2xl font-semibold">
            {translate("choose_a_language_and_region", preferredLanguage)}
          </div>
          <Grid container spacing={2}>
            {languages.map((language) => (
              <Grid item xs={12} md={6} key={language.region}>
                <LangBox
                  language={language.language}
                  region={language.region}
                  onSelect={(selectedLanguage) => {
                    dispatch(setLanguage(selectedLanguage));
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default LanguageSelectModal;

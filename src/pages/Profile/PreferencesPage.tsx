import { useDispatch, useSelector } from "react-redux";
import TopBar from "../../components/Navbar/TopBar";
import ListOfFields from "../../components/Profile/ListOfFields";
import ListOfLinks from "../../components/Profile/ListOfLinks";
import { AppDispatch, RootState } from "../../state/store";
import { translate } from "../../assets/i18n";
import { toggleTheme } from "../../state/theme/theme-switcher-slice";
import { useState } from "react";
import LanguageSelectModal from "../../components/Navbar/LanguageSelectModal";

const PreferencesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector<RootState, boolean>(
    (state) => state.theme.darkMode
  );
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  const [isLanguageSelectModalOpen, setIsLanguageSelectModalOpen] =
    useState(false);

  const onDarkModeChange = () => {
    dispatch(toggleTheme());
  };

  const onLanguageChange = () => {
    setIsLanguageSelectModalOpen((value) => !value);
  };

  const personalInfoFields = [
    {
      title: translate("preferredLanguage", preferredLanguage),
      value:
        preferredLanguage === "English"
          ? translate("english", preferredLanguage)
          : translate("ukrainian", "Ukrainian"),
      isEditable: true,
      onEditClick: onLanguageChange,
    },
    {
      title: translate("preferredTheme", preferredLanguage),
      value:
        isDarkMode === true
          ? translate("dark", preferredLanguage)
          : translate("light", preferredLanguage),
      isEditable: true,
      onEditClick: onDarkModeChange,
    },
  ];

  return (
    <>
      <TopBar />
      <ListOfLinks pageTitle={translate("preferences", preferredLanguage)} />
      {personalInfoFields.map((field) => (
        <ListOfFields
          key={field.title}
          title={field.title}
          value={field.value}
          isEditable={field.isEditable}
          onEditClick={field.onEditClick}
        />
      ))}
      {isLanguageSelectModalOpen && (
        <LanguageSelectModal
          isOpen={isLanguageSelectModalOpen}
          handleModal={onLanguageChange}
        />
      )}
    </>
  );
};

export default PreferencesPage;

import { useSelector } from "react-redux";
import TopBar from "../../components/Navbar/TopBar";
import ListOfFields from "../../components/Profile/ListOfFields";
import ListOfLinks from "../../components/Profile/ListOfLinks";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";

const PreferencesPage = () => {
  const isDarkMode = useSelector<RootState, boolean>(
    (state) => state.theme.darkMode
  );
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const personalInfoFields = [
    {
      title: translate("preferredLanguage", preferredLanguage),
      value: translate("english", preferredLanguage),
      isEditable: true,
    },
    {
      title: translate("preferredTheme", preferredLanguage),
      value:
        isDarkMode === true
          ? translate("dark", preferredLanguage)
          : translate("light", preferredLanguage),
      isEditable: true,
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
        />
      ))}
    </>
  );
};

export default PreferencesPage;

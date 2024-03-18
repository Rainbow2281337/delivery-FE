import TopBar from "../../components/Navbar/TopBar";
import ListOfFields from "../../components/Profile/ListOfFields";
import ListOfLinks from "../../components/Profile/ListOfLinks";

const personalInfoFields = [
  {
    title: "Preferred language",
    value: "English",
  },
  {
    title: "Preferred theme",
    value: "Light",
  },
];

const PreferencesPage = () => {
  return (
    <>
      <TopBar />
      <ListOfLinks pageTitle="Preferences" />
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

export default PreferencesPage;

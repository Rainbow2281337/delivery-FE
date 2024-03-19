import { useSelector } from "react-redux";
import { Language } from "../../state/language/enum/languageEnum";
import { RootState } from "../../state/store";

interface LangBoxProps {
  language: string;
  region: string;
  onSelect: (language: Language) => void;
}

const LangBox: React.FC<LangBoxProps> = ({ language, region, onSelect }) => {
  const selectedLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  return (
    <div>
      <div
        onClick={() => onSelect(language as Language)}
        className={`
          flex
          flex-col
          items-start
          justify-start
          cursor-pointer
          border
          ${selectedLanguage === language && "border-black"}
          rounded-lg
          py-1
          px-3
          shadom-sm
          hover:shadow-md
          transition
        `}
      >
        <div className="text-lg">{language}</div>
        <div className="text-neutral-500">{region}</div>
      </div>
    </div>
  );
};

export default LangBox;

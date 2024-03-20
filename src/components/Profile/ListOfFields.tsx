import { useSelector } from "react-redux";
import { translate } from "../../assets/i18n";
import Container from "../Container";
import { RootState } from "../../state/store";

interface ListOfFieldsProps {
  title: string;
  value: string | null;
  isEditable?: boolean;
  onEditClick?: () => void;
}

const ListOfFields: React.FC<ListOfFieldsProps> = ({
  title,
  value,
  isEditable,
  onEditClick,
}) => {
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  return (
    <Container>
      <div className="mb-2 border-b">
        <div
          className="
            flex
            flex-col
            items-start
            justify-start
            my-2
          "
        >
          <div
            className="
              w-full
              flex
              items-center
              justify-between
            "
          >
            <div
              className="
                text-lg
                md:text-xl
                font-semibold
                mb-1
                dark:text-white
              "
            >
              {title}
            </div>
            {isEditable && (
              <div>
                <button
                  onClick={onEditClick}
                  className="underline dark:text-white"
                >
                  {translate("edit", preferredLanguage)}
                </button>
              </div>
            )}
          </div>
          <div className="text-neutral-500 md:text-lg dark:text-neutral-400">
            {value}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListOfFields;

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ROUTE, PROFILE_ROUTE } from "../../consts";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { deleteAccount } from "../../state/profile/profile-slice";
import { translate } from "../../assets/i18n";

const DeactivateAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector<RootState>((state) => state.profileInfo.email);
  const id = useSelector<RootState, string | null>(
    (state) => state.profileInfo.id
  );
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const handleAccountDelete = (userId: string | null) => {
    try {
      dispatch(deleteAccount(userId));
      navigate(DEFAULT_ROUTE);
    } catch (error) {
      console.error("Account deletion error: ", error);
    }
  };
  return (
    <div
      className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
      "
    >
      <div className="flex flex-col">
        <div
          className="
				text-xl
				md:text-2xl
				lg:text-3xl
				xl:text-4xl
				text-center
				font-bold
        dark:text-white
			"
        >
          {translate("deactivateAccount", preferredLanguage)}?
        </div>
        <div
          className="
				mt-2
				mb-4
				text-lg
				text-center
				text-neutral-500
				font-semibold
        dark:text-neutral-400
			"
        >{`${email}`}</div>
        <ul
          className="
				flex
				flex-col
				gap-4
				items-start
				justify-start
			"
        >
          <li
            className="
				flex
				items-center
				gap-2
				text-neutral-600
				border-b
				pb-2
				w-full
        dark:text-neutral-400
			"
          >
            <InfoOutlinedIcon fontSize="large" />
            {translate("this_account_will_disappear", preferredLanguage)}
          </li>
          <li
            className="
				flex
				items-center
				gap-2
				text-neutral-600
				border-b
				pb-2
				w-full
        dark:text-neutral-400
			"
          >
            <InfoOutlinedIcon fontSize="large" />
            {translate(
              "you_won’t_be_able_to_access_the_account",
              preferredLanguage
            )}
          </li>
          <li
            className="
				flex
				items-center
				gap-2
				text-neutral-600
				border-b
				pb-2
				w-full
        dark:text-neutral-400
			"
          >
            <InfoOutlinedIcon fontSize="large" />
            {translate("this_action_cannot_be_canceled", preferredLanguage)}
          </li>
        </ul>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => navigate(PROFILE_ROUTE)}
            className="
				py-1
				px-4
				text-lg
				text-white
				md:text-xl
				bg-green-500
				hover:bg-green-500/85
				transition
				rounded-lg
			"
          >
            {translate("cancel", preferredLanguage)}
          </button>
          <button
            onClick={() => handleAccountDelete(id)}
            className="
				py-1
				px-4
				text-lg
				text-white
				md:text-xl
				bg-red-500
				hover:bg-red-500/85
				transition
				rounded-lg
			"
          >
            {translate("deleteAccount", preferredLanguage)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateAccount;

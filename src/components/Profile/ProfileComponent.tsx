import { useDispatch, useSelector } from "react-redux";
import ProfileFields from "./ProfileFields";
import { AppDispatch, RootState } from "../../state/store";
import {
  getProfileInfo,
  logoutAction,
} from "../../state/profile/profile-slice";
import { useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ROUTE } from "../../consts";

const ProfileComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector<RootState>((state) => state.profileInfo.status);
  const email: string | null = useSelector<RootState, string | null>(
    (state) => state.profileInfo.email
  );
  const firstName: string | null = useSelector<RootState, string | null>(
    (state) => state.profileInfo.firstName
  );
  const lastName: string | null = useSelector<RootState, string | null>(
    (state) => state.profileInfo.lastName
  );
  const address: string | null = useSelector<RootState, string | null>(
    (state) => state.profileInfo.address
  );
  const phoneNuber: string | null = useSelector<RootState, string | null>(
    (state) => state.profileInfo.phoneNumber
  );

  useEffect(() => {
    try {
      dispatch(getProfileInfo());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [dispatch]);

  const handleLogoutClick = () => {
    dispatch(logoutAction());
    sessionStorage.removeItem("access_token");

    navigate(DEFAULT_ROUTE);
  };
  return (
    <div className="w-full md:w-9/12 mx-auto mt-8 border-2 border-black rounded-xl">
      <div className="p-6 shadow-sm rounded-sm">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 text-lg">
          <span className="tracking-wide text-2xl">About</span>
        </div>
        <div className="mt-4 text-gray-700">
          {status === "loading" ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <ProfileFields label="First name" value={firstName || ""} />
                <ProfileFields label="Last name" value={lastName || ""} />
                <ProfileFields label="Number" value={phoneNuber || ""} />
                <ProfileFields label="Address" value={address || ""} />
                <ProfileFields
                  label="Email"
                  value={email || ""}
                  isEmail={true}
                />
              </div>
              <div className="mt-4 text-right">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleLogoutClick}
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;

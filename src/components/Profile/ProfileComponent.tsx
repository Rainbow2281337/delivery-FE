import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { getProfileInfo } from "../../state/profile/profile-slice";
import { useEffect } from "react";
import Container from "../Container";
import ProfileCards from "./ProfileCards";
import SkeletonComponent from "../ui/SkeletonComponent";

const ProfileComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector<RootState>((state) => state.profileInfo.status);

  useEffect(() => {
    try {
      dispatch(getProfileInfo());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [dispatch]);

  return (
    <Container>
      <div className="pt-32">
        {status === "loading" ? <SkeletonComponent /> : <ProfileCards />}
      </div>
    </Container>
  );
};

export default ProfileComponent;

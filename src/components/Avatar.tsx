import userImage from "../assets/placeholder.jpg";

const Avatar = () => {
  return (
    <>
      <img
        src={userImage}
        alt="User"
        height={30}
        width={30}
        className="rounded-full"
      />
    </>
  );
};

export default Avatar;

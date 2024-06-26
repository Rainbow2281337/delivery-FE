import React from "react";
import { useNavigate } from "react-router-dom";

interface ProfileCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  redirectTo: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  icon,
  title,
  description,
  redirectTo,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(redirectTo)}
      className="
			flex
			flex-col
			items-start
			justify-start
			p-3
			bg-neutral-100
			hover:bg-neutral-50
			rounded-lg
			shadow-md
			cursor-pointer
			transition
      dark:bg-neutral-800
      dark:hover:bg-neutral-700
		"
    >
      <div className="mb-8 dark:text-white">{icon}</div>
      <div className="mb-1 text-lg font-semibold dark:text-white">{title}</div>
      <div className="text-neutral-500 dark:text-neutral-400">
        {description}
      </div>
    </div>
  );
};

export default ProfileCard;

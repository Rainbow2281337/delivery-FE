interface ProfileFieldsProps {
  label: string;
  value: string;
  isEmail?: boolean;
}
const ProfileFields: React.FC<ProfileFieldsProps> = ({
  label,
  value,
  isEmail,
}) => {
  return (
    <div className="grid grid-cols-2">
      <div className="px-4 py-2 font-semibold text-lg">{label}</div>
      <div className="px-4 py-2">
        {isEmail ? (
          <a
            className="text-blue-800 text-md md:text-lg font-medium"
            href={`mailto:${value}`}
          >
            {value}
          </a>
        ) : (
          <span className="text-md md:text-lg font-medium">{value}</span>
        )}
      </div>
    </div>
  );
};

export default ProfileFields;

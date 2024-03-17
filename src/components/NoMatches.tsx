import Heading from "./Heading";

interface NoMatchesProps {
  title?: string;
  subtitle?: string;
}

const NoMatches: React.FC<NoMatchesProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
}) => {
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
      <Heading center title={title} subtitle={subtitle} />
    </div>
  );
};

export default NoMatches;

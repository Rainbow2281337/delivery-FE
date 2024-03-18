import Container from "../Container";

interface ListOfFieldsProps {
  title: string;
  value: string | null;
}

const ListOfFields: React.FC<ListOfFieldsProps> = ({ title, value }) => {
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
              "
            >
              {title}
            </div>
            <div>
              <button className="underline">Edit</button>
            </div>
          </div>
          <div className="text-neutral-500 md:text-lg">{value}</div>
        </div>
      </div>
    </Container>
  );
};

export default ListOfFields;

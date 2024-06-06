import { Column } from "../Typs/typs";
import Trash from "../icons/Trash";

interface Props {
  column: Column;
}

const ColumnContainer = (props: Props) => {
  const { column } = props;
  return (
    <div
      className="
    bg-maincolor
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md 
    flex flex-col
    "
    >
      <div
        className="
      bg-maincolor
      text-md 
      h-[60px]
       cursor-grab
       rounded-md
       rounded-b-none
       p-3 
       font-bold 
       border-secondary
       border-4
       flex
       items-center
       justify-between
      "
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-secondary px-2 py-1 text-sm rounded-full">
            0
          </div>
          {column.title}
        </div>
        <button className="stroke-gray-500 hover:stroke-white rounded px-1 py-2">
          <Trash />
        </button>
      </div>
      {/* column task container*/}
      <div className=" flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
};

export default ColumnContainer;

import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column } from "../Typs/typs";
import ColumnContainer from "./ColumnContainer";

const KabanBoard = () => {
  const [colums, setColums] = useState<Column[]>([]);
  console.log(colums);

  function createColum() {
    const columnToAdd: Column = {
      id: Math.floor(Math.random() * 1000),
      title: ` Column ${colums.length + 1}`,
    };
    setColums([...colums, columnToAdd]);
  }
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className=" m-auto flex gap-4">
        <div className="flex gap-2 ">
          {colums.map((column) => (
            <ColumnContainer key={column.id} column={column} />
          ))}
        </div>
        <button
          onClick={() => {
            createColum();
          }}
          className="
       h-[60px] w-[350px] min-w-[350px] cursor-pointer  rounded-lg bg-maincolor border-2 border-secondary
       p-4 ring-rose-500 hover:ring-2 flex gap-2  active:border-0
       "
        >
          <PlusIcon /> Click me
        </button>
      </div>
    </div>
  );
};
export default KabanBoard;

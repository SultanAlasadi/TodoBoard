import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Id } from "../Typs/typs";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
const KabanBoard = () => {
  const [colums, setColums] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );
  const columnId = useMemo(() => colums.map((column) => column.id), [colums]);

  function createColum() {
    const columnToAdd: Column = {
      id: Math.floor(Math.random() * 1000),
      title: ` Column ${colums.length + 1}`,
    };
    setColums([...colums, columnToAdd]);
  }
  function deleteColumn(id: Id) {
    const newColums = colums.filter((column) => column.id !== id);
    console.log("newColums", newColums);
    setColums(newColums);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColums((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className=" m-auto flex gap-4">
          <div className="flex gap-2 ">
            <SortableContext items={columnId}>
              {colums.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                />
              ))}{" "}
            </SortableContext>
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

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
export default KabanBoard;

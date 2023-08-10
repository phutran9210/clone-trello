import React, { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { DropResult, Droppable } from "react-beautiful-dnd";
import Column from "../board/Column";
import "./css/pageContent.css";
import { Outlet } from "react-router-dom";

interface ITask {
  id: string;
  content: string;
}

interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

interface IState {
  tasks: {
    [key: string]: ITask;
  };
  columns: {
    [key: string]: IColumn;
  };
  columnOrder: string[];
}

const PageContent: React.FC = () => {
  const initialData: IState = {
    tasks: {
      task1: { id: "task1", content: "Take out the garbage" },
      task2: { id: "task2", content: "Watch my favorite show" },
      task3: { id: "task3", content: "Charge my phone" },
      task4: { id: "task4", content: "Cook dinner" },
      task5: { id: "task5", content: "Task for second column" },
      task6: { id: "task6", content: "Another task for second column" },
      // add more tasks as needed
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do 1",
        taskIds: ["task1", "task2", "task3", "task4"],
      },
      "column-2": {
        id: "column-2",
        title: "To do 2",
        taskIds: ["task5", "task6"],
        // include ids of other tasks in this column
      },
    },
    columnOrder: ["column-1", "column-2"],
  };

  const [state, setState] = useState(initialData);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result;

      // Ignore if no destination is available
      if (!destination) {
        return;
      }

      // Ignore if the item is dropped at the same place
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === "column") {
        const newColumnOrder = Array.from(state.columnOrder);
        const [removed] = newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, removed);

        const newState = {
          ...state,
          columnOrder: newColumnOrder,
        };

        setState(newState);
        return;
      }

      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        };

        setState(newState);
        return;
      }

      // Moving from one list to another
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };

      setState(newState);
    },
    [state]
  );

  return (
    <div className="wrapDrag">
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrder.map((columnId, index) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return (
            <Column
              key={column.id}
              index={index}
              column={column}
              tasks={tasks}
            />
          );
        })}
      </DragDropContext>
      <Outlet />
    </div>
  );
};

export default PageContent;

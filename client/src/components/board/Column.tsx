import React, { useState } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import Task from "./Task";

interface ColumnProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: {
    id: string;
    content: string;
  }[];
  index: number;
  // addColumn: () => void;
}

const AddColumnButton = styled.button`
  margin-top: 8px;
  padding: 8px;
  background-color: lightgrey;
  border: none;
  border-radius: 2px;
  cursor: pointer;
`;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  resize: none; /* Optional: Disable resizability */
  overflow: auto; /* Optional: Prevent scrollbar from appearing until necessary */
`;

const Column: React.FC<ColumnProps> = ({ column, tasks, index }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  console.log(inputValue.trim());
  console.log("đây là idcolumn", column.id);

  return (
    <Container>
      <Title>{column.title}</Title>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <TaskList {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <Textarea
        value={inputValue}
        onChange={handleChange}
        placeholder="Write something"
      />

      <div className="btnColumn">
        <AddColumnButton>Add New Card</AddColumnButton>
      </div>
    </Container>
  );
};

export default Column;

import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

interface TaskProps {
  task: {
    id: string;
    content: string;
  };
  index: number;
}

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #f5f1eb;
`;

const Task: React.FC<TaskProps> = ({ task, index }) => {
  console.log(task);

  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;

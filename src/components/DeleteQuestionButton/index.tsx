import styled from "styled-components";

export const DeleteQuestionButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  transition: filter 0.2s;

  display: flex;
  align-items: flex-end;
  color: #737380;
  gap: 0.5rem;

  &:hover {
    filter: brightness(0.7);
  }
`;

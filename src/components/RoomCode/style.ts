import styled from "styled-components";

export const RoomCodeStyled = styled.button`
  height: 2.5rem;
  border-radius: 0.5rem;
  overflow: hidden;

  background: #fff;
  border: 1px solid #835afd;
  cursor: pointer;

  display: flex;

  div {
    height: 100%;
    background: #835afd;
    padding: 0 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 1rem 0 0.75rem;
    width: 14.375rem;
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

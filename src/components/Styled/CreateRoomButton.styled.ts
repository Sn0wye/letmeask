import styled from 'styled-components';

export const StyledCreateRoomButton = styled.button`
  width: 100%;
  margin-top: 4rem;
  height: 3.125rem;
  border-radius: 0.5rem;
  font-weight: 500;
  background: #ea4335;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 0.5rem;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export default StyledCreateRoomButton;

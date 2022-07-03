import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 0.5rem;
  background: #fefefe;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  resize: vertical;
  min-height: 8.125rem;
  &:focus {
    outline: 2px solid #835afd;
  }
`;

export default StyledTextarea;

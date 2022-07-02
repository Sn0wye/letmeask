import styled from 'styled-components';

const StyledSeparator = styled.div`
  font-size: 0.875rem;
  color: #a8a8b3;

  margin: 2rem 0;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    flex: 1;
    height: 1px;
    background: #a8a8b3;
    margin-right: 1rem;
  }

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #a8a8b3;
    margin-left: 1rem;
  }
`;

export default StyledSeparator;

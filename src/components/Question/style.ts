import styled from "styled-components";

export const StyledQuestion = styled.div`
  background: #fefefe;
  border-radius: 0.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;

  & + .question {
    margin-top: 0.5rem;
  }

  &.highlighted {
    background: #f4f0ff;
    border: 1px solid #835afd;

    footer .user-ifon span {
      color: #29292e;
    }
  }

  &.answered {
    background: #dbdcdd;
  }

  p {
    color: #29292e;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }

      span {
        margin-left: 0.5rem;
        color: #737380;
        font-size: 0.875rem;
      }
    }

    > div {
      display: flex;
      gap: 1rem;
    }
  }
`;

import React, { ReactNode } from "react";
import { StyledQuestion } from "./style";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  // isAnswered: boolean;
  // isHighlighted: boolean;
  children?: ReactNode;
};

export function Question({ content, author, children }: QuestionProps) {
  return (
    <StyledQuestion>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </StyledQuestion>
  );
}

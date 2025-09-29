import { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

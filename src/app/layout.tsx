import { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

const CommonLayout = ({ children }: Props) => {
    return (
        <div>
            <h1>Sample</h1>
            {children}
        </div>
    );
};

export default CommonLayout;

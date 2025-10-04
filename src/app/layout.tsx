import { ReactNode } from 'react';
import styles from "./layout.module.css";

interface Props {
    children?: ReactNode;
}

const CommonLayout = ({ children }: Props) => {
    return (
        <div>
            <h1 className={styles.header1}>BookShelf</h1>
            {children}
        </div>
    );
};

export default CommonLayout;

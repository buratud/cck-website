import React from 'react';
import Link from 'next/link';
import styles from './pagecover.module.scss';

interface PageCoverProps {
    title: string;
    subtitle: string;
    showButton?: boolean;
}

const PageCover: React.FC<PageCoverProps> = ({ title, subtitle, showButton = true }) => {
    return (
        <div className={styles.cover}>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>{subtitle}</p>
                {showButton && (
                    <Link href="/about">
                        <button className={styles.button}>เกี่ยวกับเรา</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default PageCover;

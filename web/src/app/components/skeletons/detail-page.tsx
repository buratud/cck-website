'use client';

import styles from './detail-page.module.scss';

export default function DetailPageSkeleton() {
    return (
        <div>
            <div className={`${styles.image} ${styles.skeleton}`} />
            <div className={`${styles.title} ${styles.skeleton}`} />
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`${styles.description} ${styles.skeleton}`} />
            ))}
        </div>
    );
};
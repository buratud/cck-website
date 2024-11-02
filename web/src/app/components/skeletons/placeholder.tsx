
import styles from './placeholder.module.scss';

export default function PlaceholderSkeleton() {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.image} ${styles.skeleton}`} />
            <div className={`${styles.textContainer}`}>
                <div className={`${styles.title} ${styles.skeleton}`} />
                <div className={`${styles.description} ${styles.skeleton}`} />
                {/* <div className={styles.button} /> */}
            </div>
        </div>
    );
}
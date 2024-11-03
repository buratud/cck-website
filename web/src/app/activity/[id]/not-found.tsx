'use client';

import styles from './not-found.module.scss';

export default function NotFound() {
    return (
        <div>
            <h1 className={styles.title}>The announcement you are looking for does not exist.</h1>
            <h1 className={styles.title}>お探しの告知は存在しません。</h1>
            <h1 className={styles.title}>您正在寻找的公告不存在。</h1>
            <h1 className={styles.title}>Объявление, которое вы ищете, не существует.</h1>
            <h1 className={styles.title}>El anuncio que estás buscando no existe.</h1>
        </div>
    );
}
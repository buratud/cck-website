import React from 'react';
import styles from './placeholder.module.scss';

interface PlaceholderProps {
  title: string;
  description: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <img
        src="/image.jpg"
        alt="Placeholder"
        className={styles.image}
      />
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>
          {description}
        </p>
        <button className={styles.button}>Button</button>
      </div>
    </div>
  );
};

export default Placeholder;

import React from 'react';
import styles from './placeholder.module.scss';

const Placeholder: React.FC = () => {
  return (
    <div className={styles.container}>
      <img
        src="/image.jpg"
        alt="Placeholder"
        className={styles.image}
      />
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Title Placeholder</h2>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et finibus est. Sed consequat euismod tellus at aliquam.
        </p>
        <button className={styles.button}>Button</button>
      </div>
    </div>
  );
};

export default Placeholder;

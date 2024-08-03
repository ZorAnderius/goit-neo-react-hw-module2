import styles from './Feedback.module.css';

const Feedback = ({ values }) => {
  return (
    <ul className={styles.feedback}>
      {values &&
        Object.keys(values).map((option, idx, arr) => (
          <li key={option}>
            <p>{option}:</p>
            <span className={styles[option]}>
              {values[option]}
              {idx === (arr.length - 1) ? '%' : ''}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default Feedback;

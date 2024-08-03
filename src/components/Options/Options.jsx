import styles from './Options.module.css';

const Options = ({ updateFeedback, resetRating, values, showResetBtn }) => {
  return (
    <ul className={styles.options}>
      {values &&
        values.map(value => (
          <li key={value}>
            <button
              className={styles[value]}
              onClick={() => updateFeedback(value)}
            >
              {value}
            </button>
          </li>
        ))}
      {showResetBtn > 0 && (
        <li key="reset">
          <button onClick={resetRating}>Reset</button>
        </li>
      )}
    </ul>
  );
};

export default Options;

import 'modern-normalize';

import { useEffect, useState } from 'react';

import Description from './Description/Description';
import Options from './Options/Options';
import Feedback from './Feedback/Feedback';
import Notification from './Notification/Notification';

import styles from './App.module.css';

const STORAGE_KEY = 'feedback-rating';
const options = ['good', 'neutral', 'bad'];
const initialState = options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {});

const initialData = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return data || initialState;
}

function App() {
  const [rating, setRating] = useState(initialData);
  
  const totalFeedback  = Object.keys(rating).reduce((acc, key) => acc + rating[key], 0);
  const positiveFeedback = totalFeedback > 0 ? Math.round((rating.good / totalFeedback) * 100) : 0;
  
  const updateFeedback = feedbackType => {
    setRating(prevRating => {
      return {
        ...prevRating,
        [feedbackType]: prevRating[feedbackType] + 1,
      }
    });
  };
  const resetRating = () => {
    setRating(initialState);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rating));
  }, [rating]);

  return (
    <div className={styles.container}>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetRating={resetRating}
        values={options}
        showResetBtn={totalFeedback}
      />
      {totalFeedback ? (
        <Feedback values={{...rating, total: totalFeedback, positive: positiveFeedback }} />
      ) : (
        <Notification>No feedback yet</Notification>
      )}
    </div>
  );
}

export default App;

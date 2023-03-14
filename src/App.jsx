import React from 'react';
import { useState } from 'react';
import Section from './components/Section';
import FeedbackOptions from './components/FeedbackOptions';
import Statistics from './components/Statistics';
import Notification from 'components/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = (e) => {
    switch (e) {
      case 'good': setGood(prevState => prevState + 1);
      break;

      case 'neutral': setNeutral(prevState => prevState + 1);
      break;

      case 'bad': setBad(prevState => prevState + 1);
      break;

      default: return;
    }
  }

  const countTotalFeedback = () => {
    return (good + neutral + bad);
  }

  const countPositiveFeedbackPercentage = () => {
    return (Math.round((good/countTotalFeedback())*100));
  }
  
  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions  
          options={["good", "neutral", "bad"]}
          leaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() > 0 ? 
          <Statistics 
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          /> :
          <Notification message="There is no feedback"></Notification>
        }
      </Section>
    </>
  );
}
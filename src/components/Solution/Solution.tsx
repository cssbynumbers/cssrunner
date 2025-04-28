import { forwardRef } from 'react';
import styles from './Solution.module.scss';

const Solution = ({ ref }) => {
  return (
    <div>
      <h3>Solution</h3>  
      <div className={styles.solution} ref={ref}>
        <div className={styles.solutionOne} />
        <div className={styles.solutionTwo} />
        <div className={styles.solutionThree} />
      </div>
    </div>
  );
}

export default Solution;
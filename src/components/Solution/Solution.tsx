import useRunnerStore from '../../utils/useRunnerStore';
import solutionStyles from './Solution.module.scss';

const Solution = () => {
  const { styles, solutionRef } = useRunnerStore();

  return (
    <div>
      <style>{styles}</style>
      <h3>Solution</h3>
      <div className={solutionStyles.solutionContainer} ref={solutionRef}>
        <div className="solution" />
      </div>
    </div>
  );
}

export default Solution;
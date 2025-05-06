import useRunnerStore from '../../utils/useRunnerStore';
import solutionStyles from './Solution.module.scss';

const Solution = () => {
  const { styles, solutionRef } = useRunnerStore();

  return (
    <div>
      <style>{styles}</style>
      <h3>Solution</h3>
      <p>Target the div with the classname 'solution' in the code editor.</p>
      <div className={solutionStyles.solutionContainer} ref={solutionRef}>
        <div className="solution" />
      </div>
    </div>
  );
}

export default Solution;
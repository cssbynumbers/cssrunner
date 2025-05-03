import { useEffect } from 'react';
import * as sass from 'sass';
import CodeMirror from '@uiw/react-codemirror';
import { sass as sassLang } from "@codemirror/lang-sass"
import useRunnerStore from '../../utils/useRunnerStore';

const StylesEditor = () => {
  const { styles, updateStyles } = useRunnerStore();

  return (
    <CodeMirror value={styles} theme={"dark"} height="95vh" extensions={[sassLang()]} onChange={updateStyles} />
  );
}

export default StylesEditor;
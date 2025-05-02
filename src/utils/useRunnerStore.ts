import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { createRef, Ref } from 'react';

const challengeRef = createRef<HTMLDivElement>();
const solutionRef = createRef<HTMLDivElement>();

const value = `.solutionOne {
  height: 50px;
  width: 75px;
  position: relative;
  display: block;
  border-radius: 50%;
}

.solutionOne:before {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: blue;
  top: calc((50px - 25px) / 2);
  content: "";
  display: block;
  position: absolute;
}

.solutionOne:before {
  left: 0;
}

.solutionOne:after {
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 25px solid orange;
  content: "";
  position: absolute;
  top: calc((50px - 25px)/2);
  right: 0;
}

.solutionTwo {
  height: 50px;
  width: 50px;
  background-color: rebeccapurple;
  border-top-right-radius: 25px;
}

.solutionThree {
  width: 0px;
  height: 0px;
  border-left: 30px solid lightgrey;
  border-right: 30px solid grey;
  border-bottom: 50px solid salmon;
}`

interface RunnerState {
  challengeRef: Ref<HTMLDivElement>;
  solutionRef: Ref<HTMLDivElement>;
  isValidating: boolean;
  validate: () => void;
  reset: () => void;
  styles: string;
  updateStyles: (newStyles: string) => void;
}

const useRunnerStore = create<RunnerState>()(
  devtools(
    persist(
      (set) => ({
        challengeRef: challengeRef,
        solutionRef: solutionRef,
        isValidating: false,
        validate: () => set(() => ({ isValidating: true }), undefined, 'validate'),
        reset: () => set(() => { console.clear(); return ({ isValidating: false }) }, undefined, 'reset'),
        styles: value,
        updateStyles: (newStyles) => set(() => ({ styles: newStyles }), undefined, 'update styles')
      }),
      {
        name: 'runner-store',
        partialize: (state) => ({ styles: state.styles }),
      },
    ),
  ),
)

export default useRunnerStore;
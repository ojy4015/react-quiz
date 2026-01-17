import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: 'loading',
  index: 0, //문항번호
  inputForAnswer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

// updating state object, just lkie setState, takes in current state and action returns updated next state
function reducer(state, action) {
  console.log(state, action); //current state: state, action: { type: 'setCount', payload: Number(e.target.value) }

  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        inputForAnswer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'newQuestion':
      return {
        ...state,
        index: state.index + 1,
        inputForAnswer: null,
      };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    // return {
    //   ...state,
    //   status: 'ready',
    //   index: 0, //문항번호
    //   inputForAnswer: null,
    //   points: 0,
    //   highscore: 0,
    // }

    default:
      throw new Error('Unknown action');
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    inputForAnswer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  const numQuestions = questions.length;
  // console.log(numQuestions); // 15

  const maxPossiblePoints = questions.reduce((prev, cur) => {
    return prev + cur.points;
  }, 0); // 0 is the initial value

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));

    // (15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // {question: 'Which is the most popular JavaScript framework?', options: Array(4), correctOption: 1, points: 10}
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              inputForAnswer={inputForAnswer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              inputForAnswer={inputForAnswer}
              points={points}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                inputForAnswer={inputForAnswer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <>
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          </>
        )}
      </Main>
    </div>
  );
}

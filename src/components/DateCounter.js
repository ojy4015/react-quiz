// import { useReducer, useState } from 'react';
// const initialState = { count: 0, step: 1 };

// function reducer(state, action) {
//   console.log(state, action); // 0(current state), 1(action)
//   // if (action.type === 'inc') return state + action.payload; //{count: 0, step: 1} {type: 'inc'}
//   // if (action.type === 'inc') return state + 1;
//   // if (action.type === 'dec') return state + action.payload; //{count: 0, step: 1} {type: 'dec'}
//   // if (action.type === 'dec') return state - 1;
//   // if (action.type === 'setCount') return action.payload; //{count: 0, step: 1} {type: 'setCount', payload: 5}
//   // return state + action; // 1, next state

//   // if (action.type === 'setStep') return action.payload; //{count: 0, step: 1} {type: 'setStep', payload: 2}

//   switch (action.type) {
//     case 'dec':
//       return { ...state, count: state.count - state.step };
//     case 'inc':
//       return { ...state, count: state.count + state.step };
//     case 'setCount':
//       return { ...state, count: action.payload };
//     case 'setStep':
//       return { ...state, step: action.payload };
//     // case 'reset':
//     //   return {
//     //     count: 0,
//     //     step: 1,
//     //   };
//     case 'reset':
//       return initialState;
//     default:
//       throw new Error('Unknown action');
//   }
// }

// function DateCounter() {
//   // const [count, setCount] = useState(0);
//   // current state, dispatch function
//   // const [count, dispatch] = useReducer(reducer, 0);

//   // const [step, setStep] = useState(1);
//   // const [step, dispatch] = useReducer(reducer, 1);

//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { count, step } = state;

//   // This mutates the date object.
//   const date = new Date('june 21 2027');
//   date.setDate(date.getDate() + count);

//   const dec = function () {
//     // dispatch(-1);
//     // dispatch({ type: 'dec', payload: -1 }); // action is { type: 'dec', payload: -1 }
//     dispatch({ type: 'dec' }); // action is { type: 'dec', payload: -1 }
//     // setCount((count) => count - 1);
//     // setCount((count) => count - step);
//   };

//   const inc = function () {
//     // dispatch(1); // action is 1
//     // dispatch({ type: 'inc', payload: 1 }); // action is {type: "inc", payload:1}
//     dispatch({ type: 'inc' }); // action is {type: "inc", payload:1}
//     // setCount((count) => count + 1);
//     // setCount((count) => count + step);
//   };

//   const defineCount = function (e) {
//     dispatch({ type: 'setCount', payload: Number(e.target.value) }); // action is {type:"setCount", payload:Number(e.target.value)}
//     // setCount(Number(e.target.value));
//   };

//   const defineStep = function (e) {
//     // setStep(Number(e.target.value));
//     dispatch({ type: 'setStep', payload: Number(e.target.value) });
//   };

//   const reset = function () {
//     dispatch({ type: 'reset' });
//     // setCount(0);
//     // setStep(1);
//   };

//   return (
//     <div className="counter">
//       <div>
//         <input
//           type="range"
//           min="0"
//           max="10"
//           value={step}
//           onChange={defineStep}
//         />
//         <span>{step}</span>
//       </div>

//       <div>
//         <button onClick={dec}>-</button>
//         <input value={count} onChange={defineCount} />
//         <button onClick={inc}>+</button>
//       </div>

//       <p>{date.toDateString()}</p>

//       <div>
//         <button onClick={reset}>Reset</button>
//       </div>
//     </div>
//   );
// }
// export default DateCounter;

///////////////////////////////
import { useReducer } from 'react';
const initialState = { count: 0, step: 1 };

// updating state object, just lkie setState, takes in current state and action returns updated next state
function reducer(state, action) {
  console.log(state, action); //current state: state, action: { type: 'setCount', payload: Number(e.target.value) }

  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };

    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action');
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState); // returns new state and dispatch function to trigger state upldates by sending actions from event handers to the reducer
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) =>
            dispatch({ type: 'setStep', payload: Number(e.target.value) })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: 'dec' })}>-</button>
        <input
          value={count}
          onChange={(e) =>
            dispatch({ type: 'setCount', payload: Number(e.target.value) })
          }
        />
        <button onClick={() => dispatch({ type: 'inc' })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

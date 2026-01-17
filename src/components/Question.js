import Options from './Options';
function Question({ question, dispatch, inputForAnswer, points }) {
  // console.log(question);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        inputForAnswer={inputForAnswer}
        points={points}
      />
    </div>
  );
}

export default Question;

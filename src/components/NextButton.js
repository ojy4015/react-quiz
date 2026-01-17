export default function NextButton({
  dispatch,
  inputForAnswer,
  index,
  numQuestions,
}) {
  // console.log(index, numQuestions);
  if (inputForAnswer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'newQuestion' })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </button>
    );
}

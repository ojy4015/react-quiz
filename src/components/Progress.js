export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  inputForAnswer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(inputForAnswer != null)}
      />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

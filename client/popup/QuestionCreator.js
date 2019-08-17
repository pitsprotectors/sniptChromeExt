import React, { useState } from "react";

const QuestionCreator = () => {
  const [newQuestion, setNewQuestion] = useState("");
  return (
    <div>
      <form>
        <label>Create a New Question: </label>
        <input
          type="text"
          id="newQuestion"
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
        />
      </form>
      {newQuestion}
      <button type="submit">CREATE</button>
    </div>
  );
};

export default QuestionCreator;

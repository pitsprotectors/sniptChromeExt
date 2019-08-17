import React, { useState } from "react";
import SnippetList from "./SnippetList";
import ProjectSelector from "./ProjectSelector";
import QuestionCreator from "./QuestionCreator";

const App = () => {
  const [newSnippetQuestionId, setNewSnippetQuestionId] = useState(null);
  return (
    <div>
      <QuestionCreator />
      <ProjectSelector setNewSnippetQuestionId={setNewSnippetQuestionId} />
      <SnippetList newSnippetQuestionId={newSnippetQuestionId} />
    </div>
  );
};

export default App;

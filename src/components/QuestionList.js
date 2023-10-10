import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList( { questions, removeQuestion, updateQuestion }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => {
        return <QuestionItem key={`key-${question.id}`} updateQuestion={updateQuestion} removeQuestion={removeQuestion} question={question} />
      })}</ul>
    </section>
  );
}

export default QuestionList;

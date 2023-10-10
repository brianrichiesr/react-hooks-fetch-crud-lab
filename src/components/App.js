import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const Url = "http://localhost:4000/questions";

  useEffect(() => {
    fetch(Url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText);
      }
    })
    .then(data => {
      setQuestions(data);
    })
    .catch(err => alert(err))
  }, [])

  const addQuestion = (newQuestion) => {
    const questionToBePosted = {
      prompt: newQuestion.prompt,
      correctIndex: newQuestion.correctIndex,
      answers: [newQuestion.answer1, newQuestion.answer2, newQuestion.answer3, newQuestion.answer4]
    }
    fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionToBePosted)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText);
      }
    })
    .then(data => {
      setQuestions([
        ...questions,
        data
      ]);
    })
    .catch(err => alert(err))
  }

  const removeQuestion = (id) => {

    fetch(`${Url}/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText);
      }
    })
    .then(() => {
      const questionsWithOneRemoved = questions.filter(question => {
        return question.id !== id;
      })
      setQuestions(questionsWithOneRemoved);
    })
    .catch(err => alert(err))
  }

  const updateQuestion = (id, index) => {
    fetch(`${Url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"correctIndex": Number(index)})
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText);
      }
    })
    .then(data => {
      const updatedQuestions = questions.map(question => {
        if (question.id === data.id) {
          return data
        } else {
          return question
        }
      })
      setQuestions(updatedQuestions);
    })
    .catch(err => alert(err))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion} /> : <QuestionList removeQuestion={removeQuestion} updateQuestion={updateQuestion} questions={questions} />}
    </main>
  );
}

export default App;

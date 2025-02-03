"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePointsStore } from "@/store";
import { Question, Subject } from "@/types/subject";
import { QuestionTimer } from "@/components/questionTimer";
import Results from "@/components/results";

const Quiz = () => {
  const { subject } = useParams();
  const { points, addToPoints } = usePointsStore((state) => state);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unattemptedQuestions, setUnattemptedQuestions] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [timePerQuestion, setTimePerQuestion] = useState(0);

  const fetchQuestions = async () => {
    const response = await fetch("/data/questions.json");
    if (response.ok) {
      const data: {subjects: Subject[]} = await response.json();
      const subjectData = data.subjects.find(
        (s) => s.name.toLowerCase() === subject
      );
      setQuestions(subjectData ? subjectData.questions : []);
    } else {
      console.error("Failed to fetch questions");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [subject]);

  const handleAnswer = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    setTotalTimeSpent(totalTimeSpent + timePerQuestion);

    if (option === questions[currentQuestionIndex].answer) {
      addToPoints(5);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedOption('');
      setIsAnswered(false);
      setTimePerQuestion(0);
    } else {
      setShowResults(true);
    }
  };

  const handleTimeUp = () => {
    setIsAnswered(true);
    setUnattemptedQuestions(unattemptedQuestions + 1);
    setTotalTimeSpent(totalTimeSpent + 10);
    handleNext();
  };

  const percentage = Math.round((correctAnswers / questions.length) * 100);
  const averageTimePerQuestion = (totalTimeSpent / questions.length).toFixed(2);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {!showResults ? (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 relative">
          <div className="absolute top-0 left-0 h-2 bg-blue-500 transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
          
          <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>

          <h3 className="text-xl font-bold text-center mb-6 p-4 bg-blue-500 text-white rounded-lg">
            {questions[currentQuestionIndex]?.question}
          </h3>


          <QuestionTimer
            onTimeUp={handleTimeUp}
            setTimePerQuestion={setTimePerQuestion}
            isAnswered={isAnswered}
            resetTimer={currentQuestionIndex}
          />

          <div className="mt-6 space-y-4">
            {questions[currentQuestionIndex]?.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition duration-300 focus:outline-none ${
                  isAnswered && option === questions[currentQuestionIndex].answer
                    ? "bg-green-500 text-white"
                    : isAnswered && option === selectedOption
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 focus:bg-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {isAnswered && (
            <button
              onClick={handleNext}
              className="mt-8 w-full py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next Question"}
            </button>
          )}
        </div>
      ) : (
        <Results
          score={points}
          totalQuestions={questions.length}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          unattemptedQuestions={unattemptedQuestions}
          percentage={percentage}
          timeSpent={totalTimeSpent}
          averageTimePerQuestion={averageTimePerQuestion}
        />
      )}
    </div>
  );
};

export default Quiz;

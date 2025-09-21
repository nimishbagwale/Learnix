import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Brain, Star, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizModuleProps {
  questions: Question[];
  onQuizComplete?: (score: number, xpEarned: number) => void;
}

export default function QuizModule({ questions, onQuizComplete }: QuizModuleProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const correctAnswers = answers.reduce((count, answer, index) => {
        return count + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0) + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0);
      
      const score = correctAnswers;
      const xpEarned = correctAnswers * 10;
      setQuizCompleted(true);
      onQuizComplete?.(score, xpEarned);
      console.log(`Quiz completed! Score: ${score}/${questions.length}, XP earned: ${xpEarned}`);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setQuizCompleted(false);
    console.log('Quiz reset');
  };

  const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  if (quizCompleted) {
    const finalScore = answers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0) + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0);
    
    return (
      <Card className="max-w-2xl mx-auto" data-testid="card-quiz-complete">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Star className="h-6 w-6 text-gaming-electric" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-4">
            <div className="text-4xl font-bold text-gaming-primary" data-testid="text-final-score">
              {finalScore}/{questions.length}
            </div>
            <div className="text-lg text-muted-foreground">
              Questions Correct
            </div>
            <Badge variant="secondary" className="text-base px-4 py-2" data-testid="badge-xp-earned">
              +{finalScore * 10} XP Earned
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="text-lg font-semibold">
              {finalScore === questions.length ? "Perfect Score! 🌟" :
               finalScore >= questions.length * 0.8 ? "Excellent Work! 🌱" :
               finalScore >= questions.length * 0.6 ? "Good Job! 🍃" :
               "Keep Learning! 🌿"}
            </div>
            <p className="text-muted-foreground">
              {finalScore === questions.length ? "You're a true environmental champion!" :
               finalScore >= questions.length * 0.8 ? "Your environmental knowledge is impressive!" :
               finalScore >= questions.length * 0.6 ? "You're on the right track to becoming eco-conscious!" :
               "Every step counts in protecting our planet!"}
            </p>
          </div>

          <Button 
            onClick={resetQuiz}
            className="flex items-center gap-2"
            data-testid="button-retry-quiz"
          >
            <RotateCcw className="h-4 w-4" />
            Take Quiz Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6" data-testid="quiz-container">
      {/* Progress */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} data-testid="progress-quiz" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card data-testid="card-question">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-gaming-accent" />
            Gaming Knowledge Quest
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold" data-testid="text-question">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className={`w-full text-left justify-start p-4 h-auto ${
                  showResult ? (
                    index === questions[currentQuestion].correctAnswer ? 
                    "bg-gaming-success/20 border-gaming-success hover:bg-gaming-success/20" :
                    selectedAnswer === index ? 
                    "bg-destructive/20 border-destructive hover:bg-destructive/20" :
                    ""
                  ) : ""
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                data-testid={`button-answer-${index}`}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    {showResult && index === questions[currentQuestion].correctAnswer && (
                      <CheckCircle className="h-4 w-4 text-gaming-success" />
                    )}
                    {showResult && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    {!showResult && (
                      <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </Button>
            ))}
          </div>

          {showResult && (
            <div className="mt-4 p-4 rounded-lg bg-muted" data-testid="explanation-container">
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-gaming-success" />
                    <span className="font-semibold text-gaming-success">Correct! +10 XP</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-destructive" />
                    <span className="font-semibold text-destructive">Incorrect</span>
                  </>
                )}
              </div>
              <p className="text-sm" data-testid="text-explanation">
                {questions[currentQuestion].explanation}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            {!showResult ? (
              <Button 
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                data-testid="button-submit-answer"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                data-testid="button-next-question"
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
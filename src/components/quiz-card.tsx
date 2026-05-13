import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ChevronRight, HelpCircle } from "lucide-react";
import { Quiz } from "@/lib/course-data";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  quiz: Quiz;
  onComplete?: (score: number) => void;
}

export function QuizCard({ quiz, onComplete }: QuizCardProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
      onComplete?.(score + (isCorrect ? 1 : 0));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <Card className="w-full max-w-2xl mx-auto overflow-hidden border-2 border-primary/20 shadow-xl animate-in fade-in zoom-in duration-300">
        <CardHeader className="bg-primary/5 text-center pb-8">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
          <CardDescription className="text-lg">
            You completed: {quiz.title}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 text-center">
          <div className="flex justify-center items-baseline gap-2 mb-6">
            <span className="text-6xl font-black text-primary">{percentage}%</span>
            <span className="text-xl text-muted-foreground font-medium">Score</span>
          </div>
          <p className="text-muted-foreground mb-8">
            You got {score} out of {quiz.questions.length} questions correct.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={resetQuiz}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden border-2 border-primary/10 shadow-lg transition-all duration-300">
      <CardHeader className="bg-muted/30 pb-4">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="bg-background">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </Badge>
          <Badge variant="secondary" className="font-mono text-[10px]">
            +50 XP
          </Badge>
        </div>
        <CardTitle className="text-xl leading-tight">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <RadioGroup
          value={selectedOption?.toString()}
          onValueChange={(v) => !isSubmitted && setSelectedOption(parseInt(v))}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, index) => {
            const isCorrectOption = index === currentQuestion.correctAnswer;
            const isSelected = selectedOption === index;
            
            let statusClass = "border-border hover:bg-accent/50";
            if (isSubmitted) {
              if (isCorrectOption) {
                statusClass = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
              } else if (isSelected && !isCorrectOption) {
                statusClass = "border-destructive bg-destructive/10 text-destructive-700 dark:text-destructive-400";
              } else {
                statusClass = "opacity-50 grayscale-[0.5]";
              }
            } else if (isSelected) {
              statusClass = "border-primary bg-primary/5 ring-1 ring-primary";
            }

            return (
              <div key={index} className="flex items-center">
                <Label
                  htmlFor={`q-${index}`}
                  className={cn(
                    "flex items-center justify-between w-full p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98]",
                    statusClass
                  )}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={index.toString()} id={`q-${index}`} className="sr-only" />
                    <span className="font-medium text-sm sm:text-base">{option}</span>
                  </div>
                  {isSubmitted && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {isSubmitted && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-destructive" />}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {isSubmitted && (
          <div className={cn(
            "mt-6 p-4 rounded-lg text-sm animate-in slide-in-from-top-2 duration-300",
            isCorrect ? "bg-green-500/10 text-green-800 dark:text-green-300" : "bg-primary/5 text-muted-foreground"
          )}>
            <p className="font-bold mb-1">{isCorrect ? "✨ Correct!" : "💡 Explanation:"}</p>
            {currentQuestion.explanation}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted/10 border-t pt-4">
        {!isSubmitted ? (
          <Button 
            className="w-full sm:w-auto ml-auto" 
            onClick={handleSubmit} 
            disabled={selectedOption === null}
          >
            Submit Answer
          </Button>
        ) : (
          <Button 
            className="w-full sm:w-auto ml-auto" 
            onClick={handleNext}
          >
            {currentQuestionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

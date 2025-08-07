import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  CourseData,
  MY_COURSES_DATA,
} from '../../../config/my-courses.config';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-in-blank';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  userAnswer?: string | number;
  isCorrect?: boolean;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  isCompleted: boolean;
  isLocked: boolean;
  content?: string;
  videoUrl?: string;
  questions?: QuizQuestion[];
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  course: CourseData | null = null;
  currentLesson: Lesson | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  // Quiz state
  quizStarted: boolean = false;
  currentQuestionIndex: number = 0;
  quizCompleted: boolean = false;
  quizScore: number = 0;
  showExplanation: boolean = false;
  timeRemaining: number = 0;
  timer: any;

  // Make String constructor available in template
  String = String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const courseId = params['courseId'];
      const lessonId = params['lessonId'];
      
      if (courseId && lessonId) {
        this.loadQuiz(courseId, lessonId);
      } else {
        this.error = 'Course or Lesson ID not provided';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private loadQuiz(courseId: string, lessonId: string) {
    this.isLoading = true;
    this.error = null;

    // Simulate API call
    setTimeout(() => {
      const foundCourse = MY_COURSES_DATA.find(c => c.id === courseId);
      
      if (foundCourse) {
        this.course = foundCourse;
        
        // Generate quiz lesson
        this.currentLesson = {
          id: lessonId,
          title: `${foundCourse.title} - Assessment`,
          duration: '15 min',
          type: 'quiz',
          isCompleted: false,
          isLocked: false,
          questions: this.generateQuizQuestions()
        };

        // Set timer (15 minutes = 900 seconds)
        this.timeRemaining = 15 * 60;
      } else {
        this.error = 'Course not found';
      }
      
      this.isLoading = false;
    }, 500);
  }

  private generateQuizQuestions(): QuizQuestion[] {
    const sampleQuestions: QuizQuestion[] = [
      {
        id: 'q1',
        question: 'What is the primary purpose of tax planning?',
        type: 'multiple-choice',
        options: [
          'To avoid paying taxes entirely',
          'To minimize tax liability legally',
          'To delay tax payments indefinitely',
          'To increase business expenses'
        ],
        correctAnswer: 1,
        explanation: 'Tax planning aims to minimize tax liability through legal means while ensuring compliance with tax laws.'
      },
      {
        id: 'q2',
        question: 'Tax deductions reduce your taxable income.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'Tax deductions reduce the amount of income that is subject to tax, thereby lowering your taxable income.'
      },
      {
        id: 'q3',
        question: 'Which of the following is considered a business expense?',
        type: 'multiple-choice',
        options: [
          'Office rent',
          'Personal vacation',
          'Family dinner',
          'Home mortgage'
        ],
        correctAnswer: 0,
        explanation: 'Office rent is a legitimate business expense as it is necessary for conducting business operations.'
      },
      {
        id: 'q4',
        question: 'The standard deduction is the same for all taxpayers.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'The standard deduction varies based on filing status, age, and other factors.'
      },
      {
        id: 'q5',
        question: 'What does "AGI" stand for in tax terminology?',
        type: 'multiple-choice',
        options: [
          'Annual Gross Income',
          'Adjusted Gross Income',
          'Average General Income',
          'Additional Government Income'
        ],
        correctAnswer: 1,
        explanation: 'AGI stands for Adjusted Gross Income, which is your total income minus specific deductions.'
      },
      {
        id: 'q6',
        question: 'A tax credit is more valuable than a tax deduction of the same amount.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'Tax credits directly reduce tax owed dollar-for-dollar, while deductions only reduce taxable income.'
      },
      {
        id: 'q7',
        question: 'Which form is used for individual income tax returns?',
        type: 'multiple-choice',
        options: [
          'Form 1099',
          'Form W-2',
          'Form 1040',
          'Form 941'
        ],
        correctAnswer: 2,
        explanation: 'Form 1040 is the standard individual income tax return form used by U.S. taxpayers.'
      },
      {
        id: 'q8',
        question: 'Self-employment tax applies to income from freelance work.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'Self-employment tax applies to net earnings from self-employment, including freelance work.'
      }
    ];

    // Return random 5-8 questions
    const shuffled = sampleQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 4) + 5);
  }

  // Quiz methods
  startQuiz() {
    this.quizStarted = true;
    this.currentQuestionIndex = 0;
    this.quizCompleted = false;
    this.quizScore = 0;
    this.showExplanation = false;
    
    // Reset all user answers
    if (this.currentLesson?.questions) {
      this.currentLesson.questions.forEach(q => {
        q.userAnswer = undefined;
        q.isCorrect = undefined;
      });
    }

    // Start timer
    this.startTimer();
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.finishQuiz();
      }
    }, 1000);
  }

  selectAnswer(questionIndex: number, answerIndex: number) {
    if (!this.currentLesson?.questions || this.quizCompleted) return;

    const question = this.currentLesson.questions[questionIndex];
    question.userAnswer = answerIndex;
    question.isCorrect = answerIndex === question.correctAnswer;
  }

  nextQuestion() {
    if (!this.currentLesson?.questions) return;

    if (this.currentQuestionIndex < this.currentLesson.questions.length - 1) {
      this.currentQuestionIndex++;
      this.showExplanation = false;
    } else {
      this.finishQuiz();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showExplanation = false;
    }
  }

  finishQuiz() {
    if (!this.currentLesson?.questions) return;

    this.quizCompleted = true;
    this.quizScore = this.currentLesson.questions.filter(q => q.isCorrect).length;
    
    // Stop timer
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  restartQuiz() {
    this.startQuiz();
  }

  toggleExplanation() {
    this.showExplanation = !this.showExplanation;
  }

  getCurrentQuestion(): QuizQuestion | null {
    if (!this.currentLesson?.questions || !this.quizStarted) return null;
    return this.currentLesson.questions[this.currentQuestionIndex] || null;
  }

  getQuizProgress(): number {
    if (!this.currentLesson?.questions || !this.quizStarted) return 0;
    return Math.round(((this.currentQuestionIndex + 1) / this.currentLesson.questions.length) * 100);
  }

  getScorePercentage(): number {
    if (!this.currentLesson?.questions || this.quizScore === 0) return 0;
    return Math.round((this.quizScore / this.currentLesson.questions.length) * 100);
  }

  getScoreColor(): string {
    const percentage = this.getScorePercentage();
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-danger';
  }

  getTimeFormatted(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  getTimeColor(): string {
    if (this.timeRemaining > 300) return 'text-success'; // > 5 minutes
    if (this.timeRemaining > 60) return 'text-warning';  // > 1 minute
    return 'text-danger'; // < 1 minute
  }

  // Navigation
  goBack() {
    this.location.back();
  }

  goToCourse() {
    if (this.course) {
      this.router.navigate(['/course-learning', this.course.id]);
    }
  }

  retakeQuiz() {
    this.restartQuiz();
  }

  continueToNextLesson() {
    // Navigate back to course learning
    this.goToCourse();
  }
}

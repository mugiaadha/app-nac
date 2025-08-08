import { Component, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  CourseData,
  MY_COURSES_DATA,
  COURSE_STATUS_CONFIG,
} from '../../../config/my-courses.config';
import {
  BrevetCourse,
  BREVET_COURSES,
  getBrevetCourseById
} from '../../../config/brevet-courses.config';

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

interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isCompleted: boolean;
}

@Component({
  selector: 'app-course-learning',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-learning.component.html',
  styleUrls: ['./course-learning.component.scss'],
})
export class CourseLearningComponent implements OnInit, OnDestroy, AfterViewInit {
  course: CourseData | null = null;
  currentLesson: Lesson | null = null;
  modules: CourseModule[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  statusConfig = COURSE_STATUS_CONFIG;

  // Learning state
  isSidebarCollapsed: boolean = window.innerWidth <= 768; // Auto collapse on mobile
  isFullscreen: boolean = false;
  playbackSpeed: number = 1;
  videoProgress: number = 0;

  // Quiz state
  quizStarted: boolean = false;
  currentQuestionIndex: number = 0;
  quizCompleted: boolean = false;
  quizScore: number = 0;
  showExplanation: boolean = false;

  // Make String constructor available in template
  String = String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const courseId = params['id'];
      const lessonId = params['lessonId'];

      if (courseId) {
        this.loadCourse(courseId, lessonId);
      } else {
        this.error = 'Course ID not provided';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  ngAfterViewInit() {
    // Auto scroll to current lesson after view is initialized
    setTimeout(() => {
      if (this.currentLesson) {
        this.scrollToCurrentLesson(this.currentLesson.id);
      }
    }, 200);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Auto collapse sidebar on mobile
    if (event.target.innerWidth <= 768) {
      this.isSidebarCollapsed = true;
    } else {
      this.isSidebarCollapsed = false;
    }
  }

  private loadCourse(courseId: string, lessonId?: string) {
    this.isLoading = true;
    this.error = null;

    // Simulate API call
    setTimeout(() => {
      let foundCourse = MY_COURSES_DATA.find((c) => c.id === courseId);
      
      // Check if it's a brevet course
      if (!foundCourse && courseId.startsWith('brevet-')) {
        const brevetCourse = getBrevetCourseById(courseId);
        if (brevetCourse) {
          // Convert brevet course to standard course format
          foundCourse = this.convertBrevetToStandardCourse(brevetCourse);
        }
      }

      if (foundCourse) {
        this.course = foundCourse;
        this.generateModulesAndLessons();

        if (lessonId) {
          this.selectLesson(lessonId);
        } else {
          this.selectFirstAvailableLesson();
        }
        
        // Auto scroll to current lesson after everything is loaded
        setTimeout(() => {
          if (this.currentLesson) {
            this.scrollToCurrentLesson(this.currentLesson.id);
          }
        }, 100);
      } else {
        this.error = 'Course not found';
      }

      this.isLoading = false;
    }, 500);
  }

  private convertBrevetToStandardCourse(brevetCourse: BrevetCourse): CourseData {
    return {
      id: brevetCourse.id,
      title: brevetCourse.title,
      description: brevetCourse.description,
      instructor: 'NAC Tax Center',
      duration: brevetCourse.duration,
      category: brevetCourse.category,
      image: brevetCourse.img,
      status: brevetCourse.progress > 0 ? 'in-progress' : 'not-started',
      progress: brevetCourse.progress,
      completedLessons: 0,
      totalLessons: brevetCourse.totalLessons,
      enrolledDate: new Date(),
      lastAccessed: new Date(),
      rating: 5.0,
      level: brevetCourse.level,
      tags: ['Brevet', 'Pajak', brevetCourse.level]
    };
  }

  private generateModulesAndLessons() {
    if (!this.course) return;

    // Generate sample modules and lessons based on course data
    const totalLessons = this.course.totalLessons;
    const completedLessons = this.course.completedLessons;
    const modulesCount = Math.ceil(totalLessons / 4); // 4 lessons per module

    this.modules = [];
    let lessonIndex = 0;

    for (let i = 0; i < modulesCount; i++) {
      const lessonsInModule = Math.min(4, totalLessons - lessonIndex);
      const moduleTitle = `Module ${i + 1}`;

      const lessons: Lesson[] = [];
      for (let j = 0; j < lessonsInModule; j++) {
        const currentLessonIndex = lessonIndex + j;
        const isCompleted = currentLessonIndex < completedLessons;
        const isLocked = currentLessonIndex > completedLessons; // Next lesson after last completed

        lessons.push({
          id: `lesson-${currentLessonIndex + 1}`,
          title: `${moduleTitle} - Lesson ${j + 1}`,
          duration: `${Math.floor(Math.random() * 20) + 5} min`,
          type: this.getLessonType(j),
          isCompleted,
          isLocked,
          content: this.generateLessonContent(moduleTitle, j + 1),
          videoUrl:
            this.getLessonType(j) === 'video' ? 'sample-video-url' : undefined,
          questions:
            this.getLessonType(j) === 'quiz'
              ? this.generateQuizQuestions()
              : undefined,
        });
      }

      const moduleCompleted = lessons.every((l) => l.isCompleted);

      this.modules.push({
        id: `module-${i + 1}`,
        title: moduleTitle,
        description: `Learn fundamental concepts in ${moduleTitle.toLowerCase()}`,
        lessons,
        isCompleted: moduleCompleted,
      });

      lessonIndex += lessonsInModule;
    }
  }

  private getLessonType(
    index: number
  ): 'video' | 'reading' | 'quiz' | 'assignment' {
    const types: ('video' | 'reading' | 'quiz' | 'assignment')[] = [
      'video',
      'reading',
      'quiz',
      'assignment',
    ];
    return types[index % types.length];
  }

  private generateLessonContent(
    moduleTitle: string,
    lessonNumber: number
  ): string {
    return `
      <h3>Welcome to ${moduleTitle} - Lesson ${lessonNumber}</h3>
      <p>This lesson covers important concepts related to ${this.course?.category.toLowerCase()}.</p>
      <p>In this lesson, you will learn:</p>
      <ul>
        <li>Key concepts and terminology</li>
        <li>Practical applications</li>
        <li>Best practices and examples</li>
        <li>Common challenges and solutions</li>
      </ul>
      <p>Take your time to understand the material and don't hesitate to review previous lessons if needed.</p>
    `;
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
          'To increase business expenses',
        ],
        correctAnswer: 1,
        explanation:
          'Tax planning aims to minimize tax liability through legal means while ensuring compliance with tax laws.',
      },
      {
        id: 'q2',
        question: 'Tax deductions reduce your taxable income.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation:
          'Tax deductions reduce the amount of income that is subject to tax, thereby lowering your taxable income.',
      },
      {
        id: 'q3',
        question: 'Which of the following is considered a business expense?',
        type: 'multiple-choice',
        options: [
          'Office rent',
          'Personal vacation',
          'Family dinner',
          'Home mortgage',
        ],
        correctAnswer: 0,
        explanation:
          'Office rent is a legitimate business expense as it is necessary for conducting business operations.',
      },
      {
        id: 'q4',
        question: 'The standard deduction is the same for all taxpayers.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation:
          'The standard deduction varies based on filing status, age, and other factors.',
      },
      {
        id: 'q5',
        question: 'What does "AGI" stand for in tax terminology?',
        type: 'multiple-choice',
        options: [
          'Annual Gross Income',
          'Adjusted Gross Income',
          'Average General Income',
          'Additional Government Income',
        ],
        correctAnswer: 1,
        explanation:
          'AGI stands for Adjusted Gross Income, which is your total income minus specific deductions.',
      },
    ];

    // Shuffle questions and return random 3-4 questions
    const shuffled = sampleQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 3);
  }

  private selectFirstAvailableLesson() {
    // Find the last incomplete lesson that is not locked
    let lastIncompleteLesson: Lesson | null = null;
    
    for (const module of this.modules) {
      for (const lesson of module.lessons) {
        if (!lesson.isLocked) {
          if (!lesson.isCompleted) {
            lastIncompleteLesson = lesson;
          }
        }
      }
    }

    // If we found an incomplete lesson, select it, otherwise select the first available
    if (lastIncompleteLesson) {
      this.currentLesson = lastIncompleteLesson;
      this.scrollToCurrentLesson(lastIncompleteLesson.id);
    } else {
      // Fallback to first available lesson
      for (const module of this.modules) {
        for (const lesson of module.lessons) {
          if (!lesson.isLocked) {
            this.currentLesson = lesson;
            this.scrollToCurrentLesson(lesson.id);
            return;
          }
        }
      }
    }
  }

  // Lesson navigation
  selectLesson(lessonId: string) {
    for (const module of this.modules) {
      const lesson = module.lessons.find((l) => l.id === lessonId);
      if (lesson && !lesson.isLocked) {
        this.currentLesson = lesson;

        // Reset quiz state when changing lessons
        this.resetQuizState();

        // Update URL without reloading
        this.router.navigate(['/course-learning', this.course?.id, lessonId], {
          replaceUrl: true,
        });

        // Auto close sidebar on mobile after lesson selection
        if (window.innerWidth <= 768) {
          this.isSidebarCollapsed = true;
        }

        // Scroll to current lesson in sidebar
        this.scrollToCurrentLesson(lessonId);
        break;
      }
    }
  }

  private scrollToCurrentLesson(lessonId: string) {
    // Use setTimeout to ensure DOM is updated
    setTimeout(() => {
      const lessonElement = document.querySelector(`[data-lesson-id="${lessonId}"]`);
      if (lessonElement) {
        const sidebarContent = document.querySelector('.sidebar-content');
        if (sidebarContent) {
          const lessonTop = (lessonElement as HTMLElement).offsetTop;
          const sidebarHeight = sidebarContent.clientHeight;
          const lessonHeight = (lessonElement as HTMLElement).offsetHeight;
          
          // Calculate scroll position to center the lesson in the sidebar
          const scrollTop = lessonTop - (sidebarHeight / 2) + (lessonHeight / 2);
          
          sidebarContent.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          });
        }
      }
    }, 100);
  }

  private resetQuizState() {
    this.quizStarted = false;
    this.currentQuestionIndex = 0;
    this.quizCompleted = false;
    this.quizScore = 0;
    this.showExplanation = false;
  }

  nextLesson() {
    if (!this.currentLesson) return;

    let found = false;
    for (const module of this.modules) {
      for (const lesson of module.lessons) {
        if (found && !lesson.isLocked) {
          this.selectLesson(lesson.id);
          return;
        }
        if (lesson.id === this.currentLesson.id) {
          found = true;
        }
      }
    }
  }

  previousLesson() {
    if (!this.currentLesson) return;

    let previousLesson: Lesson | null = null;
    for (const module of this.modules) {
      for (const lesson of module.lessons) {
        if (lesson.id === this.currentLesson.id && previousLesson) {
          this.selectLesson(previousLesson.id);
          return;
        }
        if (!lesson.isLocked) {
          previousLesson = lesson;
        }
      }
    }
  }

  markLessonComplete() {
    if (!this.currentLesson || this.currentLesson.isCompleted) return;

    this.currentLesson.isCompleted = true;

    // Unlock next lesson
    let found = false;
    for (const module of this.modules) {
      for (const lesson of module.lessons) {
        if (found && lesson.isLocked) {
          lesson.isLocked = false;
          break;
        }
        if (lesson.id === this.currentLesson.id) {
          found = true;
        }
      }
    }

    // Update course progress
    if (this.course) {
      this.course.completedLessons++;
      this.course.progress = Math.round(
        (this.course.completedLessons / this.course.totalLessons) * 100
      );

      if (this.course.completedLessons >= this.course.totalLessons) {
        this.course.status = 'completed';
      } else if (this.course.status === 'not-started') {
        this.course.status = 'in-progress';
      }
    }
  }

  // UI Controls
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;

    if (this.isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  changePlaybackSpeed(speed: number) {
    this.playbackSpeed = speed;
    // In real app, this would control video playback speed
  }

  // Navigation
  goBack() {
    this.location.back();
  }

  goToCourseDetail() {
    if (this.course) {
      this.router.navigate(['/course-detail', this.course.id]);
    }
  }

  goToMyCourses() {
    this.router.navigate(['/my-courses']);
  }

  // Utility methods
  getModuleProgress(module: CourseModule): number {
    const completedLessons = module.lessons.filter((l) => l.isCompleted).length;
    return Math.round((completedLessons / module.lessons.length) * 100);
  }

  getCurrentModuleAndLesson(): {
    module: CourseModule | null;
    lessonIndex: number;
  } {
    if (!this.currentLesson) return { module: null, lessonIndex: -1 };

    for (const module of this.modules) {
      const index = module.lessons.findIndex(
        (l) => l.id === this.currentLesson?.id
      );
      if (index !== -1) {
        return { module, lessonIndex: index };
      }
    }
    return { module: null, lessonIndex: -1 };
  }

  getLessonIcon(type: string): string {
    switch (type) {
      case 'video':
        return 'bi-play-circle';
      case 'reading':
        return 'bi-file-text';
      case 'quiz':
        return 'bi-question-circle';
      case 'assignment':
        return 'bi-clipboard-check';
      default:
        return 'bi-circle';
    }
  }

  getLessonTypeColor(type: string): string {
    switch (type) {
      case 'video':
        return 'text-primary';
      case 'reading':
        return 'text-success';
      case 'quiz':
        return 'text-warning';
      case 'assignment':
        return 'text-info';
      default:
        return 'text-muted';
    }
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
      this.currentLesson.questions.forEach((q) => {
        q.userAnswer = undefined;
        q.isCorrect = undefined;
      });
    }
  }

  startQuizFullscreen() {
    if (this.course && this.currentLesson) {
      // Navigate to dedicated quiz page
      this.router.navigate(['/quiz', this.course.id, this.currentLesson.id]);
    }
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
    this.quizScore = this.currentLesson.questions.filter(
      (q) => q.isCorrect
    ).length;

    // Mark lesson as complete if score is >= 70%
    const passingScore = Math.ceil(this.currentLesson.questions.length * 0.7);
    if (this.quizScore >= passingScore) {
      this.markLessonComplete();
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
    return Math.round(
      ((this.currentQuestionIndex + 1) / this.currentLesson.questions.length) *
        100
    );
  }

  getScorePercentage(): number {
    if (!this.currentLesson?.questions || this.quizScore === 0) return 0;
    return Math.round(
      (this.quizScore / this.currentLesson.questions.length) * 100
    );
  }

  getScoreColor(): string {
    const percentage = this.getScorePercentage();
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-danger';
  }
}

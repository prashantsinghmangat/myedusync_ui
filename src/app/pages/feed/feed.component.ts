import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { catchError, of, tap,finalize } from 'rxjs';
import { ApiError } from '../../core/models/api.model';
import { PostsService } from '../../core/services/posts.service';
import { UserService } from '../../core/services/user.service';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { FeedMenuComponent } from './components/feed-menu/feed-menu.component';
import { RouterModule } from '@angular/router';

type Board = 'CBSE' | 'ICSE' | 'UPBoard';

interface DataStructure {
  classes: number[];
  subjects: {
    [key: number]: string[];
  };
}

@Component({
  selector: 'til-feed',
  standalone: true,
  imports: [CommonModule, FeedItemComponent, FeedMenuComponent, RouterModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent {

  readonly loadingPostsSig = signal(false);

  data: Record<Board, DataStructure> = {
    CBSE: this.createDataStructure(),
    ICSE: this.createDataStructure(),
    UPBoard: this.createDataStructure(),
  };

  boards: Board[] = Object.keys(this.data) as Board[];
  classes: number[] = [];
  subjects: string[] = [];
  postData: any;
  selectedBoard: Board | null = null;
  selectedClass: number | null = null;
  selectedSubject: string | null = null;

  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UserService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.getAllNotes();
  }

  onBoardChange(event: Event): void {
    const board = (event.target as HTMLSelectElement).value as Board;
    this.selectedBoard = board;
    this.classes = this.data[board]?.classes || [];
    this.selectedClass = null;
    this.subjects = [];
    this.getAllNotes();
  }

  onClassChange(event: Event): void {
    const selectedClass = +(event.target as HTMLSelectElement).value;
    this.selectedClass = selectedClass;
    if (this.selectedBoard) {
      this.subjects = this.data[this.selectedBoard]?.subjects[selectedClass] || [];
      this.getAllNotes();
    }
  }

  onSubjectChange(event: Event): void {
    const subject = (event.target as HTMLSelectElement).value;
    this.selectedSubject = subject;
    this.getAllNotes();
  }

  private getAllNotes(): void {
    this.loadingPostsSig.set(true);
    this.postsService.getAllNotesWordpress().pipe(
      tap((posts) => {
        this.postData = posts;
        this.cdr.markForCheck(); // Trigger change detection manually
      }),
      catchError((error: ApiError) => {
        console.error("Error fetching posts: ", error);
        return of(error);
      }),
      finalize(() => {
        this.loadingPostsSig.set(false);
      })
    ).subscribe();
  }

  private createDataStructure(): DataStructure {
    return {
      classes: [8, 9, 10, 11, 12],
      subjects: {
        8: ['Hindi', 'English', 'Maths', 'Science'],
        9: ['Hindi', 'English', 'Maths', 'Science'],
        10: ['Hindi', 'English', 'Maths', 'Science'],
        11: ['Physics', 'Chemistry', 'Maths', 'Biology'],
        12: ['Physics', 'Chemistry', 'Maths', 'Biology'],
      },
    };
  }
}

// import { CommonModule } from '@angular/common';
// import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { catchError, of, tap } from 'rxjs';
// import { ApiError } from '../../core/models/api.model';
// import { PostsService } from '../../core/services/posts.service';
// import { UserService } from '../../core/services/user.service';
// import { FeedItemComponent } from './components/feed-item/feed-item.component';
// import { FeedMenuComponent } from './components/feed-menu/feed-menu.component';

// import { RouterModule } from '@angular/router';

// type Board = 'CBSE' | 'ICSE' | 'UPBoard';

// interface DataStructure {
//   classes: number[];
//   subjects: {
//     [key: number]: string[];
//   };
// }

// @Component({
//   selector: 'til-feed',
//   standalone: true,
//   imports: [CommonModule, FeedItemComponent, FeedMenuComponent, RouterModule],
//   templateUrl: './feed.component.html',
//   styleUrls: ['./feed.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class FeedComponent {
//   data: Record<Board, DataStructure> = {
//     CBSE: {
//       classes: [8, 9, 10, 11, 12],
//       subjects: {
//         8: ['Hindi', 'English', 'Maths', 'Science'],
//         9: ['Hindi', 'English', 'Maths', 'Science'],
//         10: ['Hindi', 'English', 'Maths', 'Science'],
//         11: ['Physics', 'Chemistry', 'Maths', 'Biology'],
//         12: ['Physics', 'Chemistry', 'Maths', 'Biology'],
//       },
//     },
//     ICSE: {
//       classes: [8, 9, 10, 11, 12],
//       subjects: {
//         8: ['Hindi', 'English', 'Maths', 'Science'],
//         9: ['Hindi', 'English', 'Maths', 'Science'],
//         10: ['Hindi', 'English', 'Maths', 'Science'],
//         11: ['Physics', 'Chemistry', 'Maths', 'Biology'],
//         12: ['Physics', 'Chemistry', 'Maths', 'Biology'],
//       },
//     },
//     UPBoard: {
//       classes: [8, 9, 10, 11, 12],
//       subjects: {
//         8: ['Hindi', 'English', 'Maths', 'Science'],
//         9: ['Hindi', 'English', 'Maths', 'Science'],
//         10: ['Hindi', 'English', 'Maths', 'Science'],
//         11: ['Physics', 'Chemistry', 'Maths', 'Biology'],
//         12: ['Physics', 'Chemistry', 'Maths', 'Biology'],
//       },
//     },
//   };

//   boards = Object.keys(this.data) as Board[];
//   classes: number[] = [];
//   subjects: string[] = [];
//   postData: any;
//   selectedBoard: Board | null = null;
//   selectedClass: number | null = null;
//   selectedSubject: string | null = null;


//   constructor(
//     private readonly postsService: PostsService,
//     private readonly userService: UserService,
//   ) {
//     // this.getAllNotes(this.selectedBoard, this.selectedClass, this.selectedSubject);
//     this.getAllNotes();
//   }

//   onBoardChange(event: Event) {

//     const board = (event.target as HTMLSelectElement).value as Board;
//     this.selectedBoard = board;
//     console.log("board selected: ", this.selectedBoard);
//     this.classes = this.data[board]?.classes ?? [];
//     this.selectedClass = null;
//     this.subjects = [];

//     // this.getAllNotes(this.selectedBoard, this.selectedClass, this.selectedSubject);
//     this.getAllNotes();
//   }

//   onClassChange(event: Event) {

//     const selectedClass = +(event.target as HTMLSelectElement).value;
//     this.selectedClass = selectedClass;
//     console.log("class selected: ", this.selectedClass);
//     if (this.selectedBoard) {
//       this.subjects = this.data[this.selectedBoard]?.subjects[selectedClass] ?? [];
//       // this.getAllNotes(this.selectedBoard, this.selectedClass, this.selectedSubject);
//       this.getAllNotes();
//     }
//   }

//   onSubjectChange(event: Event) {
//     const subject = (event.target as HTMLSelectElement).value;
//     this.selectedSubject = subject;
//     console.log("subject selected: ", this.selectedSubject);
//     // this.getAllNotes(this.selectedBoard, this.selectedClass, this.selectedSubject);
//     this.getAllNotes();
//   }

//   // private getAllNotes(board: any, classdata: any, subject: any): void {
//   private getAllNotes(): void {
//     // this.postsService.getAllNotes(board, classdata, subject).pipe(
//     this.postsService.getAllNotesWordpress().pipe(
//       tap((posts) => {
//         console.log("API response: ", posts);
//         this.postData = posts;

//       }),
//       catchError((error: ApiError) => {
//         console.error("Error fetching posts: ", error);
//         return of(error);
//       }),
//     ).subscribe();
//   }

// }

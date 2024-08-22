import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { catchError, finalize, of, take, tap } from 'rxjs';
import {
  ApiError,
  ApiPreviewPost,
  ApiPreviewPosts,
  ApiStatistics,
  ApiUserStatistics,
} from '../../core/models/api.model';
import { PostsService } from '../../core/services/posts.service';
import { UserService } from '../../core/services/user.service';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { FeedMenuComponent } from './components/feed-menu/feed-menu.component';

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
  imports: [CommonModule, FeedItemComponent, FeedMenuComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent {
  data: Record<Board, DataStructure> = {
    CBSE: {
      classes: [8, 9, 10, 11, 12],
      subjects: {
        8: ['Hindi', 'English', 'Maths', 'Science'],
        9: ['Hindi', 'English', 'Maths', 'Science'],
        10: ['Hindi', 'English', 'Maths', 'Science'],
        11: ['Physics', 'Chemistry', 'Maths', 'Biology'],
        12: ['Physics', 'Chemistry', 'Maths', 'Biology'],
      },
    },
    ICSE: {
      classes: [8, 9, 10, 11, 12],
      subjects: {
        8: ['Hindi', 'English', 'Maths', 'Science'],
        9: ['Hindi', 'English', 'Maths', 'Science'],
        10: ['Hindi', 'English', 'Maths', 'Science'],
        11: ['Physics', 'Chemistry', 'Maths', 'Biology'],
        12: ['Physics', 'Chemistry', 'Maths', 'Biology'],
      },
    },
    UPBoard: {
      classes: [8, 9, 10, 11, 12],
      subjects: {
        8: ['Hindi', 'English', 'Maths', 'Science'],
        9: ['Hindi', 'English', 'Maths', 'Science'],
        10: ['Hindi', 'English', 'Maths', 'Science'],
        11: ['Physics', 'Chemistry', 'Maths', 'Biology'],
        12: ['Physics', 'Chemistry', 'Maths', 'Biology'],
      },
    },
  };

  boards = Object.keys(this.data) as Board[];
  classes: number[] = [];
  subjects: string[] = [];
  postData: any;
  selectedBoard: Board | null = null;
  selectedClass: number | null = null;
  selectedSubject: string | null = null;

  readonly postsSig = signal<ApiPreviewPost[]>([]);
  readonly userStatsSig = signal<ApiUserStatistics | null>(null);
  readonly globalStatsSig = signal<ApiStatistics | null>(null);
  readonly loadingPostsSig = signal(false);
  readonly loadingUserStatsSig = signal(false);
  readonly loadingGlobalStatsSig = signal(false);

  private triggerId: number | null = null;
  private hasMore = true;
  private readonly limit = 10;

  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UserService,
  ) {
    this.getAllNotes();
    // this.loadPosts();
    // this.loadStats();
  }

  onBoardChange(event: Event) {
    const board = (event.target as HTMLSelectElement).value as Board;
    this.selectedBoard = board;
    this.classes = this.data[board]?.classes ?? [];
    this.selectedClass = null;
    this.subjects = [];
  }

  onClassChange(event: Event) {
    const selectedClass = +(event.target as HTMLSelectElement).value;
    this.selectedClass = selectedClass;
    if (this.selectedBoard) {
      this.subjects = this.data[this.selectedBoard]?.subjects[selectedClass] ?? [];
    }
  }

  onSubjectChange(event: Event) {
    const subject = (event.target as HTMLSelectElement).value;
    this.selectedSubject = subject;
  }

  loaded(id: number) {
    if (this.triggerId === id) {
      this.loadPosts(this.postsSig().length);
    }
  }

 
  private getAllNotes(): void {
    this.loadingPostsSig.set(true);

    this.postsService.getAllNotes().pipe(
      tap((posts) => {
        console.log("API response: ", posts);
        this.postData = posts;
        const postsResponse = posts as ApiPreviewPosts;
        this.postsSig.update((oldPosts) => [
          ...oldPosts,
          ...postsResponse.posts,
        ]);

        this.triggerId = postsResponse.posts[postsResponse.posts.length - 1]?.postId;
        this.hasMore = postsResponse.hasMore;
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
  private loadPosts = (offset = 0) => {
    if (!this.hasMore) return;
    this.loadingPostsSig.set(true);
    this.postsService
      .getPosts(this.limit, offset)
      .pipe(
        tap((posts) => {
          const postsResponse = posts as ApiPreviewPosts;
          this.postsSig.update((oldPosts) => [
            ...oldPosts,
            ...postsResponse.posts,
          ]);
          this.triggerId =
            postsResponse.posts[postsResponse.posts.length - 1]?.postId;
          this.hasMore = postsResponse.hasMore;
          this.loadingPostsSig.set(false);
        }),
        catchError((e: ApiError) => {
          return of(e);
        }),
      )
      .subscribe();
  };

  private loadStats() {
    this.loadingUserStatsSig.set(true);
    this.loadingGlobalStatsSig.set(true);
    this.userService
      .getUserStatistics()
      .pipe(
        take(1),
        tap((res) => {
          if ('isError' in res) return;
          this.userStatsSig.set(res);
          this.loadingUserStatsSig.set(false);
        }),
      )
      .subscribe();

    this.postsService
      .getStatistics()
      .pipe(
        take(1),
        tap((res) => {
          if ('isError' in res) return;
          this.globalStatsSig.set(res);
          this.loadingGlobalStatsSig.set(false);
        }),
      )
      .subscribe();
  }
}

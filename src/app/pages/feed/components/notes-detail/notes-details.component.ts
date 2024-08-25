import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'notes-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesDetailComponent implements OnInit {

  noteData: any;

  constructor(
    private route: ActivatedRoute,
    private readonly postsService: PostsService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('id');
    console.log('slug: ', slug);
    if (slug) {
      this.getAllNotes(slug);
    }
  }

  private getAllNotes(slug: any): void {
    this.postsService.getNotesDetail(slug).pipe(
      tap((posts) => {
        console.log('note response: ', posts);
        this.noteData = posts;

        // Manually trigger change detection after data is updated
        this.cdr.detectChanges();
      })
    ).subscribe();
  }
}
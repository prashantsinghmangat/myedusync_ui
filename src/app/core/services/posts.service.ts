import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ApiPost,
  ApiPreviewPosts,
  ApiStatistics,
  ApiUser,
} from '../models/api.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  readonly user$: BehaviorSubject<ApiUser | null> =
    new BehaviorSubject<ApiUser | null>(null);

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlerService,
  ) { }

  createPost(body: { content: string; title: string }) {
    return this.http
      .post<void>(`${environment.baseUrl}/api/posts/create`, body)
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  getAllNotes(board: any, classdata: any, subject: any) {
    return this.http.get<ApiPreviewPosts>(`${environment.awsbaseUrl}/all-notes/?page=0&limit=10&board=${board}&class=${classdata}&subject=${subject}`,)
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  getAllNotesWordpress() {
    return this.http.get<any>(`${environment.wordpressUrl}?_embed&per_page=12`,)
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  getNotesDetail(slug: any) {
    return this.http.get<any>(`${environment.wordpressUrl}?_embed&slug=${slug}`)
      .pipe(
        map((response: any) => {
          const blog = response[0];
          if (!blog) {
            throw new Error('Blog not found');
          }
          // Check if `_embedded` and `wp:featuredmedia` exist and have at least one item
          const featureImage = blog._embedded && blog._embedded['wp:featuredmedia']
            ? blog._embedded['wp:featuredmedia'][0]?.source_url || '' : '';
          return {
            id: blog.id,
            title: blog.title?.rendered || 'No Title',
            content: blog.content?.rendered || 'No Content',
            date: new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            slug: blog.slug || '',
            featureImage: featureImage
          };
        }),
        catchError((e) => this.errorHandlingService.handleError(e)) // Correctly placed catchError
      );
  }
  getPosts(limit: number, offset: number) {
    return this.http.get<ApiPreviewPosts>(`${environment.baseUrl}/api/posts/preview?limit=${limit}&offset=${offset}`,)
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  getStatistics() {
    return this.http
      .get<ApiStatistics>(`${environment.baseUrl}/api/posts/statistics`)
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  getPost(id: string) {
    return this.http
      .get<ApiPost>(`${environment.baseUrl}/api/posts/getFull?id=${id}`)
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  likePost(id: string) {
    return this.http
      .post<void>(`${environment.baseUrl}/api/posts/like`, { postId: id })
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  public subscription: Subscription | any;
  public comments: Comment[] | any;
  public isAdmin: boolean = false;
  public userId: number | undefined;
  public focused: boolean;
  public flavorId: number | undefined;
  public token: string | undefined;
  public commentForm: FormGroup = new FormGroup({
    text: new FormControl(''),
    flavorId: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.focused = false;
  }

  ngOnInit(): void {
    var auxtoken = localStorage.getItem('Token');
    if (auxtoken != undefined && auxtoken != '') {
      this.token = auxtoken;
      this.authService.getUser().subscribe((result) => {
        this.isAdmin = result.admin;
        this.userId = result.username;
      });
    }
    this.subscription = this.route.params.subscribe((params) => {
      this.flavorId = +params['id'];
      this.getAllComments(this.flavorId);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get text(): AbstractControl | null {
    return this.commentForm.get('text');
  }

  public getAllComments(id: any): void {
    this.commentsService.getComments(id).subscribe((result) => {
      this.comments = result;
    });
  }

  public postComment(): void {
    this.commentForm.patchValue({ flavorId: this.flavorId });
    const body = this.commentForm.value;
    var response = this.commentsService
      .postComment(body)
      .subscribe((result) => {
        this.focused = false;
        this.getAllComments(this.flavorId);
      });
  }

  public goToLogin(): void {
    this.router.navigate(['auth/login']);
  }

  public deleteComment(commentId: number): void {
    var response = this.commentsService
      .deleteComment(commentId)
      .subscribe((result) => {
        this.getAllComments(this.flavorId);
      });
  }
}

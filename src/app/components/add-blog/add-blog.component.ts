import { Router } from "@angular/router";
import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { ApiService } from "../../shared/api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: "app-add-blog",
  templateUrl: "./add-blog.component.html",
  styleUrls: ["./add-blog.component.css"],
})
export class AddBlogComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild("chipList", { static: true }) chipList;
  @ViewChild("resetBlogForm", { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  blogForm: FormGroup;
  submitted = false;
  titleChange = false;
  contentChange = false;
  authorChange = false;

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private blogApi: ApiService
  ) {}

  get f() {
    return this.blogForm.controls;
  }

  onTitleChange() {
    this.titleChange = true;
  }

  onAuthorChange() {
    this.authorChange = true;
  }

  onContentChange() {
    this.contentChange = true;
  }

  /* Reactive book form */
  submitBookForm() {
    this.blogForm = this.fb.group({
      blog_title: ["", { validators: [Validators.required] }],
      blog_content: ["", { validators: [Validators.required] }],
      blog_author: ["", { validators: [Validators.required] }],
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.blogForm.controls[controlName].hasError(errorName);
  };

  /* Submit book */
  submitBlogForm() {
    this.submitted = true;

    if (this.blogForm.valid) {
      this.blogApi.AddBlog(this.blogForm.value).subscribe((res) => {
        this.ngZone.run(() => this.router.navigateByUrl("/view-blogs"));
      });
    }
  }
}

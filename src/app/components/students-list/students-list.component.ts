import { Student } from "./../../shared/student";
import { ApiService } from "./../../shared/api.service";
import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.css"],
})
export class StudentsListComponent implements OnInit {
  BlogData: any = [];
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "_id",
    "blog_title",
    "blog_content",
    "blog_author",
  ];

  constructor(private blogApi: ApiService) {
    this.blogApi.GetBlogs().subscribe((data) => {
      this.BlogData = data;
      this.dataSource = new MatTableDataSource<Student>(this.BlogData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() {}
}

import { Blog } from "../../shared/blog";
import { ApiService } from "../../shared/api.service";
import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-blogs-list",
  templateUrl: "./blogs-list.component.html",
  styleUrls: ["./blogs-list.component.css"],
})
export class BlogsListComponent implements OnInit {
  BlogData: any = [];
  dataSource: MatTableDataSource<Blog>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ["blog_title", "blog_content", "blog_author"];
  faUser = faUser;

  constructor(private blogApi: ApiService) {
    this.blogApi.GetBlogs().subscribe((data) => {
      this.BlogData = data;
      this.dataSource = new MatTableDataSource<Blog>(this.BlogData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() {}
}

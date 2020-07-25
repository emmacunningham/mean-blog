import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddBlogComponent } from "./components/add-blog/add-blog.component";
// import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { BlogsListComponent } from "./components/blogs-list/blogs-list.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "view-blogs" },
  { path: "add-blog", component: AddBlogComponent },
  // { path: 'edit-blog/:id', component: EditBlogComponent },
  { path: "view-blogs", component: BlogsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

# Steps to creating blog project

## Install dependencies for running the project locally

- [install Homebrew](https://brew.sh/) - package manage for OS X, follow instructions at the top
- [install mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
  - `brew tap mongodb/brew` - gets the "tap" for mongo
  - `brew install mongodb-community@4.2` - installs the specific version of mongo
  - `brew services start mongodb-community@4.2` - starts mongo instance running locally on your machine
- install Nodejs and npm - will be used to manage the packages for the project as well as run the backend code
  - `brew install node` - this should install both nodejs and npm
- install the project dependencies
  - from the root directory of the project `npm install`

## Running the project locally for viewing the project

(all commands are run from the root directory of the project)

- build the front-end assets
  - `npm run build`
- run the server
  - `npm run dev:server`
  - visit `localhost:8080` in a browser and the app should load

## Running the project locally for developing the project

(all commands are run from the root directory of the project)

- run the server
  - `npm run dev:server`
  - visit `localhost:8080` in a browser and the app should load
- run the angular front-end in development mode
  - `npm run dev:client` - this will re-build any changes you make when saving a file
  - update the endpoint in `/src/app/shared/api.service.ts` from `/api` to `http://localhost:8080/api` (make sure you undo this change before deployment)

## Overview of changes

- Database: Update model to store blog resource
  - Create `/backend/model/Blog.js` file
- Backend: Create routes for blog
  - Create `/backend/routes/student.route.js` file
  - Create routes for `GET /` (gets all the blogs) and `POST /add-blog` (creates a new blog)
  - Update `/backend/app.js` to use the Blog router instead of the Student router
  - Remove any other references to Students in backend end
- Frontend: Update frontend to work with Blog resource instead of Student
  - Make API service for Blog, not Student
    - Create `/src/app/shared/Blog.ts`
    - Update `/src/app/shared/api.service.ts` to use Blog instead of Student
  - Remove any other references to Students in frontend code
  - Styling to match https://blogs.exploringtech.org/blogs
    - Use DevTools to inspect color, font, etc. details
- Deployment:
  - Create GitHub repository
  - Create Heroku account
  - Setup [Mongo Cloud Atlas](https://www.mongodb.com/cloud/atlas) account for remote Mongo DB
  - Productionize the app
    - Update the host name in `/src/app/shared/api.service.ts` to `/api` instead of `/localhost`
    - Move `backend/app.js` to project root for Heroku deployment
    - Set mongodb host as environment variable in db config to connect to cloud atlas
  - Deploy to Heroku by:
    - Connecting Heroku to GitHub account & repository
    - Pushing code to a specific GitHub branch
    - Setting up manual or automatic deploys from a GitHub branch in Heroku

## Useful tools for debugging

- Postman REST client for testing API endpoints
- Browser DevTools for frontend changes

## Understanding project components

- tooling & package management:
  - homebrew
  - npm
  - typescript
  - git
- backend:
  - nodejs
    - require
  - express
  - mongo
  - HTTP requests
- frontend:
  - angular

## Application overview

The server is performing two main functions:

- hosting the backend API (which is used to get data from the database and serve it to the front end)
- serving the static frontend assets (created by compiling the angular applications)

The database is running in a separate server process. Locally, the database is running on a separate port on our local development machine, while on the production Heroku instance, we connect to the Mongo Cloud Atlas instance.

### Why angular?

Angular is one of many front-end frameworks whose primary purpose is to simplify and organize developing stateful apps. Without using a framework for front-end development, we'd be writing vanilla JavaScript to manage interactions in a document (structured by HTML and styled by CSS). Many simple front-end projects don't need frameworks, but as projects grow and there is an increase of complex functionality (especially stateful functionality), frameworks provide structure and modularity that allows a project to grow in a way that encourages code re-use and the minimizing of unintended side-effects.

In front-end applications, we use the term _state_ to refer to information that must be tracked as users move through the application and that may change in response to user interactions. For example, consider the social media application Twitter: when one first goes to the main landing page for Twitter and has yet to log in, there are certain things they are blocked from doing and seeing (personal feed, messages, profile, etc.); once they're logged in, they are granted access to this additional functionality. The user's log in status is one piece of information tracked as the application's state.

### Overview of angular project structure

The overall structure of an angular project:

    .
    ├── node_modules
    ├── src
        ├── app
            ├── components
            ├── shared
        ├── app-routing.module.ts
        ├── app.component.css
        ├── app.component.html
        ├── app.component.ts
        ├── app.module.ts
    ├── package.json

- `node_modules` contains the install project dependencies (any libraries, packages, etc.); these is the directory where packages are installed to when running `npm install`
- `src` contains most of the angular-specific project code
  - `app-routing.module.ts` contains the routing configuration for the front-end (different from the backend router); it's defined by associated a path (what the URL of the route is) with a specific angular component (defined within components)
  - `app.component.css` contains the styling for the entire application
  - `app.component.html` contains the structure for the entire application (allowing us to share things like a header across all pages)
  - `app.component.ts` contains the JS that may be needed across the entire application
  - `components` directory consists of individual components which can be shared and used across the entire application (see below for explanation on angular components)
  - `shared` contains any code that may be useful to use across multiple components; for example, this is where API connection services live (used to communicate to backend APIs)
- `package.json` contains information used by npm to determine which dependencies to install (in `dependencies`), define common scripts which can be used during development and deployment (in `scripts`), and other configurations for the project as a whole

### Angular components

Angular components comprise of:

- css: this is where the styling for the component is put. this allows components to have specific styles written just for the component.
- html template: this is where the structure for the component is defined. the template is written using html, with the additional ability to reference dynamic values defined in the `.ts` file
- ts: this is where the dynamic functionality of the component is defined. the `.ts` stands for TypeScript, an extension of vanilla JavaScript that adds static types and allows for compile-time type-checking.

The power of angular comes through in how it allows developers to define values and methods in TypeScript/JavaScript and have those values and methods be accessible within a component's template, reducing the need for explicitly accessing DOM nodes as one would traditionally do in front-end development.

For example, let's take a look at the `blogs-list` component. Below is a simplified version of `blogs-list.component.ts`:

```
export class BlogsListComponent implements OnInit {
  BlogData: any = [];

  constructor(private blogApi: ApiService) {
    this.blogApi.GetBlogs().subscribe((data) => {
      this.BlogData = data;
    });
  }

  ngOnInit() {}
}
```

In the above code, we define a data structure `BlogData` first to the empty array, and then to the results of the call to the API (the code within `constructor` method will be called as soon as the component is loaded). The API method is defined in `shared/api.service.ts`. The `BlogData` property is crucial to define, as that's what we'll use in the component's template.

The code below comes from `blogs-list.component.html`. Note where we reference `BlogData`:

```
<div class="blogs-page">
  <p *ngIf="BlogData.length <= 0" class="no-data">
    There is no blog added yet!
  </p>

  <div class="container blogs-container" *ngIf="BlogData.length > 0">
    <div *ngFor="let item of BlogData" class="blog-container">
      <h3 class="blog-title">{{ item.blog_title }}</h3>
      <div class="blog-author">
        <fa-icon [icon]="faUser" class="user-icon"></fa-icon>
        <span class="blog-author-text"> {{ item.blog_author }} </span>
      </div>
      <p class="blog-content">{{ item.blog_content }}</p>
    </div>
  </div>
</div>
```

In addition to being able to reference the `BlogData` variable in the template, angular also extends ordinary HTML by providing special attributes that can be used for performing logic using the data we have access to. `*ngIf="BlogData.length <= 0"` in the first `<p>` tag, for example, will apply logic to that HTML element such that it will only be rendered if the length of the `BlogData` array is 0 or less. The `*ngFor="let item of BlogData"` in the `blog-container` element sets up a container that will iterate over each item of the `BlogData` array; this is equivalent to setting up a `for`-loop.

## Using Git

### Command line

To clone a repository:

- `git clone` + repository path (in GitHub: green Code button > text in Clone with SSH)

### Within VS Code

Select the icon on the left that corresponds to "Source Control" (looks like node branching)

Creating a commit:

- Press the + button on individual files to add changes to a commit
- Enter a commit message in the text field at the top
- Press the check mark at the top

To push to the remote repository:

- Click on the ... at the top
- Select "Push to..." and select "origin"

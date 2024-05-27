# PLW's Personal Express Boilerplate

Using my personal stack choice that _I think_ is the best for serving server-side rendered web apps.

## Tech Stack

This project uses a selection of libraries to achieve its needs. Have a peek at `package.json`.

### Server stack
  - **Express**, the core.  
    > As basic as it gets. It's like JS' flask.
  - **Prisma** ORM, simplifying database management with TS support.  
    > Imagine SQLing with TS autocompletion. Nice, innit?
  - **Pug** template engine, a succinct templating engine.  
    > More like, I don't want to write an entire HTML boilerplate, lul.
  - **Zod**, both for verification and casting JS objects to be TS-friendly.  
    > Less `any`s and `unknown`s are always a good thing! It throws too as a bonus.
### Dev stack
  - **Typescript**.  
    >"The type is just a suggestion" idk bruh but I like my autocomplete.
  - **esbuild**, ultra fast TS compiler.  
    - **esbuild Node Externals** to make it not bundle everything _even Express itself..._
    - **esbuild Runner** for Jest.
    > Written in Go they said. I assume that it is a good thing.
  - **dotenv**, convert env variables to file. Convenient!  
    > Thank goodness it is gitignored. ...right?
  - **Jest**, the TDD bundle.
    - **Supertest** for simulating Express within test environment.
    > OK I admit that TDD saved me a couple times.
  - **Eslint** to Lint.
    > Make it pretty.
  - **Nodemon** for watching the main JS file and **Concurrently** for watching multiple things at once.

## Directory Structure

What each directory and file does.

- `build` is where the build output should go. Only exists after you built something (duh).
- `prisma` contains database schema. If you're using local SQLite, the database itself is also there.
- `coverage` for coverage report files, only exists after you run coverage command.
- `scripts` contains the esbuild build script, along with its settings.
- `static` contains CSS, JS and images (etc) ready to use by the client.
  - `styles`
  - `scripts`
  - `images`
- `views` contains Pug files.
- `src` Typescript goes here.
  - `context.ts` differentiates between test and run environment.
  - `test` the tests, heh. 
  - `main`
    - `routers` All the URL routes.
      - `_routers.ts` Sets up the route.
    - `services` The controller. Serving suggestion: each service handles only one route.
    - `types` Some types commonly used to pass data around. Contains exclusively .d.ts files.
    - `exceptions` contains practical Error classes that can be thrown around.

## Data Flow

Due to Express having no prescribed architecture, _I_ decided on how data should flow. And so I shall declare that this project roughly uses MVC architecture. Whenever you request a URL...

1. The data goes through the **router**. Sometimes the router just directly render a page if it is simple enough, but oftentimes it calls its corresponding service.
2. If needed, the router asks its corresponding **service**. As said before, each service corresponds to one router. Unlike router, service can access the database and session, for example.
3. The service may sometimes manipulate **Prisma Client**, the database interface. The reason I did not include Repository and Model like it is in Java is because directly manipulating the database allows you to build more efficient query.
4. After doing its thing, the router selects a suitable **view** and renders it to needs.
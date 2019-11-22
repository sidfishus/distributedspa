# distributedspa
Distributed isomorphic React single page application (SPA) hosted using .NET MVC Core 2.2 with seperate client, API, and identity server applications.

The purpose of this is to provide a template for modern web applications. Developed using Chrome, and tested on IE and Edge browsers. Developed using the Microsoft Visual Code IDE and includes integrated build and debugging tasks.

There is a video by the Identity Server 4 creators that is available on YouTube that describes authentication and the distributed model used in this project: https://www.youtube.com/watch?edufilter=NULL&v=eF2myGRT8bo.

Projects:

Client: A modern Javascript React SPA which calls a protected external web API. When not logged in redirects to the identity server for logging in. Incorporating a .NET and Node server backend, and a Javascript client.
  
Features:
  - ASP .NET MVC Core 2.2 for hosting the static front end files.
  - Server side pre-rendering leveraging Microsoft SPA Services.
  - Webpack and Babel for compiling and bundling Javascript files including the object spread syntax plugin.
  - React version 16.12.
  - Hot module replacement (live page reloading upon changes) provided by the React hot loader (https://github.com/gaearon/react-hot-loader).
  - Flow for static type checking.
  - Interfaces with the identity server via the OIDC client provided by Identity Server 4.
  - React UI theme and controls provided by React Bootstrap: (https://react-bootstrap.github.io/).
  - React router for client-side routing and navigation.
  - Axios for asynchronous web requests.
  - No Redux but this can be added easily.
  
To execute:
  - 'dotnet run' within a command prompt window.
  
To debug:
  - Use the 'Client' debug task to debug the .NET server side code.
  - To debug the server side Javascript code you can use the dedicated tools for Node inside the Chrome browser 'chrome://inspect' feature.
  - The client-side code can be debugged within the browser. The application features code mapping (via Webpack) that allows the original source code (not the final transpiled version) to be debugged.


API: A .NET MVC Core web API application with a test controller and a protected API method which can only be accessed by an authenticated user with a 'IsAdmin' claim. This project features no client-side code.

Features:
  - ASP .NET MVC Core 2.2.
  - Bearer authentication.
  - Identity Server 4 authentication.
  
To execute:
  - 'dotnet run' within a command prompt window.
  - Use the 'API' debug task.
  
To debug:
  - Use the 'API' debug task to debug this.


IdentityServer: A .NET MVC Core web application which provides authentication and authorisation to the rest of the application via Identity Server 4 (http://docs.identityserver.io/en/latest/). Login and consent is captured via a Javascript React SPA.

Features:
  - ASP .NET MVC Core 2.2.
  - Server side pre-rendering by leveraging the Microsoft SPA Services.
  - Entity Framework for identity server storage.
  - Microsoft Sqlite as the underlying database technology.
  - Semantic UI React UI theme and controls.
  - Typescript for static type checking and integration with Webpack/Babel.
  - Webpack and Babel for compiling and bundling Javascript files including the object spread syntax plugin.
  - React version 16.12.
  - Hot module replacement (live page reloading upon changes) provided by the React hot loader (https://github.com/gaearon/react-hot-loader).
  
  
TODO: Initial setup
  - DB migration.
  - change the URL's.
  - SSL errors.

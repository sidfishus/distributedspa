# distributedspa
Distributed isomorphic React SPA hosted using .NET MVC Core 2.2 with seperate client, API, and identity server applications.

The purpose of this is to provide a template for modern web applications..

Projects:

- Client: A modern Javascript React SPA which calls a protected external web API. When not logged in redirects to the identity server.
  
Features:
  - ASP .NET MVC Core 2.2 for hosting the static files.
  - Server side pre-rendering leveraging Microsoft SPA Services.
  - Webpack and Babel for compiling and bundling Javascript files.
  - React version 16.12.
  - Hot module replacement (live page reloading upon changes) provided by the React hot loader (https://github.com/gaearon/react-hot-loader).
  - Flow for static type checking.
  - Interfaces with the identity server via the OIDC client provided by Identity Server 4.
  - React UI theme and controls provided by React Bootstrap: (https://react-bootstrap.github.io/).
  - React router for client-side routing and navigation.
  - Axios for asynchronous web requests.

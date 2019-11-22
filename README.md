# distributedspa
A distributed isomorphic React single page application (SPA) hosted via .NET MVC Core 2.2 with seperate client, API, and identity server applications.

The purpose of this is to provide a template for modern web applications. Developed using Chrome, and tested on IE and Edge browsers. Developed using the Microsoft Visual Code IDE and includes integrated build and debugging tasks.

There is a video by the Identity Server 4 creators which is available on YouTube that describes authentication and the distributed model used in this project: https://www.youtube.com/watch?edufilter=NULL&v=eF2myGRT8bo.

Projects:

Client: A modern Javascript React SPA which calls a protected external web API. When not logged in the application redirects the user to the identity server for authentication. Incorporates a .NET and Node JS server backend, and a Javascript client application.
  
Features:
  - ASP .NET MVC Core 2.2 for hosting the static front end files.
  - Server side pre-rendering by leveraging the Microsoft SPA Services and Node JS.
  - Webpack and Babel for transpiling and bundling Javascript files, and includes the object spread syntax plugin.
  - React version 16.12.
  - Hot module replacement (web pages reload upon changes to the code) provided by the React hot loader (https://github.com/gaearon/react-hot-loader) and Microsoft SPA services.
  - Flow (https://flow.org/) for static type checking.
  - Interfaces with the identity server via the OIDC Javascript client provided by Identity Server 4.
  - React UI theme and controls provided by React Bootstrap: (https://react-bootstrap.github.io/).
  - React router for client-side routing and navigation.
  - Axios for asynchronous web requests.
  - No Redux but this would be simple to add.
  - Babel and core-js Javascript polyfills for use with older browsers.

To build:
  - Use the integrated build tasks.

To execute:
  - 'dotnet run' within a command prompt window.
  
To debug:
  - Use the 'Client' debug task to debug the .NET server side code.
  - To debug the server side Javascript code you can use the dedicated tools for Node inside the Chrome browser 'chrome://inspect' feature.
  - The client-side code can be debugged within the browser. The application features code mapping (via Webpack) that allows the original source code (not the final transpiled version) to be stepped.


API: A .NET MVC Core web API application that includes a test controller and a protected API method which can only be accessed by an authenticated user with a 'IsAdmin' claim. This project features no client-side code.

Features:
  - ASP .NET MVC Core 2.2.
  - Bearer authentication provided by Identity Server 4.
  
To build:
  - Use the integrated build tasks.
  
To execute:
  - 'dotnet run' within a command prompt window.
  - Use the 'API' debug task.
  
To debug:
  - Use the 'API' debug task to debug this.


IdentityServer: A .NET MVC Core web application which provides authentication and authorisation to the rest of the application via Identity Server 4 (http://docs.identityserver.io/en/latest/). Login and consent is captured via a Javascript React SPA.

Features:
  - ASP .NET MVC Core 2.2.
  - Server side pre-rendering by leveraging the Microsoft SPA Services and Node JS.
  - Entity Framework for identity server storage.
  - Microsoft Sqlite as the underlying database technology.
  - Semantic UI React UI theme and controls.
  - Typescript for static type checking and integration with Webpack/Babel.
  - Webpack and Babel for compiling and bundling Javascript files which includes the object spread syntax plugin.
  - React version 16.12.
  - Hot module replacement as per the client application.
  - Axios as per the client application.
  - Babel and core-js Javascript polyfills for use with older browsers.
  
To build:
  - Use the integrated build tasks.
  
To execute:
  - 'dotnet run' within a command prompt window.
  
To debug:
  - Use the 'IdentityServer' debug task to debug the .NET server side code.
  - You can use Chrome to debug the server side Javascript code as per the client application.
  - The client-side Javascript code can be debugged using the browser as per the client application.
  
  
Shared: This contains C# code that is shared between the projects.
  
  
Initial Setup
  - The database used in the Identity Server project must be created and seeded. To do this, within a command prompt window navigate to the IdentityServer sub directory, and run the following commands:
    - 'dotnet ef migrations add InitialCreate'
    - 'dotnet ef database update'
  - As part of seeding the database an administrator user will be created with a random password. In order to login to the application you will require this password. This password can be viewed by opening the Identity Server database file 'AspIdUsers.db' and finding the 'header' table, inside here will be a single row that has a column named 'DefaultAdminPassword'. To view the contents of the database you can use an application named 'DB Browser for Sqlite': https://sqlitebrowser.org/. Once the password is known, this row can be deleted from the database.
  - URL's to the 3 applications are held in URLs.cs and mirrored in URLs.js: change these accordingly but it will work as-is for development purposes (as long as the ports are not already in use).
  - You may receive errors when contacting the API relating to a network error or SSL certificates when running it from a development machine. I found the following helpful in resolving this: https://medium.com/@ali.dev/how-to-trust-any-self-signed-ssl-certificate-in-ie11-and-edge-fa7b416cac68.

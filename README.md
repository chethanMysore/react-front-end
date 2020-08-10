# Resource Manager Dashboard
This is a dashboard for Resource Manager. The application is written in **reactjs** with **redux** as state manager. The dashboard is styled with bootstrap and some custom css. The dashboard consumes API's exposed by **[node-backend.](https://github.com/chethanMysore/node-backend)**

## System Requirements
 - *nodejs* version > 8.x [download here](https://nodejs.org/en/)
 - *npm* version > 6.x (usually included with nodejs)
 
## Build and Execute Instructions
*The application listens to the service at http://localhost:3050. This can however be configured to listen to a service base url in config file.*<br/>
Install Dependencies
```cmd
npm install -g webpack
npm install -g webpack-cli
npm install -g webpack-dev-server
npm install
```
Build and run the application
```cmd
npm start
```
The application will be running at http://localhost:8080/public/index.html

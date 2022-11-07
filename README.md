# Instachef

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

# Adding Angular Universal With NestJs
1. ng add @nestjs/ng-universal
2. npm run build:ssr
3. npm run serve:ssr

# Deploying Universal Apps
As mentioned in the previous lectures, you can't deploy an Angular Universal app to a static host (i.e. Firebase Hosting, AWS S3 etc will NOT work).

The reason for this is, that you're using Node.js to pre-render pages on the server and those Hosts don't support Node.js.

Hence you need a host that does - for example AWS ElasticBeanstalk or Heroku.

To these hosts, you need to upload your dist/ folder along with the package.json file. On the web server, you then have to ensure that npm install is executed, followed by npm serve:ssr.

That's it - your app is now up and running on a web server!

Here's an example how you could host Universal apps via Firebase Cloud Functions (NOT Firebase Hosting): https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/15267340#questions/7482486


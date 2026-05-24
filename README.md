//Full Stack 1 - Irish Wildlife Observation Spots App

# IRISH WILDLIFE OBSERVATION SPOTS

## Áine Phelan -W20114761

## ASSIGNMENT 2 -Option 1 Hapi Continued

#### _INTRODUCTION AND DESCRIPTION_

This is an updated version of the Irish Wildlife Spots web application that I started and made for Assignment 1(Readme found below). For this assignment I decided to go with Option 1 which was continuing on with more of backend and test driven development. For my implementation, I mainly covered levels 1 and 2 of the rubric as well as attempting a couple of things for level 3. I fixed the majority of failing unit tests as well as adding features such as cloudinary and basic map implementation. As this was a self learning assignment, I found it very useful to explore and get familiar with new packages as well as finding what did and didn't work for my application. I created a new branch off of the main Web Application repo named "assignment2-hapi" which is linked below.

To summarize, I implemented the following that pushed on the functinality and features from Assignment 1;

- Private and Public Points of Interest (Wildlife Spots)
- Reviews and Ratings feature
- Share feature
- Cloudinary Image integration
- Implemented basic Map using Leaflet and Open Street Map
- Completed diagnostics and corrections on Unit Tests that I began in Assignment 1.
- Hashing and salting passwords
- Sanitisation of input and output
- Basic Playwright test attempts (wrote tests but some failing)
- Tagged Releases on Github as well as creating a branch for this assignment.
- Git Flow- Commiting frequent commits to the correct branch as well as briefly describing key milestone commits.
- Unit Coverage report tests using mainly c8 package.

#### _TECHNOLOGIES AND FRAMEWORKS USED_

- Bulma: https://bulma.io/documentation/
- Handlebars: https://handlebarsjs.com/api-reference/
- Postman API
- Swagger API
- Hapi.js
- Node.js
- Chai Javascript Library
- Mocha testing- more complete
- MongoDB
- nyc (attempted didn't work so well), used c8 instead
- sanitize-html
- bcrypt
- Playwright
- Leaflet.js and Open Street Map
- Joi
- Consulted some basic OWASP documenation for testing unsafe HTML input.

#### _HOW TO NAVIGATE- AS OF ASSIGNMENT 2..._

- To access the project, you can either unzip the project, run the CMD prompt and type _"npm start"_ and access it locally using "http://DESKTOP-V5606G6:3000"
  or you can visit the website at the link here https://github.com/ainephelan365/Irish-Wildlife-Observation-Spots--A-Web-Application .
  - Log in or Sign up on the Landing page of the website.
  - Input the values into the form by first filling in the Observation Spot itself.
  - Then click onto the view sightings button to add in animal sightings.
  - The data inputted is then saved onto my MongoDB database on my local machine using the connection 127.0.0.1:27017.
  - Users can also delete and edit animal sightings.
  - Users can also add a marker onto the Explore Map.
  - It is also possible to now upload Wildlife Sighting images to Spots also and these in turn get uploaded to Cloudinary.
  - If forms have blanks the user is unable to proceed be it in signing up or logging in etc.
  - The site also has basic protection from malicious and unsafe HTML input, if attempted, the script or unwanted inputed does not end up on the page or in the inputted forms.
  -

#### _DOCUMENTATION, SOURCES & ACKNOWLEDGEMENTS_

- Bulma: https://bulma.io/documentation/
- Handlebars: https://handlebarsjs.com/api-reference/
- Full Stack 1- Labs Eamonn de Leastar- Mainly Cloudinary labs: https://tutors.dev/lab/setu-hdip-comp-sci-2025-full-stack-1/unit-3-deployment/topic-12-deployment/unit-0/book-3-cloudinary
- Mongoose Documenatation: https://mongoosejs.com/docs/populate.html
- Joi Schema Docs: https://joi.dev/api/18.x.x
- sanitize-html docs: https://www.npmjs.com/package/sanitize-html
- More information for sanitizing: https://www.geeksforgeeks.org/node-js/how-to-sanitize-your-file-names-using-the-sanitize-filename-npm-package/

- MDN Docs for Validation: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/required
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/minlength#:~:text=If%20no%20minlength%20is%20specified,impossible%20to%20meet%20both%20criteria
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/email
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number

- bcryt docs: https://www.npmjs.com/package/bcrypt, https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/
- c8 docs: https://www.npmjs.com/package/c8
- Site consulted when nyc wasnt working well: https://stackoverflow.com/questions/50459872/no-coverage-nyc-mocha
- c8 docs: https://www.npmjs.com/package/c8
- Playwright Docs: https://playwright.dev/docs/intro
- OWASP Docs to test validation and sanitisation: https://owasp.org/www-community/attacks/xss/ , https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
- Font Awesome, for different upload and delete buttons: https://docs.fontawesome.com/

#### _KNOWN ISSUES AND HURDLES_

- Despite fixing the 24 unit tests at the start, as i developed the app further, 3 of the tests (API tests) dont work. I didnt have time to fix them.
- The Placemark map is a little bit buggy in terms of the dragging and moving on it. Users are not able to edit the Placemark spot either, it is quite basic but I wanted to attempt it.
- The UI isnt very tidy looking especially in sightings pages.
- Playwright is not fully functional. The 4 tests I wrote some only work when they are executed on their own as well as in different web sessions on the app.

#### _PROJECT LINKS_

- GITHUB REPO: https://github.com/ainephelan365/Irish-Wildlife-Observation-Spots--A-Web-Application/tree/assignment2-hapi
- RENDER: https://irish-wildlife-observation-spots-a-web.onrender.com

#### _CONTACT INFORMATION_

For further information, guidance and correspondence, contact myself Áine on github _ainephelan365_ or send a message on Slack!

## ASSIGNMENT 1

#### _INTRODUCTION AND DESCRIPTION_

My Irish Wildlife Observation Spot Web app is a simple web application to demonstrate my understanding of Full Stack 1 module topics and implemented in a practical Web App. The app
allows users to record and view wildlife sightings. Users can add information including species name,description, category, location and the latitude and latitude of the location. Users can sign up and log in and sightings are unique to each user. An Admin account has also been created that can list and also delete users. In relation to deployment the web app is available on Render, Github as well as a local host(links are below). Testing and API consist implementations of Open API and core unit tests such as user and spot testing.

Data storage was implemented incrementally by first using "mem" which doesnt save data per session, then I implemented JSON funcctionality where when a user creates an account the informnation is written to the user.json file. The same was implemented for Spots and Sightings. I finally moved on to implementing MongoDB Database for more robust data storage. I also implemented testing using mocha and chai. Due to time constraints the only tests I was able to include were auth-test.js, users-api-test.js as well as spot-model-tests, and users-model-tests.js. Some tests failed in which I hope to rectify in the next stage of the course. I also implemented the Postman API and Swagger for further testing and monitoring. I also utilised JWT mainly for user authentication.

#### _TECHNOLOGIES AND FRAMEWORKS USED_

- Bulma: https://bulma.io/documentation/
- Handlebars: https://handlebarsjs.com/api-reference/
- Postman API
- Swagger API
- Hapi.js
- Node.js
- Chai Javascript Library
- Mocha testing
-

- Full Stack 1- Labs Eamonn de Leastar- for starter code and for following along with database and testing.

#### _HOW TO NAVIGATE_

- To access the project, you can either unzip the project, run the CMD prompt and type _"npm start"_ and access it locally using "http://DESKTOP-V5606G6:3000"
  or you can visit the website at the link here https://github.com/ainephelan365/Irish-Wildlife-Observation-Spots--A-Web-Application .
  - Also available in Render here:
  - Log in or Sign up on the Landing page of the website.
  - Input the values into the form by first filling in the Observation Spot itself.
  - Then click onto the view sightings button to add in animal sightings.
  - The data inputted is then saved onto my MongoDB database on my local machine using the connection 127.0.0.1:27017.
  - Users can also delete and edit animal sightings however due to reasons I could not solve in time the entries only appear in the MongoDB Database

  #### _SAMPLE ACCOUNT FOR DEMONSTRATION_

  For the purpose of showing the implementation of Log In feature, a Sample Account has been created to show the log in option is functional.
  To show progress, accounts, spots and sightings and reports can be loaded from the JSON files oir from MongoDB files. For testing users can also sign up with their own credentials.
  - EMAIL:janetj2026@gmail.com
  - PASSWORD: password

#### _DOCUMENTATION & ACKNOWLEDGEMENTS_

- Bulma: https://bulma.io/documentation/
- Handlebars: https://handlebarsjs.com/api-reference/
- Full Stack 1- Labs Eamonn de Leastar
-

#### _KNOWN ISSUES AND HURDLES_

- I only had enough time to complete basic user and observation spot testing, 6 out of the 10 tests pass
- I initially was able to acess the site on Render however after further code progression the site doesnt load properly sometimes.
- When a user inputs the Animal sighting, it doesn't display on the web page like it should only on my MongoDB Database.

#### _PROJECT LINKS_

- GITHUB REPO: https://github.com/ainephelan365/Irish-Wildlife-Observation-Spots--A-Web-Application
- RENDER: https://irish-wildlife-observation-spots-a-web.onrender.com

#### _CONTACT INFORMATION_

For further information, guidance and correspondence, contact myself Áine on github _ainephelan365_ or send a message on Slack!

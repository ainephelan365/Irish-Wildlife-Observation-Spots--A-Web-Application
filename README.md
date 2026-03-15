//Full Stack 1 - Irish Wildlife Observation Spots App

# IRISH WILDLIFE OBSERVATION SPOTS

## Áine Phelan -W20114761

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

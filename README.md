//Full Stack 1 - Irish Wildlife Observation Spots App

# IRISH WILDLIFE OBSERVATION SPOTS

  <img src="/images_icons/top_banner.png" style="width:500px;height:500px;">

## Áine Phelan -W20114761

#### _INTRODUCTION AND DESCRIPTION_

My Irish Wildlife Observation Spot Web app is a simple web application to demonstrate my understanding of Full Stack 1 module topics and implemented in a practical Web App. The app
allows users to record and view wildlife sightings. Users can add information including species name,description, category, location and the latitude and latitude of the location. Users can sign up and log in and sightings are unique to each user. An Admin account has also been created that can list and also delete users. In relation to deployment the web app is available on Render, Github as well as a local host(links are below). Testing and API consist implementations of Open API and core unit tests such as user and spot testing.

Data storage was implemented incrementally by first using "mem" which doesnt save data per session, then I implemented JSON funcctionality where when a user creates an account the informnation is written to the user.json file. The same was implemented for Spots and Sightings. I finally moved on to implementing MongoDB Database for more robust data storage.

#### _TECHNOLOGIES AND FRAMEWORKS USED_

#### _HOW TO NAVIGATE_

-
-
-
-
-
-
- To access the project, you can either unzip the project, run the CMD prompt and type _"npm start"_ and access it locally using "http://DESKTOP-V5606G6:3000"
  or you can visit the website at the link here https://github.com/ainephelan365/Irish-Wildlife-Observation-Spots--A-Web-Application .
  - Also available in Render

  #### _SAMPLE ACCOUNT FOR DEMONSTRATION_

  For the purpose of showing the implementation of Log In feature, a Sample Account has been created to show the log in option is functional.
  To show progress, accounts, spots and sightings and reports can be loaded from the JSON files
  - EMAIL:tommythomp@gmail.com
  - PASSWORD: password

#### _EXAMPLES_

The project is primarily JavaScript and Handlebars. Styling I primarily used Bulma for buttons and for drop down Menu.

```javascript
<div class="field">
  <b>Wind Direction</b>
  <div class="select is-success">
    <select name="windDirection" required>
      <option>WIND DIRECTION</option>
      <option>NORTH</option>
      <option>SOUTH</option>
      <option>EAST</option>
      <option>WEST</option>
    </select>
  </div>
</div>
```

Other templates such as the main menu were created using Handlebars,

```handlebars
{{> menu active="dashboard"}}

<section class="section">
  {{> list-stations}}
  {{> add-station}}

</section>
```

#### _API_

- Bulma: https://bulma.io/documentation/
- Handlebars: https://handlebarsjs.com/api-reference/
-
-

#### _TESTING_

-
-
-
-

#### _DOCUMENTATION & ACKNOWLEDGEMENTS_

- Bulma: https://bulma.io/documentation/
- Handlebars: https://handlebarsjs.com/api-reference/
-
-

#### _IMAGE ACCREDITATION_

-
-
-
-

#### _PROJECT LINKS_

- GITHUB REPO: https://github.com/ainephelan365/Irish-Wildlife-Observation-Spots--A-Web-Application
- RENDER: https://webdev2-weather-app.onrender.com

#### _CONTACT INFORMATION_

For further information, guidance and correspondence, contact myself Áine on github _ainephelan365_ or send a message on Slack!

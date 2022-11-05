# KeepItClean

MVC pattern app created with Vanilla JavaScript.
It organises the cleaning tasks and the issues encountered in a rented apartment from AirBnB. 
![Alt Text](https://github.com/AnnaZaragoza/KeepItClean/blob/30080bce13623be0ff9c6225bb2915d2a897c9ac/img/app.png)
Live Demo: [Keep It Clean App](https://keepitcleanapp.netlify.app/)


## Technologies Used
- Single Page App (SPA)
- Model Viewer Controller Arquitecture (script type module)
- Parcel
- Babel
- fullCalendar (3rd Party Library)
- JavaScript (ES6)
- Sass
- Local Storage usage


## Setup
To clone this repository you will need `Git` and `Node.js`.

```
# Clone this repository
$ git clone https://github.com/AnnaZaragoza/KeepItClean.git

# Go into the repository
$ cd KeepItClean

# Install dependencies
$ npm install

# Run the app
$ npm start

```

## General Information
KeepItClean shows a calendar where the owner of an AirBnB apartment can mark the length and the number of guests the apartment will have at that time. He can also create, edit and delete the tasks the cleaner should perform in each room (exchange bedsheets, check damages, clean area, etc). 

On the other hand, the cleaner is able to check the calendar and those tasks - but not able to edit them. He can also create, edit and delete reports (for example about damages found, missing equipment, etc.) that the owner can only see and delete.


## Improvements
- Authentification.
- Sort lists of tasks and reports 
- Focus mouse on new task/report when created
- Check for bad language content (as the tasks and reports are free text editable)

## Acknowledgements
- This project has been created from scratch. 
- It is an idea from my partner. He is the owner of 2 AirBnB apartments.
- I am specially proud of the architecture of the project and the re-usable components:

![Alt Text](https://github.com/AnnaZaragoza/KeepItClean/blob/c8db5bb90f197dc11ccca0711ba9e5f82b305d79/img/srcfiles.png)

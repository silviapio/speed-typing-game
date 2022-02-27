# Welcome to my Speed Typing Game ⚡

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-CC0-brightgreen.svg)]

> Simple speed typing game built with React.js

When the user clicks start, they can type in as many words as they can; at the end of the timer, the program counts the valid (English) words typed and displays the score in words per minute.

## Current version of the app is deployed at [https://silviapio.github.io/speed-typing-game/](https://silviapio.github.io/speed-typing-game/) ✨

> Important note: this app is still work in progress! Jump directly to my [to-do and improvement list](#To-do and improvement list) to know what's missing.

## Description and user walkthrough 📍

Initially, the allowed time comes as set and the textarea is disabled.

If the user wishes to change the seconds allowed, they can do so clicking on the pencil button.

If the game as never been played on the machine/browser, no best score is showed.

Clicking on the button START, the textarea is enabled and a timer corresponding to the seconds allowed starts ticking.

Seconds left are always showed below the text area. No clicking on buttons is allowed when the game is running, except for the stop button, which stops the game.

When time is over, the textarea is disabled again, the input text is checked against an English dictionary API and the number of valid words is returned.

This number is also showed as number of words per minute and showed as best score if it's higher than the last best score (if existing, saved locally in Local Storage).

The user can then reset the screen with the reset button, or simply start another game.

### Cross-checks

1. No typing if the game is not running: the text area is enabled only when the timer is running.
2. No editing of seconds allowed if the game is running: the edit button is disabled.
3. The seconds allowed can be edited only with positive integers up to 60: the input is a type number, plus no submitting is allowed when typing invalid numbers
4. The seconds allowed are not edited when the timer is started before submitting, or the cancel icon is clicked
5. No pasting allowed on textarea

### API calls

The API used to check validity of words is [Free Dictionary API](https://dictionaryapi.dev/). The API returns a lot of information but the program only needs to know if the word exists in the dictionary so it only checks if response status is "ok". In fact, when the word is not found, the API returns a 404.

## To-do and improvement list 📔

### To-dos

- **Accessibility**: make the app fully accessible. Currently basic elements are accessible, but there is some logic changing icons on the buttons that needs improvements.
- **Code readability**: code works, but for sure the App component needs some refactoring (and maybe buttons could be separate as unit components)
- **API calls**: it'd good to check for the API working on application loading and only display the words count if the API is responding correctly

### Known bugs

- Some non existing words are validated as existing: this is due to the API used, as it returns some 3-letter words like "xxx" or "aaa" as valid, identifying them as acronyms. However, this won't be fixed for the time being, as the issue is minor and fixing it implies changing the API, possibly adding complexity within the API call which is outside the scope of this app.
- Sometimes the API causes a CORS error.

## Author

👩 **Silvia Piovesan**

## Credits 🙏🏼

### Scrimba's React Bootcamp

This speed typing game was built on an assignment for [Scrimba's React Bootcamp](https://scrimba.com/learn/react), a course taught by Bob Ziroll.
I enjoyed building the basic version so I added some features, namely:

- the possibility for the user to change the seconds allowed, with the related input showed only when the user clicks the edit button;
- the check for valid words typed through the API;
- the calculation and display of the best score;
- a reset button

### ColorHub

The color palette for this app is [Milky Green](https://colorhub.vercel.app/select-palette/milky-green).

### Free Dictionary API

The app uses [Free Dictionary API](https://dictionaryapi.dev/) for words checking.

### Icons

The app uses [HeroIcons through React Icons](https://react-icons.github.io/react-icons/icons?name=hi)

## Technology

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Here you will find all available scripts.

To run the app in development mode, you can run from project directory:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

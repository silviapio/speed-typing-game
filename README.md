# Speed Typing Game

Welcome to my speed typing game!
When the user clicks start, they can type in as many words as they can, and then, at the end of the timer, the program counts the valid English words typed and returns the result in words per minute.

## Description

Initially, the allowed time comes as set and the textarea is disabled.
If the user wishes to change the seconds allowed, they can do so clicking on the pencil button.
If the game as never been played on the machine/browser, no best score is showed.
Clicking on the button START, the textarea is enabled and a timer corresponding to the seconds allowed starts ticking.
Seconds left are always showed below the text area. No clicking on buttons is allowed when the game is running.
When time is over, the textarea is disabled again, the input text is checked against an English dictionary API and the number of valid words is returned. 
This number is also showed as number of words per minute and showed as best score if it's less than the last best score (if available, it's saved locally in Local Storage).
The user can then reset the screen with the reset button, or simply start another game.

### Cross-checks

1. No typing if the game is not running: the text area is enabled only when the timer is running.
2. No editing of seconds allowed if the game is running: the edit button is disabled.
3. The seconds allowed can be edited only with positive integers: the input is a type number, plus no submitting is allowed when typing invalid numbers
4. The seconds allowed are not edited when the timer is started before submitting, or the cancel icon is clicked

### API calls

The API used to check validity of words is [Free Dictionary API](https://dictionaryapi.dev/). The API returns a lot of information but the program only needs to know if the word exists in the dictionary so it only checks if status is "ok".


## Known bugs

- Some non existing words are validated as existing: this is due to the API used, as it returns some 3-letter words like "xxx" or "aaa" as valid, identifying them as acronyms. However, this won't be fixed for the time being, as the issue is minor and fixing it implies changing the API, possibly adding complexity within the API call which is outside the scope of this app.

## Credits
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
The app uses [HeroIcons through React](https://react-icons.github.io/react-icons/icons?name=hi)

## Technology

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
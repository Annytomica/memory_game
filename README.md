# Animal Memory Game

A JavaScript memory game where you remember the location of animal cards and match them to your active card.

The live game can be found [here](https://annytomica.github.io/memory_game/)

## Features
### Existing features

### Features for the future

## Site Design Process
### Goal
The goal was to create a simple and fun memory game website
- interface easy to understand and use
- use animal icons so each card easy to identify and match
- game functionality created using JavaScript
- a game where you can compete against yourself or others by timing completion speed

### Site wireframe
The game wireframe and visual design was created in Figma.

### Development process

## Technologies
- HTML – for basic site structure
- CSS – for visual appeal and responsive design features
- JavaScript - for all game functions
- GenAI – creation of game clock
    - ChatGPT 3.5 – HTML and JavaScript code for game clock
- Figma – wireframe and visual concept development


## Testing
### General Strategy
### Devices and Browsers
#### Web Browsers
Chrome (primary), Firefox , Edge and Brave

#### Devices
- Phones: Pixel4a, iPhoneXR, GalaxyS10
- Tablets: iPad 9.5”, Surface Pro 12” (older model)
- Laptops: Dell Inspirion 13”, MacBook Air 13”, MacBook Pro 17" (older model)
- Desktop screens: BenQ PD series 27”

### Final Validation
HTML – all pages passed validation with no errors detected using the official [W3C HTML validator](https://validator.w3.org/). The summary of results can be found [here](assets/readme/html-validation.png)

CSS – all pages passed validation with no errors detected using the official [W3C CSS validator](https://jigsaw.w3.org/css-validator/). The summary of results can be found [here](assets/readme/css-valdation.png)

Accessibility – all pages showed high accessibility using Chrome [Lighthouse DevTools](https://developer.chrome.com/docs/lighthouse/). The summary of results can be found [here](assets/readme/Lighthouse-validation.png)

## Bugs
### Fixed
- a hidden aria label "aria-hidden="true" appears in active card icon code and prevents a correct match to hidden card. Do not know where this aria label comes from or how to prevent. FIX: added the aria-hidden="true" to the icon code in the animalCodeAllocator function.
- function allMatch only works sometimes. Unclear what prevents it from running correctly every time. FIX: coder error - had only put the allMAtch function in event listener for hidden4, not all the hidden cards.
- icon for hidden animal not displaying when card clicked (after cleaning up repeated code) but is correctly identified for the match function. FIX: changed this.innerHTML to hiddenCard.innerHTML within the cardMatchCheck funtion
- animalCards.filter function does not remove animal from animalCards array, in spite of function working in python tutor. FIX: required restating the array with animalCards = animalCards.filter() to commit the array change as the animalCards.filter() alone does not change array permanently
### Unfixed

- removeListener function is not working and does not inactivate hidden cards after first click


## Deployment
The site was deployed to GitHub pages using the recommended process.

In Summary:
1.	Within the GitHub repository for this project, the settings tab at the top of the page was accessed.
2.	From settings, the Pages tab was selected from the menu on the left side of the screen (within the Code and Automation section of the menu).
3.	From Pages, the Source was set to ‘Deploy from a Branch’, and the Branch was set to ‘main’.
4.	Once main branch is selected, hit the save button (ignore the folder/(root) menu).
5.	Once saved, the link to the active site will appear at the top of the page.
6.	Alternatively, from the main repository page, within the menu on the right a ‘Deployments’ will now have appeared. This section provides a link to the active site as well as summarizes the number of updates the site has received since initial deployment.

The github repository for this project can be found [here](https://github.com/Annytomica/memory_game/)

![GitHub deployments](https://img.shields.io/github/deployments/Annytomica/memory_game/github-pages)
![GitHub language count](https://img.shields.io/github/languages/count/Annytomica/memory_game)
![GitHub top language](https://img.shields.io/github/languages/top/Annytomica/memory_game?color=yellow)
![GitHub watchers](https://img.shields.io/github/watchers/Annytomica/memory_game)
![GitHub forks](https://img.shields.io/github/forks/Annytomica/memory_game?style=social)
![GitHub Repo stars](https://img.shields.io/github/stars/Annytomica/memory_game?style=social)

## Credits
I would like to acknowledge and thank the following people and resources used in the creation of this site.
### Content
-	the Durstenfeld shuffle algorithm
    - Durstenfeld, R. (July 1964). "Algorithm 235: Random permutation". Communications of the ACM. 7 (7): 420.
    - is an optimised version of the Fisher-Yates shuffle ( Fisher, Ronald A.; Yates, Frank (1948). Statistical tables for biological, agricultural and medical research (3rd ed.). London: Oliver & Boyd. pp. 26–27.)
    - the optimised JavaScript code was taken from ashleedawg's update of Laurens Holst answer on stackoverflow, comment [1199](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)

- the game clock code was generated by ChatGPTv3.5 (both HTML and JavaScript). CSS styling was my own.

- the Game Instructions modal was based on the tryhow modal example from [W3Schools](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal)

- 

### Media
-	The icons in the logo and all game cards are from [Font Awesome](https://fontawesome.com/)
-	The Github summary bar used in README.md is from [shields.io](https://shields.io/badges/)

### Acknowledgements

My mentor, Oluwafemi Medale, for his invaluable guidance and feedback. In particular, introducing me to the use of forEach() and arrow functions and suggesting the use of a modal for game instructions.

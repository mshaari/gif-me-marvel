# Project 01 - GIF ME MARVEL

>**Application Link:** [GIF ME MARVEL](https://mshaari.github.io/gif-me-marvel/)
>
>**View:** [Description](#description) / [Application Details](#application-details) / [Application Sample Videos](#application-sample-videos) / [Responsive Layout Example](#responsive-layout) / [Credit](#credit)
>
>**Site Preview:**
>
>![GIF ME MARVEL](./assets/images/Main%20Page.png "GIF ME MARVEL")
>
>**General Application Video:**
>
>![GIF ME MARVEL](./assets/images/GIF%20ME%20MARVEL.gif "GIF ME MARVEL")
## **DESCRIPTION**
> We wanted to build a web application that used APIs that involve two things many people love: marvel and gifs. We built this project in order for people to be able to search for their favorite Marvel superhero and be presented with both a short descriptiong of said superhero as well as a page of gifs they can look through and favorite. This allows people to store these gifs for later use without having to download them directly to their device and instead just revisit the site whenever they want to.
>
> We learned several things while working on this project. One of which would be properly attributing the content gained from their respective APIs. Another would be how much debugging can go into a project of this size. There were times when a minor change or typo can result in the breaking of code. We also learned more about the pros and cons of working with other people. Brainstorming ideas for both the content of the web application as well as during the debugging process was extremely beneficial and we rarely stayed stuck on any one problem/feature for an extended period of time. On the other hand, people tend to work at different paces so it is very easy for those who are a little less comfortable in terms of coding can be left behind a little during the development process. And, if there are time constraints, those who are faster may be subjected to more work in order to meet time demands.
> 
## **INSTALLATION**
> Installation is not required. All that is required is to visit the deployed site at: https://mshaari.github.io/gif-me-marvel/ 

## **USAGE**
> To start, head to the URL provided above. Next, type into the search bar a Marvel superhero you would like to get information and gifs for. Press the search button and watch the page fill up with gifs via Giphy. From there, you can click on individual gifs and favorite them. Any gifs saved to your favorites page can be found by clicking the "MY FAVORITE GIFS" at the top right of the page. If you want to remove a gif from your page, you can click the gif from there and remove it from the "MY FAVORITE GIFS" page.

### **Our Task**
*GIF ME MARVEL* allows a user to search up and image and description of their favorite MARVEL character. It also allows the user to save related GIFs on their local device.
> Create an application from scratch. 
>
> Use a CSS Framework [Framework Used: [Bulma](https://bulma.io/documentation/)], create responsive layout
>
> Use framework's modals instead of JavaScript alerts, confirm, or prompts
>
> Get API keys and connect to at least 2 server-side APIs [APIs Used: [MARVEL](https://developer.marvel.com/) & [GIPHY](https://api.giphy.com/)]
> 
> Cite proper API attributions
>
> Use client-side storage to store persistent data (Favorite GIFs)
> 
> Interactive: Allows user to search different characters
> 
> Responsive: Error Handlers for invalid character entries or duplicate GIF saved
>
> Polished User Interface: Combined use of [Bulma](https://bulma.io/documentation/), [Google Fonts](https://developers.google.com/fonts), and CSS styling.
> 
> **Note:**
> 
> Lengthy initial API fetch from the [MARVEL](https://developer.marvel.com/) API due to a large quantity of data and asynchronous run
>
> > Fetch needs to occur asynchronously to collect data in alphabetical order
> 
> > Added loading screen and progress bar over fetching period for an indicative user interface
>
> > Only needs to be loaded once upon initial launch until page is completely refreshed/reloaded
> 
> Limitations based on [MARVEL](https://developer.marvel.com/) API data
> 
> > Must search names in the APIs format (i.e. "SPIDER-MAN" and not "SPIDER MAN"), but not case-sensitive
> 
> > If multiple versions of the same character exist, only the first chracter would be displayed unless the input is an exact match (i.e. only "ANT-MAN (ERIC O'GRADY)" will be displayed and not "ANT-MAN (HANK PYM)" or "ANT-MAN (SCOTT LANG)")
> 
> > Some characters do not have descriptions available; Users can redirect to the servers website for more information
> 
> Limitations based on [GIPHY](https://api.giphy.com/) API data
> 
> > Only the first 100 GIFs are retrieved for runtime and fetch limit purposes
>
> > Retrieved GIF may not be related to MARVEL (i.e. searching for MARVEL character "Abyss" woudld return GIFs that may not be related to the character but instead to the word instead)
>
## User Story
```
AS A Marvel Enthusiast
I WANT to be able to search for a Marvel character
SO THAT I can see a their picture, description, and save relevant GIFs
```
## Acceptance Criteria
```
GIVEN A Marvel character search input
WHEN I search for a Marvel character
THEN I see an image and description of the character, a link redirected to more information, and relevant GIFs
WHEN I click on a GIF
THEN I can add it to my favorites or remove it from favorites
WHEN I click on “MY FAVORITE GIFS”
THEN I can see all my saved GIFs and have the option to remove them
```

## **APPLICATION DETAILS**

### HTML Information
* **Head**: Link reset.css and bulma cdn.
* **Header**: Title of the page (`h1`) and search bar (`.searchBar`) with button.
* **MY FAVORITE GIFS**: Button (`favoriteGifs`) linked to the MY FAVORITE GIFs page.
* **Loading Page**: Loading header, progress information, and progress bar.
  * Visible looping GIF during loading period where element is visible.
  * \<p> element (`#loadingProgress`) to populate with live load status percentage.
  * \<progress> element (`.progress`) to update progress bar length based on live load status percentage.
* **Character Page**: Displays the searched character's image, description, external link, and GIFs.
  * Character Card:
    * \<img> element (`#characterImage`) to populate with image url src.
    * \<h2> element (`#characterName`) to populate with character name.
    * \<p> element (`#characterDescription`) to populate with character description.
    * \<p> element (`#marvelLink`) to populate with MARVEL character url.
    * \<p> element (`#marvelAttribution`) displays MARVEL API attribution.
  * GIFs display:
    * To populate with \<img> elements with GIF url src.
* **Favorite GIFs Page**: To populate with \<img> elements with url src of favorited GIFs from users local storage.
* **Modal**: To display either GIFs to save/remove or error handlers.
  * Body section (`#selectedGif`) to populate with selected GIF or error messages.
  * Three buttons in footer respectively for closing modal, saving GIF to local storage, and removing GIF from local storage.
* **Body End**: link jQuery CDN and script file.
* **Comments**: Added indicative comments before each section.

### CSS Information
* **HTML**: Linear-gradient background that animates infinitely.
  * `@keyframes ombre` to animate page gradient.
  * Set background size to entire viewport.
* **Stylings**: Simple stylings for body, header, footer, headings, buttons, modal, etc.
* **Pseudo Styles**: Hover transformations for buttons and GIF items.
  * Scale GIFs, add outline, and add shadow to GIF images on hover.
  * On hover scale and position `.starItem` for GIFs that have been saved.
* **Comments**: Added indicative comments before selectors.

### JavaScript Information
* **Define Variables**: Define empty arrays used to store data when functions are called.
  * `characterList`, `characterDescription`, `characterImage`, and `characterUrl` used to store character data/parameters from the MARVEL API.
  * `favoriteGifs` used to store saved GIFs and update local storage.
  * `characterIndex` used to search for the user input character from the MARVEL API response data.
* **function init()**: Style the page when the application initializes and retrieve items from the local storage.
  * Hide all elements except for the header (with the title and search bar).
  * Style header to fill the page and append application subtitle/detail.
  * Define `favoriteGifs` array as `storedFavorites` from the local storage.
  * Function called upon page load.
* **$('h1').on('click', function () {code})**: Send back to the main page (re-initialize) when clicking the header/title (`h1`).
* **$('#searchCharacterBtn').on('click', function () {code})**: Upon clicking the search button, run code.
  * Check if the input value is blank. 
    * If it is blank, populate modal to display error message and appropriate buttons. Toggle error modal and end function.
  * If the input is not blank, check if the `characterList` array is empty.
    * If it is not empty then the MARVEL API has been loaded, thus, proceed with calling the `loadCharacter()` function.
    * If it is empty then the MARVEL API has not been loaded, thus, load the API by showing the loading page and then call the `fetchMarvelAPI()` function.
      * function under a setTimeout function so that the loading page is visible before the ajax function begins running by delaying the ajax function.
      * After loading API call the `loadCharacter()` function (under a setTimeout function so that code does not run until API load is complete).
* **$('input').keypress(function (e) {code})**: Checks that the key that was pressed was the `enter` key and runs the same code as the `#searchCharacterBtn` on click.
  * Improve user ease of use. Does not have to click the search button to search.
* **function fetchMarvelAPI ()**: Loop to fetch data from the MARVEL API and push them to respective arrays.
  * Use `Math.random()` method to get a random value (0, 1, or 2) and based on value, define the `marvelUrl`.
    * Used to avoid `429 Too Many Requests` Error. 
    * Distributes the fetch requests between the different API url/keys.
  * Define the `offsetValue` as 0 before beginning ajax fetch request.
    * Due to limits on the MARVEL API, each fetch has an array limit of 100.
    * More than 1500 characters are available on the MARVEL API.
      * Run 16 loops of the fetch request and offset by 100 after each loop.
  * Place ajax fetch in setTimeout function to delay fetch request so that the `.loadingPage` can update before each new request.
    * Update the `#loadingProgress` with the percentage of the fetch completed.
    * Update length of progress bar by setting the value attribute of `.progress`.
  * ajax define url as the randomly selected url with the offsetValue, method as GET, and set asynchronous as false.
    * To get data response pushed alphabetically, the fetch needs to occur asynchronously so that certain smaller fetches are not pushed first/out of order.
    * Loop through the response data and push the parameters to their respective arrays.
      * Convert character names to capital to override case sensitivity for search input.
      * Push only the first character url to the array regardless of what detail type (can be chracter comic page or character detail links).
* **function loadCharacter()**: Load the character page based on the input value.
  * Define `character` as the capitalized input value.
  * Define the index of the character (`characterIndex`) in the data arrays by first checking for an exact character match in the `characterList` array.
  * If there is no exact match, check for partial matches.
    * Uses `.fiter` and `.startsWith` method to look for partial matches.
    * If there is a partial match, define the `characterIndex` as the index of the first partial match value in the array.
      * Due to the existance of multiple versions of the same character, this code will only retrieve the first match.
    * If no exact match or partial matches are found, style and toggle the error modal and end function.
    * If a match has been found, populate the respective elements in the HTML with the `characterIndex` values of the array.
      * If the character description is blank, populate respective element with default message.
      * Reset the `characterIndex` for the next search.
      * Style and display the `.characterPage`. Hide all irrelavant elements.
      * Call the `loadGifs()` function.
* **function loadGifs()**: Runs ajax GET from the GIPHY API and populates the `.gifs` section.
  * Empty the `.gifs` section to remove any GIFs from previous searches.
  * Define the character based on the input value.
  * Define the `giphyUrl` and set the offsetValue to 0.
  * Loop the ajax fetch twice to get a total of 100 GIFs.
    * Loop through the response data and append the GIFs.
    * Check to see if the GIF is included in the `favoriteGifs` array.
      * If it is included, append the GIF with an extra element.
      * Append the \<img> element with class `.starItem` to place a star icon at the top right corner of the GIF to indicate that it is saved.
      * If it is not in the `favoriteGifs` array append just the GIF.
      * GIF appended after parent class `.gifGroup` so that it can be grouped with the `.starItem` element when necessary.
  * Remove any existing footer element and append new footer element with GIPHY attribution.
  * Clear input value for the next search.
* **$('.gifs').on('click', function (event) {code})**: Style and toggle modal to save the GIF.
  * Check that what was clicked on the page is an \<img> element.
  * Clear the modal of any existing GIF.
  * Style the modal and show appropriate buttons for favoriting the GIF.
  * Append the GIF url as the src to an \<img> element to the `#selectedGif` section.
  * Toggle the modal and end the function.
* **$('#favoriteGifs').on('click', function () {code})**: Button to show the MY FAVORITE GIFS page by calling the `loadFavorites()` function.
* **function loadFavorites()**: Styles page and populates with gifs from the `.favoriteGifs` array.
  * Hide elements and display the `.favoriteGifsPage`.
  * Loop through the items in the `favoriteGifs` array and append items to the `.favoriteGifsPage`.
  * Append the GIPHY attributtion to the bottom of the section.
* **$('.favoriteGifsPage').on('click', function (event) {code})**: Style and toggle modal to remove the GIF from favorites.
  * Check that what was clicked on the page is an \<img> element.
  * Clear the modal of any existing GIF.
  * Style the modal and show appropriate buttons for removing the GIF from favorites.
  * Append the GIF url as the src to an \<img> element to the `#selectedGif` section.
  * Toggle the modal and end the function.
* **$('#addFavorite').on('click', function () {code})**: Add GIF to favorites if it has not been added already.
  * Check that the GIF url is not included in the `favoriteGifs` array.
    * Push the GIF url to the `favoriteGifs` array and setItem in the local storage.
    * Append the \<img> element with class `.starItem` to place a star icon at the top right corner of the GIF to indicate that it is saved.
    * Untoggle/hide modal and end function.
  * If the GIF already exist in the `favoriteGifs` array then style the modal and with error message show appropriate buttons for removing the GIF from favorites.
    * Toggle the new error modal and end the function.
* **$('#deleteFavorite').on('click', function () {code})**: Remove the GIF url from the `favoriteGifs` array and setItem in the local storage.
  * Use the `grep` method to remove selected GIF from the array and update local storage.
  * If the `.favoriteGifsPage` is visible then call the function `loadFavorites()` to reload the page with the new array list.
    * Otherwise the `.characterPage` is visible, so remove the `.starItem` element from the `.gifGroup` to get rid of the star icon from the GIF on the page.
  * Untoggle/hide modal and end function.
* **$('.close-modal').on('click', function () {code})**: Untoggle/hide the modal depending on the page visible.
  * If the `.favoriteGifsPage` or `.characterPage` is visible then just untoggle/hide the modal.
  * Otherwise, it's an error handler modal on the initial/main page so call the function `init()` to remove any new style and reset the page before closing the modal.
* **Comments**: Added indicative comments throughout script.

## **APPLICATION SAMPLE VIDEOS**
### Search and Loading Page
>![GIF ME MARVEL](./assets/images/Loading%20Page.gif "GIF ME MARVEL")
### Sample Character Searches
>![Character Search](./assets/images/Character%20Search.gif "Character Search")
### Character Page and Favorite GIF
>![Character Page](./assets/images/Character%20Page.gif "CharacterPage")
### MY FAVORITE GIFS and Remove GIF
>![MY FAVORITE GIFS](./assets/images/MY%20FAVORITE%20GIFS.gif "MY FAVORITE GIFS")
### Error Handlers
>![Error Handlers](./assets/images/Error%20Handler.gif "Error Handlers")
## **RESPONSIVE LAYOUT**
### Screen Size: 650px
>![Main Page](./assets/images/650px%20Main%20Page.png "Main Page")
>![Character Page](./assets/images/650px%20Character%20Page.png "Character Page")
>![Favorites Page](./assets/images/650px%20Favorites%20Page.png "Favorites Page")

## **CREDIT**
### Group Members
> [Fanny](https://github.com/fannychen623)
> [Michael](https://github.com/mshaari)
> [Mauritz](https://github.com/MauritzMaj)
> [Matthew](https://github.com/provostma21)

### API Attributions
> [MARVEL](https://developer.marvel.com/)
> [GIPHY](https://api.giphy.com/)
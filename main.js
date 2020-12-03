const url = 'https://itunes.apple.com/search?'
// use encodeURI() to deal with white space inside search request
const form = document.querySelector('form')


function searchRequest(term) {
    
    const searchUrl = encodeURI(`${url}term=${term}`)
    console.log(searchUrl)
    fetch(searchUrl)
    .then (res => res.json())
    .then (data => {
        for (let object of data.results) {
            console.log(object.artistName)
            displayResults(object)
        }
    })
}
        
function displayResults(object) {
    const searchResultsContainer = document.querySelector('#search-results-container')
    
    // create card containers for the search results that append to #search-results-container (<section>)
    const cardContainer = document.createElement('div')
    cardContainer.classList.add('card-container')
    cardContainer.addEventListener('click', function(event) {
        event.preventDefault()
        event.target.document.querySelector('audio')
    })

    searchResultsContainer.appendChild(cardContainer)

    // create div to display album cover inside cardContainer
    const albumCover = document.createElement('img')
    albumCover.classList.add('album-image')
    albumCover.src = object.artworkUrl100
    cardContainer.appendChild(albumCover)
    
    // create div to display song title inside cardContainer
    const songTitle = document.createElement('div')
    songTitle.classList.add('song-title')
    songTitle.innerHTML = `Song: ${object.trackName}`
    cardContainer.appendChild(songTitle)

    // display album name that track is from inside cardContainer
    const albumName = document.createElement('div')
    albumName.innerHTML = `Album: ${object.collectionName}`
    albumName.classList.add('album-name')
    cardContainer.appendChild(albumName)

    // display release date for album **attempted to convert the api date into a more readible format**
    // const releaseDate = document.createElement('div')
    // releaseDate.innerHTML = `Released: ${convertReleaseDate()}`
    // releaseDate.classList.add('release-date')
    // function convertReleaseDate() {
    //     const apiDate = object.releaseDate
    //     let year = apiDate(getFullYear())
    //     console.log(year)
    //     let date = new Date()
    //     date.get
        
    //     }
    
    // cardContainer.appendChild(releaseDate)

    // create div to display artist name inside cardContainer
    const artistName = document.createElement('div')
    artistName.classList.add('artist-name')
    artistName.innerHTML = `Artist: ${object.artistName}`
    cardContainer.appendChild(artistName)
    
    // create audio to display track preview inside cardContainer
    const trackPreview = document.createElement('audio')
    trackPreview.classList.add('audio')
    trackPreview.controls = 'control'
    trackPreview.src = object.previewUrl
    cardContainer.appendChild(trackPreview)
}


form.addEventListener('submit', function(event) {
    event.preventDefault()
    document.querySelector('#search-results-container').innerHTML = ''
    const searchInput = document.querySelector('#input')
    term = searchInput.value
    searchRequest(term)
    console.log(searchRequest)
})
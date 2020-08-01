// Get quote from API
async function getQuote() {
    const proxyUrl = 'https://api.allorigins.win/'; // to eliminate CORS policy violation
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    const response = await fetch(`${proxyUrl}get?url=${encodeURIComponent(apiUrl)}`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then(data => console.log(data.contents));
}

// On load
getQuote();

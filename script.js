const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loader
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    loading();
    //Need to use a Proxy URL to make our APU call in order to avoid CORS policy violation
    const proxyUrl = 'https://api.allorigins.win/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const response = await fetch(`${proxyUrl}get?url=${encodeURIComponent(apiUrl)}`)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            try {
                quoteData = JSON.parse(data.contents);
                // Check is Author field is blank and replace with 'Unknown'
                if (quoteData.quoteAuthor === '') {
                    authorText.innerText = 'Unknown';
                } else {
                    authorText.innerText = quoteData.quoteAuthor;
                }
                // Reduce fontsize for long quotes
                if (quoteData.quoteText.length > 120) {
                    quoteText.classList.add('long-quote');
                } else {
                    quoteText.classList.remove('long-quote');
                }
                quoteText.innerText = quoteData.quoteText;
                // Stop loader, show quote
                complete();
            } catch (error) {
                getQuote();
            }
        });
}

function shareQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const fbUrl = ``;
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();

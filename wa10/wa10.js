let quoteBtn = document.querySelector('#js-new-quote').addEventListener('click', newQuote);

let current = {
    quote: "",
}

const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

async function newQuote() {
    //alert("Button Clicked")

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw Error(response.statusText)
        }

        const json = await response.json();

        displayQuote(json["message"]);

        current.quote = json["message"];
        //console.log(current.quote);

    } catch (err) {
        console.log(err)
        alert("Failed to get new quote")
    }
}

function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}

newQuote();
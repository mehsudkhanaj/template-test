
const quoteContainer=document.getElementById('quote-container')
const quoteText=document.getElementById('quote')
const AuthorText=document.getElementById('author')
const TwitterBtn=document.getElementById('twitter')
const NewQuoteBtn=document.getElementById('new-quote')
const loader=document.getElementById('loader');
let apiQuotes=[];

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}


function newQuote(){
    loading();

    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    
    if(!quote.author){
        AuthorText.textContent="Unknown";
    }else{
        
        AuthorText.textContent=quote.author;
        
        
    }
    if(quote.text.length>50){
        quoteText.classList.add("long-quote");

    }else{
        quoteText.classList.remove("long-quote");

    }

    quoteText.textContent=quote.text;
    complete();
}
async function getQuotes(){
    loading();
    const apiURL="https://type.fit/api/quotes";
    try {
        const response=await fetch(apiURL);
        apiQuotes=await response.json();
        newQuote();
        console.log(apiQuotes[12]);
        
    } catch (error) {
        alert(error)
        
        
    }
}

//Tweet Quote
function TweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${AuthorText.textContent}`;
    window.open(twitterUrl,'_blank');
}
//Event Listener
NewQuoteBtn.addEventListener('click',newQuote);
TwitterBtn.addEventListener('click',TweetQuote);
//on load
getQuotes();
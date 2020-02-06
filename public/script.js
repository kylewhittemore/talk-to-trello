var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var grammar = '#JSGF V1.0;'
let listeningForName = false;
let listeningForDescription = false;
const card = { name: '', description: '' }

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('#output');
const messages = document.querySelector('#messages');

const btn = document.querySelector('button')
btn.onclick = () => {
  console.log('ready to receive input');
  recognition.start();
}

recognition.onresult = function (event) {

  var last = event.results.length - 1;
  var input = event.results[last][0].transcript;
  console.log(event.results)
  diagnostic.textContent = 'Result received: ' + input + '.';
  console.log('Confidence: ' + event.results[0][0].confidence);

  if (listeningForDescription) {
    card.description = input;
    listeningForDescription = false;
    console.log('ready to receive input');
    messages.textContent = 'ready to receive input';
    console.log(`card name: ${card.name}, card description: ${card.description}`)
  }

  if (listeningForName) {
    card.name = input
    listeningForName = false;
    listeningForDescription = true;
    console.log('ready for new card description.')
    messages.textContent = 'what is the description of the card?'
  }

  if (input.toLowerCase().trim() === 'new trello card' && !listeningForDescription && !listeningForName) {
    console.log('ready for new card input.')
    messages.textContent = 'what is the name of the card?'
    listeningForName = true;
  }

}

recognition.onspeechend = function () {
  recognition.stop();
}

recognition.onerror = function (event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

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
const boardList = document.querySelector('#board-list');

const btn = document.querySelector('#btn')
btn.onclick = () => {
  console.log('ready to receive input');
  recognition.start();
}

const getBoards = document.querySelector('#boards')
getBoards.onclick = () => {
  let token = localStorage.getItem('token')
  console.log("getting boards for token: ", token)
  axios.get(`/api/users/boards/${token}`)
    .then(result => {
      console.log(result)
      result.data.forEach(board => {
        console.log(board.name)
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(board.name);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        boardList.appendChild(node);
      })
    })
    .catch(error => console.log(error))
}

recognition.onresult = async function (event) {

  var last = event.results.length - 1;
  var input = event.results[last][0].transcript.toLowerCase().trim();
  console.log(event.results)
  diagnostic.textContent = 'Result received: ' + input + '.';
  console.log('Confidence: ' + event.results[0][0].confidence);

  if (listeningForDescription) {
    let token = localStorage.getItem('token');
    card.description = input;
    listeningForDescription = false;
    console.log('ready to receive input');
    messages.textContent = 'ready to receive input';
    console.log(`card name: ${card.name}, card description: ${card.description}`)
    const result = await axios.post(`/api/card/${listId}/token/${token}`, card);
    console.log("Card post result: ", result)
    return
  }

  if (listeningForName) {
    card.name = input
    listeningForName = false;
    listeningForDescription = true;
    console.log('ready for new card description.')
    messages.textContent = 'what is the description of the card?'
    return
  }

  if (input === 'new trello card' && !listeningForDescription && !listeningForName) {
    console.log('ready for new card input.')
    messages.textContent = 'what is the name of the card?'
    listeningForName = true;
    return
  }

}

recognition.onspeechend = function () {
  recognition.stop();
}

recognition.onerror = function (event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

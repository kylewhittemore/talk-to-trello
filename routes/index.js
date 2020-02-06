const router = require('express').Router();
const Axios = require('axios');

const baseUrl = 'https://api.trello.com/1/'

router.post('/card', (req, res) => {
    cardName = req.body.cardName;
    cardDescription = req.body.cardDescription

    console.log('Request cardName: ', cardName);
    console.log('Request cardDescription', cardDescription)
    
    const queryUrl = `${baseUrl}cards?name=${cardName}&desc=${cardDescription}&pos=top&idList=5e33039423688f1f1ec37cce&keepFromSource=all&key=${process.env.API_KEY}&token=${process.env.TOKEN}`

    Axios.post(queryUrl)
    .then(response => {
        console.log('Axios response: ', response.data);
        res.json(response.data)
    })
    .catch(error => {
        console.log(error);
        res.json(error)
    });
});

module.exports = router;
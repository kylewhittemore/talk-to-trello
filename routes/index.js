const router = require('express').Router();
const Axios = require('axios');

const baseUrl = 'https://api.trello.com/1/'

router.post('/api/card', (req, res) => {
    name = req.body.name;
    description = req.body.description

    console.log('Request name: ', name);
    console.log('Request description', description)
    
    // const queryUrl = `${baseUrl}cards?name=${name}&desc=${description}&pos=top&idList=5e33039423688f1f1ec37cce&keepFromSource=all&key=${process.env.API_KEY}&token=${process.env.TOKEN}`
    const queryUrl = `${baseUrl}cards?name=${name}&desc=${description}&pos=top&idList=5e3ca5ae070ad821902976ae&keepFromSource=all&key=${process.env.API_KEY}&token=${process.env.TOKEN}`

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
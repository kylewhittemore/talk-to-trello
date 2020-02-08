const router = require('express').Router();
const Axios = require('axios');

const baseUrl = 'https://api.trello.com/1/'

// Posts a new card. User token is passed as a params
router.post('/card/token/:listId/:token', (req, res) => {
    name = req.body.name;
    description = req.body.description;
    list = req.params.listId
    token = req.params.token;
    console.log('Request token', token)
    console.log('Request name: ', name);
    console.log('Request description', description);

    const queryUrl = `${baseUrl}cards?name=${name}&desc=${description}&pos=top&idList=${listId}&keepFromSource=all&key=${process.env.API_KEY}&token=${token}`

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

// Gets a user's boards
router.get('/users/boards/:token', (req, res) => {
    token = req.params.token;
    console.log('Request token', token)
    const url = `https://api.trello.com/1/members/me/boards?key=${process.env.API_KEY}&token=${token}`
    Axios.get(url)
        .then(result => {
            console.log(result.data)
            res.json(result.data)
        })
        .catch((error) => {
            console.log(error)
            res.json(error)
        })
});

// Gets a board's lists
router.get('/boards/lists/:board/:token', (req, res) => {
    board = req.params.board;
    token = req.params.token;
    console.log('Request token', token)

    const url = `https://api.trello.com/1/boards/${board}/lists?cards=none&card_fields=all&filter=open&fields=all&key=${process.env.API_KEY}&token=${token}`;

    Axios.get(url)
        .then(result => {
            console.log(result.data)
            res.json(result.data)
        })
        .catch((error) => {
            console.log(error)
            res.json(error)
        })

})

module.exports = router;
const request = require('request')

module.exports.YoMommaCall = (req, res) => {
    callApi('https://yomomma-api.herokuapp.com/jokes')
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
};

module.exports.YoMommaCallQuery = (req, res) => {
    const query = req.params.query
    callApi(`https://yomomma-api.herokuapp.com/search?query=${query}`)
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}

function callApi(url) {
    return new Promise((resolve, reject) => {
        request(url, {json: true}, (err, res, body) => {
            if(err) reject(err)
            resolve(body)
        }) 
    })
}
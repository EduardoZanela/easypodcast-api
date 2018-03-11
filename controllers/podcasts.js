const podcast = require('../models').Podcast;

module.exports = {
    create(req, res) {
        console.log(JSON.stringify(req.body))
        return podcast.create({
            podid: req.body.podid,
            name: req.body.name,
            author: req.body.author,
            thumbnail: req.body.thumbnail
        })
        .then(podcast => res.status(201).send(podcast))
        .catch(error => res.status(400).send(error));
    }
};
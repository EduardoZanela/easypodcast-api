const user = require('../models').User;
const podcast = require('../models').Podcast;

module.exports = {
    create(req, res) {
        console.log(JSON.stringify(req.body))
        return user.create({
            email: req.body.email,
            password: req.body.password,
            birthday: req.body.birthday,
            name: req.body.name
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    },
    findAll(req, res) {
        return user.findAll({
            include: [{ 
                model: podcast,
                attributes: ['name']
            }]
        })
        .then(user => res.status(200).send(user))
        .catch(error => res.status(400).send(error));
    },
    subscribe(req, res) {
        const podcastItem = req.body.podcast;
        user.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            podcast.findOrCreate({
                where: {
                    podid: req.body.podcast.podid
                },
                defaults: { // set the default properties if it doesn't exist
                    podid: podcastItem.podid,
                    name: podcastItem.name,
                    author: podcastItem.author,
                    thumbnail: podcastItem.thumbnail                  
                }
              })
            .then(pod => {
                console.log(pod[0].dataValues);
                return user.setPodcasts([pod[0].dataValues.podid]).then(resp => res.status(201).send(resp));
            })
            .catch(error => res.status(400).send(error + "+ aqui podcast"));
        })
        .catch(error => res.status(400).send(error));
    },
    unsubscribe(req, res) {
        user.findOne({
            where: {
            email: req.body.email
        }
        }).then(user => {
            podcast.findOne({
                where: {
                    podid: req.body.podid
                }
              })
            .then(pod => {
                return user.removePodcasts([pod]).then(resp => res.status(204).send(user));
            })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
};
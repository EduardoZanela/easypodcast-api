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
        .catch(error => res.send(400).send(error));
    },
    findAll(req, res) {
        return user.findAll({
            include: [{ 
                model: podcast,
                attributes: ['name']
            }]
        })
        .then(user => res.status(200).send(user))
        .catch(error => res.send(400).send(error));
    },
    subscribe(req, res) {
        user.findOne({
            where: {
            email: req.body.email
        }
        }).then(user => {
            return podcast.findById(req.body.podid)
            .then(pod => {
                user.setPodcasts([pod]).then(resp => res.send(201).send(resp));
            })
            .catch(error => res.send(400).send(error));
        })
        .catch(error => res.send(400).send(error));
    }
};
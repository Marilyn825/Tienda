const RAM = require('../models/RAMModel');

function listall(req, res) {
    RAM.find({})
        .then(rams => {
            if(rams.length) return res.status(200).send({rams})
            return res.status(204).send({message: 'No Content'});
        }).catch(err => res.status(500).send({err}))
}

function create(req, res) {
    let ram = new RAM(req.body);
    ram.save()
        .then(ram => res.status(201).send({ram}))
        .catch(err => res.status(500).send({err}))
}

function show(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.rams) return res.status(404).send({message: 'Not Found'});
    let rams = req.body.rams;
    return res.status(200).send({rams});
}

function update(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.rams) return res.status(404).send({message: 'Not Found'});
    let ram = req.body.rams[0];
    ram = Object.assign(ram, req.body);
    ram.save()
        .then(ram => res.status(200).send({message: 'RAM Updated', ram}))
        .catch(err => res.status(500).send({err}))
}

function destroy(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.rams) return res.status(404).send({message: 'Not Found'});
    req.body.rams[0].deleteOne()
        .then(() => res.status(200).send({message: 'RAM Deleted'}))
        .catch(err => res.status(500).send({err}))
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value;
    RAM.find(query).then(rams => {
        if(!rams.length) return next();
        req.body.rams = rams;
        return next();
    }).catch(err => {
        req.body.error = err;
        next();
    })
}

module.exports = { listall, create, show, update, destroy, find }
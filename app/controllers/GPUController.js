const GPU = require('../models/GPUModel');

function listall(req, res) {
    GPU.find({})
        .then(gpus => {
            if(gpus.length) return res.status(200).send({gpus})
            return res.status(204).send({message: 'No Content'});
        }).catch(err => res.status(500).send({err}))
}

function create(req, res) {
    let gpu = new GPU(req.body);
    gpu.save()
        .then(gpu => res.status(201).send({gpu}))
        .catch(err => res.status(500).send({err}))
}

function show(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.gpus) return res.status(404).send({message: 'Not Found'});
    let gpus = req.body.gpus;
    return res.status(200).send({gpus});
}

function update(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.gpus) return res.status(404).send({message: 'Not Found'});
    let gpu = req.body.gpus[0];
    gpu = Object.assign(gpu, req.body);
    gpu.save()
        .then(gpu => res.status(200).send({message: 'GPU Updated', gpu}))
        .catch(err => res.status(500).send({err}))
}

function destroy(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.gpus) return res.status(404).send({message: 'Not Found'});
    req.body.gpus[0].deleteOne()
        .then(() => res.status(200).send({message: 'GPU Deleted'}))
        .catch(err => res.status(500).send({err}))
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value;
    GPU.find(query).then(gpus => {
        if(!gpus.length) return next();
        req.body.gpus = gpus;
        return next();
    }).catch(err => {
        req.body.error = err;
        next();
    })
}

module.exports = { listall, create, show, update, destroy, find }
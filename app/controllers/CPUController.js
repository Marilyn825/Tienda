const CPU = require('../models/CPUModel');

function listall(req, res) {
    CPU.find({})
        .then(cpus => {
            if(cpus.length) return res.status(200).send({cpus})
            return res.status(204).send({message: 'No Content'});
        }).catch(err => res.status(500).send({err}))
}

function create(req, res) {
    let cpu = new CPU(req.body);
    cpu.save()
        .then(cpu => res.status(201).send({cpu}))
        .catch(err => res.status(500).send({err}))
}

function show(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.cpus) return res.status(404).send({message: 'Not Found'});
    let cpus = req.body.cpus;
    return res.status(200).send({cpus});
}

function update(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.cpus) return res.status(404).send({message: 'Not Found'});
    let cpu = req.body.cpus[0];
    cpu = Object.assign(cpu, req.body);
    cpu.save()
        .then(cpu => res.status(200).send({message: 'CPU Updated', cpu}))
        .catch(err => res.status(500).send({err}))
}

function destroy(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.cpus) return res.status(404).send({message: 'Not Found'});
    req.body.cpus[0].deleteOne()
        .then(() => res.status(200).send({message: 'CPU Deleted'}))
        .catch(err => res.status(500).send({err}))
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value;
    CPU.find(query).then(cpus => {
        if(!cpus.length) return next();
        req.body.cpus = cpus;
        return next();
    }).catch(err => {
        req.body.error = err;
        next();
    })
}

module.exports = { listall, create, show, update, destroy, find }
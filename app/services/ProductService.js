function validate(body) {
    if (!body) {
        throw new Error('No se enviaron datos');
    }
    return body;
}

module.exports = { validate };
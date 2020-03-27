module.exports = app => {
    const getSetores = (req, res) => {
        app.db('setor')
            .orderBy('name')
            .then(setor => res.json(setor))
            .catch(err => res.status(400).json(err))
    }
    return { getSetores }
}

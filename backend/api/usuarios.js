module.exports = app => {
    const getUsuarios = (req, res) => {
        app.db('usuario')
            .orderBy('name')
            .then(usuario => res.json(usuario))
            .catch(err => res.status(400).json(err))
    }

    const getMaxIdUsuario = (req, res) => {
        app.db('usuario')
            .orderBy('id', 'desc')
            .first()
            .then(usuario => res.json(usuario))
            .catch(err => res.status(400).json(err))
    }

    const insertUsuario = (req, res) => {
        app.db('usuario')
            .insert(req.body)
            .then(usuario => res.json(usuario))
            .catch(err => res.status(400).json(err))
    }

    const updateUsuario = (req, res) => {
        const { id, name } = req.params
        app.db('usuario')
            .where({ id })
            .update({ name })
            .then(usuario => res.json(usuario))
            .catch(err => res.status(400).json(err))
    }

    const deleteUsuario = (req, res) => {
        const { id } = req.params
        app.db('usuario')
            .where({ id })
            .del()
            .then(usuario => res.json(usuario))
            .catch(err => res.status(400).json(err))
    }
    return { getUsuarios, getMaxIdUsuario, insertUsuario, updateUsuario, deleteUsuario }
}

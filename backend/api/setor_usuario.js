module.exports = app => {
    const getSetorUsuario = (req, res) => {
        const { setor_id, usuario_id } = req.query
        app.db('setor_usuario')
            .where({ setor_id, usuario_id })
            .first()
            .then(setor => res.json(setor))
            .catch(err => res.status(400).json(err))
    }

    const insertSetorUsuario = (req, res) => {
        app.db('setor_usuario')
            .insert( req.body )
            .then(setorUsuario => res.json(setorUsuario))
            .catch(err => res.status(400).json(err))
    }

    const updateSetorUsuario = (req, res) => {
        const { setor_id, usuario_id, grant_access } = req.params
        app.db('setor_usuario')
            .where({ setor_id, usuario_id })
            .update({ grant_access })
            .then(setorUsuario => res.json(setorUsuario))
            .catch(err => res.status(400).json(err))
    }

    const deleteSetorUsuario = (req, res) => {
        const { usuario_id } = req.params
        app.db('setor_usuario')
            .where({ usuario_id })
            .del()
            .then(setorUsuario => res.json(setorUsuario))
            .catch(err => res.status(400).json(err))
    }
    return { getSetorUsuario, insertSetorUsuario, updateSetorUsuario, deleteSetorUsuario }
}

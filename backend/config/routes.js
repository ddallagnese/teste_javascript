module.exports = app => {
    app.route('/setores')
        .get(app.api.setores.getSetores)

    app.route('/maxIdUsuario')
        .get(app.api.usuarios.getMaxIdUsuario)
    
    app.route('/usuarios')
        .get(app.api.usuarios.getUsuarios)
        .post(app.api.usuarios.insertUsuario)
        
    app.route('/usuarios/:id')
        .delete(app.api.usuarios.deleteUsuario)
    
    app.route('/usuarios/:id/:name')
        .put(app.api.usuarios.updateUsuario)

    app.route('/setor_usuario')
        .get(app.api.setor_usuario.getSetorUsuario)
        .post(app.api.setor_usuario.insertSetorUsuario)
    
    app.route('/setor_usuario/:usuario_id')
        .delete(app.api.setor_usuario.deleteSetorUsuario)

    app.route('/setor_usuario/:usuario_id/:setor_id/:grant_access')
        .put(app.api.setor_usuario.updateSetorUsuario)
}
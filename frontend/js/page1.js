function lerSetorUsuario(e) {
    e.preventDefault()
    
    const validar = (setor_usuario) => {
        ohSnapX()
        if (!setor_usuario) {
            ohSnap('Nenhuma correspondência encontrada para o setor e usuário informados', {color: 'red'})
            return
        }
        if (setor_usuario.grant_access) {
            ohSnap('Usuário Liberado', {color: 'green'})
        } else {
            ohSnap('Usúario SEM permissão de acesso', {color: 'yellow'})
        }
    }
    
    const { setor, usuario } = document.pesquisa
    if (!setor.value) {
        ohSnap('Informe o setor!', {color: 'red'})
        return
    }
    if (!usuario.value) {
        ohSnap('Informe o usuário!', {color: 'red'})
        return
    }

    if (setor.value && usuario.value) {
        axios.get(`http://localhost:3000/setor_usuario?setor_id=${setor.value}&usuario_id=${usuario.value}`)
            .then(response => validar(response.data))
            .catch(error => console.log(error.message))    
    }
}

const a = document.querySelector('[valida-setor-usuario]')
a.onclick = lerSetorUsuario

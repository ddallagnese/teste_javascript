axios.get('http://localhost:3000/usuarios')
    .then(response => listarUsuarios(response.data))
    .catch(error => {
        ohSnap('Erro ao ler os usuários: '+error.message, {color: 'red'})
        return
    })

const listarUsuarios = (usuarios) => {
    const ulUsuarios = document.createElement('ul')
    usuarios.map(usuario => {
        const listaUsuario = document.createElement('li')
        listaUsuario.innerHTML = usuario.name
            const botaoEditar = document.createElement('button')
            botaoEditar.setAttribute('type','button')
            botaoEditar.appendChild(document.createTextNode('Editar'))
            botaoEditar.onclick = function() { 
                editarUsuario(usuario)
            }
            listaUsuario.appendChild(botaoEditar)

            const botaoExcluir = document.createElement('button')
            botaoExcluir.setAttribute('type','button')
            botaoExcluir.appendChild(document.createTextNode('Excluir'))
            botaoExcluir.onclick = function() { 
                excluirUsuario(usuario.id)
            }
            listaUsuario.appendChild(botaoExcluir)
        ulUsuarios.appendChild(listaUsuario)
    })
    const divUsuarios = document.getElementById('usuarios')
    divUsuarios.appendChild(ulUsuarios)
    
    const botaoNovo = document.createElement('button')
    botaoNovo.setAttribute('type','button')
    botaoNovo.appendChild(document.createTextNode('Novo Usuário'))
    botaoNovo.onclick = function() { 
        criarUsuario()
    }
    divUsuarios.appendChild(botaoNovo)
    divUsuarios.appendChild(document.createElement('br'))
    divUsuarios.appendChild(document.createElement('br'))
}

const editarUsuario = (usuario) => {
    const body = document.getElementById('body')
    if (document.getElementById('editarUsuario')){
        body.removeChild(document.getElementById('editarUsuario'))
    }

    const divEditUsuario = document.createElement('div')
    divEditUsuario.id = 'editarUsuario'
    divEditUsuario.appendChild(document.createTextNode('Código: '))
    const textIdUsuario = document.createElement('input')
    textIdUsuario.id = 'idUsuario'
    textIdUsuario.value = usuario.id
    textIdUsuario.disabled = true
    divEditUsuario.appendChild(textIdUsuario)
    divEditUsuario.appendChild(document.createElement('br'))
    divEditUsuario.appendChild(document.createTextNode('Nome do usuário: '))
    const inputNomeUsuario = document.createElement('input')
    inputNomeUsuario.id = 'nomeUsuario'
    inputNomeUsuario.value = usuario.name
    divEditUsuario.appendChild(inputNomeUsuario)
    divEditUsuario.appendChild(document.createElement('br'))
    
    body.appendChild(divEditUsuario)
    
    axios.get('http://localhost:3000/setores')
        .then(response => listarSetores(response.data, usuario.id))
        .catch(error => ohSnap('Erro ao ler os setores: '+error.message, {color: 'red'}))
}

const criarUsuario = () => {
    const body = document.getElementById('body')
    if (document.getElementById('editarUsuario')){
        body.removeChild(document.getElementById('editarUsuario'))
    }

    const divEditUsuario = document.createElement('div')
    divEditUsuario.id = 'editarUsuario'
    divEditUsuario.appendChild(document.createTextNode('Nome do usuário: '))
    const inputNomeUsuario = document.createElement('input')
    inputNomeUsuario.id = 'nomeUsuario'
    divEditUsuario.appendChild(inputNomeUsuario)
    divEditUsuario.appendChild(document.createElement('br'))
    
    body.appendChild(divEditUsuario)
    
    axios.get('http://localhost:3000/setores')
        .then(response => listarSetores(response.data, null))
        .catch(error => ohSnap('Erro ao ler os setores: '+error.message, {color: 'red'}))
}

const listarSetores = (setores, idUsuario) => {
    const divEditUsuario = document.getElementById('editarUsuario')
    
    divEditUsuario.appendChild(document.createElement('br'))
    const textSetor = document.createTextNode('Marque os setores com permissão para o usuário')
    divEditUsuario.appendChild(textSetor)
    
    const ulSetores = document.createElement('ul')
    ulSetores.id = 'setores'
    
    setores.map(async setor => {
        let checked
        if (idUsuario == null){
            checked = false
        } else {
            await axios.get(`http://localhost:3000/setor_usuario?setor_id=${setor.id}&usuario_id=${idUsuario}`)
                .then(response => checked = response.data.grant_access == 1)
                .catch(() => checked = false)  
        }
        const listaSetor = document.createElement('li')
        listaSetor.id = setor.id
        listaSetor.innerHTML = setor.name
            const chkSetor = document.createElement('input')
            chkSetor.setAttribute('type', 'checkbox')
            chkSetor.id = 'chkSetor'+setor.id
            chkSetor.checked = checked
            listaSetor.appendChild(chkSetor)
        ulSetores.appendChild(listaSetor)
    })
    
    divEditUsuario.appendChild(ulSetores)

    const botaoSalvar = document.createElement('button')
    botaoSalvar.setAttribute('type','button')
    botaoSalvar.appendChild(document.createTextNode('Salvar'))
    botaoSalvar.onclick = function() { 
        salvarUsuario()
    }
    divEditUsuario.appendChild(botaoSalvar)
}

const salvarUsuario = () => {
    const novoUsuario = document.getElementById('idUsuario') == undefined
    let idUsuario
    const nomeUsuario = document.getElementById('nomeUsuario').value
    if (novoUsuario){
        if (!nomeUsuario.trim()){
            ohSnap('Informe o nome do usuário', {color: 'red'})
            return
        }
        axios.get('http://localhost:3000/maxIdUsuario')
            .then(response => {
                if (response.data.id){
                    idUsuario = response.data.id + 1
                } else {
                    idUsuario = 1
                }
                axios.post('http://localhost:3000/usuarios', {
                        id: idUsuario,
                        name: nomeUsuario
                    })
                    .then(() => tratarSetorUsuario(idUsuario, novoUsuario))
                    .catch(error => {
                        ohSnap('Erro ao incluir usuário: '+error.message, {color: 'red'})
                        return
                    })
            })
            .catch(error => {
                ohSnap('Erro ao buscar código de usuário: '+error.message, {color: 'red'})
                return
            })
    } else {
        idUsuario = document.getElementById('idUsuario').value
        axios.put(`http://localhost:3000/usuarios/${idUsuario}/${nomeUsuario}`)
            .then(() => tratarSetorUsuario(idUsuario, novoUsuario))
            .catch(error => {
                ohSnap('Erro ao atualizar usuário: '+error.message, {color: 'red'})
                return
            })
    }
}

const tratarSetorUsuario = async (idUsuario, novoUsuario) => {
    await salvarSetorUsuario(idUsuario, novoUsuario)
    location.reload()
}

const salvarSetorUsuario = async (idUsuario, novoUsuario) => {
    for (const li of document.querySelectorAll('#editarUsuario>ul>li')) {
        const idSetor = li.id
        const checked = document.getElementById('chkSetor'+li.id).checked ? 1 : 0
        if (novoUsuario){
            await axios.post(`http://localhost:3000/setor_usuario`, {
                setor_id: idSetor,
                usuario_id: idUsuario,
                grant_access: checked
                })
                .catch(error => ohSnap('Erro ao criar setores do usuário: '+error.message, {color: 'red'}))
        } else {
            await axios.put(`http://localhost:3000/setor_usuario/${idUsuario}/${idSetor}/${checked}`)
                .catch(error => ohSnap('Erro ao atualizar setores do usuário: '+error.message, {color: 'red'}))
        }
    }
}

const excluirUsuario = async (idUsuario) => {
    await axios.delete(`http://localhost:3000/setor_usuario/${idUsuario}`)
        .then(() => ohSnap(`Usuário ${idUsuario} excluído`, {color: 'green'}))
        .catch(error => {
            ohSnap('Erro ao excluir setores do usuário: '+error.message, {color: 'red'})
            return
    })
    await axios.delete(`http://localhost:3000/usuarios/${idUsuario}`)
        .then(() => ohSnap(`Usuário ${idUsuario} excluído`, {color: 'green'}))
        .catch(error => {
            ohSnap('Erro ao excluir o usuário: '+error.message, {color: 'red'})
            return
    })
    location.reload()
}
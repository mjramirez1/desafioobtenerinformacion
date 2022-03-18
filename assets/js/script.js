const baseUrl = 'https://api.github.com/users/'
const formulario = document.querySelector('#formulario')
const resultado1 = document.querySelector('#resultado1')
const resultado2 = document.querySelector('#resultado2')

const request = async (url) => {
    const results = await fetch(url)
    const response = await results.json()
    return response
}

const getUser = async (user) => {
    const userUrl = `${baseUrl}${user}`
    const data = await request(userUrl)
    return data
}

const getRepos = async (user, page, perPage) => {
    const reposUrl = `${baseUrl}${user}/repos?page=${page}&per_page=${perPage}`
    const data = await request(reposUrl)
    return data
}

const crearLink = repo =>`<a href="${repo.html_url}">${repo.name}</a>`

const consultaApi = async (event) => {
    event.preventDefault()
    const user = document.querySelector('#nombre').value
    const page = document.querySelector('#pagina').value
    const perPage = document.querySelector('#repoPagina').value

    try {
        const userData = await getUser(user)
        const reposData = await getRepos(user, page, perPage)
        resultado1.innerHTML =
            `
                    <h5>Datos de usuario</h5>
                    <img src="${userData.avatar_url}"/>
                    <p>Nombre de usuario: ${userData.login}</p>
                    <p>Nombre de login: ${userData.login}</p>
                    <p>Cantidad de repositorios: ${userData.public_repos}</p>
                    <p>Localidad: ${userData.location}</p>
                    <p>Nombre de tipo de usuario: ${userData.type}</p>
            `
        const cantidadRepos = reposData.map(r => crearLink(r))
        resultado2.innerHTML = '<h5>Nombre de repositorios</h5>' + cantidadRepos.join("<br>")
    } catch (error) {
        resultado1.innerHTML = ''
        resultado2.innerHTML = ''
        alert('El usuario no existe')
    }
}

formulario.addEventListener('submit', consultaApi)

const atendimentos = require('../models/Tasks')
const Tasks = require('../models/Tasks')
const teste = require('../scheduler/index')

module.exports = app => {
    app.get('/tasks', (req, res) => { // Lista todos os agendamentos
        Tasks.list(res)
        teste.teste()
    })

    app.get('/tasks/id/:id', (req, res) => { // Procura tarefas por ID
        const id = parseInt(req.params.id)

        Tasks.searchId(id, res)
    })

    app.get('/tasks/client/:client', (req, res) => { // Procura terefas por Cliente
        //const id = parseInt(req.params.id)
        const client = req.params.client
        Tasks.searchClient(client, res)
    })

    app.post('/tasks', (req, res) => { // Adiciona nova tarefa
        const tasks = req.body

        Tasks.add(tasks, res)
    })

    app.patch('/tasks/id/:id', (req, res) => { // Altera Tarefas
        const id = parseInt(req.params.id)
        const value = req.body

        Tasks.alter(id, value, res)
    })

    app.delete('/tasks/id/:id', (req, res) => { // Delete Tarefas
        const id = parseInt(req.params.id)

        Tasks.delete(id, res)
    })
}

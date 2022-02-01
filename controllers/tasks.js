const atendimentos = require('../models/Tasks')
const Tasks = require('../models/Tasks')
const teste = require('../scheduler/index')

module.exports = app => {
    app.get('/tasks', (req, res) => { // Lista todos os agendamentos
        Tasks.list(res)
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
        client = tasks.client
        number = tasks.number
        if (tasks.status){
            status = tasks.status
        } else {
            status = 'Ativo'
        }
        Tasks.add(tasks, res, client, number, status)
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

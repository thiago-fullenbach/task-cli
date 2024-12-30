const fs = require('node:fs/promises')
const path = require('node:path')
const { taskBinarySearch } = require('./search')
const { stat } = require('node:fs')
const { ERROR_RSC_NOT_FOUND } = require('./constants/strings')
const { INVALID_POS } = require('./constants/values')

const PATH_DATABASE = path.join(process.cwd(), 'database', 'db.json')

const Database = {
    addTask: async (task) => {
        try {
            let tasks = await Database.readTasks()
            let lastId = 0

            if(tasks.length > 0)
                lastId = tasks[tasks.length - 1].id
    
            // Creates an ID for the new task
            task = {
                ...task,
                id: lastId + 1
            }
    
            // Adds it to the list
            tasks.push(task)
    
            await fs.writeFile(PATH_DATABASE, JSON.stringify(tasks))
            return task
        } catch(err) {
            throw err
        }
    },
    updateTask: async (id, task) => {
        try {
            let tasks = await readTasksFromFile()
            let taskPos = taskBinarySearch(id, tasks)

            if(taskPos === INVALID_POS)
                throw { message: ERROR_RSC_NOT_FOUND }

            tasks[taskPos] = task
            await writeTasksToFile(tasks)
            return task
        } catch(err) {
            throw err
        }
    },
    deleteTask: async (id) => {
        try {
            let tasks = await readTasksFromFile()
            let taskPos = taskBinarySearch(id, tasks)

            if(taskPos === INVALID_POS)
                throw { message: ERROR_RSC_NOT_FOUND }

            tasks.splice(taskPos, 1)
            await writeTasksToFile(tasks)
            return true
        } catch(err) {
            throw err
        }
    },
    readTask: async (id) => {
        try {
            let tasks = await readTasksFromFile()
            let taskPos = taskBinarySearch(id, tasks)

            if(taskPos === INVALID_POS)
                throw { message: ERROR_RSC_NOT_FOUND }

            return tasks[taskPos]
        } catch(err) {
            throw err
        }
    },
    readTasks: async (status = null) => {
        try {
            let tasks = await readTasksFromFile()
            return tasks.filter(task => !status || task.status.id === status.id)
        } catch(err) {
            throw err
        }
    }
}

const readTasksFromFile = async () => {
    return await fs.readFile(PATH_DATABASE, { encoding: 'utf8' })
        .then(data => JSON.parse(data))
        .catch(err => {
            throw err
        })
}

const writeTasksToFile = async (tasks) => {
    if(!!tasks) {
        await fs.writeFile(PATH_DATABASE, JSON.stringify(tasks))
    }
}

module.exports = Database
const fs = require('node:fs/promises')
const path = require('node:path')
const { taskBinarySearch } = require('./search')
const { ERROR_RSC_NOT_FOUND } = require('./constants/strings')
const { INVALID_POS } = require('./constants/values')

const PATH_DATABASE = path.join(__dirname, '../database', 'db.json')

const Database = {
    addTask: async (task) => {
        let tasks = await Database.readTasks()
        let lastId = 0

        if(tasks.length > 0)
            lastId = tasks[tasks.length - 1].id
    
        // Creates an ID for the new task - Ensures that the list will be in order
        task = {
            ...task,
            id: lastId + 1
        }
    
        // Adds it to the end of the list
        tasks.push(task)
    
        await writeTasksToFile(tasks)
        return task
    },
    updateTask: async (id, task) => {
        let tasks = await readTasksFromFile()
        let taskPos = taskBinarySearch(id, tasks)

        // Ensures that task exists
        if(taskPos === INVALID_POS)
            throw { message: ERROR_RSC_NOT_FOUND }

        tasks[taskPos] = task
        await writeTasksToFile(tasks)
        return task
    },
    deleteTask: async (id) => {
        let tasks = await readTasksFromFile()
        let taskPos = taskBinarySearch(id, tasks)

        if(taskPos === INVALID_POS)
            throw { message: ERROR_RSC_NOT_FOUND }

        tasks.splice(taskPos, 1)
        await writeTasksToFile(tasks)
        return true
    },
    readTask: async (id) => {
        let tasks = await readTasksFromFile()
        let taskPos = taskBinarySearch(id, tasks)

        if(taskPos === INVALID_POS)
            throw { message: ERROR_RSC_NOT_FOUND }

        return tasks[taskPos]
    },
    readTasks: async (status = null) => {
        let tasks = await readTasksFromFile()
        // Get tasks that fit the filter options or all tasks, if filter is invalid
        return tasks.filter(task => !status || task.status.id === status.id)
    }
}

// Helper functions
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
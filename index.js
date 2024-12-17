#!/usr/bin/env node
const { argv } = require('node:process')

// Constants
const { Command, Status } = require('./utils/constants/objects')
const { NOT_FND_ERROR } = require('./utils/constants/strings')

// Controller
const { TaskController } = require('./controller/TaskController')

const [ cmd, ...args ] = argv.slice(2)

try {
    switch(cmd) {
        case Command.ADD:
            let taskToAdd = TaskController.addTask(args.join(' '))
            break
        case Command.UPDATE:
            TaskController.updateTask(Number.parseInt(args[0]), args[1])
            break
        case Command.DELETE:
            TaskController.deleteTask(Number.parseInt(args[0]))
            break
        case Command.MARK_IN_PROGRESS:
            let taskToMarkAsProgress = TaskController.getTask(Number.parseInt(args[0]))
            TaskController.updateTask(taskToMarkAsProgress.id, { status: Status.IN_PROGRESS, ...taskToMarkAsProgress })
            break
        case Command.MARK_DONE:
            let taskToMarkAsDone = TaskController.getTask(Number.parseInt(args[0]))
            TaskController.updateTask(taskToMarkAsDone.id, { status: Status.DONE, ...taskToMarkAsDone })
            break
        case Command.LIST:
            TaskController.getTaskList(args[0])
            break
        case Command.HELP:
            console.log(`Ajuda`)
            break
        default:
            // Given command not found.
            console.error(NOT_FND_ERROR(cmd))
    }
} catch(err) {
    console.error(err.message)
}
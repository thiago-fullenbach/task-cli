const MSG_CLI_USAGE = `\n\nUsage: task-cli <COMMAND> [ARGUMENTS]\nType 'task-cli help' to list all available commands.`
const MSG_NO_TASKS = 'No tasks have been registered.'
const MSG_SUCCESS_ADD_TASK = (task) => `Task created successfully: [${task.id}: ${JSON.stringify(task)}]`

const ERROR_INVALID_ARG = (arg, expectedType) => getCLIErrorMsg(`Unexpected type ${typeof arg} - Expected ${expectedType}`)
const ERROR_RSC_NOT_FOUND = (id) => `Reference object with ID=${id} not found` // Resource not found
const ERROR_MISSING_ARGS = (argName) => getCLIErrorMsg(`Missing arguments: '${argName}'`) // Argument missing
const ERROR_CMD_NOT_FND = (cmd) => getCLIErrorMsg(`Command not found: '${cmd}'`) // Command not found

// Default error msg
const getCLIErrorMsg = (error) => `${error}${MSG_CLI_USAGE}`

module.exports = {
    MSG_SUCCESS_ADD_TASK,
    MSG_NO_TASKS,
    ERROR_INVALID_ARG,
    ERROR_RSC_NOT_FOUND,
    ERROR_MISSING_ARGS,
    ERROR_CMD_NOT_FND
}
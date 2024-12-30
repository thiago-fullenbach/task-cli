const MSG_CLI_USAGE = `\n\nUsage: task-cli <COMMAND> [ARGUMENTS]\nType 'task-cli help' to list all available commands.`
const MSG_NO_TASKS = 'No tasks have been registered.'
const MSG_SUCCESS_ADD_TASK = (task) => `Task created successfully: [${task.id}: ${JSON.stringify(task)}]`

const ERROR_CMD_NOT_FND = (cmd) => getCLIErrorMsg(`Command not found: '${cmd}'`)
const ERROR_INVALID_ARG_TYPE = (arg, expectedType) => getCLIErrorMsg(`Unexpected type ${typeof arg} - Expected ${expectedType}`)
const ERROR_INVALID_ARG_VALUE = (arg) => getCLIErrorMsg(`Invalid value: ${arg}`)
const ERROR_INVALID_STATUS = (arg) => getCLIErrorMsg(`Invalid status: ${arg}`)
const ERROR_MISSING_ARGS = (argName) => getCLIErrorMsg(`Missing arguments: '${argName}'`)
const ERROR_TOO_MANY_ARGS = (cmd, argCount, expectedCount) => getCLIErrorMsg(`Too many arguments for command '${cmd}: ${argCount} - Expected ${expectedCount}'`)
const ERROR_RSC_NOT_FOUND = (id) => `Reference object with ID=${id} not found`

// Default error msg
const getCLIErrorMsg = (error) => `${error}${MSG_CLI_USAGE}`

module.exports = {
    MSG_NO_TASKS,
    MSG_SUCCESS_ADD_TASK,
    ERROR_CMD_NOT_FND,
    ERROR_INVALID_ARG_TYPE,
    ERROR_INVALID_ARG_VALUE,
    ERROR_INVALID_STATUS,
    ERROR_MISSING_ARGS,
    ERROR_TOO_MANY_ARGS,
    ERROR_RSC_NOT_FOUND
}
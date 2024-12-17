const HELP_CMD_MSG = `\n\nUsage: task-cli <COMMAND> [ARGUMENTS]\nType 'task-cli help' to list all available commands.`

const MISSING_ARGS_ERROR = (argName) => getErrorMsg(`Missing arguments: '${argName}'`) // Argument missing
const NOT_FND_ERROR = (cmd) => getErrorMsg(`Command not found: '${cmd}'`) // Command not found

// Default error msg
const getErrorMsg = (error) => `${error}${HELP_CMD_MSG}`

module.exports = {
    MISSING_ARGS_ERROR,
    NOT_FND_ERROR
}
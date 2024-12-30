// Available Commands
const Command = Object.freeze({
    ADD: "add",
    UPDATE: "update",
    DELETE: "delete",
    MARK_IN_PROGRESS: "mark-in-progress",
    MARK_DONE: "mark-done",
    LIST: "list",
    HELP: "help"
})

// Task Status
const Status = Object.freeze({
    TODO: { id: 0, name: "todo" },
    IN_PROGRESS: { id: 1, name: "in-progress" },
    DONE: { id: 2, name: "done" },
    getByName: (name) => {
        const { areStringsEqual } = require("../validation")
        return Object.values(Status).find(status => areStringsEqual(name, status.name))
    }
})

module.exports = {
    Command,
    Status
}
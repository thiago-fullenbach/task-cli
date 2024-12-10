#!/usr/bin/env node
const { argv } = require('node:process')

const args = argv.slice(2)
const helpMsg = 
`Command not found: '${args.join(' ')}'

Usage: task-cli <COMMAND> [ARGUMENTS]
Type 'task-cli help' to list all available commands.`; 

// TODO: Implementar comandos
if(args.length <= 0) {
    console.log(helpMsg)
} else {
    console.log("Hello World!")
}
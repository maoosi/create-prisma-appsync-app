#!/usr/bin/env node
const path = require('path')
const cli = require('cac')()

cli
    .command('<target-folder>', 'Scaffold boilerplate to target folder')
    .option(
        '--pm <package-manager>',
        `Choose an package manager ('yarn' | 'npm')`,
        { default: 'yarn' }
    )
    .option(
        '--generator <generator>',
        `Choose a generator ('maoosi/prisma-appsync#next' | './my-local-prisma-appsync')`,
        { default: 'maoosi/prisma-appsync#main' }
    )
    .option(
        '--test',
        `TEST mode w/ local Prisma-AppSync directory`
    )
    .action(async (targetFolder, { pm, generator, test }) => {
        const sao = require('sao')

        const options = {
            generator: generator,
            outDir: targetFolder,
            npmClient: pm
        }

        if (typeof test !== 'undefined') {
            console.log(`Running using TEST mode.`)
            options.testingMode = true
            options.testingTimestamp = new Date().getTime()
            options.outDir = `prisma-appsync-testapp-${options.testingTimestamp}`
            options.generator = `./prisma-appsync`
        }

        const app = sao(options)

        await app.run().catch(sao.handleError)
    })

cli.help()
cli.version(require('../package').version)

cli.parse()

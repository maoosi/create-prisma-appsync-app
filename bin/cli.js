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
    .action(async (targetFolder, { pm, generator }) => {
        const sao = require('sao')

        const app = sao({
            generator: generator,
            outDir: targetFolder,
            npmClient: pm
        })

        await app.run().catch(sao.handleError)
    })

cli.help()
cli.version(require('../package').version)

cli.parse()

#!/usr/bin/env node
const path = require('path')
const cli = require('cac')()

cli
    .command('<target-folder>', 'Scaffold boilerplate to target folder')
    .option(
        '--pm <package-manager>',
        `Choose an package manager ('yarn' | 'npm')`
    )
    .action(async (targetFolder, { pm }) => {
        const sao = require('sao')

        const app = sao({
            generator: 'maoosi/prisma-appsync',
            outDir: targetFolder,
            npmClient: pm
        })

        await app.run().catch(sao.handleError)
    })

cli.help()
cli.version(require('../package').version)

cli.parse()

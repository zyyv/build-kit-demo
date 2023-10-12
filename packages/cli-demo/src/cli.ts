import path from 'node:path'
import process from 'node:process'
import consola from 'consola'
import cac from 'cac'
import * as p from '@clack/prompts'
import color from 'picocolors'
import fs from 'fs-extra'
import { version } from '../package.json'
import type { Project } from './types'
import { sleep } from '.'

const copyAimPath = path.resolve(__dirname, '../../vite-vue-component-demo')

startCli().catch(consola.error)

async function startCli(cwd = process.cwd()) {
  const cli = cac('cli-demo')

  cli.command('clear', 'Clear project')
    .option('-f, --force', 'Force clear')
    .option('-a, --all', 'Clear all')
    .option('-s, --select <file>', 'Clear select file')
    .action(async (options) => {
      console.log(options)

      if (options.select) {
        console.log('remove file: ', path.resolve(cwd, options.select))
        await fs.remove(path.resolve(cwd, options.select))
        p.log.success(`Clear ${options.select} success!`)
      }

      if (options.all) {
        const confirm = await p.confirm({
          message: 'Are you sure you want to clear all files?',
          initialValue: false,
        })
        if (confirm) {
          await fs.remove(cwd)
          p.log.success('Clear all success!')
        }
      }
    })

  cli
    .command('ui', 'Cli Demo Prompt UI')
    .action(() => {
      promptUI(cwd)
    })

  cli.help()
  cli.version(version)
  cli.parse()
}

async function promptUI(cwd: string) {
  p.intro(color.bold('Welcome to use cli-demo UI!'))

  const project = await cmdProcess()
  console.log(project)

  await createProject(project, cwd)

  if (project.install) {
    const s = p.spinner()
    s.start(color.blue('Installing at full speed...'))
    await sleep(2000)
    s.message(color.yellow('Wait a moment and go have a cup of tea 🍵 ...'))
    await sleep(2000)
    s.stop('Install Successfull!')
  }

  p.note(`${'Time'.padStart(15)}: ${color.blue('4.123 s')}
${'Dependencies'.padStart(15)}: ${color.yellow('100 deps')}
${'Size'.padStart(15)}: ${color.red('5.12 kb')}`, 'Install Details!')

  p.outro(color.bold('Thanks for using cli-demo UI!'))
}

async function cmdProcess() {
  return await p.group<Project>(
    {
      name: () =>
        p.text({
          message: 'Your Project Name.',
          placeholder: 'input your project name',
          validate: (value) => {
            if (!value)
              return 'Please enter a name.'
          },
        }),
      framework: () =>
        p.select({
          message: 'Pick a project type.',
          options: [
            { value: 'ts-vue', label: 'TypeScript + Vue', hint: 'Best' },
            { value: 'ts-react', label: 'TypeScript + React', hint: 'Worst' },
            { value: 'js-vue', label: 'JavaScript + Vue' },
            { value: 'js-react', label: 'JavaScript + React' },
          ],
        }),
      congfig: () =>
        p.multiselect({
          message: 'Select additional tools.',
          options: [
            { value: 'eslint', label: 'ESLint', hint: 'recommended' },
            { value: 'prettier', label: 'Prettier' },
            { value: 'gh-action', label: 'GitHub Action' },
          ],
          required: false,
        }),
      install: () =>
        p.confirm({
          message: 'Install now?',
          initialValue: false,
        })
      ,
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.')
        process.exit(1)
      },
    },
  )
}

async function createProject(project: Project, cwd: string) {
  const { name } = project
  const projectPath = `${cwd}/${name as string}`
  if (fs.existsSync(projectPath)) {
    consola.error('The project already exists')
    process.exit(1)
  }
  else {
    await fs.mkdir(projectPath)
    await fs.copy(copyAimPath, projectPath, {
      filter: src => !src.includes('node_modules'),
    })
  }
}

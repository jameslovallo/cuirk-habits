import { md } from 'cuirk'
import { editor } from '../src/components/index.js'

export const meta = {
	title: 'Edit',
}

export const body = md`
# ${meta.title}

${editor()}
`

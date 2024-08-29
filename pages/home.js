import { md } from 'cuirk'
import { circles } from '../src/components/index.js'

export const meta = {
	title: 'Circles',
}

export const body = md`
# ${meta.title}

${circles()}
`

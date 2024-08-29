import { componentScripts, componentStyles, html } from 'cuirk'
import * as components from '../components/index.js'
import navLinks from '../data/nav.js'

const { footer, pageMeta, nav } = components

export default ({ meta, children }) => {
	return html`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<!-- component styles -->
				${componentStyles(components)}
				<!-- page meta -->
				${pageMeta(meta)}
			</head>
			<body>
				${nav({ links: navLinks })}
				<main>${children}</main>
				${footer({ links: navLinks })}
				<!-- component scripts -->
				${componentScripts(components)}
			</body>
		</html>
	`
}

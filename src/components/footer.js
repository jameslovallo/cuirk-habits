import { html, loop, scss } from 'cuirk'
import meta from '../data/meta.js'
import nav from '../data/nav.js'

const date = new Date().getFullYear()

export const footer = () => html`
	<footer>
		<div>
			${loop(nav, ({ href, title }) => html`<a href="${href}">${title}</a>`)}
		</div>
		<small>© ${date} ${meta.title}. All Rights Reserved.</small>
	</footer>
`

footer.style = scss`
	footer {
		background: var(--footer, black);
		color: var(--footer-color, white);
		display: grid;
		gap: 1.5rem;
		justify-content: center;
		padding: 2rem 1rem;
		position: sticky;
		text-align: center;
		top: 100vh;
		
		> div {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			justify-content: center;

			> a {
				color: inherit;
				text-decoration: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
`

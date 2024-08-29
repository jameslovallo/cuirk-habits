import { createTags, html } from 'cuirk'
import globalMeta from '../data/meta.js'

export const pageMeta = (meta) => {
	const { title, description, url, image } = {
		...globalMeta,
		...meta,
	}
	return html`
		<title>${title}</title>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="description" content="${description}" />
		<meta property="og:title" content="${title}" />
		<meta property="og:description" content="${description}" />
		<meta property="og:site_name" content="${title}" />
		<meta property="og:url" content="${url}" />
		<meta property="og:image" content="${image}" />
		${createTags(globalMeta?.links || [], 'link')}
		${createTags(meta?.links || [], 'link')}
		${createTags(globalMeta?.scripts || [], 'script')}
		${createTags(meta?.scripts || [], 'script')}
	`
}

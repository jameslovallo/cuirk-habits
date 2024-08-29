import { html, scss } from 'cuirk'

// https://search-app.icons8.com/api/iconsets/v6/search?term=house&amount=60&offset=0&platform=color&language=en-US&authors=all&spellcheck=true&isOuch=true&replaceNameWithSynonyms=true

export const editor = () => html`
	<form class="editor surface">
		<input class="header-input" placeholder="Name" name="Name" />
		<div class="input-row">
			<label>
				<span>Link</span>
				<input name="Link" />
			</label>
			<label style="max-width: 8rem">
				<span>Number Per Day</span>
				<input name="NumPerDay" type="number" value="1" />
			</label>
		</div>
		<div class="input-row">
			<div class="icon-container"><img /></div>
			<label>
				<span>Icon</span>
				<input name="Icon" />
			</label>
		</div>
		<div class="input-row">
			<label>
				<span>Search for an icon</span>
				<input type="search" />
			</label>
		</div>
		<div class="results"></div>
		<div class="actions">
			<button type="submit" id="save">Save</button>
			<button id="delete">Delete</button>
		</div>
	</form>
`

editor.init = () => {
	const editorForm = document.querySelector('.editor')

	const initEditor = async () => {
		const params = new URLSearchParams(location.search)
		const { table, id } = Object.fromEntries(params.entries())
		if (table !== 'Habits') {
			;['Link', 'NumPerDay'].forEach((key) => {
				const input = document.querySelector(`[name="${key}"]`)
				input.parentElement.remove()
			})
		}

		const { deleteRecord, getRecords, updateRecord } = await import(
			'/src/airtable.js'
		)

		const { fields } = await getRecords(table, id)
		const keys = ['Name', 'Link', 'NumPerDay', 'Icon']
		Object.keys(fields).forEach((key) => {
			const input = editorForm.querySelector(`[name="${key}"]`)
			if (keys.includes(key) && fields[key]) {
				input.value = fields[key]
			}
		})

		const iconContainer = editorForm.querySelector('.icon-container')
		if (fields.Icon) iconContainer.querySelector('img').src = fields.Icon
		const iconField = editorForm.querySelector('input[name="Icon"]')

		const search = editorForm.querySelector('input[type="search"]')
		search.addEventListener('keydown', (e) => {
			const {
				key,
				target: { value },
			} = e
			if (key === 'Enter') {
				e.preventDefault()
				const results = editorForm.querySelector('.results')
				results.innerHTML = ''
				fetch(
					`https://search-app.icons8.com/api/iconsets/v6/search?term=${value}&amount=200&offset=0&platform=color&language=en-US&authors=all&spellcheck=true&isOuch=true&replaceNameWithSynonyms=true`
				)
					.then((res) => res.json())
					.then(({ icons }) => {
						icons.forEach(({ id }) => {
							const img = document.createElement('img')
							img.src = `https://img.icons8.com/?size=96&id=${id}&format=png`
							const button = document.createElement('button')
							button.appendChild(img)
							button.addEventListener('click', (e) => {
								e.preventDefault()
								iconContainer.querySelector('img').src = img.src
								iconField.value = img.src
							})
							results.appendChild(button)
						})
					})
			}
		})

		editorForm.addEventListener('submit', async (e) => {
			e.preventDefault()
			const fields = Object.fromEntries(new FormData(editorForm))
			Object.keys(fields).forEach((key) => {
				if (!fields[key]) delete fields[key]
				if (!isNaN(fields[key])) fields[key] = Number(fields[key])
			})
			await updateRecord(table, id, fields).then(() => (location.href = '/'))
		})

		const deleteButton = document.querySelector('#delete')
		deleteButton.addEventListener('click', async (e) => {
			e.preventDefault()
			await deleteRecord(table, id).then(() => (location.href = '/'))
		})
	}

	if (editorForm) initEditor()
}

editor.style = scss`
	.editor {
		.header-input {
			margin-bottom: 1rem;
		}

		img {
			height: 3rem;
			width: 3rem;
		}

		.icon-container {
			align-items: center;
			display: flex;
		}

		label, .icon-container {
			background: #fff1;
			border-radius: 0.5rem;
		}

		label {
			color: #ccc;
			display: block;
			flex-grow: 1;
			padding-top: 0.25rem;

			span {
				font-size: 0.75rem;
				padding: 0.5rem;
			}

			input {
				background: transparent;
				border: none;
				color: #ccc;
				font-size: 14px;
				outline: none;
				padding: 0.5rem;
				width: 100%;
			}
		}

		.input-row {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			margin: 0.5rem;
		}

		.results {
			display: grid;
			gap: 0.5rem;
			grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
			padding: 0.5rem;

			button {
				background: transparent;
				border: none;
				border-radius: 0.5rem;

				img {
					height: auto;
				}

				&:hover {
					background: #fff1;
				}
			}
		}

		.actions {
			display: flex;
			justify-content: space-between;
			padding: 0.5rem;

			button {
				background: transparent;
				border-radius: 0.5rem;
				border: none;
				color: #ccc;
				gap: 0.5rem;
				padding: 0.5rem;

				&:hover {
					background: #fff1;
				}
			}
		}
	}
`

import { html, scss } from 'cuirk'

export const circles = () => html`
	<div class="circles surface" data-circle="outer">
		<input
			class="header-input"
			placeholder="Outer Circle"
			data-table="Habits"
		/>
		<ul></ul>
		<div data-circle="middle">
			<input
				class="header-input"
				placeholder="Middle Circle"
				data-table="Middle"
			/>
			<ul></ul>
			<div data-circle="inner">
				<input
					class="header-input"
					placeholder="Inner Circle"
					data-table="Inner"
				/>
				<ul></ul>
			</div>
		</div>
	</div>
`

circles.init = () => {
	const initCircles = async () => {
		const { createRecord, getRecords, updateRecord } = await import(
			'/src/airtable.js'
		)
		const { icon } = await import('/src/components/icon.js')
		const date = new Date().toDateString()
		const defaultIcon = 'https://img.icons8.com/?size=100&id=11816&format=png'
		const circles = document.querySelectorAll('[data-circle]')
		circles.forEach((circle) => {
			const name = circle.dataset.circle
			const list = circle.querySelector('ul')
			const input = circle.querySelector('input')
			if (name === 'outer') {
				const renderHabits = async () => {
					const { records: habits } = await getRecords('Habits')
					const setIcon = (NumPerDay, DoneToday) => {
						if (NumPerDay === DoneToday) {
							return icon('check')
						} else if (
							NumPerDay > 1 &&
							DoneToday < NumPerDay &&
							DoneToday > 0
						) {
							return icon('checkProgress')
						} else if (DoneToday === 0) {
							return icon('circle')
						}
					}
					list.innerHTML = habits
						.sort((a, b) => a.fields.Name.localeCompare(b.fields.Name))
						.map(
							({
								id,
								fields: { Name, Link, Icon, NumPerDay, DoneToday, LastUpdated },
							}) => {
								if (LastUpdated !== date) {
									DoneToday = 0
									updateRecord('Habits', id, {
										LastUpdated: date,
										DoneToday,
									})
								}
								return /* html */ `
									<li>
										${
											Link
												? /* html */ `
													<a href="${Link}" target="_blank">
														<img src="${Icon}"/>
													</a>
												`
												: /* html */ `
													<div>
														<img src="${Icon}"/>
													</div>
												`
										}
										<a href="/editor?table=Habits&id=${id}">${Name}</a>
										<button data-id="${id}" data-done="${DoneToday}" data-per-day="${NumPerDay}">
											${setIcon(NumPerDay, DoneToday)}
										</button>
									</li>
								`
							}
						)
						.join('')
					list.querySelectorAll('button').forEach((button) => {
						button.addEventListener('click', ({ target }) => {
							const { dataset } = target
							const { id, done, perDay } = dataset
							updateRecord('Habits', id, {
								DoneToday: done === perDay ? 0 : Number(done) + 1,
							}).then(({ fields: { DoneToday, NumPerDay } }) => {
								dataset.done = DoneToday
								target.innerHTML = setIcon(NumPerDay, DoneToday)
							})
						})
					})
				}
				renderHabits()
				input.addEventListener('keydown', ({ key, target }) => {
					if (key === 'Enter') {
						const { value } = target
						target.value = ''
						createRecord('Habits', {
							Name: value,
							Icon: defaultIcon,
						}).then(() => renderHabits())
					}
				})
			} else if (name === 'middle') {
				const renderMiddle = async () => {
					const { records: middle } = await getRecords('Middle')
					list.innerHTML = middle
						.sort((a, b) => a.fields.Name.localeCompare(b.fields.Name))
						.map(({ id, fields: { Name, Icon, DoneToday, LastUpdated } }) => {
							if (LastUpdated !== date) {
								DoneToday = 0
								updateRecord('Middle', id, {
									LastUpdated: date,
									DoneToday,
								})
							}
							return /* html */ `
									<li>
										<a href="/editor?table=Middle&id=${id}">
											<img src="${Icon}"/>
											${Name}
										</a>
										<button data-id="${id}" data-done="${DoneToday}">
											<span>${DoneToday}</span>
											${icon('cancel')}
										</button>
									</li>
								`
						})
						.join('')
					list.querySelectorAll('button').forEach((button) => {
						button.addEventListener('click', ({ target }) => {
							const { dataset } = target
							const { id, done, perDay } = dataset
							updateRecord('Middle', id, {
								DoneToday: done === perDay ? 0 : Number(done) + 1,
							}).then(({ fields: { DoneToday } }) => {
								dataset.done = DoneToday
								target.innerHTML = /* html */ `
									<span>${DoneToday}</span>
									${icon('cancel')}
								`
							})
						})
					})
				}
				renderMiddle()
				input.addEventListener('keydown', ({ key, target }) => {
					if (key === 'Enter') {
						const { value } = target
						target.value = ''
						createRecord('Middle', {
							Name: value,
							Icon: defaultIcon,
						}).then(() => renderMiddle())
					}
				})
			} else if (name === 'inner') {
				const renderInner = async () => {
					const { records: inner } = await getRecords('Inner')
					list.innerHTML = inner
						.sort((a, b) => a.fields.Name.localeCompare(b.fields.Name))
						.map(({ id, fields: { Name, Icon, DoneToday, LastUpdated } }) => {
							if (LastUpdated !== date) {
								DoneToday = 0
								updateRecord('Inner', id, {
									LastUpdated: date,
									DoneToday,
								})
							}
							return /* html */ `
									<li>
										<a href="/editor?table=Inner&id=${id}">
											<img src="${Icon}"/>
											${Name}
										</a>
										<button data-id="${id}" data-done="${DoneToday}">
											<span>${DoneToday}</span>
											${icon('cancel')}
										</button>
									</li>
								`
						})
						.join('')
					list.querySelectorAll('button').forEach((button) => {
						button.addEventListener('click', ({ target }) => {
							const { dataset } = target
							const { id, done, perDay } = dataset
							updateRecord('Inner', id, {
								DoneToday: done === perDay ? 0 : Number(done) + 1,
							}).then(({ fields: { DoneToday } }) => {
								dataset.done = DoneToday
								target.innerHTML = /* html */ `
									<span>${DoneToday}</span>
									${icon('cancel')}
								`
							})
						})
					})
				}
				renderInner()
				input.addEventListener('keydown', ({ key, target }) => {
					if (key === 'Enter') {
						const { value } = target
						target.value = ''
						createRecord('Inner', {
							Name: value,
							Icon: defaultIcon,
						}).then(() => renderInner())
					}
				})
			}
		})
	}

	if (document.querySelector('.circles')) initCircles()
}

circles.style = scss`
	.circles {
		[data-circle]:not([data-circle="outer"]) {
			border-top-left-radius: 1rem;
			box-shadow: inset 2px 2px 4px #000a;
			margin-left: 1rem;
			margin-top: 1rem;
			overflow: hidden;
		}

		ul {
			list-style: none;
			margin: 0;
			padding: 0.5rem;

			li {
				border-radius: 0.5rem;
				display: grid;
				grid-template-columns: 3.5rem 1fr 2.5rem;
				overflow: hidden;

				> * {
					align-items: center;
					display: flex;
					height: 100%;
					padding: 0.5rem;
				}

				> a, > button {
					background: transparent;
					border: none;
					color: inherit;
					font-size: 14px;
					text-decoration: none;

					&:hover {
						background: #fff1;
					}

					svg {
						color: var(--active);
						height: 1.5rem;
						pointer-events: none;
						width: 1.5rem;

						&.check {
							color: var(--success);
						}

						&.checkProgress {
							color: var(--in-progress);
						}

						&.cancel {
							color: var(--failure);
						}
					}
				}
			}
		}

		&[data-circle="outer"] {
			> ul {
				display: grid;
				gap: 0.5rem;
				grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));

				li {
					box-shadow: inset 0 0 4px #0008;
				}
			}
		}

		[data-circle="middle"],
		[data-circle="inner"] {
			ul {
				display: grid;
				gap: 0.25rem;
				padding: 0.5rem;

				li {
					gap: 0.5rem;
					grid-template-columns: 1fr 3.25rem;

					> * {
						border-radius: 0.5rem;
						padding: 0.25rem 0.5rem;
					}

					a {
						align-items: center;
						display: flex;
						gap: 0.75rem;

						img {
							width: 2rem;
						}
					}

					button {
						color: #ccc;
						gap: 0.5rem;
						height: auto;
						padding-left: 0.5rem;
					}
				}
			}
		}
	}
`

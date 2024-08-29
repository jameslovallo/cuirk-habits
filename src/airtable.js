const api = 'https://api.airtable.com/v0'

const base = 'appRvQq0A7RzDTRkm'

const token =
	'patEHgBf1N10JSmej.4aa1e42cfb5e2cd91abdb8d1b4e765aa57a7d37526cca8f663d7626f0976394e'

export const getRecords = (table, id = '') =>
	fetch(`${api}/${base}/${table + (id ? '/' + id : '')}`, {
		headers: { Authorization: `Bearer ${token}` },
	}).then((res) => res.json())

export const updateRecord = (table, id, fields) =>
	fetch(`${api}/${base}/${table}/${id}`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ fields }),
	}).then((res) => res.json())

export const deleteRecord = (table, id) =>
	fetch(`${api}/${base}/${table}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json())

export const createRecord = (table, fields) =>
	fetch(`${api}/${base}/${table}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ fields }),
	}).then((res) => res.json())

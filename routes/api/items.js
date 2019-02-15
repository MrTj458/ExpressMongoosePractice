const express = require('express')
const router = express.Router()

const Item = require('../../models/Item')

router.get('/', async (req, res) => {
	let items = await Item.find().sort({ date: -1 })
	res.json(items)
})

router.get('/:id', async (req, res) => {
	try {
		const item = await Item.findById(req.params.id)
		res.json(item)
	} catch {
		res.status(404).json({ success: false })
	}
})

router.post('/', async (req, res) => {
	try {
		const newItem = new Item({
			name: req.body.name,
		})
		res.json(await newItem.save())
	} catch {
		res.status(422).json({ success: false })
	}
})

router.put('/:id', async (req, res) => {
	try {
		let item = await Item.findById(req.params.id)
		item.name = req.body.name
		res.json(await item.save())
	} catch {
		res.status(422).json({ success: false })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		await Item.findById(req.params.id).remove()
		res.json({ success: true })
	} catch {
		res.status(404).json({ success: false })
	}
})

module.exports = router

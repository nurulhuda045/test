const express = require('express');
const Book = require('../models/book')
const auth = require('../middleware/auth')

const router = new express.Router();


router.post('/books', auth, async (req, res) => {
    const book = new Book({
        ...req.body,
        owner: req.user._id
    })

    try{
        await book.save()
        res.status(201).send({book})
    } catch(e){
        res.status(400).send(e)
    }

})

// GET /books?completed=true
// GET /books?limit=1&skip=20
// GET books?sortBy=createdAt:desc
router.get('/books', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        const books = await Book.find({ owner: req.user.id, ...match })
        .limit(parseInt(req.query.limit))
        .sort(sort)

        res.send(books)
    } catch (e) {
        res.status(500).send()
    }

})

router.get('/books/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const book = await Book.findOne({_id, owner: req.user._id})

        if(!book) {
            res.status(404).send()
        }

        res.send(book)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/books/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const book = await Book.findOneAndDelete({ _id, owner: req.user._id })

        if (!book) {
            res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/books/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'completed', 'author']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation) {
        res.status(400).send({error: 'Invalid updates'})
    }

    try {
        const book = await Book.findOne({ _id, owner: req.user._id })

        if (!book) {
            return res.status(404).send()
        }
        updates.forEach((update) => book[update] = req.body[update])
        await book.save()
        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router;
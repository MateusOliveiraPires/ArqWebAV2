const express = require('express')

const router = express.Router()

const Post = require('../models/post')

// GET all
router.get('/', async (req, res) => {
    try {
        const post = await Post.find()

        return res.send(post)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET by ID
router.get('/:id', getPost, async (req, res) => {

    res.json(res.post)
})

// POST create
router.post('/', async (req, res) => {

    const post = new Post({
        id: req.body.id,
        userId: req.body.userId,
        conteudo: req.body.conteudo,
        foto: req.body.foto,
        status: req.body.status,
    })

    try {
        const created = await post.save()

        res.status(201).json(created)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// PATCH update
router.patch('/:id', getPost, async (req, res) => {
    if (req.body. userId != null) {
        res.getPost.userId = req.body.userId
    }
    if (req.body. conteudo != null) {
        res.getPost.conteudo = req.body.conteudo
    }
    if (req.body. foto != null) {
        res.getPost.foto = req.body.foto
    }

    if (req.body. status != null) {
        res.getPost.status = req.body.status
    }
 
    try {
        const updated = await res.post.save()

        res.json(updated)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// DELETE remove
router.delete('/:id', getPost, async (req, res) => {

    try {
        await res.post.remove()

        res.json({ message: 'Deleted Successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// middleware
async function getPost(req, res, next) {
    try {
        post = await Post.findById(req.params.id)

        if (post == null) {
            return res.status(404).json({ message: 'post not found' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    res.post = post

    next()
}

// export
module.exports = router
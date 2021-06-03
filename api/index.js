const express = require('express');
const cors = require('cors')
const app = express();
const controller = require('./Controller')

app.use(cors('*'))
//app.use(express.json({ limit: '50mb' }))

app.get('/', async (req, res) => {
    var already_shown_questions = []
    try{
        already_shown_questions = JSON.parse(req.query.already_shown_questions)
    }catch(e){ }
    
    var defaultQuery = { language: "pt" }
    if(['pt','es','fr','en'].includes(req.query.language)) {
        defaultQuery.language = req.query.language
    }
    if (already_shown_questions.length) {
        defaultQuery._id = {
            $nin: already_shown_questions
        }
    }
    console.log(defaultQuery)
    const questions = await controller.db.get(defaultQuery);
    return res.status(200).json(
        questions.length > 0 ? questions[0] : {}

    )
})
app.post('/new', async (req, res) => {
    const campos = [req.body.name, req.body.questions, req.body.lan]
    if (!campos.every(x => x ? true : false) || req.body.questions.length < 2 || !["pt", 'es', 'fr', 'en'].includes(req.body.lan)) {
        return res.status(400).json(
            { message: "Missing field" }
        )
    }
    await controller.db.insert({
        name: req.body.name,
        questions: req.body.questions,
        created_on: new Date().getTime(),
        votes: { left: 0, right: 0 },
        comments: [],
        language: req.body.language
    })
    //console.log(req.body)
    return res.status(200).json({
        message: "Question added to database succesfully.",
        status: 200
    })

})
app.post('/vote', async (req, res) => {
    const campos = [req.body.vote, req.body.questionId]
    if (!campos.every(x => x ? true : false)) return res.status(400).json(
        { message: "Missing field" }
    )
    const vote = req.body.vote == true ? "votes.left" : "votes.right"
    await controller.db.update({ _id: req.body.questionId }, { $inc: { [vote]: 1 } })
    return res.status(200).json({
        message: "Voted counted!",
        status: 200
    })
})
app.post('/comment', async (req, res) => {
    const campos = [req.body.name, req.body.questionId, req.body.comment]
    if (!campos.every(x => x ? true : false)) return res.status(400).json(
        { message: "Missing field" }
    )
    await controller.db.update({ _id: req.body.questionId }, {
        $push: {
            comments: {
                name: req.body.name,
                comment: req.body.comment,
                votes: { left: 0, right: 0 },
                child_comments: [],
                created_on: new Date().getTime(),
                id: '_' + Math.random().toString(36).substr(2, 9)
            }
        }
    })
    return res.status(200).json({
        message: "Comment added!",
        status: 200
    })
})
app.post('/comment-in-comment', async (req, res) => {
    const campos = [req.body.name, req.body.questionId, req.body.comment_id, req.body.comment]
    if (!campos.every(x => x ? true : false)) return res.status(400).json(
        { message: "Missing field" }
    )
    const rather = await controller.db.getOne({ _id: req.body.questionId })

    rather
        .comments.find(x => x.id == req.body.comment_id)
        .child_comments.push({
            name: req.body.name,
            comment: req.body.comment,
            votes: { up: 0, down: 0 },
            created_on: new Date().getTime(),
            id: '_' + Math.random().toString(36).substr(2, 9)
        })

    await controller.db.update({ _id: req.body.questionId }, { $set: { "comments": rather.comments } })

    return res.status(200).json({
        message: "Comment added!",
        status: 200
    })
})

app.listen(() => console.log(`server is up!`));
console.clear()
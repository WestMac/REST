const express = require('express')
const app = express();
const path = require('path');
const date = new Intl.DateTimeFormat('pl-PL', {day: '2-digit',month:'long', year:'numeric' }).format(new Date())
const { v4: uuid} = require('uuid')
const methodOverride = require('method-override')


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))

let comments = [
	{
	 id:uuid(),
	 username: 'AAA',
	 comment:'First comment',
	 date:'12 lutego 2020',
	},
	{
	 id:uuid(),
	 username: 'BBB',
	 comment:'Second',
	 date:'13 lutego 2020',
	},
	{
	 id:uuid(),
	 username: 'CCC',
	 comment:'Third',
	 date:'14 lutego 2020',
	},
	{
	 id:uuid(),
	 username: 'DDD',
	 comment:'Fourth',
	 date:'15 lutego 2020',
	}
	]

app.get('/comments', (req,res) => {
	res.render('comments/index', { comments })
})

app.get('/comments/new', (req,res) => {
	res.render('comments/new');
})

app.get('/comments/:id', (req,res) => {
	const { id } = req.params;
	const comment = comments.find(c => c.id === id)
	res.render('comments/show', { comment })
})

app.get('/comments/edit/:id', (req,res) => {
	const { id } = req.params;
	const comment = comments.find(c => c.id === id)
	res.render('comments/edit', { comment })
})

app.get('/tacos', (req,res) =>{
	res.send("get /tacos response")
})




app.post('/comments',(req,res) => {
	const {username, comment} = req.body;
	comments.push({username, comment , date, id: uuid()})
	res.redirect('/comments')
})


app.post('/tacos', (req,res) => {
	const {meat, qty} = req.body;
	res.send(`here are your ${meat} and number of ${qty}`)
})



app.patch('/comments/:id/', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    const newCommentText = req.body.comment;
    foundComment.comment = newCommentText;
   	res.redirect('/comments')
})
 
app.delete('/comments/:id', (req,res) => {
	const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})
app.listen(3000, () => {
	console.log('listening on port 3000');
})





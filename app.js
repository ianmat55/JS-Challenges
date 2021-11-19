const express = require('express');
const app = express();
const path = __dirname;
const port = process.env.PORT || 3000;

// Static Files
// app.use(express.static(path + '/public'));

// Set Views
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', {title: 'Home'})
});

// 404 page
app.use((req, res) => {
	res.status(404);
	res.render('404', { title: 404 });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
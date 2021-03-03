var express = require('express');
var router = express.Router();
const { Op } = require("sequelize");

const Book = require('../models').Book

/* Function to handle errors for each route */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
		// Error handler for validation errors
		if (error.name == "SequelizeValidationError") {
			res.render('form-error')
		}
      // Forward error to the global error handler
      error.status = 500;
      error.message = "Unknown Error Occured"
      next(error);
    }
  }
}

/* GET home page. */
router.get('/', asyncHandler((req, res, next) => {
    res.redirect('/books');
}));

// Get all books
router.get('/books', asyncHandler(async (req, res, next) => {
    const books = await Book.findAll();
    res.render('index', {books})
}));

// GET route for new book page
router.get('/books/new', asyncHandler(async (req, res, next) => {
  res.render('new-book');
}))

// POST Route for new book
router.post('/books/new', asyncHandler(async (req, res, next) => {
    await Book.create({
		title: req.body.title,
		author: req.body.author,
		genre: req.body.genre,
		year: parseInt(req.body.year)
	});
	res.redirect('/books');
}))

// GET Route for specific book
router.get('/books/:id', asyncHandler(async (req, res, next) => {
	if ( isNaN(req.params.id) == true ) {
		res.render('page-not-found');
	}
	const book = await Book.findByPk(req.params.id);
	res.render('update-book', {book})
}))

// POST Route for updating books
router.post('/books/:id', async (req, res, next) => {
	try {
		const book = await Book.findByPk(req.params.id);
		book.title = req.body.title
		book.author = req.body.author
		book.genre = req.body.genre
		book.year = parseInt(req.body.year)
		await book.save();
		res.redirect(`/books`);
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			const book = await Book.findByPk(req.params.id);
			console.log(error.errors[0].message);
			res.render('update-book', {book, error: error.errors[0].message})
			//res.render(`update-book`, { book, errors: error.errors})	
		}
	}

})

// Delete POST Route
router.post('/books/:id/delete', asyncHandler(async (req, res, next) => {
	const book = await Book.findByPk(req.params.id);
	book.destroy()
	res.redirect('/books');
}))

router.post('/books/search/:query', asyncHandler(async (req, res, next) => {
	const books = await Book.findAll({
		attributes: ['title', 'author', 'genre', 'year'],
		where:{
			[Op.or]:  [
			  {
				title: {
				  [Op.like]: `%${req.body.search}%`
				}
			  },
			  {
				author: {
				  [Op.like]: `%${req.body.search}%`
				}
			  },
			  {
				genre:   {
				 [Op.like]: `%${req.body.search}%`
			   }
			  },
			  {
				year:   {
				 [Op.like]: `%${req.body.search}%`
			   }
			  }
	 
			]
	 
		 }
	})
	res.render('search', {books})
}))



module.exports = router;

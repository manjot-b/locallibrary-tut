var async = require('async');
var sequelize = require('./sequelize');

var Author = sequelize.import(__dirname + '/../models/author');
var Book = sequelize.import(__dirname + '/../models/book');

exports.index = function(req, res) {
    async.parallel({
        book_count: (callback) => {
            sequelize.query("SELECT COUNT(id) AS count FROM book", 
                { type: sequelize.QueryTypes.SELECT}).then(results => {
                    callback(null, results[0].count)
            });            
        },
        book_instance_count: (callback) => {
            sequelize.query("SELECT COUNT(id) AS count FROM book_instance", 
                { type: sequelize.QueryTypes.SELECT}).then(results => {
                    callback(null, results[0].count)
            });            
        }, 
        book_instance_available_count: (callback) => {
            sequelize.query("SELECT COUNT(id) AS count FROM book_instance " + 
                "WHERE status='Available'", 
                { type: sequelize.QueryTypes.SELECT}).then(results => {
                    callback(null, results[0].count)
            });            
        },
        author_count: (callback) => {
            sequelize.query("SELECT COUNT(id) AS count FROM author", 
                { type: sequelize.QueryTypes.SELECT}).then(results => {
                    callback(null, results[0].count)
            });            
        },
        genre_count: (callback) => {
            sequelize.query("SELECT COUNT(id) AS count FROM book", 
                { type: sequelize.QueryTypes.SELECT}).then(results => {
                    callback(null, results[0].count)
            });            
        }
    }, (err, results) => {
        console.log(results.book_instance_available_count);
        res.render('index', 
            {title: 'Local Library Home', error: err, data: results});
    });
};

// Display list of all books.
exports.book_list = function(req, res) {
    var booksData = [];

    sequelize.query("SELECT * FROM book", { model: Book }).then(books => {
        async.each(books, (book, callback) => {
            sequelize.query("SELECT * FROM author WHERE id = :id", 
                { replacements: { id: book.author_id }, model: Author }).then(authors => {
                    booksData.push( {book: book, author: authors[0] } );        
                    callback();
                });
        }, err => {
            res.render('book_list', {title: 'Book List', data: booksData });
        })
    });
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
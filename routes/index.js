var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

//INDEX ACTION
exports.index = function(req, res) {
  Todo.find()
  .sort('-updated_at')
  .exec(function(err, todos){
  	if (err)
  	  throw err;
  	res.render('index', {
  		title: "My App",
  		todos: todos
  	});
  });
};

// CREATE
exports.create = function(req, res) {
  new Todo({
  	content: req.body.content,
  	updated_at: Date.now()
  }).save(function(err, todo){
  	if (err)
  	  throw err;
  	res.redirect('/');
  });
};

//EDIT ACTION
exports.edit = function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
  	if (err)
  		throw err;
  	res.render('edit',{
  	  todo: todo,
  	  title: "Edit Todo"
  	});
  });
};

// UPDATE ACTION
exports.update = function(req, res) {
	Todo.findById(req.params.id, function(err, todo){
		if (err)
		  throw err;
		todo.content = req.body.content;
		todo.updated_at = Date.now();
		todo.save(function (err, save) {
			if (err)
			  throw err;
			res.redirect('/');
		});
	});
}


// DESTROY
exports.destroy = function(req, res) {
	Todo.findById(req.params.id, function(err, todo) {
		if (err)
		  throw err;
		todo.remove(function(err, todo){
		  if (err)
		  	throw err;
		  res.redirect('/');
		});
	});
};











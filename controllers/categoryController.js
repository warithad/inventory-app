const Category = require('../models/category')
const Item = require('../models/item')
const async = require('async')
const {body, validationResult} = require('express-validator');


// /categories
exports.categories_list_get = (req, res, next) =>{
    Category.find()
        .sort({'name': 1})
        .exec(function (err, list_category){
            if(err){
                return next(err);
            }
            res.render('category_list', {title: 'Categories', category_list: list_category})
        })
}

// /category/:id
exports.category_detail_get = (req, res, next) => {
    async.parallel(
        {
            category(callback){
                Category.findById(req.params.id).exec(callback);
            },
            category_items(callback){
                Item.find({category: req.params.id}, 'name price')
                    .sort({name: 1})
                    .exec(callback);
            }
        },

        (err, results) =>{
            if(err){
                return next(err);
            }
            if(results.category == null){
                const err = new Error('Category Not Found');
                err.status = 404;
                return next(err);
            }    
            res.render('category_detail', 
            {
                title: 'Category Detail',
                category: results.category,
                category_items: results.category_items
            })
        }
    )
}

exports.category_create_get = (req, res) =>{
    res.render('category_form', {title: 'Create Category'});
}

exports.category_create_post = [
    body('name', 'Category name required').trim().isLength({min: 1}).escape(),

    (req, res, next) =>{
        const errors = validationResult(req);

        const category = new Category({name: req.body.name});

        if(!errors.isEmpty()){
            res.render('category_form', {
                title: 'Create Category',
                category,
                errors: errors.array()
            });
            return;
        }
        else {
            Category.findOne({name: req.body.name}).exec((err, found_category) =>{
                if(err){
                    return next(err);
                }
                if(found_category){
                    res.redirect(found_category.url);
                } else {
                    category.save(err =>{
                        if(err) {
                            return next(err);
                        }
                        res.redirect(category.url);
                    })
                }
            })
        }
    }
]


exports.category_update_get = (req, res) =>{
    res.send('NOT IMPLEMENTED: item category GET');
}

exports.category_update_post = (req, res) =>{
    res.send('NOT IMPLEMENTED: item category POST');
}

exports.category_delete_get = (req, res) =>{
    res.send('NOT IMPLEMENTED: item category GET');
}

exports.category_delete_post = (req, res) =>{
    res.send('NOT IMPLEMENTED: item category POST');
}
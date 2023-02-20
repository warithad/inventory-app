const { body } = require('express-validator');
const Item = require('../models/item')
const Category = require('../models/category')

// /items
exports.items_list_get = (req, res) =>{
    Item.find()
        .sort({'name': 1})
        .exec(function (err, list_items){
            if(err){
                return next(err);
            }
            res.render('item_list', {title: 'Item List', item_list: list_items});
        })
}

// /item:id
exports.item_detail_get = (req, res, next) => {
    Item.findById(req.params.id)
        .populate('category')
        .exec(function (err, item){
            if(err){
                return next(err);
            }
            res.render('item_detail', {title: 'Item', item: item})
        })
}

// /item/create
exports.item_create_get = (req, res) =>{
    Category.find()
        .sort({'name': 1})
        .exec(function (err, list_categories){
            if(err){
                return next(err);
            }
            res.render('item_form', {
                title: 'Create Item',
                category_list: list_categories
            })
        })
}

exports.item_create_post = [
    body()
]
exports.item_update_get = (req, res) =>{
    res.send('NOT IMPLEMENTED: item update GET');
}

exports.item_update_post = (req, res) =>{
    res.send('NOT IMPLEMENTED: item update POST');
}

exports.item_delete_get = (req, res) =>{
    res.send('NOT IMPLEMENTED: item delete GET');
}

exports.item_delete_post = (req, res) =>{
    res.send('NOT IMPLEMENTED: item delete POST');
}
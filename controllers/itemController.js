const Item = require('../models/item')

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
    res.send('NOT IMPLEMENTED: item create GET');
}

exports.item_create_post = (req, res) =>{
    res.send('NOT IMPLEMENTED: item create POST');
}

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
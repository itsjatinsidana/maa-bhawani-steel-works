var express = require('express');
var router = express.Router();
const conn = require('../mymodule/connectDB');

router.get('/change-password', function (req, res, next) {

    res.redirect('/admin-login');
});
router.get('/get-products', function (req, res) {
    let selectSQL = "SELECT products.*,category.category,subcategory.subcategory_name FROM products,category,subcategory where products.subcategory_id=subcategory.subcategory_id and subcategory.category_id=category.category_id";
    conn.query(selectSQL, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
})
router.get('/fetch-category', function (req, res) {
    let SelectSQL = "SELECT * FROM `category`";
    conn.query(SelectSQL, (err, data) => {
        if (err) throw err;
        // console.log(data);
        if (data.length > 0) {
            res.send(data);
        } else {
            res.send('no data');
        }
    })
})
router.get('/fetch-subcategory', function (req, res) {
    let {category_id}=req.query;
    let SelectSQL = "SELECT * FROM `subcategory` WHERE `category_id` ='"+ category_id+"'";
    conn.query(SelectSQL, (err, data) => {
        if (err) throw err;
        // console.log(data);
        if (data.length > 0) {
            res.send(data);
        } else {
            res.send('no data');
        }
    })
})
router.post('/add-product', function (req, res) {
    console.log('request checking');
    let {category, subcategory, product_name, mrp, discount, final_price, description} = req.body;
    // console.log(final_price);
    // console.log(status);
    let file = req.files.photo;
    console.log(file)
    let serverPath = 'public/images/' + file.name;
    let databasePath = 'images/' + file.name;
    file.mv(serverPath, err => {
        if (err) throw err;
    });

    let insertSQL = "INSERT INTO `products`(`category_id`, `subcategory_id`, `product_id`, `product_name`, `photo`, `mrp`, `discount`, `final_price`, `description`, `status`) " +
        "VALUES ('" + category + "','" + subcategory + "','','" + product_name + "','" + databasePath + "','" + mrp + "','" + discount + "','" + final_price + "','" + description + "','1')";
    conn.query(insertSQL, err => {
        if (err) throw err;
        res.send('inserted');
    })
})

router.get('/delete-product', function (req, res) {
    let product_id = req.query.product_id;
    let deleteSQL = "DELETE FROM `products` WHERE product_id='" + product_id + "'";
    conn.query(deleteSQL, err => {
        if (err) throw err;
        res.send('deleted');
    })
})
router.post('/update-product', function (req, res) {
    console.log(req.body);
    console.log(req.files);

    let {product_id, product_name, mrp, discount, final_price, description} = req.body;

    if (product_name === '' || mrp === '' || final_price === '' || description === '') {
        res.send('required');
    } else {
        if (req.files === null) {
            let updateSQL1 = "UPDATE `products` SET `product_name`='" + product_name + "',`mrp`='" + mrp + "',`discount`='" + discount + "',`final_price`='" + final_price + "',`description`='" + description + "' WHERE `product_id`='" + product_id + "'";
            // console.log(updateSQL1)
            conn.query(updateSQL1, err => {
                if (err) throw err;
                res.send('updated');
            })
        } else {
            let file = req.files.newphoto;
            let serverPath = 'public/images/' + file.name;
            let databasePath = 'images/' + file.name;
            file.mv(serverPath, err => {
                if (err) throw err;
            })
            let updateSQL2 = "UPDATE `products` SET `product_name`='" + product_name + "',`photo`='" + databasePath + "',`mrp`='" + mrp + "',`discount`='" + discount + "',`final_price`='" + final_price + "',`description`='" + description + "' WHERE `product_id`='" + product_id + "'";
            // console.log(updateSQL2)
            conn.query(updateSQL2, err => {
                if (err) throw err;
                res.send('updated');
            })
        }
    }
})
router.get('/product-details', function (req, res) {

    let id = req.query.product_id;
    console.log(id)
    let selectSQL = "SELECT * FROM `products` WHERE product_id='" + id + "'";
    conn.query(selectSQL, (err, data) => {
        if (err) throw err;
        console.log(data)
        res.send(data);
    })
})

router.post('/admin-change-password-action', function (req, res, next) {
    let {email, password, newpassword, confirmpassword} = req.body;
    let select = "SELECT * FROM `admin` where `email` = '" + email + "' AND `password` = '" + password + "'";

    conn.query(select, (err, rows) => {
        if (err) throw err;

        if (rows.length > 0) {
            if (newpassword !== confirmpassword) {
                res.send('notMatch');
            } else {
                let update = "UPDATE `admin` SET `password`='" + newpassword + "' WHERE `email`='" + email + "' "
                conn.query(update, (err) => {
                    if (err) throw err;
                });
                res.send('success');
            }
        } else {
            res.send('invalidPassword')
        }
    });
});

router.post('/edit-category', function (req, res, next) {
    let {catName, catDes, id} = req.body;
    console.log(catName);
    console.log(catDes);
    console.log(id);
    let UpdateSQL = "UPDATE `category` SET `category`='" + catName + "',`description`='" + catDes + "' WHERE `category_id`='" + id + "'";
    conn.query(UpdateSQL, err => {
        if (err) throw err;
        res.send('updated');
    })
})

router.get('/getCat', function (req, res, next) {
    let id = req.query.id;
    console.log(id + " ----");

    let selectSQL = "SELECT * FROM `category` WHERE category_id = '" + id + "'";

    conn.query(selectSQL, (err, rows) => {
        if (err) throw err;

        res.send(rows);
        // console.log(rows);
    });
});
module.exports = router;
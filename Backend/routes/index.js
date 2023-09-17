var express = require('express');
var router = express.Router();
const conn = require('../mymodule/connectDB');
var session = require('express-session');

const oneday = 1000 * 60 * 60 * 24;

var app = express();
app.use(session({
    secret: "Nosecret",
    saveUninitialized: true,
    cookie: {maxAge: oneday},
    resave: false
}))

router.get('/', function (req, res, next) {
    res.send("Hello");
});


router.get('/view-category', function (req, res) {
    // let {category, description} = req.body;
    let select = "SELECT * FROM `category`";

    conn.query(select, (err, rows) => {
        if (err) throw err;
        res.send(rows)
    });
});
router.get('/view-subcategory', function (req, res) {
    // let {category, description} = req.body;
    let select = "SELECT * FROM `subcategory`";

    conn.query(select, (err, rows) => {
        if (err) throw err;
        res.send(rows)
    });
});

router.get('/get-sub-cat', function (req, res) {
    let {subcatName, subcatDes, id} = req.body;
    let select = "SELECT * FROM `subcategory` WHERE subcategory_id='" + id + "'";
    conn.query(select, (err, rows) => {
        if (err) throw err;
        res.send(rows)
    });
});

router.get('/get-category-details', function (req, res) {
    let select = "SELECT * FROM `category`";

    conn.query(select, (err, rows) => {
        if (err) throw err;
        res.send(rows)
    });
});
router.get('/get-subcategory-details', function (req, res) {
    let {subcatName, subcatDes, id} = req.body;
    conn.query(select, (err, rows) => {
        if (err) throw err;
        res.send(rows)
    });
});

router.get('/edit-category', function (req, res) {
    let category_id = req.query.category_id;
    console.log(category_id);
    // let {category, description} = req.body;

    let editesql = "UPDATE `category` SET   category_id='" + category_id + "'";
    conn.query(editesql, err => {
        if (err) throw err;
        res.send('success');
    })

});
router.post('/edit-subcategory', function (req, res) {

    console.log(req.body);
    // let {category, description} = req.body;

    let editesql = "UPDATE `subcategory` SET   `subcategory_name`='" + subcatName + "',`description`='" + subcatDes + "' WHERE `subcategory_id`='" + id + "'";
    conn.query(editesql, err => {
        if (err) throw err;
        res.send('success');
    })

});

router.post('/add-category', function (req, res) {
    let {category, description} = req.body;
    let select = "SELECT * FROM `category` WHERE `category` = '" + category + "' AND `description` = '" + description + "'";

    conn.query(select, (err, rows) => {
        if (err) throw err;
        let insertSQL = "INSERT INTO `category` VALUES (null,'" + category + "','" + description + "')";
        conn.query(insertSQL, (err) => {
            if (err) throw err;

            res.send("Added");
        });

    });
});
router.get('/delete-category', function (req, res, next) {
    let category_id = req.query.category_id;

    let deleteSQL = "DELETE FROM `category` WHERE `category_id` ='" + category_id + "'";
    conn.query(deleteSQL, (err) => {
        if (err) throw err;

        res.send('deleted');
    });
});
router.get('/delete-subcategory', function (req, res, next) {
    let subcategory_id = req.query.subcategory_id;

    let deleteSQL = "DELETE FROM `subcategory` WHERE `subcategory_id` ='" + subcategory_id + "'";
    conn.query(deleteSQL, (err) => {
        if (err) throw err;

        res.send('deleted');
    });
});


router.post('/add-subcategory', function (req, res) {
    let {subcategoryname, description, category} = req.body;
    console.log(req.body)


    let insertSQL = "INSERT INTO `subcategory` VALUES (null,'" + subcategoryname + "','" + description + "','" + category + "')";
    conn.query(insertSQL, (err) => {
        if (err) throw err;

        res.send("Added");
    });


});

router.post('/admin-login-action', function (req, res) {
    let {email, password} = req.body;
    let select = " SELECT * FROM `admin` WHERE  `email`='" + email + "'";
    conn.query(select, (err, rows) => {
        if (err) throw err;

        if (rows.length > 0) {
            if (rows[0].password === password) {
                session.admin_email = email;
                console.log("logedin");

                res.send('success');
            } else {
                res.send('invalidpassword');
            }
        } else {
            res.send('invalidemail');
        }
    });
});
router.get('/admin-login', function (req, res, next) {
    res.render('admin_login');
});
router.get('/user-login', function (req, res, next) {
    res.render('user_login');
});
router.post('/user-login-action', function (req, res, next) {
    let {email, password} = req.body;
    console.log(" email is " + email);
    let select = " SELECT * FROM `usertable` WHERE  `email`='" + email + "'";
    conn.query(select, (err, rows) => {
        if (err) throw err;

        if (rows.length > 0) {
            if (rows[0].password === password) {
                session.user_email = email;
                console.log("logedin");

                res.send('success');
            } else {
                res.send('invalidpassword');
            }
        } else {
            res.send('invalidemail');
        }
    });
});
router.post('/adduser', function (req, res, next) {
    let {email, password, confirmpassword, fullname, mobile, address, city, pincode, gender} = req.body;
    console.log(req.body);

    let selectSQL = "SELECT * FROM `usertable` WHERE `email` = '" + email + "'";
    conn.query(selectSQL, (err, rows) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send('duplicate');
        } else {
            let insertSQL = "INSERT INTO `usertable` VALUES ('" + email + "','" + password + "','" + fullname + "','" + mobile + "','','" + address + "','" + city + "','" + pincode + "','" + gender + "')";
            conn.query(insertSQL, (err) => {
                if (err) throw err;

                res.send("Added");
            });
        }

    });


});
/* GET home page. */
router.post('/addadmin', function (req, res, next) {
    let {email, password, confirmpassword, fullname, mobile, type} = req.body;
    console.log(req.body);

    let insertSQL = "INSERT INTO `admin` VALUES ('" + email + "','" + password + "','" + fullname + "','" + type + "')";

    let selectSQL = "SELECT * FROM `admin` WHERE `email` = '" + email + "'";

    conn.query(selectSQL, (err, rows) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.send('duplicate');
        } else {
            conn.query(insertSQL, (err) => {
                if (err) throw err;

                res.send("Added");
            });
        }

    });


});

app.get('/User_auth', (req, res) => {
    if (session.user_email !== undefined) {
        res.send("success")
    } else {
        res.send('not login')
    }

})

module.exports = router;

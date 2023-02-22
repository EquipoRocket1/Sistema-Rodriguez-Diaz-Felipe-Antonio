const bcrypt = require('bcrypt');
function index(req, res) {
    res.render('login/index');
}

function acerca(req, res) {
  res.render('login/acerca');
}

function storeUser(req,res){
  const data = req.body;

  req.getConnection((err, conn) =>{
    conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) =>{
      if(userdata.length > 0){
        res.render('login/index', {error:'ya existe carnal'})
      }else{
        bcrypt.hash(data.password, 12).then(hash =>{
          data.password = hash;
      
          req.getConnection((err,conn) =>{
            conn.query('INSERT INTO `users` SET ?', [data], (err, rows) =>{
              res.redirect('/');
            })
          })
        })
      }
    })
  })

}

function auth(req, res){
  const data = req.body;
  req.getConnection((err, conn) =>{
  conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) =>{
    if(userdata.length > 0){
      console.log('hola');
      
    }else{
      res.render('login/index', {errors:'no existe carnal'})
    }
  })})
}

module.exports = {
  index,
  acerca,
  storeUser,
  auth,

}
//se importa bcrypt

const bcrypt = require('bcrypt');


//Es la funcion que redirecciona ala carpeta login y al index y si ya se registro redirecciona a la raiz
function index(req, res) {
  if (req.session.loggedin != true) {
    res.render('login/index');
  }else{
    res.redirect('/')
  }
}

function acerca(req, res) {
  if (req.session.loggedin == true) {
    res.render('login/acerca', {name: req.session.name});
} else {
    res.redirect('login/acerca')
}}

function storeUser(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
      if (userdata.length > 0) {
        res.render('login/index', { error: 'ya existe carnal' })
      } else {
        bcrypt.hash(data.password, 12).then(hash => {
          data.password = hash;

          req.getConnection((err, conn) => {
            conn.query('INSERT INTO `users` SET ?', [data], (err, rows) => {

              req.session.loggedin = true;
              req.session.name = data.nombres

              res.redirect('/');
            })
          })
        })
      }
    })
  })

}

function auth(req, res) {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
      if (userdata.length > 0) {
        userdata.forEach(element => {
          bcrypt.compare(data.password, element.password, (err, isMatch) => {
            if (!isMatch) {
              res.render('login/index', { errors: 'Contraseña incorrecta carnal' })
            } else {
              req.session.loggedin = true;
              req.session.name = element.nombres

              res.redirect('/')
            }

          });
        })

      } else {
        res.render('login/index', { errors: 'no existe carnal' })
      }
    })
  })
}

function logout(req, res){
  if (req.session.loggedin == true) {
    req.session.destroy();
    res.redirect('/login');
  }
}

module.exports = {
  index,
  acerca,
  storeUser,
  auth,
  logout
}
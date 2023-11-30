const dbConnection = require('../../config/dbConnection');
const connection = dbConnection();

module.exports = app => {

    app.get('/', (req, res) => {
        res.render('index.ejs');
    });
    app.get('/map', (req, res) => {
        res.render('Map.ejs');
    });
    app.get('/login', (req, res) => {
        res.render('login.ejs');
    });
    app.get('/cupons', (req, res) => {
        res.render('cupons.ejs');
    });
    app.get('/usercupons', (req, res) => {
        res.render('indexCU.ejs');
    });
    app.get('/profile', (req, res) => {
        if (!req.session.isLoggedIn) {
            return res.redirect('/login'); // Redirige si no está autenticado
          }
      
          // Obtiene el ID del usuario desde la sesión
          const email = req.session.user.email;
      
          // Realiza una consulta a la base de datos para obtener los detalles del usuario
          const sqlSelectUser = 'SELECT * FROM users WHERE mail = ?';
          connection.query(sqlSelectUser, [email], (err, results) => {
            if (err) {
              console.error('Error al obtener detalles del usuario:', err);
              return res.status(500).send('<script>alert("Error al obtener detalles del usuario"); window.location.href="/";</script>');
            }

            console.log('Resultados de la consulta SQL:', results);
      
            if (results.length > 0) {
              const user = results[0];
      
              // Renderiza la vista de perfil y pasa los detalles del usuario a la plantilla
              res.render('profile.ejs', { user });
            } else {
              res.status(404).send('<script>alert("Usuario no encontrado"); window.location.href="/";</script>');
            }
          });
    });
    app.get('/settings', (req, res) => {
        res.render('settings.ejs');
    });

    //agregar usuario a la base de datos
    app.post('/usersignup', (req, res) => {
        const { name, lastName, email, password } = req.body;

            const sqlInsert = 'INSERT INTO users (name, last_name, mail, passw) VALUES (?, ?, ?, ?)';
            const values = [name, lastName, email, password];

            connection.query(sqlInsert, values, (err, results) => {
                if (err) {
                    console.error('Error al realizar la inserción:', err);
                    return res.status(500).send('<script>window.location.href="/login"; alert("Error al realizar el registro");</script>');
                }
    
                console.log('Usuario registrado correctamente');
                res.send('<script>window.location.href="/login"; alert("Usuario registrado correctamente");</script>');
            });
    });
    app.post('/userlogin', (req, res) => {
        const { email, password } = req.body;

    const sqlSelect = 'SELECT * FROM users WHERE mail = ?';
    connection.query(sqlSelect, [email], (err, results) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).send('<script>window.location.href="/login"; alert("Error al iniciar sesión");</script>');
        }

        if (results.length > 0) {
            const user = results[0];
            console.log('Contraseña almacenada:', user.passw.toString('utf-8'));
            console.log('Contraseña ingresada:', password);
            if (user.passw.toString('utf-8').trim() === password) {
                // Contraseña válida, iniciar sesión y redirigir
                req.session.user = { id: user.id_user, email: user.mail, points: user.user_points}; // Puedes almacenar más información del usuario si es necesario
                req.session.isLoggedIn = true;
                res.redirect('/');
                
            } else {
                // Contraseña incorrecta
                res.status(401).send('<script>alert("Contraseña incorrecta"); window.location.href="/login";</script>');
            }
        } else {
            // Usuario no encontrado
            res.status(404).send('<script>alert("Usuario no encontrado"); window.location.href="/login";</script>');
        }
    });
    });
    app.get('/logout', (req, res) => {
        // Destruye la sesión y redirige al usuario a la página de inicio o a donde desees
        req.session.destroy(err => {
          if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).send('<script>alert("Error al cerrar sesión"); window.location.href="/";</script>');
          }
    
          res.redirect('/');
        });
      });
      app.post('/redeem-coupon', (req, res) => {
        if (!req.session.isLoggedIn) {
            return res.redirect('/login');
        } else {
            // Obtén el tipo de cupón y el valor de puntos desde la solicitud
            const { couponType } = req.body;
    
            // Obtiene el ID del usuario desde la sesión
            const userId = req.session.user.id;
    
            // Declara pointsToDeduct fuera del bloque else
            let pointsToDeduct;
    
            // Realiza la lógica para restar puntos según el tipo de cupón
            switch (couponType) {
                case '10disc':
                    pointsToDeduct = 2000;
                    break;
                case '15disc':
                    pointsToDeduct = 3000;
                    break;
                case '30disc':
                    pointsToDeduct = 6000;
                    break;
                // Agrega más casos según sea necesario para otros tipos de cupones
                // ...
                default:
                    pointsToDeduct = 0;
            }
    
            // Actualiza la cantidad de puntos en la base de datos
            const sqlUpdatePoints = 'UPDATE users SET user_points = user_points - ? WHERE id_user = ?';
            connection.query(sqlUpdatePoints, [pointsToDeduct, userId], (err, results) => {
                if (err) {
                    console.error('Error al actualizar puntos del usuario:', err);
                    return res.status(500).send('<script>alert("Error al actualizar puntos del usuario"); window.location.href="/";</script>');
                }
    
                // También puedes actualizar la sesión con los puntos actualizados
                req.session.user.points -= pointsToDeduct;
    
                // Redirige a la página de cupones o a donde sea necesario
                res.redirect('/cupons');
            });
        }
    });
};
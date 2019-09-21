<?php
  ini_set('display_errors', 1);
  /*
  // Public API.
  //
  // Possible statuses:
  // 0 -> Pass.
  // 1 -> General error/invalid request.
  // 2 -> Not allowed.
  // * -> Custom status(es).
  //
  //      Read the specific case documentation.
  */

  /*
  //
  // Some of the public cases are very likely
  // unnecesary, all candidates for removal
  // have been set a TODO block.
  //
  */
  require_once('config.php');

  if (file_exists('vendor')) {
    require_once('vendor/autoload.php');
  } else {
    die('Falta el directorio de instalación de composer y sus dependencias, ¿te aseguraste de ejecutar <span style="font-family: monospace">composer install</span> antes de ingresar?');
  }

  use \Firebase\JWT\JWT;

  define('PASS', 0);
  define('ERROR', 1);
  define('NOT_ALLOWED', 2);

  if (isset($_POST['request']))
  {
    session_cache_expire($info['session_lifetime'] * 60 * 24 * 30);
    session_start();

    if (isset($_POST['content']) && is_array($_POST['content']))
    {
      // print $_POST['request'];
      switch ($_POST['request']) {
          case 'addProduct':
            
            if (isset($_SESSION['dni']))
            {
              if (is_array($_POST['content']))
              {
                $server->query('INSERT INTO ' . $tables['products'] . '
                (
                  Nombre,
                  Precio,
                  Estado
                )
                VALUES
                (
                  ' . $server->quote($_POST['content'][0]) . ',
                  ' . $server->quote($_POST['content'][1]) . ',
                  ' . str_replace('\'', '', $server->quote($_POST['content'][2])) . '
                )
                ');
                print PASS;
              } else {
                print ERROR;
              }
            }
            else
            {
              print NOT_ALLOWED;
            }

            break;
          case 'usernameLookup':
            /*
            // About this operation:
            //
            // A ternary operator is used to call fetch
            // into the object provided by the previous
            // SQL call, and then, from the first entry
            // in the index (the only one), its value
            // is checked against "greater than 1".
            //
            // The normal result will be either PASS (no
            // username matched) or ALREADY_REGISTERED.
            */

            define('ALREADY_REGISTERED', 3);

            $lookup = $server->query('SELECT COUNT(\'id\') FROM ' . $tables['users'] . ' WHERE DNI = ' . $server->quote($_POST['content']));
            if ($lookup) {
              if ($lookup->fetch()[0] > 1) {
                print ALREADY_REGISTERED;
              } else {
                print PASS;
              }
            } else {
              print ERROR;
            }

            break;
          case 'doVerifiedSignup':
            /*
            // Inputs:
            //
            // 0 -> DNI
            // 1 -> Mail address.
            // 2 -> Password.
            // 3 -> Name.
            // 4 -> Course.
            // 5 -> Division.
            */

            $dni      = $_POST['content'][0];
            $email    = $_POST['content'][1];
            $password = $_POST['content'][2];
            $name     = $_POST['content'][3];
            $course   = $_POST['content'][4];
            $division = $_POST['content'][5];

            /*
            // TODO: Some custom return values shall
            //       be added in this case.
            //
            //       The built-in cases represent an
            //       example and should be reviewed.
            */

            define('ALREADY_REGISTERED', 3);
            define('UNEXPECTED_VALUE', 4);

            // If there's both a valid mail address and a DNI...
            if (filter_var($email, FILTER_VALIDATE_EMAIL) && count(explode(".", $dni)) > 0) { // filter the data...
                $lookup = $server->query('SELECT COUNT(DNI)
                                          FROM ' . $tables['users'] . '
                                          WHERE DNI      = ' . $server->quote($dni) . '
                                          OR    `E-Mail` = ' . $server->quote($email));

                if ($lookup) {
                  if ($lookup->fetch()[0] > 0) {
                    print ALREADY_REGISTERED;
                  } else {
                    $query = 'INSERT INTO usuarios (
                                DNI, 
                                `E-mail`, 
                                Password, 
                                Nombre, 
                                Curso, 
                                Division
                              ) VALUES (
                              ' . $server->quote($dni) . ', 
                              ' . $server->quote($email) . ', 
                              ' . $server->quote(password_hash($password, PASSWORD_DEFAULT)) . ', 
                              ' . $server->quote($name) . ', 
                              ' . $server->quote($course) . ', 
                              ' . $server->quote($division) . '
                              )';

                    $insert = $server->query($query);
                    if ($insert) {
                      if ($insert->rowCount() > 0) {
                        print PASS;
                      } else {
                        print ERROR;
                      }
                    } else {
                      print ERROR;
                    }
                  }
                } else {
                  print ERROR;
                }
            } else { // If it's none of them, crash.
              print UNEXPECTED_VALUE;
            }

            break;
         case 'makeOrder':
            /*
            //Hacer un pedido
            //$_POST['content'][0] = ID del producto
            //$_POST['content'][1] = DNI del usuario
            */
           
           define('ALREADY_ORDERED', 3);

           if (isset($_SESSION['dni'])) {
            //Verifico si este alumno hizo un pedido y no fue ni entregado ni cancelado
              $query = 'SELECT COUNT(DNI_Usuario) FROM '.$tables['orders'].'
                        WHERE DNI_Usuario = '. $_SESSION['dni'] . ' AND
                              FH_Entregado IS NULL AND
                              DNI_Cancelado IS NULL';
              $lookup = $server->query($query);
              if ($lookup) {
                  if ($lookup->fetch()[0] > 1) {

                    print ALREADY_ORDERED;

                  } else {

                    //Verifico si el producto existe y esta disponible
                    $query = 'SELECT COUNT(ID_Producto) FROM ' . $tables['products'] . '
                              WHERE  ID_Producto        = ' . $server->quote($_POST['content'][0]) . '
                              AND    Estado             = 1';
                    $lookup =  $server->query($query);
                    if ($lookup) {

                      if ($lookup->fetch()[0] > 0) {
                        $query = 'INSERT INTO '.$tables['orders'].'
                                  (
                                    `DNI_Usuario`,
                                    `ID_Producto`
                                  )
                                  VALUES
                                  (
                                    '.$_SESSION['dni']     . ', ' /* DNI_Usuario*/ . '
                                    '.$_POST['content'][0]        /* ID_Producto*/ . '
                                  )';
                        $update = $server->query($query);
                        if ($update) {
                          print PASS;
                        } else {
                          print ERROR;
                        }
                      } else {
                        print ERROR;
                      }

                    } else {
                      print ERROR;
                    }
                  }
              } else {
                print ERROR;
              }
            } else {
              print NOT_ALLOWED;
            }
            //Si todo es correcto agrego el pedido a la cola

              break;
          case 'takeOrder':
            /*
              El administrador toma la orden
              //$_POST['content'][0] = ID del pedido
            */
           //VERIFICO SI EXISTE Y SI NO FUE TOMADO
              $lookup = $server->query('SELECT count(DNI_Usuario) FROM '.$tables['orders'].' WHERE
                				ID_Pedido = '.$server->quote($_POST['content'][0]).' AND
                				FH_Tomado IS NOT NULL');
              if($lookup){
                if ($lookup->fetch()[0]== 0) {
                   //Pongo el momento en el que fue tomado y por quien
                   $server->query('UPDATE '.$tables['orders'].' SET
                  				 FH_Tomado = SYSDATE(),
                  				 DNI_Administrador = '.$_SESSION["dni"].'
                           WHERE ID_Pedido = '.$_POST["content"][0]);
                   $sql = 'SELECT
                        o.DNI_Usuario, o.ID_Pedido,
                        o.ID_Producto, o.DNI_Administrador,
                        CONCAT(HOUR(o.FH_Recibido),":",MINUTE(o.FH_Recibido)) AS "Recibido",
                      CONCAT(HOUR(o.FH_Tomado),":",MINUTE(o.FH_Tomado)) AS "Tomado",
                        u.Nombre, a.Nombre,
                        p.Nombre, p.Precio
                        FROM ' .$tables['orders'] . ' o
                        INNER JOIN ' .$tables['users'] . ' u
                        ON u.DNI = DNI_Usuario 
                        INNER JOIN ' .$tables['admin'] . ' a
                        ON a.DNI = DNI_Administrador 
                        INNER JOIN ' .$tables['products']. ' p
                        ON p.ID_Producto = o.ID_Producto
                        WHERE 
                        o.ID_Pedido = '.$server->quote($_POST['content'][0]);
                        //print $sql;
                   $lookup   =     $server->query($sql);
                    print json_encode($lookup->fetchall());
                }else{
                  print ERROR;
                }
              }else{
                print ERROR;
              }
              break;
          case 'readyOrder':
                /*
                  El pedido ya esta listo
                 */
              //VERIFICO SI EXISTE Y SI NO FUE TOMADO
               $sql = 'SELECT COUNT(ID_Pedido) FROM '.$tables['orders'].' WHERE
                ID_Pedido = '.$server->quote($_POST['content'][0]).' AND
                FH_Tomado IS NULL';
              $lookup = $server->query($sql);
              //PRINT $sql;
              if($lookup){
                if ($lookup->fetch()[0]==0) {
                   //Pongo el momento en el que fue tomado y por quien
                   $server->query('UPDATE '.$tables['orders'].' SET
                   FH_Listo = SYSDATE()
                   WHERE ID_Pedido = '.$server->quote($_POST['content'][0]));
                   $sql = 'SELECT
                      o.DNI_Usuario, o.ID_Pedido,
                      o.ID_Producto, o.DNI_Administrador,
                      CONCAT(HOUR(o.FH_Recibido),":",MINUTE(o.FH_Recibido)) AS "Recibido",
                      CONCAT(HOUR(o.FH_Tomado),":",MINUTE(o.FH_Tomado)) AS "Tomado",
                      CONCAT(HOUR(o.FH_Listo),":",MINUTE(o.FH_Listo)) AS "Listo",
                      u.Nombre AS "Usuario", a.Nombre AS "Admin",
                      p.Nombre AS "Producto", p.Precio
                      FROM ' .$tables['orders'] . ' o
                      INNER JOIN ' .$tables['users'] . ' u
                      ON u.DNI = DNI_Usuario 
                      INNER JOIN ' .$tables['admin'] . ' a
                      ON a.DNI = DNI_Administrador 
                      INNER JOIN ' .$tables['products']. ' p
                      ON p.ID_Producto = o.ID_Producto
                      WHERE ID_Pedido = '.$server->quote($_POST['content'][0]);
                         // print $sql;
                    $lookup   =     $server->query($sql);
                    print json_encode($lookup->fetchall());   
                }else{
                  print ERROR;
                }
              }else{
                print ERROR;
              }
          break;
        case 'viewOrder':
         $sql = 'SELECT
            o.DNI_Usuario, o.ID_Pedido,
            o.ID_Producto, o.DNI_Administrador,
              CONCAT(DATE_FORMAT(o.FH_Recibido,"%d-%m-%Y")," (",DAYNAME(o.FH_Recibido),")") AS "DIA",
              CONCAT(HOUR(o.FH_Recibido),":",MINUTE(o.FH_Recibido)) AS "Recibido",
              CONCAT(HOUR(o.FH_Tomado),":",MINUTE(o.FH_Tomado)) AS "Tomado",
              CONCAT(HOUR(o.FH_Listo),":",MINUTE(o.FH_Listo)) AS "Listo",
              CONCAT(HOUR(o.FH_Entregado),":",MINUTE(o.FH_Entregado)) AS "Entregado",
            o.DNI_Cancelado,
            u.Nombre AS "Usuario", a.Nombre AS "Admin",
            CONCAT(u.Curso," ",u.Division) AS "curso",
            p.Nombre AS "Producto", p.Precio
            FROM ' .$tables['orders'] . ' o
            INNER JOIN ' .$tables['users'] . ' u
            ON u.DNI = DNI_Usuario
            INNER JOIN ' .$tables['admin'] . ' a
            ON a.DNI = DNI_Administrador
            INNER JOIN ' .$tables['products']. ' p
            ON p.ID_Producto = o.ID_Producto
            WHERE
            ID_Pedido = ' . $server->quote($_POST['content'][0]);
            $lookup   =     $server->query($sql);
            //print $sql;
          if ($lookup) {
            print json_encode($lookup->fetchall());
          } else {
            print ERROR;
          }
          break;

        case 'viewUser':
         $sql = 'SELECT * FROM '.$tables['users'].' WHERE
          DNI     = ' . $server->quote($_POST['content'][0]).'';
          $lookup =     $server->query($sql);

          if ($lookup) {
            print json_encode($lookup->fetchall());
          } else {
            print ERROR;
          }
          break;
        case 'viewOneReport':
         $sql = 'SELECT * 
            FROM '.$tables['reports'].' 
            WHERE DNI     = ' . $server->quote($_POST['content'][0]);
          $lookup =     $server->query($sql);
            if ($lookup) {
              print json_encode($lookup->fetchall());
            } else {
              print ERROR;
            }
            break;
            case 'viewReports':
          $lookup =     $server->query('SELECT * 
            FROM '.$tables['reports'].'');
            if ($lookup) {
              print json_encode($lookup->fetchall());
            } else {
              print ERROR;
            }
            break;
            case 'finishOrder':
               /*
                  El pedido ya esta listo
                 */
              //VERIFICO SI EXISTE Y SI NO FUE TOMADO
               $sql = 'SELECT COUNT(ID_Pedido) FROM '.$tables['orders'].' WHERE
                ID_Pedido = '.$server->quote($_POST['content'][0]).' AND
                FH_Listo IS NULL';
              $lookup = $server->query($sql);
              //PRINT $sql;
              if($lookup){
                if ($lookup->fetch()[0]==0) {
                   //Pongo el momento en el que fue tomado y por quien
                   $server->query('UPDATE '.$tables['orders'].' SET
                   FH_Entregado = SYSDATE()
                   WHERE ID_Pedido = '.$server->quote($_POST['content'][0]));
                   print PASS;
                }else{
                  print ERROR;
                }
              }else{
                print ERROR;
              }
              break;
          case 'statusOrder':
          //$_POST['content'][0]) id del producto
            define('RED',0);
            define('YELLOW',1);
            define('GREEN',2);
            define('GREY',3);
            define('CROSS',4);
             $sql = 'SELECT 
              INULL(FH_Tomado), ISNULL(FH_Listo), 
              ISNULL(FH_Entregado), ISNULL(DNI_Cancelado) 
              FROM '.$tables['orders'].' WHERE
            ID_Pedido  = ' . $server->quote($_POST['content'][0]).'';
            $lookup =     $server->query($sql);
            if ($lookup) {
              if ($lookup->rowCount() > 0) {
                $array = $lookup->fetchall();
                if ($array[3]) { //SI CANCELADO ESTA NULO (NADIE CANCELÓ EL PEDIDO)
                    if ($array[0]) { //SI FH_Tomado ESTA NULO (NADIE TOMÓ EL PEDIDO)
                      print RED;
                    }else if ($array[1]) {//SI FH_Listo ESTA NULO (EL PRODUCTO FUE TOMADO EL PEDIDO)
                      print YELLOW;
                    }elseif ($array[2]) {//SI FH_Entregado ESTA NULO (TODAVIA NO LO RETIRARON EL PEDIDO)
                      print GREEN;
                    }else{
                      print GREY; //RETIRARON EL PEDIDO
                    }
                }else{
                  print CROSS;
                }

              }else{
                print ERROR;
              }

            } else {
              print ERROR;
            }

            break;
          case 'getReasons':
                $lookup =     $server->query('SELECT * 
                  FROM '.$tables['reasons'].'');
                if ($lookup) {
                  print json_encode($lookup->fetchall());
                } else {
                  print ERROR;
                }
          break;
          case 'doAdministratorLogin':
            /*
            // Inputs:
            //
            // 0 -> DNI/Mail address.
            // 1 -> Password.
            */

            $email = $server->quote($_POST['content'][0]);
            $password = $server->quote($_POST['content'][1]);

            /*
            // Security:
            //
            // There isn't much to worry about this topic, the security mechanisms will be backed by the
            // login script itself, and not here, because it would be a waste of resources for the rest of
            // possible frontends.
            */

            define('BAD_CREDENTIALS', 3);

            // Try to update a matching entry.
            $sql = 'SELECT DNI FROM ' . $tables['admin'] . '
                               WHERE (
                                  `E-mail`       = ' . $email . '
                                  OR
                                  DNI           = ' . $email . '
                                     )
                               AND  Password      = ' . $password. '';

            $lookup = $server->query($sql);

            // If the request was possible..

            if ($lookup) {
              $datos = $lookup->fetch();
                $matches = $lookup->rowCount();

                if ($matches > 1) {
                  /*
                  // The database was inconsistent.
                  //
                  // TODO: The frontend should print an error telling
                  //       the client that a fatal error broke the
                  //       login process.
                  */
                  print ERROR;
                } elseif ($matches == 1) {
                  // Success logging in.

                  // Reflect the logon to the session
                  $token = array(
                      "iat"        => $_SERVER['REQUEST_TIME'],
                      "data"       => [
                        "username" => $_POST['content'][0],
                        "password" => $_POST['content'][1]
                      ]
                  );
                  $_SESSION['dni'] = $datos["DNI"];
                  // Define encryption parameters and encode the data.
                  $_SESSION['token'] = JWT::encode($token, $security['secret']);

                  print PASS;
                } else {
                  print BAD_CREDENTIALS;
                }
              } else {
                print ERROR;
              }

            break;
          case 'doUserLogin':
            /*
            // Inputs:
            //
            // 0 -> DNI/Mail address.
            // 1 -> Password.
            */

            $email = $_POST['content'][0];
            $password = $_POST['content'][1];

            define('BAD_CREDENTIALS', 3);

            // Try to update a matching entry.

            $sql = 'SELECT DNI, 
                           Password
                    FROM ' . $tables['users'] . '
                    WHERE
                      `E-mail`       = ' . $server->quote($email) . '
                      OR
                      DNI           = ' . $server->quote($email);

            $lookup = $server->query($sql);
            //PRINT $sql;

            // If the request was possible..

            if ($lookup) {
                $datos = $lookup->fetch();
                $matches = $lookup->rowCount();

                if ($matches > 1) {
                  /*
                  // The database was inconsistent.
                  //
                  // TODO: The frontend should print an error telling
                  //       the client that a fatal error broke the
                  //       login process.
                  */
                  print ERROR;
                } elseif ($matches == 1 && password_verify($password, $datos['Password'])) {
                  // Success logging in.

                  // Reflect the logon to the session
                  $token = array(
                      "iat"        => $_SERVER['REQUEST_TIME'],
                      "data"       => [
                        "username" => $_POST['content'][0],
                        "password" => $_POST['content'][1]
                      ]
                  );
                  $_SESSION['dni'] = $datos["DNI"];
                  // Define encryption parameters and encode the data.
                  $_SESSION['token'] = JWT::encode($token, $security['secret']);

                  print PASS;
                } else {
                  print BAD_CREDENTIALS;
                }
              } else {
                print ERROR;
              }

            break;
          case 'getAlumno':
            $sql = 'SELECT `E-mail`,Nombre,Curso,Division 
            FROM ' .$tables['users'] .' 
            WHERE DNI = '.$_POST["content"][0];
               // print $sql;
          $lookup   =     $server->query($sql);
          if($lookup){
                print json_encode($lookup->fetchall());
            }else{
              print ERROR;
            }
            break;
          case 'addReport':

          /*
          REPORTAR UN USUARIO
            $_POST['content'][0] = TIENE EL REPORTE
            $_POST['content'][1] = DNI DEL USUARIO
            $_POST['content'][2] = DNI DEL ADMINISTRADOR
           */
            $sql = 'INSERT INTO '.$tables['orders'].'
                (
                  `Motivo`,
                  `DNI_U`,
                  `DNI_A`,
                  `Fecha_Hora`
                )
                VALUES
                (
                  "'.$_POST['content'][0].'", ' /* Motivo*/ . '
                  '.$_POST['content'][1].', ' /* DNI_U*/ . '
                  '.$_POST['content'][2].', ' /* DNI_A*/ . '
                  NULL,   '/* Fecha_Hora*/ . '
                )';
              $server->query($sql);
            break;
          case 'deleteProduct':
              $lookup = $server->query('SELECT COUNT(ID_Producto) FROM ' . $tables['orders'] . '
                                        WHERE  ID_Producto        =    ' . $server->quote($_POST['content'][0]));
              if ($lookup) {
                $matches = $lookup->fetch()[0];

                if ($matches > 0) {
                  if ($server->query('UPDATE                ' . $tables['products'] . '
                                      SET     Estado      = -1
                                      WHERE   ID_Producto = ' . $server->quote($_POST['content'][0]))->rowCount() > 0)
                  {
                    print PASS;
                  } else {
                    print ERROR;
                  }
                } else {
                  if ($server->query('DELETE  FROM          ' . $tables['products'] . '
                                      WHERE   ID_Producto = ' . $server->quote($_POST['content'][0]))->rowCount() > 0)
                  {
                    print PASS;
                  } else {
                    print ERROR;
                  }
                }
              } else {
                print ERROR;
              }
              break;
            case 'history':
          //MOSTRAR EN PANTALLA:
          //o.ID_PEDIDO
          //u.NOMBRE = NOMBRE DEL USUARIO
          //a.Administrador = NOMBRE DEL ADMINISTRADOR
          //o.DNI_Cancelado = DNI DE QUIEN LO CANCELÓ
          if (isset($_POST['content'][1]) && !($_POST['content'][1]=='')) {
            $donde = $_POST['content'][1];
          }else{
            $donde = $server->quote($_POST['content'][0]);
          }
            $sql = 'SELECT
              o.ID_Pedido, o.DNI_Cancelado,
              u.Nombre AS "Usuario", a.Nombre AS "Admin"     
            FROM ' .$tables['orders'] . ' o  
            INNER JOIN ' .$tables['users'] . ' u
            ON u.DNI = DNI_Usuario 
            INNER JOIN ' .$tables['products'] . ' p
            ON p.ID_Producto = o.ID_Producto 
            INNER JOIN ' .$tables['admin'] . ' a
            ON a.DNI = DNI_Administrador OR a.DNI=DNI_Cancelado
            WHERE o.FH_Entregado IS NOT NULL AND
            ('.$donde.')
            ORDER BY o.ID_Pedido DESC';
            // print $sql;
            $lookup   =     $server->query($sql);
            if($lookup){
                print json_encode($lookup->fetchall());
              
            }else{
              print ERROR;
            }
            break;
            case 'cancelarOrden':
            $dni = isset($_POST['content'][1]) ? $_POST['content'][1] : $_SESSION['dni'];
              $sql = "UPDATE ".$tables['orders']." SET
              DNI_Cancelado = ".$dni." WHERE ID_Pedido = ".$_POST['content'][0];  
              $lookup = $server->query($sql);
              //print $sql;
              if ($lookup) {
                print PASS;
              }else{
                print ERROR;
              }
            break;
          case 'cancelarOrden':
            $dni = isset($_POST['content'][1]) ? $_POST['content'][1] : $_SESSION['dni'];
              $sql = "UPDATE ".$tables['orders']." SET
              DNI_Cancelado = ".$dni." WHERE ID_Pedido = ".$_POST['content'][0];  
              $lookup = $server->query($sql);
              //print $sql;
              if ($lookup) {
                print PASS;
              }else{
                print ERROR;
              }
            break;
          default:
            print ERROR;
        }
        
    } elseif (isset($_POST['request'])) {
      switch ($_POST['request']) {
        // TODO: Check this case, it doesn't seem to be necessary.
        case 'getHome':
          print json_encode($info['home']);

          break;
         case 'viewOrderQueve':
        //DEVUELVE:
        //DNI_Usuario
        //ID_Pedido
        //ID_Producto
        //DNI_Administrador = DNI DEL ADMINISTRADOR QUE TOMÓ EL PEDIDO
        //FH_Recibido
        //FH_Tomado
        //u.Nombre = NOMBRE DEL USUARIO QUE HIZO EL PEDIDO
        //a.Nombre = NOMBRE DEL ADMINISTRADOR QUE TOMÓ EL PEDIDO
        //p.Nombre = NOMBRE DEL PRODUCTO QUE SE PIDE
        //p.Precio = PRECIO DEL PRODUCTO QUE SE PIDE
        $sql = 'SELECT
            o.DNI_Usuario, o.ID_Pedido,
            o.ID_Producto, o.DNI_Administrador,
              CONCAT(HOUR(o.FH_Recibido),":",MINUTE(o.FH_Recibido)) AS "Recibido",
              CONCAT(HOUR(o.FH_Tomado),":",MINUTE(o.FH_Tomado)) AS "Tomado",
            u.Nombre, a.Nombre,
            p.Nombre, p.Precio
            FROM ' .$tables['orders'] . ' o
            INNER JOIN ' .$tables['users'] . ' u
            ON u.DNI = DNI_Usuario 
            INNER JOIN ' .$tables['admin'] . ' a
            ON a.DNI = DNI_Administrador 
            INNER JOIN ' .$tables['products']. ' p
            ON p.ID_Producto = o.ID_Producto
            WHERE o.DNI_Administrador IS NOT NULL AND 
                o.DNI_Cancelado IS NULL AND 
                o.FH_Listo IS NULL';
               // print $sql;
          $lookup   =     $server->query($sql);
          if($lookup){
                print json_encode($lookup->fetchall());
            }else{
              print ERROR;
            }
          break;
          case 'viewOrderReady':
            $sql = 'SELECT
            o.DNI_Usuario, o.ID_Pedido,
            o.ID_Producto, o.DNI_Administrador,
              CONCAT(HOUR(o.FH_Recibido),":",MINUTE(o.FH_Recibido)) AS "Recibido",
              CONCAT(HOUR(o.FH_Tomado),":",MINUTE(o.FH_Tomado)) AS "Tomado",
              CONCAT(HOUR(o.FH_Listo),":",MINUTE(o.FH_Listo)) AS "Listo",
            u.Nombre, a.Nombre,
            p.Nombre, p.Precio
            FROM ' .$tables['orders'] . ' o
            INNER JOIN ' .$tables['users'] . ' u
            ON u.DNI = DNI_Usuario 
            INNER JOIN ' .$tables['admin'] . ' a
            ON a.DNI = DNI_Administrador 
            INNER JOIN ' .$tables['products']. ' p
            ON p.ID_Producto = o.ID_Producto
            WHERE o.FH_Listo IS NOT NULL AND 
                o.FH_Entregado IS NULL AND
                o.DNI_Cancelado IS NULL';
               // print $sql;
          $lookup   =     $server->query($sql);
          if($lookup){
                print json_encode($lookup->fetchall());
            }else{
              print ERROR;
            }
            break;
          
          case 'viewOrderRequest':
          
          //DEVUELVE:
        //DNI_Usuario
        //ID_Pedido
        //ID_Producto
        //FH_Recibido
        //u.Nombre = NOMBRE DEL USUARIO QUE HIZO EL PEDIDO
        //p.Nombre = NOMBRE DEL PRODUCTO QUE SE PIDE
        //p.Precio = PRECIO DEL PRODUCTO QUE SE PIDE
        $sql ='SELECT
            o.DNI_Usuario, o.ID_Pedido,
              CONCAT(HOUR(o.FH_Recibido),":",MINUTE(o.FH_Recibido)) AS "Recibido",
            u.Nombre,
            p.Nombre, p.Precio
            FROM ' .$tables['orders'] . ' o
            INNER JOIN ' .$tables['users'] . ' u
            ON u.DNI = o.DNI_Usuario 
            INNER JOIN ' .$tables['products']. ' p 
            ON p.ID_Producto =  o.ID_Producto
            WHERE o.DNI_Cancelado IS NULL and 
                  o.DNI_Administrador IS NULL;';
          $lookup   =     $server->query($sql);
          //print $sql;
            if($lookup){
                print json_encode($lookup->fetchall());
            }else{
              print ERROR;
            }
            
          break;
        case 'getProducts':
          print json_encode($server->query('SELECT *      FROM ' . $tables['products'] . '
                                            WHERE  estado >    -1')->fetchAll());
          break;
        case 'getUserHistory':
          define('EMPTY_RESULT', 3);

          if (isset($_SESSION['dni'])) { // a DNI is set
            $sql = 'SELECT pedidos.ID_Producto AS ID_Producto, productos.Nombre AS Producto_Nombre, productos.Precio AS Producto_Precio, administrador.Nombre AS Nombre_Administrador, FH_Recibido, FH_Tomado, FH_Listo, FH_Entregado, DNI_Cancelado
                    FROM   pedidos
                    JOIN   administrador
                           ON administrador.DNI = pedidos.DNI_Administrador
                    JOIN   productos
                           ON productos.ID_Producto = pedidos.ID_Producto
                    WHERE  pedidos.DNI_Usuario = ' . $_SESSION['dni'] .'
                    ORDER  BY ID_Pedido DESC';
            // print $sql;
            $lookup = $server->query($sql);
            if ($lookup) { // is ok, then..
              $rowCount = $lookup->rowCount();
              if ($rowCount > 0) { // and there is any data
                print json_encode($lookup->fetchall());
              } else { // just print the obvious count (zero).
                print EMPTY_RESULT;
              }
            } else {
              print ERROR;
            }
          } else {
            print NOT_ALLOWED;
          }
          break;  
        case 'getUserOrders':
          // Returns the last order available from the user who issued the request.

          // TODO: Get this case to support multiple orders.

          define('NO_ORDERS', 3);
          if (isset($_SESSION['dni'])) {
            $sql = 'SELECT
                      DNI_Usuario, 
                      ID_Pedido, 
                      productos.Nombre As Nombre_Producto, 
                      DNI_Administrador, 
                      FH_Recibido, 
                      FH_Tomado, 
                      FH_Listo, 
                      FH_Entregado, 
                      DNI_Cancelado
                    FROM pedidos
                    JOIN productos
                      ON productos.ID_Producto = pedidos.ID_Producto
                    WHERE         DNI_Usuario = ' . $_SESSION['dni'] . '
                    ORDER BY      FH_Recibido DESC
                    LIMIT 1';
            $lookup = $server->query($sql);
            if ($lookup) { // is ok, then..
              $rowCount = $lookup->rowCount();
              if ($rowCount > 0) { // and there is any data
                print json_encode($lookup->fetchAll());
              } else {
                print NO_ORDERS;
              }
            } else {
              print ERROR;
            }
          } else {
            print NOT_ALLOWED;
          }
          break;
        default:
          print ERROR;
      }
    }
  } else {
    $title = 'API';
    require_once('includes/header.php');
    print '
    <div id="vcentered_message" class="row valign-wrapper">
      <div class="col s12 center-align grey-text">
        <h5>
          <i class="large material-icons">code</i> <br>
            ¡Hola! Esta es nuestra API.
          </h5>
          <h6>
            Podés ejecutar los siguientes casos: addProduct. <br>
          </h6>
      </div>
    </div>';
    require_once('includes/footer.php');
  }
  $title = 'API'; $no_menu = true;
?>

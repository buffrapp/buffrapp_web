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

  define('PASS', 0);
  define('ERROR', 1);
  define('NOT_ALLOWED', 2);

  if (isset($_POST['request']))
  {
    if (isset($_POST['content']) && is_array($_POST['content']))
    {
      print $_POST['request'];
      switch ($_POST['request']) {
          case 'addProduct':
            session_start();
            if (isset($_SESSION['username']) && isset($_SESSION['password']))
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
            // 0 -> DNI/Mail address.
            // 1 -> Password.
            */

            $email = $server->quote($_POST['content'][0]);
            $password = $server->quote($_POST['content'][1]);

            /*
            // TODO: Some custom return values shall
            //       be added in this case.
            //
            //       The built-in cases represent an
            //       example and should be reviewed.
            */

            define('ALREADY_REGISTERED', 3);
            define('USERNAME_UNEXPECTED_VALUE', 4);
            define('PASSWORD_UNEXPECTED_VALUE', 5);

            // If it's a mail address...
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) { // filter it out...
              $lookup = $server->query('SELECT COUNT(E-mail) FROM ' . $tables['users'] . ' WHERE E-mail = ' . $email);

              if ($lookup) {
                if ($lookup->fetch()[0] > 1) {
                  print ALREADY_REGISTERED;
                } else {
                  if ($server->query('INSERT INTO usuarios (E-mail, Password) VALUES (' . $email . ', ' . $password . ')') > 0) {
                    print PASS;
                  } else {
                    print ERROR;
                  }
                }
              } else {
                print ERROR;
              }
            } elseif (count(explode(".", $email)) > 0) { // else, look for a DNI.
              $lookup = $server->query('SELECT DNI FROM ' . $tables['users'] . ' WHERE E-mail = ' . $email);
              if ($server->query('INSERT INTO usuarios (DNI, Password) VALUES (' . $email . ', ' . $password . ')') > 0) {
                print PASS;
              } else {
                print ERROR;
              }
            } else { // If it's none of them, crash.
              print USERNAME_UNEXPECTED_VALUE;
            }

            break;
         case 'makeOrder':
            /*
            //Hacer un pedido
            //$_POST['content'][0] = ID del producto
            //$_POST['content'][1] = DNI del usuario
            */
           //Verifico si este alumno hizo un pedido y no fue ni entregado ni cancelado
            $lookup = $server->query('SELECT COUNT(DNI_Usuario) FROM '.$tables['orders'].' WHERE
              DNI_Usuario = '.$server->quote($_POST['content'][1]).' AND
              FH_Entregado = NULL AND
              DNI_Cancelado = NULL');
            if ($lookup) {
                if ($lookup->fetch()[0] > 1) {

                  print ALREADY_REGISTERED;

                } else {

                  //Verifico si el producto existe y esta disponible
                  $lookup = $server->query('SELECT FROM '.$tables['products'].' WHERE
                  ID_Producto = '.$server->quote($_POST['content'][0]).' AND
                  Estado = \'1\'');
                  if($lookup){

                    if ($lookup->fetch()[0] > 1) {
                      $lookup = $server->query('INSERT INTO '.$tables['orders'].'
                              (
                                `DNI_Usuario`,
                                `ID_Pedido`,
                                `ID_Producto`,
                              )
                              VALUES
                              (
                                '.$_POST['content'][1].', ' /* DNI_Usuario*/ . '
                                NULL, ' /* ID_Pedido*/ .'
                                '.$_POST['content'][0].', ' /* ID_Producto*/ . '
                              )');
                      if ($lookup) {
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


            //Si todo es correcto agrego el pedido a la cola

              break;
          case 'takeOrder':
            /*
              El administrador toma la orden
              //$_POST['content'][0] = ID del pedido
              //$_POST['content'][1] = DNI del administrador
            */
           //VERIFICO SI EXISTE Y SI NO FUE TOMADO
              $lookup = $server->query('SELECT count(DNI_Usuario) FROM '.$tables['orders'].' WHERE
                ID_Pedido = '.$server->quote($_POST['content'][0]).' AND
                FH_Tomado != NULL');
              if($lookup){
                if ($lookup->fetch()[0]==0) {
                   //Pongo el momento en el que fue tomado y por quien
                   $server->query('UPDATE '.$tables['orders'].' SET
                   FH_Tomado = SYSDATE(), DNI_Administrador = '.$_POST['content'][1]);
                   print PASS;
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
              $lookup = $server->query('SELECT COUNT(ID_Pedido) FROM '.$tables['orders'].' WHERE
                ID_Pedido = '.$server->quote($_POST['content'][0]).' AND
                FH_Tomado != NULL');

              if($lookup){
                if ($lookup->fetch()[0]==0) {
                   //Pongo el momento en el que fue tomado y por quien
                   $server->query('UPDATE '.$tables['orders'].' SET
                   FH_Listo = SYSDATE()');
                }else{
                  print ERROR;
                }
              }
          break;
        case 'viewOrder':
            $lookup   =     $server->query('SELECT
            o.DNI_Usuario, o.ID_Pedido,
            o.ID_Producto, o.DNI_Administrador,
            o.FH_Recibido, o.FH_Tomado,
            o.FH_Listo, o.FH_Entregado, 
            o.DNI_Cancelado,
            u.Nombre, a.Nombre,
            u.Division, u.Curso,
            p.Nombre, p.Precio
            FROM ' .$tables['orders'] . ' o
            INNER JOIN ' .$tables['users'] . ' u
            ON u.DNI = DNI_Usuario
            INNER JOIN ' .$tables['admin'] . ' a
            ON a.DNI = DNI_Administrador
            INNER JOIN ' .$tables['products']. ' p
            ON p.ID_Producto = o.ID_Producto
            WHERE
            ID_Pedido = ' . $server->quote($_POST['content'][0]));

          if ($lookup) {
            print json_encode($lookup->fetch());
          } else {
            print ERROR;
          }
          break;
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
          $lookup   =     $server->query('SELECT
            o.DNI_Usuario, o.ID_Pedido,
            o.ID_Producto, o.DNI_Administrador,
            o.FH_Recibido, o.FH_Tomado,
            u.Nombre, a.Nombre,
            p.Nombre, p.Precio
            FROM ' .$tables['orders'] . ' o
            INNER JOIN ' .$tables['users'] . ' u
            ON u.DNI = DNI_Usuario 
            INNER JOIN ' .$tables['admin'] . ' a
            ON a.DNI = DNI_Administrador 
            INNER JOIN' .$tables['products']. ' p
            ON p.ID_Producto = o.ID_Producto');

          if ($lookup) {
            print json_encode($lookup->fetch());
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
            $lookup   =     $server->query('SELECT
              o.ID_Pedido, o.DNI_Cancelado
              o.FH_Recibido,
              u.Nombre, a.Nombre        
            FROM ' .$tables['orders'] . ' o  
            INNER JOIN ' .$tables['users'] . ' u
            ON u.DNI = DNI_Usuario 
            INNER JOIN ' .$tables['admin'] . ' a
            ON a.DNI = DNI_Administrador a');
            if ($lookup) {
              print json_encode($lookup->fetch());
            } else {
              print ERROR;
            }
            break;
        case 'viewUser':
          $lookup =     $server->query('SELECT * FROM '.$tables['users'].' WHERE
          DNI     = ' . $server->quote($_POST['content'][0]).'');

          if ($lookup) {
            print json_encode($lookup->fetch());
          } else {
            print ERROR;
          }
          break;
        case 'viewOneReport':
          $lookup =     $server->query('SELECT * 
            FROM '.$tables['reports'].' 
            WHERE DNI     = ' . $server->quote($_POST['content'][0]));
            if ($lookup) {
              print json_encode($lookup->fetch());
            } else {
              print ERROR;
            }
            break;
            case 'viewReports':
          $lookup =     $server->query('SELECT * 
            FROM '.$tables['reports'].'');
            if ($lookup) {
              print json_encode($lookup->fetch());
            } else {
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
            $lookup =     $server->query('SELECT 
              INULL(FH_Tomado), ISNULL(FH_Listo), 
              ISNULL(FH_Entregado), ISNULL(DNI_Cancelado) 
              FROM '.$tables['orders'].' WHERE
            ID_Pedido  = ' . $server->quote($_POST['content'][0]).'');
            if ($lookup) {
              if ($lookup->rowCount() > 0) {
                $array = $lookup->fetch();
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
                  print json_encode($lookup->fetch());
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

            /*
            // About this operation:
            //
            // A random_bytes call is done, looking for a return value of 64 bytes (default), taken from the
            // RANDOM_LENGTH constant. Then, this value is passed to a subsequent bin2hex call which will
            // return a pair of hex values that are easy to work with in the database, this results in a
            // string with a length of RANDOM_LENGTH ^ 2 or RANDOM_LENGTH * 2.
            */

            define('BAD_CREDENTIALS', 3);

            // Try to update a matching entry.
            $lookup = $server->query('SELECT COUNT(DNI) FROM ' . $tables['admin'] . '
                                       WHERE (
                                           `E-mail`       = ' . $email . '
                                            OR
                                            DNI           = ' . $email . '
                                             )
                                       AND  password      = ' . $password);

            // If the request was possible..
            if ($lookup) {
                $matches = $lookup->fetch()[0];
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

                  // Reflect the logon to the session.
                  session_start();
                  $_SESSION['username'] = $email;
                  $_SESSION['password'] = $password;

                  print PASS;
                } else {
                  print BAD_CREDENTIALS;
                }
              } else {
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
              $server->query('INSERT INTO '.$tables['orders'].'
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
                )');
            break;
          case 'deleteProduct':
            if ($server->query('DELETE         FROM ' . $tables['products'] . '
                                WHERE ID_Producto = ' . $server->quote($_POST['content'][0])) > 0)
            {
              print PASS;
            } else {
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
          case 'viewOrderRequest':
          define('EMPETY', 3);
          //DEVUELVE:
        //DNI_Usuario
        //ID_Pedido
        //ID_Producto
        //FH_Recibido
        //u.Nombre = NOMBRE DEL USUARIO QUE HIZO EL PEDIDO
        //p.Nombre = NOMBRE DEL PRODUCTO QUE SE PIDE
        //p.Precio = PRECIO DEL PRODUCTO QUE SE PIDE
          $lookup   =     $server->query('SELECT
            o.DNI_Usuario, o.ID_Pedido,
            o.FH_Recibido,
            u.Nombre,
            p.Nombre, p.Precio
            FROM ' .$tables['orders'] . ' o
            INNER JOIN ' .$tables['users'] . ' u
            ON DNI = DNI_Usuario 
            INNER JOIN ' .$tables['products']. ' p 
            ON p.ID_Producto =  o.ID_Producto
            WHERE o.DNI_Cancelado = "NULL" AND 
                  o.DNI_Administrador = "NULL"');
            print 'SELECT
            o.DNI_Usuario, o.ID_Pedido,
            o.FH_Recibido,
            u.Nombre,
            p.Nombre, p.Precio
            FROM ' .$tables['orders'] . ' o
            INNER JOIN ' .$tables['users'] . ' u
            ON DNI = DNI_Usuario 
            INNER JOIN ' .$tables['products']. ' p 
            ON p.ID_Producto =  o.ID_Producto
            WHERE o.DNI_Cancelado = "NULL" AND
                  o.DNI_Administrador = "NULL"';

            if($lookup){
              if($lookup->fetch()[0] > 0){
                print json_encode($lookup->fetchall());
              }else{
                print EMPETY;
              }
              
            }else{
              print ERROR;
            }
            
          break;
        case 'getProducts':
          print json_encode($server->query('SELECT * FROM ' . $tables['products'])->fetchAll());
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

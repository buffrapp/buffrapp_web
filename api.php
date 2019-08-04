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
      switch ($_POST['request']) {
          case 'addProduct':
            if (isset($_SESSION['token']))
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
                  ' . $server->quote($_POST['content'][2]) . '
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
              $lookup = $server->query('SELECT COUNT(mail) FROM ' . $tables['users'] . ' WHERE E-mail = ' . $email);

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
              $lookup = $server->query('SELECT dni FROM ' . $tables['users'] . ' WHERE mail = ' . $email);
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
            $lookup = $server->query('SELECT FROM '.$tables['orders'].' WHERE 
              DNI = '.$server->quote($_POST['content'][1]).' AND 
              FH_Entregado = NULL AND 
              Cancelado = \'0\'');

            //Verifico si el producto existe y esta disponible
            $lookup = $server->query('SELECT FROM '.$tables['products'].' WHERE 
              ID_Producto = '.$server->quote($_POST['content'][0]).' AND 
              Estado = \'1\'');

            //Si todo es correcto agrego el pedido a la cola
            $server->query('INSERT INTO '.$tables['orders'].'
                (
                  `DNI_Usuario`,
                  `ID_Pedido`,
                  `ID_Producto`,
                  `FH_Tomado`,
                  `FH_Listo`,
                  `FH_Entregado`,
                  `Cancelado`
                )
                VALUES
                (
                  '.$_POST['content'][1].', '/* DNI_Usuario*/'
                  NULL, '/* ID_Pedido*/'   
                  '.$_POST['content'][0].', '/* ID_Producto*/'
                  NULL,   '/* FH_Tomado*/'
                  NULL,   '/* FH_Listo*/'
                  NULL, '/* FH_Entregado*/'
                  NULL '/* Cancelado*/'              
                )');
              break;
          case 'takeOrder':
            /*
              El administrador toma la orden
              //$_POST['content'][0] = ID del pedido
              //$_POST['content'][1] = DNI del administrador
            */
           //VERIFICO SI EXISTE Y SI NO FUE TOMADO
              $lookup = $server->(query('SELECT count(DNI_Usuario) FROM '.$tables['orders'].' WHERE
                ID_Pedido = '.$server->quote($_POST['content'][0]).' AND
                FH_Tomado != NULL'));
              if($lookup){
                if ($lookup->fetch()[0]==0) {
                   //Pongo el momento en el que fue tomado y por quien
                   $server->(query('UPDATE '.$tables['orders'].' SET
                   FH_Tomado = SYSDATE(), DNI_Administrador = '.$_POST['content'][1]));
                }else{
                  print ERROR;
                }
              }

             
              break;
          case 'readyOrder':
                /*
                  El pedido ya esta listo
                 */
              //VERIFICO SI EXISTE Y SI NO FUE TOMADO
              $lookup = $server->(query('SELECT * FROM '.$tables['orders'].' WHERE
                ID_Pedido = '.$server->quote($_POST['content'][0]).' AND
                FH_Tomado != NULL'));

              if($lookup){
                if ($lookup->fetch()[0]==0) {
                   //Pongo el momento en el que fue tomado y por quien
                   $server->(query('UPDATE '.$tables['orders'].' SET
                   FH_Listo = SYSDATE()'));
                }else{
                  print ERROR;
                }
              }
            break;
          case 'viewOrder':
              $lookup = $server->(query('SELECT * FROM '.$tables['orders'].' WHERE
                ID_Pedido = '.$server->quote($_POST['content'][0]).''));
            break;
            case 'viewUser':
              $lookup = $server->(query('SELECT * FROM '.$tables['users'].' WHERE
                DNI = '.$server->quote($_POST['content'][0]).''));
            break;
            case 'viewReports':
              $lookup = $server->(query('SELECT * FROM '.$tables['reports'].' WHERE
                DNI = '.$server->quote($_POST['content'][0]).''));
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
            define('RANDOM_LENGTH', 64);

            // Generate a token.
            $token = bin2hex(random_bytes(64));

            // Try to update a matching entry.
            $updated_count = $server->query('UPDATE           ' . $tables['users'] . '
                                             SET token      = ' . $token . '
                                             WHERE (
                                               E-mail         = ' . $email . '
                                                OR
                                               username     = ' . $email . '
                                                OR
                                               DNI          = ' . $email . '
                                                   )
                                             AND   password = ' . $password);

            // If any entry is updated...
            if ($updated_count > 1) {
              /*
              // The database was inconsistent.
              //
              // TODO: The frontend should print an error telling
              //       the client that a fatal error broke the
              //       login process.
              */
              print ERROR; 
            } elseif ($updated_count == 1) {
              // Success logging in.

              // Reflect the token to the session.
              session_start();
              $_SESSION['token'] = $token;
              
              print PASS;
            } else {
              print BAD_CREDENTIALS;
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
                  "'.$_POST['content'][0].'", '/* Motivo*/'
                  '.$_POST['content'][1].', '/* DNI_U*/'   
                  '.$_POST['content'][2].', '/* DNI_A*/'
                  NULL,   '/* Fecha_Hora*/'             
                )');
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
        default:
          print ERROR;
      }
    }
  } else {
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
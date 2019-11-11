<?php
  // DO NOT MERGE

  require_once('config.php');

  $i = 0;
  foreach($server->query('SELECT DNI, APELLIDO, CURSO, DIVISION FROM ALUMNOS') as $alumno) {
		$mail = 'genericaddress' . $i . '@ga.com';
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

	    $dni      = $alumno['DNI'];
	    $email    = $mail;
	    $password = '12345678';
	    $name     = $alumno['APELLIDO'];
	    $course   = $alumno['CURSO'];
	    $division = $alumno['DIVISION'];

	        $lookup = $server->query('SELECT COUNT(DNI)
	                                  FROM ' . $tables['users'] . '
	                                  WHERE DNI      = ' . $server->quote($dni) . '
	                                  OR    `E-Mail` = ' . $server->quote($email));

	        if ($lookup) {
	          if ($lookup->fetch()[0] < 1) {
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
	          }
	      }

          print 'OK';
          $i++;
  }
?>

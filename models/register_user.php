<?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;

    $user_array = $_GET['variableName'];
    $user = explode(",",$user_array);

    $user_username = $user[0];
    $user_fullname = $user[1];
    $user_role = $user[2];
    $user_password = $user[3];

    $conn = new mysqli($servername, $user_server, $password_server, $dbname);

    if($conn -> connect_error)
    {
        die("Connection failed: ". $conn -> connect_error);
    }
    else
    {
        $password_hash = password_hash($user_password, PASSWORD_DEFAULT);
            $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('$user_username','$user_fullname','$user_role','$password_hash')";


        if($conn->query($sql)===TRUE)
        {
            echo true;
        }
        else
        {
            echo false;
        }
    }
    
    $conn->close();
?>
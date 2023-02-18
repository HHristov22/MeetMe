<?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;

    $array = $_GET['variableName'];
    $user_att = explode(",",$array);
    $checkThisUsername = $user_att[0];
    $checkThisPassword = $user_att[1];

    $conn = new mysqli($servername, $user_server, $password_server, $dbname);

    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
        $table_name = "users";

        $sql = "SELECT * FROM $table_name WHERE username = '$checkThisUsername'";
        $result = mysqli_query($conn, $sql);
        /*echo "Username ".$checkThisUsername;
        echo " <br> Password ".$checkThisPassword;*/
        // Check if there are any rows returned
        if (mysqli_num_rows($result) > 0)
        {
            // Fetch the rows
            while ($row = mysqli_fetch_assoc($result))
            {
                //if(password_hash($checkThisPassword, PASSWORD_DEFAULT) == $row["password"])
                if(password_verify($checkThisPassword,$row["password"]))
                {
                    //signin($row["fullname"]);
                    echo $row["role"].$row["fullname"];
                }
            }
        }
    }
?>
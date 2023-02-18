<?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;

    //$username_in = $_GET['checkusername_check'];
    //$username_in = "82013";

    $conn = new mysqli($servername, $user_server, $password_server, $dbname);

    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
        $table_name = "users";
        $user_exist = 0;

        //echo $username_in;
        // Get all data from the table
        $sql = "SELECT * FROM $table_name";
        $result = mysqli_query($conn, $sql);
        //echo "<br>Result:<br>";

        $total_rows = mysqli_num_rows($result);
        $row_index = 1;
        // Check if there are any rows returned
        if (mysqli_num_rows($result) > 0)
        {
            // Fetch the rows
            while ($row = mysqli_fetch_assoc($result))
            {
                /*if($row["username"] == $username_in)
                {
                    $user_exist = 1;
                    //break;
                    echo "username: " . $row["username"] . "<br>"."Full name: " . $row["fullname"] . "<br>"."role: " . $row["role"] . "<br>"."password: " . $row["password"] . "<br>";
                }*/
                $username_from_db = $row["username"];
                echo $username_from_db;
                if ($row_index!=$total_rows)
                echo ",";
                $row_index++;
            }
        }
        else
        {
            echo "No records found";
        }
        //echo "@ ".$user_exist." @";

        // echo "Username Available!!!!!!";
        // else
        // echo "exists........";
    }
?>
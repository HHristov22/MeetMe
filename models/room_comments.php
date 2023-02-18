 <?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;
    
    $conn = new mysqli($servername, $user_server, $password_server, $dbname);

    $room_name = $_POST['someVariable'];

    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
        $table_name = "rooms";
        $sql = "SELECT `name`,`comment` FROM `comments` WHERE `room` = '$room_name'";
        $result = mysqli_query($conn, $sql);

        $total_rows = mysqli_num_rows($result);
        $row_index = 1;
        if (mysqli_num_rows($result) > 0)
        {
            // Fetch the rows
            while ($row = mysqli_fetch_assoc($result))
            {
                $name_user = $row["name"];
                $comment = $row["comment"];
                
                echo $name_user;
                echo "||";
                echo $comment;
                if ($row_index!=$total_rows)
                echo "//";
                $row_index++;
            }
        }
    }
    $conn->close();
?>
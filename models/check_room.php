 <?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;
    
    $conn = new mysqli($servername, $user_server, $password_server, $dbname);

    /*$array = $_GET['variableName'];
    $list = explode(",",$array);

    $roomname = array_shift($list);
    $holder = array_shift($list);
    $members = $list;*/

    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
        $table_name = "rooms";
        $sql = "SELECT * FROM $table_name";
        $result = mysqli_query($conn, $sql);

        $total_rows = mysqli_num_rows($result);
        $row_index = 1;
        if (mysqli_num_rows($result) > 0)
        {
            // Fetch the rows
            while ($row = mysqli_fetch_assoc($result))
            {
                $room_from_db = $row["roomname"];
                echo $room_from_db;
                if ($row_index!=$total_rows)
                echo ",";
                $row_index++;
            }
        }
    }
    $conn->close();
?>
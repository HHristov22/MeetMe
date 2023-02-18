 <?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;
    
    $conn = new mysqli($servername, $user_server, $password_server, $dbname);

    $fn_student = $_GET['variableName'];

    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
        $table_name = "rooms";
        $sql = "SELECT * FROM `rooms` ORDER BY `data`";
        $result = mysqli_query($conn, $sql);

        $total_rows = 0;
        $row_index = 1;
        if (mysqli_num_rows($result) > 0)
        {
            while ($row = mysqli_fetch_assoc($result))
            {
                $str_memberes = $row["members"];
                if(strpos($str_memberes,$fn_student)!==false)
                {
                    $total_rows++;
                }
            }
            //echo "Find:".$total_rows;
            $result = mysqli_query($conn, $sql);
            // Fetch the rows
            while ($row = mysqli_fetch_assoc($result))
            {
                $str_memberes = $row["members"];
                if(strpos($str_memberes,$fn_student)!==false)
                {
                    $roomname = $row["roomname"];
                    $holder = $row["holder"];
                    $link = $row["link"];
                    $data = $row["data"];
                    $duration = $row["duration"];
                    $mebmers = $row["members"];
                    echo $roomname;
                    echo ",";
                    echo $link;
                    echo ",";
                    echo $data;
                    echo ",";
                    echo $duration;
                    echo ",";
                    echo $holder;
                    echo ",";
                    echo $mebmers;
                    if ($row_index!=$total_rows)
                    echo "|";
                    $row_index++;
                }
            }
        }
    }
    $conn->close();
?>
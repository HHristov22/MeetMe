 <?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;
    
    $conn = new mysqli($servername, $user_server, $password_server, $dbname);

    $room_name = $_GET['variableName'];

    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
        $table_name = "rooms";
        
        $sql = "DELETE FROM `comments` WHERE `room` = '$room_name';";
        $conn->query($sql);
        //$result = mysqli_query($conn, $sql);
        return true;
    }
    $conn->close();
?>
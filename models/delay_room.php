 <?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;
    
    $conn = new mysqli($servername, $user_server, $password_server, $dbname);

    $list = $_GET['variableName'];
    $data = explode("|",$list);

    $room = $data[0];
    $delay = $data[1];
    $global_delay = $data[2];
    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
        $sql = "DELETE FROM `delay` WHERE `roomname` = '$room'";
        $conn->query($sql);
        $sql = "INSERT INTO `delay` (`roomname`, `delay`, `global_delay`) VALUES ('$room', '$delay' , '$global_delay')";

        if($conn->query($sql)==TRUE)
        {
            echo true;
        }
    }
    $conn->close();
?>
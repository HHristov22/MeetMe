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
    $holder = $data[1];
    $comment = $data[2];
    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
        $sql = "INSERT INTO `comments` (`room`, `name`, `comment`) VALUES ('$room', '$holder', '$comment')";

        if($conn->query($sql)===TRUE)
        {
            echo true;
        }
    }
    $conn->close();
?>
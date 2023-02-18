 <?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;
    
    $conn = new mysqli($servername, $user_server, $password_server, $dbname);

    $roomname = $_GET['variableName'];

    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
        $sql = "SELECT * FROM `delay` WHERE `roomname` = '$roomname'";

        $result = mysqli_query($conn, $sql);
            // Fetch the rows
        while ($row = mysqli_fetch_assoc($result))
        {
            echo $row["delay"];
        }
    }
    $conn->close();
?>
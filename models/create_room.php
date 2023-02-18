 <?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;
    
    $conn = new mysqli($servername, $user_server, $password_server, $dbname);

    $array = $_GET['variableName'];
    //echo $array."\n";
    $list = explode(",",$array);
    // $list = "abcde";

    $holder = $list[0];
    $roomname = $list[1];
    $data = $list[2];
    $duration_str = $list[3];
    $duration = intval($duration_str);
    // $members = $array;
    //echo "holder:".$holder."|\n";
    //echo "room:".$roomname."|\n";
    array_shift($list);    
    array_shift($list);    
    array_shift($list); 
    array_shift($list);
    //echo $a;
    $members = implode(",", $list);
    //echo $members;
    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
        $link = generate_link();
        echo $link;
        $sql = "INSERT INTO `rooms` ( `roomname`, `link`, `holder`, `data`, `duration`, `members`) VALUES ('$roomname','$link','$holder','$data','$duration','$members')";
        $conn->query($sql);
        $sql = "DELETE FROM `delay` WHERE `roomname` = '$roomname'";
        $conn->query($sql);
        $global_delay=0;
        $delay=0;
        $sql = "INSERT INTO `delay` (`roomname`, `delay`, `global_delay`) VALUES ('$roomname', '$delay' , '$global_delay')";
        if($conn->query($sql)===TRUE)
        {
            echo true;
        }
        else
        {   
            return 0;         
        }
    }
    

    function generate_link()
    {
        $servername = 'localhost';
        $user_server = 'root';
        $password_server = '';
        $dbname = 'db_meetme';
        
        $conn = new mysqli($servername, $user_server, $password_server, $dbname);

        $baseUrl = "https://meet.jit.si/";
        $roomName = substr(md5(microtime()), 0, 8);
        $link_meet = $baseUrl . $roomName;
        $sql2 = "SELECT `link` FROM `rooms` WHERE `link` = '$link_meet'";
        $result = mysqli_query($conn, $sql2);
        $total_rows = mysqli_num_rows($result);
        if($total_rows != 0)
            generate_link();
        return $link_meet;
    }

    $conn->close();
?>
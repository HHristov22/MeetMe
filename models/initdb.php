<!-- 
    Initializes the database.
 -->
 <?php
    include 'DB.php';

    $servername = $_SERVERNAME;
    $user_server = $_USER_SERVER;
    $password_server = $_PASSWORD_SERVER;
    $dbname = $_DBNAME;
    
    $conn = new mysqli($servername, $user_server, $password_server, $dbname);

    if($conn -> connect_error)
    {
        die("connection failed: ". $conn -> connect_error);
    }
    else
    {
        $sql = "DELETE FROM `users`";
        $conn->query($sql);

        // students
        $password_hash = password_hash('PassWord', PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('82013','Hristo Kostov Hristov', 'student','$password_hash')";
        $conn->query($sql);

        $password_hash = password_hash('82092', PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('82092','Boicho Zlatanov Zlatanov', 'student','$password_hash')";
        $conn->query($sql);

        $password_hash = password_hash('11111', PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('11111','Dimitar Ivanov Petrov', 'student','$password_hash')";
        $conn->query($sql);

        $password_hash = password_hash('22222', PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('22222','Ivan Georgiev Mitev', 'student','$password_hash')";
        $conn->query($sql);

        $password_hash = password_hash('33333', PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('33333','Mariq Dimitrova Dimitrova', 'student','$password_hash')";
        $conn->query($sql);

        $password_hash = password_hash('44444', PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('44444','Ralitsa Yrieva Ivanova', 'student','$password_hash')";
        $conn->query($sql);

        $password_hash = password_hash('55555', PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('55555','Vali Hrsitova Ivanova', 'student','$password_hash')";
        $conn->query($sql);

        $password_hash = password_hash('66666', PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('66666','Ralitsa Toneva Hristova', 'student','$password_hash')";
        $conn->query($sql);

        // teachers
        $password_hash = password_hash('WEBiscool', PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('00000','Milen Jordanov Petrov', 'teacher','$password_hash')";
        $conn->query($sql);

        $password_hash = password_hash('Algebra', PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('00001','Evgeniq Dimitrova Velikova', 'teacher','$password_hash')";
        $conn->query($sql);

        $password_hash = password_hash('Math', PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` ( `username`, `fullname`, `role`, `password`) VALUES ('00002','Ivalina Hristova Ivanova', 'teacher','$password_hash')";

        $conn->query($sql);
        
        $sql = "DELETE FROM `rooms`";
        $conn->query($sql);

        $sql = "INSERT INTO `rooms` ( `roomname`, `link`, `holder`, `data`, `duration`, `members`) VALUES ('room D', 'https://meet.jit.si/Bw8Oi1I9','Milen Jordanov Petrov', '2023-02-07T12:00','15', '82013,82092')";
        $conn->query($sql);
        
        $sql = "INSERT INTO `rooms` ( `roomname`, `link`, `holder`, `data`, `duration`, `members`) VALUES ('room C', 'https://meet.jit.si/VTH52PYe','Milen Jordanov Petrov', '2023-02-07T12:15','15', '82013,66666,82092')";
        $conn->query($sql);
        
        $sql = "INSERT INTO `rooms` ( `roomname`, `link`, `holder`, `data`, `duration`, `members`) VALUES ('room B', 'https://meet.jit.si/Ft53jmld','Milen Jordanov Petrov', '2023-02-07T12:30','15', '82013,66666,11111,22222,55555')";
        $conn->query($sql);
        
        $sql = "INSERT INTO `rooms` ( `roomname`, `link`, `holder`, `data`, `duration`, `members`) VALUES ('Room Duplicate!', 'https://meet.jit.si/w2OiIkGP','Milen Jordanov Petrov', '2023-02-07T12:30','30', '82013')";
        $conn->query($sql);
        
        $sql = "INSERT INTO `rooms` ( `roomname`, `link`, `holder`, `data`, `duration`, `members`) VALUES ('room A', 'https://meet.jit.si/SWzS7zTe','Milen Jordanov Petrov', '2023-02-07T12:45','30', '82013,66666,44444,33333')";
        $conn->query($sql);
        
        $sql = "INSERT INTO `rooms` ( `roomname`, `link`, `holder`, `data`, `duration`, `members`) VALUES ('room posledniq', 'https://meet.jit.si/TEFvDUhz','Milen Jordanov Petrov', '2023-02-07T13:00','30', '44444,33333')";
        $conn->query($sql);
        
        $sql = "INSERT INTO `rooms` ( `roomname`, `link`, `holder`, `data`, `duration`, `members`) VALUES ('Algebra popravka', 'https://meet.jit.si/IfR6UjNY','Evgeniq Dimitrova Velikova', '2023-02-02T10:30','30', '82092')";
        $conn->query($sql);
        
        $sql = "INSERT INTO `rooms` ( `roomname`, `link`, `holder`, `data`, `duration`, `members`) VALUES ('Algebra popravka2', 'https://meet.jit.si/v8AKBEiG','Evgeniq Dimitrova Velikova', '2023-02-03T08:00','30', '11111,22222')";
        $conn->query($sql);
        
        $sql = "INSERT INTO `rooms` ( `roomname`, `link`, `holder`, `data`, `duration`, `members`) VALUES ('Start in Bosch', 'https://meet.jit.si/lfPoGX2e','Ivalina Hristova Ivanova', '2023-02-13T08:30','30', '82013')";
        $conn->query($sql);

        $sql = "DELETE FROM `comments`";
        $conn->query($sql);

        $sql = "INSERT INTO `comments` ( `id`, `room`, `name`, `comment`) VALUES ('1', 'Room B', 'Milen Jordanov Petrov', 'You are a lot of people in this room?!')";
        $conn->query($sql);

        $sql = "INSERT INTO `comments` ( `id`, `room`, `name`, `comment`) VALUES ('2', 'Room B', 'Hristo Kostov Hristov', 'A lot of people are doing this project.')";
        $conn->query($sql);

        $sql = "INSERT INTO `comments` ( `id`, `room`, `name`, `comment`) VALUES ('3', 'Room B', 'Milen Jordanov Petrov', 'I see, I see.')";
        $conn->query($sql); 

        $sql = "INSERT INTO `comments` ( `id`, `room`, `name`, `comment`) VALUES ('4', 'Room Duplicate!', 'Hristo Kostov Hristov', 'Yes I know the start time of this room is the same as the one before.')";
        $conn->query($sql);

        $sql = "INSERT INTO `comments` ( `id`, `room`, `name`, `comment`) VALUES ('5', 'Start in Bosch', 'Ivalina Hristova Ivanova', 'Good LUCK!')";
        $conn->query($sql);
                
        $sql = "INSERT INTO `comments` ( `id`, `room`, `name`, `comment`) VALUES ('6', 'Room C', 'Hristo Kostov Hristov', 'One comment for room C.')";
        $conn->query($sql);

        $sql = "DELETE FROM `delay`";
        $conn->query($sql);
                
        $sql = "INSERT INTO `delay` ( `roomname`, `delay`, `global_delay`) VALUES ('room D','','')";
        $conn->query($sql);
                
        $sql = "INSERT INTO `delay` ( `roomname`, `delay`, `global_delay`) VALUES ('room A','','30')";
        $conn->query($sql);
                
        $sql = "INSERT INTO `delay` ( `roomname`, `delay`, `global_delay`) VALUES ('room B','','')";
        $conn->query($sql);
                
        $sql = "INSERT INTO `delay` ( `roomname`, `delay`, `global_delay`) VALUES ('room C','','')";
        $conn->query($sql);
                
        $sql = "INSERT INTO `delay` ( `roomname`, `delay`, `global_delay`) VALUES ('Room Duplicate!','','15')";
        $conn->query($sql);
                
        $sql = "INSERT INTO `delay` ( `roomname`, `delay`, `global_delay`) VALUES ('room posledniq','','45')";
        $conn->query($sql);
                
        $sql = "INSERT INTO `delay` ( `roomname`, `delay`, `global_delay`) VALUES ('Algebra popravka','','')";
        $conn->query($sql);
                
        $sql = "INSERT INTO `delay` ( `roomname`, `delay`, `global_delay`) VALUES ('Algebra popravka2','','')";
        $conn->query($sql);
                
        $sql = "INSERT INTO `delay` ( `roomname`, `delay`, `global_delay`) VALUES ('Start in Bosch','','')";
        if($conn->query($sql)===TRUE)
        {
            echo "Initial data has been uploaded successfully!<br>";      
            echo "Now open:  ../home.html";
        }
        else
        {
            echo "Something went wrong!<br>Database is empty!<br>";
        }
    }
    
    $conn->close();
?>
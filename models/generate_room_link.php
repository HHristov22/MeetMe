<?php

$baseUrl = "https://meet.jit.si/";

// Generate a random room name
$roomName = substr(md5(microtime()), 0, 8);

$joinUrl = $baseUrl . $roomName;

// Output the link
echo $joinUrl;

?>
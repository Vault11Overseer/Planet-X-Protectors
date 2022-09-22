<html>
    <head></head>
    <body><h1>hellur</h1></body>
</html>

<?php
    $servername = "localhost";
    $database = "rfid";
    $username = "root";
    $password = "";
    $con=mysqli_connect($servername, $username, $password, $database);
    $displayData = mysqli_query($con,"SELECT * FROM rfiddata");


    if (mysqli_connect_errno()){echo "Failed to connect to MySQL: " . mysqli_connect_error();} 


    echo "<table border='1'>
    <tr>
    <th> ID: </th>
    <th>Member ID: </th>
    <th>Access Allowed: </th>
    <th>Timestamp: </th>
    </tr>";

    while($row = mysqli_fetch_array($displayData))
    {
    echo "<tr>";
    echo "<td>" . $row['ID'] . "</td>";
    echo "<td>" . $row['Member_ID'] . "</td>";
    echo "<td>" . $row['allowed_members'] . "</td>";
    echo "<td>" . $row['date'] . "</td>";

    echo "</tr>";
    }
    echo "</table>";





    mysqli_close($con);
?>

<?php
$targetDir = "files/"; // Directory where files will be stored
$targetFile = $targetDir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

// Check if the file is a valid type (optional)
$allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'mp3', 'mp4', 'pdf', 'txt', 'pdf', 'ppt', 'docx', 'ctc', 'zo'];
if (!in_array($fileType, $allowedTypes)) {
    echo "Sorry, only JPG, JPEG, PNG, GIF, MP3, MP4, PDF, and TXT files are allowed.";
    $uploadOk = 0;
}

// Check file size (optional)
if ($_FILES["fileToUpload"]["size"] > 50000000) { // 5MB limit
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
} else {
    // Try to move the uploaded file to the target directory
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {
        echo "The file " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>


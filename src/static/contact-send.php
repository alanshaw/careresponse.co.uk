<?php
  if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header('Location: contact.html');
    exit;
  }
  
  if (empty($_POST['forename']) || empty($_POST['surname']) || empty($_POST['tel']) || empty($_POST['email']) || empty($_POST['msg'])) {
    header('Location: contact.html#error');
    exit;
  }
  
  $to = 'alan@freestyle-developemnts.co.uk';
  $from = 'website@careresponse.co.uk';
  $subject = 'careresponse.co.uk contact form submission';
  $body = "First name: ${_POST['forename']}\n";
  $body = "Surname: ${_POST['surname']}\n";
  $body = "Phone: ${_POST['tel']}\n";
  $body = "Email: ${_POST['email']}\n";
  $body = "Message: ${_POST['msg']}\n";
  
  $headers = "From: careresponse.co.uk <$from>\r\n";
  
  if (mail($to, $subject, $body, $headers)) {
    header('Location: contact.html#sent');
  } else {
    header('Location: contact.html#error');
  }
<?php

    // Turn off error reporting
    error_reporting(0);
    error_reporting(E_ERROR | E_WARNING | E_PARSE);
    error_reporting(E_ALL);
    ini_set("error_reporting", E_ALL);
    error_reporting(E_ALL & ~E_NOTICE);

    // GET data
    $sourceCode = $_GET["sourceCode"];
    str_replace("%0A", "\n", $sourceCode);
    str_replace("++++", "\t", $sourceCode);
    $langId = $_GET["langId"];
    $stdin = $_GET["stdin"];
    str_replace("%0A", "\n", $stdin);
    str_replace("++++", "\t", $stdin);

    // cURL init
    $curl = curl_init();

    // Get submission ID
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => 'http://cloudcompiler.esy.es/api/submissions/',
        CURLOPT_POST => 1,
        CURLOPT_POSTFIELDS => array(
            sourceCode => $sourceCode,
            langId => $langId,
            stdin => $stdin,
            timeLimit => 1
        )
    ));
    $resp = curl_exec($curl);
    $resp_array = json_decode($resp, true);
    $id = $resp_array['id'];

    // Get submission result
    sleep(4);
    $url = 'http://cloudcompiler.esy.es/api/submissions/' . $id;
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $url
    ));
    $resp = curl_exec($curl);
    $resp_array = json_decode($resp, true);
    print_r($resp);

    // cURL close
    curl_close($curl);

?>

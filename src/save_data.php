<?php
// Minimal example that receives JSON data from the client, 
// extracts "csv_data", and saves it to a file on the server.

// 1) Read raw POST body and decode JSON
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// 2) Extract needed fields
$participant_id   = isset($data['participant_id'])   ? $data['participant_id']   : 'unknown_participant';
$start_time       = isset($data['start_time'])       ? $data['start_time']       : '';
$completion_time  = isset($data['completion_time'])  ? $data['completion_time']  : '';
$csv_data         = isset($data['csv_data'])         ? $data['csv_data']         : '';

// 3) Prepare a filename
//    E.g. "data_XXXX_YYYY-MM-DD_HH-mm-ss.csv"
$date_str = date("Y-m-d_H-i-s");
$filename = "data_{$participant_id}_{$date_str}.csv";

// 4) Choose a directory where files will be saved 
//    (Make sure your server user has write permissions here)
$save_dir = __DIR__ . "/../data";
if(!is_dir($save_dir)){
   mkdir($save_dir, 0775, true);  // create "data" folder if needed
}
$file_path = $save_dir . "/" . $filename;

// 5) Write the CSV data to the file
file_put_contents($file_path, $csv_data);

// 6) Return a JSON response to the client
header('Content-Type: application/json');
echo json_encode([
    "status" => "ok",
    "filename" => $filename,
    "message" => "Data saved successfully."
]);
?>

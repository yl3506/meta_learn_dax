// // Function to save data locally (for testing)
// function saveDataLocally() {
//     const csv = jsPsych.data.get().csv();
//     const blob = new Blob([csv], {type: 'text/csv'});
//     const filename = `data_${EXPERIMENT_PARAMS.participant_id}.csv`;
//     if (window.navigator.msSaveOrOpenBlob) {
//         window.navigator.msSaveBlob(blob, filename);
//     } else {
//         const a = document.createElement('a');
//         const url = URL.createObjectURL(blob);
//         a.href = url;
//         a.download = filename;
//         document.body.appendChild(a);
//         a.click();
//         setTimeout(function() {
//             document.body.removeChild(a);
//             window.URL.revokeObjectURL(url);
//         }, 0);
//     }
// }


// function saveDataToServer() {
//    const participantId = EXPERIMENT_PARAMS.participant_id;
//    const startTime = EXPERIMENT_PARAMS.start_time.toISOString();
//    const completionTime = new Date().toISOString();

//    // Get the data as CSV
//    const csvData = jsPsych.data.get().csv();

//    // Prepare data object to send to server
//    const dataToSave = {
//        participant_id: participantId,
//        start_time: startTime,
//        completion_time: completionTime,
//        csv_data: csvData
//    };

//    // Send data to server
//    fetch('server/save_data.php', {
//        method: 'POST',
//        headers: {'Content-Type': 'application/json'},
//        body: JSON.stringify(dataToSave)
//    })
//    .then(response => response.text())
//    .then(result => {
//        console.log('Data saved to server:', result);
//    })
//    .catch(error => {
//        console.error('Error saving data to server:', error);
//    });
// }

// // Function to process trial data
// function processTrialData(trialData) {
//     const data = [];

//     // Iterate over trialData and extract necessary information
//     for (const trial of trialData) {
//         const trialInfo = {};

//         // Collect common data
//         trialInfo.trial_index = trial.trial_index;
//         trialInfo.trial_type = trial.trial_type;
//         trialInfo.time_elapsed = trial.time_elapsed;
//         trialInfo.rt = trial.rt;

//         // Practice attempts and max attempts
//         if (trial.practiceAttempts !== undefined) {
//             trialInfo.practice_attempts = trial.practiceAttempts;
//             trialInfo.exceeded_max_attempts = trial.practiceAttempts >= 2;
//         }

//         // Input and output data
//         trialInfo.input = trial.input || '';
//         trialInfo.participant_response = trial.participant_response || [];
//         trialInfo.correct_output = trial.correct_output || [];
//         trialInfo.correct = trial.correct || false;
//         trialInfo.catch_trial = trial.catch_trial || false;

//         // Additional data (e.g., function names, arguments)
//         if (trial.function_name) {
//             trialInfo.function_name = trial.function_name;
//         }
//         if (trial.args) {
//             trialInfo.args = trial.args;
//         }
//         if (trial.funcs) {
//             trialInfo.funcs = trial.funcs;
//         }
//         if (trial.pattern) {
//             trialInfo.pattern = trial.pattern;
//         }

//         // Push trialInfo to data array
//         data.push(trialInfo);
//     }

//     return data;
// }


/*****************************************************
 * data.js
 *    - processTrialData() collects the relevant fields
 *    - saveDataLocally() uses processTrialData() to produce CSV
 *    - saveDataToServer() does the same and sends it to the server
*****************************************************/

/** 
 * convertRowsToCsv(rows)
 *   - Takes an array of row objects
 *   - Returns a CSV-formatted string
 */
function convertRowsToCsv(rows) {
  if (!rows.length) {
    return '';
  }
  // Gather all columns by taking keys from the first row
  const headers = Object.keys(rows[0]);
  let csv = headers.join(',') + '\n';

  for (const row of rows) {
    const line = headers.map((header) => {
      let val = row[header] === undefined || row[header] === null ? '' : row[header];
      // If it's an array, join by semicolon
      if (Array.isArray(val)) {
        val = val.join(';');
      }
      // Escape double quotes
      if (typeof val === 'string') {
        val = `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    }).join(',');
    csv += line + '\n';
  }
  return csv;
}


/** 
 * processTrialData()
 *   - Reads the entire jsPsych data store
 *   - Extracts relevant fields from each trial
 *   - Returns the final CSV string
 */
function processTrialData() {
  const raw = jsPsych.data.get().values(); // all trials
  const processed = [];

  for (const trial of raw) {
    // Build a row object
    const row = {};

    // Basic jsPsych fields
    row.trial_index   = trial.trial_index ?? '';
    row.trial_type    = trial.trial_type  ?? '';
    row.rt            = trial.rt          ?? '';
    row.time_elapsed  = trial.time_elapsed ?? '';

    // Episode / page / type
    row.episode   = trial.episode   ?? '';
    row.page      = trial.page      ?? '';
    // e.g. row.example_type = trial.example_type ?? ''; 
    // or we just rely on trial_type = 'practice' / 'demo' / 'test'

    // For e3 scoreboard
    row.e3_correctCount     = (trial.e3_correctCount     !== undefined) ? trial.e3_correctCount : '';
    row.e3_totalTestTrials  = (trial.e3_totalTestTrials  !== undefined) ? trial.e3_totalTestTrials : '';
    row.e3_scorePercent     = (trial.e3_scorePercent     !== undefined) ? trial.e3_scorePercent : '';

    // Practice attempts info
    row.attempts      = trial.attempts      ?? '';
    row.isCorrect     = trial.isCorrect     ?? '';
    row.skipExample   = trial.skipExample   ?? '';
    
    // Input / output data
    // "inputSymbols" (array of numeric IDs)
    row.inputSymbols  = Array.isArray(trial.inputSymbols) 
                         ? trial.inputSymbols.join(';') 
                         : (trial.inputSymbols ?? '');
    // "inputWords" (array of nonsense words)
    row.inputWords    = Array.isArray(trial.inputWords)
                         ? trial.inputWords.join(';')
                         : (trial.inputWords ?? '');
    // "solutionEmojis" (array of filenames)
    row.solutionEmojis  = Array.isArray(trial.solutionEmojis)
                         ? trial.solutionEmojis.join(';')
                         : (trial.solutionEmojis ?? '');
    // "participant_response" (whatever the user produced)
    row.participant_response = Array.isArray(trial.participant_response)
                         ? trial.participant_response.join(';')
                         : (trial.participant_response ?? '');

    // Survey or final scoreboard fields
    // If the user stored "strategy", "comment", "gender", etc. in trial data or via addProperties
    row.strategy       = trial.strategy       ?? '';
    row.comment        = trial.comment        ?? '';
    row.prolific_id    = trial.prolific_id    ?? '';
    row.gender         = trial.gender         ?? '';
    row.age            = trial.age            ?? '';

    // If the survey plugin sets trial.response, we can parse that too:
    if (trial.response) {
      // e.g. if trial.response has "strategy" or "comment" or "gender" 
      // we can override row.strategy = trial.response.strategy || row.strategy
      if (trial.response.strategy) {
        row.strategy = trial.response.strategy;
      }
      if (trial.response.comment) {
        row.comment = trial.response.comment;
      }
      if (trial.response.prolific_id) {
        row.prolific_id = trial.response.prolific_id;
      }
      if (trial.response.gender) {
        row.gender = trial.response.gender;
      }
      if (trial.response.age) {
        row.age = trial.response.age;
      }
    }

    // Add row to processed array
    processed.push(row);
  }

  // Convert processed => CSV
  const csvString = convertRowsToCsv(processed);
  return csvString;
}


/** 
 * saveDataLocally()
 *   - Calls processTrialData() 
 *   - Creates a CSV file for user to download 
 */
function saveDataLocally() {
    const csv = processTrialData();
    const blob = new Blob([csv], {type: 'text/csv'});
    const filename = `data_${EXPERIMENT_PARAMS.participant_id}.csv`;
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}


/**
 * saveDataToServer()
 *   - Calls processTrialData() 
 *   - Sends JSON with CSV to your server
 */
function saveDataToServer() {
   const participantId = EXPERIMENT_PARAMS.participant_id;
   const startTime = EXPERIMENT_PARAMS.start_time.toISOString();
   const completionTime = new Date().toISOString();

   // Get the CSV from our custom processTrialData
   const csvData = processTrialData();

   // Build object
   const dataToSave = {
       participant_id: participantId,
       start_time: startTime,
       completion_time: completionTime,
       csv_data: csvData
   };

   // Post to your server
   fetch('src/save_data.php', {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(dataToSave)
   })
   .then(response => response.text())
   .then(result => {
       console.log('Data saved to server:', result);
   })
   .catch(error => {
       console.error('Error saving data to server:', error);
   });
}

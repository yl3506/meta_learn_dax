
function surveyProcedure() {
    const survey_trials = [];

    // Strategy and comment question
   survey_trials.push({
       type: jsPsychSurveyText,
       questions: [
           {
               prompt: 'Please briefly describe the strategies you used during the study.',
               name: 'strategy',
               rows: 5,
               columns: 80,
               required: true,
           },
           {
               prompt: 'Do you have any comments (e.g. technical issues, confusions, etc.)?',
               name: 'comment',
               rows: 5,
               columns: 80,
               required: false,
           }
       ],
       on_finish: function(data){
        jsPsych.data.addProperties({
          strategy: data.response.strategy || '',
          comment: data.response.comment || ''
        });
      },
   });


    // Prolific ID
    survey_trials.push({
        type: jsPsychSurveyText,
        questions: [
            {
                prompt: 'What is your participant ID?', 
                name: 'prolific_id', 
                required: true
            }
        ],
        on_finish: function(data) {
            const prolificId = data.response.prolific_id;
            if (prolificId && prolificId.trim() !== '') {
                EXPERIMENT_PARAMS.participant_id = prolificId.trim();
            }
            // Temporarily save data
            let correct = EXPERIMENT_PARAMS.testCorrectCount || 0;
            let total   = EXPERIMENT_PARAMS.testTotalTrials || 0;
            let pct     = (total>0)? Math.round((correct/total)*100):0;
            jsPsych.data.addProperties({
                e3_correctCount: correct,
                e3_totalTestTrials: total,
                e3_scorePercent: pct
            });
            saveDataToServer();
            console.log(`saving data temporarily... e3_correctCount=${correct}, e3_totalTestTrials=${total}, e3_scorePercent=${pct}`);
            // Increment progress bar
            EXPERIMENT_PARAMS.currentSectionIndex ++;
            console.log(`progress bar ${EXPERIMENT_PARAMS.currentSectionIndex} / ${EXPERIMENT_PARAMS.totalSections}`);
            const fraction = EXPERIMENT_PARAMS.currentSectionIndex / EXPERIMENT_PARAMS.totalSections;
            jsPsych.progressBar.progress = fraction;
        }
    });

    // Demographic questions
    survey_trials.push({
        type: jsPsychSurveyText,
        questions: [
            {
                prompt: '(Optional) What is your gender?',
                name: 'gender',
                required: false
            },
            {
                prompt: '(Optional) What is your age?',
                name: 'age',
                required: false
            }
        ],
        on_finish: function(data){
            jsPsych.data.addProperties({
              gender: data.response.gender || '',
              age: data.response.age || ''
            });
          },
    });

    // Completion message
    survey_trials.push({
        type: jsPsychHtmlButtonResponse,
        stimulus: function() {

            // Show final test accuracy score
            let correct = EXPERIMENT_PARAMS.testCorrectCount || 0;
            let total   = EXPERIMENT_PARAMS.testTotalTrials || 0;
            let pct     = (total>0)? Math.round((correct/total)*100):0;
            // Store data
            jsPsych.data.addProperties({
                e3_correctCount: correct,
                e3_totalTestTrials: total,
                e3_scorePercent: pct
            });
            return `
                    <p>Thank you for participating!</p>
                    <p>In Episode 3, you answered ${correct} out of ${total} test trials correctly (<b>${pct}%</b>).</p>
                    <p>Click the <b>"Finish Study"</b> button to redirect to the completion page.</p>
                    `
        },
        choices: ['Finish Study'],
        on_finish: function() {
            // // For testing, save data locally
            // saveDataLocally();

            // For deployment, save data to server
            saveDataToServer();

            // Redirect to completion URL
            setTimeout(function() {
                // window.location.href = 'https://connect-researcher-help.cloudresearch.com/hc/en-us/articles/5046202939796-Project-Completion';
                window.location.href = 'https://connect.cloudresearch.com/participant/project/8F8EFE87A6/complete';
            }, 3000); // wait 3 seconds for data to save
        }
    });

    return survey_trials;
}
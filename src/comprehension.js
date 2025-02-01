
function comprehensionCheckProcedure() {
    const comprehension_trial = {
        type: jsPsychSurveyMultiChoice,
        preamble: function() {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            if (lastTrialData && lastTrialData.feedback_message) {
                return '<p style="color:red;">' + lastTrialData.feedback_message + '</p>';
            } else {
                return '';
            }
        },
        questions: [
            {
                prompt: '<p>Before we begin the study, we have some questions for you.</p>',
                options: [],
                required: false
            },
            {
                prompt: 'Will there be feedback in <b>Episode 1 and 2</b>?',
                name: 'train_feedback',
                options: ['Yes', 'No'],
                required: true
            },
            {
                prompt: 'Will there be feedback in the <b>Episode 3</b>?',
                name: 'test_feedback',
                options: ['Yes', 'No'],
                required: true
            },
            {
                prompt: 'Will you receive bonus payment by answering test trials correctly in <b>Episode 3</b>?',
                name: 'test_bonus',
                options: ['Yes', 'No'],
                required: true
            },
            {
                prompt: 'Will you be able to see a reference of past demo and practice examples during the study?',
                name: 'primitives_reference',
                options: ['Yes', 'No'],
                required: true
            },
        ],
    };

    // Loop if not passing all questions
    const comprehension_node = {
        timeline: [comprehension_trial],
        loop_function: function(data) {
            // Get the responses from the last trial
            const responses = data.values()[0].response;
            let all_correct = true;
            // Check each answer
            if (responses.train_feedback !== 'Yes') {
                all_correct = false;
            }
            if (responses.test_feedback !== 'No') {
                all_correct = false;
            }
            if (responses.test_bonus !== 'Yes') {
                all_correct = false;
            }
            if (responses.primitives_reference !== 'Yes') {
                all_correct = false;
            }
            if (!all_correct) {
                data.values()[0].feedback_message = 'Some of your answers were incorrect. Please try again.';
                return true; // Repeat the comprehension trial
            } else {
                // Increment progress bar
                EXPERIMENT_PARAMS.currentSectionIndex ++;
                const fraction = EXPERIMENT_PARAMS.currentSectionIndex / EXPERIMENT_PARAMS.totalSections;
                jsPsych.progressBar.progress = fraction;
                return false; // End the loop when all answers are correct
            }
        },
    };

    // Return the comprehension node as an array
    return [comprehension_node];
}
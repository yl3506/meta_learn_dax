function introductionProcedure() {

  
  const page1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <h2>Instructions 1/4</h2>
      <p>Welcome!</p>
      <p>In this study, you will learn some new words and how they map to items (emojis).</p>
      <p>You will also learn operations that can be applied to those words, </p>
      <p>and see how they affect the corresponding emojis.</p>
      <p>We will walk you through several episodes to teach you these mappings and operations.</p>
    `,
    choices: ["Continue"]
  };

  const page2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <h2>Instructions 2/4</h2>
      <p>There will be <b>3 Episodes</b> total in the study.</p>
        <p><b>Episode 1</b> and <b>Episode 2</b> are <b>training</b> episodes.</p>
        <p>In training, you see demo examples with correct answers, </p>
        <p>plus practice examples (with feedback about the correctness of your response).</p>
        <p>You may have up to 3 attempts to solve each practice example before we move on.</p>
    `,
    choices: ["Continue"]
  };

  const page3 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <h2>Instructions 3/4</h2>
      <p><b>Episode 3</b> will be a final <b>test</b>: no practice or feedback, only test trials.</p>
      <p> You will receive a <b>bonus</b> for every correct test answer.</p>
    `,
    choices: ["Continue"]
  };

  
  const page4 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <h2>Instructions 4/4</h2>
      <p>You do not need to memorize everything perfectly.</p> 
      <p>A reference of past demo and practice examples will be displayed in each episode.</p>
      <p>However, you are encouraged to use pen and paper to help you keep track of the mappings.</p>
        <br>
      <p>On the next screen, you will practice how to use the drag-and-drop interface.</p>
      <p>This interface is how you will produce your answers in the rest of the experiment.</p>
    `,
    choices: ["Continue"]
  };

  // Drag-and-Drop Interface Practice
  const colors = EXPERIMENT_PARAMS.colors;
  const practiceSequence = jsPsych.randomization.sampleWithoutReplacement(colors, 3);

  // The actual DnD practice trial
  const practiceTrial = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function() {
          let html = '<div id="practice-container">';
          html += '<h2>Practice Drag-And-Drop</h2>';
          html += `<div class="content-container">`;
          html += `<p>
                  In the main study, 
                  you will use this drag-and-drop interface to produce your responses.</p>
                  <p>So, let's practice now.</p>
                  <p>
                  Drag the items below to produce this sequence:
                  </p>
                  <br>`;
          for (const color of practiceSequence) {
              html += `<img src="images/${color}.png" alt="${color}" 
                          style="width:${color_width}px; 
                                 height:${color_height}px; 
                                 margin-left:${color_margin}px;">`;
          }
          html += '<h5><br>---------- Drag and arrange the items below -----------</h5>';
          html += createDragAndDropInterface();
          html += '</div></div>'; 
          return html;
      },
      choices: "NO_KEYS",
      on_load: function() {
          EXPERIMENT_PARAMS.practiceAttempts = 0;
          setupDragAndDropPractice(practiceSequence);
      },
      data: {
          trial_type: 'introduction_practice',
          practice_sequence: practiceSequence
      },
      on_finish: function(data) {
          data.practice_sequence = practiceSequence;  // store the sequence
          // data.correct is set in "setupDragAndDropPractice"
      }
  };

  // Put the practice trial in a loop if we want them to keep trying until correct
  const interfacePractice = {
    timeline: [practiceTrial],
    loop_function: function(data) {
      const lastTrialData = data.values()[0];
      // If user arranges it correctly => proceed. Otherwise => repeat
      if (lastTrialData.correct) {
          return false; // end of loop
      } else {
          return true; // repeat
      }
    }
  };

  // Finally, we return an array that includes these multiple pages 
  // plus the DnD practice 
  return [page1, page2, page3, page4, interfacePractice];
}

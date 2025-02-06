/*****************************************************
 * episode3.js
 *   Grammar: Input IDs 15..21 => i..l, X=19, Y=20, Z=21
 *   5 pages, no practice, just test
*****************************************************/

// Use a function like this:
function getEpisode3Timeline(EXPERIMENT_PARAMS) {

  let episode3_timeline=[];
  let allExamples=[];
  let exampleCounter=1;

  // For the final scoreboard:
  if (typeof EXPERIMENT_PARAMS.testTotalTrials === 'undefined') {
    EXPERIMENT_PARAMS.testTotalTrials = 0;
  }
  if (typeof EXPERIMENT_PARAMS.testCorrectCount === 'undefined') {
    EXPERIMENT_PARAMS.testCorrectCount = 0;
  }

  function on_page_finish(){
    EXPERIMENT_PARAMS.currentSectionIndex++;
    jsPsych.progressBar.progress = EXPERIMENT_PARAMS.currentSectionIndex / EXPERIMENT_PARAMS.totalSections;
  }

  // 1) Transition page from Episode 2 to Episode 3
  episode3_timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <h2 style="color:red;">Beginning of Episode 3</h2>
      <p>All word-emoji associations have changed again.</p>
      <p>This time, there is <b>no practice or feedback</b>. It's a final test.</p> 
      <p>Your <b>bonus</b> payment will be associated with your performance in this episode.</p> 
      <p>Good luck!</p>
      <br>
      <p>Click the button when you are ready to begin the test.</p>
    `,
    choices: ["Begin Test"],
    on_finish: () => {
      on_page_finish();
    }
  });

  
  // ------------------------------------------------------------------
  // PAGE 1: trivial word-token (IDs 15..18 => i..l) demo only
  // ------------------------------------------------------------------
  const page1Demos = [
    { inputArray:[15],type:'demo'},
    { inputArray:[16],type:'demo'},
    { inputArray:[17],type:'demo'},
    { inputArray:[18],type:'demo'}
  ];
  episode3_timeline.push(createPageTimelineTest(
    `<b style="color:red">Episode 3: </b>
    Item (Word-Emoji) Mappings`,
    3, // episode number
    page1Demos, 
    [], //no test
    allExamples, 
    exampleCounter,
    EXPERIMENT_PARAMS, 
    on_page_finish, 
    1, // page number
  ));
  exampleCounter += page1Demos.length;

  // ------------------------------------------------------------------
  // PAGE 2: function X => ID=19 
  // ------------------------------------------------------------------
  const page2Demos=[
    { inputArray:[15,19], type:'demo'}, // i X -> i i i
    { inputArray:[17,19], type:'demo'} // k X -> k k k
  ];
  const page2Tests=[
    { inputArray:[16,19], type:'test'}, // j X -> j j j
    { inputArray:[18,19], type:'test'} // l X -> l l l
  ];
  episode3_timeline.push(createPageTimelineTest(
    `<b style="color:red">Episode 3: </b>
    Apply Operation "${EXPERIMENT_PARAMS.inputID_to_word[19]}" on Item`,
    3, // episode number
    page2Demos, 
    page2Tests,
    allExamples, 
    exampleCounter,
    EXPERIMENT_PARAMS, 
    on_page_finish, 
    2, // page number
  ));
  exampleCounter+=(page2Demos.length + page2Tests.length);

  // ------------------------------------------------------------------
  // PAGE 3: function Y => ID=20 
  // ------------------------------------------------------------------
  const page3Demos=[
    { inputArray:[15,20,16], type:'demo'},
    { inputArray:[15,20,17], type:'demo'}
  ];
  const page3Tests=[
    { inputArray:[15,20,18], type:'test'},
    { inputArray:[17,20,18], type:'test'}
  ];
  episode3_timeline.push(createPageTimelineTest(
    `<b style="color:red">Episode 3: </b>
    Apply Operation "${EXPERIMENT_PARAMS.inputID_to_word[20]}" on Items`,
    3, // episode number
    page3Demos,
    page3Tests,
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    3, // page number
  ));
  exampleCounter+=(page3Demos.length + page3Tests.length);

  // ------------------------------------------------------------------
  // PAGE 4: function Z => ID=21 
  // ------------------------------------------------------------------
  const page4Demos=[
    { inputArray:[15,21,16], type:'demo'},
    { inputArray:[16,21,17], type:'demo'}
  ];
  const page4Tests=[
    { inputArray:[15,21,18], type:'test'},
    { inputArray:[17,21,18], type:'test'}
  ];
  episode3_timeline.push(createPageTimelineTest(
    `<b style="color:red">Episode 3: </b>
    Apply Operation "${EXPERIMENT_PARAMS.inputID_to_word[21]}" on Items`,
    3, // episode number
    page4Demos,
    page4Tests,
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    4, // page number
  ));
  exampleCounter+=(page4Demos.length + page4Tests.length);

  // ------------------------------------------------------------------
  // PAGE 5: combos 
  // ------------------------------------------------------------------
  // Demo combos
  const page5DemosTemplate = [
    // Demo (15,16): arg1 X Y arg2
    { type:'demo', IDs:[15,16], template:["arg1","X","Y","arg2"] },
    // Demo (15,17): arg1 Y arg2 X
    { type:'demo', IDs:[15,17], template:["arg1","Y","arg2","X"] },
    // Demo (15,16): arg1 X Z arg2
    { type:'demo', IDs:[15,16], template:["arg1","X","Z","arg2"] },
    // Demo (15,17): arg1 Z arg2 X
    { type:'demo', IDs:[15,17], template:["arg1","Z","arg2","X"] },
    // Demo (15,16,17): arg1 Y arg2 Z arg3
    { type:'demo', IDs:[15,16,17], template:["arg1","Y","arg2","Z","arg3"] },
    // Demo (15,16,17): arg1 Z arg2 Y arg3
    { type:'demo', IDs:[15,16,17], template:["arg1","Z","arg2","Y","arg3"] },
  ];
  // Test combos
  const page5TestTemplate = [
    // Practice (16,17): arg1 X Y arg2
    { type:'test', IDs:[16,17], template:["arg1","X","Y","arg2"] },
    // Practice (17,18): arg1 Y arg2 X
    { type:'test', IDs:[17,18], template:["arg1","Y","arg2","X"] },
    // Practice (16,17): arg1 X Z arg2
    { type:'test', IDs:[16,17], template:["arg1","X","Z","arg2"] },
    // Practice (17,18): arg1 Z arg2 X
    { type:'test', IDs:[17,18], template:["arg1","Z","arg2","X"] },
    // Practice (15,17,18): arg1 Y arg2 Z arg3
    { type:'test', IDs:[15,17,18], template:["arg1","Y","arg2","Z","arg3"] },
    // Practice (16,17,18): arg1 Z arg2 Y arg3
    { type:'test', IDs:[16,17,18], template:["arg1","Z","arg2","Y","arg3"] },
    // Practice (15,16,18): arg1 Y arg2 Z arg3 X
    { type:'test', IDs:[15,16,18], template:["arg1","Y","arg2","Z","arg3","X"] },
    // Practice (15,17,18): arg1 X Z arg2 Y arg3
    { type:'test', IDs:[15,17,18], template:["arg1","X","Z","arg2","Y","arg3"] },
    // Practice (16,17,18): arg1 Z arg2 Y X arg3
    { type:'test', IDs:[16,17,18], template:["arg1","Z","arg2","Y","arg3","X"] },
  ];
  // Convert each template to a final inputArray using randomization
  let page5Demos = [];
  for(const ex of page5DemosTemplate){
    const finalArray = randomizeCombinationExample(ex.IDs, ex.template, EXPERIMENT_PARAMS, 3);
    page5Demos.push({
      inputArray: finalArray,
      type: 'demo'
    });
  }

  let page5Tests = [];
  for(const ex of page5TestTemplate){
    const finalArray = randomizeCombinationExample(ex.IDs, ex.template, EXPERIMENT_PARAMS, 3);
    page5Tests.push({
      inputArray: finalArray,
      type: 'test'
    });
  }

  episode3_timeline.push(createPageTimelineTest(
    `<b style="color:red">Episode 3: </b>
    Combine Operations
    "${EXPERIMENT_PARAMS.inputID_to_word[19]}",
    "${EXPERIMENT_PARAMS.inputID_to_word[20]}",
    "${EXPERIMENT_PARAMS.inputID_to_word[21]}"`, 
    3, // episode number
    page5Demos,
    page5Tests,
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    5, // page number
  ));
  exampleCounter+=(page5Demos.length + page5Tests.length);

  return episode3_timeline;
}


/***************************************************************
 * createTestPageTimeline
 *   - no practice, only test
 *   - uses "setupDragAndDropTest" => no feedback
 *   - accumulate correct responses
 *   - store data in on_finish
 ***************************************************************/
function createPageTimelineTest(
  pageTitle,
  episode,
  demoExamples,
  testExamples,
  allExamples,
  exampleCounter,
  EXPERIMENT_PARAMS,
  on_page_finish,
  pageNumber
){
  let pageTimeline=[];

  let intromessage = `<h4>${pageTitle}</h4>
               <p>Reminder: This is a <b>test</b> episode.</p>
                `;
  if (pageNumber===1){
    intromessage += `
               <p>No feedback/practice is available.</p>
               <p>You will first see demo examples, and then solve test examples on your own.</p>
               <p>The more test examples you answer correctly, the more bonus you earn.</p>
              `;
  };
  if (pageNumber===5){
    intromessage += `<p>Infer the correct order of applying multiple operations.</p>`;
  };

  // Intro of each page
  pageTimeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: intromessage,
    choices:["Continue"]
  });

  // Demo
  demoExamples.forEach(ex=>{
    pageTimeline.push({
      type: jsPsychHtmlButtonResponse,
      stimulus: function(){
        const priorHTML=renderReferenceExamples(allExamples, pageNumber);
        const { inputWords, outputEmojis }= computeInputOutput(ex.inputArray, EXPERIMENT_PARAMS);
        return `
          <div>
            <p><b>Reference of Previous Examples</b></p>
            ${priorHTML}
            <hr>
            <p><b>Demo</b></p>
            <p>${inputWords.join(' ')} → ${renderEmojisInline(outputEmojis)}</p>
          </div>
        `;
      },
      choices:["Continue"],
      on_finish:function(data){
        const { inputWords, outputEmojis } = computeInputOutput(ex.inputArray, EXPERIMENT_PARAMS);
        data.rt = data.rt; // time is automatically captured by jspsych
        data.episode = episode;
        data.page = pageNumber;
        data.trial_type = 'demo';
        data.inputSymbols = ex.inputArray; // numeric IDs
        data.inputWords = inputWords;
        data.solutionEmojis = outputEmojis;
        allExamples.push({
          index: exampleCounter++,
          type:'demo',
          page: pageNumber,
          inputWords,
          outputEmojis
        });
      }
    });
  });

  // Test
  testExamples.forEach(ex=>{
    pageTimeline.push({
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function(){
        const priorHTML=renderReferenceExamples(allExamples, pageNumber);
        const { inputWords }= computeInputOutput(ex.inputArray, EXPERIMENT_PARAMS);
        return `
          <div id="test-container">
            <p><b>Reference of Previous Examples</b></p>
            ${priorHTML}
            <hr>
            <p style="color:red;"><b>Test</b></p>
            <p>${inputWords.join(' ')} → ?</p>
            ${createDragAndDropInterface()}
            <p style="color:blue;">
              No feedback. Click "Confirm" to record your answer.
            </p>
          </div>
        `;
      },
      choices:"NO_KEYS",
      on_load: function(){
        const { outputEmojis }= computeInputOutput(ex.inputArray, EXPERIMENT_PARAMS);
        setupDragAndDropTest(outputEmojis); // no feedback
      },
      on_finish:function(data){
        // Store data from allExamples
        const result = computeInputOutput(ex.inputArray, EXPERIMENT_PARAMS);

        // Track total test trials
        if(!EXPERIMENT_PARAMS.testTotalTrials){
          EXPERIMENT_PARAMS.testTotalTrials=0;
        }
        if(!EXPERIMENT_PARAMS.testCorrectCount){
          EXPERIMENT_PARAMS.testCorrectCount=0;
        }
        EXPERIMENT_PARAMS.testTotalTrials++;
        if(data.correct){
          EXPERIMENT_PARAMS.testCorrectCount++;
        }
        // Store data
        data.rt = data.rt; // time is automatically captured by jspsych
        data.episode= episode;
        data.page = pageNumber;
        data.trial_type = 'test';
        data.inputSymbols = ex.inputArray // numeric IDs of input
        data.inputWords = result.inputWords;     // nonsense words
        data.solutionEmojis = result.outputEmojis; // e.g. filenames
        data.participant_response = data.participant_response || [];
        data.isCorrect = data.correct;
      }
    });
  });

  return {
    timeline: pageTimeline,
    on_timeline_finish: function(){
      if(typeof on_page_finish==='function'){
        on_page_finish();
      }
    }
  };
}

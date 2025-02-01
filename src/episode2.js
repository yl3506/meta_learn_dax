/*****************************************************
 * episode2.js
 *   - Grammar #3
 *   - Input IDs: 8..14 => e..h, X=12, Y=13, Z=14
 *   - 5 pages
*****************************************************/

function getEpisode2Timeline(EXPERIMENT_PARAMS){
  let episode2_timeline=[];
  let allExamples=[];
  let exampleCounter=1;

  function on_page_finish(){
    EXPERIMENT_PARAMS.currentSectionIndex++;
    jsPsych.progressBar.progress = EXPERIMENT_PARAMS.currentSectionIndex / EXPERIMENT_PARAMS.totalSections;
  }


  // Transition from episode 1 to episode 2
  episode2_timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <h2>Beginning of Episode 2</h2>
      <p>In this episode, <b>all word-emoji associations will change</b> from Episode 1.</p>
      <p>You need to re-learn and infer the correct mappings.</p>
      <p>This is also a training episode, so practice and feedback are available.</p>
      <br>
      <p>Click "Continue" when you are ready to begin.</p>
    `,
    choices: ["Continue"],
    on_finish: () => {
        on_page_finish();
      }
  });

  //------------------------------------------------
  // PAGE 1: Trivial word-token associations
  //------------------------------------------------
  const page1Demos=[
    { inputArray:[8], type:'demo'},
    { inputArray:[9], type:'demo'},
    { inputArray:[10],type:'demo'},
    { inputArray:[11],type:'demo'}
  ];
  episode2_timeline.push(createPageTimeline(
    "Episode 2: Item (Word-Emoji) Mappings",
    2, // episode number
    page1Demos,
    [], // no practice
    [], // no test
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    1, // page number
  ));
  exampleCounter += page1Demos.length;

  //------------------------------------------------
  // PAGE 2: Function X, ID 12
  //------------------------------------------------
  const page2Demos=[
    { inputArray:[8,12], type:'demo'},
    { inputArray:[10,12],type:'demo'}
  ];
  const page2Practice=[
    { inputArray:[9,12], type:'practice'},
    { inputArray:[11,12],type:'practice'}
  ];
  episode2_timeline.push(createPageTimeline(
    `Episode 2: Apply Operation "${EXPERIMENT_PARAMS.inputID_to_word[12]}" on Item`,
    2, // episode number
    page2Demos,
    page2Practice,
    [], // no test
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    2, // page number
  ));
  exampleCounter+=(page2Demos.length + page2Practice.length);

  //------------------------------------------------
  // PAGE 3: Function Y, ID 13
  //------------------------------------------------
  const page3Demos=[
    { inputArray:[8,13,9], type:'demo'},
    { inputArray:[8,13,10],type:'demo'}
  ];
  const page3Practice=[
    { inputArray:[8,13,11], type:'practice'},
    { inputArray:[10,13,11],type:'practice'}
  ];
  episode2_timeline.push(createPageTimeline(
    `Episode 2: Apply Operation "${EXPERIMENT_PARAMS.inputID_to_word[13]}" on Items`,
    2, // episode number
    page3Demos,
    page3Practice,
    [], // no test
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    3, // page number
  ));
  exampleCounter+=(page3Demos.length + page3Practice.length);

  //------------------------------------------------
  // PAGE 4: Function Z, ID 14
  //------------------------------------------------
  const page4Demos=[
    { inputArray:[8,14,9], type:'demo'},
    { inputArray:[9,14,10],type:'demo'}
  ];
  const page4Practice=[
    { inputArray:[8,14,11], type:'practice'},
    { inputArray:[10,14,11],type:'practice'}
  ];
  episode2_timeline.push(createPageTimeline(
    `Episode 2: Apply Operation "${EXPERIMENT_PARAMS.inputID_to_word[14]}" on Items`,
    2, // episode number
    page4Demos,
    page4Practice,
    [], // no test
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    4, // page number
  ));
  exampleCounter+=(page4Demos.length + page4Practice.length);

  //------------------------------------------------
  // PAGE 5: Function Combinations
  //------------------------------------------------
    // Page 5 Demo combos
  const page5DemosTemplate = [
    // Demo (8, 9): arg1 X Y arg2
    {
      type:'demo',
      IDs:[8,9],
      template:["arg1","X","Y","arg2"]
    },
    // Demo (8, 10): arg1 Y arg2 X
    {
      type:'demo',
      IDs:[8,10],
      template:["arg1","Y","arg2","X"]
    },
    // Demo (8, 9): arg1 X Z arg2
    {
      type:'demo',
      IDs:[8,9],
      template:["arg1","X","Z","arg2"]
    },
    // Demo (8, 10): arg1 Z arg2 X
    {
      type:'demo',
      IDs:[8,10],
      template:["arg1","Z","arg2","X"]
    },
    // Demo (8,9,10): arg1 Y arg2 Z arg3
    {
      type:'demo',
      IDs:[8,9,10],
      template:["arg1","Y","arg2","Z","arg3"]
    },
    // Demo (8,9,10): arg1 Z arg2 Y arg3
    {
      type:'demo',
      IDs:[8,9,10],
      template:["arg1","Z","arg2","Y","arg3"]
    },
  ];

  // Page 5 Practice combos
  const page5PracticeTemplate = [
    // Practice (9, 10): arg1 X Y arg2
    {
      type:'practice',
      IDs:[9,10],
      template:["arg1","X","Y","arg2"]
    },
    // Practice (10, 11): arg1 Y arg2 X
    {
      type:'practice',
      IDs:[10,11],
      template:["arg1","Y","arg2","X"]
    },
    // Practice (9, 10): arg1 X Z arg2
    {
      type:'practice',
      IDs:[9,10],
      template:["arg1","X","Z","arg2"]
    },
    // Practice (10, 11): arg1 Z arg2 X
    {
      type:'practice',
      IDs:[10,11],
      template:["arg1","Z","arg2","X"]
    },
    // Practice (8, 10, 11): arg1 Y arg2 Z arg3
    {
      type:'practice',
      IDs:[8,10,11],
      template:["arg1","Y","arg2","Z","arg3"]
    },
    // Practice (9, 10, 11): arg1 Z arg2 Y arg3
    {
      type:'practice',
      IDs:[9,10,11],
      template:["arg1","Z","arg2","Y","arg3"]
    },
    // Practice (8, 9, 11): arg1 Y arg2 Z arg3 X
    {
      type:'practice',
      IDs:[8,9,11],
      template:["arg1","Y","arg2","Z","arg3","X"]
    },
    // Practice (8, 10, 11): arg1 X Z arg2 Y arg3
    {
      type:'practice',
      IDs:[8,10,11],
      template:["arg1","X","Z","arg2","Y","arg3"]
    },
    // Practice (9, 10, 11): arg1 Z arg2 Y X arg3
    {
      type:'practice',
      IDs:[9,10,11],
      template:["arg1","Z","arg2","Y","X","arg3"]
    },
  ];
  // We'll build final arrays
  let page5Demos = [];
  for(const ex of page5DemosTemplate){
    const finalArray = randomizeCombinationExample(ex.IDs, ex.template, EXPERIMENT_PARAMS, 2);
    page5Demos.push({
      inputArray: finalArray,
      type: 'demo'
    });
  }

  let page5Practice = [];
  for(const ex of page5PracticeTemplate){
    const finalArray = randomizeCombinationExample(ex.IDs, ex.template, EXPERIMENT_PARAMS, 2);
    page5Practice.push({
      inputArray: finalArray,
      type: 'practice'
    });
  }

  episode2_timeline.push(createPageTimeline(
    `Episode 2: Combine Operations 
    "${EXPERIMENT_PARAMS.inputID_to_word[12]}",
    "${EXPERIMENT_PARAMS.inputID_to_word[13]}",
    "${EXPERIMENT_PARAMS.inputID_to_word[14]}"`, 
    2, // episode number
    page5Demos,
    page5Practice,
    [], // no test
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    5, // page number
  ));
  exampleCounter+=(page5Demos.length + page5Practice.length);

  return episode2_timeline;
}

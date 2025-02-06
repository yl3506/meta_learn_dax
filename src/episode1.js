/*****************************************************
 * Episode 1: Grammar #1
 *   Input IDs: 1..7
 *   Output IDs: a..d
 *   Function IDs: 5(X), 6(Y), 7(Z)
 *   Priority: X->Y->Z
 * 
 * Pages:
 *   Page 1: trivial word-token
 *   Page 2: function X
 *   Page 3: function Y
 *   Page 4: function Z
 *   Page 5: function combos
 *****************************************************/

function getEpisode1Timeline(EXPERIMENT_PARAMS) {

  // We'll accumulate all trials for Episode 1 in one array:
  let episode1_timeline = [];

  // A single array of all examples (demo + practice + test).
  // Each item: { type:'demo'|'practice'|'test', inputWords, outputEmojis, index, ...}
  // We'll track a global index so we show them in chronological order.
  let allExamples = [];
  let exampleCounter = 1;

  // Opening of episode 1
  episode1_timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <h2>Beginning of Episode 1</h2>
      <p>This is a training episode.</p>
      <p>You will learn mappings from input words to output emojis.</p>
      <p>This contain simple one-to-one mappings from a word to an emoji,</p>
      <p>and more complex operations that produce a sequence of emojis.</p>
      <p>You will see demo examples with answers and practice with feedback.</p>
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
  // Demo examples: 
  //   1 -> a
  //   2 -> b
  // We store them in an array of “example objects.”
  const page1Demos = [
    { inputArray: [1],   type: 'demo' }, // 1 alone
    { inputArray: [2],   type: 'demo' }, // 2 alone
    { inputArray: [3],   type: 'demo' }, // 3 alone
    { inputArray: [4],   type: 'demo' }, // 4 alone
  ];
  // No practice/test on Page 1
  episode1_timeline.push(createPageTimeline(
    "Episode 1: Item (Word-Emoji) Mappings",
    1, // episode number
    page1Demos,
    [],
    [],
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    1 // page number
  ));
  exampleCounter += (page1Demos.length);


  //------------------------------------------------
  // PAGE 2: Function X
  //------------------------------------------------
  // Demo:
  //   1 5 -> a a a
  //   3 5 -> c c c
  const page2Demos = [
    { inputArray: [1,5], type: 'demo' },
    { inputArray: [3,5], type: 'demo' },
  ];
  // Practice:
  //   2 5 -> b b b
  //   4 5 -> d d d
  const page2Practice = [
    { inputArray: [2,5], type: 'practice' },
    { inputArray: [4,5], type: 'practice' },
  ];
  // No test items on page 2
  episode1_timeline.push(createPageTimeline(
    // We'll display the nonsense word for function ID=5
    `Episode 1: Apply Operation "${EXPERIMENT_PARAMS.inputID_to_word[5]}" on Item`,
    1, // episode number
    page2Demos,
    page2Practice,
    [],
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    2 // page number
  ));
  exampleCounter += (page2Demos.length + page2Practice.length);
  


  //------------------------------------------------
  // PAGE 3: Function Y
  //------------------------------------------------
  // Demo:
  //   1 6 2 -> a b a
  //   1 6 3 -> a c a
  const page3Demos = [
    { inputArray: [1,6,2], type: 'demo' },
    { inputArray: [1,6,3], type: 'demo' },
  ];
  // Practice:
  //   1 6 4 -> a d a
  //   3 6 4 -> c d c
  const page3Practice = [
    { inputArray: [1,6,4], type: 'practice' },
    { inputArray: [3,6,4], type: 'practice' },
  ];
  episode1_timeline.push(createPageTimeline(
    `Episode 1: Apply Operation "${EXPERIMENT_PARAMS.inputID_to_word[6]}" on Items`,
    1, // episode number
    page3Demos,
    page3Practice,
    [],
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    3 // page number
  ));
  exampleCounter += (page3Demos.length + page3Practice.length);


  //------------------------------------------------
  // PAGE 4: Function Z
  //------------------------------------------------
  // Demo:
  //   1 7 2 -> b a
  //   2 7 3 -> c a
  const page4Demos = [
    { inputArray: [1,7,2], type: 'demo' },
    { inputArray: [2,7,3], type: 'demo' },
  ];
  // Practice:
  //   1 7 4 -> d a
  //   3 7 4 -> d c
  const page4Practice = [
    { inputArray: [1,7,4], type: 'practice' },
    { inputArray: [3,7,4], type: 'practice' },
  ];
  episode1_timeline.push(createPageTimeline(
    `Episode 1: Apply Operation "${EXPERIMENT_PARAMS.inputID_to_word[7]}" on Items`,
    1, // episode number
    page4Demos,
    page4Practice,
    [],
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    4 // page number
  ));
  exampleCounter += (page4Demos.length + page4Practice.length);


  //------------------------------------------------
  // PAGE 5: Function Combinations
  //------------------------------------------------
  // We'll define all the combos in a structured way
  // For each: an object => { type, IDs, template }
  // E.g. "Demo (1,2): arg1 X Y arg2"
  const page5DemosTemplate = [
    { 
      type:'demo',
      IDs: [1,2],                // (1,2)
      template: ["arg1","X","Y","arg2"] 
    },
    { 
      type:'demo',
      IDs: [1,3],
      template: ["arg1","Y","arg2","X"]
    },
    { 
      type:'demo',
      IDs: [1,2],
      template: ["arg1","X","Z","arg2"]
    },
    { 
      type:'demo',
      IDs: [1,3],
      template: ["arg1","Z","arg2","X"]
    },
    { 
      type:'demo',
      IDs: [1,2,3],
      template: ["arg1","Y","arg2","Z","arg3"]
    },
    { 
      type:'demo',
      IDs: [1,2,3],
      template: ["arg1","Z","arg2","Y","arg3"]
    },
  ];

  // Then for practice
  const page5PracticeTemplate = [
    // { 
    //   type:'practice',
    //   IDs: [2,3],
    //   template: ["arg1","X","Y","arg2"]
    // },
    // { 
    //   type:'practice',
    //   IDs: [3,4],
    //   template: ["arg1","Y","arg2","X"]
    // },
    // { 
    //   type:'practice',
    //   IDs: [2,3],
    //   template: ["arg1","X","Z","arg2"]
    // },
    // { 
    //   type:'practice',
    //   IDs: [3,4],
    //   template: ["arg1","Z","arg2","X"]
    // },
    // { 
    //   type:'practice',
    //   IDs: [1,3,4],
    //   template: ["arg1","Y","arg2","Z","arg3"]
    // },
    // { 
    //   type:'practice',
    //   IDs: [2,3,4],
    //   template: ["arg1","Z","arg2","Y","arg3"]
    // },
    // { 
    //   type:'practice',
    //   IDs: [1,2,4],
    //   template: ["arg1","Y","arg2","Z","arg3","X"]
    // },
    // { 
    //   type:'practice',
    //   IDs: [1,3,4],
    //   template: ["arg1","X","Z","arg2","Y","arg3"]
    // },
    { 
      type:'practice',
      IDs: [2,3,4],
      template: ["arg1","Z","arg2","Y","arg3","X"]
    },
  ];

  // We'll build the actual arrays
  let page5Demos = [];
  for(const ex of page5DemosTemplate){
    // randomize the assignment from arg1/arg2(/arg3) => ex.IDs
    const finalArray = randomizeCombinationExample(ex.IDs, ex.template, EXPERIMENT_PARAMS, 1);
    page5Demos.push({
      inputArray: finalArray,
      type:ex.type,
    });
  };

  let page5Practice = [];
  for(const ex of page5PracticeTemplate){
    const finalArray = randomizeCombinationExample(ex.IDs, ex.template, EXPERIMENT_PARAMS, 1);
    page5Practice.push({
      inputArray: finalArray,
      type:ex.type,
    });
  };

  episode1_timeline.push(createPageTimeline(
    `Episode 1: Combine Operations
    "${EXPERIMENT_PARAMS.inputID_to_word[5]}",
    "${EXPERIMENT_PARAMS.inputID_to_word[6]}",
    "${EXPERIMENT_PARAMS.inputID_to_word[7]}"`, 
    1, // episode number
    page5Demos,
    page5Practice,
    [],
    allExamples,
    exampleCounter,
    EXPERIMENT_PARAMS,
    on_page_finish,
    5 // page number
  ));
  exampleCounter += (page5Demos.length + page5Practice.length);


  // after each page. We'll define a callback function:
  function on_page_finish(){
    EXPERIMENT_PARAMS.currentSectionIndex ++;
    const fraction = EXPERIMENT_PARAMS.currentSectionIndex / EXPERIMENT_PARAMS.totalSections;
    jsPsych.progressBar.progress = fraction;
  };

  return episode1_timeline;
}





/**
 * createPageTimeline
 * This function is shared between Episode 1 and Episode 2.
 * 
 * We unify the reference by storing *every* example in `allExamples`.
 * Then when we display a new example, we pass that entire array to
 * `renderReferenceExamples(allExamples)` which sorts them by `.index`.
 */
function createPageTimeline(
  pageTitle,
  episode,
  demoExamples,
  practiceExamples,
  testExamples,
  allExamples,
  exampleCounter,
  EXPERIMENT_PARAMS,
  on_page_finish,
  pageNumber
){
  /**
   * pageNumber = 1..5
   * We store this so each new example we push => ex.page = pageNumber
   */
  let pageTimeline = [];

  // We'll store a single "page-done" trial at the end that calls on_page_finish
  // so the progress bar updates after all demos/practices are done.

  let intromessage = `<h4>${pageTitle}</h4>`;
  if (pageNumber===1){
    intromessage += `
              <p>Mapping from a single word to a single emoji.</p>
              `;
  };
  if (2<=pageNumber && pageNumber<=4){
    intromessage += `
              <p>Learn how to apply this operation to produce a sequence of emojis.</p>
              `;
  };
  if (pageNumber===5){
    intromessage += `
      <p>Learn how to apply multiple operations in a row to produce a long sequence of emojis.</p>
      <p>Important: There is only one correct order of applying multiple operations.</p>
      <p>Try to infer this order from examples.</p>
    `;
  };

  // Intro
  pageTimeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: intromessage,
    choices: ["Continue"]
  });

  // ---------- Demos ----------
  demoExamples.forEach(ex => {
    pageTimeline.push({
      type: jsPsychHtmlButtonResponse,
      stimulus: function(){
        // Build reference
        const priorHTML = renderReferenceExamples(allExamples, pageNumber);
        const { inputWords, outputEmojis } = computeInputOutput(ex.inputArray, EXPERIMENT_PARAMS);
        return `
          <div>
            <p><b>Reference of Previous Examples</b></p>
            ${priorHTML}
            <hr>
            <p><b>Demo</b></p>
            <p style="margin-bottom:10px;">
              ${inputWords.join(' ')} → ${renderEmojisInline(outputEmojis)}
            </p>
          </div>
        `;
      },
      choices: ["Continue"],
      on_finish: function(data){
        const { inputWords, outputEmojis } = computeInputOutput(ex.inputArray, EXPERIMENT_PARAMS);
        data.rt = data.rt; // time is automatically captured by jspsych
        data.episode = episode;
        data.page = pageNumber;
        data.trial_type = 'demo';
        data.inputSymbols = ex.inputArray; // numeric IDs
        data.inputWords = inputWords;
        data.solutionEmojis = outputEmojis;
        // Add to allExamples
        allExamples.push({
          index: exampleCounter++,
          type: 'demo',
          page: pageNumber,
          inputWords,
          outputEmojis
        });
      }
    });
  });

  // ---------- Practice ----------
  practiceExamples.forEach(ex => {
    pageTimeline.push({
      timeline: [
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: function(){
            const priorHTML = renderReferenceExamples(allExamples, pageNumber);
            const { inputWords } = computeInputOutput(ex.inputArray, EXPERIMENT_PARAMS);
            return `
              <div id="practice-container">
                <p><b>Reference of Previous Examples</b></p>
                ${priorHTML}
                <hr>
                <p><b>Practice</b></p>
                <p style="margin-bottom:10px;">
                  ${inputWords.join(' ')} → ?
                </p>
                ${createDragAndDropInterface()}
              </div>
            `;
          },
          choices: "NO_KEYS",
          on_load: function(){
            const { inputWords, outputEmojis } = computeInputOutput(ex.inputArray, EXPERIMENT_PARAMS);
            setupDragAndDropPractice(outputEmojis); 
          },
          on_finish: function(data){
            data.trial_type = 'practice';
          }
        }
      ],
      loop_function: function(data){
        const { inputWords, outputEmojis } = computeInputOutput(ex.inputArray, EXPERIMENT_PARAMS);
        const last = data.values()[0];
        // Store data
        data.rt = data.rt;  // time is automatically captured by jspsych
        data.episode = episode;
        data.page = pageNumber;
        data.trial_type = 'practice';
        data.inputSymbols = ex.inputArray;
        console.log(inputWords);
        data.inputWords = inputWords;
        data.outputEmojis = outputEmojis;
        data.participant_response = data.participant_response || [];
        data.attempts = last.attempts;
        data.correct = last.isCorrect; 
        data.skipExample = last.skipExample;
        // If skip or correct => break
        if(last.skipExample || last.isCorrect){
            allExamples.push({
              index: exampleCounter++,
              type: 'practice',
              page: pageNumber,
              inputWords,
              outputEmojis,
          });
          // Reset practiceAttempts=0 for the next practice
          EXPERIMENT_PARAMS.practiceAttempts = 0;
          return false; // done
        }
        return true; // repeat
      }
    });
  });

  // End-of-page callback
  return {
    timeline: pageTimeline,
    on_timeline_finish: function() {
      if(typeof on_page_finish === 'function') {
        on_page_finish();
      }
    }
  };
}








function randomizeCombinationExample(IDs, template, EXPERIMENT_PARAMS, episode){
  // IDs = array of input token IDs we want to use, e.g. [1,2], or [1,2,3].
  // template = array of symbols, e.g. ["arg1","X","Y","arg2"].
  // We'll shuffle the mapping from "arg1","arg2","arg3" => IDs.

  // 1) Shuffle IDs
  const shuffledIDs = jsPsych.randomization.shuffle(IDs);
  
  // We'll create a map from "arg1" => shuffledIDs[0], etc.
  let argMap = {};
  if(IDs.length >= 1){
    argMap["arg1"] = shuffledIDs[0];
  }
  if(IDs.length >= 2){
    argMap["arg2"] = shuffledIDs[1];
  }
  if(IDs.length >= 3){
    argMap["arg3"] = shuffledIDs[2];
  }
  // (If you had 4 arguments, adapt accordingly.)

  // 2) We'll build a final array by scanning the template.
  //    If symbol is 'arg1' => argMap["arg1"], 
  //    if 'X' => 5, 'Y' => 6, 'Z' => 7, etc.
  let finalArray = [];
  for(let sym of template){
    if(sym==="arg1" || sym==="arg2" || sym==="arg3"){
      finalArray.push( argMap[sym] );
    } else if(episode===1){
        if(sym==="X"){
          finalArray.push(5);  // Episode 1 -> X=5
        } else if(sym==="Y"){
          finalArray.push(6);
        } else if(sym==="Z"){
          finalArray.push(7);
        }
      } else if(episode===2){
        if(sym==="X"){
          finalArray.push(12);  // Episode 2 -> X=12
        } else if(sym==="Y"){
          finalArray.push(13);
        } else if(sym==="Z"){
          finalArray.push(14);
        }
      } else if(episode===3){
        if(sym==="X"){
          finalArray.push(19);  // Episode 3 -> X=19
        } else if(sym==="Y"){
          finalArray.push(20);
        } else if(sym==="Z"){
          finalArray.push(21);
        }
      } else {
        // handle if there's a bare ID or something else
        finalArray.push(sym);
    }
  }

  return finalArray; // e.g. [2,5,6,1]
}

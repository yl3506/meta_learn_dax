// Initialize jsPsych with a progress bar
const jsPsych = initJsPsych({
  use_webaudio: false,
  show_progress_bar: true,           
  auto_update_progress_bar: false,    // we'll manually update as we go
  on_finish: function() {
    jsPsych.data.displayData(); // for debugging
  }
});

const available_words = ['dax', 'wif', 'lug', 'zem', 'fep', 'blicket', 'niz', 'kiki', 'rav', 'lunt', 'mib', 'vex', 'flim', 'nog', 'quip', 'blug', 'taz', 'snib', 'sorn', 'yim', 'blap', 'frip', 'glom', 'twib', 'zaf', 'mox', 'pif', 'clum', 'torp', 'griv', 'klet', 'spiv', 'yub', 'zilp', 'worb', 'grack', 'flanx', 'truv'];
const available_emojis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa'];
const available_functions = ['func1','func2','func3'];

// Program for every function, which takes argument and returns an array as output 
const FUNCTION_DEFINITIONS = {
  func1: (args) => {
    // X => repeat 3 times
    const inputEmojis = args[0] || [];
    return [...inputEmojis, ...inputEmojis, ...inputEmojis];
  },
  func2: (args) => {
    // Y => interleave => arg1 arg2 arg1
    const arg1 = args[0] || [];
    const arg2 = args[1] || [];
    return [...arg1, ...arg2, ...arg1];
  },
  func3: (args) => {
    // Z => reverse => arg2 arg1
    const arg1 = args[0] || [];
    const arg2 = args[1] || [];
    return [...arg2, ...arg1];
  },
};


const EXPERIMENT_PARAMS = createRandomMappings();


function createRandomMappings(){
  let obj = {};

  // Random mapping of input IDs → nonsense words
  const shuffledWords = jsPsych.randomization.shuffle(available_words);
  obj.inputID_to_word = {};
  for (let i = 1; i <= 21; i++) {
    obj.inputID_to_word[i] = shuffledWords[i-1];
  }

  // Random mapping of output IDs → 12 emoji filenames
  const shuffledColors = jsPsych.randomization.shuffle(available_emojis);
  const outputIDs = ['a','b','c','d','e','f','g','h','i','j','k','l'];
  obj.outputID_to_color = {};
  for (let i = 0; i < 12; i++) {
    const outputID = outputIDs[i];         // e.g. 'a'
    const randomFilename = shuffledColors[i]; // e.g. 'k'
    obj.outputID_to_color[outputID] = randomFilename;
  }

  // Store a list of all possible emoji "color" names (here we show 'a'..'l') 
  obj.colors = shuffledColors.slice(0, 12);

  // Episode subsets
  obj.episode1_emojis = ['a','b','c','d']; 
  obj.episode2_emojis = ['e','f','g','h'];
  obj.episode3_emojis = ['i','j','k','l'];

  // Map function IDs to function names (no randomization)
  obj.X_func = available_functions[0];
  obj.Y_func = available_functions[1];
  obj.Z_func = available_functions[2]; 

  // Participant-level metadata
  obj.participant_id = generateUniqueId();
  obj.start_time = new Date();

  return obj;
}

EXPERIMENT_PARAMS.totalSections = 20;
EXPERIMENT_PARAMS.currentSectionIndex = 0;
EXPERIMENT_PARAMS.maxPracticeAttempts = 3;
EXPERIMENT_PARAMS.practiceAttempts = 0;

// Build the experiment timeline
var timeline = [];

timeline.push(...consentProcedure());

timeline.push(...introductionProcedure());

timeline.push(...comprehensionCheckProcedure());


timeline.push(...getEpisode1Timeline(EXPERIMENT_PARAMS));

timeline.push(...getEpisode2Timeline(EXPERIMENT_PARAMS));

timeline.push(...getEpisode3Timeline(EXPERIMENT_PARAMS));


timeline.push(...surveyProcedure());

// Start the experiment
jsPsych.run(timeline);



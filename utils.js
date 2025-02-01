const color_height = 25;
const color_width = 25;
const color_margin = 6;


/** generate unique participant IDs */
function generateUniqueId() {
    return 'participant_' + Math.random().toString(36).substr(2, 9);
}

/** Render array of emoji filenames inline, e.g. ["c","c"] -> <img src="images/c.png">... */
function renderEmojisInline(emojiArr){
  return emojiArr.map(fn => {
    return `<img src="images/${fn}.png" 
                 style="width:${color_width}px; 
                        height:${color_height}px; 
                        margin-left:${color_margin/2}px; 
                        margin-right:${color_margin/2}px;">`;
  }).join('');
}


/**
 * We want a big grid of all possible emojis for the participant to drag from. 
 * This function returns HTML with each color as an <img>, 
 * after shuffling the array so it looks random each time.
 */
function getUniqueColorCirclesHTML() {
  const shuffled = jsPsych.randomization.shuffle(EXPERIMENT_PARAMS.colors);
  let html = `
    <div style="
      display: flex; 
      flex-wrap: wrap; 
      justify-content: center; 
      align-items: center; 
      gap: ${color_margin/2}px;
    ">
  `;
  shuffled.forEach(letter => {
    html += `
      <div>
        <img src="images/${letter}.png"
             data-color="${letter}"
             draggable="true"
             style="
               width:${color_width}px; 
               height:${color_height}px; 
               margin:${color_margin/2}px; 
               cursor:grab;
             ">
      </div>
    `;
  });
  html += `</div>`;
  return html;
}


/**
 * Create the drag-and-drop interface:
 *  - A "stimuli list" with all emoji images (via getUniqueColorCirclesHTML())
 *  - A drop area
 *  - Reset + Confirm buttons
 */
function createDragAndDropInterface() {
  return `
    <!-- Wrapper that centers everything -->
    <div style="
      display: flex; 
      flex-direction: column;
      align-items: center; 
      justify-content: center;
      width: 100%;
    ">

      <!-- Candidate emojis (stimuli list) -->
      <div id="stimuli-list" style="">
        ${getUniqueColorCirclesHTML()}
      </div>

      <!-- Drop area -->
      <div id="drop-area" style="
        min-height: 50px; 
        border: 1px solid #ccc; 
        padding: 5px; 
        text-align: center; 
        width: 600px;
        margin-bottom: 20px;
      ">
        <p>Drop items here</p>
      </div>

      <!-- Buttons -->
      <div id="buttons" style="display:flex; gap:15px;">
        <button id="reset-button" type="button">Reset</button>
        <button id="confirm-button" type="button">Confirm</button>
      </div>
    </div>
  `;
}



/*******************************************
 * setupDragAndDropPractice(correctOutput)
 * - A global EXPERIMENT_PARAMS.practiceAttempts is incremented each time user is wrong
 * - If attempts >= 3 => skip
 * - on "Next", we do jsPsych.finishTrial({ skipExample, isCorrect, etc. })
 ******************************************/
function setupDragAndDropPractice(correctOutput) {
  const dropArea = document.getElementById('drop-area');
  const stimuliList = document.getElementById('stimuli-list');

  // 1) DnD from stimuli list
  const images = stimuliList.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('text/plain', e.target.dataset.color);
      e.dataTransfer.setData('drag-source', 'stimuli-list');
    });
  });

  // 2) Drop area rearrangement
  dropArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const draggingItem = document.querySelector('.dragging');
    if (!draggingItem) return;
    const afterElement = getDragAfterElement(dropArea, e.clientX);
    if (afterElement == null) {
      dropArea.appendChild(draggingItem);
    } else {
      dropArea.insertBefore(draggingItem, afterElement);
    }
  });

  // 3) Dropping from stimuli list => create a new <img> inside dropArea
  dropArea.addEventListener('drop', function(e) {
    e.preventDefault();
    const source = e.dataTransfer.getData('drag-source');
    const color = e.dataTransfer.getData('text/plain');
    if (source === 'stimuli-list') {
      // Remove placeholder text if present
      const pTag = dropArea.querySelector('p');
      if (pTag) pTag.remove();

      const newImg = document.createElement('img');
      newImg.src = `images/${color}.png`;
      newImg.alt = color;
      newImg.dataset.color = color;
      newImg.style.width = `${color_width}px`;
      newImg.style.height = `${color_height}px`;
      newImg.style.margin = `${color_margin / 2}px`;
      newImg.style.cursor = 'grab';
      newImg.draggable = true;

      newImg.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.color);
        e.dataTransfer.setData('drag-source', 'drop-area');
        e.target.classList.add('dragging');
      });
      newImg.addEventListener('dragend', function(e) {
        e.target.classList.remove('dragging');
      });

      const afterElement = getDragAfterElement(dropArea, e.clientX);
      if (afterElement == null) {
        dropArea.appendChild(newImg);
      } else {
        dropArea.insertBefore(newImg, afterElement);
      }
    }
    // rearrangement is handled in 'dragover' above
  });

  // 4) Reset button
  document.getElementById('reset-button').addEventListener('click', function() {
    dropArea.innerHTML = '<p>Drop items here</p>';
  });

  // 5) Confirm button => check correctness, skip after 3 attempts
  document.getElementById('confirm-button').addEventListener('click', function() {
    const sortedItems = dropArea.querySelectorAll('img');
    // if (sortedItems.length === 0) {
    //   alert('Please place at least one emoji in the drop area.');
    //   return;
    // }

    const participantResponse = [];
    sortedItems.forEach(img => {
      participantResponse.push(img.dataset.color);
    });

    const isCorrect = checkResponse(correctOutput, participantResponse);

    // We track attempts in EXPERIMENT_PARAMS.practiceAttempts
    if (typeof EXPERIMENT_PARAMS.practiceAttempts === 'undefined') {
      EXPERIMENT_PARAMS.practiceAttempts = 0;
    }
    if (!isCorrect) {
      EXPERIMENT_PARAMS.practiceAttempts++;
    }

    const skipExample = (EXPERIMENT_PARAMS.practiceAttempts >= EXPERIMENT_PARAMS.maxPracticeAttempts && !isCorrect);

    // Disable DnD
    disableDragAndDrop();

    // Provide feedback
    let feedback_html = '';
    if (skipExample) {
      feedback_html = `<p style="color:red;">Maximum attempts reached. Skipping.</p>`;
    } else if (isCorrect) {
      feedback_html = `<p style="color:green;">Correct!</p>`;
    } else {
      // show correct answer
      const correctDisp = correctOutput.map(c => {
        return `<img src="images/${c}.png" style="width:${color_width}px; margin:${color_margin/2}px;">`;
      }).join('');
      feedback_html = `<p style="color:red;">Incorrect. The correct answer is: ${correctDisp}</p>`;
    }

    // Show feedback
    const container = document.getElementById('practice-container');
    const fbDiv = document.createElement('div');
    console.log(`incorrect attempt ${EXPERIMENT_PARAMS.practiceAttempts}`);
    fbDiv.id = 'feedback-message';
    fbDiv.innerHTML = feedback_html;
    container.appendChild(fbDiv);

    // Hide confirm, show next
    document.getElementById('confirm-button').style.display = 'none';
    const nextButton = document.createElement('button');
    nextButton.id = 'next-button';
    nextButton.textContent = 'Next';
    nextButton.type = 'button';
    document.getElementById('buttons').appendChild(nextButton);

    nextButton.addEventListener('click', function() {
      // We finish the trial. We'll rely on loop_function to see skipExample or isCorrect
      jsPsych.finishTrial({
        trial_type: 'practice',
        correct: (isCorrect || skipExample),
        solutionEmojis: correctOutput,
        participant_response: participantResponse,
        attempts: EXPERIMENT_PARAMS.practiceAttempts,
        isCorrect: isCorrect,
        skipExample: skipExample
      });
    });
  });
}



/**
 * Test version: same DnD mechanics, but no correctness feedback. 
 * You do something simpler: show "Response recorded" then proceed.
 */
function setupDragAndDropTest(correctOutput) {
    const dropArea = document.getElementById('drop-area');
    const stimuliList = document.getElementById('stimuli-list');
    const images = stimuliList.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.dataset.color);
            e.dataTransfer.setData('drag-source', 'stimuli-list');
        });
    });

    dropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const draggingItem = document.querySelector('.dragging');
        if (!draggingItem) return;
        const afterElement = getDragAfterElement(dropArea, e.clientX);
        if (afterElement == null) {
            dropArea.appendChild(draggingItem);
        } else {
            dropArea.insertBefore(draggingItem, afterElement);
        }
    });

    dropArea.addEventListener('drop', function(e) {
        e.preventDefault();
        const source = e.dataTransfer.getData('drag-source');
        const color = e.dataTransfer.getData('text/plain');
        if (source === 'stimuli-list') {
            if (dropArea.querySelector('p')) {
                dropArea.querySelector('p').remove();
            }
            const newImg = document.createElement('img');
            newImg.src = `images/${color}.png`;
            newImg.alt = color;
            newImg.dataset.color = color;
            newImg.style.width = `${color_width}px`;
            newImg.style.height = `${color_width}px`;
            newImg.style.margin = `${color_margin / 2}px`;
            newImg.style.cursor = 'grab';
            newImg.draggable = true;

            newImg.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', e.target.dataset.color);
                e.dataTransfer.setData('drag-source', 'drop-area');
                e.target.classList.add('dragging');
            });
            newImg.addEventListener('dragend', function(e) {
                e.target.classList.remove('dragging');
            });

            const afterElement = getDragAfterElement(dropArea, e.clientX);
            if (afterElement == null) {
                dropArea.appendChild(newImg);
            } else {
                dropArea.insertBefore(newImg, afterElement);
            }
        }
    });

    document.getElementById('reset-button').addEventListener('click', function() {
        dropArea.innerHTML = '<p>Drop items here</p>';
    });

    document.getElementById('confirm-button').addEventListener('click', function() {
        const sortedItems = dropArea.querySelectorAll('img');
        // if (sortedItems.length === 0) {
        //     alert('Please drag at least one emoji into the drop area.');
        //     return;
        // }
        const participantResponse = [];
        sortedItems.forEach(img => {
            participantResponse.push(img.dataset.color);
        });
        const isCorrect = checkResponse(correctOutput, participantResponse);

        disableDragAndDrop();

        const container = document.getElementById('test-container') 
                       || document.getElementById('composition-test-container') 
                       || document.getElementById('practice-container');
        const feedbackDiv = document.createElement('div');
        feedbackDiv.id = 'feedback-message';
        feedbackDiv.innerHTML = '<p>Response recorded.</p>';
        container.appendChild(feedbackDiv);

        document.getElementById('confirm-button').style.display = 'none';
        const nextButton = document.createElement('button');
        nextButton.id = 'next-button';
        nextButton.textContent = 'Next';
        nextButton.type = 'button';
        document.getElementById('buttons').appendChild(nextButton);

        nextButton.addEventListener('click', function() {
            jsPsych.finishTrial({
                participant_response: participantResponse,
                correct: isCorrect
            });
        });
    });
}



/**
 * Utility for re-inserting dragged items in the correct position inside #drop-area.
 */
function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('img:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}



/**
 * Disables further drag-and-drop after the participant confirms
 */
function disableDragAndDrop() {
    // Disable dragging from stimuli list
    const stimuliList = document.getElementById('stimuli-list');
    const stimuliImages = stimuliList.querySelectorAll('img');
    stimuliImages.forEach(img => {
        img.draggable = false;
        img.style.opacity = '0.5';
    });
    // Disable dragging within drop area
    const dropArea = document.getElementById('drop-area');
    const dropImages = dropArea.querySelectorAll('img');
    dropImages.forEach(img => {
        img.draggable = false;
        img.style.cursor = 'default';
    });
    // Disable Reset button
    const resetBtn = document.getElementById('reset-button');
    if(resetBtn) resetBtn.disabled = true;
}




/*******************************************************
 * renderReferenceExamples(allExamples, pageNumber)
 * - For pages 1..4 => 4-column
 * - For page 5 => 
 *    old pages => 4-col
 *    page5 => 2-col appended
*******************************************************/
function renderReferenceExamples(allExamples, pageNumber){
  if(!allExamples || !allExamples.length){
    return `<p>(none yet)</p>`;
  }
  if(!pageNumber) pageNumber=1;

  // if page<5 => show all in 4-col
  if(pageNumber<5){
    const lines = [...allExamples].sort((a,b)=>a.index-b.index).map(ex=>{
      return `(${ex.index}) ${ex.inputWords.join(' ')} → ${renderEmojisInline(ex.outputEmojis)}`;
    });
    return renderFourColumnTable(lines);
  }

  // if page===5 => old pages in 4-col, page5 in 2-col appended
  const oldEx=allExamples.filter(e=> e.page<5).sort((a,b)=>a.index-b.index);
  const oldLines=oldEx.map(ex=>{
    return `(${ex.index}) ${ex.inputWords.join(' ')} → ${renderEmojisInline(ex.outputEmojis)}`;
  });
  const oldHTML = renderFourColumnTable(oldLines);

  const newEx=allExamples.filter(e=> e.page===5).sort((a,b)=>a.index-b.index);
  const newLines=newEx.map(ex=>{
    return `(${ex.index}) ${ex.inputWords.join(' ')} → ${renderEmojisInline(ex.outputEmojis)}`;
  });
  const newHTML = renderTwoColumnTable(newLines);

  return `
    ${oldHTML}
    ${newHTML}
  `;
}


/*******************************************************
 * 4-column reference for pages 1..4
*******************************************************/
function renderFourColumnTable(lines){
  let html=`<table style="width:100%; table-layout:auto; white-space:nowrap;">`;
  // html += `<h4>Reference of Previous Examples</h4>`;
  if(!lines.length){
    html += `<p>(none yet)</p>`;
    return html;
  }
  for(let i=0; i<lines.length; i+=4){
    html+=`<tr>`;
    // col1
    html+=`<td style="vertical-align: top; padding:5px; width:25%;">${lines[i]}</td>`;
    // col2
    if(i+1<lines.length){
      html+=`<td style="vertical-align: top; padding:5px; width:25%;">${lines[i+1]}</td>`;
    } else {
      html+=`<td style="width:25%;"></td>`;
    }
    // col3
    if(i+2<lines.length){
      html+=`<td style="vertical-align: top; padding:5px; width:25%;">${lines[i+2]}</td>`;
    } else {
      html+=`<td style="width:25%;"></td>`;
    }
    // col4
    if(i+3<lines.length){
      html+=`<td style="vertical-align: top; padding:5px; width:25%;">${lines[i+3]}</td>`;
    } else {
      html+=`<td style="width:25%;"></td>`;
    }
    html+=`</tr>`;
  }
  html+=`</table>`;
  return html;
}

/*******************************************************
 * 2-column for page5 references
*******************************************************/
function renderTwoColumnTable(lines){
  if(!lines.length) return ``;
  let html=`<table style="width:100%; table-layout:auto; white-space:nowrap;">`;
  for(let i=0;i<lines.length;i+=2){
    html+=`<tr>`;
    html+=`<td style="vertical-align: top; padding:5px; width:50%;">${lines[i]}</td>`;
    if(i+1<lines.length){
      html+=`<td style="vertical-align: top; padding:5px; width:50%;">${lines[i+1]}</td>`;
    } else {
      html+=`<td style="width:50%;"></td>`;
    }
    html+=`</tr>`;
  }
  html+=`</table>`;
  return html;
}




/**
 * A simple function to check if two arrays of strings match exactly
 */
function checkResponse(correctOutput, participantOutput) {
    if (!Array.isArray(correctOutput) || !Array.isArray(participantOutput)) {
        return false;
    }
    if (correctOutput.length !== participantOutput.length) {
        return false;
    }
    for (let i = 0; i < correctOutput.length; i++) {
        if (correctOutput[i] !== participantOutput[i]) {
            return false;
        }
    }
    return true;
}


/** 
 * computeInputOutput(inputArray, EXPERIMENT_PARAMS, "episode1")
 *    Given an array of input symbols (e.g. [1,5], [1,6,2], [2,5,6,4], etc.),
 *    we:
 *      1. Convert each input symbol to either a nonsense word (if 1..4) or identify it as X/Y/Z 
 *      2. Apply the function logic in the correct order (X->Y->Z) using FUNCTION_DEFINITIONS
 *      3. Return the array of final emojis
 *      4. Also return the array of nonsense words for display
 * 
 * NOTE: This example uses a simple left-to-right parser or manually checks how many function IDs
 * are present. If your grammar gets more complex, you might do a more general approach. 
 */
function computeInputOutput(inputArray, EXPERIMENT_PARAMS){
  const items=inputArray.map(sid=>{
    // Episode 1 input-output emoji IDs 1..4 => 'a','b','c','d'
    if(sid >=1 && sid <=4){
      let outID;
      switch(sid){
        case 1: outID='a'; break;
        case 2: outID='b'; break;
        case 3: outID='c'; break;
        case 4: outID='d'; break;
      }
      const emoji = EXPERIMENT_PARAMS.outputID_to_color[outID];
      return [emoji];
    } 
    // Episode 2 input-output emoji IDs
    else if(sid >= 8 && sid <= 11){
      let outID;
      switch(sid){
        case 8: outID='e'; break;
        case 9: outID='f'; break;
        case 10: outID='g'; break;
        case 11: outID='h'; break;
      }
      const emoji = EXPERIMENT_PARAMS.outputID_to_color[outID];
      return [emoji];
    } 
    // Episode 3 input-output emoji IDs
    else if(sid >=15 && sid<=18){
      let outID;
      switch(sid){
        case 15: outID='i'; break;
        case 16: outID='j'; break;
        case 17: outID='k'; break;
        case 18: outID='l'; break;
      }
      const emoji = EXPERIMENT_PARAMS.outputID_to_color[outID];
      return [emoji];
    }
    // Then handle function IDs. Episode 1: 5,6,7
    else if(sid === 5){
      return 'X';
    } else if(sid === 6){
      return 'Y';
    } else if(sid === 7){
      return 'Z';
    }
    // Episode 2 function IDs: 12,13,14
    else if(sid === 12){
      return 'X';
    } else if(sid === 13){
      return 'Y';
    } else if(sid === 14){
      return 'Z';
    }
    // Episode 3 function IDs: 19,20,21
    else if(sid === 19){
      return 'X';
    } else if(sid === 20){
      return 'Y';
    } else if(sid === 21){
      return 'Z';
    }
    // Everything else => null
    return null;
  });

  // Map input ID to nonsense word, e.g. sid=5 => EXPERIMENT_PARAMS.inputID_to_word[5]
  const displayWords=inputArray.map(sid=>{
    return EXPERIMENT_PARAMS.inputID_to_word[sid];
  });

  // pass 1: X
  let arr=applySingleFuncPass(items, 'X', FUNCTION_DEFINITIONS.func1);
  // pass 2: Y
  arr=applyDoubleFuncPass(arr, 'Y', FUNCTION_DEFINITIONS.func2);
  // pass 3: Z
  arr=applyDoubleFuncPass(arr, 'Z', FUNCTION_DEFINITIONS.func3);

  let finalEmojis=[];
  if(arr.length>0 && Array.isArray(arr[0])) finalEmojis=arr[0];

  return {
    inputWords: displayWords,
    outputEmojis: finalEmojis
  };
}


// Helper pass for single-argument function (like X)
function applySingleFuncPass(arr, symbol, func){
    // We scan arr from left to right, whenever we see [arrayOfEmojis, funcSymbol],
  // we replace them with [funcDef(arrayOfEmojis)].
  // E.g. if arr = [ [emoA], 'X', [emoB], 'X' ], we do them in order:
  // first [ [emoA],'X' ] => [ funcDef([emoA]) ], then continue scanning.

  // We'll do multiple passes until no more funcSymbol found
  let i=0;
  while(i<arr.length){
    if(arr[i+1]===symbol){
      const arg=arr[i];
      const result=func([arg]);
      arr.splice(i,2,result);
    } else {
      i++;
    }
  }
  return arr;
}


// Helper pass for two-argument function (like Y or Z)
function applyDoubleFuncPass(arr,symbol,func){
    // We look for pattern [arr1, funcSymbol, arr2].
  // When found, replace them with [funcDef([arr1,arr2])]
  let i=0;
  while(i<arr.length){
    if(arr[i+1]===symbol && (i+2)<arr.length){
      const left=arr[i];
      const right=arr[i+2];
      const result=func([left,right]);
      arr.splice(i,3,result);
    } else {
      i++;
    }
  }
  return arr;
}


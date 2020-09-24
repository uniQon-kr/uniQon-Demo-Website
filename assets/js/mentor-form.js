// boolean variable to keep track whether the form has been updated after last draft save
let isUpdated = false;
let updateTimer = null;
let hooksCount = 1;
let sat2Count = 1;
let apCount = 1;
let honorsCount = 1;
let activitiesCount = 1;
let essayCount = 1;
let additionalCount = 1;

async function hideRemove() {
    if(hooksCount===1){
        document.getElementById("hooks-remove").style.display = "none";
    }if(sat2Count===1){
        document.getElementById("sat2-remove").style.display = "none";
    }if(apCount===1){
        document.getElementById("ap-remove").style.display = "none";
    }if(honorsCount===1){
        document.getElementById("honors-remove").style.display = "none";
    }if(activitiesCount===1){
        document.getElementById("activities-remove").style.display = "none";
    }if(essayCount===1){
        document.getElementById("essay-remove").style.display = "none";
    }if(additionalCount===1){
        document.getElementById("additional-remove").style.display = "none";
    }
}

async function remove(type) {
    let element;
    if(type === "hooks"){
        element = document.getElementById("hooksEntryBox-" + hooksCount);
        element.parentNode.removeChild(element);
        hooksCount--;
    } else if(type === "sat2"){
        element = document.getElementById("sat2EntryBox-" + sat2Count);
        element.parentNode.removeChild(element);
        sat2Count--;
    } else if(type === "ap"){
        element = document.getElementById("apEntryBox-" + apCount);
        element.parentNode.removeChild(element);
        apCount--;
    } else if(type === "honors"){
        element = document.getElementById("honorsEntryBox-" + honorsCount);
        element.parentNode.removeChild(element);
        honorsCount--;
    } else if(type === "activities"){
        element = document.getElementById("activitiesEntryBox-" + activitiesCount);
        element.parentNode.removeChild(element);
        activitiesCount--;
    } else if(type === "essay"){
        element = document.getElementById("essayEntryBox-" + essayCount);
        element.parentNode.removeChild(element);
        essayCount--;
    } else if(type === "additional"){
        element = document.getElementById("additionalEntryBox-" + additionalCount);
        element.parentNode.removeChild(element);
        additionalCount--;
    } hideRemove();
}
async function addMore(type) {
  //add more textfields to its type
  if(type === "hooks"){
    hooksCount++;
    document.getElementById("hooks-remove").style.display = "block";
    document.getElementById("hooks-AM").innerHTML += `
        <div class='entryBoxA' id = 'hooksEntryBox-${hooksCount}''>
            <input id = 'form-hooks-${hooksCount}' onkeypress = 'formUpdated()' type = 'text'/>
        </div>`;
  } else if(type === "sat2"){
    sat2Count++;
    document.getElementById("sat2-remove").style.display = "block";
    document.getElementById("sat2-AM").innerHTML += `
        <div class='entryBoxA' id = 'sat2EntryBox-${sat2Count}'>
            <input id = 'form-sat2-subject-${sat2Count}' onkeypress = 'formUpdated()' type = 'text' placeholder= 'Subject'/>
            <input id = 'form-sat2-score-${sat2Count}' onkeypress = 'formUpdated()' type = 'text' placeholder= 'Score'/>
        </div>`;
  } else if(type === "ap"){
    apCount++;
    document.getElementById("ap-remove").style.display = "block";
    document.getElementById("ap-AM").innerHTML += `
        <div class='entryBoxA' id = 'apEntryBox-${apCount}'>
            <input id = 'form-ap-subject-${apCount}' onkeypress = 'formUpdated()' type = 'text' placeholder='Subject'/>
            <input id = 'form-ap-score-${apCount}' onkeypress = 'formUpdated()' type = 'text' placeholder='Score'/>
        </div>`;
  } else if(type === "honors"){
    honorsCount++;
    document.getElementById("honors-remove").style.display = "block";
    document.getElementById("honors-AM").innerHTML += `
        <div class='entryBox' id = 'honorsEntryBox-${honorsCount}'>
            <p class = 'content-title'>Title</p>
            <input class = 'required' id = 'form-honors-title-${honorsCount}' onkeypress = 'formUpdated()'' onchange = "requiredCheck('form-honors-title-${honorsCount}')" type = 'text'/>
            <p class = 'content-title'>Grade Level</p>
            <div class = 'checkboxes required' id = "h${honorsCount}">
                <input type='checkbox' id='h${honorsCount}-9' onclick = 'formUpdated()' onchange = "requiredCheckBox('h${honorsCount}')" value='9'><label>9</label>
                <input type='checkbox' id='h${honorsCount}-10' onclick = 'formUpdated()' onchange = "requiredCheckBox('h${honorsCount}')" value='10'><label>10</label>
                <input type='checkbox' id='h${honorsCount}-11' onclick = 'formUpdated()' onchange = "requiredCheckBox('h${honorsCount}')" value='11'><label>11</label>
                <input type='checkbox' id='h${honorsCount}-12' onclick = 'formUpdated()' onchange = "requiredCheckBox('h${honorsCount}')" value='12'><label>12</label>
                <input type='checkbox' id='h${honorsCount}-13' onclick = 'formUpdated()' onchange = "requiredCheckBox('h${honorsCount}')" value='13'><label>Post-Graduate</label>
            </div>
            <p class = 'content-title'>Level of Recognition</p>
            <input class = 'required' id = 'form-honors-lvl-${honorsCount}' onclick = 'formUpdated()' onchange = "requiredCheck('form-honors-lvl-${honorsCount}')" type = 'text'/>
        </div>`;
  } else if(type === "activities"){
    activitiesCount++;
    document.getElementById("activities-remove").style.display = "block";
    document.getElementById("activities-AM").innerHTML += `
        <div class='entryBox' id = 'activitiesEntryBox-${activitiesCount}'>
            <p class = 'content-title'>Title</p>
            <input class = 'required' id = 'form-activities-type-${activitiesCount}' onkeypress = 'formUpdated()' onchange = "requiredCheck('form-activities-type-${activitiesCount}')" type = 'text'/> 
            <p class = 'content-title'>Position</p>
            <input class = 'required' id = 'form-activities-position-${activitiesCount}' onkeypress = 'formUpdated()' onchange = "requiredCheck('form-activities-position-${activitiesCount}')" type = 'text'/>
            <p class = 'content-title'>Organization</p>
            <input class = 'required' id = 'form-activities-organization-${activitiesCount}' onkeypress = 'formUpdated()' onchange = "requiredCheck('form-activities-organization-${activitiesCount}')" type = 'text'/>
            <p class = 'content-title'>Description</p>
            <input class = 'required' id = 'form-activities-description-${activitiesCount}' onkeypress = 'formUpdated()' onchange = "requiredCheck('form-activities-description-${activitiesCount}')" type = 'text'/>
            <p class = 'content-title'>Participation Grade</p>
            <div class = 'checkboxes required' id = "a${activitiesCount}">
                <input type='checkbox' id='a${activitiesCount}-9' onkeypress = 'formUpdated()' onchange = "requiredCheck('a${activitiesCount}')" value='9'><label>9</label>
                <input type='checkbox' id='a${activitiesCount}-10' onkeypress = 'formUpdated()' onchange = "requiredCheck('a${activitiesCount}')" value='10'><label>10</label>
                <input type='checkbox' id='a${activitiesCount}-11' onkeypress = 'formUpdated()' onchange = "requiredCheck('a${activitiesCount}')" value='11'><label>11</label>
                <input type='checkbox' id='a${activitiesCount}-12' onkeypress = 'formUpdated()' onchange = "requiredCheck('a${activitiesCount}')" value='12'><label>12</label>
                <input type='checkbox' id='a${activitiesCount}-13' onkeypress = 'formUpdated()' onchange = "requiredCheck('a${activitiesCount}')" value='13'><label>Post-Graduate</label>
            </div>
            <p class = 'content-title'>Time of Participation</p>
            <input class = 'required id = 'form-activities-time-${activitiesCount}' onkeypress = 'formUpdated()' onchange = "requiredCheck('form-activities-time-${activitiesCount}')" type = 'text'/>
        </div>`;
  } else if(type === "essay"){
    essayCount++;
    document.getElementById("essay-remove").style.display = "block";
    document.getElementById("essay-AM").innerHTML += `
        <div class='entryBox' id = 'essayEntryBox-${essayCount}'>
            <input class = 'required' id = 'form-essay-prompt-${essayCount}' onkeypress = 'formUpdated()' onchange = "requiredCheck('form-essay-prompt-${essayCount}')" type = 'text' placeholder='Prompt'/>
            <textarea class = 'essay required' id = 'essay-${essayCount}' onkeypress = 'formUpdated()' onchange = "requiredCheck('essay-${essayCount}')"></textarea>
        </div>`;
  }else if(type === "additional"){
    additionalCount++;
    document.getElementById("additional-remove").style.display = "block";
    document.getElementById("additional-AM").innerHTML += `
        <div class='entryBox' id = 'additionalEntryBox-${additionalCount}'>
            <textarea class = 'essay' id='additional-${additionalCount}' onkeypress = 'formUpdated()'></textarea>
        </div>`;
  }
}

async function loadDraft() {
    // TODO: function to load draft when the page first loaded
}

async function submit() {
    // TODO: submit the form as final version

    // TODO: renew token
}

async function saveDraft() {
    // TODO: save as draft

    // TODO: renew token

    // clear timer after draft submit
    clearInterval(updateTimer);
    updateTimer = null;
}

// change isUpdated to true (on key press for all text field)
function formUpdated() {
    isUpdated = true;
    
    // When timer unsetted, set and start (3min)
    if (updateTimer == null) {
        updateTimer = setInterval(() => {
            saveDraft();
        }, 180000);
    }
}

function requiredScore() {
    // retrieve test byte
    let actByte, satByte; // 0: all clear, 1: part set, 2: all set
    const actEng = (document.getElementById("form-act-eng").value !== "");
    const actMath = (document.getElementById("form-act-math").value !== "");
    const actRd = (document.getElementById("form-act-rd").value !== "");
    const actSci = (document.getElementById("form-act-sci").value !== "");
    const satEng = (document.getElementById("form-sat1-english").value !== "");
    const satMath = (document.getElementById("form-sat1-math").value !== "");

    if(actEng && actMath && actRd && actSci) { // act All Set
        actByte = 2;
    } else if(!actEng && !actMath && !actRd && !actSci) { // act All Clear
        actByte = 0;
    } else {
        actByte = 1;
    }

    if(satEng && satMath) { // sat all set
        satByte = 2;
    } else if(!satEng && !satMath) { // sat all clear
        satByte = 0;
    } else {
        satByte = 1;
    }

    if(actByte === 2) {
        document.getElementById("form-act-eng").style.backgroundColor = "#fcfcfc";
        document.getElementById("form-act-math").style.backgroundColor = "#fcfcfc";
        document.getElementById("form-act-rd").style.backgroundColor = "#fcfcfc";
        document.getElementById("form-act-sci").style.backgroundColor = "#fcfcfc";
        if(satByte === 1) {
            document.getElementById("form-sat1-english").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-sat1-math").style.backgroundColor = "#ffe4e4";
        } else {
            document.getElementById("form-sat1-english").style.backgroundColor = "#fcfcfc";
            document.getElementById("form-sat1-math").style.backgroundColor = "#fcfcfc";
        }
    } else if(actByte === 1) {
        document.getElementById("form-act-eng").style.backgroundColor = "#ffe4e4";
        document.getElementById("form-act-math").style.backgroundColor = "#ffe4e4";
        document.getElementById("form-act-rd").style.backgroundColor = "#ffe4e4";
        document.getElementById("form-act-sci").style.backgroundColor = "#ffe4e4";
        if(satByte === 2) {
            document.getElementById("form-sat1-english").style.backgroundColor = "#fcfcfc";
            document.getElementById("form-sat1-math").style.backgroundColor = "#fcfcfc";
        } else {
            document.getElementById("form-sat1-english").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-sat1-math").style.backgroundColor = "#ffe4e4";
        }
    } else {
        if(satByte === 2) {
            document.getElementById("form-sat1-english").style.backgroundColor = "#fcfcfc";
            document.getElementById("form-sat1-math").style.backgroundColor = "#fcfcfc";
            document.getElementById("form-act-eng").style.backgroundColor = "#fcfcfc";
            document.getElementById("form-act-math").style.backgroundColor = "#fcfcfc";
            document.getElementById("form-act-rd").style.backgroundColor = "#fcfcfc";
            document.getElementById("form-act-sci").style.backgroundColor = "#fcfcfc";
        } else {
            document.getElementById("form-act-eng").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-act-math").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-act-rd").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-act-sci").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-sat1-english").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-sat1-math").style.backgroundColor = "#ffe4e4";
        }
    }
}

function requiredCheck(inputFieldID) {
    // check whether input field is written or not
    if(document.getElementById(inputFieldID).value !== "") { // when field contains value
        // unset background
        document.getElementById(inputFieldID).style.backgroundColor = "#fcfcfc";
    } else {
        // set background
        document.getElementById(inputFieldID).style.backgroundColor = "#ffe4e4";
    }
}

function requiredCheckBox(inputFieldID) {
    if(document.getElementById(inputFieldID + "-9").checked === false && 
        document.getElementById(inputFieldID + "-10").checked === false && 
        document.getElementById(inputFieldID + "-11").checked === false && 
        document.getElementById(inputFieldID + "-12").checked === false && 
        document.getElementById(inputFieldID + "-13").checked === false) {
            // set background
            document.getElementById(inputFieldID).style.backgroundColor = "#ffe4e4";
    } else {
        // unset background if at least one element is clicked
        document.getElementById(inputFieldID).style.backgroundColor = "#fcfcfc";
    }
}

function satActCheck(inputFieldID) {
    // TODO: check whether input field is written or not
    
    formUpdated();
}

loadDraft();
hideRemove()
// start timer, save every one min
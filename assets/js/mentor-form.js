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

async function addMore(type) {
  //add more textfields to its type
  if(type === "hooks"){
    hooksCount++;
    document.getElementById("hooks-AM").innerHTML += "<div class='entrybox' id = 'hooksEntryBox-" + hooksCount +"'><input id = 'form-hooks-" + hooksCount +"' onkeypress = 'formUpdated()' type = 'text'/></div>";
  } else if(type === "sat2"){
    sat2Count++;
    document.getElementById("sat2-AM").innerHTML +="<div class='entrybox' id = 'sat2EntryBox-" + 
      sat2Count + "'><input id = 'form-sat2-subject-" + 
      sat2Count + "' onkeypress = 'formUpdated()' type = 'text' placeholder= 'Subject'/><input id = 'form-sat2-score-" + 
      sat2Count + "' onkeypress = 'formUpdated()' type = 'text' placeholder= 'Score'/></div>";
  } else if(type === "ap"){
    apCount++;
    document.getElementById("ap-AM").innerHTML +="<div class='entrybox' id = 'apEntryBox-"+
      apCount+"'><input id = 'form-ap-subject-"+
      apCount+"' onkeypress = 'formUpdated()' type = 'text' placeholder='Subject'/><input id = 'form-ap-score-"+ 
      apCount+"' onkeypress = 'formUpdated()' type = 'text' placeholder='Score'/></div>";
  } else if(type === "honors"){
    honorsCount++;
    document.getElementById("honors-AM").innerHTML +="<div class='entrybox' id = 'honorsEntryBox-"+
      honorsCount+"'><p class = 'content-title'>Title</p><input class = 'required' id = 'form-honors-title-"+
      honorsCount+"'  onkeypress = 'formUpdated()'' onchange = 'requiredCheck('form-honors-title-1')'' type = 'text'/><p class = 'content-title'>Grade Level</p><div class = 'checkboxes required'><input type='checkbox' id='h"+
      honorsCount+"-9' onclick = 'formUpdated()'' onchange = 'requiredCheckBox('h"+
      honorsCount+"')' value='9'><label>9</label><input type='checkbox' id='h"+
      honorsCount+"-10' onclick = 'formUpdated()'' onchange = 'requiredCheckBox('h"+
      honorsCount+"')' value='10'><label>10</label><input type='checkbox' id='h"+
      honorsCount+"-11' onclick = 'formUpdated()'' onchange = 'requiredCheckBox('h"+
      honorsCount+"')' value='11'><label>11</label><input type='checkbox' id='h"+
      honorsCount+"-12' onclick = 'formUpdated()'' onchange = 'requiredCheckBox('h"+
      honorsCount+"')' value='12'><label>12</label><input type='checkbox' id='h"+
      honorsCount+"-13' onclick = 'formUpdated()'' onchange = 'requiredCheckBox('h"+
      honorsCount+"')' value='13'><label>Post-Graduate</label></div><p class = 'content-title'>Level of Recognition</p><input class = 'required' id = 'form-honors-lvl-"+
      honorsCount+"' onclick = 'formUpdated()'' onchange = 'requiredCheck('form-honors-lvl-"+
      honorsCount+"')' type = 'text'/></div>";
  } else if(type === "activities"){
    activitiesCount++;
    document.getElementById("activities-AM").innerHTML +="<div class='entrybox' id = 'activitiesEntryBox-"+
      activitiesCount+"'><p class = 'content-title'>Title</p><input class = 'required' id = 'form-activities-type-"+
      activitiesCount+"' onkeypress = 'formUpdated()' onchange = 'requiredCheck('form-activities-type-"+
      activitiesCount+"')' type = 'text'/><p class = 'content-title'>Position</p><input class = 'required' id = 'form-activities-position-"+
      activitiesCount+"' onkeypress = 'formUpdated()' onchange = 'requiredCheck('form-activities-position-"+
      activitiesCount+"')' type = 'text'/><p class = 'content-title'>Organization</p><input class = 'required' id = 'form-activities-organization-"+
      activitiesCount+"' onkeypress = 'formUpdated()' onchange = 'requiredCheck('form-activities-organization-"+
      activitiesCount+"')' type = 'text'/><p class = 'content-title'>Description</p><input class = 'required' id = 'form-activities-description-"+
      activitiesCount+"' onkeypress = 'formUpdated()' onchange = 'requiredCheck('form-activities-description-"+
      activitiesCount+"')' type = 'text'/><p class = 'content-title'>Participation Grade</p><div class = 'checkboxes required'><input type='checkbox' id='a"+
      activitiesCount+"-9' onkeypress = 'formUpdated()' onchange = 'requiredCheck('a"+
      activitiesCount+"')' value='9'><label>9</label><input type='checkbox' id='a"+
      activitiesCount+"-10' onkeypress = 'formUpdated()' onchange = 'requiredCheck('a"+
      activitiesCount+"')' value='10'><label>10</label><input type='checkbox' id='a"+
      activitiesCount+"-11' onkeypress = 'formUpdated()' onchange = 'requiredCheck('a"+
      activitiesCount+"')' value='11'><label>11</label><input type='checkbox' id='a"+
      activitiesCount+"-12' onkeypress = 'formUpdated()' onchange = 'requiredCheck('a"+
      activitiesCount+"')' value='12'><label>12</label><input type='checkbox' id='a"+
      activitiesCount+"-13' onkeypress = 'formUpdated()' onchange = 'requiredCheck('a"+
      activitiesCount+"-13' onkeypress = 'formUpdated()' onchange = 'requiredCheck('a"+
      activitiesCount+"')' value='13'><label>Post-Graduate</label></div><p class = 'content-title'>Time of Participation</p><input class = 'required id = 'form-activities-time-"+
      activitiesCount+"' onkeypress = 'formUpdated()' onchange = 'requiredCheck('form-activities-time-"+
      activitiesCount+"')' type = 'text'/></div>";
      activitiesCount++;
  } else if(type === "essay"){
    essayCount++;
    document.getElementById("essay-AM").innerHTML +="<div class='entrybox' id = 'essayEntryBox-"+
      essayCount+"'><input class = 'required' id = 'form-essay-prompt-"+
      essayCount+"' onkeypress = 'formUpdated()' onchange = 'requiredCheck('form-essay-prompt-"+
      essayCount+"')'  type = 'text' placeholder='Prompt'/><textarea class = 'essay required' id= essay-"+
      essayCount+"' onkeypress = 'formUpdated()'' onchange = 'requiredCheck('essay-"+
      essayCount+"')''></textarea></div>";
  }else if(type === "additional"){
    additionalCount++;
    document.getElementById("additional-AM").innerHTML +="<div class='entrybox' id = 'additionalEntryBox-"+
      additionalCount+"'><textarea class = 'essay' id='additional-"+
      additionalCount+"' onkeypress = 'formUpdated()'></textarea></div>";
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

// start timer, save every one min
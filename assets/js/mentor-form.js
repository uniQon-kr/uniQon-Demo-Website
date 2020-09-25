---
---

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
    let elm;
  //add more textfields to its type
  if(type === "hooks"){
    hooksCount++;
    document.getElementById("hooks-remove").style.display = "block";
    document.getElementById("hooks-AM").insertAdjacentHTML( 'beforeend',`
        <div class='entryBoxA' id = 'hooksEntryBox-${hooksCount}''>
            <input id = 'form-hooks-${hooksCount}' onkeypress = 'formUpdated()' type = 'text'/>
        </div>`);
  } else if(type === "sat2"){
    sat2Count++;
    document.getElementById("sat2-remove").style.display = "block";
    document.getElementById("sat2-AM").insertAdjacentHTML( 'beforeend',`
        <div class='entryBoxA' id = 'sat2EntryBox-${sat2Count}'>
            <input id = 'form-sat2-subject-${sat2Count}' onkeypress = 'formUpdated()' type = 'text' placeholder= 'Subject'/>
            <input id = 'form-sat2-score-${sat2Count}' onkeypress = 'formUpdated()' type = 'text' placeholder= 'Score'/>
        </div>`);
  } else if(type === "ap"){
    apCount++;
    document.getElementById("ap-remove").style.display = "block";
    document.getElementById("ap-AM").insertAdjacentHTML( 'beforeend',`
        <div class='entryBoxA' id = 'apEntryBox-${apCount}'>
            <input id = 'form-ap-subject-${apCount}' onkeypress = 'formUpdated()' type = 'text' placeholder='Subject'/>
            <input id = 'form-ap-score-${apCount}' onkeypress = 'formUpdated()' type = 'text' placeholder='Score'/>
        </div>`);
  } else if(type === "honors"){
    honorsCount++;
    document.getElementById("honors-remove").style.display = "block";
    document.getElementById("honors-AM").insertAdjacentHTML( 'beforeend',`
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
        </div>`);
  } else if(type === "activities"){
    activitiesCount++;
    document.getElementById("activities-remove").style.display = "block";
    document.getElementById("activities-AM").insertAdjacentHTML( 'beforeend',`
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
            <input class = 'required' id = 'form-activities-time-${activitiesCount}' onkeypress = 'formUpdated()' onchange = "requiredCheck('form-activities-time-${activitiesCount}')" type = 'text'/>
        </div>`);
  } else if(type === "essay"){
    essayCount++;
    document.getElementById("essay-remove").style.display = "block";
    document.getElementById("essay-AM").insertAdjacentHTML( 'beforeend',`
        <div class='entryBox' id = 'essayEntryBox-${essayCount}'>
            <input class = 'required' id = 'form-essay-prompt-${essayCount}' onkeypress = 'formUpdated()' onchange = "requiredCheck('form-essay-prompt-${essayCount}')" type = 'text' placeholder='Prompt'/>
            <textarea class = 'essay required' id = 'form-essay-statement-${essayCount}' onkeypress = 'formUpdated()' onchange = "requiredCheck('form-essay-statement-${essayCount}')"></textarea>
        </div>`);
  }else if(type === "additional"){
    additionalCount++;
    document.getElementById("additional-remove").style.display = "block";
    document.getElementById("additional-AM").insertAdjacentHTML( 'beforeend',`
        <div class='entryBox' id = 'additionalEntryBox-${additionalCount}'>
            <textarea class = 'essay' id='additional-${additionalCount}' onkeypress = 'formUpdated()'></textarea>
        </div>`);
  }
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
    const actEng = (document.getElementById("form-act-english").value !== "");
    const actMath = (document.getElementById("form-act-math").value !== "");
    const actRd = (document.getElementById("form-act-reading").value !== "");
    const actSci = (document.getElementById("form-act-science").value !== "");
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
        document.getElementById("form-act-english").style.backgroundColor = "#fcfcfc";
        document.getElementById("form-act-math").style.backgroundColor = "#fcfcfc";
        document.getElementById("form-act-reading").style.backgroundColor = "#fcfcfc";
        document.getElementById("form-act-science").style.backgroundColor = "#fcfcfc";
        if(satByte === 1) {
            document.getElementById("form-sat1-english").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-sat1-math").style.backgroundColor = "#ffe4e4";
        } else {
            document.getElementById("form-sat1-english").style.backgroundColor = "#fcfcfc";
            document.getElementById("form-sat1-math").style.backgroundColor = "#fcfcfc";
        }
    } else if(actByte === 1) {
        document.getElementById("form-act-english").style.backgroundColor = "#ffe4e4";
        document.getElementById("form-act-math").style.backgroundColor = "#ffe4e4";
        document.getElementById("form-act-reading").style.backgroundColor = "#ffe4e4";
        document.getElementById("form-act-science").style.backgroundColor = "#ffe4e4";
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
            document.getElementById("form-act-english").style.backgroundColor = "#fcfcfc";
            document.getElementById("form-act-math").style.backgroundColor = "#fcfcfc";
            document.getElementById("form-act-reading").style.backgroundColor = "#fcfcfc";
            document.getElementById("form-act-science").style.backgroundColor = "#fcfcfc";
        } else {
            document.getElementById("form-act-english").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-act-math").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-act-reading").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-act-science").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-sat1-english").style.backgroundColor = "#ffe4e4";
            document.getElementById("form-sat1-math").style.backgroundColor = "#ffe4e4";
        }
    }
}

function satEssayCheck() {
    const reading = (document.getElementById("form-sat1-reading").value !== "");
    const analysis = (document.getElementById("form-sat1-analysis").value !== "");
    const writing = (document.getElementById("form-sat1-writing").value !== "");

    if((reading && analysis && writing) || (!reading && !analysis && !writing)) {
        document.getElementById("form-sat1-reading").style.backgroundColor = "#fcfcfc";
        document.getElementById("form-sat1-analysis").style.backgroundColor = "#fcfcfc";
        document.getElementById("form-sat1-writing").style.backgroundColor = "#fcfcfc";
    } else {
        document.getElementById("form-sat1-reading").style.backgroundColor = "#ffe4e4";
        document.getElementById("form-sat1-analysis").style.backgroundColor = "#ffe4e4";
        document.getElementById("form-sat1-writing").style.backgroundColor = "#ffe4e4";
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

// function to load draft when the page first loaded
async function loadDraft() {
    const response = await fetch('https://api.uniqon.kr/document/application/draft', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const jsonResponse = await response.json();
    const draft = jsonResponse.draft;

    if(response.status === 401 || (response.status === 403 && jsonResponse.error !== "Forbidden: Not A Mentor")) {
        // renew token
        await renew();
        if(localStorage.getItem("uniQonSignedIn")) {
            await loadDraft();
        }
    } else if(response.ok) {
        const draft = jsonResponse.draft;
        
        //fill up the text fields
        if(draft.college != null) {
            if(draft.college.name != null) {
                document.getElementById("form-college").value = draft.college.name;
                requiredCheck("form-college");
            }
            if(draft.college.admittedMajor != null) {
                document.getElementById("form-major").value = draft.college.admittedMajor;
                requiredCheck("form-major");
            }
            if(draft.college.grad != null) {
                document.getElementById("form-grad").value = draft.college.grad;
                requiredCheck("form-grad");
            }
        }

        if(draft.background != null) {
            if(draft.background.citizenship != null) {
                document.getElementById("form-citizenship").value = draft.background.citizenship;
                requiredCheck("form-citizenship");
            }
            if(draft.background.gender != null) {
                document.getElementById("form-gender").value = draft.background.gender;
                requiredCheck("form-gender");
            }
            if(draft.background.ethnicity != null) {
                document.getElementById("form-ethnicity").value = draft.background.ethnicity;
                requiredCheck("form-ethnicity");
            }
            if(draft.background.hooks.length>0 || draft.background.hooks!=null){
                document.getElementById("form-hooks-1").value = draft.background.hooks[0];
                
                if(draft.background.hooks.length>1){
                    while(hooksCount < draft.background.hooks.length){
                        addMore('hooks');
                        document.getElementById("form-hooks-"+(hooksCount)).value = draft.background.hooks[hooksCount-1];
                    }
                }
            }
        }

        if(draft.academics != null) {
            if(draft.academics.weightedGPA != null){
                document.getElementById("form-gpa").value = draft.academics.weightedGPA;
                requiredCheck("form-gpa");
            }
            if(draft.academics.sat1 != null){
                if(draft.academics.sat1.readingWriting != null){
                    document.getElementById("form-sat1-english").value = draft.academics.sat1.readingWriting;
                }
                if(draft.academics.sat1.math != null){
                    document.getElementById("form-sat1-math").value = draft.academics.sat1.math;
                    requiredScore();
                }
                if(Object.keys(draft.academics.sat1).length === 3){
                    if(draft.academics.sat1.essay.reading != null){
                        document.getElementById("form-sat1-reading").value = draft.academics.sat1.essay.reading;
                    }
                    if(draft.academics.sat1.essay.analysis != null){
                        document.getElementById("form-sat1-analysis").value = draft.academics.sat1.essay.analysis;
                    }
                    if(draft.academics.sat1.essay.writing != null){
                        document.getElementById("form-sat1-writing").value = draft.academics.sat1.essay.writing;
                    }
                    satEssayCheck();
                }
            }
            if(draft.academics.act != null){
                if(draft.academics.act.english != null){
                    document.getElementById("form-act-english").value = draft.academics.act.english;
                }
                if(draft.academics.act.math != null){
                    document.getElementById("form-act-math").value = draft.academics.act.math;
                }
                if(draft.academics.act.reading != null){
                    document.getElementById("form-act-reading").value = draft.academics.act.reading;
                }
                if(draft.academics.act.science != null){
                    document.getElementById("form-act-science").value = draft.academics.act.science;
                    requiredScore();
                }
                if(Object.keys(draft.academics.act).length === 5){
                    if(draft.academics.act.essay.reading != null){
                        document.getElementById("form-act-writing").value = draft.academics.act.writing;
                    }
                }
            }
            if(draft.academics.sat2 != null){
                if(draft.academics.sat2.length>0 || draft.academics.sat2 ===null){
                    let key= Object.keys(draft.academics.sat2[0])[0]
                    document.getElementById("form-sat2-subject-1").value = key;
                    if(draft.academics.sat2[0][key]!==null){
                        document.getElementById("form-sat2-score-1").value = draft.academics.sat2[0][key];
                    }
                    
                    if(draft.academics.sat2.length>1){
                        while(sat2Count < draft.academics.sat2.length){
                            addMore('sat2');
                            key= Object.keys(draft.academics.sat2[sat2Count-1])[0]
                            document.getElementById("form-sat2-subject-"+sat2Count).value = key;
                            if(draft.academics.sat2[sat2Count-1][key]!==null){
                                document.getElementById("form-sat2-score-"+sat2Count).value = draft.academics.sat2[sat2Count-1][key];
                            }
                        }
                    }
                }
            }
            if(draft.academics.ap != null){
                if(draft.academics.ap.length>0 || draft.academics.ap !=null){
                    key= Object.keys(draft.academics.ap[0])[0];
                    document.getElementById("form-ap-subject-1").value = key;
                    if(draft.academics.ap[0][key]!==null){
                        document.getElementById("form-ap-score-1").value = draft.academics.ap[0][key];
                    }
                    
                    if(draft.academics.ap.length>1){
                        while(apCount < draft.academics.ap.length){
                            addMore('ap');
                            key= Object.keys(draft.academics.ap[apCount-1])[0]
                            document.getElementById("form-ap-subject-"+apCount).value = key;
                            if(draft.academics.ap[apCount-1][key]!==null){
                                document.getElementById("form-ap-score-"+apCount).value = draft.academics.ap[apCount-1][key];
                            }
                        }
                    }
                }
            }
        }
        if(draft.honors != null) {
            if(draft.honors.contents.length>0 || draft.honors.contents != null) {
                document.getElementById("form-honors-title-1").value = draft.honors.contents[0]['title'];
                requiredCheck("form-honors-title-1");
                if(draft.honors.contents[0]['gradeLevel'].length>0 || draft.honors.contents['gradeLevel'] != null){
                    if(draft.honors.contents[0]['gradeLevel'].includes(9)){
                        document.getElementById("h1-9").checked = true;
                        requiredCheck("h1");
                    }
                    if(draft.honors.contents[0]['gradeLevel'].includes(10)){
                        document.getElementById("h1-10").checked = true;
                        requiredCheck("h1");
                    }
                    if(draft.honors.contents[0]['gradeLevel'].includes(11)){
                        document.getElementById("h1-11").checked = true;
                        requiredCheck("h1");
                    }
                    if(draft.honors.contents[0]['gradeLevel'].includes(12)){
                        document.getElementById("h1-12").checked = true;
                        requiredCheck("h1");
                    }
                    if(draft.honors.contents[0]['gradeLevel'].includes(13)){
                        document.getElementById("h1-13").checked = true;
                        requiredCheck("h1");
                    }
                }
                document.getElementById("form-honors-lvl-1").value = draft.honors.contents[0]['levelOfRecognition'];
                requiredCheck("form-honors-lvl-1");
                
                if(draft.honors.contents.length>1){
                    while(honorsCount < draft.honors.contents.length){
                        addMore('honors');
                        document.getElementById("form-honors-title-" + honorsCount).value = draft.honors.contents[honorsCount-1]['title'];
                        requiredCheck("form-honors-title-" + honorsCount);
                        if(draft.honors.contents[honorsCount-1]['gradeLevel'].length>0 || draft.honors.contents['gradeLevel'] != null){
                            if(draft.honors.contents[honorsCount-1]['gradeLevel'].includes(9)){
                                document.getElementById("h"+honorsCount+"-9").checked = true;
                                requiredCheck("h" + honorsCount);
                            }
                            if(draft.honors.contents[honorsCount-1]['gradeLevel'].includes(10)){
                                document.getElementById("h"+honorsCount+"-10").checked = true;
                                requiredCheck("h" + honorsCount);
                            }
                            if(draft.honors.contents[honorsCount-1]['gradeLevel'].includes(11)){
                                document.getElementById("h"+honorsCount+"-11").checked = true;
                                requiredCheck("h" + honorsCount);
                            }
                            if(draft.honors.contents[honorsCount-1]['gradeLevel'].includes(12)){
                                document.getElementById("h"+honorsCount+"-12").checked = true;
                                requiredCheck("h" + honorsCount);
                            }
                            if(draft.honors.contents[honorsCount-1]['gradeLevel'].includes(13)){
                                document.getElementById("h"+honorsCount+"-13").checked = true;
                                requiredCheck("h" + honorsCount);
                            }
                        }
                        document.getElementById("form-honors-lvl-" + honorsCount).value = draft.honors.contents[honorsCount-1]['levelOfRecognition'];
                        requiredCheck("form-honors-lvl-" + honorsCount);
                    }
                }
            }
        }
        if(draft.activities != null) {
            if(draft.activities != null) {
                if(draft.activities.contents.length>0 || draft.activities.contents != null) {
                    document.getElementById("form-activities-type-1").value = draft.activities.contents[0]['type'];
                    requiredCheck("form-activities-type-1");
                    document.getElementById("form-activities-position-1").value = draft.activities.contents[0]['position'];
                    requiredCheck("form-activities-position-1");
                    document.getElementById("form-activities-organization-1").value = draft.activities.contents[0]['organization'];
                    requiredCheck("form-activities-organization-1");
                    document.getElementById("form-activities-description-1").value = draft.activities.contents[0]['description'];
                    requiredCheck("form-activities-description-1");
                    if(draft.activities.contents[0]['participationGradeLevel'].length>0 || draft.activities.contents['participationGradeLevel'] != null){
                        if(draft.activities.contents[0]['participationGradeLevel'].includes(9)){
                            document.getElementById("a1-9").checked = true;
                            requiredCheck("a" + activitiesCount);
                        }
                        if(draft.activities.contents[0]['participationGradeLevel'].includes(10)){
                            document.getElementById("a1-10").checked = true;
                            requiredCheck("a" + activitiesCount);
                        }
                        if(draft.activities.contents[0]['participationGradeLevel'].includes(11)){
                            document.getElementById("a1-11").checked = true;
                            requiredCheck("a" + activitiesCount);
                        }
                        if(draft.activities.contents[0]['participationGradeLevel'].includes(12)){
                            document.getElementById("a1-12").checked = true;
                            requiredCheck("a" + activitiesCount);
                        }
                        if(draft.activities.contents[0]['participationGradeLevel'].includes(13)){
                            document.getElementById("a1-13").checked = true;
                            requiredCheck("a" + activitiesCount);
                        }
                    }
                    document.getElementById("form-activities-time-1").value = draft.activities.contents[0]['timeOfParticipation'];
                    requiredCheck("form-activities-time-1");
                    
                    if(draft.activities.contents.length>1){
                        while(activitiesCount < draft.activities.contents.length){
                            addMore('activities');
                            document.getElementById("form-activities-type-"+activitiesCount).value = draft.activities.contents[activitiesCount-1]['type'];
                            requiredCheck("form-activities-type-" + activitiesCount);
                            document.getElementById("form-activities-position-"+activitiesCount).value = draft.activities.contents[activitiesCount-1]['position'];
                            requiredCheck("form-activities-position-" + activitiesCount);
                            document.getElementById("form-activities-organization-"+activitiesCount).value = draft.activities.contents[activitiesCount-1]['organization'];
                            requiredCheck("form-activities-organization-" + activitiesCount);
                            document.getElementById("form-activities-description-"+activitiesCount).value = draft.activities.contents[activitiesCount-1]['description'];
                            requiredCheck("form-activities-description-" + activitiesCount);
                            if(draft.activities.contents[0]['participationGradeLevel'].length>0 || draft.activities.contents['participationGradeLevel'] != null){
                                if(draft.activities.contents[0]['participationGradeLevel'].includes(9)){
                                    document.getElementById("a"+activitiesCount+"-9").checked = true;
                                    requiredCheck("a" + activitiesCount);
                                }
                                if(draft.activities.contents[0]['participationGradeLevel'].includes(10)){
                                    document.getElementById("a"+activitiesCount+"-10").checked = true;
                                    requiredCheck("a" + activitiesCount);
                                }
                                if(draft.activities.contents[0]['participationGradeLevel'].includes(11)){
                                    document.getElementById("a"+activitiesCount+"-11").checked = true;
                                    requiredCheck("a" + activitiesCount);
                                }
                                if(draft.activities.contents[0]['participationGradeLevel'].includes(12)){
                                    document.getElementById("a"+activitiesCount+"-12").checked = true;
                                    requiredCheck("a" + activitiesCount);
                                }
                                if(draft.activities.contents[0]['participationGradeLevel'].includes(13)){
                                    document.getElementById("a"+activitiesCount+"-13").checked = true;
                                    requiredCheck("a" + activitiesCount);
                                }
                            }
                            document.getElementById("form-activities-time-" + activitiesCount).value = draft.activities.contents[activitiesCount-1]['timeOfParticipation'];
                            requiredCheck("form-activities-time-" + activitiesCount);
                        }
                    }
                }
            }
        }
        if(draft.essay != null) {
            if(draft.essay.contents.length>0 || draft.essay.contents != null) {
                document.getElementById("form-essay-prompt-1").value = draft.essay.contents[0]['prompt'];
                requiredCheck("form-essay-prompt-1");
                document.getElementById("form-essay-statement-1").value = draft.essay.contents[0]['statement'];
                requiredCheck("form-essay-statement-1");
                
                if(draft.essay.contents.length>1){
                    while(essayCount < draft.essay.contents.length){
                        addMore('essay');
                        document.getElementById("form-essay-prompt-" + essayCount).value = draft.essay.contents[essayCount-1]['prompt'];
                        requiredCheck("form-essay-prompt-" + essayCount);
                        document.getElementById("form-essay-statement-" + essayCount).value = draft.essay.contents[essayCount-1]['statement'];
                        requiredCheck("form-essay-statement-" + essayCount);
                    }
                }
            }
        }
        if(draft.additional != null) {
            if(draft.additional.contents.length>0 || draft.additional.contents != null) {
                document.getElementById("additional-1").value = draft.additional.contents[0];
                requiredCheck("additional-1");
                
                if(draft.additional.contents.length>1){
                    while(additionalCount < draft.additional.contents.length){
                        addMore('additional');
                        document.getElementById("additional-" + additionalCount).value = draft.additional.contents[additionalCount-1];
                        requiredCheck("additional-" + additionalCount);
                    }
                }
            }

        }   
    } else if(response.status !== 404) {
        alert("Server Error!! Please Try Again!!");
        location.href = "{{ site.baseurl }}/";
    }
}
async function submit() {
    // TODO: submit the form as final version

    // TODO: renew token
}

async function saveDraft() {
    // Generating Document
    const request = {};
    if(document.getElementByID("form-college").value !== "") {
        if(request.college == null) {
          request.college = {};
        }
        request.college.name = document.getElementByID("form-college").value;
    }
    if (document.getElementById('form-major').value !== ""){
        if(request.college == null) {
          request.college = {};
        }
        request.college.admittedMajor = document.getElementByID("form-major").value;
    }
    if (document.getElementById('form-grad').value !== ""){
        if(request.college == null) {
          request.college = {};
        }
        request.college.grad = document.getElementByID("form-grad").value;
    }

    if (document.getElementById('form-citizenship').value !== ""){
        if(request.background == null) {
          request.background = {};
        }
        request.background.citizenship = document.getElementByID("form-citizenship").value;
    }
    if (document.getElementById('form-gender').value !== ""){
        if(request.background == null) {
          request.background = {};
        }
        request.background.gender = document.getElementByID("form-gender").value;
    }
    if (document.getElementById('form-ethnicity').value !== ""){
        if(request.background == null) {
          request.background = {};
        }
        request.background.ethnicity = document.getElementByID("form-ethnicity").value;
    }
    if (document.getElementById('form-hooks-1').value !== ""){
        if(request.background == null) {
          request.background = {};
        }
        if(request.background.hooks == null){
            request.background.hooks = [];
        }
        for(i=1;i<=hooksCount;i++){
          request.background.hooks.push(document.getElementByID("form-hooks-"+i).value);
        }
    }

    if (document.getElementById('form-gpa').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        request.academics.weightedGPA = document.getElementByID("form-gpa").value;
    }
    if (document.getElementById('form-sat1-english').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.sat1 == null){
            request.academics.sat1 = {};
        }
        request.academics.sat1.readingWriting = document.getElementByID("form-sat1-english").value;
    }
    if ( document.getElementById('form-sat1-math').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.sat1 == null){
            request.academics.sat1 = {};
        }
        request.academics.sat1.math = document.getElementByID("form-sat1-math").value;
    }
    if (document.getElementById('form-sat1-reading').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.sat1 == null){
            request.academics.sat1 = {};
        }
        if(request.academics.sat1.essay == null){
            request.academics.sat1.essay = {};
        }
        request.academics.sat1.essay.reading = document.getElementByID("form-sat1-reading").value;
    }
    if (document.getElementById('form-sat1-analysis').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.sat1 == null){
            request.academics.sat1 = {};
        }
        if(request.academics.sat1.essay == null){
            request.academics.sat1.essay = {};
        }
        request.academics.sat1.essay.analysis = document.getElementByID("form-sat1-analysis").value;
    }
    if (document.getElementById('form-sat1-writing').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.sat1 == null){
            request.academics.sat1 = {};
        }
        if(request.academics.sat1.essay == null){
            request.academics.sat1.essay = {};
        }
        request.academics.sat1.essay.writing = document.getElementByID("form-sat1-writing").value;
    }
    if (document.getElementById('form-act-english').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.act == null){
            request.academics.act = {};
        }
        request.academics.act.english = document.getElementByID("form-act-english").value;
    }
    if (document.getElementById('form-act-math').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.act == null){
            request.academics.act = {};
        }
        request.academics.act.math = document.getElementByID("form-act-math").value;
    }
    if (document.getElementById('form-act-reading').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.act == null){
            request.academics.act = {};
        }
        request.academics.act.reading = document.getElementByID("form-act-reading").value;
    }
    if (document.getElementById('form-act-science').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.act == null){
            request.academics.act = {};
        }
        request.academics.act.science = document.getElementByID("form-act-science").value;
    }
    if (document.getElementById('form-act-writing').value !== ""){
        if(request.academics == null) {
            request.academics = {};
        }
        if(request.academics.act == null){
            request.academics.act = {};
        }
        request.academics.act.writing = document.getElementByID("form-act-writing").value;
    }if (document.getElementById('form-sat2-subject-1').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }if(request.academics.sat2 == null){
            request.academics.sat2 = [];
        }
        for(i=1;i<=sat2Count;i++){
            request.academics.sat2[document.getElementByID("form-sat2-subject-"+i).value] = document.getElementByID("form-sat2-score-"+i).value;
        }
    }

    const sat2subjects = document.getElementById('form-sat2-subject-1').value;
    const sat2Scores = document.getElementById('form-sat2-score-1').value;

    const apSubjects = document.getElementById('form-ap-subject-1').value;
    const apNicknames = document.getElementById('form-ap-score-1').value;

    const honorTitles = document.getElementById('form-honors-title-1').value;
    const password = document.getElementById('h1-9').value;
    const password = document.getElementById('h1-10').value;
    const password = document.getElementById('h1-11').value;
    const password = document.getElementById('h1-12').value;
    const password = document.getElementById('h1-13').value;
    const honorLevels = document.getElementById('form-honors-lvl-1').value;
    
    const activitiesTypes = document.getElementById('form-activities-type-1').value;
    const activitiesPositions = document.getElementById('form-activities-position-1').value;
    const activitiesOrgs = document.getElementById('form-activities-organization-1').value;
    const activitiesDescriptions = document.getElementById('form-activities-description-1').value;
    const password = document.getElementById('a1-9').value;
    const password = document.getElementById('a1-10').value;
    const password = document.getElementById('a1-11').value;
    const password = document.getElementById('a1-12').value;
    const password = document.getElementById('a1-13').value;
    const activitiesTimes = document.getElementById('form-activities-time-1').value;

    const essayPrompts = document.getElementById('form-essay-prompt-1').value;
    const essayStatements = document.getElementById('form-essay-statement-1').value;

    const additionalInfo = document.getElementById('additional-1').value;

    // sending draft
    let draftSent = false;
    while(!draftSent) {
        const response = await fetch('https://api.uniqon.kr/document/application/draft', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(userInput),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await response.json();

        if(response.status === 401 || (response.status === 403 && jsonResponse.error !== "Forbidden: Not A Mentor")) {
            // renew token
            await renew();
        } else if(response.ok) {
            draftSent = true;
            // clear timer after draft submit
            clearInterval(updateTimer);
            updateTimer = null;
        } else {
            alert("Server Error");
        }
    }
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

loadDraft();
hideRemove()

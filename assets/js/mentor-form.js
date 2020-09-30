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
            <input id = 'form-sat2-subject-${sat2Count}' onkeypress = 'formUpdated()' onchange = "optionalTestCheck('sat2', '${sat2Count}')" type = 'text' placeholder= 'Subject'/>
            <input id = 'form-sat2-score-${sat2Count}' onkeypress = 'formUpdated()' onchange = "optionalTestCheck('sat2', '${sat2Count}')" type = 'text' placeholder= 'Score'/>
        </div>`);
  } else if(type === "ap"){
    apCount++;
    document.getElementById("ap-remove").style.display = "block";
    document.getElementById("ap-AM").insertAdjacentHTML( 'beforeend',`
        <div class='entryBoxA' id = 'apEntryBox-${apCount}'>
            <input id = 'form-ap-subject-${apCount}' onkeypress = 'formUpdated()' onchange = "optionalTestCheck('ap', '${apCount}')" type = 'text' placeholder='Subject'/>
            <input id = 'form-ap-score-${apCount}' onkeypress = 'formUpdated()' onchange = "optionalTestCheck('ap', '${apCount}')" type = 'text' placeholder='Score'/>
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

function optionalTestCheck(test, index) {
    const subject = (document.getElementById(`form-${test}-subject-${index}`).value !== "");
    const score = (document.getElementById(`form-${test}-score-${index}`).value !== "");

    if((subject && score) || (!subject && !score)) {
        document.getElementById(`form-${test}-subject-${index}`).style.backgroundColor = "#fcfcfc";
        document.getElementById(`form-${test}-score-${index}`).style.backgroundColor = "#fcfcfc";
    } else if(subject && !score) {
        document.getElementById(`form-${test}-subject-${index}`).style.backgroundColor = "#fcfcfc";
        document.getElementById(`form-${test}-score-${index}`).style.backgroundColor = "#ffe4e4";
    } else {
        document.getElementById(`form-${test}-subject-${index}`).style.backgroundColor = "#ffe4e4";
        document.getElementById(`form-${test}-score-${index}`).style.backgroundColor = "#fcfcfc";
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
        if(localStorage.getItem("expiredAt") > Date.now()) {
            await loadDraft();
        }
    } else if(response.ok) {
        const draft = jsonResponse.draft;
        
        // College/Universities
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

        // Backgrounds
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
            if(draft.background.hooks != null && draft.background.hooks.length > 0){
                document.getElementById("form-hooks-1").value = draft.background.hooks[0];
                
                if(draft.background.hooks.length > 1){
                    while(hooksCount < draft.background.hooks.length){
                        addMore('hooks');
                        document.getElementById("form-hooks-"+(hooksCount)).value = draft.background.hooks[hooksCount-1];
                    }
                }
            }
        }

        // Academics
        if(draft.academics != null) {
            if(draft.academics.weightedGPA != null){
                document.getElementById("form-gpa").value = draft.academics.weightedGPA;
                requiredCheck("form-gpa");
            }
            // SAT
            if(draft.academics.sat1 != null){
                if(draft.academics.sat1.readingWriting != null){
                    document.getElementById("form-sat1-english").value = draft.academics.sat1.readingWriting;
                }
                if(draft.academics.sat1.math != null){
                    document.getElementById("form-sat1-math").value = draft.academics.sat1.math;
                    requiredScore();
                }
                if(draft.academics.sat1.essay != null){
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
            // ACT
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
                if(draft.academics.act.writing != null){
                    document.getElementById("form-act-writing").value = draft.academics.act.writing;
                }
            }
            // SAT2
            if(draft.academics.sat2 != null && draft.academics.sat2.length > 0){
                let key= Object.keys(draft.academics.sat2[0])[0]
                document.getElementById("form-sat2-subject-1").value = key;
                if(draft.academics.sat2[0][key] != null){
                    document.getElementById("form-sat2-score-1").value = draft.academics.sat2[0][key];
                }
                optionalTestCheck('sat2', '1');
                    
                if(draft.academics.sat2.length > 1){
                    while(sat2Count < draft.academics.sat2.length){
                        addMore('sat2');
                        key = Object.keys(draft.academics.sat2[sat2Count-1])[0]
                        document.getElementById("form-sat2-subject-"+sat2Count).value = key;
                        if(draft.academics.sat2[sat2Count-1][key] != null){
                            document.getElementById("form-sat2-score-"+sat2Count).value = draft.academics.sat2[sat2Count-1][key];
                        }
                        optionalTestCheck('sat2', `${sat2Count}`);
                    }
                }
            }
            // AP
            if(draft.academics.ap != null && draft.academics.ap.length > 0){
                key= Object.keys(draft.academics.ap[0])[0];
                document.getElementById("form-ap-subject-1").value = key;
                if(draft.academics.ap[0][key] != null){
                    document.getElementById("form-ap-score-1").value = draft.academics.ap[0][key];
                }
                optionalTestCheck('ap', '1');
                
                if(draft.academics.ap.length > 1){
                    while(apCount < draft.academics.ap.length){
                        addMore('ap');
                        key= Object.keys(draft.academics.ap[apCount-1])[0]
                        document.getElementById("form-ap-subject-"+apCount).value = key;
                        if(draft.academics.ap[apCount-1][key] != null){
                            document.getElementById("form-ap-score-"+apCount).value = draft.academics.ap[apCount-1][key];
                        }
                        optionalTestCheck('ap', `${apCount}`);
                    }
                }
            }
        }

        // Honors
        if(draft.honors != null) {
            if(draft.honors.contents != null && draft.honors.contents.length > 0) {
                // Title
                if(draft.honors.contents[0]['title'] != null) {
                    document.getElementById("form-honors-title-1").value = draft.honors.contents[0]['title'];
                    requiredCheck("form-honors-title-1");
                }
                // Grade Level
                if(draft.honors.contents[0]['gradeLevel'] != null && draft.honors.contents[0]['gradeLevel'].length > 0){
                    if(draft.honors.contents[0]['gradeLevel'].includes(9)){
                        document.getElementById("h1-9").checked = true;
                    }
                    if(draft.honors.contents[0]['gradeLevel'].includes(10)){
                        document.getElementById("h1-10").checked = true;
                    }
                    if(draft.honors.contents[0]['gradeLevel'].includes(11)){
                        document.getElementById("h1-11").checked = true;
                    }
                    if(draft.honors.contents[0]['gradeLevel'].includes(12)){
                        document.getElementById("h1-12").checked = true;
                    }
                    if(draft.honors.contents[0]['gradeLevel'].includes(13)){
                        document.getElementById("h1-13").checked = true;
                    }
                    requiredCheck("h1");
                }
                // Level Of Recognition
                if(draft.honors.contents[0]['levelOfRecognition'] != null) {
                    document.getElementById("form-honors-lvl-1").value = draft.honors.contents[0]['levelOfRecognition'];
                    requiredCheck("form-honors-lvl-1");
                }
                
                if(draft.honors.contents.length > 1){
                    while(honorsCount < draft.honors.contents.length){
                        addMore('honors');
                        if(draft.honors.contents[honorsCount-1]['title'] != null) {
                            document.getElementById("form-honors-title-" + honorsCount).value = draft.honors.contents[honorsCount-1]['title'];
                            requiredCheck("form-honors-title-" + honorsCount);
                        }
                        if(draft.honors.contents[honorsCount-1]['gradeLevel'] != null && draft.honors.contents[honorsCount-1]['gradeLevel'].length > 0){
                            if(draft.honors.contents[honorsCount-1]['gradeLevel'].includes(9)){
                                document.getElementById("h"+honorsCount+"-9").checked = true;
                            }
                            if(draft.honors.contents[honorsCount-1]['gradeLevel'].includes(10)){
                                document.getElementById("h"+honorsCount+"-10").checked = true;
                            }
                            if(draft.honors.contents[honorsCount-1]['gradeLevel'].includes(11)){
                                document.getElementById("h"+honorsCount+"-11").checked = true;
                            }
                            if(draft.honors.contents[honorsCount-1]['gradeLevel'].includes(12)){
                                document.getElementById("h"+honorsCount+"-12").checked = true;
                            }
                            if(draft.honors.contents[honorsCount-1]['gradeLevel'].includes(13)){
                                document.getElementById("h"+honorsCount+"-13").checked = true;
                            }
                            requiredCheck("h" + honorsCount);
                        }
                        if(draft.honors.contents[honorsCount-1]['levelOfRecognition'] != null) {
                            document.getElementById("form-honors-lvl-" + honorsCount).value = draft.honors.contents[honorsCount-1]['levelOfRecognition'];
                            requiredCheck("form-honors-lvl-" + honorsCount);
                        }
                    }
                }
            }
        }

        // Activities
        if(draft.activities != null) {
            if(draft.activities.contents != null && draft.activities.contents.length > 0) {
                // type
                if(draft.activities.contents[0]['type'] != null) {
                    document.getElementById("form-activities-type-1").value = draft.activities.contents[0]['type'];
                    requiredCheck("form-activities-type-1");
                }
                // position
                if(draft.activities.contents[0]['position'] != null) {
                    document.getElementById("form-activities-position-1").value = draft.activities.contents[0]['position'];
                    requiredCheck("form-activities-position-1");
                }
                // organization
                if(draft.activities.contents[0]['organizationName'] != null) {
                    document.getElementById("form-activities-organization-1").value = draft.activities.contents[0]['organizationName'];
                    requiredCheck("form-activities-organization-1");
                }
                // description
                if(draft.activities.contents[0]['description'] != null) {
                    document.getElementById("form-activities-description-1").value = draft.activities.contents[0]['description'];
                    requiredCheck("form-activities-description-1");
                }
                // participation grade level
                if(draft.activities.contents[0]['participationGradeLevel'] != null && draft.activities.contents[0]['participationGradeLevel'].length > 0) {
                    if(draft.activities.contents[0]['participationGradeLevel'].includes(9)){
                        document.getElementById("a1-9").checked = true;
                    }
                    if(draft.activities.contents[0]['participationGradeLevel'].includes(10)){
                        document.getElementById("a1-10").checked = true;
                    }
                    if(draft.activities.contents[0]['participationGradeLevel'].includes(11)){
                        document.getElementById("a1-11").checked = true;
                    }
                    if(draft.activities.contents[0]['participationGradeLevel'].includes(12)){
                        document.getElementById("a1-12").checked = true;
                    }
                    if(draft.activities.contents[0]['participationGradeLevel'].includes(13)){
                        document.getElementById("a1-13").checked = true;
                    }
                    requiredCheck("a" + activitiesCount);
                }
                // Time of Participation
                if(draft.activities.contents[0]['timeOfParticipation'] != null) {
                    document.getElementById("form-activities-time-1").value = draft.activities.contents[0]['timeOfParticipation'];
                    requiredCheck("form-activities-time-1");
                }
                
                if(draft.activities.contents.length > 1){
                    while(activitiesCount < draft.activities.contents.length){
                        addMore('activities');
                        if(draft.activities.contents[activitiesCount-1]['type'] != null) {
                            document.getElementById("form-activities-type-"+activitiesCount).value = draft.activities.contents[activitiesCount-1]['type'];
                            requiredCheck("form-activities-type-" + activitiesCount);
                        }
                        if(draft.activities.contents[activitiesCount-1]['position'] != null) {
                            document.getElementById("form-activities-position-"+activitiesCount).value = draft.activities.contents[activitiesCount-1]['position'];
                            requiredCheck("form-activities-position-" + activitiesCount);
                        }
                        if(draft.activities.contents[activitiesCount-1]['organizationName'] != null) {
                            document.getElementById("form-activities-organization-"+activitiesCount).value = draft.activities.contents[activitiesCount-1]['organizationName'];
                            requiredCheck("form-activities-organization-" + activitiesCount);
                        }
                        if(draft.activities.contents[activitiesCount-1]['description'] != null) {
                            document.getElementById("form-activities-description-"+activitiesCount).value = draft.activities.contents[activitiesCount-1]['description'];
                            requiredCheck("form-activities-description-" + activitiesCount);
                        }
                        if(draft.activities.contents[activitiesCount-1]['participationGradeLevel'] != null && draft.activities.contents[activitiesCount-1]['participationGradeLevel'].length>0) {
                            if(draft.activities.contents[activitiesCount-1]['participationGradeLevel'].includes(9)){
                                document.getElementById("a"+activitiesCount+"-9").checked = true;
                            }
                            if(draft.activities.contents[activitiesCount-1]['participationGradeLevel'].includes(10)){
                                document.getElementById("a"+activitiesCount+"-10").checked = true;
                            }
                            if(draft.activities.contents[activitiesCount-1]['participationGradeLevel'].includes(11)){
                                document.getElementById("a"+activitiesCount+"-11").checked = true;
                            }
                            if(draft.activities.contents[activitiesCount-1]['participationGradeLevel'].includes(12)){
                                document.getElementById("a"+activitiesCount+"-12").checked = true;
                            }
                            if(draft.activities.contents[activitiesCount-1]['participationGradeLevel'].includes(13)){
                                document.getElementById("a"+activitiesCount+"-13").checked = true;
                            }
                            requiredCheck("a" + activitiesCount);
                        }
                        if(draft.activities.contents[activitiesCount-1]['timeOfParticipation'] != null) {
                            document.getElementById("form-activities-time-" + activitiesCount).value = draft.activities.contents[activitiesCount-1]['timeOfParticipation'];
                            requiredCheck("form-activities-time-" + activitiesCount);
                        }
                    }
                }
            }
        }

        // Essay
        if(draft.essay != null) {
            if(draft.essay.contents != null && draft.essay.contents.length > 0) {
                if(draft.essay.contents[0]['prompt'] != null) {
                    document.getElementById("form-essay-prompt-1").value = draft.essay.contents[0]['prompt'];
                    requiredCheck("form-essay-prompt-1");
                }
                if(draft.essay.contents[0]['statement'] != null) {
                    document.getElementById("form-essay-statement-1").value = draft.essay.contents[0]['statement'];
                    requiredCheck("form-essay-statement-1");
                }
                
                if(draft.essay.contents.length > 1){
                    while(essayCount < draft.essay.contents.length){
                        addMore('essay');
                        if(draft.essay.contents[essayCount-1]['prompt'] != null) {
                            document.getElementById("form-essay-prompt-" + essayCount).value = draft.essay.contents[essayCount-1]['prompt'];
                            requiredCheck("form-essay-prompt-" + essayCount);
                        }
                        if(draft.essay.contents[essayCount-1]['statement'] != null) {
                            document.getElementById("form-essay-statement-" + essayCount).value = draft.essay.contents[essayCount-1]['statement'];
                            requiredCheck("form-essay-statement-" + essayCount);
                        }
                    }
                }
            }
        }

        // Additional Information
        if(draft.additionalInfo != null) {
            if(draft.additionalInfo.contents != null) {
                if(draft.additionalInfo.contents != null && draft.additionalInfo.contents.length > 0) {
                    if(draft.additionalInfo.contents[0] != null) {
                        document.getElementById("additional-1").value = draft.additionalInfo.contents[0];
                    }
                    
                    if(draft.additionalInfo.contents.length > 1){
                        while(additionalCount < draft.additionalInfo.contents.length){
                            addMore('additional');
                            if(draft.additionalInfo.contents[additionalCount-1] != null) {
                                document.getElementById("additional-" + additionalCount).value = draft.additionalInfo.contents[additionalCount-1];
                            }
                        }
                    }
                }
            }
        }
    } else if(response.status !== 404) {
        alert("Server Error!! Please Try Again!!");
        location.href = "{{ site.baseurl }}/";
    }
}

async function saveDraft() {
    document.getElementById("draftButton").disabled = true;
    document.getElementById("submitButton").disabled = true;
    // Generating Document
    const request = {};

    // College/University
    if(document.getElementById("form-college").value !== "") {
        if(request.college == null) {
          request.college = {};
        }
        request.college.name = document.getElementById("form-college").value;
    }
    if (document.getElementById('form-major').value !== ""){
        if(request.college == null) {
          request.college = {};
        }
        request.college.admittedMajor = document.getElementById("form-major").value;
    }
    if (document.getElementById('form-grad').value !== ""){
        if(request.college == null) {
          request.college = {};
        }
        request.college.grad = document.getElementById("form-grad").value;
    }

    // Background
    if (document.getElementById('form-citizenship').value !== ""){
        if(request.background == null) {
          request.background = {};
        }
        request.background.citizenship = document.getElementById("form-citizenship").value;
    }
    if (document.getElementById('form-gender').value !== ""){
        if(request.background == null) {
          request.background = {};
        }
        request.background.gender = document.getElementById("form-gender").value;
    }
    if (document.getElementById('form-ethnicity').value !== ""){
        if(request.background == null) {
          request.background = {};
        }
        request.background.ethnicity = document.getElementById("form-ethnicity").value;
    }
    if (document.getElementById('form-hooks-1').value !== ""){
        if(request.background == null) {
          request.background = {};
        }
        if(request.background.hooks == null){
            request.background.hooks = [];
        }
        for(let i=1;i<=hooksCount;i++){
          request.background.hooks.push(document.getElementById("form-hooks-"+i).value);
        }
    }

    // Academics
    if (document.getElementById('form-gpa').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        request.academics.weightedGPA = document.getElementById("form-gpa").value;
    }
    // SAT1
    if (document.getElementById('form-sat1-english').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.sat1 == null){
            request.academics.sat1 = {};
        }
        request.academics.sat1.readingWriting = document.getElementById("form-sat1-english").value;
    }
    if ( document.getElementById('form-sat1-math').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.sat1 == null){
            request.academics.sat1 = {};
        }
        request.academics.sat1.math = document.getElementById("form-sat1-math").value;
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
        request.academics.sat1.essay.reading = document.getElementById("form-sat1-reading").value;
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
        request.academics.sat1.essay.analysis = document.getElementById("form-sat1-analysis").value;
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
        request.academics.sat1.essay.writing = document.getElementById("form-sat1-writing").value;
    }
    // ACT
    if (document.getElementById('form-act-english').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.act == null){
            request.academics.act = {};
        }
        request.academics.act.english = document.getElementById("form-act-english").value;
    }
    if (document.getElementById('form-act-math').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.act == null){
            request.academics.act = {};
        }
        request.academics.act.math = document.getElementById("form-act-math").value;
    }
    if (document.getElementById('form-act-reading').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.act == null){
            request.academics.act = {};
        }
        request.academics.act.reading = document.getElementById("form-act-reading").value;
    }
    if (document.getElementById('form-act-science').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.act == null){
            request.academics.act = {};
        }
        request.academics.act.science = document.getElementById("form-act-science").value;
    }
    if (document.getElementById('form-act-writing').value !== ""){
        if(request.academics == null) {
            request.academics = {};
        }
        if(request.academics.act == null){
            request.academics.act = {};
        }
        request.academics.act.writing = document.getElementById("form-act-writing").value;
    }
    // SAT2
    if (document.getElementById('form-sat2-subject-1').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.sat2 == null){
            request.academics.sat2 = [];
        }
        for(let i=1;i<=sat2Count;i++){
            const sat2Score = {};
            sat2Score[document.getElementById("form-sat2-subject-"+i).value] = document.getElementById("form-sat2-score-"+i).value;
            request.academics.sat2.push(sat2Score);
        }
    }
    // AP
    if (document.getElementById('form-ap-subject-1').value !== ""){
        if(request.academics == null) {
          request.academics = {};
        }
        if(request.academics.ap == null){
            request.academics.ap = [];
        }
        for(let i=1;i<=apCount;i++){
            const apScore = {};
            apScore[document.getElementById("form-ap-subject-"+i).value] = document.getElementById("form-ap-score-"+i).value;
            request.academics.ap.push(apScore);
        }
    }

    // Honors
    let honorsIn = {};
    // Title
    if (document.getElementById('form-honors-title-1').value !== "") {
        if(request.honors == null){
            request.honors = {
                contents: [],
            };
        }
        honorsIn.title = document.getElementById("form-honors-title-1").value;
    }
    // Grade Level
    if (document.getElementById('h1-9').checked || document.getElementById('h1-10').checked || document.getElementById('h1-11').checked || document.getElementById('h1-12').checked || document.getElementById('h1-13').checked) {
        if(request.honors == null){
            request.honors = {
                contents: [],
            };
        }
        if(honorsIn.gradeLevel == null){
            honorsIn.gradeLevel = [];
        }
        if(document.getElementById('h1-9').checked){
            honorsIn.gradeLevel.push(9);
        }
        if(document.getElementById('h1-10').checked){
            honorsIn.gradeLevel.push(10);
        }
        if(document.getElementById('h1-11').checked){
            honorsIn.gradeLevel.push(11);
        }
        if(document.getElementById('h1-12').checked){
            honorsIn.gradeLevel.push(12);
        }
        if(document.getElementById('h1-13').checked){
            honorsIn.gradeLevel.push(13);
        }
    }
    if (document.getElementById('form-honors-lvl-1').value !== ""){
        if(request.honors == null){
            request.honors = {
                contents: [],
            };
        }
        honorsIn.levelOfRecognition = document.getElementById("form-honors-lvl-1").value;
    }
    if(Object.keys(honorsIn).length !== 0) {
        request.honors.contents.push(honorsIn);
    }

    // More than 1 honors
    if(honorsCount>1) {
        if(request.honors == null){
            request.honors = {
                contents: [],
            };
        }
        for(let i=2; i<=honorsCount; i++) {
            honorsIn = {
                gradeLevel: []
            };
            // Title
            if (document.getElementById('form-honors-title-'+i).value !== ""){
                honorsIn.title = document.getElementById("form-honors-title-"+i).value;
            }
            // Grade Level
            if(document.getElementById("h"+i+"-9").checked){
                honorsIn.gradeLevel.push(9);
            }
            if(document.getElementById("h"+i+"-10").checked){
                honorsIn.gradeLevel.push(10);
            }
            if(document.getElementById("h"+i+"-11").checked){
                honorsIn.gradeLevel.push(11);
            }
            if(document.getElementById("h"+i+"-12").checked){
                honorsIn.gradeLevel.push(12);
            }
            if(document.getElementById("h"+i+"-13").checked){
                honorsIn.gradeLevel.push(13);
            }
            // Level of Recognition
            if (document.getElementById("form-honors-lvl-"+i).value !== ""){
                honorsIn.levelOfRecognition = document.getElementById("form-honors-lvl-"+i).value;
            }
            request.honors.contents.push(honorsIn);
        }
    }

    // Activities
    let activitiesIn = {};
    // Type
    if (document.getElementById('form-activities-type-1').value !== "") {
        if(request.activities == null){
            request.activities = {
                contents: [],
            };
        }
        activitiesIn.type = document.getElementById("form-activities-type-1").value;
    }
    // Position
    if (document.getElementById('form-activities-type-1').value !== "") {
        if(request.activities == null){
            request.activities = {
                contents: [],
            };
        }
        activitiesIn.position = document.getElementById("form-activities-position-1").value;
    }
    // Organization
    if (document.getElementById('form-activities-organization-1').value !== "") {
        if(request.activities == null){
            request.activities = {
                contents: [],
            };
        }
        activitiesIn.organizationName = document.getElementById("form-activities-organization-1").value;
    }
    // Description
    if (document.getElementById('form-activities-description-1').value !== "") {
        if(request.activities == null){
            request.activities = {
                contents: [],
            };
        }
        activitiesIn.description = document.getElementById("form-activities-description-1").value;
    }
    // Grade Level
    if (document.getElementById('a1-9').checked || document.getElementById('a1-10').checked || document.getElementById('a1-11').checked || document.getElementById('a1-12').checked || document.getElementById('a1-13').checked) {
        if(request.activities == null){
            request.activities = {
                contents: [],
            };
        }
        if(activitiesIn.gradeLevel == null){
            activitiesIn.participationGradeLevel = [];
        }
        if(document.getElementById('a1-9').checked){
            activitiesIn.participationGradeLevel.push(9);
        }
        if(document.getElementById('a1-10').checked){
            activitiesIn.participationGradeLevel.push(10);
        }
        if(document.getElementById('a1-11').checked){
            activitiesIn.participationGradeLevel.push(11);
        }
        if(document.getElementById('a1-12').checked){
            activitiesIn.participationGradeLevel.push(12);
        }
        if(document.getElementById('a1-13').checked){
            activitiesIn.participationGradeLevel.push(13);
        }
    }
    // Time of Participation
    if (document.getElementById('form-activities-time-1').value !== ""){
        if(request.activities == null){
            request.activities = {
                contents: [],
            };
        }
        activitiesIn.timeOfParticipation = document.getElementById("form-activities-time-1").value;
    }
    if(Object.keys(activitiesIn).length !== 0) {
        request.activities.contents.push(activitiesIn);
    }

    // More than 1 activities
    if(activitiesCount>1) {
        if(request.activities == null){
            request.activities = {
                contents: [],
            };
        }
        for(let i=2; i<=activitiesCount; i++) {
            activitiesIn = {
                participationGradeLevel: []
            };
            // Type
            if (document.getElementById('form-activities-type-'+i).value !== ""){
                activitiesIn.type = document.getElementById("form-activities-type-"+i).value;
            }
            // Position
            if (document.getElementById('form-activities-position-'+i).value !== ""){
                activitiesIn.position = document.getElementById("form-activities-position-"+i).value;
            }
            // Organization
            if (document.getElementById('form-activities-organization-'+i).value !== ""){
                activitiesIn.organizationName = document.getElementById("form-activities-organization-"+i).value;
            }
            // Description
            if (document.getElementById('form-activities-description-'+i).value !== ""){
                activitiesIn.description = document.getElementById("form-activities-description-"+i).value;
            }
            // Grade Level
            if(document.getElementById("a"+i+"-9").checked){
                activitiesIn.participationGradeLevel.push(9);
            }
            if(document.getElementById("a"+i+"-10").checked){
                activitiesIn.participationGradeLevel.push(10);
            }
            if(document.getElementById("a"+i+"-11").checked){
                activitiesIn.participationGradeLevel.push(11);
            }
            if(document.getElementById("a"+i+"-12").checked){
                activitiesIn.participationGradeLevel.push(12);
            }
            if(document.getElementById("a"+i+"-13").checked){
                activitiesIn.participationGradeLevel.push(13);
            }
            // Time Of Participation
            if (document.getElementById('form-activities-time-'+i).value !== ""){
                activitiesIn.timeOfParticipation = document.getElementById("form-activities-time-"+i).value;
            }
            request.activities.contents.push(activitiesIn);
        }
    }

    // Essay
    let essayIn = {};
    // Prompt
    if (document.getElementById('form-essay-prompt-1').value !== "") {
        if(request.essay == null){
            request.essay = {
                contents: [],
            };
        }
        essayIn.prompt = document.getElementById("form-essay-prompt-1").value;
    }
    // Statement
    if (document.getElementById('form-essay-statement-1').value !== "") {
        if(request.essay == null){
            request.essay = {
                contents: [],
            };
        }
        essayIn.statement = document.getElementById("form-essay-statement-1").value;
    }
    if(Object.keys(essayIn).length !== 0) {
        request.essay.contents.push(essayIn);
    }

    // More than 1 essay
    if(essayCount>1) {
        if(request.essay == null){
            request.essay = {
                contents: [],
            };
        }
        for(let i=2; i<=essayCount; i++) {
            essayIn = {};
            // Prompt
            if (document.getElementById('form-essay-prompt-'+i).value !== ""){
                essayIn.prompt = document.getElementById("form-essay-prompt-"+i).value;
            }
            // Statement
            if (document.getElementById("form-essay-statement-"+i).value !== ""){
                essayIn.statement = document.getElementById("form-essay-statement-"+i).value;
            }
            request.essay.contents.push(essayIn);
        }
    }

    // AdditionalInfo
    if (document.getElementById('additional-1').value !== "") {
        if(request.additionalInfo == null){
            request.additionalInfo = {
                contents: [],
            };
        }
        request.additionalInfo.contents.push(document.getElementById("additional-1").value);
    }

    if(additionalCount>1) {
        if(request.additionalInfo == null){
            request.additionalInfo = {
                contents: [],
            };
        }
        for(let i=2; i<=additionalCount; i++) {
            if (document.getElementById("additional-"+i).value !== ""){
                request.additionalInfo.contents.push(document.getElementById("additional-"+i).value);
            }
        }
    }

    // sending draft
    let draftSent = false;
    while(!draftSent) {
        const response = await fetch('https://api.uniqon.kr/document/application/draft', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(request),
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
            document.getElementById('draft-success').style.display = "block";
            document.getElementById("draftButton").disabled = false;
            document.getElementById("submitButton").disabled = false;
        } else if(response.status == 400 && jsonResponse.error === "Invalid Input") {
            alert("Invalid Input");
            document.getElementById("missing").style.display = "none";
            document.getElementById("duplicated").style.display = "none";
            document.getElementById("success").style.display = "none";
            document.getElementById("invalid").style.display = "block";
            location.reload();
        } else {
            alert("Server Error");
            location.reload();
        }
    }
}

async function submit() {
    // Disabling Buttons    
    document.getElementById("draftButton").disabled = true;
    document.getElementById("submitButton").disabled = true;

    // Check Input
    const request = {};

    // College/University Information
    if(document.getElementById("form-college").value !== "" && document.getElementById('form-major').value !== "" && document.getElementById('form-grad').value !== "") {
        request.college = {
            name: document.getElementById("form-college").value,
            admittedMajor: document.getElementById("form-major").value,
            grad: document.getElementById("form-grad").value
        };
    } else {
        document.getElementById("missing").style.display = "block";
        document.getElementById("duplicated").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("invalid").style.display = "none";
        return;
    }

    // Background
    if (document.getElementById('form-citizenship').value !== "" && document.getElementById('form-gender').value !== "" && document.getElementById('form-ethnicity').value !== "") {
        request.background = {
            citizenship: document.getElementById("form-citizenship").value,
            gender: document.getElementById("form-gender").value,
            ethnicity: document.getElementById("form-ethnicity").value
        };

        // Hooks
        request.background.hooks = [];
        if (document.getElementById('form-hooks-1').value !== ""){
            for(let i=1; i<=hooksCount; i++){
              request.background.hooks.push(document.getElementById("form-hooks-"+i).value);
            }
        }
    } else {
        document.getElementById("missing").style.display = "block";
        document.getElementById("duplicated").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("invalid").style.display = "none";
        return;
    }

    // Academics
    if (document.getElementById('form-gpa').value !== ""){
        request.academics = { weightedGPA: document.getElementById("form-gpa").value };

        // Required Test
        let reqTest = false;
        // SAT
        if(document.getElementById('form-sat1-english').value !== "" && document.getElementById('form-sat1-math').value !== "") {
            reqTest = true;
            request.academics.sat1 = {
                readingWriting: document.getElementById("form-sat1-english").value,
                math: document.getElementById("form-sat1-math").value
            };

            // SAT Essay
            let essayReq = (document.getElementById('form-sat1-reading').value !== "" || document.getElementById('form-sat1-analysis').value !== "" || document.getElementById('form-sat1-writing').value !== "");
            if(document.getElementById('form-sat1-reading').value !== "" && document.getElementById('form-sat1-analysis').value !== "" && document.getElementById('form-sat1-writing').value !== "") {
                essayReq = false;
                request.academics.sat1.essay = {
                    reading: document.getElementById("form-sat1-reading").value,
                    analysis: document.getElementById("form-sat1-analysis").value,
                    writing: document.getElementById("form-sat1-writing").value
                };
            }
            if(essayReq) {
                document.getElementById("missing").style.display = "block";
                document.getElementById("duplicated").style.display = "none";
                document.getElementById("success").style.display = "none";
                document.getElementById("invalid").style.display = "none";
                return;
            }
        }
        // ACT
        if(document.getElementById('form-act-english').value !== "" && document.getElementById('form-act-math').value !== "" && document.getElementById('form-act-reading').value !== "" && document.getElementById('form-act-science').value !== "") {
            reqTest = true;
            request.academics.act = {
                english: document.getElementById("form-act-english").value,
                math: document.getElementById("form-act-math").value,
                reading: document.getElementById("form-act-reading").value,
                science: document.getElementById("form-act-science").value
            };

            // ACT Writing
            if(document.getElementById('form-act-writing').value !== "") {
                request.academics.act.writing = document.getElementById("form-act-writing").value;
            }
        }
        // Check for Required Test
        if(!reqTest) {
            document.getElementById("missing").style.display = "block";
            document.getElementById("duplicated").style.display = "none";
            document.getElementById("success").style.display = "none";
            document.getElementById("invalid").style.display = "none";
            return;
        }

        // Optional Tests
        // SAT2
        const sat2 = [];
        for(let i = 1; i <= sat2Count; i += 1) {
            if(document.getElementById('form-sat2-subject-'+i).value !== "" && document.getElementById('form-sat2-score-'+i).value !== "") {
                const sat2Score = {};
                sat2Score[document.getElementById('form-sat2-subject-'+i).value] = document.getElementById('form-sat2-score-'+i).value;
                sat2.push(sat2Score);
            } else {
                if(i === 1 && document.getElementById('form-sat2-subject-'+i).value === "" && document.getElementById('form-sat2-score-'+i).value === "" && sat2Count === 1) {
                    // When both field is empty for the first form
                    continue;
                } else {
                    document.getElementById("missing").style.display = "block";
                    document.getElementById("duplicated").style.display = "none";
                    document.getElementById("success").style.display = "none";
                    document.getElementById("invalid").style.display = "none";
                    return;
                }
            }
        }
        if(sat2.length !== 0) {
            request.academics.sat2 = sat2;
        }

        // AP
        const ap = [];
        for(let i = 1; i <= apCount; i += 1) {
            if(document.getElementById('form-ap-subject-'+i).value !== "" && document.getElementById('form-ap-score-'+i).value !== "") {
                const apScore = {};
                apScore[document.getElementById('form-ap-subject-'+i).value] = document.getElementById('form-ap-score-'+i).value;
                ap.push(apScore);
            } else {
                if(i === 1 && document.getElementById('form-ap-subject-'+i).value === "" && document.getElementById('form-ap-score-'+i).value === "" && apCount === 1) {
                    // When both field is empty for the first form
                    continue;
                } else {
                    document.getElementById("missing").style.display = "block";
                    document.getElementById("duplicated").style.display = "none";
                    document.getElementById("success").style.display = "none";
                    document.getElementById("invalid").style.display = "none";
                    return;
                }
            }
        }
        if(ap.length !== 0) {
            request.academics.ap = ap;
        }
    } else {
        document.getElementById("missing").style.display = "block";
        document.getElementById("duplicated").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("invalid").style.display = "none";
        return;
    }

    // Honors
    const honorsContents = [];
    for(let i = 1; i <= honorsCount; i += 1) {
        if(document.getElementById('form-honors-title-'+i).value !== "" &&
            ((document.getElementById('h'+i+'-9').checked === true) || (document.getElementById('h'+i+'-10').checked === true) || (document.getElementById('h'+i+'-11').checked === true) || (document.getElementById('h'+i+'-12').checked === true) || (document.getElementById('h'+i+'-13').checked === true)) &&
            document.getElementById('form-honors-lvl-'+i).value !== "") {
            const honor = {
                title: document.getElementById('form-honors-title-'+i).value,
                gradeLevel: [],
                levelOfRecognition: document.getElementById('form-honors-lvl-'+i).value
            };
            // Add Grade Level
            if(document.getElementById('h'+i+'-9').checked === true) {
                honor.gradeLevel.push(9);
            }
            if(document.getElementById('h'+i+'-10').checked === true) {
                honor.gradeLevel.push(10);
            }
            if(document.getElementById('h'+i+'-11').checked === true) {
                honor.gradeLevel.push(11);
            }
            if(document.getElementById('h'+i+'-12').checked === true) {
                honor.gradeLevel.push(12);
            }
            if(document.getElementById('h'+i+'-13').checked === true) {
                honor.gradeLevel.push(13);
            }
            // add to honorsContents
            honorsContents.push(honor);
        } else {
            document.getElementById("missing").style.display = "block";
            document.getElementById("duplicated").style.display = "none";
            document.getElementById("success").style.display = "none";
            document.getElementById("invalid").style.display = "none";
            return;
        }
    }
    if(honorsContents.length === 0) {
        document.getElementById("missing").style.display = "block";
        document.getElementById("duplicated").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("invalid").style.display = "none";
        return;
    } else {
        request.honors = { contents: honorsContents };
    }

    //Activities
    const activitiesContents = [];
    for(let i = 1; i <= activitiesCount; i += 1) {
        if(document.getElementById('form-activities-type-'+i).value !== "" &&
            document.getElementById('form-activities-position-'+i).value !== "" &&
            document.getElementById('form-activities-organization-'+i).value !== "" &&
            document.getElementById('form-activities-description-'+i).value !== "" &&
            ((document.getElementById('a'+i+'-9').checked === true) || (document.getElementById('a'+i+'-10').checked === true) || (document.getElementById('a'+i+'-11').checked === true) || (document.getElementById('a'+i+'-12').checked === true) || (document.getElementById('a'+i+'-13').checked === true)) &&
            document.getElementById('form-activities-time-'+i).value !== "") {
            const activity = {
                type: document.getElementById('form-activities-type-'+i).value,
                position: document.getElementById('form-activities-position-'+i).value,
                organizationName: document.getElementById('form-activities-organization-'+i).value,
                description: document.getElementById('form-activities-description-'+i).value,
                participationGradeLevel: [],
                timeOfParticipation: document.getElementById('form-activities-time-'+i).value
            };
            // Add Grade Level
            if(document.getElementById('a'+i+'-9').checked === true) {
                activity.participationGradeLevel.push(9);
            }
            if(document.getElementById('a'+i+'-10').checked === true) {
                activity.participationGradeLevel.push(10);
            }
            if(document.getElementById('a'+i+'-11').checked === true) {
                activity.participationGradeLevel.push(11);
            }
            if(document.getElementById('a'+i+'-12').checked === true) {
                activity.participationGradeLevel.push(12);
            }
            if(document.getElementById('a'+i+'-13').checked === true) {
                activity.participationGradeLevel.push(13);
            }
            // add to activitiesContents
            activitiesContents.push(activity);
        } else {
            document.getElementById("missing").style.display = "block";
            document.getElementById("duplicated").style.display = "none";
            document.getElementById("success").style.display = "none";
            document.getElementById("invalid").style.display = "none";
            return;
        }
    }
    if(activitiesContents.length === 0) {
        document.getElementById("missing").style.display = "block";
        document.getElementById("duplicated").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("invalid").style.display = "none";
        return;
    } else {
        request.activities = { contents: activitiesContents };
    }
    
    // Essay
    const essayContents = [];
    for(let i = 1; i <= essayCount; i += 1) {
        if(document.getElementById('form-essay-prompt-'+i).value !== "" &&
            document.getElementById('form-essay-statement-'+i).value !== "") {
            const essay = {
                prompt: document.getElementById('form-essay-prompt-'+i).value,
                statement: document.getElementById('form-essay-statement-'+i).value
            };
            // add to essayContents
            essayContents.push(essay);
        } else {
            document.getElementById("missing").style.display = "block";
            document.getElementById("duplicated").style.display = "none";
            document.getElementById("success").style.display = "none";
            document.getElementById("invalid").style.display = "none";
            return;
        }
    }
    if(essayContents.length === 0) {
        document.getElementById("missing").style.display = "block";
        document.getElementById("duplicated").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("invalid").style.display = "none";
        return;
    } else {
        request.essay = { contents: essayContents };
    }

    // Additional Information
    const additionalInfoContents = [];
    for(let i = 1; i <= additionalCount; i += 1) {
        if(document.getElementById('additional-'+i).value !== "") {
            additionalInfoContents.push(document.getElementById('additional-'+i).value);
        } else {
            if(i === 1 && additionalCount === 1) {
                // First Form Empty
                continue;
            } else {
                document.getElementById("missing").style.display = "block";
                document.getElementById("duplicated").style.display = "none";
                document.getElementById("success").style.display = "none";
                document.getElementById("invalid").style.display = "none";
                return;
            }
        }
    }
    if(additionalInfoContents.length !== 0) {
        request.additionalInfo = { contents: additionalInfoContents };
    }
    // sending document
    let draftSent = false;
    while(!draftSent) {
        const response = await fetch('https://api.uniqon.kr/document/application', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await response.json();

        if(response.status === 401 || (response.status === 403 && jsonResponse.error !== "Forbidden: Not A Mentor")) {
            // renew token
            await renew();
        } else if(response.ok) {
            document.getElementById("missing").style.display = "none";
            document.getElementById("duplicated").style.display = "none";
            document.getElementById("success").style.display = "block";
            document.getElementById("invalid").style.display = "none";
            draftSent = true;
            setTimeout(() => {
                location.href = "{{ site.baseurl }}/mentor-recruit";
            }, 2000);
            break;
        } else if(response.status === 400 && jsonResponse.error === "Duplicated Application Found") {
            document.getElementById("missing").style.display = "none";
            document.getElementById("duplicated").style.display = "block";
            document.getElementById("success").style.display = "none";
            document.getElementById("invalid").style.display = "none";
            await saveDraft();
            setTimeout(() => {
                location.reload();
            }, 2000);
            break;
        } else if(response.status === 400 && jsonResponse.error === "Invalid Input") {
            document.getElementById("missing").style.display = "none";
            document.getElementById("duplicated").style.display = "none";
            document.getElementById("success").style.display = "none";
            document.getElementById("invalid").style.display = "block";
            await saveDraft();
            setTimeout(() => {
                location.reload();
            }, 2000);
            break;
        } else if(response.status === 400 && jsonResponse.error === "Missing Fields") {
            document.getElementById("missing").style.display = "block";
            document.getElementById("duplicated").style.display = "none";
            document.getElementById("success").style.display = "none";
            document.getElementById("invalid").style.display = "none";
            await saveDraft();
            setTimeout(() => {
                location.reload();
            }, 2000);
            break;
        } else {
            await saveDraft();
            alert("Server Error!!");
            setTimeout(() => {
                location.reload();
            }, 2000);
            break;
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
hideRemove();

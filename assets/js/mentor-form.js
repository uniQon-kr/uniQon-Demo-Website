// boolean variable to keep track whether the form has been updated after last draft save
let isUpdated = false;
let updateTimer = null;

async function addMore(type) {
  if(type === ){
    
  } else if(type === ){

  } else if(type === ){

  } else if(type === ){

  } else if(type === ){

  } else if(type === ){

  }
}

async function loadDraft() {
    // TODO: function to load draft when the page first loaded
}

async function submit() {
    // TODO: submit the form as final version
}

async function saveDraft() {
    // TODO: save as draft

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
    // TODO: check whether input field is written or not

    formUpdated();
}

function satActCheck(inputFieldID) {
    // TODO: check whether input field is written or not
    
    formUpdated();
}

loadDraft();

// start timer, save every one min
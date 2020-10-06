---
---
let docIDCount = 1;

async function loadTypes() {
  let response = await fetch('https://api.uniqon.kr/support-ticket/available-types', {
      credentials: 'include',
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json'
      }
  });
  let jsonResponse = await response.json();
  if(response.ok) {
    let selectTag = document.getElementById('type-select');
    //load options capitalize each words  
    for(i=0; i<jsonResponse.types.length; i++){
      let opt = document.createElement('option');
      opt.appendChild( document.createTextNode(String(jsonResponse.types[i]).replace(/(^\w|\s\w)/g, m => m.toUpperCase())));
      opt.value = String(jsonResponse.types[i]); 
      selectTag.appendChild(opt); 
    }
  } else if(response.status === 401 || response.status === 403) {
    if(await renew()) {
      await loadTypes();
    }
    return;
  } 
}

//add more docID input field
async function addMore() {
  //add more textfields to its type
  docIDCount++;
  document.getElementById("docID-remove").style.display = "block";
  document.getElementById("docID-AM").insertAdjacentHTML( 'beforeend',`
          <input onchange = "requiredCheck('form-docID-${docIDCount}')" class = 'block required' id = 'form-docID-${docIDCount}' type = 'text'/>
          `);
}

//remove docID input field
async function remove() {
  let element = document.getElementById("form-docID-" + docIDCount);
      element.parentNode.removeChild(element);
      docIDCount--;
  if(docIDCount === 1){
    document.getElementById("docID-remove").style.display = "none";
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

function typeChange(){
  if(document.getElementById("type-select").value === "cashout"){
    document.getElementById("cashout").style.display = "block";
    document.getElementById("message").style.display = "none";
    document.getElementById("mentoring-initialize").style.display = "none";
  } else if(document.getElementById("type-select").value === "mentoring initialize"){
    document.getElementById("cashout").style.display = "none";
    document.getElementById("message").style.display = "none";
    document.getElementById("mentoring-initialize").style.display = "block";
  } else {
    document.getElementById("cashout").style.display = "none";
    document.getElementById("message").style.display = "block";
    document.getElementById("mentoring-initialize").style.display = "none";
  }
}

async function submit() {
  document.getElementById("submitButton").disabled = true;
  // Check Input
  const request = {};

  request.ticketType = document.getElementById("type-select").value;
  if(document.getElementById("form-title").value !== ""){
    request.title = document.getElementById("form-title").value;
  }
  if(document.getElementById("type-select").value === "cashout"){//cashout form setup
    let paymentinfo = "[Payment Information]\n\n";
    let message = "[Message]\n\n";
    
    if(
      document.getElementById("form-accnum").value !== "" || 
      document.getElementById("form-amount").value !== "" || 
      document.getElementById("form-cashout-message").value !== ""
      ){
      paymentinfo += "Account Number" + "\n" +  document.getElementById("form-accnum").value + "\n\n" + "Amount" + "\n"+  document.getElementById("form-amount").value 
        + "\n\n\n";
      message += "Message" + "\n" +  document.getElementById("form-cashout-message").value;
      request.message = paymentinfo + message;
    }
  } else if(document.getElementById("type-select").value === "mentoring initialize"){//mentoring initialize form
    let generalinfo = "[Mentee General Information]\n\n";
    let concern = "[Concern]\n\n";
    let interests = "[Interests]\n\n";
    let message = "\n\n\n[Message]\n\n";
    
    if(
      document.getElementById("form-school").value !== "" || 
      document.getElementById("form-grade").value !== "" || 
      document.getElementById("form-academics").value !== "" || 
      document.getElementById("form-activities").value !== "" || 
      document.getElementById("form-collageapp").value !== "" || 
      document.getElementById("form-major").value !== "" || 
      document.getElementById("form-college").value !== "" || 
      document.getElementById("form-initialize-message").value !== ""
      ){
        generalinfo += "School" + "\n" +  document.getElementById("form-school").value + "\n\n" + "Grade" + "\n"+  document.getElementById("form-grade").value 
          + "\n\n\n";
        concern += "Academics" + "\n" +  document.getElementById("form-academics").value + "\n\n" + "Activities" + "\n"+  document.getElementById("form-activities").value + "\n\n" 
        + "College Application" + "\n"+  document.getElementById("form-collageapp").value + "\n\n\n";
        interests += "Major" + "\n" +  document.getElementById("form-major").value + "\n\n" + "College" + "\n"+  document.getElementById("form-college").value + "\n\n" 
        + "Interested Mentor's documentID" + "\n";
        for(let i = 1; i <= docIDCount; i += 1) {
          if(document.getElementById('form-docID-'+i).value !== "") {
            interests += document.getElementById("form-docID-" + i).value + "\n";
          } else {
              document.getElementById("missing").style.display = "block";
              document.getElementById("duplicated").style.display = "none";
              document.getElementById("success").style.display = "none";
              document.getElementById("invalid").style.display = "none";
              return;
          }
        }
        message += "Message" + "\n" +  document.getElementById("form-initialize-message").value;


        request.message = generalinfo + concern + interests + message;
      }
    } else {//message form
    if(document.getElementById("form-message").value !== ""){
      request.message = "[Message]\n\n" + document.getElementById("form-message").value;
    }
  }
  if(
    document.getElementById("type-select").value === "cashout" && 
    (
      document.getElementById("form-accnum").value === "" || 
      document.getElementById("form-amount").value === "" || 
      document.getElementById("form-cashout-message").value === "" 
    )){
      document.getElementById("missing").style.display = "block";
      document.getElementById("duplicated").style.display = "none";
      document.getElementById("success").style.display = "none";
      document.getElementById("invalid").style.display = "none";
  } else if(
    document.getElementById("type-select").value === "mentoring initialize" && 
    (
      document.getElementById("form-school").value === "" || 
      document.getElementById("form-grade").value === "" || 
      document.getElementById("form-academics").value === "" || 
      document.getElementById("form-activities").value === "" || 
      document.getElementById("form-collageapp").value === "" || 
      document.getElementById("form-major").value === "" || 
      document.getElementById("form-college").value === "" || 
      document.getElementById("form-initialize-message").value === ""
    )){
      //check for all the docIDs
      for(let i = 1; i <= docIDCount; i += 1) {
        if(document.getElementById('form-docID-'+i).value === "") {
          document.getElementById("missing").style.display = "block";
          document.getElementById("duplicated").style.display = "none";
          document.getElementById("success").style.display = "none";
          document.getElementById("invalid").style.display = "none";
          return;
        }
      }
      document.getElementById("missing").style.display = "block";
      document.getElementById("duplicated").style.display = "none";
      document.getElementById("success").style.display = "none";
      document.getElementById("invalid").style.display = "none";
  } else if (
    document.getElementById("type-select").value !== "cashout" && 
    document.getElementById("type-select").value !== "mentoring initialize" && 
    document.getElementById("form-message").value === "" 
    ){
      document.getElementById("missing").style.display = "block";
      document.getElementById("duplicated").style.display = "none";
      document.getElementById("success").style.display = "none";
      document.getElementById("invalid").style.display = "none";
  } else {
      const userInput = request;
      const response = await fetch('https://api.uniqon.kr/support-ticket', {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(userInput),
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const jsonResponse = await response.json();//error handling
      if(response.status === 401 || response.status === 403) {
        if(await renew()) {
          await loadTypes();
        }
        return;
      } else if(response.status === 400) {
          if(jsonResponse.error.includes("Missing Fields")){
            document.getElementById("missing").style.display = "block";
            document.getElementById("duplicated").style.display = "none";
            document.getElementById("success").style.display = "none";
            document.getElementById("invalid").style.display = "none";
          } else if(jsonResponse.error.includes("Account Not Verified")){
            alert("Account Not Verified");
            location.href = "{{ site.baseurl }}/mypage";
          } else if(jsonResponse.error.includes("Invalid Input")){
            document.getElementById("missing").style.display = "none";
            document.getElementById("duplicated").style.display = "none";
            document.getElementById("success").style.display = "none";
            document.getElementById("invalid").style.display = "block";
          }
      } else if(response.status === 201) {
        document.getElementById("missing").style.display = "none";
        document.getElementById("duplicated").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("invalid").style.display = "none";
        setTimeout(() => {
          location.href = "{{ site.baseurl }}/mypage";
        }, 2000);
      } else {
        await saveDraft();
        alert("Server Error!!");
        setTimeout(() => {
            location.reload();
        }, 2000);
      }
  }
}
loadTypes();
typeChange();

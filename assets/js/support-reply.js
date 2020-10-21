---
---
//TODO if format changed later, make this async function and use data fetched from api
function load(){
  document.getElementById("ticketID").innerHTML += localStorage.getItem('supportTicketID');
}
load();

async function submit() {
  document.getElementById("submitButton").disabled = true;
  // Check Input
  const request = {};

  if(document.getElementById("form-message").value !== ""){
    request.message = "[Message]\n\n" + document.getElementById("form-message").value;
  }

  if(
    document.getElementById("form-message").value === "" 
    ){
      document.getElementById("missing").style.display = "block";
      document.getElementById("duplicated").style.display = "none";
      document.getElementById("success").style.display = "none";
      document.getElementById("invalid").style.display = "none";
  } else {
      const userInput = request;
      const response = await fetch('https://api.uniqon.kr/support-ticket/' + localStorage.getItem('supportTicketID') + "/reply", {
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

function requiredCheck() {
  // check whether input field is written or not
  if(document.getElementById("form-message").value !== "") { // when field contains value
      // unset background
      document.getElementById("form-message").style.backgroundColor = "#fcfcfc";
  } else {
      // set background
      document.getElementById("form-message").style.backgroundColor = "#ffe4e4";
  }
}
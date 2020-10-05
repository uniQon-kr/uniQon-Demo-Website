---
---

async function loadMentor() {
  const response = await fetch('https://api.uniqon.kr/support-ticket/' + localStorage.getItem('supportTicketID'), {
      credentials: 'include',
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json'
      }
  });
  let jsonResponse = await response.json();
  
  if(response.ok) {
    const ticketID = jsonResponse.contents.ticketID;
    const title = jsonResponse.contents.title;
    const type = jsonResponse.contents.type;
    const generated = jsonResponse.contents.generated;
    const conversation = jsonResponse.contents.conversation;

    //display each categories if they exist
    if(ticketID != null){
      document.getElementById("ticketID").innerHTML += ticketID;
      document.getElementById("ticketID").style.display = "block";
    }
    if(title != null){
      document.getElementById("ticketTitle").innerHTML += title;
      document.getElementById("ticketTitle").style.display = "block";
    }
    if(type != null){
      document.getElementById("ticketType").innerHTML += type;
      document.getElementById("ticketType").style.display = "block";
    }
    if(generated != null){
      document.getElementById("generatedDate").innerHTML += generated;
      document.getElementById("generatedDate").style.display = "block";
    }
    if(conversation.length >= 1){
      if(conversation.length > 1){
        document.getElementById("conversationButton").style.display = "block";
        for(i=1; i<conversation.length; i++) {
        conversationCount = i + 1;
        document.getElementById("conversations").innerHTML += `
        <p id = "header-${conversationCount}" onclick = "expand(${conversationCount})" class = "subtitle">${conversation[i].time}, ${conversation[i].userID} <a> (Click to expand/collapse message)</a></p>
        <div class = "detail-box collapsable" id = "conversation-${conversationCount}">
          <div class = "textbox">
            <p class = "content" id = "userID-${conversationCount}"><span class = "content-title">User ID: </span></p>
            <p class = "content" id = "generatedTime-${conversationCount}"><span class = "content-title">Time: </span></p>
            <p class = "content" id = "message-${conversationCount}"><span class = "content-title">Message: </span></p>
            <p class = "content" id = "fileAttached-${conversationCount}"><span class = "content-title">File Attached: </span></p>
          </div>
        </div>
        `;
        }
      }
      for(i=0; i<conversation.length; i++){
        conversationCount = i + 1;
        document.getElementById("userID-" + conversationCount).style.display = "block";
        document.getElementById("generatedTime-" + conversationCount).style.display = "block";
        document.getElementById("message-" + conversationCount).style.display = "block";
        document.getElementById("fileAttached-" + conversationCount).style.display = "block";

        document.getElementById("userID-" + conversationCount).innerHTML += conversation[i].userID;
        document.getElementById("generatedTime-" + conversationCount).innerHTML += conversation[i].time;
        document.getElementById("message-" + conversationCount).innerHTML += "<br/><br/>";
        document.getElementById("message-" + conversationCount).innerHTML += conversation[i].contents.replace(/\n/g, "<br/>");
        //TODO figure out how to handle files
        if(conversation[i].files.length === 0){
          document.getElementById("fileAttached-" + conversationCount).innerHTML += "none";
        }
      }
    }
  }
  else if(response.status === 401 || response.status === 403) {
    if(await renew()) {
      await loadMentor();
    }
    return;
  } 
  //TODO error handling
}


function expand(i){
  if(document.getElementById("conversation-" + i).style.display === "" || document.getElementById("conversation-" + i).style.display === "none"){
    document.getElementById("conversation-" + i).style.display = "block";
  } else if(document.getElementById("conversation-" + i).style.display === "block"){
    document.getElementById("conversation-" + i).style.display = "none";
  }
}
loadMentor();
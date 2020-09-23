let page = 1;
let jsonResponse;

async function list() {
  const responseUrl = `https://api.uniqon.kr/document/application/list?from=${(page*15)-14}&to=${(page*15)+1}`
  const response = await fetch(responseUrl, {
      credentials: 'include',
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
  });

  if(response.ok) {
    jsonResponse = await response.json();
    const length = jsonResponse.appList.length;
    let nextPage = false;
    if(length === 16){nextPage = true;} //check if there is more profiles after 
    
    //controls navbar arrows
    if (page===1){
      document.getElementById('previous').style.display = "none";
    } else if (!nextPage){
      document.getElementById('next').style.display = "none";
    } else {
      document.getElementById('previous').style.display = "initial";
      document.getElementById('next').style.display = "initial";
    }
    
    //clears form
    for (i = 0; i < 15; i++) {
      document.getElementById("mentor-wrapper-" + i).style.display = "none";
      document.getElementById("college-name-" + i).src = "";
    }
    
    //draw profiles onto the form
    if (length >= 15) {
      for (i = 0; i < 15; i++) { 
        let jsonObj = jsonResponse.appList[i];
        
        document.getElementById("mentor-wrapper-" + i).style.display = "grid";
        document.getElementById("mentor-school-" + i).innerHTML = jsonObj.collegeName + "(" + jsonObj.expectedGrad + ")";
        document.getElementById("mentor-name-" + i).innerHTML = jsonObj.mentorID;
        document.getElementById("college-name-" + i).src = "/assets/school-logo/" + jsonObj.collegeName.replace(/ /g,'-') + ".png";
      }
    }else{
      for (i = 0; i < length; i++) {
        let jsonObj = jsonResponse.appList[i];
        
        document.getElementById("mentor-wrapper-" + i).style.display = "grid";
        document.getElementById("mentor-school-" + i).innerHTML = jsonObj.collegeName + "(" + jsonObj.expectedGrad + ")";
        document.getElementById("mentor-name-" + i).innerHTML = jsonObj.mentorID;
        document.getElementById("college-name-" + i).src = "/assets/school-logo/" + jsonObj.collegeName.replace(/ /g,'-') + ".png";
        document.getElementById('next').style.display = "none";
      }
    }
  }
}

list();

async function formatter(nav) {
  page += nav;
  document.getElementById('page').innerHTML = page;

  list();
}

async function openDetail(x) {
  window.open("/application");
  
  localStorage.setItem('docID', jsonResponse.appList[x].docID);
}
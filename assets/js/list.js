let listRem,index,from,to,page,maxPage,length;
page = 1;
from = page * 15;
to = from - 14;

async function list() {
  const response = await fetch('https://api.uniqon.kr/document/application/list', {
      url: 'https://api.uniqon.kr/document/application/list?from=' + from + '&to=' + to,
      credentials: 'include',
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
  });
  if(response.ok) {
    jsonResponse = await response.json();
    length = jsonResponse.appList.length;
    maxPage = length/15;
  }
  
  for (i = 0; i < 15; i++) {
    document.getElementById("mentor-wrapper-" + i).style.display = "none";
    document.getElementById("college-name-" + i).src = "";
  }
  
  if (length > 15) {
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

async function formatter(nav) {
  page += nav;
  from = page * 15;
  to = from - 14;
  document.getElementById('page').innerHTML = page;

  if (page===1){
    document.getElementById('previous').style.display = "none";
  } else if (page===maxPage){
    document.getElementById('next').style.display = "none";
  } else {
    document.getElementById('previous').style.display = "initial";
    document.getElementById('next').style.display = "initial";
  }

  list(from, to);
}

async function openDetail(x) {
  window.open("/application");
  localStorage.clear();
  
  localStorage.setItem('docID', jsonResponse.appList[x].docID);
  localStorage.setItem('mentorName', jsonResponse.appList[x].mentorID);
}
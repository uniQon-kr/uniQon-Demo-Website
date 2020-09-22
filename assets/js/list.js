let listRem,index,from,to,page,maxPage;
page = 1;

async function list(from, to) {
  const response = await fetch('https://api.uniqon.kr/application/list', {
      url: 'https://api.uniqon.kr/document/application/list?from=' + from + '&to=' + to,
      credentials: 'include',
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
  });
  if(response.ok) {
    jsonResponse = await response.json();
    maxPage = jsonResponse.length/15;
  }
}

list();

async function refresh(nav) {
  for (i = 0; i < 15; i++) {
    document.getElementById("mentor-wrapper-" + i).style.display = "none";
    document.getElementById("college-name-" + i).src = "";
    document.getElementById("college-name-" + i).src = "";
  }
  if(nav!=null){formatter(nav);}
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
  generate();
}

async function generate() {
  if (page)
  if (jsonResponse.length > 15) {
    for (i = 0; i < 15; i++) {
      let jsonObj = jsonResponse[i];
      
      document.getElementById("mentor-name-" + i).innerHTML = jsonObj.mentorID + " " + jsonObj.expectedGrad;
      document.getElementById("college-name-" + i).src = "{{ site.baseurl }}/assets/school-logo/" + jsonObj.collegeName + ".png";
    }
  }
  else{
    for (i = 0; i < jsonResponse.length; i++) {
      let jsonObj = jsonResponse[i];
      
      document.getElementById("mentor-name-" + i).innerHTML = jsonObj.mentorID + " " + jsonObj.expectedGrad;
      document.getElementById("college-name-" + i).src = "{{ site.baseurl }}/assets/school-logo/" + jsonObj.collegeName + ".png";
    }
  }
}

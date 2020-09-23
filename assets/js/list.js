let page = 1;
let maxPage = Number.MAX_VALUE;
let jsonResponse;

async function list() {
  // before it loads check if page is in possible range
  if (page <= 0) {
    page = 1;
    document.getElementById('page').innerHTML = page;
  } else if (page > maxPage) {
    page = maxPage;
    document.getElementById('page').innerHTML = page;
  }

  // Fetch List of Mentors
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

    //check if there is more profiles after 
    if(length === 16) {
      nextPage = true;
    } else if(length === 0) {
      maxPage = page - 1;
      document.getElementById('page').innerHTML = page;
      list();
      return;
    } else {
      maxPage = page;
    }

    //controls navbar arrows
    if(!nextPage && page===1) {
      document.getElementById('previous').style.display = "none";
      document.getElementById('next').style.display = "none";
    } else if (!nextPage){
      document.getElementById('previous').style.display = "initial";
      document.getElementById('next').style.display = "none";
    } else if (page===1){
      document.getElementById('previous').style.display = "none";
      document.getElementById('next').style.display = "initial";
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
    
    for (i = 0; i < (length > 15 ? 15 : length); i++) {
      let jsonObj = jsonResponse.appList[i];
      document.getElementById("mentor-wrapper-" + i).style.display = "grid";
      document.getElementById("mentor-school-" + i).innerHTML = jsonObj.collegeName + " (" + jsonObj.expectedGrad + ")";
      document.getElementById("mentor-name-" + i).innerHTML = jsonObj.mentorID;
      document.getElementById("college-name-" + i).src = "/assets/school-logo/" + jsonObj.collegeName.replace(/ /g,'-') + ".png";
    }
  }
}

async function formatter(nav) {
  page += nav;
  document.getElementById('page').innerHTML = page;

  list();
}

async function openDetail(x) {
  if(jsonResponse.appList[x] != null) {
    localStorage.setItem('docID', jsonResponse.appList[x].docID);
    window.open("/application");
  }
}

list();
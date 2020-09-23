---
---

async function loadMentor() {
  let response = await fetch('https://api.uniqon.kr/document/application/' + localStorage.getItem('docID'), {
      credentials: 'include',
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json'
      }
  });
  if(response.ok) {
    let jsonResponse = await response.json();
    
    const mentorName = localStorage.getItem('docID').split("_")[0];
    const admittedMajor = jsonResponse.admittedMajor;
    const grad = jsonResponse.grad;
    const college = jsonResponse.college;
    const background = jsonResponse.background;
    const academics = jsonResponse.academics;
    const honorsCount = jsonResponse.honorsCount;
    const activitiesCount = jsonResponse.activitiesCount;
    const essay = jsonResponse.essay;
    const additionalInfo = jsonResponse.additionalInfo;
    
    document.getElementById("college-image").src = "/assets/school-logo/" + college.name.replace(/ /g,'-') + ".png";
  
    document.getElementById("mentor-name").innerHTML = mentorName;
    document.getElementById("grad").innerHTML = college.grad;
    document.getElementById("mentor-major").innerHTML = college.admittedMajor;
    document.getElementById("mentor-school").innerHTML = college.name;

    //display each categories if they exist
    if(college.name != null){
      document.getElementById("collegeName").innerHTML += college.name;
      document.getElementById("collegeName").style.display = "block";
    }
    if(college.admittedMajor != null){
      document.getElementById("admittedMajor").innerHTML += college.admittedMajor;
      document.getElementById("admittedMajor").style.display = "block";
    }
    if(college.grad != null){
      document.getElementById("expectedGrad").innerHTML += college.grad;
      document.getElementById("expectedGrad").style.display = "block";
    }

    if(background.citizenship != null){
      document.getElementById("citizenship").innerHTML += background.citizenship;
      document.getElementById("citizenship").style.display = "block";
    }
    if(background.gender != null){
      document.getElementById("gender").innerHTML += background.gender;
      document.getElementById("gender").style.display = "block";
    }
    if(background.ethnicity != null){
      document.getElementById("ethnicity").innerHTML += background.ethnicity;
      document.getElementById("ethnicity").style.display = "block";
    }
    //for hooks if they dont exist display N/A and if they do bullet list them
    document.getElementById("hooks").style.display = "initial";
    if(background.hooks.length == 0){
      document.getElementById("NA").innerHTML += "N/A";
      document.getElementById("NA").style.display = "inline";
    } else{
      for(i=0; i<background.hooks.length; i++){
        document.getElementById("hooksList").innerHTML += "<li>" + background.hooks[i] + "</li>";
      }
    }

    if(academics.weightedGPA != null){
      document.getElementById("weightedGPA").innerHTML += academics.weightedGPA;
      document.getElementById("weightedGPA").style.display = "block";
    }
    if(academics.act != sat1){
      document.getElementById("sat1").innerHTML += academics.sat1;
      document.getElementById("sat1").style.display = "block";
    }
    if(academics.sat2 != null){
      document.getElementById("sat2").innerHTML += academics.sat2 + "개 항목 확인";
      document.getElementById("sat2").style.display = "block";
    }
    if(academics.act != null){
      document.getElementById("act").innerHTML += academics.act;
      document.getElementById("act").style.display = "block";
    }
    if(academics.ap != null){
      document.getElementById("apCount").innerHTML += academics.ap + "개 항목 확인";
      document.getElementById("apCount").style.display = "block";
    }
      
    if(academics.honorsCount === 0){
      document.getElementById("honorsBox").style.display = "none";
    }else{
      document.getElementById("honorsCount").style.display = "block";
      document.getElementById("honorsCount").innerHTML += honorsCount + "개 항목 확인";
    }
    if(academics.activitiesCount === 0){
      document.getElementById("activitiesBox").style.display = "none";
    }else{
      document.getElementById("activitiesCount").style.display = "block";
      document.getElementById("activitiesCount").innerHTML += activitiesCount + "개 항목 확인";
    }

    for (i=0; i < essay.length; i++){
      document.getElementById("essay-detail").innerHTML += "<p class = 'content-title'>" + essay[i].prompt + "</p>";
      document.getElementById("essay-detail").innerHTML += "<p class = 'essay'>" + essay[i].statement + "... - 프로필 열람 후 전체 에세이 확인 (" + essay[i].wordCount + " Words)</p>";
    }

    if (additionalInfo){
      document.getElementById("additionalInfo").innerHTML = "프로필 열람 후 전체 정보 확인";
    } else {
      document.getElementById("infoBox").style.display = "none";
    }

  } else if(response.status == 403) { //if the document is not verified
    document.getElementById("notReady").style.display = "block";
    document.getElementById("noDocument").style.display = "none";
    location.href = "{{ site.baseurl }}/mentors-list";
  } else if(response.status == 404) { //if the docID does not exist
    document.getElementById("notReady").style.display = "none";
    document.getElementById("noDocument").style.display = "block";
    location.href = "{{ site.baseurl }}/mentors-list";
  }
}

loadMentor();

async function bookmark() {//checking for bookmark
  const responseUrl = `https://api.uniqon.kr/document/application/` + localStorage.getItem('docID') + '/bookmark';
  const response = await fetch(responseUrl, {
      credentials: 'include',
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
  });
  const jsonResponse = await response.json();
  if(localStorage.getItem("uniQonSignedIn") === "true"){//display correct block of error
    if(jsonResponse.userType === 'mentee'){
      if(!jsonResponse.bookmarked){
        document.getElementById("bookmarkAdd").style.display = "block";
        document.getElementById("bookmarkDel").style.display = "none";
      }
      else{
        document.getElementById("bookmarkAdd").style.display = "none";
        document.getElementById("bookmarkDel").style.display = "block";
      }
    }
  }
}
bookmark();

async function bookmarkAdd() {//post bookmark
  const responseUrl = `https://api.uniqon.kr/document/application/` + localStorage.getItem('docID') + '/bookmark';
  const response = await fetch(responseUrl, {
      credentials: 'include',
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }
  });
  bookmark();
}
async function bookmarkDel() {//delete bookmark
  const responseUrl = `https://api.uniqon.kr/document/application/` + localStorage.getItem('docID') + '/bookmark';
  const response = await fetch(responseUrl, {
      credentials: 'include',
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      }
  });
  bookmark();
}
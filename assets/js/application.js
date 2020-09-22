async function loadMentors() {
  const response = await fetch('https://api.uniqon.kr//application/detail', {
      credentials: 'include',
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json'
      }
  });
  if(response.ok) {
    const jsonResponse = await response.json();
    
    name = jsonResponse.name;
    admittedMajor = jsonResponse.admittedMajor;
    grad = jsonResponse.grad;
    college = jsonResponse.college;
    background = jsonResponse.background;
    academics = jsonResponse.academics;
    expectedGrad = jsonResponse.honors;
    collegeName = jsonResponse.activities;
    expectedGrad = jsonResponse.essay;

    collegeImage = collegeName + ".png"
    document.getElementById("college-image").innerHTML = "{{ site.baseurl }}/assets/school-logo/" + collegeImage;
  
    document.getElementById("mentor-name").innerHTML = name;
    document.getElementById("grad").innerHTML = grad;
    document.getElementById("mentor-major").innerHTML = admittedMajor;

    document.getElementById("college-detail").innerHTML = "<li>"+college.name+"</li>"+"<li>"+college.admittedMajor+"</li>"+"<li>"+college.grad+"</li>";
    document.getElementById("background-detail").innerHTML = "<li>"+background.citizenship+"<li>"+background.gender+"</li>"+background.ethnicity+"</li>"+"<li>"+background.hooks+"</li>";
    document.getElementById("academics-detail").innerHTML = "<li>"+academics.weightedGPA+"</li>"+"<li>"+academics.sat1+"</li>"+"<li>"+academics.sat1.math+"</li>"+"<li>"+academics.sat1.readingWriting
      +"</li>"+"<li>"+academics.act+"</li>"+"<li>"+academics.act.english+"</li>"+"<li>"+academics.act.math+"</li>"+"<li>"+academics.act.reading+"</li>"+"<li>"+academics.act.science+"</li>"+
      "<li>"+academics.ap+"</li>";
      //ap not done forloop review needed

    //forloop
    document.getElementById("honors-detail").innerHTML += "<li>"+honors.title+"</li>"+"<li>"+honors.gradeLevel+"</li>"+"<li>"+honors.levelOfRecognition+"</li>";
    //end forloop
    //forloop
    document.getElementById("activities-detail").innerHTML += "<li>"+activities.type+"</li>"+"<li>"+activities.position+"</li>"+"<li>"+activities.organizationName+"</li>"+"<li>"+activities.description+"</li>"
    +"<li>"+activities.participationGradeLevel+"</li>"+"<li>"+activities.timeOfParticipation+"</li>";
    //end forloop

    } else{
    alert("Server Error!! Please Try Again");
    location.href = "{{ site.baseurl }}/";
  }
}

let name,admittedMajor,grad,college,background,academics,honors,activities,essay;
loadMentors();
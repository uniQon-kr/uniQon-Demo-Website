async function tsCheck(){
  var link = document.getElementById('ts');
  link.addEventListener('click', pageVisited);

  function pageVisited(){
      pageOpened = true;
  }

  if (!pageOpened){
    alert("Please read Terms and Services");
  }
}
var pageOpened = false;
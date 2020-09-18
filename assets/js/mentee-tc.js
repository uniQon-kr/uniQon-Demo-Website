---
---
async function loadTC() {
    const response = await fetch("{{ site.baseurl }}/assets/terms/mentee-full.txt");
    if(response.ok) {
        const text = await response.text();
        document.getElementById('tnc').innerHTML = text;
    } else {
        alert("Fail to Load Terms And Condtion!! Please Reload Site by Pressing F5");
    }
}

loadTC();
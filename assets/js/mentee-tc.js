---
---
async function loadTC() {
    const privacyResponse = await fetch("{{ site.baseurl }}/assets/terms/mentee-privacy.txt");
    const tosResponse = await fetch("{{ site.baseurl }}/assets/terms/mentee-tos.txt");

    if(privacyResponse.ok && tosResponse.ok) {
        const privacyText = await privacyResponse.text();
        const tosText = await tosResponse.text();
        document.getElementById('privacy').innerHTML = privacyText;
        document.getElementById('tos').innerHTML = tosText;
    } else {
        alert("Fail to Load Terms And Condtion!! Please Reload Site by Pressing F5");
    }
}

loadTC();
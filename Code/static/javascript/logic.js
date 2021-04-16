function changeState(id) {
    let l = document.getElementById(id);
    l.className = l.className === "on" ? "off" : "on";
}


function collect() {
    let form = document.getElementById("form").getElementsByTagName("label")
    let data = {}
    for (let i = 0; i < 5; i++) {
        data[form[i].id] = form[i].className
    }
    console.log(JSON.stringify(data))


    fetch("/submit_days/", {method: "POST", redirect: "follow", body: JSON.stringify(data)}).then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        }
    })
    return "fs"
}
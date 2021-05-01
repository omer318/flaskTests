function changeState(id) {
    let l = document.getElementById(id);
    l.className = l.className === "on" ? "off" : "on";
}


function collect(e) {
    e.preventDefault()
    let form = document.getElementById("form").getElementsByTagName("label")
    let data = {}
    let days = {}
    data["name"] = document.getElementById("name").value
    for (let i = 0; i < 5; i++) {
        days[capitalize(form[i].id)] = form[i].className
    }
    data["days"] = days
    console.log(JSON.stringify(data))


    fetch("/submit_days/", {method: "POST", redirect: "follow", body: JSON.stringify(data)}).then(response => {
        if (response.ok) {
            window.location.href = "/table/";
        }
    })
    return "fs"
}


const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
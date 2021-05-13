function changeState(id) {
    let l = document.getElementById(id);
    l.className = l.className === "on" ? "off" : "on";
}


async function collect(e) {
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


    let response = await fetch("/submit_days/", {method: "POST", redirect: "follow", body: JSON.stringify(data)});

    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        window.location.href = "/table/";
    } else {
        let res = await response.json()
        setErrorMessage(res["message"])
    }
}


const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function setErrorMessage(message){
    document.getElementById("error_box").innerText = message
}
let init = () => {

    let main = (() => {
        let btnSub = document.getElementById(`btn-Submit`);
        let name = document.getElementById(`name`);
        let surname = document.getElementById(`surname`);

        let getCookie = () => {
            let matches = document.cookie.match(/csrftoken=([\w-]+)/);
            if (matches[1]) {
                return matches[1];
            } else {
                console.log(`cookie is not taken`);
            }
        }
        //csrftoken
        let rigthToken = getCookie();
        console.log(`rigthToken = ${rigthToken}`);

        btnSub.onclick = (event) => {
            event.preventDefault();

            let url = `test/`;
            let xhttp = new XMLHttpRequest();


            let data = {
                name: name.value,
                surname: surname.value
            }

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(`Sucsess !`);
                }
            }
            xhttp.onload = () => {
                console.log(JSON.parse(xhttp.response));
            }

            xhttp.open(`POST`, url, true);
            xhttp.setRequestHeader(`Content-type`, `application/json`);


            xhttp.setRequestHeader(`X-CSRFToken`, `${rigthToken}`);
            xhttp.responseType = `json`;
            xhttp.send(JSON.stringify(data));
        }

    })();

}
window.addEventListener(`load`, init, false);
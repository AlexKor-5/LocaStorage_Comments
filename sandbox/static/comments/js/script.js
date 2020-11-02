let init1 = () => {
    let btn_comment = document.getElementById(`btn-comment`);
    let userName = document.getElementById(`userName`);
    let userComments = document.getElementById(`userComments`);
    Allcomments = [];
    let dataComments = document.getElementById(`dataComments`);
    let indexServer = -1;

    let timeConverter = (UNIX_timestamp) => {
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    let showComments = () => {
        [...dataComments.children].forEach((element) => {
            dataComments.removeChild(element);
        });
        Allcomments.forEach((element, index) => {
            DOMcreatingComments = (() => {
                dataComments.insertAdjacentHTML(`afterbegin`, `
                  <div class="alert alert-info">
                     <div class="text-right">${element.date}</div>
                     <div><span class="badge badge-light padding10 marginbottom10">${element.name}</span></div>
                     <div>${element.comment}</div>
                  </div>
                `);

            })();
        });
    }

    let saveComments = () => {
        localStorage.setItem(`comments`, JSON.stringify(Allcomments));
    }

    let loadComments = () => {
        if (localStorage.getItem(`comments`)) {
            Allcomments = JSON.parse(localStorage.getItem(`comments`));
        }
        showComments();
    }

    async function sendToServer(object) {
        console.log(object);
        let url = `temp/`; //////////////////////////Change url !!!
                              // url to send current comment data to server
        fetch(url, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
            .then((response) => {
                if (response.ok) {
                    return
                } else {
                    console.log(`Error`);
                }
            });
    }

    let addComment = () => {
        let date = new Date();
        indexServer++;
        let object = {
            name: userName.value,
            comment: userComments.value,
            date: timeConverter(date / 1000),
            index: indexServer
        }
        Allcomments.push(object);
        saveComments();
        showComments();
        sendToServer(object);

        userName.value = ``;
        userComments.value = ``;
    }

    let main = (() => {
        loadComments();
        btn_comment.addEventListener(`click`, addComment, false);
    })();
}
window.addEventListener(`load`, () => {
    init1();
    let url = `ttemp/`; //////////////////////////Change url !!!
                          // url to get ALL comments data from server
    let request = new XMLHttpRequest();
    request.open(`GET`, url, true);
   
    request.responseType = `json`;
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            console.log(`Sucsess !`);
        }
    }
    request.onload = () => {
     console.log(request.response);
    }
    // request.setRequestHeader('Content-Type','application/json');
    request.send(null);

}, false);
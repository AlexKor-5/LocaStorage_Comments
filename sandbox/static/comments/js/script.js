let getAllIfrormation = () => {
    let indexServer = -1;
    let url = `ttemp/`;
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
        let gottenObj = request.response;

        if (gottenObj.length !== 0) {
            let findMaxindex = () => {
                let m = [];
                for (let i = 0; i < gottenObj.length; i++) {
                    m.push(gottenObj[i].index);
                }
                return Math.max(...m);
            }
            indexServer = findMaxindex();
        }
        init1(indexServer, gottenObj);
    }

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(null);
}

let init1 = (indexServer, dataObj) => {
    let btn_comment = document.getElementById(`btn-comment`);
    let userName = document.getElementById(`userName`);
    let userComments = document.getElementById(`userComments`);
    Allcomments = [];
    let dataComments = document.getElementById(`dataComments`);

    let displayAllServerData = async (DaTAObj) => {
        let dataObj = await DaTAObj;
        let sortOut = (() => {
            dataObj.sort((a, b) => {
                return a.index - b.index;
            });
            dataObj.reverse();
            console.log(dataObj);
        })();

        console.log(`display OBJ`);
        console.log(dataObj);
        let out = ``;
        for (let i = 0; i < dataObj.length; i++) {
            out += `
                 <div class="alert alert-info">
                    <div class="text-right">${dataObj[i].data}</div>
                    <div><span class="badge badge-light padding10 marginbottom10">${dataObj[i].name}</span></div>
                    <div>${dataObj[i].comment}</div>
                 </div>
                `;
        };
        dataComments.innerHTML = out;
        console.log(`i ma working!!!`);
    };
    displayAllServerData(dataObj);

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

    let sendToServer = async (object, callback) => {
        let url = `temp/`;
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
            })
            .finally(() => {
                let acting345 = (async () => {
                    let resObj = await callback();
                    displayAllServerData(resObj);
                })();
            });
        return true;
    }

    let addComment = async () => {
        let date = new Date();
        indexServer++;

        let object = {
            name: userName.value,
            comment: userComments.value,
            date: timeConverter(date / 1000),
            index: indexServer
        }

        let acting = async () => {
            let url = `ttemp/`;
            let response2 = await fetch(url);
            let gotten = await response2.json();

            console.log(`----gotten-----`);
            console.log(gotten);
            return gotten;
        };
        sendToServer(object, acting);
        displayAllServerData(dataObj);

        userName.value = ``;
        userComments.value = ``;
    }

    let main = (() => {
        btn_comment.addEventListener(`click`, addComment, false);

        window.addEventListener(`storage`, (event) => {
            console.log(`storage change`);
        }, false);
    })();
}
window.addEventListener(`load`, () => {
    getAllIfrormation();
}, false);
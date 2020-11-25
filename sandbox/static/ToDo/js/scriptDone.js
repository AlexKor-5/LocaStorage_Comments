let loadAllDataStart = async () => {
    let url = `/todo/load_done/`;
    let response = await fetch(url);
    let result = 0;
    if (response.ok) {
        result = await response.json();
        doneinit(result);
    } else {
        console.log(`Error! in loadAllDataStart`);
    }
}

let doneinit = (allData) => {
    _out = document.getElementById(`out`);
    btnsRemoveALL = document.getElementById(`btn-removeall`);
    dones = [];
    removes = [];
    returnToList = [];
    list = [];
    let belter;
    console.log(allData);

    let getCookie = () => {
        let matches = document.cookie.match(/csrftoken=([\w-]+)/);
        if (matches[1]) {
            return matches[1];
        } else {
            console.log(`cookie is not taken`);
        }
    }
    let rigthToken = getCookie();

    let redefineBtns = (btnType) => {
        if (btnType === `removes`) {
            btnsRemoves = document.querySelectorAll(`[data-btn-remove]`);
            removes.splice(0, btnsRemoves.length);
            btnsRemoves.forEach((element) => {
                removes.push(element);
            });
            removes.reverse();
        }
        if (btnType === `returnTo`) {
            btnsReturnTo = document.querySelectorAll(`[data-btn-returnToDone]`);
            returnToList.splice(0, btnsReturnTo.length);
            btnsReturnTo.forEach((element) => {
                returnToList.push(element);
            });
            returnToList.reverse();
        }
    }

    let displayInDOM = () => {
        [..._out.children].forEach((element) => {
            _out.removeChild(element);
        });
        dones.forEach((element, index) => {
            _out.insertAdjacentHTML(`afterbegin`, `
            <div class="alert alert-info">
                        <div><span class="badge badge-secondary padding10 margin10">${index + 1}</span>${element.todo}</div>
                        <button type="submit" class="btn btn-danger" data-btn-remove>Remove </button>
                        <button type="submit" class="btn btn-warning" data-btn-returnToDone>Return to list</button>
                    </div>
            `);
        });
    }

    let bubblingAct = (event) => {
        if (!event.target.matches(`[data-btn-remove]`)) return;
        removes.forEach((element, index) => {
            if (element == event.toElement) {
                let remover = dones.splice(index, 1);

                let url = `/todo/delete/`;
                fetch(url, {
                    method: `DELETE`,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': rigthToken
                    },
                    body: JSON.stringify(remover[remover.length - 1])
                })
                    .then((response) => {
                        if (response.ok) return response.json();
                        else throw Error(`Server connection problem!`);
                    })
                    .then((res) => {
                        console.log()
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                displayInDOM();

                redefineBtns(`removes`);
                redefineBtns(`returnTo`);
            }
        });
    }

    let bubblingActReturn = (event) => {
        if (!event.target.matches(`[data-btn-returnToDone]`)) return;
        returnToList.forEach((element, index) => {
            if (element == event.toElement) {

                list.push(dones[index]);
                let returner = dones.splice(index, 1);
                returnToList.splice(index, 1);
                
                (async () => {
                    let url = `/return`;
                    let response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': rigthToken
                        },
                        body: returner[returner.length - 1]
                    });
                    if (response.ok) {
                        console.log(`OK Return`);
                    } else {
                        console.log(`Error Not Return`);
                    }
                })();

                displayInDOM();
                redefineBtns(`removes`);
                redefineBtns(`returnTo`);
            }
        });
    }
    let removeAll = (event) => {
        event.preventDefault();
        for (let i = dones.length - 1; i >= 0; i--) {
            dones.splice(i, 1);
        }

        (async () => {
            let url = `/todo/remove_all_done/`;
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': rigthToken
                },
                body: null
            });
        })();


        displayInDOM();
        redefineBtns(`removes`);
        redefineBtns(`returnTo`);
    }

    let main = (() => {
        // load all at the beginning
        let loadAllTasksFromDatabase = (() => {
            dones = allData;
            displayInDOM();
            redefineBtns(`removes`);
            redefineBtns(`returnTo`);
        })();

        _out.addEventListener(`click`, bubblingAct, false);
        _out.addEventListener(`click`, bubblingActReturn, false);
        btnsRemoveALL.addEventListener(`click`, removeAll, false);
    })();
}
window.addEventListener(`load`, loadAllDataStart, false);
window.addEventListener(`focus`, () => {
    loadAllDataStart();
}, false);
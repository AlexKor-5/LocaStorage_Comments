let queryToGetAllInfo = async () => {
    let url = 'load/'; // you send me all info from the database which saves All.
    let response = await fetch(url); //method GET
    if (response.ok) {
        let allData = await response.json();
        init(allData);
    }
    else { console.log(`Error in loading all data at the beginning!`) };
}
let init = (allData) => {
    let _text = document.getElementById(`text`);
    let _btnSubmit = document.getElementById(`btn-submit`);
    const _btnDoneall = document.getElementById(`btn-doneall`);
    const _btnRemoveall = document.getElementById(`btn-removeall`);
    let btnDones = document.querySelectorAll(`[data-btn-done]`);
    let btnRemoves = document.querySelectorAll(`[data-btn-remove]`);
    let _out = document.getElementById(`out`);
    list = [];
    dones = [];
    arr = [];
    removes = [];
    let toDolistIndex = -1;

    console.log(`All data = `);
    console.log(allData);

    let newAssignment = (() => {
        list = allData;
        let findMaxIndex = () => {
            let M = [];
            for (let i = 0; i < list.length; i++) {
                M.push(list[i].index);
            }
            console.log(M);
            if (list.length == 0) {
                toDolistIndex = -1;
                return toDolistIndex;
            } else {
                return Math.max(...M);
            }
        }
        toDolistIndex = findMaxIndex();
    })();

    let showItemsInDOM = (list) => {
        [..._out.children].forEach((element) => {
            _out.removeChild(element);
        });
        list.forEach((element, index) => {
            _out.insertAdjacentHTML(`afterbegin`, `
            <div class="alert alert-info">
                 <div><span class="badge badge-secondary padding10 margin10">${index + 1}</span>${element.todo}</div>
                 <button type="submit" class="btn btn-success" data-btn-done>Done </button>
                 <button type="submit" class="btn btn-danger" data-btn-remove>Remove </button>
            </div>
            `);
            _text.value = ``;
        });
    }

    let redefineArr = () => {
        btnDones = document.querySelectorAll(`[data-btn-done]`);
        arr.splice(0, arr.length);
        btnDones.forEach((element, index) => {
            arr.push(element);
        });
        arr.reverse();
    }

    let redefineRemoves = () => {
        btnRemoves = document.querySelectorAll(`[data-btn-remove]`);
        removes.splice(0, removes.length);
        btnRemoves.forEach((element, index) => {
            removes.push(element);
        });
        removes.reverse();
    }

    let getCookie = () => {
        let matches = document.cookie.match(/csrftoken=([\w-]+)/);
        if (matches[1]) {
            return matches[1];
        } else {
            console.log(`cookie is not taken`);
        }
    }
    let rigthToken = getCookie();

    let addTaskToDOM = () => { //Call in main

        _text = document.getElementById(`text`);
        let text = _text.value;
        toDolistIndex++;

        let obj = {
            todo: text,
            index: toDolistIndex
        }

        list.push(obj);

        let submitSendToServer = (async () => {
            let url = `/todo/submit/`;   ///////////////// Submit url path (change!)
            /// Send to the database which saves All.
            let response = await fetch(url, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': rigthToken
                },
                body: JSON.stringify(obj)
            })
            if (response.ok) { let answer = await response.json(); console.log(answer); }
            else console.log(`Error has just happend in submitSendToServer fetch!`);

        })();

        showItemsInDOM(list);

        redefineArr();
        redefineRemoves();

    }

    let clickBtnsDoneOn = (event) => {
        if (!event.target.matches(`[data-btn-done]`)) return;
        if (event.target.matches(`[data-btn-done]`)) {

            arr.forEach((element, index) => {
                if (element == event.toElement) {
                    let doner = list.splice(index, 1);

                    if (doner[doner.length - 1]) {
                        dones.push(doner[doner.length - 1]);
                        let submitSendToServer = (async () => {
                            let url = `/todo/done/`;   ///////////////// Done url path (change!)
                            /// Send to the database which saves the only list of dones.
                            /// When you get this object you should delete it in the database which saves All.
                            let response = await fetch(url, {
                                method: `POST`,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-CSRFToken': rigthToken
                                },
                                body: JSON.stringify(doner[doner.length - 1])
                            })
                            if (response.ok) { let answer = await response.json(); console.log(answer); }
                            else console.log(`Error has just happend in submitSendToServer fetch!`);

                        })();
                    }

                    arr.splice(index, 1);

                    removes.splice(index, 1);
                    showItemsInDOM(list);
                    redefineArr();
                    redefineRemoves();
                }
            });
            event.stopPropagation();
        };
    }
    let clickBtnsRemoveOn = (event) => {
        if (!event.target.matches(`[data-btn-remove]`)) { return } else {
            removes.forEach((element, index) => {
                if (element == event.toElement) {

                    let remover = list.splice(index, 1);
                    console.log(remover);

                    let url = `/todo/delete/`; // Delete url path (change!).
                    // You have to delete this object which has just been sent to the server.
                    // It is needed to be deleted in the database which saves All and in the database which saves the only list of dones.
                    fetch(url, {
                        method: `POST`,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': rigthToken
                        },
                        body: JSON.stringify(remover)
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

                    arr.splice(index, 1);
                    removes.splice(index, 1);
                    showItemsInDOM(list);
                    redefineArr();
                    redefineRemoves();
                }
            });
            event.stopPropagation();
        }
    }
    let doneAllAction = (event) => {
        event.preventDefault();
        if (!list.length == 0) {
            let displayedDones = [];
            for (let i = list.length - 1; i >= 0; i--) {
                let doner = list.splice(i, 1);


                dones.push(doner[0]);
                displayedDones.push(doner[0]);
                arr.splice(i, 1);
                removes.splice(i, 1);
                showItemsInDOM(list);
            }

            let promise = new Promise((resolve, reject) => {
                let url = `/todo/done_all/`; ///////////////// url path (change!)
                // Sending the all rest of the objects(dones) to the server.
                // it is needed to be saved like extra ones only in the database which saves the only list of dones.
                fetch(url, {
                    method: `POST`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(displayedDones)
                })
                    .then((data) => {
                        if (data.ok) { resolve(data.json()); }
                    });
            });

            promise.then(res => {
                console.log(res)
            })
                .catch((error) => {
                    console.log(error);
                })

        } else {
            window.alert(`There is nothing to be done`);
        }
    }

    let removeAllAction = (event) => {
        event.preventDefault();
        if (!list.length == 0) {
            let displayedRemoves = [];
            for (let i = list.length - 1; i >= 0; i--) {
                let temp = list.splice(i, 1);
                displayedRemoves.push(temp);
                arr.splice(i, 1);
                removes.splice(i, 1);
                showItemsInDOM(list);
            }

            let promise = new Promise((resolve, reject) => {
                let url = `/todo/remove_all_undone/`; ///////////////// url path (change!)
                // Sending the all rest of the objects to the server to be deleted.
                // it is needed to be deleted like all displayed extra ones in the database which saves All.
                fetch(url, {
                    method: `DELETE`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(displayedRemoves)
                })
                    .then((data) => {
                        if (data.ok) { resolve(data.json()); }
                    });
            });

            promise.then(res => {
                console.log(res)
            })
                .catch((error) => {
                    console.log(error);
                })

        } else {
            window.alert(`There is nothing to be removed`);
        }
    }

    let main = (() => {
        // load all at the beginning
        let loadAllTasksFromDatabase = (() => {
            showItemsInDOM(allData);
            redefineArr();
            redefineRemoves();
        })();

        _out.addEventListener(`click`, clickBtnsDoneOn, false);
        _out.addEventListener(`click`, clickBtnsRemoveOn, false);

        _btnSubmit.addEventListener(`click`, (event) => {
            event.preventDefault();
            addTaskToDOM();
        }, false);

        _btnDoneall.addEventListener(`click`, doneAllAction, false);
        _btnRemoveall.addEventListener(`click`, removeAllAction, false);

    })();
}
window.addEventListener(`load`, () => {
    queryToGetAllInfo();
}, false);
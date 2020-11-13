let doneinit = () => {
    _out = document.getElementById(`out`);
    btnsRemoveALL = document.getElementById(`btn-removeall`);
    dones = [];
    removes = [];
    returnToList = [];
    list = [];
    let belter;

    // let loadDataFromLocalStorage = () => {
    //     if (localStorage.getItem(`dones`)) {
    //         list = JSON.parse(localStorage.getItem(`list`));
    //         dones = JSON.parse(localStorage.getItem(`dones`));
    //     }
    //     displayInDOM();
    //     redefineBtns(`removes`);
    //     redefineBtns(`returnTo`);
    // }

    // let saveIntoStorage = () => {
    //     localStorage.setItem(`dones`, JSON.stringify(dones));
    //     localStorage.setItem(`list`, JSON.stringify(list));
    // };

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
                dones.splice(index, 1);
                displayInDOM();
                // saveIntoStorage();
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
                console.log(dones[index]);
                dones.splice(index, 1);
                returnToList.splice(index, 1);
                // saveIntoStorage();
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
        // saveIntoStorage();
        displayInDOM();
        redefineBtns(`removes`);
        redefineBtns(`returnTo`);
    }

    let main = (() => {
        // loadDataFromLocalStorage();
        window.addEventListener(`storage`, () => {
            // loadDataFromLocalStorage();
            displayInDOM();
            redefineBtns(`removes`);
            redefineBtns(`returnTo`);
           
        }, false);
        _out.addEventListener(`click`, bubblingAct, false);
        _out.addEventListener(`click`, bubblingActReturn, false);
        btnsRemoveALL.addEventListener(`click`, removeAll, false);
    })();
}
window.addEventListener(`load`, doneinit, false);
let init1 = () => {
    let _form = document.getElementById(`firstform`);
    let btnsubmit = document.getElementById(`sendbtn`);

    btnsubmit.addEventListener(`click`, (event) => {
        event.preventDefault();
        let promise = new Promise((resolve, reject) => {
            let url = `ftemp/`;
            fetch(url, {
                method: `POST`,
                body: new FormData(_form)
            })
                .then((response) => {
                    if(response.status !== 200){
                        console.log(`Something has gone wrong!!!`);
                    };
                    resolve(response.json());
                })
        });

        promise.then((result) => {
            console.log(result);
            return result;
        })
            .catch((err) => {
                console.log(err.name);
                console.log(err.message);
            })
            .finally(() => {
                console.log(`Absolutely done work`);
            })

    }, false);
}
window.addEventListener(`load`, () => {
    init1();
}, false);
let init1 = () => {
    let btn_comment = document.getElementById(`btn-comment`);
    let userName = document.getElementById(`userName`);
    let userComments = document.getElementById(`userComments`);
    Allcomments = [];
    let dataComments = document.getElementById(`dataComments`);

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
        if(localStorage.getItem(`comments`)){
            Allcomments = JSON.parse(localStorage.getItem(`comments`));
        }
        showComments();
    }

    let addComment = () => {
        let date = new Date();

        let object = {
            name: userName.value,
            comment: userComments.value,
            date: timeConverter(date/1000)
        }
        Allcomments.push(object);
        saveComments();
        showComments();

        userName.value = ``;
        userComments.value = ``;
    }

    let main = (() => {
        loadComments();
        btn_comment.addEventListener(`click`, addComment, false);
    })();
}
window.addEventListener(`load`, init1, false);
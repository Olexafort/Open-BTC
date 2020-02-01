const remote = require('electron').remote

const closeBTCBtn = document.getElementById('closeBTCModal');

closeBTCBtn.addEventListener('click', function(event) {
    var win = remote.getCurrentWindow();
    window.close();
})
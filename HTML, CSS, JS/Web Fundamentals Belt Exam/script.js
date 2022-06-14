function message() {
    alert("The Ninjas have won!");
}
setTimeout(message, 13000);

function addNum(ID){
    var num = parseInt(document.querySelector(ID).innerHTML);
    num += 1;
    document.querySelector(ID).innerHTML = num;
}

function removeSubscribe(){
    var element = document.getElementById("subscribe");
    element.remove();
}
function addLike(likeID){
    var num = parseInt(document.querySelector(likeID).innerHTML);
    num += 1;
    document.querySelector(likeID).innerHTML = num + " like(s)";
}
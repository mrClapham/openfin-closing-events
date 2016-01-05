document.addEventListener('DOMContentLoaded', function() {
  // body...
  init();
});

init = function(){
    try{
        fin.desktop.main(function(){
            initWithOpenFin();
        })
    }catch(err){
        initWithoutOpenFin();
    }
};


initWithOpenFin = function(){
console.log("We have OpenFin")
};


initWithoutOpenFin = function(){
    console.log("We have NO OpenFin")
};
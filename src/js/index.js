var _mainWindow;

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
console.log("We have OpenFin available.");
    if (!_mainWindow){
        _mainWindow = fin.desktop.Window.getCurrent()
    };
    OpenFinEventListeners.addAllEventListeners(_mainWindow);
    OpenFinEventListeners.listen("close-requested", closeRequestedCallback);
    initButtonListeners();
};

initButtonListeners = function(){
    document.querySelector("#closeButton").addEventListener('click', function(e){
        closeMainWindow();
    });

    document.querySelector('#removeAllListeners').addEventListener("click", function(e){
        OpenFinEventListeners.removeAllEvemtListeners(_mainWindow);
    });

    document.querySelector('#removeBoundsChanged').addEventListener("click", function(e){
        OpenFinEventListeners.removeListenerByName(_mainWindow, "bounds-changed");
    });

    document.querySelector('#removeError').addEventListener("click", function(e){
        OpenFinEventListeners.removeListenerByName(_mainWindow, "nonesense");
    });
};

closeRequestedCallback = function(evt){
    console.log("Close Requested Callback ", evt)
};

closeMainWindow = function(){
    // OpenFinEventListeners.removeListenerByName(_mainWindow, "close-requested");

    _mainWindow.close(true,
                        function(){
                            console.log("Close called ")
                        },
                        function(evt){
                            console.log("Close call failed  ", evt)
                        }
                        );
}

initWithoutOpenFin = function(){
    console.log("We have NO OpenFin ");
};
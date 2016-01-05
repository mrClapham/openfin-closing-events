var _mainWindow, _messageWindow;

document.addEventListener('DOMContentLoaded', function() {
    init();
});

init = function(){
    _messageWindow = document.querySelector("#message")
    try{
        fin.desktop.main(function(){
            initWithOpenFin();
        })
    }catch(err){
        initWithoutOpenFin();
    }
};

initWithOpenFin = function(){
    printMessage("We have OpenFin available.")
    if (!_mainWindow){
        _mainWindow = fin.desktop.Window.getCurrent()
    };
    OpenFinEventListeners.addAllEventListeners(_mainWindow);
    OpenFinEventListeners.listen("close-requested", closeRequestedCallback);
    initButtonListeners();
};

printMessage = function(message){
    if(_messageWindow){
        _messageWindow.innerHTML = message
    }
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
        OpenFinEventListeners.removeListenerByName(_mainWindow, "nonsense");
    });

    document.querySelector('#addWin').addEventListener("click", function(e){
        var _ext = new ExternalWindow();

        listWindows()

    });
};

listWindows = function(){
    fin.desktop.Application.getCurrent().getChildWindows(function (children) {
        console.log(fin.desktop.Application.getCurrent().window.name);
        children.forEach(function (childWindow) {
            console.log("Showing child: " + childWindow.name);
            childWindow.show();
        });
    });
};

closeRequestedCallback = function(evt){
    console.log("Close Requested Callback ", evt);
    delayForceCloseWindow(_mainWindow);
};

closeMainWindow = function(){
    _mainWindow.close(false,
        function(){
            console.log("Close called ")
        },
        function(evt){
            console.log("Close call failed  ", evt)
        }
    );
};

delayForceCloseWindow = function(win){
    printMessage("The window will close in three seconds.");
    setTimeout(function(){
        forceCloseWindow(win)
    }, 3000);
};

forceCloseWindow = function(win){
    win.close(true,
        function(){
            console.log("Close called ")
        },
        function(evt){
            console.log("Close call failed  ", evt)
        });
}

initWithoutOpenFin = function(){
    console.log("We have NO OpenFin ");
    printMessage("We OpenFin is not available.")
};
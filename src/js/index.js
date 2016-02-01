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
    //OpenFinEventListeners.listen("close-requested", closeRequestedCallback);
    _mainWindow.addEventListener('close-requested', function(e) {
        var blah = confirm('are you sure?');
        if (blah== true) {
            _mainWindow.close(true);
        }else{
            console.log("The confirm was false")
        }
    });

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

    //document.querySelector('#removeAllListeners').addEventListener("click", function(e){
    //    OpenFinEventListeners.removeAllEvemtListeners(_mainWindow);
    //});

    //document.querySelector('#removeBoundsChanged').addEventListener("click", function(e){
    //    OpenFinEventListeners.removeListenerByName(_mainWindow, "bounds-changed");
    //});

    document.querySelector('#listWindows').addEventListener("click", function(e){
        listWindows()
    });

    document.querySelector('#addWin').addEventListener("click", function(e){
        var _ext = new ExternalWindow();
        listWindows()
    });
};

listWindows = function(){
    var _list = "__"
    fin.desktop.Application.getCurrent().getChildWindows(function (children) {
        _list += fin.desktop.Application.getCurrent().window.name +"<br>";
        children.forEach(function (childWindow) {
            _list += "Showing child: " + childWindow.name +"<br>";
            childWindow.show();
        });
        console.log("_list")
        printMessage(_list)
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
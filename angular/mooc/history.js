$(function(){
    _init() ;
});

var _history = [] ; // 记录hash的活动数据容器
function _init(){
    var root = $("#list");
    var defaultHash = root.find("li a").eq(1).attr("href");
    var currentHash = window.location.hash;
    _addToHistory(defaultHash, true);
    if(currentHash && currentHash != defaultHash) {
        _showContent((currentHash.split("#")[1]));
    } else {
        _showContent((defaultHash.split("#")[1]));
    }
    $("#list").on("click","a",function(e){
        var action = ($(this).attr("href").split("#")[1]);
        _showContent(action);
        e.preventDefault();
    });

    window.addEventListener("popstate",function(e){
        if(e.state && e.state.hash){
            var hash = e.state.hash;
            if(_history[1] && hash === _history[1].hash) {//存在历史记录，证明是后退事件
                _showContent(hash.split("#")[1].toLowerCase());
            } else { // 其它认为是非法后退或者前进
                return;
            }
        } else{
            return;
        }
    },false) ;
};
function _showContent(action){
    var samePage = _history[0]["hash"] == "#" + action;
    // console.log(samePage);
    if(samePage){ // 同页面,则不重新加载
        return ;
    }
    _loadContent(action + ".data").done(function(data){
        _renderContent(data["content"]);
        _addToHistory("#" + action,samePage);
    }).fail(function(){
        console.log("load content error !");
        // throw new Error("load content error !");
    }); 
};
function _loadContent(url){
    return $.ajax({
        url: url,
        dataType: "json"
    });
};
function _renderContent(text){
    $("#content-main").text(text);
} ;
function _addToHistory(hash, noState) {
    var obj = {
        hash: hash
    };
    if(noState){
        _history.shift(obj);
        window.history.replaceState(obj,"",hash);
    } else{
        window.history.pushState(obj,"",hash);
    }
    _history.unshift(obj);
};




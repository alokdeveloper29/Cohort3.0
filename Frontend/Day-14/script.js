function dada(){
    console.log('I am dada');

    function papa(){
        console.log('I am papa');
        
        function child(){
            console.log('I am child');
        }
        return child
    }
    return papa 
}


dada()()()


function footpath(w=10){
    console.log('I am Footpath',w,'feet');
    
}
function mainRoad(wid,cb){
    console.log('I am Main road',wid,'Feet');
    cb(wid/10)
    cb()
}

mainRoad(80,footpath)
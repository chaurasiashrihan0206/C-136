status= "";
objects= [];

function preload(){
    video= createVideo('video.mp4');
}

function setup(){
    canvas= createCanvas(480 , 380);
    canvas.center();
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML= "status:detecting objects";
}

function modelLoaded(){
    console.log("modelLoaded");
    status= true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){
image(video , 0 , 0 , 480 , 380);
if(status!=""){
objectDetector.detect(video , gotResults);
for(i= 0; i<objects.length; i++){
document.getElementById("status").innerHTML= "status: objects detected";
document.getElementById("no_of_objects").innerHTML= "no. of objects detcted are: " + objects.length;
fill("#FF0000");
per= floor(objects[i].confidence*100);
text(objects[i].label + " " + per + "%" , objects[i].x , objects[i].y);
noFill();
stroke("#FF0000");
rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height); 
}
}
}

function gotResults(error , results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
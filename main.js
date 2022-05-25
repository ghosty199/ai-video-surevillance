objectDetector=""
status=""
objects=[]


function preload(){
    video=createVideo("video.mp4")

}
function setup(){
    canvas=createCanvas(500,400)
    canvas.center()
    video.hide()
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelloaded)
    document.getElementById('status').innerHTML="status:detecting object"
}
function modelloaded(){
    console.log("modelloaded")
    status=true
    video.loop()
video.speed(1)
video.volume(0)
}
function gotResult(error,results){
if (error) {
    console.log(error)
} else {
    console.log(results)
    objects=results
}
}
function draw(){
    image(video,0,0,500,400)
    if(status !="")
    {
        objectDetector.detect(video,gotResult)
        for (let i = 0; i < objects.length; i++) {
         document.getElementById("status").innerHTML="status:object has been detected"   
            document.getElementById("object_detected").innerHTML="number of objects="+objects.length
            fill("black")
            percent=floor(objects[i].confidence*100)
           text(objects[i].label+" "+percent+"%",objects[i].x, objects[i].y) 
           noFill()
           stroke("red")
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }

}

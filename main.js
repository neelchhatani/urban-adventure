song_1 = "";
song_2 = "";
x_coordinate = 0;
y_coordinate = 0;
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
score_leftWrist = 0;
score_rightWrist = 0;
hold_status = "";
song1_status = "";
song2_status = "";
function preload(){
song_1 = loadSound("music.mp3");
song_2 = loadSound("music2.mp3");
}
function setup(){
canvas = createCanvas(600,500);
canvas.position(400,200);
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video , modelLoaded);
poseNet.on('pose' , gotPoses);
}
function modelLoaded(){
console.log('PoseNet is Initialized');
}
function draw(){
image(video , 0 , 0 , 600 , 500);
fill("#FF003E");
stroke("#FF003E");
song1_status = song_1.isPlaying();
song2_status = song_2.isPlaying();
if(score_leftWrist > 0.2){
circle(left_wrist_x , left_wrist_y , 20);
song_2.stop();

if(song1_status == false){
song_1.play();
document.getElementById("div_song_name").innerHTML = "Playing - Harry Potter theme song ";
}
}
if(score_rightWrist > 0.2){
circle(right_wrist_x , right_wrist_y , 20);
song_1.stop();   
if(song2_status == false){
song_2.play();
document.getElementById("div_song_name").innerHTML = "Playing - Peter Pan song ";
}
}
}
function gotPoses(results){
if(results.length > 0){
console.log(results);
left_wrist_x = results[0].pose.leftWrist.x;
left_wrist_y = results[0].pose.leftWrist.y;
console.log("left_wrist_x" , left_wrist_x , "left_wrist_y" , left_wrist_y); 
right_wrist_x = results[0].pose.rightWrist.x;
right_wrist_y = results[0].pose.rightWrist.y;
console.log("right_wrist_x" , right_wrist_x , "right_wrist_y" , right_wrist_y); 
score_leftWrist = results[0].pose.keypoints[9].score;
console.log("score_leftWrist" + score_leftWrist);
score_rightWrist = results[0].pose.keypoints[10].score;
console.log("score_rightWrist" + score_rightWrist);
}
}
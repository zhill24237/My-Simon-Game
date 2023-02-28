
const buttonColors = ["red","blue","green","yellow"]
let gamePattern = []
let userClickPattern = []
let started = false
let level = 0

$(document).keypress(function(){
    if(!started){
        nextSequence()
        started = true
    }else{
        
    }
})

function nextSequence(){
    userClickPattern = []
    level++
    $("#level-title").text(`Level: ${level}`)
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    
    
}

$(".btn").click(function(){
    let userChosenColor = $(this).attr("id")
    userClickPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickPattern.length-1)
})

function playSound(name){
    let colorSound = new Audio(`./sounds/${name}.mp3`)
    colorSound.play()
}

function animatePress(color){
    $(`#${color}`).addClass("pressed")
    setTimeout(function () {
        $(`#${color}`).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
        console.log("success")
        if(userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000); 
        }
    }else{
        let wrongSound = new Audio("wrong.mp3")
        wrongSound.play()
        $("#level-title").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        startOver()
    }
}

function startOver(){
    level = 0
    gamePattern = []
    started = false
}






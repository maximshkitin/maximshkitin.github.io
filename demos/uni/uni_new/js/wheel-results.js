//Usage

//load your JSON (you could jQuery if you prefer)
function loadJSON(callback) {

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'wheel_data', true); 
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      //Call the anonymous function (callback) passing in the response
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

//your own function to capture the spin results
function myResult(e) {
  //e is the result object
    console.log('Spin Count: ' + e.spinCount + ' - ' + 'Win: ' + e.win + ' - ' + 'Message: ' +  e.msg);
  if(e.spinCount == 1){
    //show the game progress when the spinCount is 3
    //restart it if you like
    //e.target.restart();
  }  

  console.log( e );
  //e is gameResultsArray
  var result = e['win'];
  // id 
  var id = e['id'];
  work(id);
  
  var btn = $('.click-button');
  var descrTitle = $('.description p strong');
  var descrText = $('.description p + p');
  var prizeContainer = $('.prize-title');
  var skip = $('.right-side .skip-link span');
  $('.prize-section').addClass('result');
  if (result) {
    descrTitle.addClass('win');
    descrText[0].innerText = "You have just won yourself a " + e.msg + "! An email will be sent to you on how you can redeem the credit. Earn more spins by unlocking more badges. "
    descrTitle[0].innerText = 'Congratulations';
    skip[0].innerHTML = "I don't want more prizes. Show me how to redeem.";

  }
  else {
    descrTitle[0].innerText = 'Maybe next time';
    descrText[0].innerText = "Oops! You might get lucky the next try. Invite 3 friends to get another spin"
    $('i.win').css('display', 'none');
    $('i.lose').css('display', 'inline-block');
    descrTitle.addClass('lose');
    skip[0].innerHTML = "I don't want to spin more. Close this wheel.";
  }
  prizeContainer[0].innerText = e['msg'];

}

//your own function to capture any errors
function myError(e) {
  //e is error object
  console.log('Spin Count: ' + e.spinCount + ' - ' + 'Message: ' +  e.msg);
}

function myGameEnd(e) {

  var btn = $('.click-button');

  if ($(window).height() < 850 && $(window).width() <= 1240) {
    var isSafari = /safari/.test(navigator.userAgent.toLowerCase());
    if (isSafari) {
      $('body').animate({ scrollTop: 300 }, 500);
    } 
    else {
      $('html').animate({ scrollTop: 300 }, 500);
    }
  }
  
  btn.addClass('disabled');
  btn[0].innerText = 'spin more';
  $('.right-side .skip-link').addClass('active');
  btn.addClass('share');

}

function init() {
  loadJSON(function(response) {
    // Parse JSON string to an object
    var jsonData = JSON.parse(response);
    //if you want to spin it using your own button, then create a reference and pass it in as spinTrigger
    //var mySpinBtn = document.querySelector('.spinBtn');
    //create a new instance of Spin2Win Wheel and pass in the vars object
    var spinBtn = document.querySelector('.click-button');
    var myWheel = new Spin2WinWheel();
    
    //WITH your own button
    myWheel.init({data:jsonData, onResult:myResult, onGameEnd:myGameEnd, onError:myError, spinTrigger:spinBtn});
    
    //WITHOUT your own button
    // myWheel.init({data:jsonData, onResult:myResult, onGameEnd:myGameEnd, onError:myError});
  });
}


//And finally call it
init();
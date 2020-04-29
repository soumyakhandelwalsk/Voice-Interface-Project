  var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
  myRec.continuous = true; // do continuous recognition
  var flag = 0;

  function setup()
  {
    noCanvas();
    myRec.onResult = showResult;
    myRec.start(); // start recoginising speech
  }

  function showResult()
  {
    if(myRec.resultValue) 
    {
      text_color();
      reveal();
      text_size();
      scroll_screen();
      p1.insertAdjacentHTML('beforeend', myRec.resultString + " ");
    }
  }

  function text_color()
  {
    if ((" "+myRec.resultString+" ").search(" color ")!=-1)
    {
      document.getElementById("p1").style.color = "red";
    }
  }

  function reveal()
  {
      if ((" "+myRec.resultString+" ").search(" reveal ")!=-1)
    {
      document.getElementById('p2').className = "show";
    }
  }

  function text_size()
  {
    var i = (" "+myRec.resultString+" ").search(" size ")
    if (i!=-1)
    {
      var n = (" "+myRec.resultString+" ").substring(i+6,(" "+myRec.resultString+" ").indexOf(" ",i+6) )
      if (!isNaN(n))
      {
        document.getElementById("p1").style.fontSize = n;
      }
    }
  }

  function scroll_screen()
  {
    $(document).ready(function()
    {
    if ((" "+myRec.resultString+" ").search(" scroll ")!=-1)
    {
      $("html, body").animate({scrollTop: 5000}, 1500);
    }
    });
  }

  
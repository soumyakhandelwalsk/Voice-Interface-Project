
  var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
  myRec.continuous = true; // do continuous recognition

  function setup()
  {
    noCanvas();
    myRec.onResult = showResult;
    myRec.start(); // start recoginising speech
    //document.getElementById("p1").style.color = "blue";
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
    if ((" "+myRec.resultString+" ").search(" size 70 ")!=-1)
    {
      document.getElementById("p1").style.fontSize = "70";
    }
    if ((" "+myRec.resultString+" ").search(" size 24 ")!=-1)
    {
      document.getElementById("p1").style.fontSize = "24";
    }
  }

  function scroll_screen()
  {
      if ((" "+myRec.resultString+" ").search(" scroll ")!=-1)
    {
      window.scrollBy(0, 5000);
    }
  }
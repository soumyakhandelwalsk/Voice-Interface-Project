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
      console.log(myRec)
      if (flag==1)
      {
        if (myRec.resultString=="back")
        {
          news(" news ");
        }
        else
        {
          news_find(myRec.resultString);
        }
      }
      else
      {
        text_color();
        reveal();
        text_size();
        scroll_screen();
        news(" "+myRec.resultString+" ");
        if (flag==0)
        {
          p1.insertAdjacentHTML('beforeend', myRec.resultString + " ");
        }
      }
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

  function news(word)
  {
    if (word.search(" news ")!=-1)
    {
      document.getElementById('p1').innerHTML = "";
      var today = get_time().substring(11,19);
      document.getElementById('time').innerHTML = today;
      document.getElementById('first').innerHTML = "";
      document.getElementById('second').innerHTML = "";
      document.getElementById('key').innerHTML = "Time<br>Space";
      document.getElementById("time").style.color = "black";
      flag = 1;
    }
  }
  function news_find(keyword)
  {
    document.getElementById('key').innerHTML = "Back<br>Time<br>Space";
    var n = get_time();
    n = n.substring(0,n.length-5);
    $(document).ready(function(){
    let url = 'http://newsapi.org/v2/everything?' +
        'qInTitle='+keyword+'&' +
        'from='+n+'&' +
        'sortBy=popularity&' +
        'pageSize=100&' +
        'language=en&' +
        'apiKey=6764826de72f46929193fac403917aea';
    $.ajax({
      url:url,
      method:"GET",
      dataType:"Json",

      success: function(news){
        console.log(news);
        document.getElementById('time').style.color = "red";
        document.getElementById('time').innerHTML ="";
        for(var i = 0; i<100; i++)
        {
          word = keyword;
          var str = news.articles[i].title;
          if (str.search(keyword)==-1)
          {
            word = capitalise(" "+keyword);
          }
          var s = str.substring(0,str.search(word));
          var t = str.substring(str.search(word)+word.length)
          var published = news.articles[i].publishedAt.substring(11,16);
          var result = s.link(news.articles[i].url);
          first.insertAdjacentHTML('beforeend', "<br>"+result);
          time.insertAdjacentHTML('beforeend', "<br>"+"&nbsp;"+word+"&nbsp;");
          var result = t.link(news.articles[i].url);
          var h = document.getElementById("second");
          h.insertAdjacentHTML('beforeend', "<br>"+result + " - "+published);
        }
      },
      error: function(){
        $("time").html("Some error occured");
      }
    })
    });
  }
  
  function get_time()
  {
    var today = new Date();
    today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
    today.setDate(today.getDate()-1);
    return today.toISOString();
  }

  function capitalise(str)
  {
    s="";
    for (var i=1; i<str.length; i++)
    {
        if (str.charAt(i-1)==" ")
        {
          s = s + str[i].toUpperCase();
        }
        else
        {
          s=s+str.charAt(i);
        }
    }
    return s;
  }
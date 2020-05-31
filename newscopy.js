  var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
  myRec.continuous = true; // do continuous recognition
  var state = 0;
  var val =0;

  function setup()
  {
    noCanvas();
    myRec.onResult = showResult;
    reset();
    first_page();
    $(document).ready(function()
    {
      $("html, body").animate({scrollTop: 750}, 1);
    });
    myRec.start(); // start recoginising speech
  }

  function showResult()
  {
    if(myRec.resultValue) 
    {
      console.log(myRec)
      if (myRec.resultString=="time" || myRec.resultString=="space")
      {
      	state = 1;
        reset();
      	news_find(myRec.resultString);
      }
      else if (state==1 && myRec.resultString=="back")
      {
        state = 0;
        reset();
        first_page();
      }
    }
  }
  function reset()
  {
    $(document).ready(function()
    {
    $("div").remove(".real");
    });
  }

  function first_page()
  {
    var today = get_time().substring(11,19);
    document.getElementById('timediv').innerHTML = today;
    document.getElementById('key').innerHTML = "Time<br>Space";
    document.getElementById("timediv").style.color = "black";
    }

function myMove(len, keyword) 
{
  document.getElementById('timediv').innerHTML = "";
  var a = [];
  var mid = (int)(len/2);
  var b = [];
  var t = document.getElementById("time");
    for (var i=0;i<len;i++)
    {
        a[i] = document.createElement('div');
        a[i].innerHTML = keyword;
        a[i].className = 'real';
        a[i].style.top = '1000px';
        //a[i].style.width = '3%';
        //a[i].textAlign = 'center';
        a[i].id = 't'+i;
        t.appendChild(a[i]);
        tdiv(i, len);
        if (i<mid)
        {
          b[i] = mid-i;
        }
    } 
    var pos = 1;
    var id = setInterval(frame, 40-(val/17));
  function frame() 
  {
    if (pos > 20) 
    {
      clearInterval(id);
    } 
    else 
    {
      for (var j=0; j<len;j++)
      {
        if(j<mid)
        {
          a[j].style.top = (1000 - (b[j]*pos)) + 'px';
        } 
        else if(j>mid)
        {
          a[j].style.top = (1000 + (b[len-j]*pos)) + 'px';
        }
      }
      pos++;
    }
  }
    }

  function news_find(keyword)
  {
    document.getElementById('key').innerHTML = "Back<br>Time<br>Space";
    var n = get_time();
    n = n.substring(0,n.length-5);
    //'https://cors-anywhere.herokuapp.com/'+
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
        keyword = keyword.toUpperCase();
        document.getElementById('time').style.color = "red";
        var ele = document.getElementById('timediv');
        ele.innerHTML = keyword;
        ele.style.color = "red";
        ele.style.display = "none";
        if (keyword=="SPACE")
        {
          val = 500;
        }
        else
        {
          val=0;
        }
        $("#timediv").fadeIn(1000 - val);
        setTimeout(myMove, 1500 -(1.5*val), news.articles.length, keyword);
        setTimeout(display_news, 3000 - (3.5*val), news, keyword);
      },
      error: function(){
        $("time").html("Some error occured");
      }
    })
    });
  }
  
  function display_news(news, keyword)
  {
    var one = document.getElementById('first');
    var two = document.getElementById('second');
    one.style.marginLeft = "0%";
    one.style.marginRight = "3%";
    var len = news.articles.length;
        for(var i = 0; i<news.articles.length; i++)
        {
          var str = news.articles[i].title.toUpperCase();
          str = change_apostrophe(str);
          var published = news.articles[i].publishedAt.substring(11,16);
          fdiv(str.substring(0,str.search(keyword)).link(news.articles[i].url),i, len);
          sdiv((str.substring(str.search(keyword)+keyword.length)+" - "+published).link(news.articles[i].url),i, len);
          var T = document.getElementById('t'+i);
           T.innerHTML= keyword.link(news.articles[i].url);
        }
        for (var i = 0; i<len; i++)
        {
          $("#f"+i).animate({
          marginLeft: "6%",
          marginRight: "-6%",
          opacity: "1"
          }, 750 - val/1.5 );
          $("#s"+i).animate({
          opacity: "1",
          left: "1.5%"
          }, 750 - val/1.5);
        }
      }

  function fdiv(str, i, len)
  {
    var f = document.createElement('div');
    f.innerHTML = str;
    f.className = 'real';
    f.classList.add("fst2");
    f.id = "f"+i; 
    f.style.top= (20*i)+'px';
    f.onmouseover = function() {mouseOver(i, len)};
    f.onmouseout = function() {mouseOut(i, len)};
    document.getElementById('first').appendChild(f);
  }

  function sdiv(str,i, len)
  {
    var s = document.createElement('div');
    s.innerHTML = str;
    s.className = 'real';
    s.classList.add("snd2");
    s.id = "s"+i;
    s.style.top= (20*i)+'px';
    s.onmouseover = function() {mouseOver(i, len)};
    s.onmouseout = function() {mouseOut(i, len)};
    document.getElementById('second').appendChild(s);
  }

  function tdiv(i, len)
  {
    var a = document.getElementById('t'+i);
    a.style.width="100%";
    a.style.textAlign="center";
    a.onmouseover = function() {mouseOver(i, len)};
    a.onmouseout = function() {mouseOut(i, len)};
  }

  function get_time()
  {
    var today = new Date();
    today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
    today.setDate(today.getDate()-1);
    return today.toISOString();
  }

  function mouseOver(i, len)
  {
    for(var j=0; j<len; j++)
    {
      if (j!=i)
      {
        document.getElementById('f'+j).style.opacity="20%";
        document.getElementById('t'+j).style.opacity="20%";
        document.getElementById('s'+j).style.opacity="20%";
      }
    }
  }

  function mouseOut(i, len)
  {

    for(var j=0; j<len; j++)
    {
      document.getElementById('f'+j).style.opacity="100%";
      document.getElementById('t'+j).style.opacity="100%";
      document.getElementById('s'+j).style.opacity="100%";
    }
  }

  function change_apostrophe(word)
  {
  	var str = "";
  	word = " " + word;
  	for (var i=1; i<word.length; i++)
  	{
  		if(word.charAt(i)=="\'")
  		{
  			if(word.charAt(i-1)==" ")
  			{
  				str = str + "&lsquo;" ;
  			}
  			else
  			{
  				str = str + "&rsquo;" ;
  			}
  		}
  		else if(word.charAt(i)=="\"")
  		{
  			if(word.charAt(i-1)==" ")
  			{
  				str = str + "&ldquo;" ;
  			}
  			else
  			{
  				str = str + "&rdquo;" ;
  			}
  		}
  		else
  		{
  			str = str + word.charAt(i);
  		}
  	}
  	return str;
  }



var express = require('express'); //express handles routes
var http = require('http'); //need http module to create a server
var app = express(); //starting express

app.set('port', process.env.PORT || 5000); //set port to cloud9 specific port or 3000
app.use(express.bodyParser()); //body parser used to parse request data
app.use(app.router);
app.get('/', verificationHandler);

function verificationHandler(req, res) 
{
	console.log(req);

  if (req.query['hub.verify_token'] === 'verifycode') 
  {
		res.send(req.query['hub.challenge']);

  }
		res.send('Error, wrong validation token!');

}

http.createServer(app).listen(app.get('port'), function() 
{
		console.log('Express server listening on port ' + app.get('port'));

});

app.post('/',handleMessage);
function handleMessage(req, res) 
{
  var messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) 
    {
      event = req.body.entry[0].messaging[i];
      var sender = event.sender.id;
      console.log(sender);
      if (event.message && event.message.text) 
        {
          var text = event.message.text.toLowerCase().trim();
          console.log(text);
          if (text.toLowerCase().substr(0,4) == 'wiki') 
            {
              wikibot(text.replace("wiki ", ""),sender)
            }
              else 
            {
              sendHelp(sender);
            }
        }
          else if(event.postback && event.postback.payload)
        {
          sendMessage(sender,event.postback.payload) ;
        }
    }
  res.end('replied!');
}



var url = "https://graph.facebook.com/v2.6/me/messages?access_token=EAARhkzWNIF4BACVhiCilBOEVeFZA4TaoKnfTRNzNVYG1JcCQoidoFxUSAeZCP1kvkc2ZA2OYOZCFZC6zF3arTmmRULk9FQ9EH7KUVWB3rhmXin1D1wBWaPip9WGQ1D0rxbXYIEOuNTgIEGRMpZA0XRpc64zl7fN1gfxN3mff8kmgZDZD" //replace with your page token

function sendHelp(id) 
{
	var options = 
	{
    	uri: url,
    	method: 'POST',
    	json: 
    	{
      		"recipient": 
      		{
        	"id": id
      		},
      		"message": 
      		{
        		"text": "Send wiki space 'Your query' to search wikipedia"
      		}
    	}
 	}
  request(options, function(error, response, body) 
  	{
    if (error) 
    	{
      sendHelp(sender);
    	}
  	});
};

function wikibot(query, userid) 
{
  var queryUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=5&exlimit=max&gsrsearch=" + query;
  var myTemplate = 
  	{
    recipient: 
    	{
      id: userid
    	},
    message: 
    	{
      attachment:
      	 	{
          type: "template",
          payload: 
        		{
          			template_type: "generic",
          			elements: []
        		}
      		}
    	}
  	};
  var options = 
  	{
    	url: url,
    	method: 'POST',
    	body: myTemplate,
    	json: true
  	}
  request(queryUrl, function(error, response, body) 
  {
  if (error) 
  	{
      console.log(error);
    }
    try
    {
      body = JSON.parse(body);
      var pages = body.query.pages;
      for (var i = 0 in pages) 
      	{
          var myelement = 
        	{
          		title: "",
          		subtitle: "",
          		buttons: [
          		{
            	 type: "postback",
            	 title: "Read more",
            	 payload: "Nothing here, Please view in browser"
          		}, 
          	 {
            	type: "web_url",
            	url: "",
           	 	title: "View in browser"
         	 }]
       		};
        	myelement.title = pages[i].title;
       	 	myelement.subtitle = pages[i].extract.substr(0, 80).trim();
        	myelement.buttons[1].url = "https://en.wikipedia.org/?curid=" + pages[i].pageid;
        	if (pages[i].extract != "") 
         {
        	myelement.buttons[0].payload = pages[i].extract.substr(0, 1000).trim();
         }
        	myTemplate.message.attachment.payload.elements.push(myelement);
        }
      		options.body = myTemplate;
    }
    	catch (err) 
    	{
      	 console.log("error : " + err.message);
     	 options = 
     	  {
         	uri: url,
         	method: 'POST',
         	json: 
         	{
          	   "recipient": 
          	  {
            	"id": userid
          	  },
          		"message": 
          	  {
             	"text": "Something went wrong, please try again."
          	  }
        	}	
      	  }
   		}
    		request(options, function(error, response, body) 
    	 {
      		if (error) 
      		{
        		console.log(error.message);
      		}
      			console.log(body);
    	  });
  })
};

function formatmsg(msg)
{
    msg = msg.substr(0,320);
    if(msg.lastIndexOf(".") == -1) 
    {
        return msg;
    }
    return msg.substr(0,msg.lastIndexOf(".")+1);
}



'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			if (text === 'Show') {
				sendGenericMessage(sender)
				continue
			}
			sendGreetingMessage(sender)
		}
		if (event.postback) {
			let text = JSON.stringify(event.postback)
			sendTextMessage(sender, text, token)
			continue
		}
	}
	res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.PAGE_ACCESS_TOKEN
const token = "EAARhkzWNIF4BAPOmMzzF2DZBuQajQTKV4PC4HaoHaMwVDbTZBgBGhrXehh2RK42RGmh4xPCrA38VecZAiagKxZAeURMZAFhDw6d7ZAwE9LJ5iTiZC0kTuERVySeX0SDWWSz1Kbhhwc9RcG0o6etMRZBngZCUDrYvyoqinjlKmKOB3ZCwZDZD"

function sendTextMessage(sender, text) {
	let messageData = { text:text }
	
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendGenericMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "Duwun1",
					"subtitle": "Element #1 of an hscroll",
					"image_url": "https://scontent.fbkk4-2.fna.fbcdn.net/v/t1.0-9/12342591_814669595343202_7303905748891865152_n.png?oh=d2eaed4788b2c1e429e4f1fd474be99c&oe=588D1A27",
					"buttons": [{
						"type": "web_url",
						"url": "http://www.duwun.com.mm/sports/epl/-id5741234.html",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				}, {
					"title": "Duwun2",
					"subtitle": "Element #2 of an hscroll",
					"image_url": "https://scontent.fbkk4-2.fna.fbcdn.net/v/t1.0-9/12342591_814669595343202_7303905748891865152_n.png?oh=d2eaed4788b2c1e429e4f1fd474be99c&oe=588D1A27",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for second element in a generic bubble",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendGreetingMessage(sender) {
    let messageData = {
          "attachment":{
      "type":"template",
      "payload":{
                        "template_type":"button",
                         "text":"Hi there, let’s get started. I’ll send you top stories every day",
                            "buttons":[
                         {
                            "type":"web_url",
                            "url":"http://www.duwun.com.mm/",
                            "title":"Show Website"
                         },
          {
            "type":"postback",
            "title":"Start Chatting",
	     "payload":"Please use a few words to tell me what you want to know more about. For example, you could type 'headlines,Rio Olympics,or politics. '" ,
            }
        ]
      }
                }
        }
        request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
    }

function addPersistentMenu()
{
 request(
    {
      url: 'https://graph.facebook.com/v2.6/me/thread_settings',
      qs: {access_token:token},
      method: 'POST',
      json:
      {
        setting_type : "call_to_actions",
        thread_state : "existing_thread",
        call_to_actions:[
            {
              type:"postback",
              title:"Home",
              payload:"home"
            },
            {
              type:"postback",
              title:"Joke",
              payload:"joke"
            },
            {
              type:"web_url",
              title:"DMS Software Website",
              url:"http://www.dynamic-memory.com/"
            }
          ]
      }

    }
    , 
    function(error, response, body) 
    {
      console.log(response)
      if (error) 
      {
          console.log('Error sending messages: ', error)
      }   else if (response.body.error) 
      {
        console.log('Error: ', response.body.error)
      }
    })

}


// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})


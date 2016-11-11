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
			if (text === 'Generic') {
				sendGenericMessage(sender)
				continue
			}
			sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
		}
		if (event.postback) {
			let text = JSON.stringify(event.postback)
			sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
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
            "template_type": "list",
 "elements": [
                {
                    "title": "Duwun Testing",
                    "image_url": "https://scontent.fbkk4-2.fna.fbcdn.net/v/t1.0-9/12342591_814669595343202_7303905748891865152_n.png?oh=d2eaed4788b2c1e429e4f1fd474be99c&oe=588D1A27",
                    "subtitle": "See all our news",
                    "default_action": {
                        "type": "web_url",
                        "url": "http://www.duwun.com.mm/",
                        "messenger_extensions": true,
                        "webview_height_ratio": "tall",
                        "fallback_url": "https://duwunbot.herokuapp.com/"
                    },
                    "buttons": [
                        {
                            "title": "View",
                            "type": "web_url",
                            "url": "http://www.duwun.com.mm/",
                            "messenger_extensions": true,
                            "webview_height_ratio": "tall",
                            "fallback_url": "https://duwunbot.herokuapp.com/"                        
                        }
                    ]
                },
                {
                    "title": "အမ်ိဳးသမီးေတြရဲ႕ က်န္းမာေရးအတြက္ အေကာင္းဆံုးအစားအစာ (၃) မ်ိဳး",
                    "image_url": "https://scontent.fbkk4-2.fna.fbcdn.net/v/t1.0-9/12342591_814669595343202_7303905748891865152_n.png?oh=d2eaed4788b2c1e429e4f1fd474be99c&oe=588D1A27",
                    "subtitle": "အမ်ိဳးသမီးေတြရဲ႕ က်န္းမာေရးအတြက္ အေကာင္းဆံုးအစားအစာ (၃) မ်ိဳး",
                    "default_action": {
                        "type": "web_url",
                        "url": "http://www.duwun.com.mm/lifestyle/food-travel/-id5740284.html",
                        "messenger_extensions": true,
                        "webview_height_ratio": "tall",
                        "fallback_url": "https://duwunbot.herokuapp.com/"
                    },
                    "buttons": [
                        {
                            "title": "See Now",
                            "type": "web_url",
                            "url": "http://www.duwun.com.mm/lifestyle/food-travel/-id5740284.html",
                            "messenger_extensions": true,
                            "webview_height_ratio": "tall",
                            "fallback_url": "https://duwunbot.herokuapp.com/"                        
                        }
                    ]                
                },
                {
                    "title": "ျမစ္ဆံုစီမံကိန္း အစီရင္ခံစာ သမၼတထံ ဒီေန႔တင္မယ္",
                    "image_url": "https://scontent.fbkk4-2.fna.fbcdn.net/v/t1.0-9/12342591_814669595343202_7303905748891865152_n.png?oh=d2eaed4788b2c1e429e4f1fd474be99c&oe=588D1A27",
                    "subtitle": "ျမစ္ဆံုစီမံကိန္း အစီရင္ခံစာ သမၼတထံ ဒီေန႔တင္မယ္",
                    "default_action": {
                        "type": "web_url",
                        "url": "http://www.duwun.com.mm/news/local/-id5741197.html",
                        "messenger_extensions": true,
                        "webview_height_ratio": "tall",
                        "fallback_url": "https://duwunbot.herokuapp.com/"
                    },
                    "buttons": [
                        {
                            "title": "See Now",
                            "type": "web_url",
                            "url": "http://www.duwun.com.mm/news/local/-id5741197.html",
                            "messenger_extensions": true,
                            "webview_height_ratio": "tall",
                            "fallback_url": "https://duwunbot.herokuapp.com/"                        
                        }
                    ]                
                },
                {
                    "title": "အာဆင္နယ္ႏွင့္ လစာကိစၥအဆင္မေျပသည့္ အိုေဇးလ္ကို မန္ယူစိတ္ဝင္စားေန",
                    "image_url": "https://scontent.fbkk4-2.fna.fbcdn.net/v/t1.0-9/12342591_814669595343202_7303905748891865152_n.png?oh=d2eaed4788b2c1e429e4f1fd474be99c&oe=588D1A27",
                    "subtitle": "အာဆင္နယ္ႏွင့္ လစာကိစၥအဆင္မေျပသည့္ အိုေဇးလ္ကို မန္ယူစိတ္ဝင္စားေန",
                    "default_action": {
                        "type": "web_url",
                        "url": "http://www.duwun.com.mm/sports/epl/-id5741234.html",
                        "messenger_extensions": true,
                        "webview_height_ratio": "tall",
                        "fallback_url": "https://duwunbot.herokuapp.com/"
                    },
                    "buttons": [
                        {
                            "title": "See Now",
                            "type": "web_url",
                            "url": "http://www.duwun.com.mm/sports/epl/-id5741234.html",
                            "messenger_extensions": true,
                            "webview_height_ratio": "tall",
                            "fallback_url": "https://duwunbot.herokuapp.com/"                        
                        }
                    ]                
                }
            ],
             "buttons": [
                {
                    "title": "View More",
                    "type": "postback",
                    "payload": "payload"                        
                }
            ]  
        }
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

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})



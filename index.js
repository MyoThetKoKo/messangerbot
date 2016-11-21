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
      else if (text === 'Topstories'){
        sendTopstoriesMessage(sender)
        continue
      }
      else if (text === 'News'){
        sendNewsMessage(sender)
        continue
      }
      else if (text === 'Entertainment'){
        sendEntertainmentMessage(sender)
        continue
      }
      else if (text === 'lifestyle'){
        sendlifestyleMessage(sender)
        continue
      }
      else if (text === 'Sports'){
        sendSportsMessage(sender)
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

function sendGenericMessage(sender) 
{
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Duwun1",
          "subtitle": "Element #1 of an hscroll",
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-9/14670626_657726541056112_2265577433017880324_n.jpg?oh=131e530db7f8207922de974e42f6a047&oe=58C6191A",
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
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-9/14666250_653700034792096_6286400383312462415_n.jpg?oh=b8568feb46010026073a41876d7ff5f2&oe=58BC9202",
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

function sendTopstoriesMessage(sender) 
{
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Duwun1",
          "subtitle": "Element #1 of an hscroll",
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-9/14910494_662480397247393_5785870071355333292_n.jpg?oh=7b630439c4f3a6538b2bf3654dbfca6d&oe=5889E12C",
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
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-9/14695309_659017747593658_7823234448286722387_n.jpg?oh=01b1df2658a85e53a1fc91f085b59011&oe=58BCEF8A",
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

function sendNewsMessage(sender) 
{
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Duwun1",
          "subtitle": "Element #1 of an hscroll",
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-9/14947665_665057290323037_5916774489129921508_n.jpg?oh=bfd476b32d2022b6bcc9644e0f55b8fb&oe=588A9A8B",
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
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-9/14962639_665057306989702_4394495154565763093_n.jpg?oh=f7e6f1a25ee1bcdd5dd69264a7bd197e&oe=58B84197",
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

function sendEntertainmentMessage(sender) 
{
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Duwun1",
          "subtitle": "Element #1 of an hscroll",
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-9/15036186_667298540098912_6919527525160284544_n.jpg?oh=d34b7ca182fab60e8139a51fb8d8f739&oe=58C97071",
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
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-9/14953575_667298550098911_9186132226253692818_n.jpg?oh=ee9d421d662f1c85c2e939f26ab2ae37&oe=58D577FB",
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

function sendSportsMessage(sender) 
{
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Duwun1",
          "subtitle": "Element #1 of an hscroll",
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-9/15037139_671483689680397_7714670410490897561_n.jpg?oh=00fd19a760baddea652906266cbcacd2&oe=5889914D",
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
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-9/14925771_666715536823879_1924831144549562241_n.jpg?oh=447b1bffe9825b7ff802db821c02c41c&oe=58CECA1F",
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

function sendlifestyleMessage(sender) 
{
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Duwun1",
          "subtitle": "Element #1 of an hscroll",
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-0/c0.11.200.200/p200x200/15036693_672096482952451_286439968195064488_n.jpg?oh=d69c842f166981c66476f760a0a27e54&oe=58BCB9A9",
          "buttons": [{
            "type": "web_url",
            "url": "https://drive.google.com/open?id=0BxuIjI-2X6CPZHY3b19Lc3VSUVlqMWxVNUtCV1FWSUpwcmFz",
            "title": "web url"
          }, {
            "type": "postback",
            "title": "Postback",
            "payload": "Payload for first element in a generic bubble",
          }],
        }, {
          "title": "Duwun2",
          "subtitle": "Element #2 of an hscroll",
          "image_url": "https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.0-9/15056258_672096459619120_3328037144239154473_n.jpg?oh=e4a56ed7b188732c8eb65d275288c5ed&oe=58B8BA50",
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
    }, 
      function(error, response, body) 
      {
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

var config = require("../config");
var TGAPI = require("./tgapi")

var api = new TGAPI(config.token)

var botInfo = null;

api.getMe(function(err, data)
{
    if (err) console.error(err);
    console.log(data);
    botInfo = data;
    api.startPolling(40);
});

api.on('message', function(message) {
    // message is the parsed JSON data from telegram message
    // query is the parsed JSON data from telegram inline query
    console.log('got message');
    console.log(message);
    
    // message.text is the text user sent (if there is)
    var text = message.text;
    
    // if there is the text
    if (message.text != undefined) {
        // echo the text back
        api.sendMessage(message.chat.id, message.text)
    }
    
})


api.on('inline_query', function (query) {
    // query is the parsed JSON data from telegram inline query
    console.log('got inline query');
    console.log(query);
    
    // query.query is the actully query data
    var text = query.query;
    
    // it should reply a list of inline answer
    api.answerInlineQuery(query.id, [
        {
            type: 'article',
            id: ("00000000" + (0x100000000 * Math.random()).toString(16)).slice(-8),
            title: 'Same',
            message_text: text,
            parse_mode: 'Markdown'
        },
        {
            type: 'article',
            id: ("00000000" + (0x100000000 * Math.random()).toString(16)).slice(-8),
            title: 'Reverse',
            message_text: text.split('').reverse().join(''),
            parse_mode: 'Markdown'
        }
    ], function (err, res) {
        if (err) return console.error(err);
    })
});
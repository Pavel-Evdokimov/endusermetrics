const nano = require("nano")("http://localhost:5984");
const csui_performance = nano.db.use("csui_performance_prod");
const feed = csui_performance.follow({ since: "now", include_docs: true });
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://alfa_user:alfa_user@z01-14101:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        if (err) {
            return console.error(err);
        }
        var q = 'fuckingfucning2';
        ch.assertQueue(q, { durable: true });
        feed.on("change", change => {
            var msg = change.doc;
            ch.sendToQueue(q, Buffer.from(JSON.stringify(msg)));
            console.log(change.id);
        });
    });
});

feed.follow();

const app = require("./app");
app.listen(process.env.APP_PORT, process.env.APP_HOST, function() {
    console.log(process.env.APP_PORT);
    console.log(process.env.APP_HOST);
});
(function(win) {
    //TODO: метод sendBeacon не поддерживается в IE
    var OTvar = {
        currentUser: {},
        node: {}
    };
    win.onerror = function(message, source, lineon, colno, error) {
        let errorMessag = {
            dateTimeStamp: new Date().toISOString(),
            error: {
                message: message,
                source: source,
                lineon: lineon,
                colno: colno,
                error: error
            }
        };
        if (OTvar) {
            errorMessag.currentUser = OTvar.currentUser;
            errorMessag.node = OTvar.node;
        }
        navigator.sendBeacon(
            "http://localhost:3005/metrics/errors",
            JSON.stringify(errorMessag)
        );
    };
})(window);

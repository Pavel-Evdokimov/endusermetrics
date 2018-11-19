$(window).on("unload", function() {
    navigator.sendBeacon(
        //TODO: переделать на параметры
        "http://localhost:3005/metrics/performance",
        JSON.stringify({
            NavigationTiming: performance.getEntriesByType("navigation"),
            Measure: performance.getEntriesByType("measure"),
            ResourceTimingXHR: performance
                .getEntriesByType("resource")
                .filter(x => {
                    return x.initiatorType === "xmlhttprequest";
                }),
            IFrame: performance.getEntriesByType("resource").filter(x => {
                return x.initiatorType === "iframe";
            }),
            CurrentUser: OTvar ? OTvar.currentUser : "",
            CurrentNode: OTvar ? OTvar.node : "",
            NetworkInformantion: navigator.connection,
            CurrentDateTime: new Date().toJSON()
        })
    );
});

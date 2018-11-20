$(document).ready(function() {
    $("select#rmsecAvailSuppMarks,select#rmsecSelectedSuppMarks")
        .attr("size", 8)
        .addClass("shadow");
});

$(window).on("unload", function() {
    try {
        navigator.sendBeacon(
            "http://opentext.vesta.ru/metrics",
            JSON.stringify({
                NavigationTiming: performance.getEntriesByType("navigation"),
                Measure: performance.getEntriesByType("measure"),
                ResourceTimingXHR: performance
                    .getEntriesByType("resource")
                    .filter(x => {
                        return x.initiatorType === "xmlhttprequest";
                    }),
                IFrame: performance
                    .getEntriesByType("resource")
                    .filter(function(x) {
                        return x.initiatorType === "iframe";
                    }),
                CurrentUser: OTvar ? OTvar.currentUser : "",
                CurrentNode: OTvar ? OTvar.node : "",
                NetworkInformantion: navigator.connection,
                CurrentDateTime: new Date().toJSON()
            })
        );
    } catch (err) {}
});

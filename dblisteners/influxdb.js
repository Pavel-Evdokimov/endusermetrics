const Influx = require("influx");
const influx = new Influx.InfluxDB(process.env.INFLUX_DB_LINK);
const nano = require("nano")(process.env.DB_LINK);
const csui_performance = nano.db.use(process.env.DB_NAME);
const feed = csui_performance.follow({ since: "now", include_docs: true });
const querystring = require("querystring");
const url = require("url");

function parseName(urlPath) {
    return urlPath ? url.parse(urlPath) : undefined;
}
function parseQueryString(queryString) {
    return queryString ? querystring.parse(queryString) : undefined;
}

function getFields(
    currentUserId,
    nodeId,
    duration,
    performanceEntrieName,
    restApiId
) {
    let query = parseQueryString(parseName(performanceEntrieName).query);
    let func = query ? query.func : undefined;
    return {
        "currentUser.ID": `${currentUserId}`,
        "node.ID": `${nodeId}`,
        duration: duration,
        performanceEntrieName: `${performanceEntrieName}`,
        "restapi.id": `${restApiId}`,
        func: func || ""
    };
}

function getInfluxPoint(tags, fields) {
    return {
        tags,
        fields
    };
}
// TODO: убрать костыль. Сделано для обратной совместимости с IFrame
function getRequestBody(requestBody) {
    return requestBody || [];
}

function getNavigationTimingInfluxPoints(requestBody, restApiId) {
    return requestBody
        ? [
              ...getRequestBody(requestBody["NavigationTiming"]).map(value => {
                  return getInfluxPoint(
                      {},
                      getFields(
                          requestBody["CurrentUser"].ID,
                          requestBody["CurrentNode"].ID,
                          value.duration,
                          value.name,
                          restApiId
                      )
                  );
              }),
              ...getRequestBody(requestBody["ResourceTimingXHR"]).map(value => {
                  return getInfluxPoint(
                      {},
                      getFields(
                          requestBody["CurrentUser"].ID,
                          requestBody["CurrentNode"].ID,
                          value.duration,
                          value.name,
                          restApiId
                      )
                  );
              }),
              ...getRequestBody(requestBody["IFrame"]).map(value => {
                  return getInfluxPoint(
                      {},
                      getFields(
                          requestBody["CurrentUser"].ID,
                          requestBody["CurrentNode"].ID,
                          value.duration,
                          value.name,
                          restApiId
                      )
                  );
              })
          ]
        : undefined;
}

function getMeasureTimingInfluxPoints(requestBody, restApiId) {
    return requestBody
        ? [
              ...requestBody["Measure"].map(value => {
                  return {
                      tags: {},
                      fields: {
                          "currentUser.ID": `${requestBody["CurrentUser"].ID}`,
                          duration: value.duration,
                          "measure.name": `${value.name}`,
                          "node.ID": `${requestBody["CurrentNode"].ID}`,
                          "restapi.id": `${restApiId}`
                      }
                  };
              })
          ]
        : undefined;
}

feed.on("change", change => {
    console.log(change.id);
    let promises = getNavigationTimingInfluxPoints(
        change.doc,
        `${change.id}`
    ).map(value => {
        return new Promise((res, rej) => {
            influx
                .writeMeasurement(process.env.INFLUX_NAVIGATION_TIMINGS_SERIES_NAME, [value])
                .then(() => {
                    res("ok");
                })
                .catch(err => {
                    rej(err);
                });
        });
    });
    promises.concat(
        getMeasureTimingInfluxPoints(change.doc, `${change.id}`).map(value => {
            return new Promise((res, rej) => {
                influx
                    .writeMeasurement(process.env.INFLUX_MEASURE_TIMINGS_SERIES_NAME, [value])
                    .then(() => {
                        res();
                    })
                    .catch(err => {
                        rej(err);
                    });
            });
        })
    );
    Promise.all(promises)
        .then(value => {
            console.log(value);
        })
        .catch(err => {
            console.error(err);
        });
});

feed.follow();

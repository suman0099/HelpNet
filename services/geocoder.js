const NodeGeocoder = require("node-geocoder");
const keys = require("../config/keys");

const options = {
    provider: keys.geocoderProvider,
    httpAdapter: "https",
    apiKey: keys.geocoderApiKey,
    formatter: null
};

const Store = require("electron-store").default;

const store = new Store({
    name: "config"
});

module.exports = store;
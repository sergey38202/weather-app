const Dotenv = require('dotenv-webpack');

// Rest of your webpack configuration

module.exports = {
    // ...
    plugins: [
        new Dotenv(),
        // Other plugins
    ],
    // ...
};

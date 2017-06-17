/* ---------------------CONTROLLER----------------------*/

const ToolService = require('./tools.services'); //

// Function for Getting tools

function getTools(domainName, done) {
    ToolService.getTools(domainName, done);
}

// Function for Posting tools

function postTools(dataFromBody, done) {
    if (dataFromBody.domain && dataFromBody.tools) {
            ToolService.addTools(dataFromBody, done);
        } else {
            return 'please fill out all fields!!';
        }
    }



// Exporting the functions to be used in router

module.exports = {
    getTools,
    postTools,
};

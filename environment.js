/*****************************
 * environment.js
 * path: '/frontend/environment.js'
 ******************************/

 /* Modified from https://alxmrtnz.com/thoughts/2019/03/12/environment-variables-and-workflow-in-expo.html#comment-4589309119 */

 // TODO @anniero98: add staging and prod (or spring semester)

// import { Platform } from "react-native";
// const localhost = Platform.OS === "ios" ? "localhost:8080" : "10.0.2.2:8080";

// Set release channel
const releaseChannel = "dev" // figure out how to toggle this per the original tutorial
const ENV = {
  dev: {
    AIRTABLE_BASE_ID: 'app4fXK49bqcjDMEo',
    AIRTABLE_API_KEY: 'keya0jqh5CEcNfG0F'
  }
  //   staging: {
  //     apiUrl: "[your.staging.api.here]",
  //     amplitudeApiKey: "[Enter your key here]"
  //     // Add other keys you want here
  //   },
  //   prod: {
  //     apiUrl: "[your.production.api.here]",
  //     amplitudeApiKey: "[Enter your key here]"
  //     // Add other keys you want here
  //   }
};

const getEnvVars = (env = releaseChannel) => {
  if (env == "dev") {
    return ENV.dev;
  } // else if (env === "staging") {

};


export default getEnvVars;
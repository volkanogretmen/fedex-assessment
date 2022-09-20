import { Given } from "cucumber";

chai.use(require("chai-as-promised"));

Given(
  "The app is open on {string}",
  { timeout: 25 * 1000 },
  async (env: string) => {
    //Opens App
    console.log(env);
  }
);

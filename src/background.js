import { decodeV1, decodeV2, decodeV3 } from "./decode.js";

browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { redirectUrl: decodeV1(details.url) };
  },
  {
    urls: [
      "https://urldefense.com/v1/url?*",
      "https://urldefense.proofpoint.com/v1/url?*",
    ],
    types: ["main_frame", "sub_frame"],
  },
  ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { redirectUrl: decodeV2(details.url) };
  },
  {
    urls: [
      "https://urldefense.com/v2/url?*",
      "https://urldefense.proofpoint.com/v2/url?*",
    ],
    types: ["main_frame", "sub_frame"],
  },
  ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { redirectUrl: decodeV3(details.url) };
  },
  {
    urls: [
      "https://urldefense.com/v3/*",
      "https://urldefense.proofpoint.com/v3/*",
    ],
    types: ["main_frame", "sub_frame"],
  },
  ["blocking"]
);

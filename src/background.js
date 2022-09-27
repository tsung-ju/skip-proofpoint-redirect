import { decodeHTML } from "entities";

browser.webRequest.onBeforeRequest.addListener(
  function redirectProofpointV2(details) {
    let target = new URL(details.url).searchParams.get("u");
    target = target.replaceAll("-", "%").replaceAll("_", "/");
    target = decodeURIComponent(target);
    target = decodeHTML(target);
    return {
      redirectUrl: target,
    };
  },
  {
    urls: ["https://urldefense.proofpoint.com/v2/url?*"],
    types: ["main_frame", "sub_frame"],
  },
  ["blocking"]
);

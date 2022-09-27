import { decodeHTML } from "entities";

// See: https://help.proofpoint.com/Threat_Insight_Dashboard/Concepts/How_do_I_decode_a_rewritten_URL%3F

function decodeV1(rewrittenUrl) {
  let target = new URL(rewrittenUrl).searchParams.get("u");
  target = decodeURIComponent(target);
  target = decodeHTML(target);
  return target;
}

function decodeV2(rewrittenUrl) {
  let target = new URL(rewrittenUrl).searchParams.get("u");
  target = target.replaceAll("-", "%").replaceAll("_", "/");
  target = decodeURIComponent(target);
  target = decodeHTML(target);
  return target;
}

browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { redirectUrl: decodeV1(details.url) };
  },
  {
    urls: ["https://urldefense.proofpoint.com/v1/url?*"],
    types: ["main_frame", "sub_frame"],
  },
  ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { redirectUrl: decodeV2(details.url) };
  },
  {
    urls: ["https://urldefense.proofpoint.com/v2/url?*"],
    types: ["main_frame", "sub_frame"],
  },
  ["blocking"]
);

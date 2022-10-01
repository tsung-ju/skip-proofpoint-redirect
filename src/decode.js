import { decodeHTML } from "entities";
import * as base64 from "base64-js";

// See: https://help.proofpoint.com/Threat_Insight_Dashboard/Concepts/How_do_I_decode_a_rewritten_URL%3F

export function decodeV1(rewrittenUrl) {
  let target = new URL(rewrittenUrl).searchParams.get("u");
  target = decodeURIComponent(target);
  target = decodeHTML(target);
  return target;
}

export function decodeV2(rewrittenUrl) {
  let target = new URL(rewrittenUrl).searchParams.get("u");
  target = target.replaceAll("-", "%").replaceAll("_", "/");
  target = decodeURIComponent(target);
  target = decodeHTML(target);
  return target;
}

export function decodeV3(rewrittenUrl) {
  let [_, url, encBytes] = rewrittenUrl.match(/v3\/__(.+?)__;(.*?)!/);
  url = decodeURIComponent(url);
  const decBytes = decodeEncBytes(encBytes);
  url = substituteTokens(url, decBytes);
  return url;
}

const utf8Decoder = new TextDecoder("utf-8");

function decodeEncBytes(encBytes) {
  const paddingLength = -encBytes.length & 3;
  const bytes = base64.toByteArray(encBytes + "=".repeat(paddingLength));
  return utf8Decoder.decode(bytes);
}

const v3RunMapping = createRunMapping();

function substituteTokens(text, decBytes) {
  let offset = 0;
  return text.replaceAll(/\*(\*.)?/g, (token) => {
    const runLength = v3RunMapping[token] ?? 0;
    const run = decBytes.slice(offset, runLength);
    offset += runLength;
    return run;
  });
}

function createRunMapping() {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const runValues = uppercase + lowercase + digits + "-" + "_";
  return Object.fromEntries([
    ["*", 1],
    ...Array.from(runValues, (char, index) => ["**" + char, 2 + index]),
  ]);
}

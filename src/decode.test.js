import { describe, test } from "mocha";
import { strict as assert } from "node:assert";
import { decodeV1, decodeV2, decodeV3 } from "./decode.js";

describe("decode", () => {
  test("decodeV1 decodes V1 url", () => {
    const encodedUrl =
      "https://urldefense.proofpoint.com/v1/url?u=http://www.bouncycastle.org/&amp;k=oIvRg1%2BdGAgOoM1BIlLLqw%3D%3D%0A&amp;r=IKM5u8%2B%2F%2Fi8EBhWOS%2BqGbTqCC%2BrMqWI%2FVfEAEsQO%2F0Y%3D%0A&amp;m=Ww6iaHO73mDQpPQwOwfLfN8WMapqHyvtu8jM8SjqmVQ%3D%0A&amp;s=d3583cfa53dade97025bc6274c6c8951dc29fe0f38830cf8e5a447723b9f1c9a";
    const decodedUrl = "http://www.bouncycastle.org/";
    assert.equal(decodeV1(encodedUrl), decodedUrl);
  });

  test("decodeV2 decodes V2 url", () => {
    const encodedUrl =
      "https://urldefense.proofpoint.com/v2/url?u=https-3A__media.mnn.com_assets_images_2016_06_jupiter-2Dnasa.jpg.638x0-5Fq80-5Fcrop-2Dsmart.jpg&amp;d=DwMBaQ&amp;c=Vxt5e0Osvvt2gflwSlsJ5DmPGcPvTRKLJyp031rXjhg&amp;r=BTD8MPjq1qSLi0tGKaB5H6aCJZZBjwYkLyorZdRQrnY&amp;m=iKjixvaJuqvmReS78AB0JiActTrR_liSq7lDRjEQ9DE&amp;s=-M8Vz-GV-kqkNVf1BAtv38DdudAHVDAI6_jQQLVmleE&amp;e=";
    const decodedUrl =
      "https://media.mnn.com/assets/images/2016/06/jupiter-nasa.jpg.638x0_q80_crop-smart.jpg";
    assert.equal(decodeV2(encodedUrl), decodedUrl);
  });

  test("decodeV3 decodes V3 url", () => {
    const encodedUrl =
      "https://urldefense.com/v3/__https://google.com:443/search?q=a*test&gs=ps__;Kw!-612Flbf0JvQ3kNJkRi5Jg!Ue6tQudNKaShHg93trcdjqDP8se2ySE65jyCIe2K1D_uNjZ1Lnf6YLQERujngZv9UWf66ujQIQ$";
    const decodedUrl = "https://google.com:443/search?q=a+test&gs=ps";
    assert.equal(decodeV3(encodedUrl), decodedUrl);
  });
});

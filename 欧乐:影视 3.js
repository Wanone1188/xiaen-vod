// @name 欧乐影视
// @description 欧乐影视 - 签名API，精确匹配影视资源（修复详情404）
// @version 1.0.4

const SITE = "https://api.olelive.com";
const REFERER = "https://www.olelive.com";
const REQUEST_TIMEOUT = 10000;
const MIN_MATCH_SCORE = 60;

const REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  'Referer': REFERER,
  'Origin': REFERER,
  'Content-Type': 'application/json'
};

// ==================== MD5 实现 ====================
function md5(string) {
  function rotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function addUnsigned(lX, lY) {
    let lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
    } else return (lResult ^ lX8 ^ lY8);
  }
  function f(x, y, z) { return (x & y) | ((~x) & z); }
  function g(x, y, z) { return (x & z) | (y & (~z)); }
  function h(x, y, z) { return x ^ y ^ z; }
  function i(x, y, z) { return y ^ (x | (~z)); }
  function ff(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function gg(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function hh(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function ii(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function convertToWordArray(string) {
    let lWordCount;
    let lMessageLength = string.length;
    let lNumberOfWords_temp1 = lMessageLength + 8;
    let lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    let lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    let lWordArray = Array(lNumberOfWords - 1);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function wordToHex(lValue) {
    let wordToHexValue = "", wordToHexValue_temp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue_temp = "0" + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
    }
    return wordToHexValue;
  }
  let x = convertToWordArray(string);
  let a = 0x67452301;
  let b = 0xEFCDAB89;
  let c = 0x98BADCFE;
  let d = 0x10325476;
  for (let k = 0; k < x.length; k += 16) {
    let AA = a, BB = b, CC = c, DD = d;
    a = ff(a, b, c, d, x[k + 0], 7, 0xD76AA478);
    d = ff(d, a, b, c, x[k + 1], 12, 0xE8C7B756);
    c = ff(c, d, a, b, x[k + 2], 17, 0x242070DB);
    b = ff(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE);
    a = ff(a, b, c, d, x[k + 4], 7, 0xF57C0FAF);
    d = ff(d, a, b, c, x[k + 5], 12, 0x4787C62A);
    c = ff(c, d, a, b, x[k + 6], 17, 0xA8304613);
    b = ff(b, c, d, a, x[k + 7], 22, 0xFD469501);
    a = ff(a, b, c, d, x[k + 8], 7, 0x698098D8);
    d = ff(d, a, b, c, x[k + 9], 12, 0x8B44F7AF);
    c = ff(c, d, a, b, x[k + 10], 17, 0xFFFF5BB1);
    b = ff(b, c, d, a, x[k + 11], 22, 0x895CD7BE);
    a = ff(a, b, c, d, x[k + 12], 7, 0x6B901122);
    d = ff(d, a, b, c, x[k + 13], 12, 0xFD987193);
    c = ff(c, d, a, b, x[k + 14], 17, 0xA679438E);
    b = ff(b, c, d, a, x[k + 15], 22, 0x49B40821);
    a = gg(a, b, c, d, x[k + 1], 5, 0xF61E2562);
    d = gg(d, a, b, c, x[k + 6], 9, 0xC040B340);
    c = gg(c, d, a, b, x[k + 11], 14, 0x265E5A51);
    b = gg(b, c, d, a, x[k + 0], 20, 0xE9B6C7AA);
    a = gg(a, b, c, d, x[k + 5], 5, 0xD62F105D);
    d = gg(d, a, b, c, x[k + 10], 9, 0x02441453);
    c = gg(c, d, a, b, x[k + 15], 14, 0xD8A1E681);
    b = gg(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8);
    a = gg(a, b, c, d, x[k + 9], 5, 0x21E1CDE6);
    d = gg(d, a, b, c, x[k + 14], 9, 0xC33707D6);
    c = gg(c, d, a, b, x[k + 3], 14, 0xF4D50D87);
    b = gg(b, c, d, a, x[k + 8], 20, 0x455A14ED);
    a = gg(a, b, c, d, x[k + 13], 5, 0xA9E3E905);
    d = gg(d, a, b, c, x[k + 2], 9, 0xFCEFA3F8);
    c = gg(c, d, a, b, x[k + 7], 14, 0x676F02D9);
    b = gg(b, c, d, a, x[k + 12], 20, 0x8D2A4C8A);
    a = hh(a, b, c, d, x[k + 5], 4, 0xFFFA3942);
    d = hh(d, a, b, c, x[k + 8], 11, 0x8771F681);
    c = hh(c, d, a, b, x[k + 11], 16, 0x6D9D6122);
    b = hh(b, c, d, a, x[k + 14], 23, 0xFDE5380C);
    a = hh(a, b, c, d, x[k + 1], 4, 0xA4BEEA44);
    d = hh(d, a, b, c, x[k + 4], 11, 0x4BDECFA9);
    c = hh(c, d, a, b, x[k + 7], 16, 0xF6BB4B60);
    b = hh(b, c, d, a, x[k + 10], 23, 0xBEBFBC70);
    a = hh(a, b, c, d, x[k + 13], 4, 0x289B7EC6);
    d = hh(d, a, b, c, x[k + 0], 11, 0xEAA127FA);
    c = hh(c, d, a, b, x[k + 3], 16, 0xD4EF3085);
    b = hh(b, c, d, a, x[k + 6], 23, 0x04881D05);
    a = hh(a, b, c, d, x[k + 9], 4, 0xD9D4D039);
    d = hh(d, a, b, c, x[k + 12], 11, 0xE6DB99E5);
    c = hh(c, d, a, b, x[k + 15], 16, 0x1FA27CF8);
    b = hh(b, c, d, a, x[k + 2], 23, 0xC4AC5665);
    a = ii(a, b, c, d, x[k + 0], 6, 0xF4292244);
    d = ii(d, a, b, c, x[k + 7], 10, 0x432AFF97);
    c = ii(c, d, a, b, x[k + 14], 15, 0xAB9423A7);
    b = ii(b, c, d, a, x[k + 5], 21, 0xFC93A039);
    a = ii(a, b, c, d, x[k + 12], 6, 0x655B59C3);
    d = ii(d, a, b, c, x[k + 3], 10, 0x8F0CCC92);
    c = ii(c, d, a, b, x[k + 10], 15, 0xFFEFF47D);
    b = ii(b, c, d, a, x[k + 1], 21, 0x85845DD1);
    a = ii(a, b, c, d, x[k + 8], 6, 0x6FA87E4F);
    d = ii(d, a, b, c, x[k + 15], 10, 0xFE2CE6E0);
    c = ii(c, d, a, b, x[k + 6], 15, 0xA3014314);
    b = ii(b, c, d, a, x[k + 13], 21, 0x4E0811A1);
    a = ii(a, b, c, d, x[k + 4], 6, 0xF7537E82);
    d = ii(d, a, b, c, x[k + 11], 10, 0xBD3AF235);
    c = ii(c, d, a, b, x[k + 2], 15, 0x2AD7D2BB);
    b = ii(b, c, d, a, x[k + 9], 21, 0xEB86D391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }
  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

// ==================== 签名算法 ====================
function he(e) {
  let t = [];
  let r = e.split('');
  for (let i = 0; i < r.length; i++) {
    if (i != 0) t.push(' ');
    let code = r[i].charCodeAt().toString(2);
    t.push(code);
  }
  return t.join('');
}

function signature() {
  return t(Math.floor(Date.now() / 1000));
}

function t(e) {
  let str = e.toString();
  let r = [[], [], [], []];
  for (let i = 0; i < str.length; i++) {
    let e_val = he(str[i]);
    r[0] += e_val.slice(2, 3);
    r[1] += e_val.slice(3, 4);
    r[2] += e_val.slice(4, 5);
    r[3] += e_val.slice(5);
  }
  let a = [];
  for (let i = 0; i < r.length; i++) {
    let e_val = parseInt(r[i], 2).toString(16);
    if (e_val.length == 2) e_val = '0' + e_val;
    if (e_val.length == 1) e_val = '00' + e_val;
    if (e_val.length == 0) e_val = '000';
    a[i] = e_val;
  }
  let n = md5(str);
  return n.slice(0, 3) + a[0] + n.slice(6, 11) + a[1] + n.slice(14, 19) + a[2] + n.slice(22, 27) + a[3] + n.slice(30);
}

// ==================== 工具函数 ====================
function logInfo(message, data = null) {
  if (data) console.log(`[欧乐] ${message}:`, JSON.stringify(data));
  else console.log(`[欧乐] ${message}`);
}

function logError(message, error = null) {
  if (error) console.error(`[欧乐] ${message}:`, error.message || error);
  else console.error(`[欧乐] ${message}`);
}

function cleanTitle(title) {
  if (!title) return '';
  return title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '').toLowerCase();
}

function extractBaseName(title) {
  if (!title) return '';
  let cleaned = title.replace(/[\(\[（【][^\)\]）】]*[\)\]）】]/g, '');
  const separators = /[:：\-—\s]+/;
  const parts = cleaned.split(separators);
  return parts[0]?.trim() || cleaned.trim();
}

function extractEpisodeNumber(epName) {
  if (!epName) return null;
  let match = epName.match(/第\s*(\d+)\s*[集话期]/);
  if (match) return parseInt(match[1]);
  match = epName.match(/[Ee][Pp]?\s*(\d+)/);
  if (match) return parseInt(match[1]);
  match = epName.match(/\b(\d{1,3})\b/);
  if (match && !match[1].match(/^(1080|720|480|2160|4k)$/i)) return parseInt(match[1]);
  return null;
}

async function httpGet(url) {
  try {
    const response = await Widget.http.get(url, {
      headers: REQUEST_HEADERS,
      timeout: REQUEST_TIMEOUT
    });
    let data = response.data;
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        return null;
      }
    }
    return data;
  } catch (error) {
    logError(`请求失败: ${url}`, error);
    return null;
  }
}

function buildApiUrl(path, params = {}) {
  let url = `${SITE}${path}`;
  const queryParams = { ...params, _vv: signature() };
  const queryString = Object.keys(queryParams)
    .filter(k => queryParams[k] !== undefined && queryParams[k] !== '')
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(queryParams[k])}`)
    .join('&');
  if (queryString) url += (url.includes('?') ? '&' : '?') + queryString;
  return url;
}

// ==================== 搜索 ====================
async function searchVod(keyword, pg = 1) {
  try {
    const url = buildApiUrl('/v1/pub/index/search/' + encodeURIComponent(keyword) + '/vod/0/' + pg + '/48');
    logInfo(`请求URL: ${url}`);
    const res = await httpGet(url);
    if (!res || res.code !== 0) {
      logInfo(`API返回异常: ${JSON.stringify(res)}`);
      return [];
    }
    
    const vodData = res.data?.data?.find(item => item.type === 'vod');
    if (!vodData || !vodData.list) return [];
    
    return vodData.list
      .filter(item => item.vip === false)
      .map(item => ({
        vod_id: String(item.id),
        vod_name: item.name,
        vod_pic: `https://static.olelive.com/${item.pic}`,
        vod_remarks: item.remark || ''
      }));
  } catch (e) {
    logError('搜索失败', e);
    return [];
  }
}

// ==================== 获取详情（修复：添加 /true 路径） ====================
async function getDetail(vodId) {
  try {
    // 原版接口路径为 /v1/pub/vod/detail/{id}/true
    const url = buildApiUrl('/v1/pub/vod/detail/' + vodId + '/true');
    logInfo(`详情URL: ${url}`);
    const res = await httpGet(url);
    if (!res || res.code !== 0) return null;
    return res.data;
  } catch (e) {
    logError('获取详情失败', e);
    return null;
  }
}

// ==================== 计算匹配分数 ====================
function calculateMatchScore(searchName, itemName) {
  const cleanSearch = cleanTitle(searchName);
  const cleanItem = cleanTitle(itemName);
  if (cleanItem === cleanSearch) return 100;
  if (cleanItem.includes(cleanSearch)) return 70;
  if (cleanSearch.includes(cleanItem)) return 50;
  let matchCount = 0;
  for (let i = 0; i < cleanSearch.length; i++) {
    if (cleanItem.includes(cleanSearch[i])) matchCount++;
  }
  return (matchCount / cleanSearch.length) * 30;
}

// ==================== 统一入口 ====================
async function loadResource(params) {
  let seriesName = params?.seriesName || params?.title || params?.name || params?.keyword;
  
  if (!seriesName && params?.TestTitle) {
    seriesName = params.TestTitle;
    logInfo(`使用测试片名: ${seriesName}`);
  }
  
  let type = params?.type === 'movie' ? 'movie' : 'tv';
  let episode = params?.episode ? parseInt(params.episode) : null;

  logInfo(`触发 - 搜索: ${seriesName}, 类型: ${type}, 集: ${episode}`);
  if (!seriesName) return [];

  const searchKeyword = extractBaseName(seriesName);
  logInfo(`搜索关键词: ${searchKeyword}`);

  const searchResults = await searchVod(searchKeyword);
  if (!searchResults.length) {
    logInfo(`未找到相关视频: ${searchKeyword}`);
    return [];
  }

  const cleanSearchName = cleanTitle(searchKeyword);
  let matchedItem = null;
  let matchScore = 0;
  for (const item of searchResults) {
    const score = calculateMatchScore(cleanSearchName, item.vod_name);
    logInfo(`候选: ${item.vod_name} (${item.vod_id}) 得分: ${score}`);
    if (score > matchScore) {
      matchScore = score;
      matchedItem = item;
    }
  }

  if (!matchedItem || matchScore < MIN_MATCH_SCORE) {
    logInfo(`未找到足够匹配的资源 (最高分=${matchScore}, 需要≥${MIN_MATCH_SCORE})`);
    return [];
  }

  logInfo(`匹配到: ${matchedItem.vod_name} (匹配度: ${matchScore})`);

  const detail = await getDetail(matchedItem.vod_id);
  if (!detail || !detail.urls || !detail.urls.length) {
    logInfo('获取详情失败或无播放源');
    return [];
  }

  const realTitle = detail.title || detail.name || matchedItem.vod_name;
  logInfo(`真实标题: ${realTitle}, 共${detail.urls.length}个播放项`);

  const matchedUrls = [];
  for (const item of detail.urls) {
    const epName = item.title || '';
    let epNum = extractEpisodeNumber(epName);
    
    if (type === 'movie') {
      if (matchedUrls.length === 0) matchedUrls.push(item);
    } else {
      if (episode !== null) {
        if (epNum === episode) matchedUrls.push(item);
      } else {
        if (matchedUrls.length === 0) matchedUrls.push(item);
      }
    }
  }

  if (matchedUrls.length === 0) {
    logInfo(`未找到匹配的集数 (type=${type}, episode=${episode})`);
    return [];
  }

  const resources = [];
  for (let i = 0; i < matchedUrls.length; i++) {
    const item = matchedUrls[i];
    const videoUrl = item.url;
    if (!videoUrl) continue;
    
    let description = realTitle;
    const epName = item.title || '';
    if (type === 'tv' && epName && !epName.includes('正片')) {
      description = `${realTitle} ${epName}`;
    }
    
    resources.push({
      id: `${matchedItem.vod_id}_${Date.now()}_${i}`,
      name: '欧乐影视',
      type: type,
      description: description,
      url: videoUrl
    });
  }

  const urlSet = new Set();
  const uniqueResources = [];
  for (const r of resources) {
    if (!urlSet.has(r.url)) {
      urlSet.add(r.url);
      uniqueResources.push(r);
    }
  }

  logInfo(`最终返回 ${uniqueResources.length} 个播放资源`);
  if (uniqueResources.length > 0) {
    logInfo(`示例: ${JSON.stringify(uniqueResources[0])}`);
  }
  return uniqueResources;
}

// ==================== Widget 元数据 ====================
WidgetMetadata = {
  id: "OleLive",
  title: "欧乐影视",
  icon: "",
  version: "1.0.4",
  requiredVersion: "0.0.1",
  description: "欧乐影视 - 签名API（修复详情404）",
  author: "MoYan",
  globalParams: [
    {
      name: "TestTitle",
      title: "测试片名",
      type: "input",
      value: ""
    }
  ],
  modules: [
    {
      id: "loadResource",
      title: "加载欧乐影视资源",
      functionName: "loadResource",
      type: "stream",
      params: []
    }
  ]
};
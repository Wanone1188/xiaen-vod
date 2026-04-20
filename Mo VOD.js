const RESOURCE_SITES = `
如意,https://cj.rycjapi.com/api.php/provide/vod/at/json/
量子,https://cj.lziapi.com/api.php/provide/vod/at/json/
爱奇,https://iqiyizyapi.com/api.php/provide/vod/
卧龙,https://wolongzyw.com/api.php/provide/vod/
最大,https://api.zuidapi.com/api.php/provide/vod/
暴风,https://bfzyapi.com/api.php/provide/vod/
极速,https://jszyapi.com/api.php/provide/vod/
无尽,https://api.wujinapi.com/api.php/provide/vod/
天堂,http://caiji.dyttzyapi.com/api.php/provide/vod/
如意,https://cj.rycjapi.com/api.php/provide/vod/
红牛,https://www.hongniuzy2.com/api.php/provide/vod/
爱坤,https://ikunzyapi.com/api.php/provide/vod/
优酷,https://api.ukuapi.com/api.php/provide/vod/
虎牙,https://www.huyaapi.com/api.php/provide/vod/
新浪,http://api.xinlangapi.com/xinlangapi.php/provide/vod/
鲸鱼,https://jyzyapi.com/provide/vod/
爱蛋,https://lovedan.net/api.php/provide/vod/
飘零,https://p2100.net/api.php/provide/vod/
`;

const CHINESE_NUM_MAP = {
  '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
  '六': 6, '七': 7, '八': 8, '九': 9, '十': 10
};

// 扩充部分序号的映射
const PART_ORDER_MAP = {
  '': 0, '前': 1, '前篇': 1, '上': 1, '上部': 1, '上集': 1, '上部分': 1, '1': 1, '一': 1, 'A': 1, 'a': 1,
  '中': 2, '中部': 2, '中集': 2, '中部分': 2, '2': 2, '二': 2, 'B': 2, 'b': 2,
  '后': 3, '后篇': 3, '下': 3, '下部': 3, '下集': 3, '下部分': 3, '3': 3, '三': 3, 'C': 3, 'c': 3,
  '本': 4, '全': 4, '完整': 4, '4': 4, '四': 4,
  '五': 5, '5': 5, '五部': 5
};

// 站点健康度评估常量
const SITE_HEALTH_KEY = 'vod_site_health_stats';
const MAX_HEALTH_HISTORY = 20;
const INITIAL_HEALTH_SCORE = 0.7;

WidgetMetadata = {
  id: "VOD_STREAM",
  title: "VOD STREAM",
  icon: "无",
  version: "1.7.0",
  requiredVersion: "0.0.1",
  description: "获取聚合VOD影视资源，智能分组，连接质量排序，全局支持自定义过滤关键词（电影/剧集通用），支持严格季数匹配和电影精准匹配",
  author: "MoYan",
  site: "无",
  globalParams: [
    {
      name: "VodData",
      title: "JSON或CSV格式的源配置",
      type: "input",
      value: RESOURCE_SITES
    },
    {
      name: "excludeKeywords",
      title: "需要过滤的关键词（用逗号、空格或换行分隔，例如：特辑,加更,集锦）",
      type: "input",
      value: ""  // 默认清空
    }
  ],
  modules: [
    {
      id: "loadResource",
      title: "加载资源",
      functionName: "loadResource",
      type: "stream",
      params: [],
    }
  ],
};

// --- 辅助工具函数 ---
const isM3U8Url = (url) => url?.toLowerCase().includes('m3u8') || false;

/**
 * 提取剧名的基础名称：去除括号内容，取第一个特殊符号之前的部分
 * 特殊符号包括：: ： - —— （空格也作为分割符）
 */
function extractBaseName(title) {
  if (!title) return '';
  // 1. 移除所有括号内容（中文括号、英文括号）
  let cleaned = title.replace(/[\(\[（【][^\)\]）】]*[\)\]）】]/g, '');
  // 2. 按常见分隔符分割，取第一部分
  const separators = /[:：\-—\s]+/;
  const parts = cleaned.split(separators);
  return parts[0]?.trim() || cleaned.trim();
}

/**
 * 清洗剧名：只保留中文字母数字，转小写
 */
function cleanTitle(title) {
  if (!title) return '';
  return title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '').toLowerCase();
}

function extractSeasonInfo(seriesName) {
  if (!seriesName) return { baseName: seriesName, seasonNumber: 1, cleanBaseName: '' };
  
  let cleanedName = seriesName;
  cleanedName = cleanedName.replace(/[\(\[（【][^\)\]）】]*[\)\]）】]/g, '');
  
  let baseName = cleanedName;
  let seasonNumber = 1;
  
  const chineseMatch = cleanedName.match(/第([一二三四五六七八九十\d]+)[季部]/);
  if (chineseMatch) {
    const val = chineseMatch[1];
    seasonNumber = CHINESE_NUM_MAP[val] || parseInt(val) || 1;
    baseName = cleanedName.replace(/第[一二三四五六七八九十\d]+[季部]/, '').trim();
  } else {
    const digitMatch = cleanedName.match(/(.+?)(?:[ _\-]?)(\d{1,4})$/);
    if (digitMatch) {
      const possibleBase = digitMatch[1].trim();
      const possibleSeason = parseInt(digitMatch[2]);
      if (possibleBase && possibleSeason > 0) {
        baseName = possibleBase;
        seasonNumber = possibleSeason;
      }
    }
  }
  
  // 提取基础名称（特殊符号前）
  baseName = extractBaseName(baseName);
  
  // 清洗基础名称
  const cleanBaseName = cleanTitle(baseName);
  
  return { baseName, seasonNumber, cleanBaseName };
}

function parseVarietyEpisode(epName) {
  if (!epName) return null;
  const epNameClean = epName.trim();

  if (epNameClean.includes('先导')) {
    return { seasonNum: 0, partOrder: 0, rawName: epNameClean, type: 'pilot' };
  }
  let specialMatch = epNameClean.match(/(?:特别篇|加更)[\s\-]*(\d+)/);
  if (specialMatch) {
    const specialNum = parseInt(specialMatch[1]);
    return { seasonNum: 1000 + specialNum, partOrder: 0, rawName: epNameClean, type: 'special' };
  }
  let match = epNameClean.match(/第\s*(\d+)\s*[期集][\s\-\(（]*([上下中一二三四五六七八九十\d前半后本]*)[\s\)）\-]*/);
  if (match) {
    const seasonNum = parseInt(match[1]);
    let partKey = match[2]?.trim() || '';
    const partOrder = PART_ORDER_MAP[partKey] !== undefined ? PART_ORDER_MAP[partKey] : (parseInt(partKey) || 0);
    return { seasonNum, partOrder, rawName: epNameClean, type: 'standard' };
  }
  match = epNameClean.match(/[EePp][\s\-]*(\d+)/i);
  if (match) {
    const seasonNum = parseInt(match[1]);
    return { seasonNum, partOrder: 0, rawName: epNameClean, type: 'ep' };
  }
  const digitMatch = epNameClean.match(/(\d+)/);
  if (digitMatch) {
    const seasonNum = parseInt(digitMatch[1]);
    return { seasonNum, partOrder: 0, rawName: epNameClean, type: 'fallback_digit' };
  }
  return { seasonNum: 0, partOrder: 0, rawName: epNameClean, type: 'unknown' };
}

function extractFeatureTag(vod_remarks, epName, quality = '') {
  if (!vod_remarks) vod_remarks = '';
  if (!epName) epName = '';
  if (!quality) quality = '';
  
  const remark = vod_remarks.toLowerCase();
  const episode = epName.toLowerCase();
  const qual = quality.toLowerCase();
  
  const nonTheatricalKeywords = [
    'tc', 'tc版', '抢先版', '枪版', '尝鲜版', '非正式版',
    'hdts', 'hdts版', 'hdtc', 'hdtc版', 'ts', 'ts版',
    'cam', 'cam版', 'scr', 'scr版', 'dvdscr', 'web-dl',
    '低清', '高清tc', '高清抢先', '内部版', '预映版'
  ];
  
  const allText = `${remark} ${episode} ${qual}`;
  for (const keyword of nonTheatricalKeywords) {
    if (allText.includes(keyword)) {
      if (qual.includes('tc') || qual.includes('抢先') || remark.includes('tc') || remark.includes('抢先')) {
        return '抢先版';
      }
      return '非正片';
    }
  }
  
  if (remark.includes('纯享') || episode.includes('纯享')) return '纯享';
  if (remark.includes('番外') || episode.includes('番外')) return '番外';
  if (remark.includes('花絮') || episode.includes('花絮')) return '花絮';
  if (remark.includes('特辑') || episode.includes('特辑')) return '特辑';
  
  return '正片';
}

function parseResourceSites(VodData) {
  const parseLine = (line) => {
    const [title, value] = line.split(',').map(s => s.trim());
    if (title && value?.startsWith('http')) {
      return { title, value: value.endsWith('/') ? value : value + '/' };
    }
    return null;
  };
  try {
    const trimmed = VodData?.trim() || "";
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      return JSON.parse(trimmed).map(s => ({ title: s.title || s.name, value: s.url || s.value })).filter(s => s.title && s.value);
    }
    return trimmed.split('\n').map(parseLine).filter(Boolean);
  } catch (e) {
    return RESOURCE_SITES.trim().split('\n').map(parseLine).filter(Boolean);
  }
}

function extractPlayInfoForCache(item, siteTitle, type, excludeKeywords = []) {
  const { vod_name, vod_play_url, vod_play_from, vod_remarks = '' } = item;
  if (!vod_name || !vod_play_url) return [];

  const playSources = vod_play_url.replace(/#+$/, '').split('$$$');
  const sourceNames = (vod_play_from || '').split('$$$');
  
  return playSources.flatMap((playSource, i) => {
    const sourceName = sourceNames[i] || '默认源';
    const isTV = playSource.includes('#');
    const results = [];

    if (type === 'tv' && isTV) {
      const episodes = playSource.split('#').filter(Boolean);
      
      episodes.forEach(ep => {
        const [rawEpName, url] = ep.split('$');
        if (url && isM3U8Url(url)) {
          const epNameClean = rawEpName.trim();
          
          // 过滤：检查剧集名或备注是否包含排除关键词
          const shouldExclude = excludeKeywords.some(keyword => 
            epNameClean.includes(keyword) || vod_remarks.includes(keyword)
          );
          if (shouldExclude) return;
          
          const parsedInfo = parseVarietyEpisode(epNameClean);
          const episodeInfoForSort = parsedInfo || { seasonNum: 0, partOrder: 0, rawName: epNameClean, type: 'parse_failed' };
          const featureTag = extractFeatureTag(vod_remarks, epNameClean);
          const healthScore = siteHealthManager.getHealthScore(siteTitle);
          
          results.push({
            name: siteTitle,
            description: `${vod_name} - ${rawEpName}${vod_remarks ? ' - ' + vod_remarks : ''} - [${sourceName}]`,
            url: url.trim(),
            _epInfo: episodeInfoForSort,
            _rawEpName: epNameClean,
            _originalEpForFilter: parsedInfo ? parsedInfo.seasonNum : 0,
            _vodName: vod_name,
            _featureTag: featureTag,
            _sourceName: sourceName,
            _healthScore: healthScore,
            _siteTitle: siteTitle
          });
        }
      });
    } else if (type === 'movie' && !isTV) {
      const firstM3U8 = playSource.split('#').find(v => isM3U8Url(v.split('$')[1]));
      if (firstM3U8) {
        const [quality, url] = firstM3U8.split('$');
        
        // 过滤：检查电影名、备注、质量标签是否包含排除关键词
        const shouldExclude = excludeKeywords.some(keyword => 
          vod_name.includes(keyword) || vod_remarks.includes(keyword) || quality.includes(keyword)
        );
        if (shouldExclude) return results; // 跳过该电影资源
        
        const featureTag = extractFeatureTag(vod_remarks, '', quality);
        const healthScore = siteHealthManager.getHealthScore(siteTitle);
        
        results.push({
          name: siteTitle,
          description: `${vod_name} - ${featureTag} - [${sourceName}]`,
          url: url.trim(),
          _featureTag: featureTag,
          _healthScore: healthScore,
          _siteTitle: siteTitle
        });
      }
    }
    return results;
  });
}

function assignContinuousEpisodeNumbers(resources) {
  const tvResources = resources.filter(r => r._epInfo);
  const nonTvResources = resources.filter(r => !r._epInfo);
  
  if (tvResources.length === 0) return resources;
  
  tvResources.sort((a, b) => {
    const aInfo = a._epInfo;
    const bInfo = b._epInfo;
    if (aInfo.seasonNum !== bInfo.seasonNum) return aInfo.seasonNum - bInfo.seasonNum;
    if (aInfo.partOrder !== bInfo.partOrder) return aInfo.partOrder - bInfo.partOrder;
    return (aInfo.rawName || '').localeCompare(bInfo.rawName || '');
  });
  
  let nextAvailableNumber = 1;
  const episodeNumberMap = new Map();
  const renumberedResources = [];
  
  const zeroSeasonResources = tvResources.filter(r => r._epInfo.seasonNum === 0);
  const otherResources = tvResources.filter(r => r._epInfo.seasonNum !== 0);
  
  zeroSeasonResources.forEach(res => {
    const info = res._epInfo;
    const uniqueKey = `0_${info.partOrder}_${info.type}`;
    episodeNumberMap.set(uniqueKey, 0);
    renumberedResources.push({ res, episodeNumber: 0 });
  });
  
  otherResources.forEach(res => {
    const info = res._epInfo;
    let mergeKey = '';
    if (info.partOrder === 0 || info.partOrder === 1) {
      mergeKey = `${info.seasonNum}_0or1`;
    } else {
      mergeKey = `${info.seasonNum}_${info.partOrder}`;
    }
    
    let episodeNumber;
    if (episodeNumberMap.has(mergeKey)) {
      episodeNumber = episodeNumberMap.get(mergeKey);
    } else {
      episodeNumber = nextAvailableNumber;
      episodeNumberMap.set(mergeKey, episodeNumber);
      nextAvailableNumber++;
    }
    renumberedResources.push({ res, episodeNumber });
  });
  
  renumberedResources.sort((a, b) => a.episodeNumber - b.episodeNumber);
  
  const finalResources = renumberedResources.map(({ res, episodeNumber }) => {
    const info = res._epInfo;
    let cleanVodName = (res._vodName || '')
      .replace(/\([^)]*\)/g, '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\s+/g, '')
      .trim();
    
    let partSuffix = '';
    if (info.partOrder > 0) {
      const partMap = { 1: '上', 2: '中', 3: '下', 4: '全' };
      partSuffix = `-${partMap[info.partOrder] || info.partOrder}`;
    }
    
    const newDescription = `${cleanVodName} 第${episodeNumber}集${partSuffix} ${info.rawName} - ${res._featureTag} - [${res._sourceName}]`;
    
    return {
      ...res,
      _ep: episodeNumber,
      description: newDescription
    };
  });
  
  return [...finalResources, ...nonTvResources];
}

function sortByConnectionHealth(resources) {
  if (resources.length <= 1) return resources;
  
  const groupedResources = {};
  resources.forEach(resource => {
    const key = `${resource._vodName || 'unknown'}_${resource._ep || 0}`;
    if (!groupedResources[key]) groupedResources[key] = [];
    groupedResources[key].push(resource);
  });
  
  const sortedResources = [];
  Object.values(groupedResources).forEach(group => {
    group.sort((a, b) => (b._healthScore || 0) - (a._healthScore || 0));
    sortedResources.push(...group);
  });
  return sortedResources;
}

// 站点健康度管理类
class SiteHealthManager {
  constructor() {
    this.healthStats = {};
    this.loadHealthStats();
  }
  loadHealthStats() {
    try {
      const stats = Widget.storage.get(SITE_HEALTH_KEY);
      if (stats && typeof stats === 'object') this.healthStats = stats;
    } catch (e) { this.healthStats = {}; }
  }
  saveHealthStats() {
    try { Widget.storage.set(SITE_HEALTH_KEY, this.healthStats); } catch (e) {}
  }
  recordRequest(siteTitle, responseTime, success, dataSize = 0) {
    if (!siteTitle) return;
    if (!this.healthStats[siteTitle]) {
      this.healthStats[siteTitle] = {
        totalRequests: 0, successRequests: 0, totalResponseTime: 0, totalDataSize: 0,
        recentHistory: [], healthScore: INITIAL_HEALTH_SCORE, lastUpdated: Date.now()
      };
    }
    const stats = this.healthStats[siteTitle];
    stats.totalRequests++;
    if (success) {
      stats.successRequests++;
      stats.totalResponseTime += responseTime;
      stats.totalDataSize += dataSize;
      stats.recentHistory.push({ timestamp: Date.now(), responseTime, success: true, dataSize });
    } else {
      stats.recentHistory.push({ timestamp: Date.now(), responseTime, success: false, dataSize: 0 });
    }
    if (stats.recentHistory.length > MAX_HEALTH_HISTORY) stats.recentHistory = stats.recentHistory.slice(-MAX_HEALTH_HISTORY);
    this.calculateHealthScore(siteTitle);
    stats.lastUpdated = Date.now();
    this.saveHealthStats();
  }
  calculateHealthScore(siteTitle) {
    const stats = this.healthStats[siteTitle];
    if (!stats || stats.totalRequests === 0) { if (stats) stats.healthScore = INITIAL_HEALTH_SCORE; return; }
    const successRate = stats.successRequests / stats.totalRequests;
    const avgResponseTime = stats.successRequests > 0 ? stats.totalResponseTime / stats.successRequests : 10000;
    let recentSuccessRate = 0, recentCount = 0;
    const oneHourAgo = Date.now() - 3600000;
    stats.recentHistory.forEach(record => {
      if (record.timestamp > oneHourAgo) { recentCount++; if (record.success) recentSuccessRate++; }
    });
    recentSuccessRate = recentCount > 0 ? recentSuccessRate / recentCount : successRate;
    const responseTimeScore = Math.max(0, Math.min(1, 1 - (avgResponseTime / 5000)));
    stats.healthScore = (recentSuccessRate * 0.6) + (successRate * 0.3) + (responseTimeScore * 0.1);
    stats.healthScore = Math.max(0, Math.min(1, stats.healthScore));
  }
  getHealthScore(siteTitle) {
    if (!this.healthStats[siteTitle]) return INITIAL_HEALTH_SCORE;
    const stats = this.healthStats[siteTitle];
    const hoursSinceUpdate = (Date.now() - stats.lastUpdated) / 3600000;
    if (hoursSinceUpdate > 24) return stats.healthScore * Math.max(0, 1 - (hoursSinceUpdate - 24) * 0.1);
    return stats.healthScore;
  }
  getSiteRankings() {
    const rankings = [];
    for (const [siteTitle, stats] of Object.entries(this.healthStats)) {
      rankings.push({
        siteTitle, healthScore: this.getHealthScore(siteTitle),
        successRate: stats.totalRequests > 0 ? stats.successRequests / stats.totalRequests : 0,
        avgResponseTime: stats.successRequests > 0 ? stats.totalResponseTime / stats.successRequests : 0,
        totalRequests: stats.totalRequests
      });
    }
    rankings.sort((a, b) => b.healthScore - a.healthScore);
    return rankings;
  }
}
const siteHealthManager = new SiteHealthManager();

/**
 * 解析用户输入的过滤关键词
 */
function parseExcludeKeywords(input) {
  if (!input || typeof input !== 'string') return [];
  const keywords = input.split(/[,\s\n\t]+/).filter(k => k.trim().length > 0);
  return [...new Set(keywords)];
}

/**
 * 电影精准匹配：针对续集电影和普通电影采用不同策略
 * 1. 续集电影：XXXX2:XXXX -> 只匹配:前的XXXX2部分
 * 2. 普通电影：XXXX:XXXX -> 先匹配基础名，再比对副名
 */
function moviePreciseMatch(searchClean, itemClean) {
  if (!searchClean || !itemClean) return false;
  
  // 1. 检查搜索名称是否为续集电影（XXXX2:XXXX格式）
  const searchMatch = searchClean.match(/^(.+?)(\d+)(:.+)?$/);
  
  if (searchMatch) {
    // 续集电影处理逻辑
    const searchBase = searchMatch[1];  // XXXX
    const searchNum = searchMatch[2];   // 2
    const searchSuffix = searchMatch[3] || '';  // :XXXX
    
    const searchFullBase = searchBase + searchNum;  // XXXX2
    
    // 检查资源名称是否匹配续集格式
    const itemMatch = itemClean.match(/^(.+?)(\d+)(:.+)?$/);
    
    if (itemMatch) {
      const itemBase = itemMatch[1];  // XXXX
      const itemNum = itemMatch[2];   // 2
      const itemSuffix = itemMatch[3] || '';  // :XXXX
      
      const itemFullBase = itemBase + itemNum;  // XXXX2
      
      // 续集电影匹配：基础名+数字必须完全一致
      if (searchBase === itemBase && searchNum === itemNum) {
        return true;
      }
      
      // 如果数字不同，说明是不同续集，不匹配
      if (searchBase === itemBase && searchNum !== itemNum) {
        return false;
      }
    } else {
      // 资源名称不是续集格式，但搜索是续集格式
      // 尝试匹配：资源名是否以搜索的基础名+数字开头
      if (itemClean.startsWith(searchFullBase)) {
        return true;
      }
    }
  }
  
  // 2. 普通电影处理逻辑（没有数字表示续集）
  // 检查搜索名称是否包含冒号分隔
  if (searchClean.includes(':')) {
    const [searchMain, searchSub] = searchClean.split(':');
    
    // 检查资源名称是否也包含冒号
    if (itemClean.includes(':')) {
      const [itemMain, itemSub] = itemClean.split(':');
      
      // 双重匹配：基础名相同，且副名相似
      if (searchMain === itemMain) {
        // 副名相似度检查
        const subSimilar = searchSub.includes(itemSub) || itemSub.includes(searchSub) || 
                          searchSub.length > 0 && itemSub.length > 0 && 
                          (searchSub[0] === itemSub[0] || 
                           Math.abs(searchSub.length - itemSub.length) <= 2);
        
        if (subSimilar) {
          return true;
        }
      }
    } else {
      // 资源名称没有冒号，只匹配基础名
      if (itemClean === searchMain || itemClean.startsWith(searchMain)) {
        return true;
      }
    }
  } else {
    // 搜索名称没有冒号，简单匹配
    if (searchClean === itemClean || 
        searchClean.startsWith(itemClean) || 
        itemClean.startsWith(searchClean)) {
      return true;
    }
  }
  
  // 3. 回退策略：相似度匹配
  if (searchClean.startsWith(itemClean) || itemClean.startsWith(searchClean)) {
    return true;
  }
  
  return false;
}

async function loadResource(params) {
  const { seriesName, type = 'tv', season, episode, VodData, excludeKeywords: userExcludeKeywords = "" } = params;
  if (!seriesName) return [];

  const excludeKeywords = parseExcludeKeywords(userExcludeKeywords);
  console.log('[loadResource] 过滤关键词:', excludeKeywords);

  const resourceSites = parseResourceSites(VodData);
  
  // --- 核心修改：片名解析和匹配策略 ---
  const fullCleanOriginal = cleanTitle(seriesName);  // 完整清洗后的片名
  let searchKeyword = '';  // 用于搜索的关键词
  let matchStrategy = 'direct';  // 匹配策略：direct, baseWithNumber, precise
  
  // 提取基础片名（特殊符号前的部分）
  const baseName = extractBaseName(seriesName);
  const cleanBaseName = cleanTitle(baseName);
  
  // 检查基础片名是否有数字后缀
  const numberMatch = cleanBaseName.match(/^(.+?)(\d+)$/);
  const hasNumberSuffix = numberMatch !== null;
  const baseWithoutNumber = hasNumberSuffix ? numberMatch[1] : cleanBaseName;
  const numberPart = hasNumberSuffix ? numberMatch[2] : '';
  
  // 检查原始片名是否有特殊符号（除结尾数字外）
  const hasSpecialChar = /[:：\-—\s]/.test(seriesName);
  
  // 确定搜索关键词和匹配策略
  if (!hasSpecialChar) {
    // 情况1：片名中没有特殊符号
    if (hasNumberSuffix) {
      // 基础片名有数字信息，无副标题
      searchKeyword = baseWithoutNumber + numberPart;  // 基础片名+数字
      matchStrategy = 'baseWithNumber';
    } else {
      // 基础片名无数字信息，无副标题
      searchKeyword = cleanBaseName;
      matchStrategy = 'direct';
    }
  } else {
    // 情况2：有特殊符号
    if (hasNumberSuffix) {
      // 基础片名后有数字信息，有副标题
      searchKeyword = baseWithoutNumber + numberPart;  // 基础片名+数字
      matchStrategy = 'precise';
    } else {
      // 基础片名后无数字信息，有副标题
      searchKeyword = cleanBaseName;
      matchStrategy = 'precise';
    }
  }
  
  // --- 目标季数：优先使用传入的 season，否则从剧名中提取 ---
  let targetSeason = season ? parseInt(season) : null;
  if (targetSeason === null) {
    const seasonInfo = extractSeasonInfo(seriesName);
    targetSeason = seasonInfo.seasonNumber;
  }
  console.log(`[loadResource] 原始片名: ${seriesName}, 搜索词: ${searchKeyword}, 清洗后完整名: ${fullCleanOriginal}, 匹配策略: ${matchStrategy}, 目标季数: ${targetSeason}, 类型: ${type}`);
  
  const targetEpisode = episode ? parseInt(episode) : null;
  
  // 缓存键
  const cacheKey = `vod_cache_${fullCleanOriginal}_s${targetSeason}_${type}`;
  let allResources = [];
  
  try {
    const cached = Widget.storage.get(cacheKey);
    if (cached && Array.isArray(cached)) allResources = cached;
  } catch (e) {}

  if (allResources.length === 0) {
    const fetchTasks = resourceSites.map(async (site) => {
      const startTime = Date.now();
      try {
        const response = await Widget.http.get(site.value, {
          params: { ac: "detail", wd: searchKeyword },
          timeout: 8000
        });
        const endTime = Date.now();
        siteHealthManager.recordRequest(site.title, endTime - startTime, true, JSON.stringify(response.data).length);
        
        const list = response?.data?.list;
        if (!Array.isArray(list)) return [];

        return list.flatMap(item => {
          const cleanItemFull = cleanTitle(item.vod_name);
          const itemSeasonInfo = extractSeasonInfo(item.vod_name);
          const itemSeason = itemSeasonInfo.seasonNumber;
          
          // ========== 核心匹配逻辑 ==========
          let shouldMatch = false;
          
          if (type === 'tv') {
            // 电视剧：先使用电影的解析逻辑
            if (matchStrategy === 'direct') {
              // 直接匹配
              shouldMatch = cleanItemFull === fullCleanOriginal || 
                           cleanItemFull.startsWith(fullCleanOriginal) || 
                           fullCleanOriginal.startsWith(cleanItemFull);
            } else if (matchStrategy === 'baseWithNumber') {
              // 基础片名+数字匹配
              const itemNumberMatch = cleanItemFull.match(/^(.+?)(\d+)(?::|$)/);
              if (itemNumberMatch) {
                const itemBase = itemNumberMatch[1];
                const itemNumber = itemNumberMatch[2];
                shouldMatch = (baseWithoutNumber === itemBase) && (numberPart === itemNumber);
              } else {
                // 回退：检查是否以基础片名+数字开头
                shouldMatch = cleanItemFull.startsWith(baseWithoutNumber + numberPart);
              }
            } else if (matchStrategy === 'precise') {
              // 精确匹配：清洗特殊符号后的完整对比
              shouldMatch = moviePreciseMatch(fullCleanOriginal, cleanItemFull);
            }
            
            // 额外检查：电视剧需要季数一致
            if (shouldMatch && itemSeason !== targetSeason) {
              shouldMatch = false;
            }
          } else if (type === 'movie') {
            // 电影：根据匹配策略处理
            if (matchStrategy === 'direct') {
              // 直接匹配
              shouldMatch = cleanItemFull === fullCleanOriginal;
            } else if (matchStrategy === 'baseWithNumber') {
              // 基础片名+数字匹配
              const itemNumberMatch = cleanItemFull.match(/^(.+?)(\d+)(?::|$)/);
              if (itemNumberMatch) {
                const itemBase = itemNumberMatch[1];
                const itemNumber = itemNumberMatch[2];
                shouldMatch = (baseWithoutNumber === itemBase) && (numberPart === itemNumber);
              } else {
                // 回退：检查是否以基础片名+数字开头
                shouldMatch = cleanItemFull.startsWith(baseWithoutNumber + numberPart);
              }
            } else if (matchStrategy === 'precise') {
              // 精确匹配：使用清洗后的完整片名对比
              shouldMatch = moviePreciseMatch(fullCleanOriginal, cleanItemFull);
            }
          }
          // ========== 匹配逻辑结束 ==========
          
          if (shouldMatch) {
            // 电影续集过滤
            if (type === 'movie' && hasNumberSuffix) {
              const itemHasNumber = /\d+$/.test(cleanItemFull);
              if (itemHasNumber) {
                const itemNumber = cleanItemFull.match(/\d+$/)[0];
                if (numberPart !== itemNumber) {
                  return [];
                }
              }
            }
            // 提取播放信息
            return extractPlayInfoForCache(item, site.title, type, excludeKeywords);
          }
          
          return [];
        });
      } catch (error) {
        const endTime = Date.now();
        siteHealthManager.recordRequest(site.title, endTime - startTime, false, 0);
        return [];
      }
    });

    const results = await Promise.all(fetchTasks);
    const merged = results.flat();

    const urlSet = new Set();
    allResources = merged.filter(res => {
      if (urlSet.has(res.url)) return false;
      urlSet.add(res.url);
      return true;
    });
    
    if (type === 'tv') allResources = assignContinuousEpisodeNumbers(allResources);

    if (allResources.length > 0) {
      try { Widget.storage.set(cacheKey, allResources, 10800); } catch (e) {}
    }
  }

  if (type === 'tv' && targetEpisode !== null) {
    allResources = allResources.filter(res => res._ep !== undefined && res._ep !== null && res._ep === targetEpisode);
  }

  // 排序：正片在前，剧集编号，健康度
  allResources.sort((a, b) => {
    const aIsTheatrical = a._featureTag === '正片';
    const bIsTheatrical = b._featureTag === '正片';
    if (aIsTheatrical && !bIsTheatrical) return -1;
    if (!aIsTheatrical && bIsTheatrical) return 1;
    if (a._ep !== undefined && b._ep !== undefined && a._ep !== b._ep) return a._ep - b._ep;
    
    const aScore = a._healthScore || 0, bScore = b._healthScore || 0;
    if (Math.abs(aScore - bScore) > 0.001) return bScore - aScore;
    
    return (a.description || '').localeCompare(b.description || '');
  });
  
  allResources = sortByConnectionHealth(allResources);

  return allResources;
}
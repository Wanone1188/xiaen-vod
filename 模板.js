const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';

const DEFAULT_URLS = [
  'https://example.com',
];

const CATEGORY_URL_RE = /\/index\.php\/vod\/type\/id\/(\d+)\.html/i;

function trimTrailingSlash(value) {
  return String(value || '').replace(/\/$/, '');
}

function extractClasses($, selector, seen) {
  const classes = [];
  $(selector).each((_, a) => {
    const href = $(a).attr('href');
    if (!href) return;

    const match = href.match(CATEGORY_URL_RE);
    if (!match) return;

    const typeId = match[1];
    if (seen.has(typeId)) return;

    let name = $(a).find('.grid-item-name').text();
    if (!name) name = $(a).text();
    name = name.replace(/\s+/g, ' ').trim();
    if (!name) return;

    seen.add(typeId);
    classes.push({ type_id: typeId, type_name: name });
  });
  return classes;
}

function parsePagecount($, currentPage) {
  let pagecount = currentPage;
  $('#page a').each((_, a) => {
    const href = $(a).attr('href');
    const match = href && href.match(/\/page\/(\d+)\.html/i);
    if (!match) return;
    const num = parseInt(match[1], 10);
    if (!Number.isNaN(num)) pagecount = Math.max(pagecount, num);
  });
  return pagecount;
}

export function createSpider(ctx) {
  const req = ctx.http.req;
  const load = ctx.cheerio.load;
  const firstSuccessfulUrl = ctx.utils.firstSuccessfulUrl;
  const logger = ctx.logger;

  const getCache = async (server) => {
    const obj = await server.db.getObjectDefault('/template_source', {});
    return obj?.urls || server.config.template_source?.urls || DEFAULT_URLS;
  };

  let getUrlPromise;
  const getUrl = (server) => {
    if (!getUrlPromise) {
      const timeStart = Date.now();
      getUrlPromise = new Promise(async (resolve) => {
        const urls = await getCache(server);
        const url = await firstSuccessfulUrl(urls, { 'User-Agent': UA });
        logger.info('模板域名', url, `${Date.now() - timeStart}ms`);
        resolve(url);
      });
    }
    return getUrlPromise;
  };

  async function request(reqUrl) {
    const resp = await req.get(reqUrl, {
      headers: {
        'User-Agent': UA,
      },
    });
    return resp.data;
  }

  async function init() {
    return {};
  }

  async function home(inReq, _outResp) {
    let classes = [];
    try {
      const url = await getUrl(inReq.server);
      const html = await request(url);
      const $ = load(html);
      const seen = new Set();
      classes = extractClasses($, '.drop-content .grid-items a[href*="/index.php/vod/type/id/"]', seen);
      if (classes.length === 0) {
        classes = extractClasses($, '#index-nav .nav-menu-items a[href*="/index.php/vod/type/id/"]', seen);
      }
    } catch (e) {
      logger.error('template home categories fetch failed', e);
    }

    return {
      class: classes,
      filters: {},
    };
  }

  async function category(inReq, _outResp) {
    const url = await getUrl(inReq.server);
    const tid = inReq.body.id;
    const pg = inReq.body.page;
    let page = parseInt(pg, 10);
    if (!page || page < 1) page = 1;

    const reqUrl = `${trimTrailingSlash(url)}/index.php/vod/show/id/${tid}/page/${page}.html`;
    const html = await request(reqUrl);
    const $ = load(html);

    const videos = $('#main .module-item')
      .map((_, item) => {
        const href = $(item).find('.module-item-pic a').attr('href');
        const name = $(item).find('.module-item-pic img').attr('alt');
        const pic =
          $(item).find('.module-item-pic img').attr('data-src') ||
          $(item).find('.module-item-pic img').attr('src');
        const remark = $(item).find('.module-item-text').text().trim();
        return {
          vod_id: href,
          vod_name: name,
          vod_pic: pic,
          vod_remarks: remark,
        };
      })
      .get()
      .filter((v) => v.vod_id && v.vod_name);

    const pagecount = parsePagecount($, page);
    return {
      page,
      pagecount,
      limit: 72,
      total: 72 * pagecount,
      list: videos,
    };
  }

  async function detail(inReq, _outResp) {
    const url = await getUrl(inReq.server);
    const base = trimTrailingSlash(url);
    const ids = !Array.isArray(inReq.body.id) ? [inReq.body.id] : inReq.body.id;
    const videos = [];

    for (const id of ids) {
      try {
        const html = await request(`${base}${id}`);
        const $ = load(html);

        const vod = {
          vod_id: id,
          vod_name: $('.page-title').first().text().trim(),
          vod_pic:
            $('.mobile-play .lazyload').first().attr('data-src') ||
            $('.mobile-play img').first().attr('data-src') ||
            $('.mobile-play img').first().attr('src'),
        };

        $('.video-info-itemtitle').each((_, item) => {
          const key = $(item).text();
          const value = $(item)
            .next()
            .find('a')
            .map((__, el) => $(el).text().trim())
            .get()
            .filter(Boolean)
            .join(', ');

          if (key.includes('剧情')) {
            vod.vod_content = $(item).next().find('p').text().trim();
          } else if (key.includes('导演')) {
            vod.vod_director = value.trim();
          } else if (key.includes('主演')) {
            vod.vod_actor = value.trim();
          }
        });

        const shareUrls = $('div.module-row-info p')
          .map((_, p) => $(p).text().trim())
          .get()
          .filter(Boolean);

        if (shareUrls.length > 0) {
          vod.vod_play_from = '网盘链接';
          vod.vod_play_url = shareUrls.map((u, i) => `链接${i + 1}$${u}`).join('#');
        }

        videos.push(vod);
      } catch (e) {
        logger.error('template detail fetch failed', id, e);
      }
    }

    return {
      list: videos,
    };
  }

  async function play(inReq, _outResp) {
    const id = String(inReq.body.id || '').trim();
    if (!id) return { parse: 1, url: '' };
    if (/^https?:\/\//i.test(id)) {
      return { parse: 0, url: id };
    }
    return { parse: 1, url: id };
  }

  async function search(inReq, _outResp) {
    const url = await getUrl(inReq.server);
    const base = trimTrailingSlash(url);
    const pg = inReq.body.page;
    const wd = inReq.body.wd;
    let page = parseInt(pg, 10);
    if (!page || page < 1) page = 1;

    const wdEnc = encodeURIComponent(wd || '');
    const reqUrl = `${base}/index.php/vod/search/wd/${wdEnc}.html`;
    const html = await request(reqUrl);
    const $ = load(html);

    const videos = $('.module-search-item')
      .map((_, div) => {
        const serial = $(div).find('.video-serial');
        const img = $(div).find('.module-item-pic > img');
        return {
          vod_id: serial.attr('href'),
          vod_name: serial.attr('title'),
          vod_pic: img.attr('data-src') || img.attr('src'),
          vod_remarks: serial.text(),
        };
      })
      .get()
      .filter((v) => v.vod_id && v.vod_name);

    return {
      page,
      pagecount: videos.length < 10 ? page : page + 1,
      list: videos,
    };
  }

  return {
    meta: {
      key: 'muban',
      name: '模板',
      type: 3,
    },
    api: async (fastify) => {
      fastify.post('/init', init);
      fastify.post('/home', home);
      fastify.post('/category', category);
      fastify.post('/detail', detail);
      fastify.post('/play', play);
      fastify.post('/search', search);
    },
    check: getUrl,
  };
}

export default createSpider;

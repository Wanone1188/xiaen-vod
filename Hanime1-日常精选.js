var WidgetMetadata = {
    id: "hanime1_me_daily", 
    title: "Hanime1-日常精选",
    description: "高频模块：排行榜、新番预告",
    author: "网络/TaYhu", 
    site: "https://hanime1.me",
    version: "1.0.3",
    requiredVersion: "0.0.2",
    detailCacheDuration: 300,
    modules: [
        {
            title: "排行榜",
            functionName: "loadHotRankings",
            cacheDuration: 300, 
            params: [
                {
                    name: "list_type",
                    title: "榜单类型",
                    type: "enumeration",
                    value: "watching",
                    enumOptions: [
                        { title: "他们在看", value: "watching" }, 
                        { title: "最新上传", value: "latest_upload" }, 
                        { title: "本日排行", value: "daily_rank" }, 
                        { title: "本周排行", value: "weekly_rank" }, 
                        { title: "本月排行", value: "monthly_rank" }, 
                        { title: "最新上市", value: "new_release" }
                    ]
                },
                {
                    name: "sort_by",
                    title: "翻页",
                    type: "enumeration",
                    value: "1",
                    enumOptions: Array.from({length: 294}, (_, i) => ({title: `第 ${i + 1} 页`, value: `${i + 1}`}))
                },
                { name: "page", title: "页码", type: "page", value: "1" }
            ]
        },
        {
            title: "新番预告",
            functionName: "loadPreviews",
            cacheDuration: 3600,
            params: []
        }
    ]
};

const BASE_URL = "https://hanime1.me";
const REQUEST_TIMEOUT = 10000;

function getCommonHeaders() {
    return {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": BASE_URL,
        "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7"
    };
}

async function httpGetWithTimeout(url) {
    return Widget.http.get(url, {
        headers: getCommonHeaders(),
        timeout: REQUEST_TIMEOUT
    });
}

function normalizeImageUrl(src) {
    if (!src) return "";
    if (src.startsWith("//")) return "https:" + src;
    if (src.startsWith("/")) return BASE_URL + src;
    if (!src.startsWith("http")) return BASE_URL + "/" + src;
    return src;
}

async function fetchAndParse(url) {
    try {
        const response = await httpGetWithTimeout(url);
        const $ = Widget.html.load(response.data);
        const items = [];

        $('a[href*="/watch?v="]').each((i, el) => {
            const $a = $(el);
            const href = $a.attr('href');
            if (!href) return;

            let link = href;
            if (!link.startsWith('http')) {
                link = BASE_URL + (link.startsWith('/') ? '' : '/') + link;
            }

            if (items.some(it => it.link === link)) return;

            let poster = "";
            const $img = $a.find('img').first();
            if ($img.length) {
                poster = $img.attr('data-src') || $img.attr('src') || "";
                if (poster.includes('background.jpg')) poster = "";
            }
            if (!poster) {
                const $cardImg = $a.closest('.search-doujin-videos, .home-rows-videos-div, .video-card').find('img').first();
                if ($cardImg.length) {
                    poster = $cardImg.attr('data-src') || $cardImg.attr('src') || "";
                    if (poster.includes('background.jpg')) poster = "";
                }
            }
            poster = normalizeImageUrl(poster);

            let title = $a.find('.card-mobile-title, .home-rows-videos-title, [class*="title"]').first().text().trim();
            if (!title) {
                title = $img.attr('alt') || $a.attr('title') || "";
            }
            if (!title) {
                const $header = $a.closest('div').prevAll('h3, h4, h5').first();
                if ($header.length) title = $header.text().trim();
            }
            if (!title) return; 

            const duration = $a.find('.card-mobile-duration, .duration, [class*="time"]').first().text().trim();
            const author = $a.find('.card-mobile-user, .author, [class*="user"]').first().text().trim();

            items.push({
                id: link,
                type: "url",
                title: title,
                posterPath: poster,
                backdropPath: poster,
                mediaType: "movie",
                durationText: duration,
                description: author || "Hanime1",
                link: link
            });
        });

        return items;
    } catch (e) {
        return [];
    }
}

function getTargetPageFromDropdown(params) {
    if (params.sort_by && !isNaN(parseInt(params.sort_by))) {
        return parseInt(params.sort_by);
    }
    return 1;
}

async function loadHotRankings(params) {
    if (params.page && parseInt(params.page) > 1) return [];
    const page = getTargetPageFromDropdown(params);
    
    const typeMap = {
        "watching": "他們在看",
        "latest_upload": "最新上傳",
        "daily_rank": "本日排行",
        "weekly_rank": "本週排行",
        "monthly_rank": "本月排行",
        "new_release": "最新上市"
    };
    
    const sortVal = typeMap[params.list_type || "watching"];
    let url = `${BASE_URL}/search?sort=${encodeURIComponent(sortVal)}`;
    if (page > 1) url += `&page=${page}`;
    
    return fetchAndParse(url);
}

function parsePreviewsHtml(html, pageUrl) {
    const $ = Widget.html.load(html);
    const items = [];

    $('a[href*="/watch?v="]').each((i, el) => {
        const $a = $(el);
        const href = $a.attr('href');
        if (!href) return;

        let link = href;
        if (!link.startsWith('http')) {
            link = BASE_URL + (link.startsWith('/') ? '' : '/') + link;
        }

        if (items.some(it => it.link === link)) return;

        let poster = "";
        const $img = $a.find('img').first();
        if ($img.length) {
            poster = $img.attr('data-src') || $img.attr('src') || "";
            if (poster.includes('background.jpg')) poster = "";
        }
        if (!poster) {
            const $cardImg = $a.closest('.search-doujin-videos, .home-rows-videos-div, .video-card').find('img').first();
            if ($cardImg.length) {
                poster = $cardImg.attr('data-src') || $cardImg.attr('src') || "";
                if (poster.includes('background.jpg')) poster = "";
            }
        }
        poster = normalizeImageUrl(poster);

        let title = $a.find('.card-mobile-title, .home-rows-videos-title, [class*="title"]').first().text().trim();
        if (!title) {
            title = $img.attr('alt') || $a.attr('title') || "";
        }
        if (!title) {
            const $header = $a.closest('div').prevAll('h3, h4, h5').first();
            if ($header.length) title = $header.text().trim();
        }
        if (!title) return; 

        const duration = $a.find('.card-mobile-duration, .duration, [class*="time"]').first().text().trim();
        const author = $a.find('.card-mobile-user, .author, [class*="user"]').first().text().trim();

        items.push({
            id: link,
            type: "url",
            title: title,
            posterPath: poster,
            backdropPath: poster,
            mediaType: "movie",
            durationText: duration,
            description: author || "新番预告",
            link: link
        });
    });

    if (items.length > 0) return items;

    $('.preview-image-modal-trigger, .hidden-sm.hidden-md.hidden-lg .preview-image-modal-trigger').each((i, el) => {
        const $img = $(el);
        let poster = $img.attr('src') || $img.attr('data-src');
        if (!poster) return;
        poster = normalizeImageUrl(poster);

        let title = $img.attr('alt') || "";
        if (!title) {
            const $caption = $img.closest('div').find('h5.caption, h4, h3');
            if ($caption.length) {
                title = $caption.text().trim().split('\n')[0];
            }
        }
        if (!title) title = "新番预告";
        if (title.length > 40) title = title.substring(0, 40) + "...";

        const link = pageUrl; 

        items.push({
            id: poster,
            type: "url",
            title: title,
            posterPath: poster,
            backdropPath: poster,
            mediaType: "movie",
            description: "静态预告 (无播放源)",
            link: link 
        });
    });

    return items;
}

async function loadPreviews(params) {
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    
    async function fetchPreviewsForDate(y, m) {
        let pm = m < 10 ? '0' + m : m;
        const u1 = `${BASE_URL}/previews/${y}${pm}`;
        const u2 = `${BASE_URL}/previews/${y}-${pm}`;
        let html = "";
        let finalUrl = u1;
        try {
            html = (await httpGetWithTimeout(u1)).data;
        } catch (e) {
            try {
                const r2 = await httpGetWithTimeout(u2);
                html = r2.data;
                finalUrl = u2;
            } catch (e2) {
                return [];
            }
        }
        try {
            return parsePreviewsHtml(html, finalUrl); 
        } catch (parseError) {
            return [];
        }
    }

    let items = await fetchPreviewsForDate(year, month);
    
    // 如果当月获取不到数据，自动回退到上一个月
    if (items.length === 0) {
        month = month - 1;
        if (month === 0) {
            month = 12;
            year = year - 1;
        }
        items = await fetchPreviewsForDate(year, month);
    }
    
    return items;
}

async function loadDetail(link) {
    try {
        const response = await httpGetWithTimeout(link);
        const $ = Widget.html.load(response.data);

        let videoUrl = "";
        const qualityIds = ['#video-sd', '#video-hd', '#video-720p', '#video-1080p'];
        for (const id of qualityIds) {
            const val = $(id).val();
            if (val) {
                videoUrl = val;
                break;
            }
        }

        if (!videoUrl) {
            const match = response.data.match(/source\s*=\s*['"](https:\/\/[^'"]+)['"]/);
            if (match) videoUrl = match[1];
        }

        if (!videoUrl) {
            videoUrl = $('video source').attr('src');
        }

        if (!videoUrl) {
            throw new Error("video_url_not_found");
        }

        videoUrl = videoUrl.replace(/&amp;/g, '&');

        const title = $('meta[property="og:title"]').attr('content') || "标题未知";
        const desc = $('meta[property="og:description"]').attr('content') || "";
        const cover = $('meta[property="og:image"]').attr('content') || "";

        const childItems = [];
        $('.home-rows-videos-div a[href*="/watch?v="]').each((i, el) => {
            if (i >= 10) return false;

            const $a = $(el);
            let recLink = $a.attr('href');
            if (!recLink) return;
            if (!recLink.startsWith('http')) {
                recLink = BASE_URL + (recLink.startsWith('/') ? '' : '/') + recLink;
            }

            const $img = $a.find('img').first();
            let recPoster = $img.attr('data-src') || $img.attr('src') || "";
            recPoster = normalizeImageUrl(recPoster);

            let recTitle = $a.find('.home-rows-videos-title, [class*="title"]').first().text().trim();
            if (!recTitle) recTitle = $img.attr('alt') || "相关视频";

            childItems.push({
                id: recLink,
                type: "url",
                title: recTitle,
                posterPath: recPoster,
                backdropPath: recPoster,
                mediaType: "movie",
                link: recLink
            });
        });

        return {
            id: link,
            type: "detail",
            videoUrl: videoUrl,
            title: title,
            description: desc,
            posterPath: normalizeImageUrl(cover),
            backdropPath: normalizeImageUrl(cover),
            mediaType: "movie",
            link: link,
            childItems: childItems,
            headers: getCommonHeaders()
        };

    } catch (error) {
        let errorMsg = "无法加载视频，请重试。";
        if (error.message === "video_url_not_found") {
            errorMsg = "未找到视频地址，可能需登录或该视频已失效。";
        }
        return {
            id: link,
            type: "detail",
            videoUrl: link, 
            title: "加载失败",
            description: errorMsg,
            posterPath: "",
            mediaType: "movie",
            link: link
        };
    }
}
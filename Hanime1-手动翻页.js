var WidgetMetadata = {
    id: "hanime1_me_channels", 
    title: "Hanime1-手动翻页",
    description: "独立分类，大跨度翻页专用",
    author: "网络/TaYhu", 
    site: "https://hanime1.me",
    version: "1.0.0",
    requiredVersion: "0.0.2",
    detailCacheDuration: 300,
    modules: [
        {
            title: "里番",
            description: "独立分类：精准71页",
            requiresWebView: false,
            functionName: "loadRifan", 
            cacheDuration: 600, 
            params: [
                {
                    name: "sort_by", 
                    title: "翻页",
                    type: "enumeration",
                    description: "手动下拉翻页 (共71页)",
                    value: "1",
                    enumOptions: [
                        {title:"第 1 页",value:"1"},{title:"第 2 页",value:"2"},{title:"第 3 页",value:"3"},{title:"第 4 页",value:"4"},{title:"第 5 页",value:"5"},{title:"第 6 页",value:"6"},{title:"第 7 页",value:"7"},{title:"第 8 页",value:"8"},{title:"第 9 页",value:"9"},{title:"第 10 页",value:"10"},
                        {title:"第 11 页",value:"11"},{title:"第 12 页",value:"12"},{title:"第 13 页",value:"13"},{title:"第 14 页",value:"14"},{title:"第 15 页",value:"15"},{title:"第 16 页",value:"16"},{title:"第 17 页",value:"17"},{title:"第 18 页",value:"18"},{title:"第 19 页",value:"19"},{title:"第 20 页",value:"20"},
                        {title:"第 21 页",value:"21"},{title:"第 22 页",value:"22"},{title:"第 23 页",value:"23"},{title:"第 24 页",value:"24"},{title:"第 25 页",value:"25"},{title:"第 26 页",value:"26"},{title:"第 27 页",value:"27"},{title:"第 28 页",value:"28"},{title:"第 29 页",value:"29"},{title:"第 30 页",value:"30"},
                        {title:"第 31 页",value:"31"},{title:"第 32 页",value:"32"},{title:"第 33 页",value:"33"},{title:"第 34 页",value:"34"},{title:"第 35 页",value:"35"},{title:"第 36 页",value:"36"},{title:"第 37 页",value:"37"},{title:"第 38 页",value:"38"},{title:"第 39 页",value:"39"},{title:"第 40 页",value:"40"},
                        {title:"第 41 页",value:"41"},{title:"第 42 页",value:"42"},{title:"第 43 页",value:"43"},{title:"第 44 页",value:"44"},{title:"第 45 页",value:"45"},{title:"第 46 页",value:"46"},{title:"第 47 页",value:"47"},{title:"第 48 页",value:"48"},{title:"第 49 页",value:"49"},{title:"第 50 页",value:"50"},
                        {title:"第 51 页",value:"51"},{title:"第 52 页",value:"52"},{title:"第 53 页",value:"53"},{title:"第 54 页",value:"54"},{title:"第 55 页",value:"55"},{title:"第 56 页",value:"56"},{title:"第 57 页",value:"57"},{title:"第 58 页",value:"58"},{title:"第 59 页",value:"59"},{title:"第 60 页",value:"60"},
                        {title:"第 61 页",value:"61"},{title:"第 62 页",value:"62"},{title:"第 63 页",value:"63"},{title:"第 64 页",value:"64"},{title:"第 65 页",value:"65"},{title:"第 66 页",value:"66"},{title:"第 67 页",value:"67"},{title:"第 68 页",value:"68"},{title:"第 69 页",value:"69"},{title:"第 70 页",value:"70"},
                        {title:"第 71 页",value:"71"}
                    ]
                },
                {
                    name: "video_sort", 
                    title: "排序方式",
                    type: "enumeration",
                    description: "排序规则",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "观看次数", value: "views" },
                        { title: "点赞比例", value: "likes" },
                        { title: "时长最长", value: "duration" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "隐藏原生页码", value: "1" }
            ]
        },
        {
            title: "3DCG",
            description: "独立分类：精准42页",
            requiresWebView: false,
            functionName: "load3DCG", 
            cacheDuration: 600, 
            params: [
                {
                    name: "sort_by", 
                    title: "翻页",
                    type: "enumeration",
                    description: "手动下拉翻页 (共42页)",
                    value: "1",
                    enumOptions: [
                        {title:"第 1 页",value:"1"},{title:"第 2 页",value:"2"},{title:"第 3 页",value:"3"},{title:"第 4 页",value:"4"},{title:"第 5 页",value:"5"},{title:"第 6 页",value:"6"},{title:"第 7 页",value:"7"},{title:"第 8 页",value:"8"},{title:"第 9 页",value:"9"},{title:"第 10 页",value:"10"},
                        {title:"第 11 页",value:"11"},{title:"第 12 页",value:"12"},{title:"第 13 页",value:"13"},{title:"第 14 页",value:"14"},{title:"第 15 页",value:"15"},{title:"第 16 页",value:"16"},{title:"第 17 页",value:"17"},{title:"第 18 页",value:"18"},{title:"第 19 页",value:"19"},{title:"第 20 页",value:"20"},
                        {title:"第 21 页",value:"21"},{title:"第 22 页",value:"22"},{title:"第 23 页",value:"23"},{title:"第 24 页",value:"24"},{title:"第 25 页",value:"25"},{title:"第 26 页",value:"26"},{title:"第 27 页",value:"27"},{title:"第 28 页",value:"28"},{title:"第 29 页",value:"29"},{title:"第 30 页",value:"30"},
                        {title:"第 31 页",value:"31"},{title:"第 32 页",value:"32"},{title:"第 33 页",value:"33"},{title:"第 34 页",value:"34"},{title:"第 35 页",value:"35"},{title:"第 36 页",value:"36"},{title:"第 37 页",value:"37"},{title:"第 38 页",value:"38"},{title:"第 39 页",value:"39"},{title:"第 40 页",value:"40"},
                        {title:"第 41 页",value:"41"},{title:"第 42 页",value:"42"}
                    ]
                },
                {
                    name: "video_sort", 
                    title: "排序方式",
                    type: "enumeration",
                    description: "排序规则",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "观看次数", value: "views" },
                        { title: "点赞比例", value: "likes" },
                        { title: "时长最长", value: "duration" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "隐藏原生页码", value: "1" }
            ]
        },
        {
            title: "泡面番",
            description: "独立分类：精准2页",
            requiresWebView: false,
            functionName: "loadPaomian", 
            cacheDuration: 600, 
            params: [
                {
                    name: "sort_by", 
                    title: "翻页",
                    type: "enumeration",
                    description: "手动下拉翻页 (共2页)",
                    value: "1",
                    enumOptions: [
                        {title:"第 1 页",value:"1"},{title:"第 2 页",value:"2"}
                    ]
                },
                {
                    name: "video_sort", 
                    title: "排序方式",
                    type: "enumeration",
                    description: "排序规则",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "观看次数", value: "views" },
                        { title: "点赞比例", value: "likes" },
                        { title: "时长最长", value: "duration" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "隐藏原生页码", value: "1" }
            ]
        },
        {
            title: "Motion Anime",
            description: "独立分类：精准16页",
            requiresWebView: false,
            functionName: "loadMotion", 
            cacheDuration: 600, 
            params: [
                {
                    name: "sort_by", 
                    title: "翻页",
                    type: "enumeration",
                    description: "手动下拉翻页 (共16页)",
                    value: "1",
                    enumOptions: [
                        {title:"第 1 页",value:"1"},{title:"第 2 页",value:"2"},{title:"第 3 页",value:"3"},{title:"第 4 页",value:"4"},{title:"第 5 页",value:"5"},{title:"第 6 页",value:"6"},{title:"第 7 页",value:"7"},{title:"第 8 页",value:"8"},{title:"第 9 页",value:"9"},{title:"第 10 页",value:"10"},
                        {title:"第 11 页",value:"11"},{title:"第 12 页",value:"12"},{title:"第 13 页",value:"13"},{title:"第 14 页",value:"14"},{title:"第 15 页",value:"15"},{title:"第 16 页",value:"16"}
                    ]
                },
                {
                    name: "video_sort", 
                    title: "排序方式",
                    type: "enumeration",
                    description: "排序规则",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "观看次数", value: "views" },
                        { title: "点赞比例", value: "likes" },
                        { title: "时长最长", value: "duration" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "隐藏原生页码", value: "1" }
            ]
        },
        {
            title: "2D 动画",
            description: "独立分类：精准77页",
            requiresWebView: false,
            functionName: "load2D", 
            cacheDuration: 600, 
            params: [
                {
                    name: "sort_by", 
                    title: "翻页",
                    type: "enumeration",
                    description: "手动下拉翻页 (共77页)",
                    value: "1",
                    enumOptions: [
                        {title:"第 1 页",value:"1"},{title:"第 2 页",value:"2"},{title:"第 3 页",value:"3"},{title:"第 4 页",value:"4"},{title:"第 5 页",value:"5"},{title:"第 6 页",value:"6"},{title:"第 7 页",value:"7"},{title:"第 8 页",value:"8"},{title:"第 9 页",value:"9"},{title:"第 10 页",value:"10"},
                        {title:"第 11 页",value:"11"},{title:"第 12 页",value:"12"},{title:"第 13 页",value:"13"},{title:"第 14 页",value:"14"},{title:"第 15 页",value:"15"},{title:"第 16 页",value:"16"},{title:"第 17 页",value:"17"},{title:"第 18 页",value:"18"},{title:"第 19 页",value:"19"},{title:"第 20 页",value:"20"},
                        {title:"第 21 页",value:"21"},{title:"第 22 页",value:"22"},{title:"第 23 页",value:"23"},{title:"第 24 页",value:"24"},{title:"第 25 页",value:"25"},{title:"第 26 页",value:"26"},{title:"第 27 页",value:"27"},{title:"第 28 页",value:"28"},{title:"第 29 页",value:"29"},{title:"第 30 页",value:"30"},
                        {title:"第 31 页",value:"31"},{title:"第 32 页",value:"32"},{title:"第 33 页",value:"33"},{title:"第 34 页",value:"34"},{title:"第 35 页",value:"35"},{title:"第 36 页",value:"36"},{title:"第 37 页",value:"37"},{title:"第 38 页",value:"38"},{title:"第 39 页",value:"39"},{title:"第 40 页",value:"40"},
                        {title:"第 41 页",value:"41"},{title:"第 42 页",value:"42"},{title:"第 43 页",value:"43"},{title:"第 44 页",value:"44"},{title:"第 45 页",value:"45"},{title:"第 46 页",value:"46"},{title:"第 47 页",value:"47"},{title:"第 48 页",value:"48"},{title:"第 49 页",value:"49"},{title:"第 50 页",value:"50"},
                        {title:"第 51 页",value:"51"},{title:"第 52 页",value:"52"},{title:"第 53 页",value:"53"},{title:"第 54 页",value:"54"},{title:"第 55 页",value:"55"},{title:"第 56 页",value:"56"},{title:"第 57 页",value:"57"},{title:"第 58 页",value:"58"},{title:"第 59 页",value:"59"},{title:"第 60 页",value:"60"},
                        {title:"第 61 页",value:"61"},{title:"第 62 页",value:"62"},{title:"第 63 页",value:"63"},{title:"第 64 页",value:"64"},{title:"第 65 页",value:"65"},{title:"第 66 页",value:"66"},{title:"第 67 页",value:"67"},{title:"第 68 页",value:"68"},{title:"第 69 页",value:"69"},{title:"第 70 页",value:"70"},
                        {title:"第 71 页",value:"71"},{title:"第 72 页",value:"72"},{title:"第 73 页",value:"73"},{title:"第 74 页",value:"74"},{title:"第 75 页",value:"75"},{title:"第 76 页",value:"76"},{title:"第 77 页",value:"77"}
                    ]
                },
                {
                    name: "video_sort", 
                    title: "排序方式",
                    type: "enumeration",
                    description: "排序规则",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "观看次数", value: "views" },
                        { title: "点赞比例", value: "likes" },
                        { title: "时长最长", value: "duration" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "隐藏原生页码", value: "1" }
            ]
        },
        {
            title: "2.5D",
            description: "独立分类：精准91页",
            requiresWebView: false,
            functionName: "load2_5D", 
            cacheDuration: 600, 
            params: [
                {
                    name: "sort_by", 
                    title: "翻页",
                    type: "enumeration",
                    description: "手动下拉翻页 (共91页)",
                    value: "1",
                    enumOptions: [
                        {title:"第 1 页",value:"1"},{title:"第 2 页",value:"2"},{title:"第 3 页",value:"3"},{title:"第 4 页",value:"4"},{title:"第 5 页",value:"5"},{title:"第 6 页",value:"6"},{title:"第 7 页",value:"7"},{title:"第 8 页",value:"8"},{title:"第 9 页",value:"9"},{title:"第 10 页",value:"10"},
                        {title:"第 11 页",value:"11"},{title:"第 12 页",value:"12"},{title:"第 13 页",value:"13"},{title:"第 14 页",value:"14"},{title:"第 15 页",value:"15"},{title:"第 16 页",value:"16"},{title:"第 17 页",value:"17"},{title:"第 18 页",value:"18"},{title:"第 19 页",value:"19"},{title:"第 20 页",value:"20"},
                        {title:"第 21 页",value:"21"},{title:"第 22 页",value:"22"},{title:"第 23 页",value:"23"},{title:"第 24 页",value:"24"},{title:"第 25 页",value:"25"},{title:"第 26 页",value:"26"},{title:"第 27 页",value:"27"},{title:"第 28 页",value:"28"},{title:"第 29 页",value:"29"},{title:"第 30 页",value:"30"},
                        {title:"第 31 页",value:"31"},{title:"第 32 页",value:"32"},{title:"第 33 页",value:"33"},{title:"第 34 页",value:"34"},{title:"第 35 页",value:"35"},{title:"第 36 页",value:"36"},{title:"第 37 页",value:"37"},{title:"第 38 页",value:"38"},{title:"第 39 页",value:"39"},{title:"第 40 页",value:"40"},
                        {title:"第 41 页",value:"41"},{title:"第 42 页",value:"42"},{title:"第 43 页",value:"43"},{title:"第 44 页",value:"44"},{title:"第 45 页",value:"45"},{title:"第 46 页",value:"46"},{title:"第 47 页",value:"47"},{title:"第 48 页",value:"48"},{title:"第 49 页",value:"49"},{title:"第 50 页",value:"50"},
                        {title:"第 51 页",value:"51"},{title:"第 52 页",value:"52"},{title:"第 53 页",value:"53"},{title:"第 54 页",value:"54"},{title:"第 55 页",value:"55"},{title:"第 56 页",value:"56"},{title:"第 57 页",value:"57"},{title:"第 58 页",value:"58"},{title:"第 59 页",value:"59"},{title:"第 60 页",value:"60"},
                        {title:"第 61 页",value:"61"},{title:"第 62 页",value:"62"},{title:"第 63 页",value:"63"},{title:"第 64 页",value:"64"},{title:"第 65 页",value:"65"},{title:"第 66 页",value:"66"},{title:"第 67 页",value:"67"},{title:"第 68 页",value:"68"},{title:"第 69 页",value:"69"},{title:"第 70 页",value:"70"},
                        {title:"第 71 页",value:"71"},{title:"第 72 页",value:"72"},{title:"第 73 页",value:"73"},{title:"第 74 页",value:"74"},{title:"第 75 页",value:"75"},{title:"第 76 页",value:"76"},{title:"第 77 页",value:"77"},{title:"第 78 页",value:"78"},{title:"第 79 页",value:"79"},{title:"第 80 页",value:"80"},
                        {title:"第 81 页",value:"81"},{title:"第 82 页",value:"82"},{title:"第 83 页",value:"83"},{title:"第 84 页",value:"84"},{title:"第 85 页",value:"85"},{title:"第 86 页",value:"86"},{title:"第 87 页",value:"87"},{title:"第 88 页",value:"88"},{title:"第 89 页",value:"89"},{title:"第 90 页",value:"90"},
                        {title:"第 91 页",value:"91"}
                    ]
                },
                {
                    name: "video_sort", 
                    title: "排序方式",
                    type: "enumeration",
                    description: "排序规则",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "观看次数", value: "views" },
                        { title: "点赞比例", value: "likes" },
                        { title: "时长最长", value: "duration" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "隐藏原生页码", value: "1" }
            ]
        },
        {
            title: "AI 生成",
            description: "独立分类：精准2页",
            requiresWebView: false,
            functionName: "loadAI", 
            cacheDuration: 600, 
            params: [
                {
                    name: "sort_by", 
                    title: "翻页",
                    type: "enumeration",
                    description: "手动下拉翻页 (共2页)",
                    value: "1",
                    enumOptions: [
                        {title:"第 1 页",value:"1"},{title:"第 2 页",value:"2"}
                    ]
                },
                {
                    name: "video_sort", 
                    title: "排序方式",
                    type: "enumeration",
                    description: "排序规则",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "观看次数", value: "views" },
                        { title: "点赞比例", value: "likes" },
                        { title: "时长最长", value: "duration" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "隐藏原生页码", value: "1" }
            ]
        },
        {
            title: "MMD",
            description: "独立分类：精准6页",
            requiresWebView: false,
            functionName: "loadMMD", 
            cacheDuration: 600, 
            params: [
                {
                    name: "sort_by", 
                    title: "翻页",
                    type: "enumeration",
                    description: "手动下拉翻页 (共6页)",
                    value: "1",
                    enumOptions: [
                        {title:"第 1 页",value:"1"},{title:"第 2 页",value:"2"},{title:"第 3 页",value:"3"},{title:"第 4 页",value:"4"},{title:"第 5 页",value:"5"},{title:"第 6 页",value:"6"}
                    ]
                },
                {
                    name: "video_sort", 
                    title: "排序方式",
                    type: "enumeration",
                    description: "排序规则",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "观看次数", value: "views" },
                        { title: "点赞比例", value: "likes" },
                        { title: "时长最长", value: "duration" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "隐藏原生页码", value: "1" }
            ]
        },
        {
            title: "Cosplay",
            description: "独立分类：精准4页",
            requiresWebView: false,
            functionName: "loadCosplay", 
            cacheDuration: 600, 
            params: [
                {
                    name: "sort_by", 
                    title: "翻页",
                    type: "enumeration",
                    description: "手动下拉翻页 (共4页)",
                    value: "1",
                    enumOptions: [
                        {title:"第 1 页",value:"1"},{title:"第 2 页",value:"2"},{title:"第 3 页",value:"3"},{title:"第 4 页",value:"4"}
                    ]
                },
                {
                    name: "video_sort", 
                    title: "排序方式",
                    type: "enumeration",
                    description: "排序规则",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "观看次数", value: "views" },
                        { title: "点赞比例", value: "likes" },
                        { title: "时长最长", value: "duration" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "隐藏原生页码", value: "1" }
            ]
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
                description: author || "新番预告",
                link: link
            });
        });

        return items;
    } catch (e) {
        return [];
    }
}

function mapSortToApi(sortValue) {
    const map = {
        "new_release": "最新上市",
        "latest_upload": "最新上傳",
        "daily_rank": "本日排行",
        "weekly_rank": "本週排行",
        "monthly_rank": "本月排行",
        "views": "觀看次數",
        "likes": "點讚比例",
        "duration": "時長最長",
        "watching": "他們在看"
    };
    return map[sortValue] || "";
}

function mapGenreToApi(genreValue) {
    const map = {
        "rifan": "裏番",           
        "paomian": "泡麵番",         
        "motion": "Motion Anime",
        "3dcg": "3DCG",
        "2d": "2D動畫",             
        "2_5d": "2.5D",         
        "ai": "AI生成",
        "mmd": "MMD",
        "cosplay": "Cosplay"
    };
    return map[genreValue] || "";
}

function mapTimeToApi(val) {
    const map = {
        "24h": "過去 24 小時",
        "2d": "過去 2 天",
        "1w": "過去 1 週",
        "1m": "過去 1 個月",
        "3m": "過去 3 個月",
        "1y": "過去 1 年"
    };
    return map[val] || "";
}

function mapDurationToApi(val) {
    const map = {
        "1m_plus": "1 分鐘 +",
        "5m_plus": "5 分鐘 +",
        "10m_plus": "10 分鐘 +",
        "20m_plus": "20 分鐘 +",
        "30m_plus": "30 分鐘 +",
        "60m_plus": "60 分鐘 +",
        "0_10m": "0 - 10 分鐘",
        "0_20m": "0 - 20 分鐘"
    };
    return map[val] || "";
}

const S2T_MAP = {
    "无码": "無碼", "AI解码": "AI解碼", "中文字幕": "中文字幕", "中文配音": "中文配音", "同人作品": "同人作品", "断面图": "斷面圖", 
    "近亲": "近親", "女儿": "女兒", "师生": "师生", "情侣": "情侶", "青梅竹马": "青梅竹馬", 
    "处女": "處女", "御姐": "御姐", "熟女": "熟女", "女教师": "女教師", "男教师": "男教师", "女医生": "女醫生", "女病人": "女病人", "护士": "護士", "女警": "女警", "大小姐": "大小姐", "女仆": "女僕", "魔女": "魔女", "修女": "修女", "风俗娘": "風俗娘", "女忍者": "女忍者", "女战士": "女戰士", "女骑士": "女騎士", "魔法少女": "魔法少女", "异种族": "異種族", "妖精": "妖精", "魔物娘": "魔物娘", "魅魔": "魅魔", "吸血鬼": "吸血鬼", "女鬼": "女鬼", "兽娘": "獸娘", "乳牛": "乳牛", "机械娘": "機械娘", "痴女": "痴女", "雌小鬼": "雌小鬼", "不良少女": "不良少女", "傲娇": "傲嬌", "病娇": "病嬌", "无表情": "無表情", "伪娘": "偽娘", "扶他": "扶他",
    "短发": "短髮", "马尾": "馬尾", "双马尾": "雙馬尾", "丸子头": "丸子頭", "乳环": "乳環", "舌环": "舌环", "贫乳": "貧乳", "黑皮肤": "黑皮膚", "晒痕": "曬痕", "眼镜娘": "眼鏡娘", "兽耳": "獸耳", "尖耳朵": "尖耳朵", "异色瞳": "異色瞳", "美人痣": "美人痣", "肌肉女": "肌肉女", "阴毛": "陰毛", "腋毛": "腋毛", "大屌": "大屌", "着衣": "著衣", "体操服": "體操服", "兔女郎": "兔女郎", "围裙": "圍裙", "啦啦队": "啦啦隊", "丝袜": "絲襪", "吊袜带": "吊襪帶", "热裤": "熱裤", "迷你裙": "迷你裙", "性感内衣": "性感內衣", "紧身衣": "緊身衣", "丁字裤": "丁字褲", "高跟鞋": "高跟鞋", "睡衣": "睡衣", "婚纱": "婚紗", "旗袍": "旗袍", "古装": "古装", "哥德": "哥德", "口罩": "口罩", "刺青": "刺青", "淫纹": "淫紋", "身体写字": "身體寫字",
    "校园": "校園", "图书馆": "圖書館", "游泳池": "游泳池", "爱情宾馆": "愛情賓館", "医院": "醫院", "办公室": "辦公室", "窗边": "窗邊", "公共厕所": "公共厕所", "公众场合": "公眾场合", "户外野战": "戶外野戰", "电车": "電車", "车震": "車震", "游艇": "遊艇", "露营帐篷": "露營帳篷", "电影院": "電影院", "健身房": "健身房", "沙滩": "沙灘", "夜店": "夜店", "监狱": "監獄", 
    "纯爱": "純愛", "恋爱喜剧": "戀愛喜劇", "后宫": "後宮", "十指紧扣": "十指緊扣", "开大车": "開大車", "精神控制": "精神控制", "药物": "藥物", "痴汉": "痴漢", "阿嘿颜": "阿嘿顏", "精神崩溃": "精神崩潰", "猎奇": "獵奇", "捆绑": "綑綁", "项圈": "項圈", "调教": "調教", "异物插入": "异物插入", "寻欢洞": "尋歡洞", "肉便器": "肉便器", "性奴隶": "性奴隸", "胃凸": "胃凸", "强制": "強制", "轮奸": "輪姦", "凌辱": "凌辱", "性暴力": "性暴力", "逆强制": "逆強制", "女王样": "女王樣", "榨精": "榨精", "母女丼": "母女丼", "姐妹丼": "姐妹丼", "出轨": "出軌", "醉酒": "醉酒", "睡眠奸": "睡眠姦", "机械奸": "機械姦", "虫奸": "蟲姦", "性转换": "性轉換", "时间停止": "时间停止", "异世界": "異世界", "怪兽": "怪獸", "哥布林": "哥布林", "世界末日": "世界末日",
    "手交": "手交", "指交": "指交", "乳交": "乳交", "乳头交": "乳頭交", "肛交": "肛交", "双洞齐下": "雙洞齊下", "脚交": "腳交", "素股": "素股", "拳交": "拳交", "群交": "群交", "口交": "口交", "跪舔": "跪舔", "深喉咙": "深喉嚨", "吞精": "吞精", "舔蛋蛋": "舔蛋蛋", "舔穴": "舔穴", "自慰": "自慰", "腋交": "腋交", "舔腋下": "舔腋下", "发交": "髮交", "舔耳朵": "舔耳朵", "舔脚": "舔腳", "内射": "內射", "颜射": "顏射", "怀孕": "懷孕", "喷奶": "噴奶", "骑乘位": "騎乘位", "背后位": "背後位", "颜面骑乘": "顏面騎乘", "火车便当": "火車便當", "一字马": "一字馬", "性玩具": "性玩具", "飞机杯": "飛機杯", "跳蛋": "跳蛋", "毒龙钻": "毒龍鑽", "触手": "觸手", "兽交": "獸交", "颈手枷": "頸手枷", "扯头发": "扯頭髮", "掐脖子": "掐脖子", "打屁股": "打屁股", "肉棒打脸": "肉棒打臉", "阴道外翻": "阴道外翻", "男乳首责": "男乳首責", "接吻": "接吻", "舌吻": "舌吻",
    "动态": "動態", "动画": "動畫", "里番": "裏番", "泡面番": "泡麵番"
};

function convertToTraditional(text) {
    if (!text) return "";
    let result = text;
    for (const [simp, trad] of Object.entries(S2T_MAP)) {
        result = result.split(simp).join(trad);
    }
    return result;
}

function getTargetPageFromDropdown(params) {
    if (params.sort_by && !isNaN(parseInt(params.sort_by))) {
        return parseInt(params.sort_by);
    }
    return 1;
}

async function loadSpecificGenre(params, genreName) {
    if (params.page && parseInt(params.page) > 1) return [];
    const page = getTargetPageFromDropdown(params);
    const sort = mapSortToApi(params.video_sort || "all");

    let url = `${BASE_URL}/search`;
    const queryParts = [];
    
    if (genreName) queryParts.push(`genre=${encodeURIComponent(genreName)}`);
    if (sort) queryParts.push(`sort=${encodeURIComponent(sort)}`);
    if (page > 1) queryParts.push(`page=${page}`);

    if (queryParts.length > 0) {
        url += '?' + queryParts.join('&');
    }
    
    return fetchAndParse(url);
}

async function loadRifan(params) { return loadSpecificGenre(params, "裏番"); }
async function load3DCG(params) { return loadSpecificGenre(params, "3DCG"); }
async function loadPaomian(params) { return loadSpecificGenre(params, "泡麵番"); }
async function loadMotion(params) { return loadSpecificGenre(params, "Motion Anime"); }
async function load2D(params) { return loadSpecificGenre(params, "2D動畫"); }
async function load2_5D(params) { return loadSpecificGenre(params, "2.5D"); }
async function loadAI(params) { return loadSpecificGenre(params, "AI生成"); }
async function loadMMD(params) { return loadSpecificGenre(params, "MMD"); }
async function loadCosplay(params) { return loadSpecificGenre(params, "Cosplay"); }

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

// Api inclusion

var GJAPI={};
GJAPI.iGameID    = 0;
GJAPI.sGameKey   = "";
GJAPI.bAutoLogin = true;

0!==GJAPI.iGameID&&""!==GJAPI.sGameKey||alert("Game ID or Game Key missing!");GJAPI.sAPI="https://gamejolt.com/api/game/v1";GJAPI.sLogName="[Game Jolt API]";GJAPI.iLogStack=20;GJAPI.asQueryParam=function(){for(var b={},a=window.location.search.substring(1).split("&"),c=0;c<a.length;++c){var d=a[c].split("=");"undefined"===typeof b[d[0]]?b[d[0]]=d[1]:"string"===typeof b[d[0]]?b[d[0]]=[b[d[0]],d[1]]:b[d[0]].push(d[1])}return b}();
GJAPI.bOnGJ=window.location.hostname.match(/gamejolt/)?!0:!1;GJAPI.LogTrace=function(b){GJAPI.iLogStack&&(--GJAPI.iLogStack||(b="(\u256f\u00b0\u25a1\u00b0\uff09\u256f\ufe35 \u253b\u2501\u253b"),console.warn(GJAPI.sLogName+" "+b),console.trace())};GJAPI.SEND_FOR_USER=!0;GJAPI.SEND_GENERAL=!1;GJAPI.SendRequest=function(b,a,c){GJAPI.SendRequestEx(b,a,"json","",c)};
GJAPI.SendRequestEx=function(b,a,c,d,e){b=GJAPI.sAPI+encodeURI(b)+(-1===b.indexOf("/?")?"?":"&")+"game_id="+GJAPI.iGameID+"&format="+c;GJAPI.bLoggedIn&&a===GJAPI.SEND_FOR_USER&&(b+="&username="+GJAPI.sUserName+"&user_token="+GJAPI.sUserToken);b+="&signature="+hex_md5(b+GJAPI.sGameKey);__CreateAjax(b,d,function(f){console.info(GJAPI.sLogName+" <"+b+"> "+f);if(""!==f&&"function"===typeof e)switch(c){case "json":e(eval("("+f+")").response);break;case "dump":var g=f.indexOf("\n"),h=f.substr(0,g-1);f=
f.substr(g+1);e({success:"SUCCESS"===h,data:f});break;default:e(f)}})};GJAPI.bLoggedIn=GJAPI.bAutoLogin&&GJAPI.asQueryParam.gjapi_username&&GJAPI.asQueryParam.gjapi_token?!0:!1;GJAPI.sUserName=GJAPI.bLoggedIn?GJAPI.asQueryParam.gjapi_username:"";GJAPI.sUserToken=GJAPI.bLoggedIn?GJAPI.asQueryParam.gjapi_token:"";console.info(GJAPI.asQueryParam);console.info(GJAPI.sLogName+(GJAPI.bOnGJ?" E":" Not e")+"mbedded on Game Jolt <"+window.location.origin+window.location.pathname+">");
console.info(GJAPI.sLogName+(GJAPI.bLoggedIn?" U":" No u")+"ser recognized <"+GJAPI.sUserName+">");window.location.hostname||console.warn(GJAPI.sLogName+" XMLHttpRequest may not work properly on a local environment");GJAPI.bSessionActive=!0;
GJAPI.SessionOpen=function(){GJAPI.bLoggedIn?GJAPI.iSessionHandle||GJAPI.SendRequest("/sessions/open/",GJAPI.SEND_FOR_USER,function(b){b.success&&(GJAPI.iSessionHandle=window.setInterval(GJAPI.SessionPing,3E4),window.addEventListener("beforeunload",GJAPI.SessionClose,!1))}):GJAPI.LogTrace("SessionOpen() failed: no user logged in")};GJAPI.SessionPing=function(){GJAPI.bLoggedIn?GJAPI.SendRequest("/sessions/ping/?status="+(GJAPI.bSessionActive?"active":"idle"),GJAPI.SEND_FOR_USER):GJAPI.LogTrace("SessionPing() failed: no user logged in")};
GJAPI.SessionClose=function(){GJAPI.bLoggedIn?(GJAPI.iSessionHandle&&(window.clearInterval(GJAPI.iSessionHandle),window.removeEventListener("beforeunload",GJAPI.SessionClose),GJAPI.iSessionHandle=0),GJAPI.SendRequest("/sessions/close/",GJAPI.SEND_FOR_USER)):GJAPI.LogTrace("SessionClose() failed: no user logged in")};GJAPI.bLoggedIn&&GJAPI.SessionOpen();
GJAPI.UserLoginManual=function(b,a,c){GJAPI.bLoggedIn?GJAPI.LogTrace("UserLoginManual("+b+", "+a+") failed: user "+GJAPI.sUserName+" already logged in"):GJAPI.SendRequest("/users/auth/?username="+b+"&user_token="+a,GJAPI.SEND_GENERAL,function(d){d.success&&(GJAPI.bLoggedIn=!0,GJAPI.sUserName=b,GJAPI.sUserToken=a,GJAPI.SessionOpen());"function"===typeof c&&c(d)},!1)};
GJAPI.UserLogout=function(){GJAPI.bLoggedIn?(GJAPI.SessionClose(),GJAPI.bLoggedIn=!1,GJAPI.sUserName="",GJAPI.sUserToken="",GJAPI.abTrophyCache={}):GJAPI.LogTrace("UserLogout() failed: no user logged in")};GJAPI.UserFetchID=function(b,a){GJAPI.SendRequest("/users/?user_id="+b,GJAPI.SEND_GENERAL,a)};GJAPI.UserFetchName=function(b,a){GJAPI.SendRequest("/users/?username="+b,GJAPI.SEND_GENERAL,a)};GJAPI.UserFetchCurrent=function(b){GJAPI.bLoggedIn?GJAPI.UserFetchName(GJAPI.sUserName,b):GJAPI.LogTrace("UserFetchCurrent() failed: no user logged in")};
GJAPI.abTrophyCache={};GJAPI.TROPHY_ONLY_ACHIEVED=1;GJAPI.TROPHY_ONLY_NOTACHIEVED=-1;GJAPI.TROPHY_ALL=0;GJAPI.TrophyAchieve=function(b,a){GJAPI.bLoggedIn?GJAPI.abTrophyCache[b]||GJAPI.SendRequest("/trophies/add-achieved/?trophy_id="+b,GJAPI.SEND_FOR_USER,function(c){c.success&&(GJAPI.abTrophyCache[b]=!0);"function"===typeof a&&a(c)}):GJAPI.LogTrace("TrophyAchieve("+b+") failed: no user logged in")};
GJAPI.TrophyFetch=function(b,a){GJAPI.bLoggedIn?GJAPI.SendRequest("/trophies/"+(b===GJAPI.TROPHY_ALL?"":"?achieved="+(b>=GJAPI.TROPHY_ONLY_ACHIEVED?"true":"false")),GJAPI.SEND_FOR_USER,a):GJAPI.LogTrace("TrophyFetch("+b+") failed: no user logged in")};GJAPI.TrophyFetchSingle=function(b,a){GJAPI.bLoggedIn?GJAPI.SendRequest("/trophies/?trophy_id="+b,GJAPI.SEND_FOR_USER,a):GJAPI.LogTrace("TrophyFetchSingle("+b+") failed: no user logged in")};GJAPI.SCORE_ONLY_USER=!0;GJAPI.SCORE_ALL=!1;
GJAPI.ScoreAdd=function(b,a,c,d,e){GJAPI.bLoggedIn?GJAPI.ScoreAddGuest(b,a,c,"",d,e):GJAPI.LogTrace("ScoreAdd("+b+", "+a+", "+c+") failed: no user logged in")};GJAPI.ScoreAddGuest=function(b,a,c,d,e,f){var g=d&&d.length?!0:!1;GJAPI.SendRequest("/scores/add/?sort="+a+"&score="+c+(g?"&guest="+d:"")+(b?"&table_id="+b:"")+(e?"&extra_data="+e:""),g?GJAPI.SEND_GENERAL:GJAPI.SEND_FOR_USER,f)};
GJAPI.ScoreFetch=function(b,a,c,d){!GJAPI.bLoggedIn&&a?GJAPI.LogTrace("ScoreFetch("+b+", "+a+", "+c+") failed: no user logged in"):GJAPI.SendRequest("/scores/?limit="+c+(b?"&table_id="+b:""),a!==GJAPI.SCORE_ONLY_USER?GJAPI.SEND_GENERAL:GJAPI.SEND_FOR_USER,d)};GJAPI.DATA_STORE_USER=0;GJAPI.DATA_STORE_GLOBAL=1;GJAPI.DataStoreSet=function(b,a,c,d){GJAPI.SendRequestEx("/data-store/set/?key="+a,b===GJAPI.DATA_STORE_USER,"json","data="+c,d)};
GJAPI.DataStoreFetch=function(b,a,c){GJAPI.SendRequestEx("/data-store/?key="+a,b===GJAPI.DATA_STORE_USER,"dump","",c)};GJAPI.DataStoreUpdate=function(b,a,c,d,e){GJAPI.SendRequest("/data-store/update/?key="+a+"&operation="+c+"&value="+d,b===GJAPI.DATA_STORE_USER,e)};GJAPI.DataStoreRemove=function(b,a,c){GJAPI.SendRequest("/data-store/remove/?key="+a,b===GJAPI.DATA_STORE_USER,c)};GJAPI.DataStoreGetKeys=function(b,a){GJAPI.SendRequest("/data-store/get-keys/",b===GJAPI.DATA_STORE_USER,a)};
function __CreateAjax(b,a,c){"string"!==typeof a&&(a="");if(window.XMLHttpRequest){var d=new XMLHttpRequest;d.onreadystatechange=function(){4===d.readyState&&c(d.responseText)};""!==a?(d.open("POST",b),d.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),d.send(a)):(d.open("GET",b),d.send())}else console.error(GJAPI.sLogName+" XMLHttpRequest not supported")}var hexcase=0;function hex_md5(b){return rstr2hex(rstr_md5(str2rstr_utf8(b)))}
function hex_hmac_md5(b,a){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(b),str2rstr_utf8(a)))}function md5_vm_test(){return"900150983cd24fb0d6963f7d28e17f72"==hex_md5("abc").toLowerCase()}function rstr_md5(b){return binl2rstr(binl_md5(rstr2binl(b),8*b.length))}
function rstr_hmac_md5(b,a){var c=rstr2binl(b);16<c.length&&(c=binl_md5(c,8*b.length));var d=Array(16);b=Array(16);for(var e=0;16>e;e++)d[e]=c[e]^909522486,b[e]=c[e]^1549556828;a=binl_md5(d.concat(rstr2binl(a)),512+8*a.length);return binl2rstr(binl_md5(b.concat(a),640))}function rstr2hex(b){try{hexcase}catch(f){hexcase=0}for(var a=hexcase?"0123456789ABCDEF":"0123456789abcdef",c="",d,e=0;e<b.length;e++)d=b.charCodeAt(e),c+=a.charAt(d>>>4&15)+a.charAt(d&15);return c}
function str2rstr_utf8(b){for(var a="",c=-1,d,e;++c<b.length;)d=b.charCodeAt(c),e=c+1<b.length?b.charCodeAt(c+1):0,55296<=d&&56319>=d&&56320<=e&&57343>=e&&(d=65536+((d&1023)<<10)+(e&1023),c++),127>=d?a+=String.fromCharCode(d):2047>=d?a+=String.fromCharCode(192|d>>>6&31,128|d&63):65535>=d?a+=String.fromCharCode(224|d>>>12&15,128|d>>>6&63,128|d&63):2097151>=d&&(a+=String.fromCharCode(240|d>>>18&7,128|d>>>12&63,128|d>>>6&63,128|d&63));return a}
function rstr2binl(b){for(var a=Array(b.length>>2),c=0;c<a.length;c++)a[c]=0;for(c=0;c<8*b.length;c+=8)a[c>>5]|=(b.charCodeAt(c/8)&255)<<c%32;return a}function binl2rstr(b){for(var a="",c=0;c<32*b.length;c+=8)a+=String.fromCharCode(b[c>>5]>>>c%32&255);return a}
function binl_md5(b,a){b[a>>5]|=128<<a%32;b[(a+64>>>9<<4)+14]=a;a=1732584193;for(var c=-271733879,d=-1732584194,e=271733878,f=0;f<b.length;f+=16){var g=a,h=c,k=d,l=e;a=md5_ff(a,c,d,e,b[f+0],7,-680876936);e=md5_ff(e,a,c,d,b[f+1],12,-389564586);d=md5_ff(d,e,a,c,b[f+2],17,606105819);c=md5_ff(c,d,e,a,b[f+3],22,-1044525330);a=md5_ff(a,c,d,e,b[f+4],7,-176418897);e=md5_ff(e,a,c,d,b[f+5],12,1200080426);d=md5_ff(d,e,a,c,b[f+6],17,-1473231341);c=md5_ff(c,d,e,a,b[f+7],22,-45705983);a=md5_ff(a,c,d,e,b[f+8],7,
1770035416);e=md5_ff(e,a,c,d,b[f+9],12,-1958414417);d=md5_ff(d,e,a,c,b[f+10],17,-42063);c=md5_ff(c,d,e,a,b[f+11],22,-1990404162);a=md5_ff(a,c,d,e,b[f+12],7,1804603682);e=md5_ff(e,a,c,d,b[f+13],12,-40341101);d=md5_ff(d,e,a,c,b[f+14],17,-1502002290);c=md5_ff(c,d,e,a,b[f+15],22,1236535329);a=md5_gg(a,c,d,e,b[f+1],5,-165796510);e=md5_gg(e,a,c,d,b[f+6],9,-1069501632);d=md5_gg(d,e,a,c,b[f+11],14,643717713);c=md5_gg(c,d,e,a,b[f+0],20,-373897302);a=md5_gg(a,c,d,e,b[f+5],5,-701558691);e=md5_gg(e,a,c,d,b[f+
10],9,38016083);d=md5_gg(d,e,a,c,b[f+15],14,-660478335);c=md5_gg(c,d,e,a,b[f+4],20,-405537848);a=md5_gg(a,c,d,e,b[f+9],5,568446438);e=md5_gg(e,a,c,d,b[f+14],9,-1019803690);d=md5_gg(d,e,a,c,b[f+3],14,-187363961);c=md5_gg(c,d,e,a,b[f+8],20,1163531501);a=md5_gg(a,c,d,e,b[f+13],5,-1444681467);e=md5_gg(e,a,c,d,b[f+2],9,-51403784);d=md5_gg(d,e,a,c,b[f+7],14,1735328473);c=md5_gg(c,d,e,a,b[f+12],20,-1926607734);a=md5_hh(a,c,d,e,b[f+5],4,-378558);e=md5_hh(e,a,c,d,b[f+8],11,-2022574463);d=md5_hh(d,e,a,c,b[f+
11],16,1839030562);c=md5_hh(c,d,e,a,b[f+14],23,-35309556);a=md5_hh(a,c,d,e,b[f+1],4,-1530992060);e=md5_hh(e,a,c,d,b[f+4],11,1272893353);d=md5_hh(d,e,a,c,b[f+7],16,-155497632);c=md5_hh(c,d,e,a,b[f+10],23,-1094730640);a=md5_hh(a,c,d,e,b[f+13],4,681279174);e=md5_hh(e,a,c,d,b[f+0],11,-358537222);d=md5_hh(d,e,a,c,b[f+3],16,-722521979);c=md5_hh(c,d,e,a,b[f+6],23,76029189);a=md5_hh(a,c,d,e,b[f+9],4,-640364487);e=md5_hh(e,a,c,d,b[f+12],11,-421815835);d=md5_hh(d,e,a,c,b[f+15],16,530742520);c=md5_hh(c,d,e,
a,b[f+2],23,-995338651);a=md5_ii(a,c,d,e,b[f+0],6,-198630844);e=md5_ii(e,a,c,d,b[f+7],10,1126891415);d=md5_ii(d,e,a,c,b[f+14],15,-1416354905);c=md5_ii(c,d,e,a,b[f+5],21,-57434055);a=md5_ii(a,c,d,e,b[f+12],6,1700485571);e=md5_ii(e,a,c,d,b[f+3],10,-1894986606);d=md5_ii(d,e,a,c,b[f+10],15,-1051523);c=md5_ii(c,d,e,a,b[f+1],21,-2054922799);a=md5_ii(a,c,d,e,b[f+8],6,1873313359);e=md5_ii(e,a,c,d,b[f+15],10,-30611744);d=md5_ii(d,e,a,c,b[f+6],15,-1560198380);c=md5_ii(c,d,e,a,b[f+13],21,1309151649);a=md5_ii(a,
c,d,e,b[f+4],6,-145523070);e=md5_ii(e,a,c,d,b[f+11],10,-1120210379);d=md5_ii(d,e,a,c,b[f+2],15,718787259);c=md5_ii(c,d,e,a,b[f+9],21,-343485551);a=safe_add(a,g);c=safe_add(c,h);d=safe_add(d,k);e=safe_add(e,l)}return[a,c,d,e]}function md5_cmn(b,a,c,d,e,f){return safe_add(bit_rol(safe_add(safe_add(a,b),safe_add(d,f)),e),c)}function md5_ff(b,a,c,d,e,f,g){return md5_cmn(a&c|~a&d,b,a,e,f,g)}function md5_gg(b,a,c,d,e,f,g){return md5_cmn(a&d|c&~d,b,a,e,f,g)}
function md5_hh(b,a,c,d,e,f,g){return md5_cmn(a^c^d,b,a,e,f,g)}function md5_ii(b,a,c,d,e,f,g){return md5_cmn(c^(a|~d),b,a,e,f,g)}function safe_add(b,a){var c=(b&65535)+(a&65535);return(b>>16)+(a>>16)+(c>>16)<<16|c&65535}function bit_rol(b,a){return b<<a|b>>>32-a};

// Extension

const err = 'error';
const wip = 'work in progress';

const currentVersion = '1.8.13';
const upToDateVersion = fetch('https://softedco.github.io/GameJolt-API-Scratch-extension/version').then(response => response.text(''));

const menuIcon = 'data:image/png;base64,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';

let userData;
let trophyData;
let scoreData;

class GameJoltAPI {
    constructor(runtime) {
        this.runtime = runtime;
    }
    getInfo() {
        return {
            id: 'GameJoltAPI',
            name: 'GameJolt API',
            menuIconURI: menuIcon,
            blocks: [
                {
                    opcode: 'version',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Return [versionType] version',
                    arguments: {
                        versionType: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'versionTypes',
                            defaultValue: 'current'
                        }
                    }
                },
                {
                    opcode: 'setGame',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Set game ID:[ID] and key:[key]',
                    arguments: {
                        ID: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        key: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'key'
                        }
                    }
                },
                {
                    opcode: 'gamejoltBool',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'GameJolt?'
                },
                {
                    opcode: 'session',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '[openOrClose] session',
                    arguments: {
                        openOrClose: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'openOrClose',
                            defaultValue: 'Open'
                        }
                    }
                },
                {
                    opcode: 'sessionBool',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'Session?'
                },
                {
                    opcode: 'loginManual',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Login with username:[username] and token:[token]',
                    arguments: {
                        username: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'username'
                        },
                        token: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'token'
                        }
                    }
                },
                {
                    opcode: 'logout',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Logout'
                },
                {
                    opcode: 'loginBool',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'Login?'
                },
                {
                    opcode: 'loginUserInfo',
                    blockType: Scratch.BlockType.REPORTER,
                    text: "Return logged in user's [infoType]",
                    arguments: {
                        infoType: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'infoTypes',
                            defaultValue: 'username'
                        }
                    }
                },
                {
                    opcode: 'userFetch',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Fetch user:[usernameOrID] by [fetchType]',
                    arguments: {
                        usernameOrID: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'username'
                        },
                        fetchType: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'fetchTypes',
                            defaultValue: 'username'
                        }
                    }
                },
                {
                    opcode: 'userFetchCurrent',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Fetch current user'
                },
                {
                    opcode: 'returnUserData',
                    blockType: Scratch.BlockType.REPORTER,
                    text: "Return fetched user's [userDataType]",
                    arguments: {
                        userDataType: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'userDataTypes',
                            defaultValue: 'username'
                        }
                    }
                },
                {
                    opcode: 'trophyAchieve',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Achieve trophy with ID:[ID]',
                    arguments: {
                        ID: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'trophyFetch',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Fetch trophy by ID:[ID]',
                    arguments: {
                        ID: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'scoreAdd',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Add score by ID:[ID] with value:[value] text:[text] and extra data:[extraData]',
                    arguments: {
                        ID: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        value: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        text: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '+1 point'
                        },
                        extraData: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'optional'
                        }
                    }
                },
                {
                    opcode: 'scoreAddGuest',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Add score by ID:[ID] with value:[value] text:[text] and extra data:[extraData] as guest:[username]',
                    arguments: {
                        ID: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        value: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        text: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '+1 point'
                        },
                        extraData: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'optional'
                        },
                        username: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'username'
                        }
                    }
                },
                {
                    opcode: 'scoreFetch',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Fetch [amount][globalOrPerUser] score/scores by ID:[ID]',
                    arguments: {
                        amount: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        globalOrPerUser: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'globalOrPerUser',
                            defaultValue: 'global'
                        },
                        ID: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'returnScoreData',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Return fetched score by index:[index]',
                    arguments: {
                        index: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                }
            ],
            menus: {
                versionTypes: {
                    items: ['current', 'up-to-date']
                },
                infoTypes: {
                    items: ['username', 'token'] 
                },
                fetchTypes: {
                    items: ['username', 'ID']
                },
                userDataTypes: {
                    items: ['username', 'ID', 'status', 'profile description', 'sign up date', 'last login']
                },
                openOrClose: {
                    items: ['Open', 'Close']
                },
                globalOrPerUser: {
                    items: ['global', 'user']
                }
            }
        };
    }
    version(args) {
        switch(args.versionType) {
            case 'current':
                return currentVersion;
            case 'up-to-date':
                return upToDateVersion;
            default:
                return err;
        }
    }
    setGame(args) {
        GJAPI.iGameID = args.ID;
        GJAPI.sGameKey = args.key;
    }
    gamejoltBool() {
        return GJAPI.bOnGJ;
    }
    session(args) {
        switch (args.openOrClose) {
            case 'Open':
                GJAPI.SessionOpen();
                break;
            case 'Close':
                GJAPI.SessionClose();
                break;
            default:
                return err;
        }
    }
    sessionBool() {
        return GJAPI.bSessionActive;
    }
    loginManual(args) {
        GJAPI.UserLoginManual(args.username, args.token);
    }
    logout() {
        GJAPI.UserLogout();
    }
    loginBool() {
        return GJAPI.bLoggedIn;
    }
    loginUserInfo(args) {
        switch(args.infoType) {
            case 'username':
                return GJAPI.sUserName;
            case 'token':
                return GJAPI.sUserToken;
            default:
                return err;
        }
    }
    userFetch(args) {
        switch (args.fetchType) {
            case 'username':
                GJAPI.UserFetchName(args.usernameOrId, function (pResponse) {
                    if (!pResponse.users) { userData = err; return err; }
                    userData = pResponse.users;
                });
                break;
            case 'id':
                GJAPI.UserFetchID(args.usernameOrId, function (pResponse) {
                    if (!pResponse.users) { userData = err; return err; }
                    userData = pResponse.users;
                });
                break;
            default:
                return err;
        }
    }
    userFetchCurrent() {
        GJAPI.UserFetchCurrent(function(pResponse) {
            if (!pResponse.users) { userData = err; return err; } 
            userData = pResponse.users;
        });
    }
    returnUserData(args) {
        if (userData == undefined) { return err; }

        switch(args.userDataType) {
            case 'username':
                return userData[0]['username'];
            case 'ID':
                return userData[0]['id'];
            case 'status':
                return userData[0]['status'];
            case 'profile description':
                return userData[0]['developer_description'];
            case 'sign up date':
                return userData[0]['signed_up'];
            case 'last login':
                return userData[0]['last_logged_in'];
            default:
                return err;
        };
    }
    trophyAchieve(args) {
        GJAPI.TrophyAchieve(args.ID);
    }
    trophyFetch(args) {
        GJAPI.TrophyFetchSingle(args.ID, function(pResponse)
        {
            if (!pResponse.trophies) { trophyData = err; return err; }
            trophyData = pResponse.trophies;
        });
        if (trophyData == undefined) { return err; }

        return trophyData;
    }
    scoreAdd(args) {
        GJAPI.ScoreAdd(args.ID, args.value, args.text, args.extraData);
    }
    scoreAddGuest(args) {
        GJAPI.ScoreAddGuest(args.ID, args.value, args.text, args.username, args.extraData)
    }
    scoreFetch(args) {
        switch (args.globalOrPerUser) {
            case 'global':
                GJAPI.ScoreFetch(args.ID, GJAPI.SCORE_ALL, args.amount, function (pResponse) {
                    if (!pResponse.scores) { scoreData = err; return err; }
                    scoreData = pResponse.scores;
                });
                break;
            case 'user':
                GJAPI.ScoreFetch(args.ID, GJAPI.SCORE_ONLY_USER, args.amount, function (pResponse) {
                    if (!pResponse.scores) { scoreData = err; return err; }
                    scoreData = pResponse.scores;
                });
                break;
            default:
                scoreData = err;
                return err;
        }
    }
    returnScoreData(args) {
        if (scoreData == undefined) { return err; }
        if (!Array.isArray(scoreData)) { return scoreData; }
        return scoreData[args.index];
    }
}
Scratch.extensions.register(new GameJoltAPI());

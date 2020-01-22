import {DateFormatType} from './BaseTypes'
import {Toast} from 'antd-mobile'

export const mapKey = '3180595fffa04cb3a0988d48ffad5422' // 高德地图key值

// 图片os服务器基础路径, 以前的图片
export const imgBaseUrl: string = 'https://youlin168.oss-cn-shenzhen.aliyuncs.com/to_appreciate/Other/'

// 美业会员 阿里云os地址
export const meiyeBaseUrl: string = 'https://youlin168.oss-cn-shenzhen.aliyuncs.com/meiye/'

/** 防抖
 * @param fn     回掉函数
 * @param time   时间
 * @example
 *      debounce(() => {
 *          // 做些什么
 *      }, 500)
 */
export const debounce = (fn: any, time: number) => {
    let timer: NodeJS.Timeout | null = null
    // tslint:disable-next-line:only-arrow-functions
    return function() {
        const self = debounce
        const args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.apply(self, args)
        }, time)
    }
}

/** 函数节流
 * @param fn    回调函数
 * @param time  时间
 * @example
 *      throttle(() => {
 *             // 做些什么
 *      }, 1000)
 */
export const throttle = (fn: any, time: number) => {
    let timer: NodeJS.Timeout | null = null
    let lastTime: number = Date.now()
    return function() {
        const nowTimer: number = Date.now()
        const args = arguments
        const context = throttle
        if (nowTimer - lastTime > time) {
            if (time) {
                clearTimeout(timer!)
            }
            fn.apply(context, args)
            lastTime = Date.now()
        } else {
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(context, args)
                    lastTime = Date.now()
                }, time - (nowTimer - lastTime))
            }
        }
    }
}

/** 小数点经度问题,保留2位小数
 * @param str 数据
 */
export const decimal: (str: number) => number = (str: number) => {
    // 数字类型转换字符串
    const newStr: string = str.toString()
    // 截取.前面字符串
    const pointBeforeReg: RegExp = /\d+\./g
    const pointBefore: string = newStr.match(pointBeforeReg)![0]
    // 截取.后面的2位
    const pointAfterReg: RegExp = /\.(\d+)/g
    const pointAfter: string = newStr.match(pointAfterReg)![0].slice(1, 3)
    return Number(pointBefore + pointAfter)
}
/**时间格式化
 * @param day 当前时间
 */
export const dateFormat: (day: Date | number) => DateFormatType = (day: Date | number) => {
    let nowDayWeek: Date = new Date()

    if (toString.call(day) === '[object Number]') {
        if (day.toString().length < 13) {
            day = Number(day)
        }
        nowDayWeek = new Date(day)
    } else {
        nowDayWeek = day as Date
    }
    const year = nowDayWeek.getFullYear()
    const month = nowDayWeek.getMonth() + 1
    const nowDay = nowDayWeek.getDate()
    const hours = nowDayWeek.getHours()
    const minutes = nowDayWeek.getMinutes()
    const seconds = nowDayWeek.getSeconds()
    const milliseconds = nowDayWeek.getMilliseconds()
    return {
        year,
        month,
        nowDay,
        hours,
        minutes,
        seconds,
        milliseconds,
    }
}

// 获取url参数
export const getQueryVariable = (variable: string) => {
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        if (pair[0] === variable) {
            return pair[1]
        }
    }
    return ''
}

/** 是否是微信浏览器
 * @param type 'isWx' | 'isAndrois' | 'isIos' 平台类型
 * @example
 *  微信浏览器
 *  const phoneType: string = userAgent("isWx"); ||
 *  const phoneType: string = userAgent("isAndroid");||
 *  const phoneType: string = userAgent("isAndroid");
 * @returns
 *      boolean 结果返回布尔值
 */
type UserAgentType = "isWx" | "isAndroid" | "isIos";
const userAgent: (type: UserAgentType) => boolean = (type: UserAgentType) => {
    const navigatorUserAgent: string = window.navigator.userAgent.toUpperCase();
    const map:Map<string, () => boolean> = new Map([
        ["isWx",      () => navigatorUserAgent.includes("MICROMESSENGER")],
        ["isAndroid", () => navigatorUserAgent.includes("ANDROID")],
        ["isIos",     () => navigatorUserAgent.includes("IOS")],
    ]);
    return map.get(type)!();
}

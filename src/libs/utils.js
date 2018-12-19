
/***
 * 补齐位数
 * @param number[int]: 要补齐的数字本身
 * @param count[int]: 数字的位数，2位数、3位数类似这种
 * @param feature[string]: 用于补齐位数的特征，默认是0
 */
function paddingNumber(number, count, feature) {
    let c = count || 2;
    let f = feature || '0';
    let template = [];
    for(let i = 0 ; i < c ; i++){
        template.push(f);
    }
    let numStr = `${number}`;
    let len = numStr.length;
    if (len > c) {
        throw {
            message: '数字不能超出指定的位数'
        }
    } else {
        for (let i = len - 1, j = template.length - 1; i >= 0 ; i--, j--) {
            template[j] = numStr[i];
        }
    }
    return template.join('');
}

/**
 * 获取当前日期字符串
 */
function getCurrentTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = paddingNumber(date.getMonth() + 1);
    let day = paddingNumber(date.getDate());
    let hour = paddingNumber(date.getHours());
    let minute = paddingNumber(date.getMinutes());
    let second = paddingNumber(date.getSeconds());
    return `${year}${month}${day}${hour}${minute}${second}`;
}

module.exports = {
    getCurrentTime
}
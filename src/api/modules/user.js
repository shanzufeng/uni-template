import http from '../http';

/**
 * 获取用户信息
 * @param data
 */
function getUsrInfo(data) {
    return http.get('/user/getUsrInfo.json', {
        params: data
    });
}

function login(data) {
    return http.post('/login.json', data);
}

export default {
    getUsrInfo,
    login
}

const request =require('request');
const qs =require('qs');

module.exports={
  getAccessToken:function () {
    let queryParams = {
      'grant_type': 'client_credential',
      'appid': 'wx6d28cb6fc8d4b',
      'secret': 'ee50de1c3503aea0e6cc3e458d3bf416'
    };
//上面有问题，直接写URL
    let wxGetAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx6d28cb6fc8d4b8cb&secret=ee50de1c3503aea0e6cc3e458d3bf416';
    let options = {
      method: 'GET',
      url: wxGetAccessTokenBaseUrl
    };
    return new Promise((resolve, reject) => {
      request(options, function (err, res, body) {
        if (res) {
          resolve(JSON.parse(body));
        } else {
          reject(err);
        }
      });
    })
  },


  getuv:function (token) {
    let url='https://api.weixin.qq.com/datacube/getweanalysisappiddailyvisittrend?access_token='+token

      let today = new Date();
      let nowTime = today.getTime();
      let ms = 24*3600*1000*(-1);
      today.setTime(parseInt(nowTime + ms));
      let oYear = today.getFullYear();
      let oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = '0' + oMoth;
      let oDay = today.getDate().toString();
      if (oDay.length <= 1) oDay = '0' + oDay;
      let yesterday=oYear + '' + oMoth +''+ oDay;
    let data={
      begin_date:yesterday,
      end_date:yesterday
    }
    let options = {
      url: url,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: data
    };
    return new Promise((resolve, reject) => {
      request(options, function (err, res, body) {
        if (res) {
          resolve(body.list[0].visit_pv);
        } else {
          reject(err);
        }
      });
    })

  }
}

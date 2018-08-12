const Router = require('koa-router');
const router = new Router();

const admin = require('./admin');
const classify = require('./classify');
const place = require('./place');
const news = require('./news');
// const wxouth = require('./wxouth');


module.exports = function (app){
  	//路由表
	app.use(router.routes()).use(router.allowedMethods());

	router.use('/api/admin',admin.routes(),admin.allowedMethods());
	router.use('/api/classify',classify.routes(),classify.allowedMethods());
	router.use('/api/place',place.routes(),place.allowedMethods());
	router.use('/api/news',news.routes(),news.allowedMethods());
  // router.use('/api/wxouth',wxouth.routes(),wxouth.allowedMethods());

}

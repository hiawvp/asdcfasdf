export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","yui.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-fb95e280.js","imports":["_app/immutable/start-fb95e280.js","_app/immutable/chunks/index-34c333a4.js","_app/immutable/chunks/singletons-5ad65ca6.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

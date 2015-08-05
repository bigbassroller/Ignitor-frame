export class App {

	configureRouter(config, router) {
		this.router = router;

		config.map([
			{ route:"", name: 'home', moduleId: "pages/home/home", title: "Home", nav: true },
			{ route:"about", name: 'about', moduleId: "pages/about/about", title: "About", nav: true },
			{ route:["list", "list"], name: 'list', moduleId: "pages/movies/list", title: "List", nav: true },
			{ route:"login", name: 'login', moduleId: "pages/login/login", title: "Login", nav: true }
			])
	}


}
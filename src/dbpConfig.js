export class dbpConfig{
	constructor(){
	}
	
	get dbpApiBaseUrl(){
		return "http://api.davebrownphotography.com/api/";
	}

	get dbpMongoApiBaseUrl(){
		return "http://localhost:8080/api/";
	}
	
	get blogApiBaseUrl(){
		return  "http://blog.davebrownphotography.com/wp-json/wp/v2/";
	}

	get instagramToken(){
		return  '963639.54b46af.6b3db9c5455d42d99e25a06dfbef8dbd';
	}
}
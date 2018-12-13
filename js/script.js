/**
	* The main API object
	*/
let api = {};

/**
	* Initializes the main API object
	*/
api.init = function() {

	// api.returnBasePath();
	// api.authenticateUser();
	// api.getAllCollections();
	// api.getCollectionSchema( 'articles' );
	// api.getCollectionEntries( 'articles' );
	// api.getCollectionEntriesFiltered( 'articles' );

};

/**
	* Returns the base path of the domain
	* (i.e., https://example.com)
	*
	* param {string} $subdomain - Subdomain to include in the base path (optional)
	* (i.e., https://cms.example.com)
	*
	* param {string} $slug - Slug to include after the base path (optional)
	* (i.e., https://example.com/api/)
	*/
api.returnBasePath = function( subdomain, slug ) {

	let location = window.location,
			protocol = location.protocol,
			domain = location.host,
			origin = location.origin,
			pathname = location.pathname,
			port = location.port,
			disp_port = (protocol == 'http:' && port == 80 || protocol == 'https:' && port == 443) ? '' : ':' . port,
			basePath;

	subdomain = ( '' !== subdomain ) ? subdomain : '';
	slug = ( '' !== slug ) ? slug : '';

	if (subdomain && disp_port && slug) {
		basePath = protocol + '//' + subdomain + '.' + domain + disp_port + pathname + slug + '/';
	} else if (subdomain && slug) {
		basePath = protocol + '//' + subdomain + '.' + domain + pathname + slug + '/';
	} else if (subdomain) {
		basePath = protocol + '//' + subdomain + '.' + domain + pathname;
	} else if (slug) {
		basePath = protocol + '//' + domain + pathname + slug + '/';
	} else {
		basePath = protocol + '//' + domain + pathname;
	}

	return basePath;

};

/**
	* The API authentication token
	*/
api.authToken = auth.token( 'local' );
// api.authToken = auth.token( 'staging' );
// api.authToken = auth.token( 'production' );

/**
	* Returns the API authentication query
	*/
api.returnAuthQuery = function() {

	let authQuery = '?token=' + api.authToken;

	return authQuery;

};

/**
	* Authenticates user
	*/
api.authenticateUser = function() {

	let basePath = api.returnBasePath( 'cms', 'api' ),
			authQuery = api.returnAuthQuery(),
			route = 'cockpit/authUser',
			endpoint = basePath + route + authQuery,
			userUsername = auth.username( 'admin' ),
			userPassword = auth.password( 'admin' );

	fetch(endpoint, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			user: userUsername,
			password: userPassword
		})
	})
	.then(user => user.json())
	.then(user => console.log(user));

};

/**
	* Gets all collections
	*/
api.getAllCollections = function() {

	let basePath = api.returnBasePath( 'cms', 'api' ),
			authQuery = api.returnAuthQuery(),
			route = 'collections/listCollections',
			endpoint = basePath + route + authQuery;

	fetch(endpoint)
		.then(collections => collections.json())
		.then(collections => console.log(collections));

};

/**
	* Gets collection schema
	*
	* param {string} collectionName - The name of the collection
	*/
api.getCollectionSchema = function( collectionName ) {

	let basePath = api.returnBasePath( 'cms', 'api' ),
			authQuery = api.returnAuthQuery(),
			route = 'collections/collection/' + collectionName,
			endpoint = basePath + route + authQuery;

	fetch(endpoint)
		.then(collection => collection.json())
		.then(collection => console.log(collection));

};

/**
	* Gets collection entries
	*
	* param {string} collectionName - The name of the collection
	*/
api.getCollectionEntries = function( collectionName ) {

	let basePath = api.returnBasePath( 'cms', 'api' ),
			authQuery = api.returnAuthQuery(),
			route = 'collections/get/' + collectionName,
			endpoint = basePath + route + authQuery;

	// Get all entries
	fetch(endpoint)
		.then(res => res.json())
		.then(res => console.log(res));

};

/**
	* Gets collection entries filtered
	*
	* param {string} collectionName - The name of the collection
	*/
api.getCollectionEntriesFiltered = function( collectionName ) {

	let basePath = api.returnBasePath( 'cms', 'api' ),
			authQuery = api.returnAuthQuery(),
			route = 'collections/get/' + collectionName,
			endpoint = basePath + route + authQuery;

	// To Do: Fix the filter

	// Get filtered entries
	fetch(endpoint, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			filter: {published:true},
			limit: 10,
			skip: 5,
			sort: {_created:-1},
			populate: 1 // resolve linked collection items
		})
	})
	.then(res => res.json())
	.then(res => console.log(res));

};

/**
	* Initialize the main API object
	*/
api.init();
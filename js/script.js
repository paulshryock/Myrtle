/**
	* The main API object
	*/
let api = {};

/**
	* Initializes the main API object
	*/
api.init = function() {

	// api.authenticateUser();
	// api.getAllCollections();
	// api.getCollectionSchema( 'articles' );
	// api.getCollectionEntries( 'articles' );
	// api.getCollectionEntriesFiltered( 'articles' );

};

/**
	* Returns the base path of the API
	*/
api.returnBasePath = function() {

	let basePath = '../cms/api/';

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

	let basePath = api.returnBasePath(),
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

	let basePath = api.returnBasePath(),
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

	let basePath = api.returnBasePath(),
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

	let basePath = api.returnBasePath(),
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

	let basePath = api.returnBasePath(),
			authQuery = api.returnAuthQuery(),
			route = 'collections/get/' + collectionName,
			endpoint = basePath + route + authQuery;

	// Get filtered entries
	fetch(endpoint, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			filter: {status:'Published'},
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
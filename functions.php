<?php

include( 'auth.php' );

/**
	* Returns the base path of the domain
	* (i.e., https://example.com)
	*
	* param {string} $subdomain - Subdomain to include in the base path (optional)
	* (i.e., https://cms.example.com)
	*
	* param {string} $slug - Slug to include after the base path (optional)
	* (i.e., https://example.com/api)
	*/
function api_returnBasePath( $subdomain, $slug ) {

	$base_directory = __DIR__;
	$protocol = empty($_SERVER['HTTPS']) ? 'http' : 'https';
	$domain = $_SERVER['SERVER_NAME'];
	$doc_root = preg_replace("!${_SERVER['SCRIPT_NAME']}$!", '', $_SERVER['SCRIPT_FILENAME']);
	$base_url = preg_replace("!^${doc_root}!", '', $base_directory);
	$port = $_SERVER['SERVER_PORT'];
	$disp_port = ($protocol == 'http' && $port == 80 || $protocol == 'https' && $port == 443) ? '' : ":$port";
	$subdomain = ( '' !== $subdomain ) ? $subdomain . '.' : '';
	$slug = ( '' !== $slug ) ? '/' . $slug . '/' : '';
	$basePath = "${protocol}://${subdomain}${domain}${disp_port}${base_url}${slug}";

	return $basePath;

};

/**
	* The API authentication token
	*/
$api_authToken = auth_token( 'local' );
// $api_authToken = auth_token( 'staging' );
// $api_authToken = auth_token( 'production' );

/**
	* Returns the API authentication query
	*/
function api_returnAuthQuery() {

	global $api_authToken;

	$authQuery = '?token=' . $api_authToken;

	return $authQuery;

};

/**
	* Authenticates user
	*/
function api_authenticateUser() {

	$basePath = api_returnBasePath( 'cms', 'api' );
	$authQuery = api_returnAuthQuery();
	$route = 'cockpit/authUser';
	$endpoint = $basePath . $route . $authQuery;
	$userUsername = auth_username( 'admin' );
	$userPassword = auth_password( 'admin' );

	// Need to authenticate user
	// $data_string = file_get_contents($endpoint);
	// $user = json_decode($data_string);

	// return $user;

	// JavaScript
	// fetch(endpoint, {
	// 	method: 'post',
	// 	headers: { 'Content-Type': 'application/json' },
	// 	body: JSON.stringify({
	// 		user: userUsername,
	// 		password: userPassword
	// 	})
	// })
	// .then(user => user.json())
	// .then(user => console.log(user));

};

/**
	* Gets all collections
	*/
function api_getAllCollections() {

	$basePath = api_returnBasePath( 'cms', 'api' );
	$authQuery = api_returnAuthQuery();
	$route = 'collections/listCollections';
	$endpoint = $basePath . $route . $authQuery;
	$data_string = file_get_contents($endpoint);
	$all_collections = json_decode($data_string);

	return $all_collections;

};

/**
	* Gets collection schema
	*
	* param {string} $collectionName - The name of the collection
	*/
function api_getCollectionSchema( $collectionName ) {

	$basePath = api_returnBasePath( 'cms', 'api' );
	$authQuery = api_returnAuthQuery();
	$route = 'collections/collection/' . $collectionName;
	$endpoint = $basePath . $route . $authQuery;
	$data_string = file_get_contents($endpoint);
	$collection_schema = json_decode($data_string);

	return $collection_schema;

};

/**
	* Gets collection entries
	*
	* param {string} $collectionName - The name of the collection
	*/
function api_getCollectionEntries( $collectionName ) {

	$basePath = api_returnBasePath( 'cms', 'api' );
	$authQuery = api_returnAuthQuery();
	$route = 'collections/get/' . $collectionName;
	$endpoint = $basePath . $route . $authQuery;
	$data_string = file_get_contents($endpoint);
	$collection_entries = json_decode($data_string);

	return $collection_entries;

};

/**
	* Gets collection entries filtered
	*
	* param {string} $collectionName - The name of the collection
	*/
function api_getCollectionEntriesFiltered( $collectionName ) {

	$basePath = api_returnBasePath( 'cms', 'api' );
	$authQuery = api_returnAuthQuery();
	$route = 'collections/get/' . $collectionName;
	$endpoint = $basePath . $route . $authQuery;
	$data_string = file_get_contents($endpoint);
	$collection_entries_filtered = json_decode($data_string);

	return $collection_entries_filtered;

};

?>
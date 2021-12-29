//const rootServerHost = 'https://api.scrapays.com';
const rootServerHost = 'https://staging.scrapays.com';

const config = {
	configBaseServerUrl: `${rootServerHost}/v1/`,
	configAvatarUrl: `${rootServerHost}/storage/profile_pictures/`,
	configKYCUrl: `${rootServerHost}/storage/kyc_files/`,
	configGoogleMapsApiKey: 'AIzaSyAWR6b3RW5bSWplASOkIJjh31bWfvfPsOA',
	configMaterialUrl: `${rootServerHost}/storage/material_list_images/`,
	rootServerHost,
};

export default config;

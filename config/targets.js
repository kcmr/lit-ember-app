'use strict';

const isCI = !!process.env.CI;
const isProduction = process.env.EMBER_ENV === 'production';

let browsers;

if (isCI || isProduction) {
	browsers = [
		'chrome >= 30',
		'firefox >= 32',
		'ios >= 9',
		'last 1 edge versions'
	];
} else {
	browsers = [
		'last 1 Chrome versions',
		'last 1 Firefox versions',
		'last 1 Safari versions',
		'last 1 edge versions',
		'ie 11'
	];
}

module.exports = {
  browsers
};

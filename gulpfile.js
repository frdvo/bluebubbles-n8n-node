const { src, dest, parallel } = require('gulp');

function copyNodeIcons() {
	return src('nodes/**/*.png')
		.pipe(dest('dist/nodes'));
}

function copyLogo() {
	return src('screenshots/logo.*')
		.pipe(dest('dist'));
}

exports.default = parallel(copyNodeIcons, copyLogo);

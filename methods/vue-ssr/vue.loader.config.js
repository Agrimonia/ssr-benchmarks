module.exports = {
	extractCSS: true,
	preserveWhitespace: false,
	postcss: [
		require('autoprefixer')()
	]
}
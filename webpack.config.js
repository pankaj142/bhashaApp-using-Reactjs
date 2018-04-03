var path      =    require('path');

module.exports = {
	entry: './src/app.js',
	output:{
		path:path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	watch:true,
	mode: 'development',
	module:{
		rules:[
		{
             test:/\.js$/,
             exclude:/node_modules/,
             loader:'babel-loader',
             query:{
             	presets: ['env','react', 'stage-1']
             }
		}
	  ]
	}
}
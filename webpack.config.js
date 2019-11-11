const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new MiniCssExtractPlugin({
    filename: 'styles.css'
  })

  console.log('env', env)
  return {
      entry: './src/app.js',
      output: {
        path: path.join(__dirname, 'public', 'dist'),
        filename: 'bundle.js'
      },
      module: {
        rules: [
          {
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
          },
          {
            test: /\.s?css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: (resourcePath, context) => {
                    return path.relative(path.dirname(resourcePath), context) + '/';
                  },
                },
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
      ]
      },
      plugins: [
        CSSExtract
      ],
      devtool: isProduction ? 'source-map' : 'inline-source-map',
      devServer: {
        // host: 'localhost',
        // port: 3000,
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        publicPath: '/dist/'
      }
  }
}



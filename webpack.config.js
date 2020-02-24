const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base = (env, options) => {
  const isDev = options.mode === 'development';
  let result = {
    mode: isDev ? 'development': 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            },
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: false }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: isDev },
            },
            'css-loader',
          ],
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].css' }),
    ],
    optimization: {},
  };

  if (isDev)
  {
    /**
     * Development mode
     */
    result.entry = {
      app: './src/demo/index.js',
    };
    result.output = {
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
    };
    result.devtool = 'inline-source-map';
    result.devServer = {
      hot: true,
      host: '0.0.0.0',
      port: options.port || 3000,
      stats: { color: true },
      historyApiFallback: true,
      noInfo: true,
    };
    result.plugins.push(new HtmlWebpackPlugin({
      template: './src/demo/index.html',
    }));
  }
  else
  {
    /**
     * Production mode
     */
    result.entry = {
      ImageResize: './src/ImageResize/index.js',
      app: './src/demo/index.js',
    };
    result.output = {
      path: path.resolve(__dirname, 'docs'),
      filename: '[name].js',
      publicPath: './',
      library: '[name]',
      libraryTarget: 'umd',
      libraryExport: 'default',
    };
    result.optimization.minimizer = [
      new TerserJSPlugin({}),
    ];
    result.plugins.push(new HtmlWebpackPlugin({
      template: './src/demo/index.html',
    }));
  }

  return result;
};

module.exports = base;

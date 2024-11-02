const path = require('path');
const zlib = require('zlib');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

let config = {
  entry: {
    index: {
      import: './src/index.ts',
      dependOn: 'shared',
    },
    chat: {
      import: './src/pages/chat/index.ts',
      dependOn: 'shared',
    },
    error: {
      import: './src/pages/error/index.ts',
      dependOn: 'shared',
    },
    home: {
      import: './src/pages/home/index.ts',
      dependOn: 'shared',
    },
    profile: {
      import: './src/pages/profile/index.ts',
      dependOn: 'shared',
    },
    shared: 'handlebars/dist/handlebars.min.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              webpackImporter: false,
              sassOptions: {
                includePaths: [path.resolve(__dirname, './node_modules')],
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|svg)$/i,
        type: 'asset',
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },
  output: {
    filename: '[name].bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/static/icons/favicons'),
          to: 'favicons',
        },
      ],
    }),
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({ filename: 'style-[contenthash].css' }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.devServer = {
      historyApiFallback: true,
      port: 3000,
    };
  }

  if (argv.mode === 'production') {
    config.performance = {
      hints: 'warning',
    };
    config.plugins.push(
      new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      })
    );
  }

  return config;
};

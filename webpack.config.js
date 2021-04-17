const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsWebpakcPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const ImageminPlugin = require("imagemin-webpack");

const ExtractTextPluginConfig = new ExtractTextPlugin("index_bundle.css");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const optimization = () => {
    const configObj = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        configObj.minimizer = [
            new OptimizeCssAssetsWebpakcPlugin(),
            new TerserWebpackPlugin()
        ];
    }

    return configObj;
};

const plugins = () => {
    const basePlugins = [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "index.html",
            minify: {
                collapseWhitespace: isProd
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/img') , to: path.resolve(__dirname, 'dist/img')}
            ]
        }),
      new webpack.ProvidePlugin({
        'Promise': 'bluebird',
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
        Popper: 'popper.js'
      }),
    ];

    // if (isProd) {
    //   basePlugins.push(
    //     new ImageminPlugin({
    //       bail: false,
    //       cache: true,
    //       options: "/img/",
    //       imageminOptions: {
    //         plugins: [
    //           ["gifsicle", { interlaced: true }],
    //           ["jpegtran", { progressive: true }],
    //           ["optipng", { optimizationLevel: 5 }],
    //           [
    //             "svgo",
    //             {
    //               plugins: [
    //                 {
    //                   removeViewBox: false
    //                 }
    //               ]
    //             }
    //           ]
    //         ]
    //       }
    //     })
    //   )
    // }


    return basePlugins
}

module.exports = {
    stats: "normal",
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: [
        "/js/main.js",
        "/css/main.css"
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: optimization(),
    plugins: plugins(),
    devtool: isProd ? false : 'source-map',
    module: {
        rules: [
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
          {
            test: /\.(?:|gif|png|jpg|jpeg|svg|mp4)$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: '[hash].[ext]',
                outputPath: './img/'
              }
            }]
          },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader"
                ],
            },
        ]
    },
};

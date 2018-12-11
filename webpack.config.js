const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");
const optimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

const devMode = process.env.NODE_ENV == "development";

module.exports = {
  entry : ["@babel/polyfill", "./src/assets/js/main.js"],
  output : {
    path : path.resolve(__dirname, "dist"),
    filename : "assets/js/bundle.js"
  },
  plugins : [
    new htmlWebpackPlugin({
      template : path.resolve(__dirname, "./src/assets/views/index.pug"),
      filename : "index.html",
      title : "Meus Repositórios | Sign"
    }),
    new htmlWebpackPlugin({
      template : path.resolve(__dirname, "./src/assets/views/internal.pug"),
      filename : "internal.html",
      title : "Meus Repositórios | Interna"
    }),
    new miniCssExtractPlugin({
      filename : "./assets/css/[name].min.css"
    }),
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/images/'),
        to: path.resolve(__dirname, 'dist/assets/images'),
        ignore: ['svgs/*'],
        cache: true
      }
    ]),
    // new HtmlCriticalWebpackPlugin({
    //   base: path.resolve(__dirname, 'dist'),
    //   src: 'internal.html',
    //   dest: 'internal.html',
    //   inline: true,
    //   minify: true,
    //   extract: true,
    //   width: 1300,
    //   height: 900,
    //   penthouse: {
    //     blockJSRequests: false,
    //   }
    // })
  ],
  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        use : {
          loader : "babel-loader",
          options : {
            presets : ["@babel/preset-env"],
            plugins : ["@babel/plugin-transform-async-to-generator"]
          }
        }
      },
      {
        test : /\.scss$/,
        use : [
          devMode ? {loader : "style-loader"} : {loader : miniCssExtractPlugin.loader},
          {
            loader : "css-loader"
          },
          {
            loader : "sass-loader"
          }
        ]
      },
      {
        test : /\.pug$/,
        use : {
          loader : "pug-loader"
        }
      },
      {
        test : /\.(png|jpg|gif|svg)$/,
        use: {
          loader : "file-loader",
          options : {
            name : "../images/[name].[ext]",
          }
        }
      }
    ]
  },
  optimization : {
    minimizer: [
      new uglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new optimizeCssAssetsPlugin({})
    ]
  },
  devtool : "inline-source-map", // Para desenvolvimento. No produção usa-se source-map
  devServer : {
    contentBase : path.resolve(__dirname, "src"),
    open : true,
    port: 9000
  }
}

/* 
entry : Os arquivos que o webpack deve usar para começar a construir o gráfico de dependẽncia.

output : Informa ao webpack onde emitir os bundles que ele cria e como nomear esses arquivos
  path : Para onde o pacote será emitido
  filename : Nome do pacote

loaders : Permite que o webpack processe outros tipos de arquivos e os converta em módulos válidos
  test : identifica o formato dos arquivos que serão transformados.
  use : identifica o loader que será utilizado para a transformação

plugins : Usados para executar uma ampla gama de tarefas

*/
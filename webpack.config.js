module.exports = {
  entry : "./src/app.js",
  output : {
    path : __dirname + "/dist",
    filename : "bundle.js"
  },
  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        use : ["babel-loader"]
      },
      {
        test : /\.scss$/,
        use : ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer : {
    contentBase : __dirname + "/dist"
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
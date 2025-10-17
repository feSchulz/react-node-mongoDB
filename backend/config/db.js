// Importa o Mongoose, uma biblioteca ODM (Object Data Modeling) para MongoDB no Node.js
const mongoose = require("mongoose");

// Obtém as credenciais do banco de dados a partir de variáveis de ambiente
// Isso é uma boa prática para evitar expor informações sensíveis no código
const deUser = process.env.DB_USER; // Nome de usuário do MongoDB
const dbPassword = process.env.DB_PASS; // Senha do MongoDB

// Define uma função assíncrona chamada `conn` para gerenciar a conexão com o banco de dados
const conn = async () => {
    try {

      // Valida variáveis de ambiente
      if (!deUser || !dbPassword) {
        throw new Error(
          "DB_USER e DB_PASS devem ser definidos nas variáveis de ambiente"
        );
      }

        // Verifica se já está conectado
        //O Mongoose gerencia automaticamente um pool de conexões, 
        // mas você pode adicionar uma verificação para evitar tentativas 
        // repetidas de conexão se o Mongoose já estiver conectado:

      if (mongoose.connection.readyState === 1) {
        console.log("Já conectado ao MongoDB");
        return mongoose.connection;
      }

      // Tenta estabelecer uma conexão com o MongoDB Atlas (serviço em nuvem do MongoDB)
      // A string de conexão usa o formato mongodb+srv para conectar ao cluster
      // As variáveis ${deUser} e ${dbPassword} são interpoladas na URL
      // A string inclui opções como retryWrites=true (retenta operações de escrita em caso de falha)
      // e w=majority (garante que as escritas sejam confirmadas pela maioria dos nós do cluster) &
      // Considere adicionar opções de configuração ao mongoose.connect para lidar com timeouts ou reconexões automáticas
      const dbconn = await mongoose.connect(
          `add sua url de conecxao aqui`,
          {
              serverSelectionTimeoutMS: 5000,
              maxPoolSize: 10,
          }
      );

      // Exibe uma mensagem no console para confirmar que a conexão foi bem-sucedida
      console.log("conectou no DB");

      // Retorna o objeto de conexão do Mongoose, que pode ser usado para verificar o estado da conexão
      return dbconn;
    } catch (error) {
    // Em caso de erro durante a conexão, exibe o erro no console
    console.log(error);
  }
};

// Executa a função `conn` imediatamente ao carregar o módulo
// Isso faz com que a conexão com o banco de dados seja iniciada assim que o módulo é importado
conn();

// Exporta a função `conn` para que ela possa ser usada em outros módulos
module.exports = conn;

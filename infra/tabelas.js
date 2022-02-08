class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarAtendimentos()
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS tasks (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, number varchar(13) NOT NULL, status varchar(20) NOT NULL DEFAULT "Ativo", initialDate datetime NOT NULL, DoisD datetime NOT NULL, TrintaD datetime NOT NULL, SessentaD datetime NOT NULL,  PRIMARY KEY(id))'
        const sqlDois = 'CREATE TABLE IF NOT EXISTS messages (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, number varchar(13) NOT NULL, message varchar(200) NOT NULL, date datetime NOT NULL, PRIMARY KEY(id))'
        const sqlTres = 'CREATE TABLE IF NOT EXISTS schMessage (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, number varchar(13) NOT NULL, message varchar(200) NOT NULL, date datetime NOT NULL, PRIMARY KEY(id))'
        
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela tasks OK!')
            }
        })
        this.conexao.query(sqlDois, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela messages OK!')
            }
        })
        this.conexao.query(sqlTres, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela schMessage OK!')
            }
        })
    }
}

module.exports = new Tabelas
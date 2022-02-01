class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarAtendimentos()
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS tasks (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, number varchar(13) NOT NULL, status varchar(20) NOT NULL DEFAULT "Ativo", initialDate datetime NOT NULL, DoisD datetime NOT NULL, TrintaD datetime NOT NULL, SessentaD datetime NOT NULL,  PRIMARY KEY(id))'
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela Existente!')
            }
        })
    }
}

module.exports = new Tabelas
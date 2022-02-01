class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarAtendimentos()
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS tasks (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, number varchar(13) NOT NULL, initialDate datetime NOT NULL, status varchar(20) NOT NULL DEFAULT "Ativo", PRIMARY KEY(id))'
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela criada com sucesso!')
            }

        })
    }
}

module.exports = new Tabelas
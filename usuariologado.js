// Remove a função carregar() completamente - não é necessária

$("#formulario").validate({
    rules: {
        login: { required: true },
        senha: { required: true }
    },
    messages: {
        login: { required: "Campo obrigatório" },
        senha: { required: "Campo obrigatório" }
    }
});

async function autenticar() {
    if ($("#formulario").valid()) {
        let login = $("#login").val();
        let senha = $("#senha").val();

        try {
            let resposta = await fetch(`https://api-odinline.odiloncorrea.com/usuario/${login}/${senha}/autenticar`);
            
            if (!resposta.ok) {
                throw new Error('Falha na autenticação');
            }

            let usuario = await resposta.json();

            if (!usuario?.id) {
                throw new Error('Usuário ou senha inválidos');
            }

            // Armazena apenas o objeto do usuário, não um array
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            alert("Login realizado com sucesso!");
            window.location.href = "menu.html";

        } catch (error) {
            console.error("Erro na autenticação:", error);
            alert("Usuário ou senha inválidos. Por favor, tente novamente.");
        }
    }
}

// Verifica se já está logado ao carregar a página
$(document).ready(function() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuario?.id) {
        // Se já estiver logado, redireciona para o menu
        window.location.href = "menu.html";
    }
});
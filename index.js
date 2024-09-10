const inputNome = document.querySelector("input#nome");
const inputTelefone = document.querySelector("input#telefone");
const textAreaMensagem = document.querySelector("textarea#mensagem");
const buttonEnviar = document.querySelector("button#enviar");

buttonEnviar.addEventListener("click", enviarFormulario);

function enviarFormulario() {
  const nome = inputNome.value;
  const telefone = inputTelefone.value;
  const mensagem = textAreaMensagem.value;

  const dados = prepararDados(nome, telefone, mensagem);
  enviarParaDiscord(dados);
}

function prepararDados(nome, telefone, mensagem) {
  const dados = {
    content: `:green_circle: **Ei, Jônatas! Nova mensagem no formulário!**

    :person:
    **Nome**: ${nome}

    :telephone:
    **Telefone**: ${telefone}

    :envelope:
    **Mensagem**: ${mensagem}`,
  };

  return JSON.stringify(dados);
}

function enviarParaDiscord(dados) {
  const url =
    "https://discord.com/api/webhooks/1282904096998817863/t19SXSPjUuNVTjQj7PA0R7oTJTC_iMi1Xg5VcktZ_47iPmjF5RGaR-kzmzLlGEk7zCcS";
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dados,
  };
  window
    .fetch(url, config)
    .then((response) => response.json())
    .then((json) => console.log(json))
    .then(limparDados())
    .catch((error) => console.log(error.message));
}

function limparDados() {
  inputNome.value = "";
  inputTelefone.value = "";
  textAreaMensagem.value = "";
}

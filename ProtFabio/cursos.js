document.addEventListener("DOMContentLoaded", function () {
  const cursosContainer = document.getElementById("cursos-container");
  const pontosValor = document.getElementById("pontos-valor");
  const filtroInput = document.getElementById("filtro-input");

  function exibirPontosUsuario() {
    const pontos = localStorage.getItem("pontos") || 0;
    pontosValor.textContent = pontos;
  }

  function mostrarOcultarAulas(curso, cursoDiv) {
    cursoDiv.classList.toggle("ativo");
    const aulasContainer = cursoDiv.querySelector(".aula-container");

    if (cursoDiv.classList.contains("ativo")) {
      aulasContainer.innerHTML = "";

      curso.aulas.forEach((aula) => {
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("aula");

        const playerEmbed = document.createElement("div");
        playerEmbed.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${getYoutubeVideoId(
          aula.link
        )}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

        const playerTitulo = document.createElement("p");
        playerTitulo.textContent = `Aula ${aula.titulo} - Pontuação: ${aula.pontuacao}`;

        aula.checkbox = document.createElement("input");
        aula.checkbox.type = "checkbox";
        aula.checkbox.id = `checkbox-${aula.titulo}`;
        aula.checkbox.checked =
          JSON.parse(localStorage.getItem(`checkbox-${aula.titulo}`)) || false;

        // Modificando a função para adicionar pontos quando o checkbox é alterado
        aula.checkbox.addEventListener("change", function () {
          const pontos = aula.checkbox.checked
            ? aula.pontuacao
            : -aula.pontuacao;
          adicionarPontosAoUsuario(pontos);
          // Salvando o estado do checkbox no localStorage
          localStorage.setItem(
            `checkbox-${aula.titulo}`,
            JSON.stringify(aula.checkbox.checked)
          );
        });

        const checkboxLabel = document.createElement("label");
        checkboxLabel.htmlFor = `checkbox-${aula.titulo}`;
        checkboxLabel.textContent = "Assistido";

        playerDiv.appendChild(playerTitulo);
        playerDiv.appendChild(playerEmbed);
        playerDiv.appendChild(aula.checkbox);
        playerDiv.appendChild(checkboxLabel);

        const quizButton = document.createElement("button");
        quizButton.textContent = "Iniciar Quiz";
        quizButton.addEventListener("click", function () {
          iniciarQuiz(aula);
        });

        playerDiv.appendChild(quizButton);

        aulasContainer.appendChild(playerDiv);
      });
    }
  }

  function adicionarPontosAoUsuario(pontos) {
    const pontosAntigos = localStorage.getItem("pontos") || 0;

    // Certifique-se de que 'pontos' seja um número
    const pontosParaAdicionar = isNaN(pontos) ? 0 : parseInt(pontos, 10);

    const novosPontos = parseInt(pontosAntigos, 10) + pontosParaAdicionar;
    localStorage.setItem("pontos", novosPontos);
    exibirPontosUsuario();
  }

  function iniciarQuiz(aula) {
    const quizConcluido =
      JSON.parse(localStorage.getItem(`quizConcluido-${aula.titulo}`)) || false;

    if (quizConcluido) {
      alert(
        "Você já concluiu o quiz para esta aula. Não é possível refazê-lo."
      );
      return;
    }

    const pergunta1 = "Pergunta 1: " + aula.quiz.pergunta1;
    const respostas1 = aula.quiz.respostas1.join("\n");
    let respostaUsuario1;

    do {
      respostaUsuario1 = window.prompt(`${pergunta1}\n\n${respostas1}`);
    } while (!respostaUsuario1 || respostaUsuario1.trim() === "");

    const pergunta2 = "Pergunta 2: " + aula.quiz.pergunta2;
    const respostas2 = aula.quiz.respostas2.join("\n");
    let respostaUsuario2;

    do {
      respostaUsuario2 = window.prompt(`${pergunta2}\n\n${respostas2}`);
    } while (!respostaUsuario2 || respostaUsuario2.trim() === "");

    let pontuacaoQuiz = 0;

    if (
      respostaUsuario1.toLowerCase() ===
      aula.quiz.respostaCorreta1.toLowerCase()
    ) {
      pontuacaoQuiz += 10;
    }

    if (
      respostaUsuario2.toLowerCase() ===
      aula.quiz.respostaCorreta2.toLowerCase()
    ) {
      pontuacaoQuiz += 10;
    }

    if (pontuacaoQuiz > 0) {
      adicionarPontosAoUsuario(pontuacaoQuiz);
      alert(`Você ganhou ${pontuacaoQuiz} pontos no quiz!`);
    } else {
      alert("Você não ganhou pontos no quiz. Tente novamente.");
    }

    // Marca o quiz como concluído no localStorage
    localStorage.setItem(`quizConcluido-${aula.titulo}`, JSON.stringify(true));
  }

  function getYoutubeVideoId(url) {
    var regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(regex);
    return match ? match[1] : null;
  }

  function filtrarCursos() {
    const termoFiltro = filtroInput.value.toLowerCase();

    document.querySelectorAll(".curso-container").forEach((cursoContainer) => {
      const nomeCurso = cursoContainer
        .querySelector(".curso h2")
        .textContent.toLowerCase();
      if (nomeCurso.includes(termoFiltro)) {
        cursoContainer.classList.add("mostrar");
      } else {
        cursoContainer.classList.remove("mostrar");
      }
    });
  }

  filtroInput.addEventListener("input", filtrarCursos);

  fetch("cursos.json")
    .then((response) => response.json())
    .then((cursosJSON) => {
      cursosJSON.cursos.forEach((curso) => {
        const cursoContainer = document.createElement("div");
        cursoContainer.classList.add("curso-container");

        const cursoDiv = document.createElement("div");
        cursoDiv.classList.add("curso");

        const cursoImg = document.createElement("img");
        cursoImg.classList.add("curso-img");
        cursoImg.src = curso.imagem;
        cursoImg.alt = curso.nome;

        const cursoTitulo = document.createElement("h2");
        cursoTitulo.textContent = curso.nome;

        const cursoDescricao = document.createElement("p");
        cursoDescricao.textContent = curso.descricao;

        cursoDiv.appendChild(cursoImg);
        cursoDiv.appendChild(cursoTitulo);
        cursoDiv.appendChild(cursoDescricao);

        const aulasContainer = document.createElement("div");
        aulasContainer.classList.add("aula-container");
        cursoDiv.appendChild(aulasContainer);

        cursoDiv.addEventListener("click", function () {
          if (!cursoDiv.classList.contains("ativo")) {
            mostrarOcultarAulas(curso, cursoDiv);
          }
        });

        cursoContainer.appendChild(cursoDiv);
        cursosContainer.appendChild(cursoContainer);
      });

      filtrarCursos();

      exibirPontosUsuario();
    })
    .catch((error) => console.error("Erro ao carregar os cursos:", error));
});

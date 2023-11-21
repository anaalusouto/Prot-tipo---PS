**Documentação Simples para Desenvolvedores**

**Objetivo:**
Este código JavaScript foi desenvolvido para criar uma interface de usuário que exibe cursos, suas aulas e gerencia pontos de usuário e quizzes associados. Ele interage com o DOM para criar elementos dinamicamente, usa localStorage para armazenar informações locais e inclui funcionalidades como filtragem de cursos, exibição/ocultação de aulas, controle de pontos e quizzes interativos.

**Principais Elementos HTML:**
1. `<div id="cursos-container">`: Contêiner principal para exibir todos os cursos.
2. `<div id="pontos-valor">`: Exibe a pontuação acumulada do usuário.
3. `<input id="filtro-input">`: Input para filtrar cursos por nome.

**Principais Funções:**

1. `exibirPontosUsuario()`: Atualiza a exibição da pontuação do usuário com base nos pontos armazenados no localStorage.

2. `mostrarOcultarAulas(curso, cursoDiv)`: Alterna a visibilidade das aulas de um curso. Cria dinamicamente elementos HTML para exibir vídeos, checkboxes de conclusão e botões para iniciar quizzes.

3. `adicionarPontosAoUsuario(pontos)`: Adiciona pontos à pontuação do usuário, atualiza o localStorage e chama exibirPontosUsuario().

4. `iniciarQuiz(aula)`: Inicia um quiz para uma aula específica, interagindo com o usuário via prompt. Atualiza a pontuação do usuário com base nas respostas corretas e armazena o estado do quiz no localStorage.

5. `getYoutubeVideoId(url)`: Extrai o ID do vídeo do YouTube a partir de uma URL.

6. `filtrarCursos()`: Filtra os cursos com base no termo inserido no filtro-input, alterando a classe "mostrar" nos elementos conforme necessário.

**Event Listeners:**
1. `input no filtro-input`: Ativa a função filtrarCursos() quando o usuário insere texto no campo de filtro.

**Carregamento de Cursos:**
1. `fetch("cursos.json")`: Recupera dados de cursos de um arquivo JSON. Cria dinamicamente elementos HTML para representar cada curso e suas aulas. Inicializa a exibição de pontos do usuário. Trata erros no carregamento dos cursos.

**Notas Importantes:**
- O código usa localStorage para armazenar a pontuação do usuário, o estado de checkboxes e se um quiz foi concluído.
- A função `iniciarQuiz()` solicita respostas via prompt e atualiza a pontuação do usuário com base nessas respostas.
- A função `mostrarOcultarAulas()` cria elementos de vídeo do YouTube dinamicamente para cada aula.
- A função `filtrarCursos()` permite ao usuário filtrar cursos com base no nome.

Este código proporciona uma experiência interativa para o usuário, permitindo a visualização de cursos, controle de progresso e participação em quizzes.

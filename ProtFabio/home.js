document.addEventListener('DOMContentLoaded', function () {
    const pontosValor = document.getElementById('pontos-valor');
  
    function exibirPontosUsuario() {
      const pontos = localStorage.getItem('pontos') || 0;
      pontosValor.textContent = pontos;
    }
  
    // Display points when the home page finishes loading
    exibirPontosUsuario();
  });
  
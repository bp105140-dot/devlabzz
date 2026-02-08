// Smooth scrolling - Navegação suave ao clicar nos links do menu
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations - Ativa as animações de surgimento ao rolar a página
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Form submission - Lógica de envio do formulário de contacto
// document.querySelector(".contact-form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   alert("Mensagem enviada! Entraremos em contacto em breve.");
//   e.target.reset();
// });
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const mouse = { x: null, y: null, radius: 100 }; // Raio de "repulsão" da água

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = Math.random() * 5 + 2;
    this.density = Math.random() * 30 + 1;
  }

  draw() {
    ctx.fillStyle = "#00F0FF"; // Cor da partícula (Azul Secundário)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

function init() {
  particles = [];
  // Ajusta a quantidade de "gotas de óleo" no fundo
  for (let i = 0; i < 150; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particles.push(new Particle(x, y));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update();
  }
  requestAnimationFrame(animate);
}

// Redimensionar canvas
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
init();
animate();
// --- Lógica do Pop-up do eBook ---

const modal = document.getElementById("ebook-modal");
const closeBtn = document.querySelector(".close-btn");

// Função para abrir o modal
function openModal() {
  modal.style.display = "flex";
}

// Função para fechar o modal
function closeModal() {
  modal.style.display = "none";
}

// Mostra o pop-up automaticamente após 4 segundos (4000ms)
// Você pode alterar o 4000 para o tempo que preferir
setTimeout(openModal, 4000);

// Fecha ao clicar no X
closeBtn.addEventListener("click", closeModal);

// Fecha ao clicar fora da caixa do modal (no fundo escuro)
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

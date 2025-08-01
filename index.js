// Import Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Three.js variables
let scene, camera, renderer, earth;

// Wait for DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
  // Scroll animation placeholder – expand later with ScrollTrigger or GSAP
  const scrollDownBtn = document.querySelector('.scroll-down');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const droneSection = document.querySelector('#drone-section');
      if (droneSection) {
        droneSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Drone video controls
  const droneVideo = document.querySelector('.drone-wrapper video');
  const playPauseBtn = document.querySelector('.play-pause-btn');
  
  if (droneVideo && playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (droneVideo.paused) {
        droneVideo.play();
        playPauseBtn.textContent = '❚❚';
      } else {
        droneVideo.pause();
        playPauseBtn.textContent = '►';
      }
    });
  }

  // Achievement expand/collapse functionality
  const expandBtn = document.querySelector('.expand-btn');
  const achievementDetails = document.getElementById('achievement-details');
  const container = document.querySelector('.achievement-container');
  
  if (expandBtn && achievementDetails && container) {
    expandBtn.addEventListener('click', () => {
      const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        container.classList.remove('expanded');
        expandBtn.setAttribute('aria-expanded', 'false');
        achievementDetails.setAttribute('aria-hidden', 'true');
        expandBtn.textContent = 'My Achievements ▼';
      } else {
        container.classList.add('expanded');
        expandBtn.setAttribute('aria-expanded', 'true');
        achievementDetails.setAttribute('aria-hidden', 'false');
        expandBtn.textContent = 'My Achievements ▲';
      }
    });
  }

  // Card hover animation
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `scale(1.06) rotateY(${x/24}deg) rotateX(${-y/22}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Initialize Three.js after DOM is loaded
  init();
  animate();
});

function init(){
    // Check if canvas exists
    const canvas = document.getElementById('earth-canvas');
    if (!canvas) {
        console.warn('Canvas element with id "earth-canvas" not found. Three.js will not initialize.');
        return;
    }

    // Scene and Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Earth Geometry and Material
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const texture = new THREE.TextureLoader().load('assets/earth.jpg'); // You need to provide this texture
    const material = new THREE.MeshBasicMaterial({ map: texture });
    earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Add renderer to DOM
    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the earth
    if (earth) {
        earth.rotation.y += 0.005;
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}
  
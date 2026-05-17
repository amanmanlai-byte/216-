// Sakura Effect - 樱花特效
(function() {
  var Sakura = function() {
    var count = 30;
    var sc = document.createElement('canvas');
    sc.style.position = 'fixed';
    sc.style.top = '0';
    sc.style.left = '0';
    sc.style.width = '100%';
    sc.style.height = '100%';
    sc.style.pointerEvents = 'none';
    sc.style.zIndex = '9999';
    document.body.appendChild(sc);
    
    var ctx = sc.getContext('2d');
    var width = window.innerWidth;
    var height = window.innerHeight;
    var particles = [];
    
    sc.width = width;
    sc.height = height;
    
    var particle = function() {
      this.x = Math.random() * width;
      this.y = Math.random() * height + height;
      this.s = Math.random() * 10 + 5;
      this.d = Math.random() * 2 - 1;
      this.r = Math.random() * Math.PI * 2;
      this.ra = Math.random() * 0.02 - 0.01;
      this.vx = Math.random() * 2 - 1;
      this.vy = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    particle.prototype.draw = function() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.r);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#ffb7c5';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.s, this.s * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    
    for (var i = 0; i < count; i++) {
      particles.push(new particle());
    }
    
    this.animate = function() {
      ctx.clearRect(0, 0, width, height);
      for (var i = 0; i < count; i++) {
        var p = particles[i];
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.y / 50) * 0.5;
        p.r += p.ra;
        
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        p.draw();
      }
      requestAnimationFrame(this.animate.bind(this));
    }
    
    this.animate();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      new Sakura();
    });
  } else {
    new Sakura();
  }
})();
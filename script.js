// 音乐控制
const musicBtn = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
    } else {
        bgMusic.play();
        musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// 雪花效果
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    
    // 随机起始位置
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    
    document.getElementById('snowContainer').appendChild(snowflake);
    
    // 动画
    let position = -20;
    let randomSpeed = Math.random() * 1.5 + 0.5;
    let randomSwing = Math.random() * 2 - 1;
    
    function fall() {
        position += randomSpeed;
        let swing = Math.sin(position / 50) * 20 * randomSwing;
        
        snowflake.style.transform = `translateY(${position}px) translateX(${swing}px)`;
        
        if (position < window.innerHeight) {
            requestAnimationFrame(fall);
        } else {
            snowflake.remove();
        }
    }
    
    fall();
}

// 每100ms创建一个新雪花
setInterval(createSnowflake, 100);

// 点击树木的额外效果
document.querySelectorAll('.tree').forEach(tree => {
    tree.addEventListener('click', function() {
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
});

// 添加鼠标跟随效果
const cursor = document.createElement('div');
cursor.classList.add('cursor-effect');
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 平滑的跟随效果
function animate() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.2;
    cursorY += dy * 0.2;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animate);
}

animate();

// 鼠标离开页面时隐藏光晕
document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
});

// 点击效果
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
}); 
(() => {

  const form = document.getElementById('adminForm');

  const statusEl = document.getElementById('status');

  const timeBadge = document.getElementById('timeBadge');

  const usernameEl = document.getElementById('username');

  const passwordEl = document.getElementById('password');

  const captchaCanvas = document.getElementById('captchaCanvas');

  const captchaInputEl = document.getElementById('captchaInput');

  const uHint = document.getElementById('uHint');

  const pHint = document.getElementById('pHint');

  const cHint = document.getElementById('cHint');

  const togglePwd = document.getElementById('togglePwd');

  const refreshCaptcha = document.getElementById('refreshCaptcha');

  const speakCaptcha = document.getElementById('speakCaptcha');

  const forgotLink = document.getElementById('forgotLink');

  const ctx = captchaCanvas.getContext('2d');

  /* DEMO LOGIN */

  const DEMO_USER = 'admin';

  const DEMO_PASS = 'admin123';

  let captchaValue = '';

  /* TIME */

  function updateTime(){

    const now = new Date();

    const time = now.toLocaleTimeString([], {
      hour:'2-digit',
      minute:'2-digit'
    });

    timeBadge.querySelector('span:last-child').textContent = time;
  }

  setInterval(updateTime, 1000);

  updateTime();

  /* STATUS */

  function setStatus(message, type='neutral'){

    statusEl.textContent = message;

    if(type === 'good'){

      statusEl.style.color = '#22c55e';

    }else if(type === 'bad'){

      statusEl.style.color = '#ff6b81';

    }else{

      statusEl.style.color = '#b8c7dc';
    }
  }

  /* HINTS */

  function setHint(el, msg, type){

    el.textContent = msg;

    el.classList.remove('bad','good');

    if(type){
      el.classList.add(type);
    }
  }

  /* RANDOM */

  function rand(min,max){

    return Math.floor(
      Math.random() * (max-min+1)
    ) + min;
  }

  /* CAPTCHA */

  function generateCaptcha(){

    const chars =
    'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    let text = '';

    for(let i=0;i<6;i++){

      text += chars[rand(0, chars.length-1)];
    }

    return text;
  }

  function drawCaptcha(){

    captchaValue = generateCaptcha();

    const w = captchaCanvas.width;

    const h = captchaCanvas.height;

    ctx.clearRect(0,0,w,h);

    /* background */

    const grad =
    ctx.createLinearGradient(0,0,w,h);

    grad.addColorStop(0,'#0f172a');

    grad.addColorStop(1,'#1e3a8a');

    ctx.fillStyle = grad;

    ctx.fillRect(0,0,w,h);

    /* noise */

    for(let i=0;i<25;i++){

      ctx.strokeStyle =
      `rgba(255,255,255,${Math.random()*0.2})`;

      ctx.beginPath();

      ctx.moveTo(rand(0,w),rand(0,h));

      ctx.lineTo(rand(0,w),rand(0,h));

      ctx.stroke();
    }

    /* text */

    for(let i=0;i<captchaValue.length;i++){

      const letter = captchaValue[i];

      ctx.save();

      ctx.font =
      `${rand(24,32)}px Inter`;

      ctx.fillStyle =
      ['#38bdf8','#ffffff','#93c5fd','#dbeafe'][rand(0,3)];

      ctx.translate(
        30 + i*30,
        rand(35,50)
      );

      ctx.rotate(
        rand(-20,20) * Math.PI/180
      );

      ctx.fillText(letter,0,0);

      ctx.restore();
    }

    /* border */

    ctx.strokeStyle =
    'rgba(255,255,255,.15)';

    ctx.strokeRect(0,0,w,h);
  }

  drawCaptcha();

  /* PASSWORD TOGGLE */

  togglePwd.addEventListener('click', () => {

    if(passwordEl.type === 'password'){

      passwordEl.type = 'text';

      togglePwd.textContent = 'Hide';

    }else{

      passwordEl.type = 'password';

      togglePwd.textContent = 'Show';
    }
  });

  /* REFRESH CAPTCHA */

  refreshCaptcha.addEventListener('click', () => {

    drawCaptcha();

    captchaInputEl.value = '';

    setHint(cHint,'',null);

    setStatus('New captcha generated.');
  });

  /* SPEAK CAPTCHA */

  speakCaptcha.addEventListener('click', () => {

    if(!('speechSynthesis' in window)){

      setStatus(
        'Speech not supported.',
        'bad'
      );

      return;
    }

    const speech =
    new SpeechSynthesisUtterance(
      `Captcha is ${captchaValue}`
    );

    speech.rate = 1;

    speech.pitch = 1;

    speech.lang = 'en-IN';

    speechSynthesis.speak(speech);

    setStatus('Reading captcha...');
  });

  /* FORGOT PASSWORD */

  forgotLink.addEventListener('click',(e)=>{

    e.preventDefault();

    setStatus(
      'Demo mode: connect forgot password to backend.'
    );
  });

  /* LOGIN */

  form.addEventListener('submit',(e)=>{

    e.preventDefault();

    let valid = true;

    const username =
    usernameEl.value.trim();

    const password =
    passwordEl.value.trim();

    const captcha =
    captchaInputEl.value.trim().toUpperCase();

    /* username */

    if(username.length < 3){

      setHint(
        uHint,
        'Minimum 3 characters required.',
        'bad'
      );

      valid = false;

    }else{

      setHint(uHint,'','good');
    }

    /* password */

    if(password.length < 6){

      setHint(
        pHint,
        'Minimum 6 characters required.',
        'bad'
      );

      valid = false;

    }else{

      setHint(pHint,'','good');
    }

    /* captcha */

    if(captcha !== captchaValue){

      setHint(
        cHint,
        'Captcha does not match.',
        'bad'
      );

      drawCaptcha();

      captchaInputEl.value = '';

      valid = false;

    }else{

      setHint(cHint,'Captcha verified.','good');
    }

    if(!valid){

      setStatus(
        'Please correct the errors.',
        'bad'
      );

      return;
    }

    /* DEMO LOGIN */

    if(
      username !== DEMO_USER ||
      password !== DEMO_PASS
    ){

      setStatus(
        'Invalid username or password.',
        'bad'
      );

      return;
    }

    /* SUCCESS */

    setStatus(
      'Login successful.',
      'good'
    );

    createConfetti();

    setTimeout(()=>{

     window.location.href = "dashboard.html";
      

    }, 1500);

  });

  /* CONFETTI */

  function createConfetti(){

    const colors = [
      '#38bdf8',
      '#2563eb',
      '#ffffff',
      '#93c5fd'
    ];

    for(let i=0;i<25;i++){

      const confetti =
      document.createElement('div');

      confetti.style.position = 'fixed';

      confetti.style.width = '10px';

      confetti.style.height = '18px';

      confetti.style.background =
      colors[rand(0,colors.length-1)];

      confetti.style.left =
      rand(0,window.innerWidth) + 'px';

      confetti.style.top = '-20px';

      confetti.style.borderRadius = '4px';

      confetti.style.zIndex = '9999';

      document.body.appendChild(confetti);

      const animation =
      confetti.animate(

        [
          {
            transform:'translateY(0) rotate(0deg)',
            opacity:1
          },

          {
            transform:
            `translateY(${window.innerHeight+100}px)
            rotate(${rand(200,600)}deg)`,

            opacity:0
          }
        ],

        {
          duration:rand(1800,3000),

          easing:'ease-out'
        }
      );

      animation.onfinish = () => {
        confetti.remove();
      };
    }
  }

})();
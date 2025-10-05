// Landing Page PMIW - DRIMYS PLANTAS - FRANCISCO RUIZ COM3

//Variables de preimagen (Pagina inicio)

const PATH_ICON   = 'img/Icon_drimys.png';
const PATH_BANNER = 'img/Drimys-Horizontal.png';
const PATH_SEC1   = 'img/slash1.png';
const PATH_SEC2   = 'img/slash2.png';

//Variables de colores y posiciones
const BG='#fbe6c7', TEXT='#36523e', SEP='#b8b1a6';
const NAV_H=80, PAD=32, SECTION_GAP=60;
let BANNER_H;
let IMG_R = 400;

let iconImg,bannerImg,sec1Img,sec2Img;
let SCREEN = 'home';
let menuBoxes = [];


// Preimages
function preload(){
  iconImg   = loadImage(PATH_ICON);
  bannerImg = loadImage(PATH_BANNER);
  sec1Img   = loadImage(PATH_SEC1);
  sec2Img   = loadImage(PATH_SEC2);
}

  //Funcion setup (Aca seteo el tipo de fuente, la densidad de pixeles para que no se vea pixeleada, el canvas que se adapta a la ventana, etc.)
function setup(){
  createCanvas(windowWidth, 1000);
  pixelDensity(5);
  textFont('Arial Rounded MT Bold, Arial');
  noStroke();
  document.body.style.margin='0';
  document.body.style.overflow='auto';
}

function draw(){
  background(BG);
  BANNER_H = constrain(round(windowHeight*0.34), 240, 420);

  // Barra de navegacion
  fill(BG); rect(0,0,width,NAV_H); stroke(SEP); line(0,NAV_H,width,NAV_H); noStroke();
  if(iconImg) image(iconImg, PAD, 14, 40, 40);
  drawNavbar();

  // Cambio entre pantallas
  if (SCREEN === 'home') drawHome();
  else if (SCREEN === 'qa') drawQA();
}
  // Pantalla inicio
function drawHome(){
  drawCover(bannerImg,0,200,width,BANNER_H);


  // Slash de ¿Quienes somos? + Imagen
  let y = NAV_H + BANNER_H + SECTION_GAP ;
  const colW = min(520, width - PAD*2 - (IMG_R+40));
  fill(TEXT); textAlign(LEFT,TOP); textSize(60); textStyle(BOLD);
  text('¿QUIENES SOMOS?', 150, 700);
  const copy1 = 'Drimys es un vivero online con más de un año de experiencia en la venta de plantas e insumos, somos una familia que pone un gran empeño en el proyecto para asegurarnos de que recibas la mejor atención y productos posibles.';
  textSize(22); textStyle(NORMAL);
  const t1Y=y+56; const t1H=textBox(copy1, 160, 770, colW);
  const imgRX = width - PAD - IMG_R, imgRY = y - 20; if(sec1Img)
  image(sec1Img, 900, 600, IMG_R, IMG_R);


  // Slash de Envios a todo arg. + Imagen
  y = max(imgRY+IMG_R, t1Y+t1H) + SECTION_GAP;
  const imgLX = PAD, imgLY = y - 40; if(sec2Img)
  image(sec2Img, 150, 1000, IMG_R, IMG_R);
  fill(TEXT); textAlign(LEFT,TOP); textSize(60); textStyle(BOLD);
  const txtX = imgLX + IMG_R + 40, colW2 = width - txtX - PAD;
  text('ENVIOS A TODO ARG.', 618, 1070);
  const copy2 = 'Contamos con la posibilidad de hacer envíos a todo el país, por lo que no importa donde vivas, siempre vas a poder acceder a nuestro catálogo y conseguir todo lo que necesites.';
  textSize(20); textStyle(NORMAL);
  const t2H = textBox(copy2, 620, 1130, 500);

  const contentBottom = max(imgLY+IMG_R, y+56+t2H) + 450;
  ensureCanvasHeight(contentBottom);
}


  // Pantalla de preguntas y respuestas
function drawQA(){
  
  // Banner superior
  drawCover(bannerImg, 0, 200, width, BANNER_H);

  // Preguntas y respuestas
  const QA = [
    {
      q: '¿CUÁNTO TARDA EL ENVÍO?',
      a: 'Los tiempos de entrega pueden variar según el tipo de planta y la ubicación del comprador, pero no suelen tardar mucho más de una semana.'
    },
    {
      q: '¿MANDAN A DOMICILIO?',
      a: 'Realizamos envíos a domicilio a La Plata y alrededores, pero los que sean a una mayor distancia, se hacen mediante correo.'
    },
    {
      q: '¿TIENEN LOCAL FÍSICO?',
      a: 'Aún no contamos con local físico, es un objetivo que tenemos a futuro, pero por el momento solo contamos con servicio online y envíos a todo el país.'
    }
  ];

  let y = NAV_H + BANNER_H + SECTION_GAP + 350;
  const leftX = 120;
  const wText = min(700, width - leftX*2);

  for (let i = 0; i < QA.length; i++){
    fill(TEXT); textAlign(LEFT,TOP); textSize(46); textStyle(BOLD);
    text(QA[i].q, leftX, y);

    textSize(22); textStyle(NORMAL);
    const usedH = textBox(QA[i].a, leftX, y + 60, wText);
    y += 60 + usedH + 80;
  }

  const contentBottom = y + 350;
  ensureCanvasHeight(contentBottom);
}

  //Función que hace interactivos los botones de la barra de navegación
function drawNavbar(){
  fill(TEXT); textAlign(LEFT,CENTER); textSize(16); textStyle(BOLD);
  const cy= NAV_H/2;
  menuBoxes = [
    {label:'INICIO',      x: PAD+60,  y: cy, w: textWidth('INICIO'),      h: 24},
    {label:'CONTACTANOS', x: PAD+150, y: cy, w: textWidth('CONTACTANOS'), h: 24},
    {label:'Q&A',         x: PAD+320, y: cy, w: textWidth('Q&A'),         h: 24},
  ];
  for (const b of menuBoxes){
    text(b.label, b.x, b.y);
  }
  const over = menuBoxes.find(b=> mouseX>=b.x && mouseX<=b.x+b.w && Math.abs(mouseY-b.y)<=b.h/2 );
  document.body.style.cursor = over ? 'pointer' : 'default';
}

function mousePressed(){
  const hit = menuBoxes.find(b=> mouseX>=b.x && mouseX<=b.x+b.w && Math.abs(mouseY-b.y)<=b.h/2 );
  if(!hit) return;
  if(hit.label==='INICIO') SCREEN='home';
  if(hit.label==='Q&A')    SCREEN='qa';
}

  ≈
function windowResized(){
  resizeCanvas(windowWidth, height);
}

function drawCover(img,x,y,w,h){
  if(!img){ fill('#355941'); rect(x,y,w,h); return; }
  const s=max(w/img.width, h/img.height);
  const dw=img.width*s, dh=img.height*s;
  image(img, x+(w-dw)/2, y+(h-dh)/2, dw, dh);
}

function textBox(txt, x, y, w){
  const leading = textSize()*1.35;
  text(txt, x, y, w);
  const avgChar = textSize()*0.58;
  const lines = ceil(txt.length / max(1, floor(w/avgChar)));
  return lines*leading;
}
  //Reajusta el canvas para que no se corte ningun texto/foto
function ensureCanvasHeight(targetH){
  if (height !== targetH){
    resizeCanvas(windowWidth, targetH);
  }
}

  // Barra verde inferior

  // VARIABLES GENERALES
const PATH_FOOTER_BG = 'img/footer_bg.png';
const PATH_IG        = 'img/ig.png';
const PATH_FB        = 'img/fb.png';

const FOOTER_H = 110;
const FOOTER_TEXT = '#e2bd86';

let footerBgImg, igImg, fbImg;

const __preload_footer__ = (()=>{
  const oldPreload = preload;
  preload = function(){
    oldPreload();
    footerBgImg = loadImage(PATH_FOOTER_BG);
    igImg       = loadImage(PATH_IG);
    fbImg       = loadImage(PATH_FB);
  }
})();

  // Coloca la barra inferior
const __draw_footer__ = (()=>{
  const oldDraw = draw;
  draw = function(){
    oldDraw();
    let yFooter = height - 120 + 10;
    if (footerBgImg) {
      const w = width, h = FOOTER_H;
      const s = Math.max(w/footerBgImg.width, h/footerBgImg.height);
      const dw = footerBgImg.width*s, dh = footerBgImg.height*s;
      image(footerBgImg, (w-dw)/2, yFooter+(h-dh)/2, dw, dh);
    }
    
    // Agrega los textos e iconos de redes sociales
    noStroke(); fill(FOOTER_TEXT);
    textAlign(LEFT, TOP); textStyle(BOLD); textSize(24);
    text('CONTACTANOS', 40, yFooter - 70);
    textStyle(NORMAL); textSize(22);
    text('+54 9 221 605-9856', 40, yFooter - 40);
    const iconSize = 28;
    const igX = 40, igY = yFooter + FOOTER_H - iconSize - 14;
    const fbX = igX + iconSize + 14, fbY = igY;
    if (igImg) image(igImg, igX, igY-70, iconSize, iconSize);
    if (fbImg) image(fbImg, fbX, fbY-70, iconSize-10, iconSize);
  }
})();

  // Pantalla de "Contactanos"

  //VARIABLES Y PREIMAGES
const PATH_MAIL_BIG = 'img/mail_big.png';
const PATH_IG_BIG   = 'img/instagram_big.png';
const PATH_FB_BIG   = 'img/facebook_big.png';
let mailBigImg, igBigImg, fbBigImg;

const __preload_contact__ = (() => {
  const oldPreload = preload;
  preload = function () {
    oldPreload();
    mailBigImg = loadImage(PATH_MAIL_BIG);
    igBigImg   = loadImage(PATH_IG_BIG);
    fbBigImg   = loadImage(PATH_FB_BIG);
  };
})();

  // cambiar a la pantalla "contact"
const __mouse_contact__ = (() => {
  const oldMouse = mousePressed || function(){};
  mousePressed = function () {
    
  // Si se apreta click en el texto de "Contactanos" de la barra de navegación, se abre la pantalla.
    const hit = (menuBoxes || []).find(b =>
      mouseX >= b.x && mouseX <= b.x + b.w && Math.abs(mouseY - b.y) <= b.h / 2
    );
    if (hit && hit.label === 'CONTACTANOS') { SCREEN = 'contact'; return; }
    oldMouse();
  };
})();

  //Pantalla CONTACTANOS
  const __draw_contact__ = (() => {
  const oldDraw = draw;
  draw = function () {
    if (SCREEN !== 'contact') { oldDraw(); return; }

    background(BG);
    BANNER_H = constrain(round(windowHeight * 0.34), 240, 420);

    // Barra de navegación duplicada para que no interfiera con la de las otras pantallas
    fill(BG); rect(0,0,width,NAV_H); stroke(SEP); line(0,NAV_H,width,NAV_H); noStroke();
    if (iconImg) image(iconImg, PAD, 14, 40, 40);
    drawNavbar();

    // Banner
    drawCover(bannerImg, 0, 200, width, BANNER_H);

    // VARIABLES PARA LOS CONTACTOS
    const leftIconX = 120;          
    const rowStartY = NAV_H + BANNER_H + SECTION_GAP + 220; 
    const rowGap    = 170;          
    const iconSize  = 120;          
    const textX     = leftIconX + iconSize + 40; 

    // GMAIL
    if (mailBigImg) image(mailBigImg, leftIconX-10, rowStartY, iconSize+20, iconSize);
    fill(TEXT); textAlign(LEFT, CENTER); textStyle(BOLD);
    textSize(56); text('VENTAS@DRIMYS.COM.AR', textX, rowStartY + iconSize/2);

    // INSTAGRAM
    const y2 = rowStartY + rowGap;
    if (igBigImg) image(igBigImg, leftIconX, y2, iconSize, iconSize);
    textSize(56); text('@DRIMYSPLANTAS', textX, y2 + iconSize/2);

    // FACEBOOK
    const y3 = rowStartY + rowGap*2;
    const fbSize = 110;
    if (fbBigImg) image(fbBigImg, leftIconX + 6, y3 + 5, fbSize-20, fbSize);
    textSize(48); text('DRIMYSPLANTAS', textX, y3 + fbSize/2 + 5);

    // Altura total y scroll
    const contentBottom = y3 + fbSize + 260; 
    ensureCanvasHeight(contentBottom);

    //Aca también duplique la barra inferior verde para que no se mezcle con la de las otras 2 paginas, aunque cumple la misma función que la pagina en general (contactar a Drimys).
    let yFooter = height - 120 + 10;
    if (typeof footerBgImg !== 'undefined' && footerBgImg) {
      const w = width, h = FOOTER_H;
      const s = Math.max(w / footerBgImg.width, h / footerBgImg.height);
      const dw = footerBgImg.width * s, dh = footerBgImg.height * s;
      image(footerBgImg, (w - dw) / 2, yFooter + (h - dh) / 2, dw, dh);
    }
    noStroke(); fill(FOOTER_TEXT);
    textAlign(LEFT, TOP); textStyle(BOLD); textSize(24);
    text('CONTACTANOS', 40, yFooter - 70);
    textStyle(NORMAL); textSize(22);
    text('+54 9 221 605-9856', 40, yFooter - 40);
    const small = 28, igX = 40, igY = yFooter + FOOTER_H - small - 14;
    const fbX = igX + small + 14;
    if (typeof igImg !== 'undefined' && igImg) image(igImg, igX, igY - 70, small, small);
    if (typeof fbImg !== 'undefined' && fbImg) image(fbImg, fbX, igY - 70, small - 10, small);
  };
})();

// Función que hace interactivos a los botones de IG y FB de la barra inferior verde

function mousePressed(){
  const hit = menuBoxes.find(b=> mouseX>=b.x && mouseX<=b.x+b.w && Math.abs(mouseY-b.y)<=b.h/2 );
  if(hit){
    if(hit.label==='INICIO') SCREEN='home';
    if(hit.label==='Q&A')    SCREEN='qa';
    if(hit.label==='CONTACTANOS') SCREEN='contact';
  }

  const iconSize = 28;
  const igX = 40, igY = height - 120 + 10 + FOOTER_H - iconSize - 84;
  const fbX = igX + iconSize + 14, fbY = igY;

  // Redirección INSTAGRAM
  if (mouseX > igX && mouseX < igX + iconSize && mouseY > igY && mouseY < igY + iconSize) {
    window.open("https://www.instagram.com/drimysplantas/", "_blank");
  }

  // Redirección FACEBOOK
  if (mouseX > fbX && mouseX < fbX + iconSize && mouseY > fbY && mouseY < fbY + iconSize) {
    window.open("https://www.facebook.com/people/Drimys-Plantas/61578381664437/", "_blank");
  }
}

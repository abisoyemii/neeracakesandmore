(function(){
/* ===== EDIT HERE: owner's WhatsApp number (country code + number, digits only) ===== */
var WA='14709626866';
/* ===== EDIT HERE: products. price: number in USD, or null = "price on request". SAMPLE PRICES, replace before going live. ===== */
var PRODUCTS=[
 {id:'puff',name:'Puff-Puff',unit:'Tray of 50',price:30,img:'images/small-chops/small-chops-02.jpg',desc:'Soft, golden and freshly fried.'},
 {id:'samosa',name:'Samosas',unit:'Tray of 30',price:45,img:'images/hero/small-chops-hero.jpg',desc:'Crisp pastry, generously filled.'},
 {id:'roll',name:'Spring Rolls',unit:'Tray of 30',price:45,img:'images/small-chops/small-chops-01.jpg',desc:'Crunchy rolls, party-ready.'},
 {id:'mix',name:'Small Chops Platter',unit:'Mixed platter',price:85,img:'images/small-chops/small-chops-02.jpg',desc:'Puff-puff, samosas and spring rolls together.'},
 {id:'cake',name:'Celebration Cake',unit:'Custom',price:null,img:'images/cakes/cake1.jpg',desc:'Designed for your occasion. Tell us the size, flavour and date.'},
 {id:'cater',name:'Event Catering',unit:'Quote',price:null,img:'images/hero/small-chops-hero.jpg',desc:'Finger foods and small chops for weddings, birthdays and more.'}
];
var IMAGES={
 'banner.about':'images/hero/small-chops-hero.jpg','banner.services':'images/hero/small-chops-hero.jpg','banner.menu':'images/hero/small-chops-hero.jpg','banner.gallery':'images/small-chops/small-chops-01.jpg','banner.faq':'images/small-chops/small-chops-02.jpg','banner.contact':'images/hero/small-chops-hero.jpg',
 'about.portrait':'images/small-chops/small-chops-01.jpg','svc.smallchops':'images/small-chops/small-chops-01.jpg','svc.finger':'images/small-chops/small-chops-02.jpg','svc.cakes':'images/cakes/cake1.jpg','svc.catering':'images/hero/small-chops-hero.jpg',
 'gallery.1':'images/small-chops/small-chops-01.jpg','gallery.2':'images/small-chops/small-chops-02.jpg','gallery.3':'images/cakes/cake1.jpg','gallery.4':'images/cakes/cake2.jpg','gallery.5':'images/cakes/cake3.jpg','gallery.6':'images/cakes/cake4.jpg','gallery.7':'images/hero/small-chops-hero.jpg','gallery.8':'images/small-chops/small-chops-01.jpg','gallery.9':'images/small-chops/small-chops-02.jpg','gallery.10':'images/cakes/cake1.jpg','gallery.11':'images/cakes/cake2.jpg','gallery.12':'images/cakes/cake3.jpg'
};
[].forEach.call(document.querySelectorAll('[data-img]'),function(i){var src=IMAGES[i.getAttribute('data-img')];if(!src)return;i.src=src;i.addEventListener('error',function(){if(i.hasAttribute('data-opt')){var parent=i.parentNode;if(parent&&parent.classList.contains('fr'))parent.parentNode.removeChild(parent);else if(i.parentNode)i.parentNode.removeChild(i)}})});
var K='neera_cart',R='neera_req',mem={};
function rd(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return mem[k]||null}}
function wr(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){mem[k]=v}}
function cart(){return rd(K)||{}}
function save(c){wr(K,c);badge()}
function n(){var c=cart(),t=0;for(var k in c)t+=c[k];return t}
function badge(){[].forEach.call(document.querySelectorAll('.cc'),function(e){var t=n();e.textContent=t;e.style.display=t?'inline-block':'none'})}
function $(q){return document.querySelector(q)}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function money(v){return '$'+v.toFixed(2).replace(/\.00$/,'')}
function P(id){return PRODUCTS.filter(function(p){return p.id===id})[0]}
function pic(p){var w=el('div','ph'),i=el('img');i.src=p.img;i.alt=p.name;i.loading='lazy';w.appendChild(i);return w}
/* menu page */
var mg=$('#products');
if(mg)PRODUCTS.forEach(function(p){var c=el('article','card rv'),b=el('div','bd'),r=el('div','row');
 r.appendChild(el('h3',0,p.name));r.appendChild(el('span','price',p.price==null?'On request':money(p.price)));
 b.appendChild(r);b.appendChild(el('p',0,p.unit+' · '+p.desc));
 var a=el('button','btn',p.price==null?'Add to request':'Add to cart');a.type='button';
 a.onclick=function(){var k=cart();k[p.id]=(k[p.id]||0)+1;save(k);a.textContent='Added ✓';setTimeout(function(){a.textContent=p.price==null?'Add to request':'Add to cart'},1200)};
 b.appendChild(a);c.appendChild(pic(p));c.appendChild(b);mg.appendChild(c)});
/* cart page */
var box=$('#cart');
function total(){var c=cart(),s=0,q=false;for(var k in c){var p=P(k);if(!p)continue;if(p.price==null)q=true;else s+=p.price*c[k]}return{s:s,q:q}}
function draw(){
 if(!box)return;box.textContent='';var c=cart(),ids=Object.keys(c).filter(function(k){return P(k)&&c[k]>0});
 var rq=rd(R);
 if(rq){var nt=el('div','note ok');nt.appendChild(el('b',0,'Request '+rq.code+' sent. '));nt.appendChild(document.createTextNode('Waiting for Neera\u2019s go-ahead on WhatsApp. Nothing has been charged. Once she approves, she will send you the payment details and confirm your date.'));box.appendChild(nt)}
 if(!ids.length){box.appendChild(el('p','lead','Your cart is empty.'));var l=el('a','btn','Browse the menu');l.href='menu.html';l.style.marginTop='24px';box.appendChild(l);$('#fw').style.display='none';return}
 $('#fw').style.display='';
 ids.forEach(function(k){var p=P(k),ln=el('div','line'),th=el('div','th'),im=el('img');im.src=p.img;im.alt=p.name;th.appendChild(im);
  var m=el('div');m.appendChild(el('h3',0,p.name));m.appendChild(el('p',0,p.unit));
  var q=el('div','qty'),mi=el('button',0,'−'),pl=el('button',0,'+');mi.type=pl.type='button';mi.setAttribute('aria-label','Less');pl.setAttribute('aria-label','More');
  mi.onclick=function(){var x=cart();x[k]=Math.max(0,x[k]-1);if(!x[k])delete x[k];save(x);draw()};pl.onclick=function(){var x=cart();x[k]++;save(x);draw()};
  q.appendChild(mi);q.appendChild(el('span',0,c[k]));q.appendChild(pl);m.appendChild(q);
  var rm=el('button','rm','Remove');rm.type='button';rm.onclick=function(){var x=cart();delete x[k];save(x);draw()};m.appendChild(rm);
  ln.appendChild(th);ln.appendChild(m);ln.appendChild(el('span','price',p.price==null?'On request':money(p.price*c[k])));box.appendChild(ln)});
 var t=total(),tt=el('div','total');tt.appendChild(el('span',0,t.q?'Estimated total (+ items on request)':'Estimated total'));tt.appendChild(el('span','price',money(t.s)));box.appendChild(tt)}
var f=$('#f');
if(f)f.onsubmit=function(e){e.preventDefault();var c=cart(),ids=Object.keys(c).filter(function(k){return P(k)});if(!ids.length)return;
 var d=new FormData(f),code='NC-'+Math.floor(1000+Math.random()*9000),t=total();
 var L=['New order request '+code,'Name: '+d.get('name'),'Phone: '+(d.get('phone')||'-'),'Date needed: '+(d.get('date')||'-'),'Pickup or delivery: '+d.get('mode'),'','Items:'];
 ids.forEach(function(k){var p=P(k);L.push('- '+c[k]+' x '+p.name+' ('+p.unit+') '+(p.price==null?'price on request':money(p.price*c[k])))});
 L.push('','Estimated total: '+money(t.s)+(t.q?' + items on request':''),'Notes: '+(d.get('notes')||'-'),'','Please confirm availability. Thank you!');
 wr(R,{code:code,time:Date.now()});draw();
 window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(L.join('\n')),'_blank','noopener')};
var cl=$('#clear');if(cl)cl.onclick=function(){save({});wr(R,null);draw()};
/* shared: menu, reveals, badge */
var bg=$('.burger');if(bg){var H=document.documentElement;bg.onclick=function(){var o=!H.classList.contains('menu-open');H.classList.toggle('menu-open',o);document.body.classList.toggle('menu-open',o);bg.setAttribute('aria-expanded',o)}}
badge();draw();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.1});
setTimeout(function(){[].forEach.call(document.querySelectorAll('.rv'),function(e){io.observe(e)})},0);
})();

(function(){
/* ===== EDIT HERE: owner's WhatsApp number (country code + number, digits only) ===== */
var WA='14709626866';
/* ===== EDIT HERE: products. price: number in USD, or null = "price on request". SAMPLE PRICES, replace before going live. ===== */
var PRODUCTS=[
 {id:'roll',name:'Spring Rolls',unit:'3',price:20,displayPrice:'$20/3',desc:'Crisp, crunchy and ready to share.'},
 {id:'samosa',name:'Samosas',unit:'3',price:24,displayPrice:'$24/3',desc:'Seasoned pastry filled for every occasion.'},
 {id:'shrimp-mayo',name:'Shrimp in Mayo Roll',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'shrimp-tempura',name:'Shrimp Tempura',unit:'Order on request',price:null,displayPrice:'On request',video:'images/shrimp-only.mp4',desc:'Request pricing on WhatsApp.'},
 {id:'mini-meat-pie',name:'Mini Size Meat Pie',unit:'Order on request',price:null,displayPrice:'On request',img:'images/small-chops/meatpie.PNG',desc:'Request pricing on WhatsApp.'},
 {id:'corn',name:'Corn on Cob',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'egg-roll',name:'Egg Rolls',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'meat-pie',name:'Meat Pie',unit:'Order on request',price:null,displayPrice:'On request',img:'images/small-chops/meatpie.PNG',desc:'Request pricing on WhatsApp.'},
 {id:'chicken-kebab',name:'Chicken Kebab',unit:'Dozen',price:42,displayPrice:'$42/dozen',desc:'Tender chicken kebabs.'},
 {id:'beef-kebab',name:'Beef Kebab',unit:'Dozen',price:42,displayPrice:'$42/dozen',desc:'Seasoned beef kebabs.'},
 {id:'gizzard-kebab',name:'Gizzard Kebab',unit:'Dozen',price:42,displayPrice:'$42/dozen',desc:'Gizzard kebabs, newly available.'},
 {id:'mini-chicken-burger',name:'Mini Chicken Burger',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'mini-beef-burger',name:'Mini Beef Burger',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'shawarma',name:'Shawarma',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'suya',name:'Nigerian Suya',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'puff-puff',name:'Puff-Puff',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'fries',name:'Fries',unit:'Quote',price:null,displayPrice:'On request',desc:'Minimum order: 20. On-the-spot frying is available for $300. Request pricing on WhatsApp.'},
 {id:'fried-yam',name:'Fried Yam',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'grilled-fish',name:'Grilled Fish',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'turkey',name:'Turkey',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'chicken',name:'Chicken',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'beef',name:'Beef',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
 {id:'cocktail',name:'Cocktail',unit:'Each',price:7,displayPrice:'$7',img:'images/cakes/WhatsApp Image 2026-09-25 at 10.14.40.jpeg',desc:'Minimum order: 20.'},
 {id:'mocktail',name:'Mocktail',unit:'Each',price:7,displayPrice:'$7',img:'images/cakes/WhatsApp Image 2026-09-25 at 10.33.46.jpeg',desc:'Minimum order: 20.'},
{id:'fruit-cup',name:'Fruit Cup',unit:'3oz / 5oz',price:null,displayPrice:'$2.50 (3oz) / $3.50 (5oz)',desc:'Available in 3 oz and 5 oz sizes.'},
 {id:'combo-1',name:'Combo 1',unit:'Combo',price:6,displayPrice:'$6',img:'images/small-chops/small-chops-01.jpg',desc:'Spring roll, samosa and 3 puff-puff.'},
 {id:'combo-2',name:'Combo 2',unit:'Combo',price:9.5,displayPrice:'$9.50',img:'images/small-chops/small-chops-01.jpg',desc:'Combo 1 plus your choice of gizzard, chicken or beef kebab.'},
 {id:'party',name:'Party Pack',unit:'Custom mix',price:null,displayPrice:'Quote',img:'images/small-chops/small-chops-02.jpg',desc:'Choose your mix of bites for the party.'},
 {id:'combo',name:'Customize Your Own Combo',unit:'Custom mix',price:null,displayPrice:'Quote',img:'images/small-chops/small-chops-01.jpg',desc:'Tell us exactly which bites and quantities you want.'},
 {id:'cake',name:'Celebration Cake',unit:'Custom',price:null,displayPrice:'On request',img:'images/cakes/cake1.jpg',desc:'Tell us the size, flavour, design and date.'},
 {id:'cater',name:'Event Catering',unit:'Quote',price:null,displayPrice:'On request',desc:'Private events, church gatherings and corporate functions.'},
 {id:'lux',name:'Luxury Set-Up',unit:'Quote',price:null,displayPrice:'On request',desc:'Inquire about our luxury setup options.'}
];
var IMAGES={
 'banner.about':'images/cakes/WhatsApp Image 2026-09-25 at 10.14.40.jpeg','banner.services':'images/cakes/WhatsApp Image 2026-09-25 at 10.33.46.jpeg','banner.menu':'images/small-chops/small-chops-01.jpg','banner.gallery':'images/small-chops/small-chops-02.jpg','banner.faq':'images/cakes/cake4.jpg','banner.contact':'images/cakes/cake3.jpg',
 'about.portrait':'images/small-chops/small-chops-01.jpg','luxsetup.portrait':'images/hero/small-chops-hero.jpg','banner.luxsetup':'images/hero/small-chops-hero.jpg','svc.smallchops':'images/small-chops/small-chops-01.jpg','svc.finger':'images/small-chops/small-chops-02.jpg','svc.cakes':'images/cakes/cake1.jpg','svc.catering':'images/cakes/WhatsApp Image 2026-09-25 at 10.33.46.jpeg','svc.luxe':'images/hero/small-chops-hero.jpg',
 'gallery.1':'images/small-chops/small-chops-01.jpg','gallery.2':'images/small-chops/small-chops-02.jpg','gallery.3':'images/cakes/cake1.jpg','gallery.4':'images/cakes/cake2.jpg','gallery.5':'images/cakes/cake3.jpg','gallery.6':'images/cakes/cake4.jpg','gallery.7':'images/hero/small-chops-hero.jpg','gallery.8':'images/small-chops/small-chops-01.jpg','gallery.9':'images/small-chops/small-chops-02.jpg','gallery.10':'images/cakes/cake1.jpg','gallery.11':'images/cakes/cake2.jpg','gallery.12':'images/cakes/cake3.jpg'
};
[].forEach.call(document.querySelectorAll('[data-img]'),function(i){var key=i.getAttribute('data-img'),src=IMAGES[key];if(!src)return;i.loading=key.indexOf('banner.')===0?'eager':'lazy';i.decoding='async';i.src=src;i.addEventListener('error',function(){if(i.hasAttribute('data-opt')){var parent=i.parentNode;if(parent&&parent.classList.contains('fr'))parent.parentNode.removeChild(parent);else if(i.parentNode)i.parentNode.removeChild(i)}})});
[].forEach.call(document.querySelectorAll('source[src*="images/video/"]'),function(s){var old=s.getAttribute('src'),next=old.indexOf('shrimp')>-1?'images/shrimp-only.mp4':'images/fourthvid-web.mp4';s.setAttribute('src',next);if(s.parentNode&&s.parentNode.load)s.parentNode.load()});
function addNavLink(){[].forEach.call(document.querySelectorAll('nav ul,#menu'),function(n){if(n.querySelector('a[href="luxsetup.html"]'))return;var a=document.createElement('a');a.href='luxsetup.html';a.textContent='Lux Set-Up';if(n.tagName.toLowerCase()==='ul'){var li=document.createElement('li');li.appendChild(a);n.insertBefore(li,n.firstChild)}else n.insertBefore(a,n.firstChild)})}
addNavLink();
var savedTheme;try{savedTheme=localStorage.getItem('nc-theme')}catch(e){}if(savedTheme==='light'||savedTheme==='dark')document.documentElement.setAttribute('data-theme',savedTheme);
function addThemeToggle(){var nav=document.querySelector('nav');if(!nav||nav.querySelector('.theme-toggle'))return;var b=document.createElement('button');b.className='theme-toggle';b.type='button';b.setAttribute('aria-label','Switch to light theme');b.innerHTML='<span aria-hidden="true">☾</span>';function update(){var dark=document.documentElement.getAttribute('data-theme')!=='light';b.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');b.innerHTML='<span aria-hidden="true">'+(dark?'☼':'☾')+'</span>'}b.onclick=function(){var next=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';document.documentElement.setAttribute('data-theme',next);try{localStorage.setItem('nc-theme',next)}catch(e){}update()};var burger=nav.querySelector('.burger');if(burger)nav.insertBefore(b,burger);else nav.appendChild(b);update()}
addThemeToggle();
[].forEach.call(document.querySelectorAll('footer:not(.inquire)'),function(f){f.className='inquire';f.id='inquire';f.innerHTML='<h2 class="rv">A Taste to Remember</h2><a class="btn rv" href="cart.html">Order / Inquire</a><div class="contact rv"><a href="tel:+14709626866">+1 (470) 962-6866</a><a href="https://www.instagram.com/neeracakesandmore" target="_blank" rel="noopener">Instagram @neeracakesandmore</a><a href="https://www.tiktok.com/@neeracakesandmore" target="_blank" rel="noopener">TikTok @neeracakesandmore</a></div><a class="brand" href="index.html#top" aria-label="NeeraCakesAndMore"><img class="logo" src="images/neeralogo.png" alt="NeeraCakesAndMore logo"><span class="wm" style="display:none">NeeraCakesAndMore</span><span class="tag">A TASTE TO REMEMBER</span></a><small>© 2026 NeeraCakesAndMore. Cakes, small chops and finger foods.</small>';});
[].forEach.call(document.querySelectorAll('p'),function(p){if(p.textContent.indexOf('Pickup or delivery')>-1)p.textContent=p.textContent.replace('Pickup or delivery','Pickup')});
[].forEach.call(document.querySelectorAll('details'),function(d){var s=d.querySelector('summary'),p=d.querySelector('p');if(s&&s.textContent.indexOf('pickup or delivery')>-1){s.textContent='Do you offer delivery?';if(p)p.textContent='No. Orders are pickup only.'}});
[].forEach.call(document.querySelectorAll('details'),function(d){var s=d.querySelector('summary'),p=d.querySelector('p');if(s&&s.textContent.indexOf('How early')>-1){s.textContent='How early should I order?';if(p)p.textContent='A minimum of 48 hours is required.'}});
var menuLead=document.querySelector('#products')&&document.querySelector('.lead');if(menuLead)menuLead.textContent='Customize your own combo, choose a party pack, or request a custom cake, cocktail hour or event catering quote. A minimum of 48 hours is required; delivery and setup options are available by request.';
var serviceTitle=document.querySelector('.bt h1');if(serviceTitle&&serviceTitle.textContent.trim()==='Services'){var serviceMain=document.querySelector('main.pg.tight'),serviceEnd=serviceMain&&serviceMain.querySelector('h2[style]');if(serviceMain&&serviceEnd){var row=document.createElement('div');row.className='row2';row.innerHTML='<div class="fr rv"><img src="images/hero/small-chops-hero.jpg" alt="Cocktail hour catering"></div><div class="rv"><h2>Cocktail Hour</h2><p>Curated small chops and finger foods for cocktail hours, private events, church gatherings and corporate functions.</p><a class="btn" href="menu.html">Plan cocktail hour</a></div>';serviceMain.insertBefore(row,serviceEnd)}}
var faqMain=document.querySelector('main.pg.tight');if(faqMain&&document.querySelector('.bt h1')&&document.querySelector('.bt h1').textContent.trim()==='FAQ'){[['How much notice do I need?','A minimum of 48 hours is required. Earlier notice is recommended for cakes, cocktail hour and luxury setup requests.'],['Do you offer delivery?','No. Orders are pickup only.'],['How does the deposit work?','A 50% nonrefundable deposit is required after Neera confirms availability and you agree to reserve the date.'],['Where are you based?','Based in Atlanta, Georgia. Serving clients locally and beyond; travel is available for events.']].forEach(function(item){var d=document.createElement('details');d.className='rv';d.innerHTML='<summary>'+item[0]+'</summary><p>'+item[1]+'</p>';faqMain.appendChild(d)})}
if(faqMain&&document.querySelector('.bt h1')&&document.querySelector('.bt h1').textContent.trim()==='FAQ'){var seen={};[].forEach.call(faqMain.querySelectorAll('details'),function(d){var s=d.querySelector('summary'),p=d.querySelector('p'),title=s?s.textContent.replace(/\s*\+\s*$/,'').trim():'';if(title==='How much notice do I need?'){d.parentNode.removeChild(d);return}if(seen[title]){d.parentNode.removeChild(d);return}seen[title]=true;if(title==='How early should I order?'){p.textContent='A minimum of 48 hours is required.'}if(title==='Do you offer delivery?'){p.textContent='No. Orders are pickup only.'}if(title==='Do I pay when I send a request?'){p.textContent='No payment is taken when you send a request. A 50% nonrefundable deposit is required after availability is confirmed to reserve your date.'}if(title==='Where are you based?'){p.textContent='Based in Atlanta, Georgia. Serving clients locally and beyond; travel is available for events.'}})}
[].forEach.call(document.querySelectorAll('p'),function(p){p.textContent=p.textContent.replace(/50% nonrefundable/g,'20% nonrefundable')});
var contactMain=document.querySelector('main.pg.tight'),contactTitle=document.querySelector('.bt h1');if(contactMain&&contactTitle&&contactTitle.textContent.trim()==='Contact'){var area=document.createElement('p');area.className='service-area';area.textContent='Based in Atlanta, Georgia | Serving clients locally & beyond - travel available for events.';contactMain.appendChild(area)}
if(serviceTitle&&serviceTitle.textContent.trim()==='Services'&&serviceMain){var policy=document.createElement('p');policy.className='service-area';policy.textContent='A minimum of 48 hours is required. Travel is available for events. Inquire about our luxury setup options.';serviceMain.insertBefore(policy,serviceMain.querySelector('h2[style]'))}
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
function priceLabel(p){return p.displayPrice||(p.price==null?'On request':money(p.price))}
function P(id){return PRODUCTS.filter(function(p){return p.id===id})[0]}
function pic(p){var w=el('div','ph');if(p.video){var v=el('video','media-video');v.src=p.video;v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.preload='metadata';v.setAttribute('aria-label',p.name);w.appendChild(v);return w}if(p.img){var i=el('img');i.src=p.img;i.alt=p.name;i.loading='lazy';w.appendChild(i);return w}w.className+=' empty';w.setAttribute('aria-hidden','true');return w}
/* menu page */
var mg=$('#products');
if(mg)PRODUCTS.forEach(function(p){var c=el('article','card rv'),b=el('div','bd'),r=el('div','row');
 r.appendChild(el('h3',0,p.name));r.appendChild(el('span','price',priceLabel(p)));
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
 ids.forEach(function(k){var p=P(k),ln=el('div','line'),th=el('div','th'),im;if(p.img){im=el('img');im.src=p.img;im.alt=p.name;th.appendChild(im)}else if(p.video){im=el('video','media-video');im.src=p.video;im.muted=true;im.loop=true;im.autoplay=true;im.playsInline=true;im.preload='metadata';im.setAttribute('aria-label',p.name);th.appendChild(im)}else{th.className+=' empty';th.setAttribute('aria-label',p.name+' image coming soon')}
  var m=el('div');m.appendChild(el('h3',0,p.name));if(p.unit&&p.unit!=='Order on request')m.appendChild(el('p',0,p.unit));
  var q=el('div','qty'),mi=el('button',0,'−'),pl=el('button',0,'+');mi.type=pl.type='button';mi.setAttribute('aria-label','Less');pl.setAttribute('aria-label','More');
  mi.onclick=function(){var x=cart();x[k]=Math.max(0,x[k]-1);if(!x[k])delete x[k];save(x);draw()};pl.onclick=function(){var x=cart();x[k]++;save(x);draw()};
  q.appendChild(mi);q.appendChild(el('span',0,c[k]));q.appendChild(pl);m.appendChild(q);
  var rm=el('button','rm','Remove');rm.type='button';rm.onclick=function(){var x=cart();delete x[k];save(x);draw()};m.appendChild(rm);
     ln.appendChild(th);ln.appendChild(m);ln.appendChild(el('span','price',p.price==null?'Quote pending':money(p.price*c[k])));box.appendChild(ln)});
   var t=total(),tt=el('div','total');tt.appendChild(el('span',0,t.q?'Priced items subtotal':'Estimated total'));tt.appendChild(el('span','price',money(t.s)));box.appendChild(tt)}
var f=$('#f');
if(f){var dateField=f.querySelector('input[name="date"]'),minDate=new Date();minDate.setDate(minDate.getDate()+2);if(dateField)dateField.min=minDate.toISOString().slice(0,10)}
if(f)f.onsubmit=function(e){e.preventDefault();var c=cart(),ids=Object.keys(c).filter(function(k){return P(k)});if(!ids.length)return;
 var d=new FormData(f),code='NC-'+Math.floor(1000+Math.random()*9000),t=total();
 var L=['New order request '+code,'','CUSTOMER INFORMATION','Full name: '+d.get('fullName'),'First name: '+d.get('firstName'),'Last name: '+d.get('lastName'),'Phone: '+(d.get('phone')||'-'),'Email: '+(d.get('email')||'-'),'','EVENT DETAILS','Event type: '+d.get('eventType'),'Picking up / service: '+d.get('mode'),'Venue street address: '+d.get('streetAddress'),'Address line 2: '+(d.get('streetAddress2')||'-'),'City: '+d.get('city'),'State / Province: '+d.get('state'),'ZIP / Postal code: '+d.get('postalCode'),'Event date: '+(d.get('date')||'-'),'Event time: '+(d.get('time')||'-'),'Time zone: America/New_York','Personalization: '+d.get('personalization'),'','About the event: '+(d.get('eventDetails')||'-'),'Menu interests and food allergies: '+(d.get('menuInterests')||'-'),'','Items:'];
 ids.forEach(function(k){var p=P(k),unit=p.unit&&p.unit!=='Order on request'?' ('+p.unit+')':'';L.push('- '+c[k]+' x '+p.name+unit+': '+(p.price==null?'Price to be confirmed':money(p.price*c[k])))});
 L.push('','Priced items subtotal: '+money(t.s),'Notes: '+(d.get('notes')||'-'),'','Important: minimum 48 hours notice. A 20% nonrefundable deposit is required to reserve the date. On-the-spot frying is $300. A minimum order of 20 applies to fries and cocktails/mocktails. Delivery and setup fees are paid by the client. Please confirm availability and quote unpriced items. Thank you!');
 L[L.length-1]=L[L.length-1].replace('Notes: -','');
 wr(R,{code:code,time:Date.now()});draw();
 window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(L.join('\n')),'_blank','noopener')};
var cl=$('#clear');if(cl)cl.onclick=function(){save({});wr(R,null);draw()};
/* shared: menu, reveals, badge */
var bg=$('.burger');if(bg){var H=document.documentElement;bg.onclick=function(){var o=!H.classList.contains('menu-open');H.classList.toggle('menu-open',o);document.body.classList.toggle('menu-open',o);bg.setAttribute('aria-expanded',o)}}
badge();draw();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.1});
setTimeout(function(){[].forEach.call(document.querySelectorAll('.rv'),function(e){io.observe(e)})},0);
})();

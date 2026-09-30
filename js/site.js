(function(){
var favicon=document.createElement('link');favicon.rel='icon';favicon.type='image/png';favicon.href='images/neeralogo.png?v=2';document.head.appendChild(favicon);
if(document.title.indexOf('A TASTE TO REMEMBER')===-1)document.title+=' | A TASTE TO REMEMBER';
/* ===== EDIT HERE: owner's WhatsApp number (country code + number, digits only) ===== */
var WA='14709626866';
/* ===== EDIT HERE: products. price: number in USD, or null = "price on request". SAMPLE PRICES, replace before going live. ===== */
var PRODUCTS=[
 {id:'roll',name:'Spring Rolls',unit:'Dozen',price:24,displayPrice:'$24/dozen',img:'images/springroll and samosa.jpg',desc:'Crisp, crunchy and ready to share.'},
 {id:'samosa',name:'Samosas',unit:'Dozen',price:24,displayPrice:'$24/dozen',img:'images/springroll and samosa.jpg',desc:'Seasoned pastry filled for every occasion.'},
 {id:'shrimp-mayo',name:'Shrimp in Mayo Roll',unit:'Dozen',price:36,displayPrice:'$36/dozen',img:'images/shrimp in mayo.jpeg',desc:'Crisp shrimp roll.'},
 {id:'shrimp-tempura',name:'Shrimp Tempura',unit:'Dozen',price:36,displayPrice:'$36/dozen',video:'images/shrimp-only.mp4',desc:'Shrimp tempura.'},
 {id:'coconut-shrimp',name:'Coconut Shrimp',unit:'Dozen',price:30,displayPrice:'$30/dozen',img:'images/coconutshrimp.jpg',desc:'Coconut shrimp.'},
 {id:'corn',name:'Corn on Cob',unit:'',price:25,displayPrice:'$25',img:'images/corn on cob.jpg',desc:'Corn on the cob.'},
 {id:'egg-roll',name:'Egg Rolls',unit:'Dozen',price:42,displayPrice:'$42/dozen',img:'images/eggrolls.jpg',desc:'Egg rolls.'},
 {id:'meat-pie-options',name:'Meat Pie',img:'images/small-chops/meatpie.PNG',desc:'Meat pies available in three sizes.',variants:[
  {id:'mini-meat-pie',label:'Mini',unit:'Dozen',price:24,displayPrice:'$24/dozen'},
  {id:'meat-pie-medium',label:'Medium (Party size)',unit:'Dozen',price:30,displayPrice:'$30/dozen'},
  {id:'meat-pie',label:'Large',unit:'Dozen',price:42,displayPrice:'$42/dozen'}
 ]},
 {id:'chicken-kebab',name:'Chicken Kebab',unit:'Dozen',price:42,displayPrice:'$42/dozen',desc:'Tender chicken kebabs.'},
 {id:'beef-kebab',name:'Beef Kebab',unit:'Dozen',price:42,displayPrice:'$42/dozen',img:'images/beefkebeb.jpeg',desc:'Seasoned beef kebabs.'},
 {id:'gizzard-kebab',name:'Gizzard Kebab',unit:'Dozen',price:42,displayPrice:'$42/dozen',desc:'Gizzard kebabs, newly available.'},
 {id:'puff-puff-options',name:'Puff-Puff',img:'images/puff.webp',desc:'Choose a pan size.',variants:[
  {id:'puff-puff-quarter',label:'Quarter pan',unit:'',price:30,displayPrice:'$30'},
  {id:'puff-puff-half',label:'Half pan',unit:'',price:60,displayPrice:'$60'},
  {id:'puff-puff-full',label:'Full pan',unit:'',price:110,displayPrice:'$110'}
 ]},
 {id:'chicken',name:'Chicken Wings',unit:'Dozen',price:24,displayPrice:'$24/dozen',video:'images/chickenwings.mp4',desc:'Chicken wings.'},
 {id:'mini-chicken-burger',name:'Mini Chicken Burger',unit:'Dozen',price:70,displayPrice:'$70/dozen',img:'images/chicken burger.jpg',desc:'Mini chicken burgers.'},
 {id:'mini-beef-burger',name:'Mini Beef Burger',unit:'Dozen',price:60,displayPrice:'$60/dozen',img:'images/beef burger.jpg',desc:'Mini beef burgers.'},
 {id:'shawarma-options',name:'Shawarma',img:'images/sharwama.jpg',desc:'Choose a full or half portion.',variants:[
  {id:'shawarma',label:'Full',unit:'',price:15,displayPrice:'$15'},
   {id:'shawarma-half',label:'Half',unit:'',price:8,displayPrice:'$8'}
 ]},
 {id:'suya-options',name:'Nigerian Suya',img:'images/suya.jpg',desc:'Choose a full or half pan.',variants:[
  {id:'suya',label:'Full pan',unit:'',price:350,displayPrice:'$350'},
  {id:'suya-half',label:'Half pan',unit:'',price:250,displayPrice:'$250'}
 ]},
 {id:'fried-yam',name:'Yam with Sauce',unit:'Order on request',price:null,displayPrice:'On Request',video:'images/yam and sauce.mp4',desc:'Yam served with sauce; request pricing.'},
 {id:'grilled-fish',name:'Grilled Fish',unit:'Order on request',price:null,displayPrice:'On request',desc:'Request pricing on WhatsApp.'},
{id:'cocktail',name:'Cocktail',unit:'Each',price:7,displayPrice:'$7 each',img:'images/cakes/WhatsApp Image 2026-09-25 at 10.14.40.jpeg',desc:'Minimum order: 12.'},
{id:'mocktail',name:'Mocktail',unit:'Each',price:7,displayPrice:'$7 each',img:'images/cakes/WhatsApp Image 2026-09-25 at 10.33.46.jpeg',desc:'Minimum order: 12.'},
{id:'fruit-cup-options',name:'Fruit Cup',desc:'Choose a serving size. Minimum order: 15.',variants:[
   {id:'fruit-cup',label:'3 oz',unit:'',price:2.5,displayPrice:'$2.50'},
   {id:'fruit-cup-5oz',label:'5 oz',unit:'',price:3.5,displayPrice:'$3.50'}
 ]},
 {id:'combo-1',name:'Combo 1',unit:'Combo',price:6,displayPrice:'$6',img:'images/small-chops/small-chops-01.jpg',desc:'Spring roll, samosa and 3 puff-puff.'},
 {id:'combo-2',name:'Combo 2',unit:'Combo',price:9.5,displayPrice:'$9.50',img:'images/small-chops/small-chops-01.jpg',desc:'Combo 1 plus your choice of gizzard, chicken or beef kebab.'},
 {id:'party',name:'Party Pack',unit:'Custom mix',price:null,displayPrice:'On Request',img:'images/small-chops/small-chops-02.jpg',desc:'Choose your mix of bites for the party.'},
 {id:'combo',name:'Customize Your Own Party Pack Choose your preferred bites and quantities to create a party pack that fits your event.',unit:'Custom mix',price:null,displayPrice:'On Request',img:'images/small-chops/small-chops-01.jpg',desc:'Tell us exactly which bites and quantities you want.'},
 {id:'cake',name:'Celebration Cake',unit:'Custom',price:null,displayPrice:'On Request',img:'images/cakes/cake1.jpg',desc:'Tell us the size, flavour, design and date.'},
 {id:'cater',name:'Event Catering',unit:'Quote',price:null,displayPrice:'On Request',desc:'Custom catering for weddings, birthdays, corporate events & all occasions.'},
 {id:'lux',name:'Luxury Set-Up',unit:'Quote',price:null,displayPrice:'On Request',desc:'Elegant food and beverage displays styled to complement your event.'}
];
var IMAGES={
 'banner.about':'images/cakes/WhatsApp Image 2026-09-25 at 10.14.40.jpeg','banner.services':'images/cakes/WhatsApp Image 2026-09-25 at 10.33.46.jpeg','banner.menu':'images/small-chops/small-chops-01.jpg','banner.gallery':'images/small-chops/small-chops-02.jpg','banner.faq':'images/cakes/cake4.jpg','banner.contact':'images/cakes/cake3.jpg',
 'about.portrait':'images/small-chops/small-chops-01.jpg','luxsetup.portrait':'images/hero/small-chops-hero.jpg','banner.luxsetup':'images/hero/small-chops-hero.jpg','svc.smallchops':'images/small-chops/small-chops-01.jpg','svc.pastries':'images/small-chops/small-chops-02.jpg','svc.cakes':'images/cakes/cake1.jpg','svc.catering':'images/cakes/WhatsApp Image 2026-09-25 at 10.33.46.jpeg','svc.luxe':'images/hero/small-chops-hero.jpg',
 'gallery.1':'images/small-chops/small-chops-01.jpg','gallery.2':'images/small-chops/small-chops-02.jpg','gallery.3':'images/cakes/cake1.jpg','gallery.4':'images/cakes/cake2.jpg','gallery.5':'images/cakes/cake3.jpg','gallery.6':'images/cakes/cake4.jpg','gallery.7':'images/hero/small-chops-hero.jpg','gallery.8':'images/small-chops/small-chops-01.jpg','gallery.9':'images/small-chops/small-chops-02.jpg','gallery.10':'images/cakes/cake1.jpg','gallery.11':'images/cakes/cake2.jpg','gallery.12':'images/cakes/cake3.jpg'
};
[].forEach.call(document.querySelectorAll('[data-img]'),function(i){var key=i.getAttribute('data-img'),src=IMAGES[key];if(!src)return;i.loading=key.indexOf('banner.')===0?'eager':'lazy';i.decoding='async';i.src=src;i.addEventListener('error',function(){if(i.hasAttribute('data-opt')){var parent=i.parentNode;if(parent&&parent.classList.contains('fr'))parent.parentNode.removeChild(parent);else if(i.parentNode)i.parentNode.removeChild(i)}})});
[].forEach.call(document.querySelectorAll('source[src*="images/video/"]'),function(s){var old=s.getAttribute('src'),next=old.indexOf('shrimp')>-1?'images/shrimp-only.mp4':'images/fourthvid-web.mp4';s.setAttribute('src',next);if(s.parentNode&&s.parentNode.load)s.parentNode.load()});
function addNavLink(){[].forEach.call(document.querySelectorAll('nav ul,#menu'),function(n){if(n.querySelector('a[href="luxsetup.html"]'))return;var a=document.createElement('a');a.href='luxsetup.html';a.textContent='Lux Set-Up';if(n.tagName.toLowerCase()==='ul'){var li=document.createElement('li');li.appendChild(a);n.insertBefore(li,n.firstChild)}else n.insertBefore(a,n.firstChild)})}
addNavLink();
var savedTheme;try{savedTheme=localStorage.getItem('nc-theme')}catch(e){}if(savedTheme==='light'||savedTheme==='dark')document.documentElement.setAttribute('data-theme',savedTheme);
function addThemeToggle(){var nav=document.querySelector('nav');if(!nav||nav.querySelector('.theme-toggle'))return;var b=document.createElement('button');b.className='theme-toggle';b.type='button';b.setAttribute('aria-label','Switch to light theme');b.innerHTML='<span aria-hidden="true">☾</span>';function update(){var dark=document.documentElement.getAttribute('data-theme')!=='light';b.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');b.innerHTML='<span aria-hidden="true">'+(dark?'☼':'☾')+'</span>'}b.onclick=function(){var next=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';document.documentElement.setAttribute('data-theme',next);try{localStorage.setItem('nc-theme',next)}catch(e){}update()};var burger=nav.querySelector('.burger');if(burger)nav.insertBefore(b,burger);else nav.appendChild(b);update()}
addThemeToggle();
[].forEach.call(document.querySelectorAll('footer:not(.inquire)'),function(f){f.className='inquire';f.id='inquire';f.innerHTML='<h2 class="rv">A Taste to Remember</h2><a class="btn rv" href="cart.html">Order / Inquire</a><div class="contact rv"><a href="tel:+14709626866">+1 (470) 962-6866</a><a href="https://www.instagram.com/neeracakesandmore" target="_blank" rel="noopener">Instagram @neeracakesandmore</a><a href="https://www.tiktok.com/@neeracakesandmore" target="_blank" rel="noopener">TikTok @neeracakesandmore</a></div><a class="brand" href="index.html#top" aria-label="NeeraCakesAndMore"><img class="logo" src="images/neeralogo.png" alt="NeeraCakesAndMore logo"><span class="wm" style="display:none">NeeraCakesAndMore</span><span class="tag">A TASTE TO REMEMBER</span></a><small>© 2026 NeeraCakesAndMore. Cakes, small chops and pastries.</small>';});
[].forEach.call(document.querySelectorAll('p'),function(p){if(p.textContent.indexOf('Pickup or delivery')>-1)p.textContent=p.textContent.replace('Pickup or delivery','Pickup')});
[].forEach.call(document.querySelectorAll('details'),function(d){var s=d.querySelector('summary'),p=d.querySelector('p');if(s&&s.textContent.indexOf('pickup or delivery')>-1){s.textContent='Do you offer delivery?';if(p)p.textContent='No. Orders are pickup only.'}});
[].forEach.call(document.querySelectorAll('details'),function(d){var s=d.querySelector('summary'),p=d.querySelector('p');if(s&&s.textContent.indexOf('How early')>-1){s.textContent='How early should I order?';if(p)p.textContent='A minimum of 48 hours is required.'}});
var menuLead=document.querySelector('#products')&&document.querySelector('.lead');if(menuLead)menuLead.textContent='Customize your own combo or party pack, or request a custom cake, cocktail hour, or event catering quote. A minimum of 48 hours notice is required. Delivery and setup options are available upon request.';
var serviceTitle=document.querySelector('.bt h1');if(serviceTitle&&serviceTitle.textContent.trim()==='Services'){var serviceMain=document.querySelector('main.pg.tight'),serviceEnd=serviceMain&&serviceMain.querySelector('h2[style]');if(serviceMain&&serviceEnd){var row=document.createElement('div');row.className='row2';row.innerHTML='<div class="fr rv"><img src="images/hero/small-chops-hero.jpg" alt="Cocktail hour catering"></div><div class="rv"><h2>Cocktail Hour</h2><p>Curated small chops and pastries for cocktail hours, private events, church gatherings and corporate functions.</p><a class="btn" href="menu.html">Plan cocktail hour</a></div>';serviceMain.insertBefore(row,serviceEnd)}}
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
var addToCart=new URLSearchParams(window.location.search).get('add');
if(addToCart==='lux'){var currentCart=cart();currentCart.lux=(currentCart.lux||0)+1;save(currentCart);history.replaceState(null,'',window.location.pathname+window.location.hash)}
function $(q){return document.querySelector(q)}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function money(v){return '$'+v.toFixed(2).replace(/\.00$/,'')}
function isPriced(p){return typeof p.price==='number'&&isFinite(p.price)}
function priceLabel(p){var label=p.displayPrice||(isPriced(p)?money(p.price):'On Request');return label.toLowerCase()==='on request'?'On Request':label}
function productOption(product,option){return product.variants?Object.assign({},product,option,{name:product.name+' - '+option.label}):product}
function P(id){for(var i=0;i<PRODUCTS.length;i++){var product=PRODUCTS[i];if(product.variants){for(var j=0;j<product.variants.length;j++)if(product.variants[j].id===id)return productOption(product,product.variants[j])}else if(product.id===id)return product}if(id==='puff-puff')return{id:'puff-puff',name:'Puff-Puff - Dozen',unit:'Dozen',price:24,displayPrice:'$24/dozen',img:'images/puff.webp'};return null}
function pic(p){var w=el('div','ph');if(p.video){var v=el('video','media-video');v.src=p.video;v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.preload='metadata';v.setAttribute('aria-label',p.name);w.appendChild(v);return w}if(p.img){var i=el('img');i.src=p.img;i.alt=p.name;i.loading='lazy';w.appendChild(i);return w}w.className+=' empty';w.setAttribute('aria-hidden','true');return w}
/* menu page */
var mg=$('#products');
if(mg){var menuNote=document.querySelector('main.pg.tight>.note'),priceHeading=el('h2',0,'Price List');priceHeading.style.marginTop='clamp(70px,12vh,140px)';mg.parentNode.insertBefore(priceHeading,mg);
PRODUCTS.forEach(function(p){var c=el('article','card rv'),b=el('div','bd'),r=el('div','row'),options=p.variants||[p],selected=productOption(p,options[0]),price=el('span','price',priceLabel(selected));
 r.appendChild(el('h3',0,p.name));r.appendChild(price);
 b.appendChild(r);b.appendChild(el('p',0,(p.unit?p.unit+' · ':'')+p.desc));
 if(p.variants){var choiceLabel=el('label',0,'Size'),choice=el('select');choice.setAttribute('aria-label',p.name+' size');options.forEach(function(option){var entry=el('option',0,option.label);entry.value=option.id;choice.appendChild(entry)});choiceLabel.appendChild(choice);b.appendChild(choiceLabel);choice.onchange=function(){selected=productOption(p,options[choice.selectedIndex]);price.textContent=priceLabel(selected);a.textContent=isPriced(selected)?'Add to cart':'Add to request'}}
 var a=el('button','btn',isPriced(selected)?'Add to cart':'Add to request');a.type='button';
 a.onclick=function(){var k=cart();k[selected.id]=(k[selected.id]||0)+1;save(k);a.textContent='Added ✓';setTimeout(function(){a.textContent=isPriced(selected)?'Add to cart':'Add to request'},1200)};
 b.appendChild(a);c.appendChild(pic(p));c.appendChild(b);mg.appendChild(c)});
if(menuNote){menuNote.classList.add('price-notes');menuNote.textContent='';menuNote.appendChild(el('b',0,'Notes'));var noteList=el('ul');['A 20% non-refundable deposit is required to secure your booking.','On-the-spot frying fee: $300.','Servers: The number required is based on the number of guests/visitors expected for the event; $100 per server for up to 5 hours.','.'].forEach(function(text){noteList.appendChild(el('li',0,text))});menuNote.appendChild(noteList);mg.parentNode.insertBefore(menuNote,mg.nextSibling)}}
/* cart page */
var box=$('#cart');
function total(){var c=cart(),s=0,q=false;for(var k in c){var p=P(k);if(!p)continue;if(!isPriced(p))q=true;else s+=p.price*c[k]}return{s:s,q:q}}
function draw(){
 if(!box)return;box.textContent='';var c=cart(),ids=Object.keys(c).filter(function(k){return P(k)&&c[k]>0});
 var rq=rd(R);
 if(rq){var nt=el('div','note ok');nt.appendChild(el('b',0,'Request '+rq.code+' prepared. '));nt.appendChild(document.createTextNode('Finish sending it in WhatsApp. Nothing has been charged. Neera will confirm availability, payment details, and your date there. WhatsApp replies do not update on this page.'));box.appendChild(nt)}
 if(!ids.length){box.appendChild(el('p','lead','Your cart is empty.'));var l=el('a','btn','Browse the menu');l.href='menu.html';l.style.marginTop='24px';box.appendChild(l);$('#fw').style.display='none';return}
 $('#fw').style.display='';
 ids.forEach(function(k){var p=P(k),ln=el('div','line'),th=el('div','th'),im;if(p.img){im=el('img');im.src=p.img;im.alt=p.name;th.appendChild(im)}else if(p.video){im=el('video','media-video');im.src=p.video;im.muted=true;im.loop=true;im.autoplay=true;im.playsInline=true;im.preload='metadata';im.setAttribute('aria-label',p.name);th.appendChild(im)}else{th.className+=' empty';th.setAttribute('aria-label',p.name+' image coming soon')}
  var m=el('div');m.appendChild(el('h3',0,p.name));if(p.unit&&p.unit!=='Order on request')m.appendChild(el('p',0,p.unit));
  var q=el('div','qty'),mi=el('button',0,'−'),pl=el('button',0,'+');mi.type=pl.type='button';mi.setAttribute('aria-label','Less');pl.setAttribute('aria-label','More');
  mi.onclick=function(){var x=cart();x[k]=Math.max(0,x[k]-1);if(!x[k])delete x[k];save(x);draw()};pl.onclick=function(){var x=cart();x[k]++;save(x);draw()};
  q.appendChild(mi);q.appendChild(el('span',0,c[k]));q.appendChild(pl);m.appendChild(q);
  var rm=el('button','rm','Remove');rm.type='button';rm.onclick=function(){var x=cart();delete x[k];save(x);draw()};m.appendChild(rm);
   ln.appendChild(th);ln.appendChild(m);ln.appendChild(el('span','price',isPriced(p)?money(p.price*c[k]):'Quote pending'));box.appendChild(ln)});
   var t=total(),tt=el('div','total');tt.appendChild(el('span',0,t.q?'Priced items subtotal':'Estimated total'));tt.appendChild(el('span','price',money(t.s)));box.appendChild(tt)}
var f=$('#f');
if(f){var dateField=f.querySelector('input[name="date"]'),minDate=new Date();minDate.setDate(minDate.getDate()+2);if(dateField)dateField.min=minDate.toISOString().slice(0,10)}
if(f)f.onsubmit=function(e){e.preventDefault();var c=cart(),ids=Object.keys(c).filter(function(k){return P(k)});if(!ids.length)return;
 var d=new FormData(f),code='NC-'+Math.floor(1000+Math.random()*9000),t=total();
 var L=['New order request '+code,'','CUSTOMER INFORMATION','Full name: '+d.get('fullName'),'First name: '+d.get('firstName'),'Last name: '+d.get('lastName'),'Phone: '+(d.get('phone')||'-'),'Email: '+(d.get('email')||'-'),'','EVENT DETAILS','Event type: '+d.get('eventType'),'Picking up / service: '+d.get('mode'),'Venue street address: '+d.get('streetAddress'),'Address line 2: '+(d.get('streetAddress2')||'-'),'City: '+d.get('city'),'State / Province: '+d.get('state'),'ZIP / Postal code: '+d.get('postalCode'),'Event date: '+(d.get('date')||'-'),'Event time: '+(d.get('time')||'-'),'Time zone: America/New_York','Personalization: '+d.get('personalization'),'','About the event: '+(d.get('eventDetails')||'-'),'Menu interests and food allergies: '+(d.get('menuInterests')||'-'),'','Items:'];
 ids.forEach(function(k){var p=P(k),unit=p.unit&&p.unit!=='Order on request'?' ('+p.unit+')':'';L.push('- '+c[k]+' x '+p.name+unit+': '+(isPriced(p)?money(p.price*c[k]):'Price to be confirmed'))});
 L.push('','Priced items subtotal: '+money(t.s),'Notes: '+(d.get('notes')||'-'),'','Important: minimum 48 hours notice. A 20% nonrefundable deposit is required to reserve the date. On-the-spot frying is $300. A minimum order of 12 applies to cocktails/mocktails and 15 to fruits. Delivery and setup fees are paid by the client. Please confirm availability and quote unpriced items. Thank you!');
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

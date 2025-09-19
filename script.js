
const sidebar=document.getElementById("sidebar");
const menuToggle=document.getElementById("menuToggle");
const closeSidebar=document.getElementById("closeSidebar");
const overlayBg=document.getElementById("overlayBg");
menuToggle.onclick=()=>{sidebar.classList.add("active");overlayBg.classList.add("active");};
closeSidebar.onclick=()=>{sidebar.classList.remove("active");overlayBg.classList.remove("active");};
overlayBg.onclick=()=>{sidebar.classList.remove("active");overlayBg.classList.remove("active");};

// Active link highlight
function setActive(selector){
  document.querySelectorAll(selector).forEach(link=>{
    link.addEventListener("click",()=>{
      document.querySelectorAll(selector).forEach(l=>l.classList.remove("active"));
      link.classList.add("active");
    });
  });
}
setActive("nav a");setActive(".sidebar a");

// Modals
function openOverlay(id){document.getElementById(id).classList.add("open");}
function closeOverlay(id){document.getElementById(id).classList.remove("open");}

// Search
document.getElementById("searchBtn").onclick=()=>openOverlay("searchOverlay");
document.getElementById("closeSearch").onclick=()=>closeOverlay("searchOverlay");
document.getElementById("doSearch").onclick=()=>{
  let q=document.getElementById("searchInput").value.trim().toLowerCase();
  if(!q) return alert("Please enter a search term");
  let results=products.filter(p=>p.title.toLowerCase().includes(q));
  if(!results.length) return alert("No products found");
  renderProducts(results);
  closeOverlay("searchOverlay");
};

// Sign-in
document.getElementById("signInBtn").onclick=()=>openOverlay("signinOverlay");
document.getElementById("closeSignin").onclick=()=>closeOverlay("signinOverlay");
document.getElementById("doSignin").onclick=()=>{alert("Signed in!");closeOverlay("signinOverlay")};

// Shop now scroll
document.getElementById("shopNow").onclick=()=>document.getElementById("collection").scrollIntoView({behavior:"smooth"});

// Product modal
const productOverlay=document.getElementById("productOverlay");
const modalImg=document.getElementById("modalImg");
const modalTitle=document.getElementById("modalTitle");
const modalDesc=document.getElementById("modalDesc");
const modalPrice=document.getElementById("modalPrice");
let currentProduct=null;
function openProduct(id){
  currentProduct=products.find(p=>p.id===id);
  modalImg.src=currentProduct.img;
  modalTitle.innerText=currentProduct.title;
  modalDesc.innerText=currentProduct.desc;
  modalPrice.innerText="$"+currentProduct.price;
  document.getElementById("qty").value=1;
  openOverlay("productOverlay");
}
document.getElementById("closeProduct").onclick=()=>closeOverlay("productOverlay");

// Products & cart
let cart=[];
let products=[
  {id:1,title:"Fitting dresses",desc:"Silk fit",price:290,img:"IMG-1 (1).jpg"},
  {id:2,title:"Lock Knit",desc:"Lock knitwear",price:180,img:"IMG-1 (2).jpg"},
  {id:3,title:"Mirrow",desc:"Mirrow",price:240,img:"IMG-1 (3).jpg"},
  {id:1,title:"Mirrow",desc:"Bead",price:240,img:"IMG-1 (4).jpg"},
  {id:2,title:"Obele` dress",desc:"Slim fit",price:220,img:"IMG-1 (5).jpg"},
  {id:3,title:"Obele` dress",desc:"Elegant slim fit",price:220,img:"IMG-1 (6).jpg"},
  {id:1,title:"Pink night",desc:"Pink",price:290,img:"IMG-1 (7).jpg"},
  {id:2,title:"Pink night",desc:"Night",price:290,img:"IMG-1 (8).jpg"},
  {id:3,title:"Rosie`",desc:"Rose`",price:300,img:"IMG-1 (9).jpg"},
  {id:1,title:"Rosie`",desc:"Bow",price:300,img:"IMG-1 (10).jpg"},
  {id:2,title:"Rosie`",desc:"Pose bow`",price:300,img:"IMG-1 (11).jpg"},
  {id:3,title:"Mirrow",desc:"Elegant fit",price:240,img:"IMG-1 (12).jpg"}
];
const productGrid=document.getElementById("productGrid");
function renderProducts(list){
  productGrid.innerHTML="";
  list.forEach(p=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`<img src="${p.img}" alt="${p.title}"><div class="card-body"><div class="title">${p.title}</div><div class="muted">${p.desc}</div><div class="row"><div class="price">$${p.price}</div><button class="btn" onclick="openProduct(${p.id})">View</button></div></div>`;
    productGrid.appendChild(card);
  });
}
renderProducts(products);

// Cart
function updateCart(){
  const itemsDiv=document.getElementById("cartItems");
  const totalDiv=document.getElementById("cartTotal");
  if(cart.length===0){itemsDiv.innerHTML="Your cart is empty.";totalDiv.innerText="$0";return;}
  itemsDiv.innerHTML="";
  let total=0;
  cart.forEach(c=>{
    total+=c.price*c.qty;
    let div=document.createElement("div");
    div.className="cart-item";
    div.innerHTML=`<img src="${c.img}"><div><div>${c.title}</div><div>$${c.price} x ${c.qty}</div></div>`;
    itemsDiv.appendChild(div);
  });
  totalDiv.innerText="$"+total;
  document.getElementById("cartCount").innerText=cart.length;
}
document.getElementById("addToCartModal").onclick=()=>{
  const qty=parseInt(document.getElementById("qty").value);
  const exist=cart.find(c=>c.id===currentProduct.id);
  if(exist){exist.qty+=qty;}else{cart.push({...currentProduct,qty});}
  updateCart();closeOverlay("productOverlay");
};
document.getElementById("cartBtn").onclick=()=>document.getElementById("cartDrawer").classList.add("open");
document.getElementById("closeCart").onclick=()=>document.getElementById("cartDrawer").classList.remove("open");

// WhatsApp checkout
document.getElementById("checkoutBtn").onclick=()=>{
  if(cart.length===0) return alert("Cart is empty!");
  let msg="Hello, I want to order:\n";
  cart.forEach(c=>msg+=`${c.title} x ${c.qty} = $${c.price*c.qty}\n`);
  msg+="Total: $"+cart.reduce((a,c)=>a+c.price*c.qty,0);
  const url="https://wa.me/2349054336149?text="+encodeURIComponent(msg);
  window.open(url,"_blank");
};


// Animate hero text on load
window.addEventListener('load', () => {
  document.querySelector('.hero-text').classList.add('show');
});

// Animate product cards on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Animate only once
    }
  });
}, {threshold:0.1});

document.querySelectorAll('.card').forEach(card => observer.observe(card));
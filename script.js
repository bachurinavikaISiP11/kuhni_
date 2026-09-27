
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav-links');
  if(menu && nav) menu.addEventListener('click', ()=>nav.classList.toggle('open'));

  document.querySelectorAll('[data-scroll]').forEach(b=>{
    b.addEventListener('click', ()=>{
      const el=document.querySelector(b.dataset.scroll);
      if(el) el.scrollIntoView({behavior:'smooth'});
    });
  });

  const filters = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');
  filters.forEach(f=>f.addEventListener('click',()=>{
    filters.forEach(x=>x.classList.remove('active')); f.classList.add('active');
    const v=f.dataset.filter;
    items.forEach(i=>i.hidden = v!=='all' && i.dataset.category!==v);
  }));

  const modal=document.querySelector('.modal');
  document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>modal?.classList.add('show')));
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>modal?.classList.remove('show')));
  modal?.addEventListener('click',e=>{if(e.target===modal) modal.classList.remove('show')});

  const form=document.querySelector('[data-form]');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const ok=form.querySelector('.success'); if(ok) ok.classList.add('show');
      form.reset();
    });
  }

  const calc=document.querySelector('[data-calc]');
  if(calc){
    const inputs=calc.querySelectorAll('input[type=range],select');
    const out=calc.querySelector('[data-price]');
    const update=()=>{
      const meters=+calc.querySelector('[name=meters]').value;
      const material=+calc.querySelector('[name=material]').value;
      const style=+calc.querySelector('[name=style]').value;
      const total=Math.round(meters*material*style/1000)*1000;
      out.textContent=total.toLocaleString('ru-RU')+' ₽';
      const label=calc.querySelector('[data-meters]'); if(label) label.textContent=meters+' м';
    };
    inputs.forEach(i=>i.addEventListener('input',update)); update();
  }

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
  },{threshold:.1});
  document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
});

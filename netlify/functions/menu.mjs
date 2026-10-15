import { getStore } from "@netlify/blobs";
const J=(d,s=200,h={})=>new Response(JSON.stringify(d),{status:s,headers:{"content-type":"application/json","cache-control":"no-store",...h}});
const same=(a,b)=>{if(a.length!==b.length)return false;let r=0;for(let i=0;i<a.length;i++)r|=a.charCodeAt(i)^b.charCodeAt(i);return r===0};
const ST=["new","preparing","delivered","cancelled"],TY=["Delivery","Take Away","Dine In"];
const str=(v,n)=>typeof v==="string"&&v.length<=n;
export default async(req)=>{
  const u=new URL(req.url),pw=process.env.ADMIN_PASSWORD||"",ok=pw&&same(pw,req.headers.get("x-admin-key")||"");
  const bad=async()=>{await new Promise(r=>setTimeout(r,800));return J({error:"wrong password"},401)};
  const cfg=getStore("mehar"),ord=getStore("mehar-orders"),imgs=getStore("mehar-img");
  if(u.pathname.endsWith("/img")){
    const id=u.searchParams.get("id")||"";if(!/^[a-z0-9_-]{1,24}$/i.test(id))return J({error:"bad id"},400);
    if(req.method==="GET"){
      let t=null;try{t=await imgs.get(id)}catch(e){}
      const x=t&&/^data:image\/(webp|jpeg|png);base64,([A-Za-z0-9+\/=]+)$/.exec(t);
      if(!x)return new Response("not found",{status:404,headers:{"cache-control":"no-store"}});
      return new Response(Buffer.from(x[2],"base64"),{status:200,headers:{"content-type":"image/"+x[1],"cache-control":"public, max-age=31536000, immutable"}});
    }
    if(!ok)return bad();
    if(req.method==="PUT"){
      const t=await req.text();if(t.length>400000||!/^data:image\/(webp|jpeg|png);base64,[A-Za-z0-9+\/=]+$/.test(t))return J({error:"bad image"},400);
      await imgs.set(id,t);return J({ok:true});
    }
    if(req.method==="DELETE"){try{await imgs.delete(id)}catch(e){}return J({ok:true})}
    return J({error:"method not allowed"},405);
  }
  if(u.pathname.endsWith("/menu")){
    if(req.method==="GET"){let d=null;try{d=await cfg.get("menu",{type:"json"})}catch(e){}return J(d||{s:{},o:{items:{},custom:[]}},200,{"cache-control":"public, max-age=20"})}
    if(req.method==="PUT"){
      if(!ok)return bad();const t=await req.text();if(t.length>300000)return J({error:"too large"},413);
      let b;try{b=JSON.parse(t)}catch(e){return J({error:"bad json"},400)}
      if(!b||typeof b.s!=="object"||!b.o||typeof b.o.items!=="object")return J({error:"bad data"},400);
      if(b.s.wa!==undefined&&!/^\d{10,15}$/.test(b.s.wa))return J({error:"bad whatsapp number"},400);
      b.updated=new Date().toISOString();await cfg.setJSON("menu",b);return J({ok:true});
    }
  }else{
    if(req.method==="POST"){
      let b;try{b=JSON.parse(await req.text())}catch(e){return J({error:"bad json"},400)}
      if(!b||!str(b.name,60)||!str(b.ph,20)||!str(b.ad,200)||!TY.includes(b.type)||!Array.isArray(b.lines)||b.lines.length<1||b.lines.length>40||!Number.isFinite(b.total)||b.total<0||b.total>1e6)return J({error:"bad order"},400);
      for(const l of b.lines)if(!str(l.n,80)||!str(l.l,30)||!(l.q>=1&&l.q<=50)||!Number.isFinite(l.p))return J({error:"bad order"},400);
      const id="o-"+Date.now()+"-"+Math.random().toString(36).slice(2,6);
      await ord.setJSON(id,{id,t:Date.now(),type:b.type,name:b.name,ph:b.ph,ad:b.ad,lines:b.lines.map(l=>({n:l.n,l:l.l,q:l.q|0,p:l.p})),total:b.total,st:"new"});
      return J({ok:true,id});
    }
    if(!ok)return bad();
    if(req.method==="GET"){
      const {blobs}=await ord.list({prefix:"o-"});const keys=blobs.map(x=>x.key).sort().slice(-80).reverse();
      const rows=await Promise.all(keys.map(k=>ord.get(k,{type:"json"}).catch(()=>null)));
      return J({orders:rows.filter(Boolean)});
    }
    if(req.method==="PATCH"){
      const id=u.searchParams.get("id")||"",st=u.searchParams.get("st")||"";
      if(!/^o-\d+-[a-z0-9]+$/.test(id)||!ST.includes(st))return J({error:"bad request"},400);
      const o=await ord.get(id,{type:"json"});if(!o)return J({error:"not found"},404);o.st=st;await ord.setJSON(id,o);return J({ok:true});
    }
  }
  return J({error:"method not allowed"},405);
};
export const config={path:["/api/menu","/api/orders","/api/img"]};

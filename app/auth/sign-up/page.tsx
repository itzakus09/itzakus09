"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignUpPage(){
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [message,setMessage]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMessage("");const response=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,password})});const data=await response.json();if(!response.ok)setMessage(data.error??"Registration failed.");else {await signIn("credentials",{email,password,redirect:true,callbackUrl:"/"});}setBusy(false)}
  return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:20}}><form onSubmit={submit} className="card" style={{width:"min(420px,100%)"}}><div className="eyebrow">CALISTHENICS AI</div><h1 style={{fontSize:34,margin:"8px 0 6px"}}>Start your journey.</h1><p style={{color:"var(--muted)",fontSize:13}}>Create your private coaching account.</p><label style={{display:"block",marginTop:20,fontSize:12}}>Name<input value={name} onChange={e=>setName(e.target.value)} required style={input}/></label><label style={{display:"block",marginTop:12,fontSize:12}}>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" required style={input}/></label><label style={{display:"block",marginTop:12,fontSize:12}}>Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" minLength={8} required style={input}/></label><button className="primary" style={{width:"100%",marginTop:18}} disabled={busy}>{busy?"Creating…":"Create account"}</button>{message&&<p style={{color:"var(--red)",fontSize:12}}>{message}</p>}<p style={{color:"var(--muted)",fontSize:12,textAlign:"center",marginTop:18}}>Already have an account? <a href="/auth/sign-in" style={{color:"var(--lime)"}}>Sign in</a></p></form></main>
}
const input={display:"block",width:"100%",marginTop:7,padding:"11px 12px",borderRadius:10,border:"1px solid var(--line)",background:"#0b0d10",color:"white",outline:"none"};

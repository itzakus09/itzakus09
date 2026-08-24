"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage(){
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");const result=await signIn("credentials",{email,password,redirect:false});if(result?.error)setError("Invalid email or password.");else window.location.href="/";setBusy(false)}
  return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:20}}><form onSubmit={submit} className="card" style={{width:"min(420px,100%)"}}><div className="eyebrow">CALISTHENICS AI</div><h1 style={{fontSize:34,margin:"8px 0 6px"}}>Welcome back.</h1><p style={{color:"var(--muted)",fontSize:13}}>Sign in to your training dashboard.</p><label style={{display:"block",marginTop:20,fontSize:12}}>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" required style={input}/></label><label style={{display:"block",marginTop:12,fontSize:12}}>Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" required style={input}/></label>{error&&<p style={{color:"var(--red)",fontSize:12}}>{error}</p>}<button className="primary" style={{width:"100%",marginTop:18}} disabled={busy}>{busy?"Signing in…":"Sign in"}</button><p style={{color:"var(--muted)",fontSize:12,textAlign:"center",marginTop:18}}>No account? <a href="/auth/sign-up" style={{color:"var(--lime)"}}>Create one</a></p></form></main>
}
const input={display:"block",width:"100%",marginTop:7,padding:"11px 12px",borderRadius:10,border:"1px solid var(--line)",background:"#0b0d10",color:"white",outline:"none"};

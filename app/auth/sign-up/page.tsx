"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage(){
  const supabase=createClient(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [message,setMessage]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMessage("");const {error}=await supabase.auth.signUp({email,password});setMessage(error?error.message:"Account created. Check your email to confirm your account.");setBusy(false)}
  return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:20}}><form onSubmit={submit} className="card" style={{width:"min(420px,100%)"}}><div className="eyebrow">CALISTHENICS AI</div><h1 style={{fontSize:34,margin:"8px 0 6px"}}>Start your journey.</h1><p style={{color:"var(--muted)",fontSize:13}}>Create your private coaching account.</p><label style={{display:"block",marginTop:20,fontSize:12}}>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" required style={input}/></label><label style={{display:"block",marginTop:12,fontSize:12}}>Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" minLength={8} required style={input}/></label><button className="primary" style={{width:"100%",marginTop:18}} disabled={busy}>{busy?"Creating…":"Create account"}</button>{message&&<p style={{color:"var(--muted)",fontSize:12}}>{message}</p>}<p style={{color:"var(--muted)",fontSize:12,textAlign:"center",marginTop:18}}>Already have an account? <a href="/auth/sign-in" style={{color:"var(--lime)"}}>Sign in</a></p></form></main>
}
const input={display:"block",width:"100%",marginTop:7,padding:"11px 12px",borderRadius:10,border:"1px solid var(--line)",background:"#0b0d10",color:"white",outline:"none"};

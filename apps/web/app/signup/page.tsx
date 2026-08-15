"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [message, setMessage] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setMessage("Account API will be connected in the authentication phase."); }
  return <main className="container" style={{padding:"60px 0", maxWidth:560}}><div className="card"><h1>Create your account</h1><p>Start with a secure account, then complete your candidate profile.</p><form onSubmit={submit}>
    <div className="field"><label>Email</label><input type="email" required placeholder="you@example.com" /></div>
    <div className="field"><label>Password</label><input type="password" required minLength={8} placeholder="At least 8 characters" /></div>
    <button className="btn" type="submit">Create account</button>
  </form>{message && <p>{message}</p>}<p><Link href="/login">Already have an account? Log in</Link></p></div></main>;
}

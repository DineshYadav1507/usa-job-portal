"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setMessage("Login API will be connected in the authentication phase."); }
  return <main className="container" style={{padding:"60px 0", maxWidth:560}}><div className="card"><h1>Welcome back</h1><p>Log in to manage your profile, jobs, documents, and ATS reports.</p><form onSubmit={submit}>
    <div className="field"><label>Email</label><input type="email" required /></div>
    <div className="field"><label>Password</label><input type="password" required /></div>
    <button className="btn" type="submit">Log in</button>
  </form>{message && <p>{message}</p>}<p><Link href="/signup">Need an account? Sign up</Link></p></div></main>;
}

"use client";

import { FormEvent, useState } from "react";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSaved(true); }
  return <main className="container" style={{padding:"48px 0", maxWidth:820}}><div className="card"><h1>Candidate profile</h1><p>Enter factual information once. The AI layer will tailor wording later without inventing facts.</p><form onSubmit={submit}>
    <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))"}}>
      <div className="field"><label>Full name</label><input required /></div><div className="field"><label>Email</label><input type="email" required /></div>
      <div className="field"><label>City</label><input /></div><div className="field"><label>State</label><input placeholder="e.g. Texas" /></div>
      <div className="field"><label>Target role</label><input placeholder="e.g. Software Engineer" /></div><div className="field"><label>Work authorization</label><select><option>US Citizen</option><option>Permanent Resident</option><option>H-1B</option><option>Other</option></select></div>
    </div>
    <h2>Experience</h2><p>For the MVP, capture only the requested factual employment details.</p>
    <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))"}}>
      <div className="field"><label>Company name</label><input placeholder="Company" /></div><div className="field"><label>Position / title</label><input placeholder="Job title" /></div><div className="field"><label>Start date</label><input type="month" /></div><div className="field"><label>End date</label><input type="month" /></div>
    </div>
    <button className="btn" type="submit">Save profile</button>
  </form>{saved && <p style={{fontWeight:700}}>Profile form captured. Persistence API is the next backend milestone.</p>}</div></main>;
}

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section style={{padding:"80px 0", background:"#111827", color:"white"}}>
        <div className="container">
          <p style={{fontWeight:700, opacity:.8}}>USA JOB PORTAL</p>
          <h1 style={{fontSize:"clamp(40px,7vw,72px)", lineHeight:1.02, maxWidth:800, margin:"16px 0"}}>One profile. Every job. A tailored application.</h1>
          <p style={{fontSize:20, lineHeight:1.6, maxWidth:700, opacity:.88}}>Discover recent US jobs from supported employer career sources, then create a fact-based resume, cover letter, and explainable ATS-style match report for each job.</p>
          <div style={{display:"flex", gap:12, marginTop:28}}>
            <Link className="btn" href="/signup">Create your profile</Link>
            <Link className="btn secondary" href="/login">Log in</Link>
          </div>
        </div>
      </section>
      <section className="container" style={{padding:"48px 0"}}>
        <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))"}}>
          {["Profile once","Find US jobs","Tailor to each JD","See ATS-style gaps"].map((item, i) => <div className="card" key={item}><strong>0{i+1}</strong><h2>{item}</h2><p>Designed for a fast, transparent application workflow.</p></div>)}
        </div>
      </section>
    </main>
  );
}

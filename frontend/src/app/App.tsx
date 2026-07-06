import { useState, ReactNode } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  Calendar, Users, CreditCard, LogOut, Bell, Search, Plus, User, Activity,
  ChevronRight, ChevronLeft, X, Download, Home, Lock, Unlock, FileText,
  CheckCircle, Clock, TrendingUp, AlertCircle, BarChart2,
} from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────────────

type View =
  | "welcome"
  | "psych-login"
  | "patient-dashboard"
  | "patient-appointments"
  | "patient-payments"
  | "psych-dashboard"
  | "appointments"
  | "patients"
  | "reports";

// ── Seed data ───────────────────────────────────────────────────────────────

const patients = [
  { id: 1, name: "Sarah Mitchell", cpf: "123.456.789-00", dob: "1990-03-15", phone: "(555) 867-5309", email: "sarah.mitchell@email.com", status: "Active", address: "142 Maple Street, Apt 3B — New York, NY 10001", sessions: 12 },
  { id: 2, name: "James Holloway", cpf: "987.654.321-00", dob: "1985-07-22", phone: "(555) 234-5678", email: "james.holloway@email.com", status: "Active", address: "1000 Park Avenue — New York, NY 10028", sessions: 8 },
  { id: 3, name: "Elena Vasquez", cpf: "456.789.123-00", dob: "1995-11-30", phone: "(555) 456-7890", email: "elena.vasquez@email.com", status: "Active", address: "567 West 42nd Street — New York, NY 10036", sessions: 5 },
  { id: 4, name: "Robert Chen", cpf: "321.654.987-00", dob: "1978-04-08", phone: "(555) 789-0123", email: "robert.chen@email.com", status: "Inactive", address: "89 Lexington Avenue — New York, NY 10016", sessions: 20 },
  { id: 5, name: "Patricia Walsh", cpf: "654.321.098-00", dob: "1992-09-14", phone: "(555) 345-6789", email: "patricia.walsh@email.com", status: "Active", address: "300 Central Park West — New York, NY 10024", sessions: 3 },
];

const appointments = [
  { id: 1, patient: "Sarah Mitchell", date: "2026-07-06", time: "09:00", type: "Therapy", status: "Confirmed" },
  { id: 2, patient: "James Holloway", date: "2026-07-06", time: "10:30", type: "Follow-up", status: "Confirmed" },
  { id: 3, patient: "Elena Vasquez", date: "2026-07-06", time: "14:00", type: "Assessment", status: "Pending" },
  { id: 4, patient: "Patricia Walsh", date: "2026-07-07", time: "09:00", type: "Therapy", status: "Confirmed" },
  { id: 5, patient: "Robert Chen", date: "2026-07-08", time: "11:00", type: "Follow-up", status: "Cancelled" },
  { id: 6, patient: "Sarah Mitchell", date: "2026-07-10", time: "16:00", type: "Therapy", status: "Confirmed" },
];

const payments = [
  { id: 1, patient: "Sarah Mitchell", amount: 200, method: "Credit Card", status: "Paid", date: "2026-06-27", receipt: "REC-2026-001" },
  { id: 2, patient: "James Holloway", amount: 200, method: "Bank Transfer", status: "Paid", date: "2026-06-28", receipt: "REC-2026-002" },
  { id: 3, patient: "Elena Vasquez", amount: 180, method: "Cash", status: "Pending", date: "2026-07-06", receipt: null },
  { id: 4, patient: "Patricia Walsh", amount: 200, method: "Bank Transfer", status: "Pending", date: "2026-07-06", receipt: null },
  { id: 5, patient: "Robert Chen", amount: 200, method: "Debit Card", status: "Paid", date: "2026-06-20", receipt: "REC-2026-003" },
];

const clinicalRecords = [
  { id: 1, patient: "Sarah Mitchell", date: "2026-06-27", locked: false, content: "Session focused on breathing techniques and mindfulness. Patient showed significant improvement in emotional regulation. Worked on cognitive restructuring of catastrophic thought patterns. Assigned daily journaling exercise." },
  { id: 2, patient: "James Holloway", date: "2026-06-28", locked: true, content: "CBT approach targeting negative cognitive patterns. Identified work-environment triggers and hierarchical relationship dynamics. Patient receptive to reframing exercises." },
  { id: 3, patient: "Elena Vasquez", date: "2026-06-13", locked: false, content: "Initial assessment session. Gathered family history and chief complaints. Patient reports anxiety episodes for approximately 6 months, correlated with change in employment." },
];

const revenueData = [
  { month: "Jan", revenue: 3200 },
  { month: "Feb", revenue: 3800 },
  { month: "Mar", revenue: 3400 },
  { month: "Apr", revenue: 4100 },
  { month: "May", revenue: 3900 },
  { month: "Jun", revenue: 4200 },
];

// ── Primitives ──────────────────────────────────────────────────────────────

const mono = { fontFamily: "'DM Mono', monospace" } as const;
const serif = { fontFamily: "'Lora', serif" } as const;

function Badge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Paid:      "bg-emerald-50 text-emerald-700 border-emerald-200",
    Active:    "bg-teal-50 text-teal-700 border-teal-200",
    Pending:   "bg-amber-50 text-amber-700 border-amber-200",
    Cancelled: "bg-red-50 text-red-600 border-red-200",
    Inactive:  "bg-gray-100 text-gray-500 border-gray-200",
  };
  const dots: Record<string, string> = {
    Confirmed: "bg-emerald-500",
    Paid:      "bg-emerald-500",
    Active:    "bg-teal-500",
    Pending:   "bg-amber-400",
    Cancelled: "bg-red-500",
    Inactive:  "bg-gray-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border ${styles[status] ?? "bg-muted text-muted-foreground border-border"}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dots[status] ?? "bg-muted-foreground"}`} />
      {status}
    </span>
  );
}

function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const sizeClass = size === "lg" ? "w-14 h-14 text-base" : size === "md" ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs";
  return (
    <div className={`${sizeClass} rounded-full bg-primary/15 text-primary font-semibold flex items-center justify-center shrink-0`}>
      {initials}
    </div>
  );
}

function FormInput({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-widest mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full px-3.5 py-2.5 bg-muted border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50" />
    </div>
  );
}

function FormSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-widest mb-1.5">{label}</label>
      <select className="w-full px-3.5 py-2.5 bg-muted border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Btn({
  children, variant = "primary", onClick, className = "", full = false,
}: {
  children: ReactNode; variant?: "primary" | "ghost" | "outline"; onClick?: () => void; className?: string; full?: boolean;
}) {
  const base = "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer";
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
    ghost:   "text-muted-foreground hover:text-foreground hover:bg-muted",
    outline: "border border-border text-muted-foreground hover:text-foreground hover:bg-muted",
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${full ? "w-full" : ""} ${className}`}>
      {children}
    </button>
  );
}

function Stat({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: "green" | "amber" | "red" }) {
  const valClass = accent === "green" ? "text-emerald-600" : accent === "amber" ? "text-amber-600" : accent === "red" ? "text-red-600" : "text-foreground";
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">{label}</p>
      <p className={`text-2xl font-semibold ${valClass}`} style={serif}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  );
}

function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
      <h3 className="font-semibold text-foreground text-sm" style={serif}>{title}</h3>
      {action && (
        <button onClick={onAction} className="flex items-center gap-1 text-xs text-primary hover:underline font-medium">
          {action} <ChevronRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground" style={serif}>{title}</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// ── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ role, current, navigate }: { role: "patient" | "psych"; current: string; navigate: (v: View) => void }) {
  const nav = role === "psych"
    ? [
        { icon: Home,      label: "Dashboard",    view: "psych-dashboard" as View },
        { icon: Calendar,  label: "Schedule",     view: "appointments"    as View },
        { icon: Users,     label: "Patients",     view: "patients"        as View },
        { icon: BarChart2, label: "Reports",      view: "reports"         as View },
      ]
    : [
        { icon: Home,      label: "Overview",     view: "patient-dashboard"     as View },
        { icon: Calendar,  label: "Appointments", view: "patient-appointments"  as View },
        { icon: CreditCard,label: "Payments",     view: "patient-payments"      as View },
      ];

  const exitView: View = role === "psych" ? "psych-login" : "welcome";
  const name = role === "psych" ? "Dr. Camila Rocha" : "Sarah Mitchell";
  const sub  = role === "psych" ? "Lic. #06/123456 · CBT" : "Patient · Active";

  return (
    <aside className="w-56 bg-card border-r border-border flex flex-col h-full shrink-0">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <div className="w-7 h-7 rounded bg-primary flex items-center justify-center shrink-0">
          <Activity className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
        <span className="font-semibold text-foreground tracking-tight" style={serif}>PsiCare</span>
      </div>

      <div className="px-3 py-3 border-b border-border">
        <div className="flex items-center gap-2.5 bg-muted rounded-lg px-3 py-2.5">
          <Avatar name={name} size="sm" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">{name}</p>
            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{sub}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {nav.map(({ icon: Icon, label, view }) => (
          <button
            key={view}
            onClick={() => navigate(view)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              current === view
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-2 py-3 border-t border-border">
        <button
          onClick={() => navigate(exitView)}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="flex items-center justify-between px-7 py-4 bg-card border-b border-border shrink-0">
      <div>
        <h1 className="text-lg font-semibold text-foreground" style={serif}>{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
        <Bell className="w-4 h-4 text-muted-foreground" />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      </button>
    </header>
  );
}

// ── Screen: Welcome ──────────────────────────────────────────────────────────

function Welcome({ navigate }: { navigate: (v: View) => void }) {
  const [mode, setMode] = useState<"register" | "login">("register");

  return (
    <div className="min-h-screen flex bg-background" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Left hero panel */}
      <div className="hidden lg:flex w-5/12 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 75% 25%, rgba(129,199,190,0.25) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(75,163,148,0.2) 0%, transparent 50%)"
        }} />
        <div className="relative flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight" style={serif}>PsiCare</span>
        </div>

        <div className="relative space-y-6">
          <p className="text-white/50 text-[10px] uppercase tracking-widest">Clinical Management Platform</p>
          <h2 className="text-4xl font-semibold text-white leading-snug" style={serif}>
            Compassionate care.<br />Effortless management.
          </h2>
          <p className="text-white/65 text-sm leading-relaxed max-w-xs">
            A platform built for psychologists and patients — combining clinical organization with a welcoming, human experience.
          </p>
          <div className="flex gap-8 pt-2">
            {[["150+", "Active patients"], ["98%", "Satisfaction rate"], ["5★", "Avg. rating"]].map(([val, lbl]) => (
              <div key={lbl}>
                <p className="text-2xl font-semibold text-white" style={serif}>{val}</p>
                <p className="text-white/50 text-xs mt-0.5">{lbl}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-white/25 text-xs">© 2026 PsiCare · All rights reserved</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {mode === "register" ? (
            <>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5">Patient Portal</p>
              <h1 className="text-2xl font-semibold text-foreground mb-7" style={serif}>Create your account</h1>
              <div className="space-y-3">
                <FormInput label="Full name" placeholder="Sarah Mitchell" />
                <div className="grid grid-cols-2 gap-3">
                  <FormInput label="ID / CPF" placeholder="000.000.000-00" />
                  <FormInput label="Date of Birth" type="date" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormInput label="Phone" placeholder="(555) 867-5309" />
                  <FormInput label="Email" type="email" placeholder="you@example.com" />
                </div>
                <FormInput label="Full address" placeholder="Street, number, city — State" />
                <FormInput label="Password" type="password" placeholder="At least 8 characters" />
                <Btn onClick={() => navigate("patient-dashboard")} full>
                  Create Account
                </Btn>
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="flex gap-2">
                  <Btn variant="outline" onClick={() => navigate("patient-dashboard")} className="flex-1">
                    I already have an account
                  </Btn>
                  <Btn variant="outline" onClick={() => setMode("login")} className="flex-1">
                    I am a psychologist
                  </Btn>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5">Clinician Portal</p>
              <h1 className="text-2xl font-semibold text-foreground mb-7" style={serif}>Welcome back</h1>
              <div className="space-y-4">
                <FormInput label="Professional email" type="email" placeholder="dr.camila@psicare.com" />
                <FormInput label="Password" type="password" placeholder="••••••••" />
                <button className="text-xs text-primary hover:underline font-medium">Forgot password?</button>
                <Btn onClick={() => navigate("psych-dashboard")} full>Sign In</Btn>
                <Btn variant="ghost" onClick={() => setMode("register")} full className="text-xs">
                  ← Back to patient registration
                </Btn>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Screen: Psych Login ──────────────────────────────────────────────────────

function PsychLogin({ navigate }: { navigate: (v: View) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
            <Activity className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground" style={serif}>PsiCare</span>
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5">Restricted access</p>
        <h1 className="text-2xl font-semibold text-foreground mb-7" style={serif}>Clinician sign in</h1>
        <div className="space-y-4">
          <FormInput label="Professional email" type="email" placeholder="dr.camila@psicare.com" />
          <FormInput label="Password" type="password" placeholder="••••••••" />
          <button className="text-xs text-primary hover:underline font-medium">Forgot password?</button>
          <Btn onClick={() => navigate("psych-dashboard")} full>Sign In</Btn>
          <Btn variant="ghost" onClick={() => navigate("welcome")} full className="text-xs">← Back</Btn>
        </div>
      </div>
    </div>
  );
}

// ── Screen: Patient Dashboard ────────────────────────────────────────────────

function PatientDashboard({ navigate }: { navigate: (v: View) => void }) {
  const myApts = appointments.filter(a => a.patient === "Sarah Mitchell");
  const myPays = payments.filter(p => p.patient === "Sarah Mitchell");
  const pendingPay = myPays.filter(p => p.status === "Pending");

  return (
    <div className="flex-1 overflow-y-auto p-7 space-y-5">
      {/* Welcome banner */}
      <div className="bg-primary rounded-xl p-6 flex items-center justify-between overflow-hidden relative">
        <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
        <div className="relative">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-0.5">Good morning</p>
          <h2 className="text-xl font-semibold text-white" style={serif}>Sarah</h2>
          <p className="text-white/65 text-sm mt-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Your next session is today at 09:00
          </p>
        </div>
        <div className="relative text-right hidden sm:block">
          <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">Your therapist</p>
          <p className="text-white font-semibold">Dr. Camila Rocha</p>
          <p className="text-white/50 text-xs mt-0.5">CBT · Lic. #06/123456</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Sessions completed" value="12" sub="since February 2025" />
        <Stat label="Next session" value="Today" sub="09:00 — Therapy" />
        <Stat label="Outstanding balance" value={`$${pendingPay.reduce((s,p) => s + p.amount, 0)}`} sub={`${pendingPay.length} payment(s) pending`} accent="amber" />
      </div>

      {/* Upcoming appointments */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <SectionHeader title="My Appointments" action="View all" onAction={() => navigate("patient-appointments")} />
        <div className="divide-y divide-border">
          {myApts.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <Calendar className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No appointments scheduled.</p>
            </div>
          ) : myApts.map(a => (
            <div key={a.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex flex-col items-center justify-center shrink-0">
                  <span className="text-[11px] font-semibold text-foreground leading-none" style={mono}>{a.time}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{a.type}</p>
                  <p className="text-xs text-muted-foreground">{a.date === "2026-07-06" ? "Today" : a.date}</p>
                </div>
              </div>
              <Badge status={a.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Payments */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <SectionHeader title="Payments" action="View all" onAction={() => navigate("patient-payments")} />
        <div className="divide-y divide-border">
          {myPays.map(p => (
            <div key={p.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">Therapy Session · {p.method}</p>
                <p className="text-xs text-muted-foreground">{p.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground" style={mono}>${p.amount}</span>
                <Badge status={p.status} />
                {p.status === "Pending" && (
                  <Btn className="!py-1.5 !px-3 !text-xs">Pay now</Btn>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Screen: Patient Appointments ─────────────────────────────────────────────

function PatientAppointments() {
  const myApts = appointments.filter(a => a.patient === "Sarah Mitchell");
  return (
    <div className="flex-1 overflow-y-auto p-7">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <SectionHeader title="Appointment History" />
        <div className="divide-y divide-border">
          {myApts.map(a => (
            <div key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-5">
                <div style={mono} className="text-right min-w-[80px]">
                  <p className="text-sm font-semibold text-foreground">{a.time}</p>
                  <p className="text-xs text-muted-foreground">{a.date}</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div>
                  <p className="text-sm font-medium text-foreground">{a.type}</p>
                  <p className="text-xs text-muted-foreground">Dr. Camila Rocha · Lic. #06/123456</p>
                </div>
              </div>
              <Badge status={a.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Screen: Patient Payments ──────────────────────────────────────────────────

function PatientPayments() {
  const myPays = payments.filter(p => p.patient === "Sarah Mitchell");
  return (
    <div className="flex-1 overflow-y-auto p-7 space-y-4">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <SectionHeader title="My Payments" />
        <div className="divide-y divide-border">
          {myPays.map(p => (
            <div key={p.id} className="flex items-center justify-between px-6 py-5">
              <div>
                <p className="text-sm font-medium text-foreground">Therapy Session</p>
                <p className="text-xs text-muted-foreground">{p.date} · {p.method}</p>
                {p.receipt && <p className="text-[10px] text-muted-foreground mt-0.5" style={mono}>{p.receipt}</p>}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-base font-bold text-foreground" style={mono}>${p.amount}.00</span>
                <Badge status={p.status} />
                {p.status === "Pending" && <Btn>Make Payment</Btn>}
                {p.receipt && (
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Download className="w-3.5 h-3.5" /> Receipt
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Screen: Psych Dashboard ───────────────────────────────────────────────────

function PsychDashboard({ navigate }: { navigate: (v: View) => void }) {
  const today = appointments.filter(a => a.date === "2026-07-06");
  return (
    <div className="flex-1 overflow-y-auto p-7 space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <Stat label="Sessions today" value="3" sub="2 confirmed · 1 pending" />
        <Stat label="Active patients" value="47" sub="+3 this month" />
        <Stat label="Pending records" value="5" sub="require updating" accent="amber" />
        <Stat label="Revenue (Jun)" value="$4,200" sub="of $5,000 projected" accent="green" />
      </div>

      <div className="grid grid-cols-5 gap-5">
        {/* Today's schedule */}
        <div className="col-span-3 bg-card border border-border rounded-xl overflow-hidden">
          <SectionHeader title="Today's Schedule — Jul 6" action="Full schedule" onAction={() => navigate("appointments")} />
          {today.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <CheckCircle className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No sessions scheduled today.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {today.map(a => (
                <div key={a.id} className="flex items-center gap-4 px-6 py-4">
                  <span className="text-xs text-muted-foreground w-11 shrink-0 font-medium" style={mono}>{a.time}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{a.patient}</p>
                    <p className="text-xs text-muted-foreground">{a.type}</p>
                  </div>
                  <Badge status={a.status} />
                  <button onClick={() => navigate("patients")} className="text-xs text-primary hover:underline font-medium">Profile</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clinical records */}
        <div className="col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <SectionHeader title="Recent Records" action="All patients" onAction={() => navigate("patients")} />
          <div className="divide-y divide-border">
            {clinicalRecords.map(r => (
              <div key={r.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-semibold text-foreground">{r.patient.split(" ").slice(0, 2).join(" ")}</p>
                  {r.locked
                    ? <Lock className="w-3 h-3 text-muted-foreground" />
                    : <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                  }
                </div>
                <p className="text-[10px] text-muted-foreground mb-1" style={mono}>{r.date}</p>
                <p className="text-xs text-foreground/65 line-clamp-2 leading-relaxed">{r.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue chart + recent payments */}
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-3 bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 pt-5 pb-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Monthly Revenue</p>
            <p className="text-2xl font-semibold text-foreground" style={serif}>$22,600 <span className="text-sm text-emerald-600 font-normal">↑ 8.2% vs last period</span></p>
          </div>
          <div className="px-4 pb-4">
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={revenueData} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B8490", fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid rgba(45,125,111,0.15)", borderRadius: 8, fontSize: 12, fontFamily: "'DM Mono', monospace" }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#2D7D6F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <SectionHeader title="Recent Payments" action="All finances" onAction={() => navigate("reports")} />
          <div className="divide-y divide-border">
            {payments.slice(0, 4).map(p => (
              <div key={p.id} className="flex items-center justify-between px-6 py-3.5">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.patient.split(" ")[0]}</p>
                  <p className="text-[10px] text-muted-foreground">{p.method}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold" style={mono}>${p.amount}</span>
                  <Badge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Screen: Appointments ──────────────────────────────────────────────────────

function AppointmentsScreen() {
  const [showModal, setShowModal] = useState(false);

  const weekDays = [
    { label: "Mon 7/6", key: "2026-07-06" },
    { label: "Tue 7/7", key: "2026-07-07" },
    { label: "Wed 7/8", key: "2026-07-08" },
    { label: "Thu 7/9", key: "2026-07-09" },
    { label: "Fri 7/10", key: "2026-07-10" },
  ];
  const hours = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
  const today = "2026-07-06";

  const bySlot: Record<string, typeof appointments[0]> = {};
  appointments.forEach(a => { bySlot[`${a.date}|${a.time}`] = a; });

  const slotColor: Record<string, string> = {
    Confirmed: "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100",
    Pending:   "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100",
    Cancelled: "bg-red-50 text-red-700 border-red-200 opacity-50",
  };

  return (
    <div className="flex-1 overflow-y-auto p-7 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors border border-border">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-semibold text-foreground px-2" style={mono}>Jul 6 – 10, 2026</span>
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors border border-border">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <Btn onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" /> Schedule Session
        </Btn>
      </div>

      {/* Calendar grid */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="grid border-b border-border" style={{ gridTemplateColumns: "52px repeat(5, 1fr)" }}>
          <div className="border-r border-border" />
          {weekDays.map(d => (
            <div key={d.key} className={`py-3 px-3 text-center border-r border-border last:border-0 ${d.key === today ? "bg-primary/5" : ""}`}>
              <p className={`text-xs font-semibold ${d.key === today ? "text-primary" : "text-foreground"}`} style={mono}>{d.label}</p>
              {d.key === today && <span className="text-[10px] text-primary/70">Today</span>}
            </div>
          ))}
        </div>
        <div className="overflow-y-auto max-h-[430px]">
          {hours.map(h => (
            <div key={h} className="grid border-b border-border last:border-0 min-h-[52px]" style={{ gridTemplateColumns: "52px repeat(5, 1fr)" }}>
              <div className="py-2 px-2 text-right border-r border-border shrink-0">
                <span className="text-[10px] text-muted-foreground" style={mono}>{h}</span>
              </div>
              {weekDays.map(d => {
                const slot = bySlot[`${d.key}|${h}`];
                return (
                  <div key={d.key} className={`border-r border-border last:border-0 p-1 ${d.key === today ? "bg-primary/[0.015]" : ""}`}>
                    {slot && (
                      <div className={`rounded-md px-2 py-1.5 border text-xs cursor-pointer transition-colors ${slotColor[slot.status] ?? ""}`}>
                        <p className="font-semibold truncate">{slot.patient.split(" ")[0]}</p>
                        <p className="opacity-60">{slot.type}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming list */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <SectionHeader title="All Scheduled Sessions" />
        <div className="divide-y divide-border">
          {appointments.map(a => (
            <div key={a.id} className="flex items-center gap-5 px-6 py-3.5 hover:bg-muted/30 transition-colors">
              <span className="text-xs font-medium text-muted-foreground w-32 shrink-0" style={mono}>{a.date} {a.time}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{a.patient}</p>
                <p className="text-xs text-muted-foreground">{a.type}</p>
              </div>
              <Badge status={a.status} />
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal title="Schedule Session" onClose={() => setShowModal(false)}>
          <FormSelect label="Patient" options={patients.map(p => p.name)} />
          <div className="grid grid-cols-2 gap-3">
            <FormInput label="Date" type="date" />
            <FormInput label="Time" type="time" />
          </div>
          <FormSelect label="Session type" options={["Therapy", "Follow-up", "Assessment", "Emergency"]} />
          <FormSelect label="Status" options={["Pending", "Confirmed", "Cancelled"]} />
          <div>
            <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-widest mb-1.5">Notes</label>
            <textarea rows={3} className="w-full px-3.5 py-2.5 bg-muted border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none placeholder:text-muted-foreground/50" placeholder="Session notes or reminders…" />
          </div>
          <div className="flex gap-2 pt-1">
            <Btn variant="outline" onClick={() => setShowModal(false)} className="flex-1">Cancel</Btn>
            <Btn onClick={() => setShowModal(false)} className="flex-1">Confirm Booking</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Screen: Patients ──────────────────────────────────────────────────────────

function PatientsScreen() {
  const [selected, setSelected] = useState<typeof patients[0] | null>(null);
  const [tab, setTab]           = useState<"profile" | "session" | "records">("profile");
  const [search, setSearch]     = useState("");
  const [showRegModal, setShowRegModal] = useState(false);

  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (selected) {
    const patRecords = clinicalRecords.filter(r => r.patient === selected.name);
    return (
      <div className="flex-1 overflow-y-auto p-7 space-y-5">
        <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
          <ChevronLeft className="w-4 h-4" /> Back to patients
        </button>

        <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-5">
          <Avatar name={selected.name} size="lg" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground" style={serif}>{selected.name}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">ID: {selected.cpf} · {selected.phone}</p>
            <p className="text-sm text-muted-foreground">{selected.email}</p>
          </div>
          <div className="text-right">
            <Badge status={selected.status} />
            <p className="text-xs text-muted-foreground mt-2">{selected.sessions} sessions</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit">
          {([
            ["profile", "Personal Info"],
            ["session", "New Session"],
            ["records", "Clinical Records"],
          ] as const).map(([t, lbl]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded text-sm font-medium transition-all ${tab === t ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {lbl}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <DataField label="Full name"           value={selected.name} />
              <DataField label="ID / CPF"            value={selected.cpf} />
              <DataField label="Date of birth"       value={selected.dob} />
              <DataField label="Phone"               value={selected.phone} />
              <DataField label="Email"               value={selected.email} />
              <DataField label="Status"              value={selected.status} />
              <div className="col-span-2">
                <DataField label="Address" value={selected.address} />
              </div>
              <DataField label="Sessions completed"  value={`${selected.sessions} sessions`} />
            </div>
          </div>
        )}

        {tab === "session" && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-foreground text-sm" style={serif}>Record New Session</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Session date" type="date" />
              <FormSelect label="Session type" options={["Individual therapy", "Assessment", "Follow-up"]} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-widest mb-1.5">Session notes</label>
              <textarea rows={5} className="w-full px-3.5 py-2.5 bg-muted border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Describe session content, techniques used, clinical observations, homework assigned…" />
            </div>
            <Btn><FileText className="w-4 h-4" /> Save Session Record</Btn>
          </div>
        )}

        {tab === "records" && (
          <div className="space-y-4">
            {patRecords.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-10 text-center">
                <FileText className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No clinical records for this patient.</p>
              </div>
            ) : patRecords.map(r => (
              <div key={r.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-foreground" style={mono}>{r.date}</p>
                  <span className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded ${r.locked ? "bg-muted text-muted-foreground" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                    {r.locked ? <><Lock className="w-3 h-3" /> Locked</> : <><Unlock className="w-3 h-3" /> Editable</>}
                  </span>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed">{r.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-7 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search patients by name…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>
        <Btn onClick={() => setShowRegModal(true)}>
          <Plus className="w-4 h-4" /> Add Patient
        </Btn>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="grid px-6 py-3 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-widest gap-2"
          style={{ gridTemplateColumns: "1fr 140px 80px 70px 28px" }}>
          <div>Patient</div>
          <div>ID / CPF</div>
          <div>Sessions</div>
          <div>Status</div>
          <div />
        </div>
        {filtered.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No patients found for "{search}"</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map(p => (
              <button key={p.id} onClick={() => { setSelected(p); setTab("profile"); }}
                className="w-full grid px-6 py-4 items-center hover:bg-muted/40 transition-colors text-left gap-2"
                style={{ gridTemplateColumns: "1fr 140px 80px 70px 28px" }}>
                <div className="flex items-center gap-3">
                  <Avatar name={p.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.email}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground" style={mono}>{p.cpf}</span>
                <span className="text-sm text-muted-foreground">{p.sessions}</span>
                <Badge status={p.status} />
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </button>
            ))}
          </div>
        )}
      </div>

      {showRegModal && (
        <Modal title="Add New Patient" onClose={() => setShowRegModal(false)}>
          <FormInput label="Full name" placeholder="Patient full name" />
          <div className="grid grid-cols-2 gap-3">
            <FormInput label="ID / CPF" placeholder="000.000.000-00" />
            <FormInput label="Date of birth" type="date" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormInput label="Phone" placeholder="(555) 000-0000" />
            <FormInput label="Email" type="email" placeholder="patient@email.com" />
          </div>
          <FormInput label="Address" placeholder="Street, city — State" />
          <div className="flex gap-2 pt-1">
            <Btn variant="outline" onClick={() => setShowRegModal(false)} className="flex-1">Cancel</Btn>
            <Btn onClick={() => setShowRegModal(false)} className="flex-1">Register Patient</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Screen: Reports ───────────────────────────────────────────────────────────

function ReportsScreen() {
  const [tab,           setTab]          = useState<"reports" | "payments">("reports");
  const [showPayModal,  setShowPayModal]  = useState(false);

  const received = payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const pending  = payments.filter(p => p.status === "Pending").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="flex-1 overflow-y-auto p-7 space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Collected this month" value={`$${received.toLocaleString()}`} sub="3 invoices paid" accent="green" />
        <Stat label="Outstanding"          value={`$${pending.toLocaleString()}`} sub="2 invoices pending" accent="amber" />
        <Stat label="Total invoiced"       value={String(payments.length)} sub="sessions billed this month" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit">
        {(["reports", "payments"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded text-sm font-medium transition-all ${tab === t ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {t === "reports" ? "Reports" : "Payments"}
          </button>
        ))}
      </div>

      {tab === "reports" && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-foreground text-sm" style={serif}>Generate Report</h3>
            <FormSelect label="Report type" options={["Sessions completed", "Payments received", "Active patients", "Updated clinical records"]} />
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Start date" type="date" />
              <FormInput label="End date"   type="date" />
            </div>
            <Btn><TrendingUp className="w-4 h-4" /> Generate Report</Btn>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <SectionHeader title="Generated Reports" />
            <div className="divide-y divide-border">
              {[
                { name: "Sessions completed",    period: "Jun 1 – 30, 2026",    gen: "Jul 1, 2026"  },
                { name: "Payments received",      period: "May 1 – 31, 2026",    gen: "Jun 1, 2026"  },
                { name: "Active patient roster",  period: "June 2026 snapshot",  gen: "Jun 1, 2026"  },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.period} · Generated {r.gen}</p>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs text-primary hover:underline font-medium">
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "payments" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Btn onClick={() => setShowPayModal(true)}>
              <Plus className="w-4 h-4" /> Record Payment
            </Btn>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid px-6 py-3 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-widest"
              style={{ gridTemplateColumns: "1fr 90px 130px 110px 75px 90px" }}>
              <div>Patient</div><div>Amount</div><div>Method</div><div>Date</div><div>Status</div><div>Receipt</div>
            </div>
            <div className="divide-y divide-border">
              {payments.map(p => (
                <div key={p.id} className="grid px-6 py-4 items-center"
                  style={{ gridTemplateColumns: "1fr 90px 130px 110px 75px 90px" }}>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={p.patient} size="sm" />
                    <p className="text-sm font-medium text-foreground">{p.patient.split(" ").slice(0,2).join(" ")}</p>
                  </div>
                  <span className="text-sm font-bold" style={mono}>${p.amount}</span>
                  <span className="text-sm text-muted-foreground">{p.method}</span>
                  <span className="text-sm text-muted-foreground" style={mono}>{p.date}</span>
                  <Badge status={p.status} />
                  <span className="text-[10px] text-muted-foreground" style={mono}>{p.receipt ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showPayModal && (
        <Modal title="Record Payment" onClose={() => setShowPayModal(false)}>
          <FormSelect label="Patient"          options={patients.map(p => p.name)} />
          <FormSelect label="Linked session"   options={appointments.map(a => `${a.date} ${a.time} — ${a.patient} (${a.type})`)} />
          <div className="grid grid-cols-2 gap-3">
            <FormInput label="Amount ($)" type="number" placeholder="200" />
            <FormInput label="Payment date" type="date" />
          </div>
          <FormSelect label="Payment method" options={["Bank Transfer", "Credit Card", "Debit Card", "Cash", "Check"]} />
          <FormSelect label="Status" options={["Paid", "Pending"]} />
          <div className="flex gap-2 pt-1">
            <Btn variant="outline" onClick={() => setShowPayModal(false)} className="flex-1">Cancel</Btn>
            <Btn onClick={() => setShowPayModal(false)} className="flex-1">Record Payment</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────

const pageTitles: Partial<Record<View, { title: string; subtitle: string }>> = {
  "patient-dashboard":    { title: "My Overview",    subtitle: "Welcome back, Sarah" },
  "patient-appointments": { title: "Appointments",   subtitle: "Your session history" },
  "patient-payments":     { title: "Payments",       subtitle: "Billing & receipts" },
  "psych-dashboard":      { title: "Dashboard",      subtitle: "July 6, 2026 · Dr. Camila Rocha" },
  "appointments":         { title: "Schedule",       subtitle: "Session management" },
  "patients":             { title: "Patients",       subtitle: "Registry & clinical records" },
  "reports":              { title: "Reports & Finance", subtitle: "Financial oversight and report generation" },
};

const patientViews: View[] = ["patient-dashboard", "patient-appointments", "patient-payments"];
const psychViews:   View[] = ["psych-dashboard", "appointments", "patients", "reports"];

export default function App() {
  const [view, setView] = useState<View>("welcome");
  const navigate = (v: View) => setView(v);

  if (view === "welcome")    return <Welcome navigate={navigate} />;
  if (view === "psych-login") return <PsychLogin navigate={navigate} />;

  const isPatient = patientViews.includes(view);
  const isPsych   = psychViews.includes(view);
  const titleInfo = pageTitles[view];

  return (
    <div className="flex h-screen bg-background overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {isPatient && <Sidebar role="patient" current={view} navigate={navigate} />}
      {isPsych   && <Sidebar role="psych"   current={view} navigate={navigate} />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {titleInfo && <Topbar title={titleInfo.title} subtitle={titleInfo.subtitle} />}
        {view === "patient-dashboard"    && <PatientDashboard    navigate={navigate} />}
        {view === "patient-appointments" && <PatientAppointments />}
        {view === "patient-payments"     && <PatientPayments />}
        {view === "psych-dashboard"      && <PsychDashboard      navigate={navigate} />}
        {view === "appointments"         && <AppointmentsScreen />}
        {view === "patients"             && <PatientsScreen />}
        {view === "reports"              && <ReportsScreen />}
      </div>
    </div>
  );
}

# SpeakWise AI

An AI-powered learning companion for students — solve academic doubts, practice mock interviews, and improve spoken communication skills, all with real-time AI feedback and a personal performance dashboard.

**Live site:** https://speakwiseai-ai-interview-platform.vercel.app
**Backend API:** https://speakwiseai-ai-interview-platform.onrender.com

---

## ✨ Features

- **Doubt Solver** — Ask academic or technical questions and get clear, step-by-step AI explanations.
- **AI Mock Interview** — Practice HR, Technical, or Communication-style interviews using your voice. The AI asks questions one at a time, listens to your spoken answers via speech recognition, and responds with realistic follow-up questions.
- **Communication Practice** — Free-form speaking practice with AI feedback on clarity, confidence, and fluency.
- **Generate My Score** — After completing an interview or communication session, generate an overall performance score (Communication, Clarity, Confidence, Overall) based on your full session transcript.
- **Personal Dashboard** — Tracks doubts solved, sessions completed, and a 7-day score trend, all built from real session data.
- **Voice-first UX** — Speech-to-text for answering questions, text-to-speech for hearing the AI interviewer/coach speak.
- **Email/password authentication** with a dedicated password-reset flow (Supabase Auth).

---

## 🛠 Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Supabase JS client (auth + database)

**Backend**
- Node.js + Express
- Vercel AI SDK (`ai` package) for streaming LLM responses
- Multi-provider AI fallback: **Gemini → Groq → Cerebras** (tries each in order until one succeeds)
- Supabase (Postgres) for auth, threads, messages, and session scores

**Hosting**
- Frontend: **Vercel**
- Backend: **Render**
- Database/Auth: **Supabase**

---

## 📁 Project Structure

```
SpeakWiseAI-main/
├── server/
│   ├── index.ts            # Express API — /api/chat, /api/score, /api/health
│   ├── providers.ts         # Gemini / Groq / Cerebras provider setup
│   └── system-prompts.ts    # Per-feature system prompts (doubt, interview, communication)
├── src/
│   ├── pages/
│   │   ├── DoubtSolver.tsx
│   │   ├── MockInterview.tsx
│   │   ├── Communication.tsx
│   │   ├── Dashboard.tsx
│   │   ├── auth.tsx
│   │   ├── ResetPassword.tsx
│   │   └── ...
│   ├── components/
│   │   ├── AppSidebar.tsx
│   │   └── site-footer.tsx
│   ├── integrations/supabase/client.ts
│   └── lib/threads.ts
├── .env                      # Local environment variables (not committed)
└── package.json
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root with:

```dotenv
# Backend (server/index.ts) — no VITE_ prefix
PORT=3001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key
CEREBRAS_API_KEY=your_cerebras_key

# Frontend (Vite) — VITE_ prefix required
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

Only a Gemini key is strictly required for the app to function — Groq and Cerebras are automatic fallbacks if Gemini fails or is rate-limited.

---

## 🗄 Supabase Database Schema

The app needs four tables in your Supabase project: `threads`, `messages`, `session_scores`, and `profiles`.

```sql
create table public.threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature text not null,
  mode text,
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create table public.session_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  thread_id uuid references public.threads(id) on delete cascade,
  feature text not null,
  communication_score numeric,
  clarity_score numeric,
  confidence_score numeric,
  overall_score numeric,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text
);

alter table public.threads enable row level security;
alter table public.messages enable row level security;
alter table public.session_scores enable row level security;
alter table public.profiles enable row level security;

create policy "Users manage their own threads" on public.threads
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage messages in their threads" on public.messages
  for all using (
    exists (select 1 from public.threads t where t.id = thread_id and t.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.threads t where t.id = thread_id and t.user_id = auth.uid())
  );

create policy "Users manage their own scores" on public.session_scores
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage their own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);
```

Run this in Supabase → SQL Editor → New query.

Also, in Supabase → Authentication → URL Configuration, add your local and/or deployed domain(s) to the allowed redirect URLs (needed for signup/login/password-reset links to work correctly).

---

## 💻 Running Locally

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up your `.env`** file as shown above, and run the SQL above in your Supabase project.

3. **Start the backend** (in one terminal)
   ```bash
   npm run server
   ```
   Runs on `http://localhost:3001`.

4. **Start the frontend** (in a second terminal)
   ```bash
   npm run dev
   ```
   Runs on `http://localhost:5173`.

5. Open `http://localhost:5173`, sign up with email/password, and try Doubt Solver, Mock Interview, or Communication Practice.

> Note: if you point the frontend at a locally-running backend, make sure the fetch URLs in `MockInterview.tsx`, `Communication.tsx`, and `DoubtSolver.tsx` point to `http://localhost:3001/api/chat` instead of the deployed Render URL.

---

## 🚀 Deployment

**Backend → Render**
1. New Web Service → connect this GitHub repo.
2. Build Command: `npm install`, Start Command: `npm run server`.
3. Add the backend environment variables (no `VITE_` prefix) under Environment.
4. Deploy — Render gives you a live URL like `https://your-app.onrender.com`.

**Frontend → Vercel**
1. Import the same GitHub repo.
2. Framework auto-detected as Vite (`npm run build`, output `dist`).
3. Add the `VITE_` prefixed environment variables.
4. Deploy — Vercel gives you a live URL like `https://your-app.vercel.app`.

**After deploying both:**
- Update the fetch URLs in `MockInterview.tsx`, `Communication.tsx`, and `DoubtSolver.tsx` to your live Render URL.
- Update Supabase → Authentication → URL Configuration with your live Vercel domain.

> Render's free tier spins down after 15 minutes of inactivity — the first request afterward can take 30–60 seconds to wake up. This is expected behavior on the free plan, not a bug.

---

## 🔄 Keeping Supabase Active

Supabase's free tier auto-pauses a project after 7 days with zero API activity. To prevent this for free, add a scheduled GitHub Actions workflow (`.github/workflows/keep-alive.yml`) that pings your Supabase REST endpoint every few days. See the project's CI configuration for the exact workflow used here.

---

## 🧠 How Scoring Works

Rather than asking the AI to embed a hidden score inside every chat response (unreliable — models can refuse or drop hidden-looking tags), scoring is a **separate, explicit action**:

1. After finishing an interview or communication session, the user clicks **"Generate My Score."**
2. The frontend calls `POST /api/score` with the `threadId`.
3. The backend fetches the *entire* conversation transcript for that thread from Supabase.
4. It sends the transcript to the AI in a dedicated, single-purpose call asking only for four 0–10 scores in JSON.
5. The result is saved to `session_scores` and returned to the frontend, which displays it immediately and feeds the Dashboard's stats and 7-day trend chart.

---

## 📄 License

This project is for educational purposes.

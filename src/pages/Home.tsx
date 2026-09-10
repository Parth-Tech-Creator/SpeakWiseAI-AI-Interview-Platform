import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

import {
  ArrowRight,
  BarChart3,
  Brain,
  Check,
  ChevronRight,
  GraduationCap,
  MessageSquare,
  Mic,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard", { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <main>
        <Hero />
        <FeatureSection />
        <HowItWorks />
        <WhySpeakWise />
        <FinalCTA />
      </main>

      <SiteFooter />
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[100px] sm:h-[560px] sm:w-[560px]" />

        <div className="absolute -left-32 top-[35%] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[90px]" />

        <div className="absolute -right-32 top-[45%] h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur sm:mb-8 sm:px-4 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-violet-500" />

            <span className="truncate">
              AI-powered learning for ambitious students
            </span>
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-5xl text-balance text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem]">
            Learn smarter.
            <br />
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
              Speak with confidence.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl px-2 text-pretty text-[15px] leading-7 text-muted-foreground sm:mt-7 sm:px-0 sm:text-lg sm:leading-8 lg:text-xl">
            Meet your personal AI learning companion for solving doubts,
            practicing interviews, and becoming a more confident communicator.
          </p>

          {/* Buttons */}
          <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <Link
              to="/doubt-solver"
              className="group inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 text-sm font-semibold !text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/25 active:translate-y-0 sm:w-auto"
            >
              Start learning free
              <ArrowRight className="ml-2 h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/mock-interview"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-border bg-background px-7 text-sm font-semibold text-foreground transition-all hover:bg-muted active:bg-muted sm:w-auto"
            >
              Try mock interview
            </Link>
          </div>

          {/* Trust points */}
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:mt-10 sm:gap-x-7 sm:text-sm">
            <TrustPoint text="No credit card" />
            <TrustPoint text="Instant AI feedback" />
            <TrustPoint text="Progress saved" />
          </div>
        </div>

        {/* Product preview */}
        <div className="relative mx-auto mt-12 max-w-6xl sm:mt-20 lg:mt-24">
          <div className="absolute inset-x-10 top-8 -z-10 h-32 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-violet-500/10 sm:rounded-3xl">
            {/* Browser top bar */}
            <div className="flex h-10 items-center gap-2 border-b border-border/70 px-4 sm:h-12 sm:px-5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

              <div className="ml-3 hidden h-6 flex-1 rounded-md bg-muted/60 sm:block" />
            </div>

            {/* Preview */}
            <div className="grid min-h-[220px] grid-cols-1 sm:min-h-[300px] md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
              {/* Sidebar preview */}
              <div className="hidden border-r border-border/70 bg-muted/20 p-4 md:block">
                <div className="mb-6 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>

                  <span className="text-xs font-semibold text-foreground">
                    SpeakWise AI
                  </span>
                </div>

                <div className="space-y-2">
                  <PreviewNav active icon={Brain} text="Doubt Solver" />
                  <PreviewNav icon={Mic} text="Mock Interview" />
                  <PreviewNav icon={MessageSquare} text="Communication" />
                </div>
              </div>

              {/* Main preview */}
              <div className="relative flex flex-col bg-card p-4 sm:p-8 lg:p-10">
                <div className="max-w-2xl">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-violet-500 sm:text-xs">
                    Your AI learning space
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-foreground sm:mt-2 sm:text-2xl lg:text-3xl">
                    What would you like to learn today?
                  </h3>

                  <p className="mt-2 max-w-lg text-xs leading-5 text-muted-foreground sm:text-sm">
                    Ask a question, practice an interview, or improve the way
                    you communicate.
                  </p>
                </div>

                <div className="mt-5 grid gap-3 sm:mt-8 sm:grid-cols-3">
                  <PreviewCard
                    icon={Brain}
                    title="Solve doubts"
                    text="Step-by-step answers"
                  />

                  <PreviewCard
                    icon={Mic}
                    title="Practice interviews"
                    text="Realistic AI sessions"
                  />

                  <PreviewCard
                    icon={MessageSquare}
                    title="Improve speaking"
                    text="Instant feedback"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FEATURES
========================================================= */

const features = [
  {
    icon: Brain,
    title: "AI Doubt Solver",
    description:
      "Ask questions about programming, academics, aptitude, or anything you're learning. Get clear explanations with examples.",
    action: "Solve a doubt",
    to: "/doubt-solver",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Mic,
    title: "Mock Interviews",
    description:
      "Practice HR, technical, and communication interviews with an AI interviewer that asks questions and gives feedback.",
    action: "Start practicing",
    to: "/mock-interview",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    icon: MessageSquare,
    title: "Communication Practice",
    description:
      "Improve your confidence, clarity, grammar, and structure through realistic conversations and personalized feedback.",
    action: "Practice speaking",
    to: "/communication",
    gradient: "from-fuchsia-500 to-pink-500",
  },
] as const;

function FeatureSection() {
  return (
    <section className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-violet-500" />
            One platform. Three powerful tools.
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
              grow
            </span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            From your first question to your next interview, SpeakWise AI helps
            you learn, practice, and improve.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.to}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 lg:p-8"
            >
              {/* Glow */}
              <div
                className={`absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`}
              />

              <div
                className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
              >
                <feature.icon className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>

              <div className="mt-5 inline-flex items-center text-sm font-semibold text-violet-600 dark:text-violet-400">
                {feature.action}

                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HOW IT WORKS
========================================================= */

const steps = [
  {
    number: "01",
    icon: GraduationCap,
    title: "Choose your goal",
    description:
      "Pick the workspace that matches what you want to improve today.",
  },
  {
    number: "02",
    icon: Target,
    title: "Practice with AI",
    description:
      "Learn through personalized questions, explanations, conversations, and feedback.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Keep getting better",
    description:
      "Your conversations are saved so you can revisit your work and track your progress.",
  },
] as const;

function HowItWorks() {
  return (
    <section className="border-y border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Target className="h-3.5 w-3.5 text-violet-500" />
              Simple by design
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Your growth starts with one conversation.
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
              SpeakWise AI turns everyday practice into a personalized learning
              experience designed around students.
            </p>

            <Link
              to="/auth"
              className="mt-7 inline-flex items-center text-sm font-semibold text-violet-600 dark:text-violet-400"
            >
              Create your free account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group flex gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:shadow-md sm:gap-5 sm:p-6"
              >
                <div className="shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 sm:h-11 sm:w-11">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-violet-500">
                      {step.number}
                    </span>

                    <h3 className="text-base font-semibold text-foreground sm:text-lg">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WHY SPEAKWISE
========================================================= */

function WhySpeakWise() {
  const points = [
    "Built around real student needs",
    "Personalized AI conversations",
    "Instant explanations and feedback",
    "Your learning progress stays with you",
  ];

  return (
    <section className="bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-10 lg:p-14">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-600 dark:text-violet-400">
                <Sparkles className="h-3.5 w-3.5" />
                Made for students
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                More than an AI chatbot.
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                SpeakWise AI brings learning, interview preparation, and
                communication practice together in one focused workspace.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-background p-4"
                >
                  <div className="mt-0.5 shrink-0">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/10">
                      <Check className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                    </div>
                  </div>

                  <span className="text-sm font-medium leading-5 text-foreground">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-10 text-center shadow-2xl shadow-violet-500/20 sm:px-12 sm:py-20 lg:px-16">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
              <Sparkles className="h-6 w-6" />
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to become a better learner?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-violet-100 sm:mt-5 sm:text-base sm:leading-7">
              Start solving doubts, practicing interviews, and building your
              confidence with SpeakWise AI.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/auth"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-white px-8 text-sm font-bold !text-violet-700 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-violet-50 sm:w-auto"
              >
                Get started for free
                <ArrowRight className="ml-2 h-4 w-4 !text-violet-700" />
              </Link>

              <Link
                to="/auth"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/30 bg-white/10 px-8 text-sm font-semibold !text-white backdrop-blur transition-colors hover:bg-white/15 sm:w-auto"
              >
                Sign in
              </Link>
            </div>

            <p className="mt-5 text-[11px] text-violet-200 sm:text-xs">
              Free to get started • No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function TrustPoint({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <Check className="h-3.5 w-3.5 shrink-0 text-violet-500" />
      {text}
    </span>
  );
}

function PreviewNav({
  icon: Icon,
  text,
  active = false,
}: {
  icon: typeof Brain;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] font-medium ${
        active
          ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
          : "text-muted-foreground"
      }`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {text}
    </div>
  );
}

function PreviewCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Brain;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-background p-3 sm:p-4">
      <Icon className="h-4 w-4 text-violet-500 sm:h-5 sm:w-5" />

      <p className="mt-2 text-xs font-semibold text-foreground sm:mt-3 sm:text-sm">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
        {text}
      </p>
    </div>
  );
}

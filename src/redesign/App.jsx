/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Menu,
  X,
  LogOut,
  Trophy,
  Code2,
  Cpu,
  Smartphone,
  Layers,
  Radio,
  PenTool,
  ChartNoAxesCombined,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import api, { session } from "./api";
import Quiz from "./Quiz";
import { MaterialCatalog, MaterialDetail } from "./Materials";
import useResource from "./useResource";

function ResourceState({ loading, error, retry }) {
  if (loading)
    return (
      <div className="notice" role="status">
        <span className="spinner" /> Menyiapkan tantangan…
      </div>
    );
  if (error)
    return (
      <div className="notice error" role="alert">
        <p>{error}</p>
        <button className="button secondary" onClick={retry}>
          Coba lagi
        </button>
      </div>
    );
  return null;
}
function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Quiztify beranda">
      <img
        className="brand-logo"
        src="/assets/LOGO FULL.png"
        alt="Tech Quiztify"
      />
    </Link>
  );
}
function Shell() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(session);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setOpen(false);
    setUser(session());
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const expire = () => {
      setUser(null);
      navigate("/login", { state: { from: location.pathname }, replace: true });
    };
    window.addEventListener("session-expired", expire);
    return () => window.removeEventListener("session-expired", expire);
  }, [navigate, location.pathname]);
  return (
    <>
      <a className="skip-link" href="#main">
        Lewati ke konten
      </a>
      <header className="site-header">
        <div className="container nav-inner">
          <Brand />
          <button
            className="icon-button mobile-menu"
            aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            className={open ? "nav-links is-open" : "nav-links"}
            aria-label="Navigasi utama"
          >
            <NavLink to="/" end>
              Beranda
            </NavLink>
            <NavLink to="/course">Jelajahi kuis</NavLink>
            <NavLink to="/materi">Materi</NavLink>
            <NavLink to="/leaderboard">Papan peringkat</NavLink>
            <NavLink to="/about">Tentang</NavLink>
          </nav>
          <div className="nav-account">
            {user ? (
              <>
                <span className="avatar">
                  {user.fullName?.charAt(0) || "Q"}
                </span>
                <span className="user-name">
                  {user.fullName?.split(" ")[0]}
                </span>
                <button
                  className="icon-button"
                  aria-label="Keluar akun"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    navigate("/login");
                  }}
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link className="button small" to="/login">
                Masuk <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </header>
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Catalog />} />
          <Route
            path="/quiz/:id"
            element={
              user ? (
                <Quiz />
              ) : (
                <Navigate
                  to="/login"
                  replace
                  state={{ from: location.pathname }}
                />
              )
            }
          />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth register />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/materi" element={<MaterialCatalog />} />
          <Route path="/materi/:id" element={<MaterialDetail />} />
          <Route path="/comming" element={<ComingSoon />} />
          <Route
            path="*"
            element={
              <div className="container empty-page">
                <p className="eyebrow">404 / SALAH BELOK</p>
                <h1>Halaman ini belum ada.</h1>
                <Link className="button" to="/">
                  Kembali ke beranda <ArrowRight />
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="container site-footer">
        <Brand />
        <p>Rasa penasaran selalu punya tempat di sini.</p>
        <span>© {new Date().getFullYear()} Tech Quiztify</span>
      </footer>
    </>
  );
}
export default function App() {
  return <Shell />;
}

const themes = [
  {
    match: /artificial/i,
    icon: BrainCircuit,
    mark: "AI",
    color: "peach",
    note: "Kenali cara mesin berpikir.",
  },
  {
    match: /data/i,
    icon: ChartNoAxesCombined,
    mark: "DA",
    color: "mint",
    note: "Temukan cerita di balik angka.",
  },
  {
    match: /machine/i,
    icon: Cpu,
    mark: "ML",
    color: "lavender",
    note: "Dari pola, jadi prediksi.",
  },
  {
    match: /web/i,
    icon: Code2,
    mark: "</>",
    color: "blue",
    note: "Bangun pemahaman, baris demi baris.",
  },
  {
    match: /mobile/i,
    icon: Smartphone,
    mark: "APP",
    color: "yellow",
    note: "Ide besar di layar kecil.",
  },
  {
    match: /full/i,
    icon: Layers,
    mark: "FS",
    color: "pink",
    note: "Hubungkan semua bagiannya.",
  },
  {
    match: /things|iot/i,
    icon: Radio,
    mark: "IoT",
    color: "mint",
    note: "Ketika benda mulai terhubung.",
  },
  {
    match: /design|ui/i,
    icon: PenTool,
    mark: "UX",
    color: "peach",
    note: "Desain yang terasa masuk akal.",
  },
];
function QuizCard({ quiz, index }) {
  const theme =
    themes.find((t) => t.match.test(quiz.title)) ||
    themes[index % themes.length];
  const Icon = theme.icon;
  return (
    <article className={`quiz-card ${theme.color}`}>
      <Link
        className="card-art"
        to={`/quiz/${quiz.id}`}
        aria-label={`Kuis ${quiz.title}`}
      >
        <span className="card-number">
          {String(index + 1).padStart(2, "0")} / EXPLORE
        </span>
        <Icon size={64} strokeWidth={1.2} />
        <span className="card-mark">{theme.mark}</span>
      </Link>
      <div className="card-body">
        <h3>
          <Link to={`/quiz/${quiz.id}`}>{quiz.title}</Link>
        </h3>
        <p>{quiz.description || theme.note}</p>
        <div className="card-bottom">
          <span>
            {quiz._count?.questions != null
              ? `${quiz._count.questions} soal · `
              : ""}
            Pilihan ganda
          </span>
        </div>
        <div className="quiz-card-actions">
          <Link to={`/materi?quizId=${quiz.id}`}>Pelajari materi</Link>
          <Link to={`/quiz/${quiz.id}`}>
            Mulai kuis <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
function Collection({ compact = false }) {
  const resource = useResource("/quiz");
  const [search, setSearch] = useState("");
  const quizzes = Array.isArray(resource.data) ? resource.data : [];
  const filtered = quizzes.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="collection-toolbar">
        <span className="eyebrow">
          {quizzes.length
            ? `${quizzes.length} BIDANG, BANYAK HAL BARU`
            : "TEMUKAN BIDANGMU"}
        </span>
        <label className="search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari topik kuis…"
            aria-label="Cari topik kuis"
          />
        </label>
      </div>
      <ResourceState {...resource} />
      {!resource.loading && !resource.error && (
        <>
          <div className="quiz-grid">
            {(compact ? filtered.slice(0, 4) : filtered).map((quiz, i) => (
              <QuizCard key={quiz.id} quiz={quiz} index={i} />
            ))}
          </div>
          {!filtered.length && (
            <div className="notice">
              Belum ada kuis yang cocok. Coba topik lain.
            </div>
          )}
        </>
      )}
    </>
  );
}
function Home() {
  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" /> UNTUK PIKIRAN YANG SELALU PENASARAN
          </p>
          <h1>
            Jangan cuma
            <br />
            tahu.
            <br />
            <span className="highlight">Uji dulu.</span>
            <span className="hero-star" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="hero-description">
            Seberapa jauh kamu kenal dunia teknologi? Pilih topik favoritmu,
            tantang diri sendiri, dan temukan hal baru di setiap soal.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/course">
              Temukan tantanganmu <ArrowUpRight size={20} />
            </Link>
            <span>Rasa penasaran saja cukup.</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Ilustrasi kartu kuis interaktif">
          <span className="art-note">
            Sedikit mikir.
            <br />
            Banyak belajar.
          </span>
          <span className="orbit-star" aria-hidden="true">
            ✦
          </span>
          <div className="sample-card">
            <div className="sample-top">
              <span>THE DAILY BRAIN STRETCH</span>
              <BrainCircuit size={24} />
            </div>
            <div className="sample-question">
              <span>01 / PEMANASAN</span>
              <h2>
                Otak juga butuh
                <br />
                jam terbang.
              </h2>
              <p>Langkah pertama untuk jadi lebih jago?</p>
            </div>
            <div className="sample-option">
              <span>A</span> Menunggu inspirasi datang
            </div>
            <div className="sample-option chosen">
              <span>B</span> Mulai dari satu pertanyaan <span>↗</span>
            </div>
            <div className="sample-bottom">
              <span>● ● ● ○ ○</span>
              <span>YOUR NEXT LEVEL AWAITS</span>
            </div>
          </div>
          <div className="art-sticker">
            <Sparkles size={21} />
            <span>
              Stay curious.
              <br />
              <strong>Keep going!</strong>
            </span>
          </div>
          <span className="art-caption">BUKAN UJIAN. INI PETUALANGAN.</span>
        </div>
      </section>
      <div className="topic-strip" aria-hidden="true">
        <span>CODE</span>
        <span>✳</span>
        <span>CREATE</span>
        <span>✳</span>
        <span>THINK</span>
        <span>✳</span>
        <span>REPEAT</span>
        <span>✳</span>
        <span>STAY CURIOUS</span>
      </div>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / PILIH TITIK MULAI</p>
            <h2>
              Apa yang bikin
              <br />
              kamu penasaran?
            </h2>
          </div>
          <Link className="text-link" to="/course">
            Semua topik <ArrowUpRight size={19} />
          </Link>
        </div>
        <Collection compact />
      </section>
      <section className="how-section">
        <div className="container how-inner">
          <div>
            <p className="eyebrow">02 / SESIMPEL ITU</p>
            <h2>
              Mulai kecil.
              <br />
              Pulang bawa ilmu.
            </h2>
          </div>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <h3>Ikuti rasa penasaranmu</h3>
                <p>Pilih bidang teknologi yang ingin kamu jelajahi.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Beri otakmu tantangan</h3>
                <p>Satu soal, empat pilihan. Kamu punya 60 detik per soal.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Lihat sejauh apa kamu melangkah</h3>
                <p>Pelajari hasilmu dan kumpulkan poin di papan peringkat.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="container leaderboard-invite">
        <Trophy size={42} strokeWidth={1.3} />
        <div>
          <p className="eyebrow">SEDIKIT KOMPETISI, TAMBAH MOTIVASI</p>
          <h2>Ada namamu di atas sana?</h2>
        </div>
        <Link className="button secondary" to="/leaderboard">
          Lihat peringkat <ArrowUpRight size={19} />
        </Link>
      </section>
    </>
  );
}
function Catalog() {
  return (
    <div className="container section">
      <p className="eyebrow">THE QUIZ COLLECTION</p>
      <h1 className="page-title">
        Pilih rasa
        <br />
        <span className="highlight">penasaranmu.</span>
      </h1>
      <p className="intro">
        Dari baris kode sampai kecerdasan buatan. Mulai dari yang kamu suka.
      </p>
      <Collection />
    </div>
  );
}
function Auth({ register = false }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setError("");
  }, [register]);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const values = Object.fromEntries(new FormData(e.currentTarget));
    try {
      if (register) {
        await api.post("/register", values);
        navigate("/login", { state: { registered: true } });
      } else {
        const response = await api.post("/login", values);
        localStorage.setItem("token", response.token);
        navigate(
          location.state?.from?.startsWith("/quiz/")
            ? location.state.from
            : "/",
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="container auth-layout">
      <aside className="auth-story">
        <p className="eyebrow">A LITTLE CURIOUS. A LITTLE BRAVER.</p>
        <h1>
          Hal besar
          <br />
          dimulai dari
          <br />
          <span className="highlight">“kok bisa?”</span>
        </h1>
        <span className="auth-star" aria-hidden="true">
          ✳
        </span>
        <p>
          Simpan rasa penasaranmu.
          <br />
          Bawa ke tantangan berikutnya.
        </p>
        <span className="eyebrow">TECH QUIZTIFY / LEARN BY TRYING</span>
      </aside>
      <section className="auth-form">
        <p className="eyebrow">
          {register ? "01 / MULAI PERJALANANMU" : "WELCOME BACK, CURIOUS MIND"}
        </p>
        <h2>{register ? "Kenalan dulu, yuk." : "Siap mikir lagi?"}</h2>
        <p>
          {register
            ? "Buat akun untuk mulai mengumpulkan pengalaman dan poin."
            : "Masuk dan lanjutkan rasa penasaranmu."}
        </p>
        {location.state?.registered && !register && (
          <p className="success-message" role="status">
            Akun berhasil dibuat. Silakan masuk.
          </p>
        )}
        <form key={register ? "register" : "login"} onSubmit={submit}>
          {register && (
            <label>
              Nama lengkap
              <input
                name="fullName"
                autoComplete="name"
                placeholder="Nama panggilan di papan peringkat"
                required
                maxLength={80}
              />
            </label>
          )}
          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="kamu@contoh.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              autoComplete={register ? "new-password" : "current-password"}
              placeholder="Masukkan password"
              required
            />
          </label>
          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
          <button className="button" disabled={busy}>
            {busy ? "Sebentar…" : register ? "Buat akun" : "Masuk & mulai"}
            <ArrowUpRight size={20} />
          </button>
        </form>
        <p className="auth-switch">
          {register ? "Sudah punya akun?" : "Baru di sini?"}{" "}
          <Link to={register ? "/login" : "/register"}>
            {register ? "Masuk" : "Buat akun"}
          </Link>
        </p>
      </section>
    </div>
  );
}
function Leaderboard() {
  const resource = useResource("/leaderboard");
  const users = Array.isArray(resource.data) ? resource.data : [];
  const current = session();
  return (
    <div className="container section rankings">
      <p className="eyebrow">THE CURIOSITY CLUB</p>
      <h1 className="page-title">
        Rasa penasaran.
        <br />
        <span className="highlight">Punya peringkat.</span>
      </h1>
      <p className="intro">
        Jawaban benar pada penyelesaian pertama setiap kuis bernilai 10 poin.
        Kuis bisa diulang untuk latihan tanpa menambah poin.
      </p>
      <ResourceState {...resource} />
      {!resource.loading && !resource.error && (
        <>
          <div className="podium">
            {users.slice(0, 3).map((user, i) => (
              <div className={`podium-card place-${i + 1}`} key={user.id}>
                <span className="eyebrow">
                  0{i + 1} / {i === 0 ? "TOP EXPLORER" : "CURIOUS MIND"}
                </span>
                {i === 0 && <Trophy size={28} />}
                <span className="podium-avatar">
                  {user.fullName?.charAt(0)}
                </span>
                <h2>{user.fullName}</h2>
                <p>
                  <strong>{user.score.toLocaleString("id-ID")}</strong> poin
                </p>
              </div>
            ))}
          </div>
          <div className="ranking-list">
            <div className="ranking-row ranking-head">
              <span>POSISI</span>
              <span>EXPLORER</span>
              <span>TOTAL POIN</span>
            </div>
            {users.map((user, i) => (
              <div
                className={`ranking-row ${user.id === current?.id ? "is-you" : ""}`}
                key={user.id}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  {user.fullName}
                  {user.id === current?.id && <small> KAMU</small>}
                </span>
                <strong>{user.score.toLocaleString("id-ID")}</strong>
              </div>
            ))}
          </div>
          {!users.length && (
            <div className="notice">
              Papan peringkat masih kosong. Jadilah yang pertama!
            </div>
          )}
        </>
      )}
    </div>
  );
}
function About() {
  return (
    <div className="container section about-page">
      <p className="eyebrow">TENTANG TECH QUIZTIFY</p>
      <h1 className="page-title">
        Belajar dimulai
        <br />
        dengan <span className="highlight">mencoba.</span>
      </h1>
      <p className="intro">
        Kamu tidak harus tahu semuanya untuk mulai. Tech Quiztify adalah tempat
        untuk menguji pemahaman tentang teknologi, membuat kesalahan, dan
        menemukan apa yang ingin kamu pelajari berikutnya.
      </p>
      <div className="about-principles">
        <article>
          <span>01 / EXPLORE</span>
          <h2>Ikuti minatmu.</h2>
          <p>
            Jelajahi topik dari web development sampai AI. Pilih titik mulai
            sendiri.
          </p>
        </article>
        <article>
          <span>02 / PRACTICE</span>
          <h2>Berani salah.</h2>
          <p>
            Hasil kuis memberi gambaran tentang yang sudah dipahami dan yang
            perlu dilatih.
          </p>
        </article>
        <article>
          <span>03 / REPEAT</span>
          <h2>Datang lagi.</h2>
          <p>
            Pemahaman tumbuh lewat latihan. Satu tantangan kecil setiap kali.
          </p>
        </article>
      </div>
      <Link className="button" to="/course">
        Coba satu tantangan <ArrowUpRight />
      </Link>
    </div>
  );
}
function ComingSoon() {
  return (
    <div className="container empty-page">
      <p className="eyebrow">MASIH DI MEJA BELAJAR</p>
      <h1>Materi sedang disiapkan.</h1>
      <p>Sambil menunggu, uji pengetahuanmu lewat koleksi kuis.</p>
      <Link className="button" to="/course">
        Jelajahi kuis <ArrowRight />
      </Link>
    </div>
  );
}

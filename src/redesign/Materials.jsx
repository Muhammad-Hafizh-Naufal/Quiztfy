/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Play,
  Search,
  Video,
  FileText,
} from "lucide-react";
import useResource from "./useResource";
import "./materials.css";

function LoadState({ loading, error, retry }) {
  if (loading)
    return (
      <div className="notice" role="status">
        <span className="spinner" /> Menyiapkan materi…
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
function Thumbnail({ src, title }) {
  const [failed, setFailed] = useState(false);
  return src && !failed ? (
    <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} />
  ) : (
    <div className="material-cover-placeholder">
      <BookOpen size={50} strokeWidth={1.1} />
      <span>{title}</span>
    </div>
  );
}

export function MaterialCatalog() {
  const [params, setParams] = useSearchParams();
  const quizId = params.get("quizId");
  const [search, setSearch] = useState("");
  const resource = useResource(
    quizId ? `/quiz/${encodeURIComponent(quizId)}/materials` : "/materials",
  );
  const materials = Array.isArray(resource.data) ? resource.data : [];
  const visible = materials.filter((material) =>
    `${material.title} ${material.quiz.title}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <div className="container section">
      <p className="eyebrow">THE LEARNING ROOM / MATERI</p>
      <h1 className="page-title">
        Pahami dulu.
        <br />
        <span className="highlight">Uji kemudian.</span>
      </h1>
      <p className="intro">
        Belajar lewat video, satu bagian setiap kali. Pilih materi yang ingin
        kamu pahami, lalu coba kuisnya.
      </p>
      <div className="collection-toolbar">
        <div className="material-filter">
          <span className="eyebrow">
            {quizId
              ? materials[0]?.quiz.title || "MATERI UNTUK TOPIK INI"
              : "SEMUA MATERI"}
          </span>
          {quizId && (
            <button className="text-button" onClick={() => setParams({})}>
              Lihat semua materi
            </button>
          )}
        </div>
        <label className="search">
          <Search size={18} />
          <input
            aria-label="Cari materi"
            placeholder="Cari materi atau topik…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </div>
      <LoadState {...resource} />
      {!resource.loading && !resource.error && (
        <>
          <div className="material-grid">
            {visible.map((material) => (
              <article className="material-card" key={material.id}>
                <Link
                  className="material-cover"
                  to={`/materi/${material.id}`}
                  aria-label={`Pelajari ${material.title}`}
                >
                  <Thumbnail
                    src={material.thumbnailUrl}
                    title={material.title}
                  />
                  <span className="material-cover-badge">
                    {material.videoCount ? (
                      <>
                        <Play size={12} fill="currentColor" />{" "}
                        {material.videoCount} video
                      </>
                    ) : (
                      <>
                        <FileText size={13} /> Materi belajar
                      </>
                    )}
                  </span>
                </Link>
                <div className="material-card-body">
                  <p className="eyebrow">{material.quiz.title}</p>
                  <h2>
                    <Link to={`/materi/${material.id}`}>{material.title}</Link>
                  </h2>
                  <p>{material.content}</p>
                  <div className="material-meta">
                    <span>{material.sectionCount} bagian</span>
                    <span>
                      {material.videoCount
                        ? "Video & pembahasan"
                        : "Video belum tersedia"}
                    </span>
                  </div>
                  <div className="material-card-actions">
                    <Link className="text-link" to={`/materi/${material.id}`}>
                      Pelajari materi <ArrowRight size={17} />
                    </Link>
                    <Link className="text-link" to={`/quiz/${material.quizId}`}>
                      Kuis <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!visible.length && (
            <div className="notice">
              <BookOpen size={34} />
              <p>
                {search
                  ? "Tidak ada materi yang cocok. Coba kata kunci lain."
                  : "Materi untuk topik ini sedang disiapkan."}
              </p>
              <Link
                className="text-link"
                to={quizId ? `/quiz/${quizId}` : "/course"}
              >
                Tetap coba kuisnya <ArrowUpRight size={17} />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function VideoPlayer({ videos, title }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const video = videos[index];
  // Only trusted canonical embed URLs returned by the material API are rendered.
  let trusted = false;
  try {
    const url = new URL(video?.embedUrl);
    trusted =
      url.protocol === "https:" &&
      url.hostname === "www.youtube-nocookie.com" &&
      /^\/embed\/[\w-]{11}$/.test(url.pathname) &&
      !url.username &&
      !url.password &&
      !url.port;
  } catch {
    /* Missing or unsupported source uses the empty state. */
  }
  if (!trusted)
    return (
      <div className="video-empty">
        <Video size={40} strokeWidth={1.3} />
        <h3>Video belum tersedia</h3>
        <p>
          Kamu tetap bisa membaca materi atau melanjutkan ke bagian berikutnya.
        </p>
      </div>
    );
  // Derive the external link from the validated video ID, never an arbitrary URL.
  const id = new URL(video.embedUrl).pathname.split("/").pop();
  return (
    <>
      <div className="video-frame">
        {playing ? (
          <iframe
            title={`Video: ${title}`}
            src={`${video.embedUrl}&autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            className="video-poster"
            aria-label={`Putar video ${title}`}
            onClick={() => setPlaying(true)}
          >
            <Thumbnail src={video.thumbnailUrl} title={title} />
            <span className="play-circle">
              <Play size={30} fill="currentColor" />
            </span>
            <span className="poster-caption">
              PUTAR VIDEO / {video.provider}
            </span>
          </button>
        )}
      </div>
      {videos.length > 1 && (
        <div className="video-choices" aria-label="Pilihan video">
          {videos.map((item, i) => (
            <button
              key={item.id}
              className={index === i ? "active" : ""}
              aria-pressed={index === i}
              onClick={() => {
                setIndex(i);
                setPlaying(false);
              }}
            >
              Video {i + 1}
            </button>
          ))}
        </div>
      )}
      <div className="video-help">
        <span>Tidak bisa diputar di sini?</span>
        <a
          className="text-link"
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buka di YouTube <ArrowUpRight size={15} />
        </a>
      </div>
    </>
  );
}

export function MaterialDetail() {
  const { id } = useParams();
  const resource = useResource(`/materials/${encodeURIComponent(id)}`);
  return (
    <div className="container material-detail">
      <Link className="text-link" to="/materi">
        <ArrowLeft size={16} /> Semua materi
      </Link>
      <LoadState {...resource} />
      {resource.data && <MaterialLesson key={id} material={resource.data} />}
    </div>
  );
}
function MaterialLesson({ material }) {
  const [params, setParams] = useSearchParams();
  const sections = material.sections;
  const requested = sections.findIndex(
    (section) => String(section.id) === params.get("section"),
  );
  const index = requested >= 0 ? requested : 0;
  const section = sections[index];
  const heading = useRef(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [section?.id]);
  function navigateSection(next) {
    setParams({ section: String(sections[next].id) });
  }
  return (
    <>
      <header className="material-heading">
        <p className="eyebrow">{material.quiz.title} / RUANG BELAJAR</p>
        <h1>{material.title}</h1>
        <p>{material.content}</p>
        <div className="material-meta">
          <span>
            <BookOpen size={14} /> {sections.length} bagian
          </span>
          <span>
            <Video size={14} /> {material.videoCount} video
          </span>
        </div>
      </header>
      <div className="lesson-layout">
        <div className="lesson-main">
          {section ? (
            <>
              <p className="eyebrow">
                BAGIAN {String(index + 1).padStart(2, "0")} /{" "}
                {String(sections.length).padStart(2, "0")}
              </p>
              <h2 ref={heading} tabIndex={-1} className="lesson-title">
                {section.title}
              </h2>
              <VideoPlayer
                key={section.id}
                videos={section.videos}
                title={section.title}
              />
              {section.content && (
                <section className="lesson-notes">
                  <p className="eyebrow">CATATAN BELAJAR</p>
                  <div className="material-text">{section.content}</div>
                </section>
              )}
              {section.images.length > 0 && (
                <div className="lesson-images">
                  {section.images.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Ilustrasi ${section.title} ${i + 1}`}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
              <div className="lesson-navigation">
                <button
                  className="button secondary"
                  disabled={index === 0}
                  onClick={() => navigateSection(index - 1)}
                >
                  <ArrowLeft size={17} /> Sebelumnya
                </button>
                {index < sections.length - 1 ? (
                  <button
                    className="button"
                    onClick={() => navigateSection(index + 1)}
                  >
                    Bagian berikutnya <ArrowRight size={17} />
                  </button>
                ) : (
                  <Link className="button" to={`/quiz/${material.quizId}`}>
                    Uji pemahaman <ArrowUpRight size={17} />
                  </Link>
                )}
              </div>
            </>
          ) : (
            <div className="video-empty">
              <BookOpen size={36} />
              <h2>Bagian materi sedang disiapkan.</h2>
              <p>Baca ringkasan di atas atau langsung coba kuisnya.</p>
            </div>
          )}
        </div>
        <aside className="lesson-sidebar">
          <p className="eyebrow">DAFTAR BAGIAN</p>
          <h2>Pelan-pelan, sampai paham.</h2>
          <nav aria-label="Bagian materi">
            <ol className="lesson-list">
              {sections.map((item, i) => (
                <li key={item.id}>
                  <button
                    className={i === index ? "active" : ""}
                    aria-current={i === index ? "step" : undefined}
                    onClick={() => navigateSection(i)}
                  >
                    <span className="lesson-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>
                        {item.videos.length
                          ? `${item.videos.length} video`
                          : "Video belum tersedia"}
                      </small>
                    </span>
                    {item.videos.length ? (
                      <Play size={13} />
                    ) : (
                      <FileText size={13} />
                    )}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <div className="lesson-quiz">
            <p className="eyebrow">SUDAH SIAP?</p>
            <h3>Beri pemahamanmu tantangan.</h3>
            <Link className="button" to={`/quiz/${material.quizId}`}>
              Mulai kuis <ArrowUpRight size={17} />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

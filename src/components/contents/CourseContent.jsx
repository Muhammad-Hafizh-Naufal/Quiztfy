import React, { useEffect, useState, useMemo, useCallback } from "react"; // Tambahkan useMemo dan useCallback
import { useParams } from "react-router-dom";
import service from "../../services/service"; // Pastikan path ini benar
import "../../styles/CourseContent.css"; // Pastikan path ini benar
import Loading from "../Loading"; // Komponen Loading Anda

// Fungsi helper untuk merender konten terstruktur
// Tidak banyak perubahan di sini, diasumsikan sudah berfungsi sesuai kebutuhan.
// Pertimbangkan untuk memindahkannya ke file terpisah jika sangat panjang atau digunakan di tempat lain.
function renderStructuredContent(text) {
  if (!text || typeof text !== "string") {
    return <p className="text-muted">Konten tekstual tidak tersedia.</p>;
  }

  const blocks = text.split(/\n\s*\n/);
  const elements = blocks.reduce((acc, block, index) => {
    const trimmedBlock = block.trim();
    if (!trimmedBlock) return acc;

    const lines = trimmedBlock.split("\n");
    // Logika untuk list (ul/li)
    if (
      lines.length > 0 &&
      lines.every((line) => /^\s*([-*]|\d+\.)\s/.test(line.trimStart()))
    ) {
      acc.push(
        <ul key={`list-${index}`} className="structured-list mb-3 ps-4">
          {lines.map((item, itemIndex) => (
            <li key={itemIndex}>
              {item.trimStart().replace(/^\s*([-*]|\d+\.)\s*/, "")}
            </li>
          ))}
        </ul>
      );
      // Logika untuk heading atau paragraf tunggal
    } else if (lines.length === 1) {
      const line = lines[0];
      const isLikelyHeading =
        line.includes("📜") ||
        (line.endsWith(":") && line.length < 100) ||
        (line.length < 70 &&
          !line.includes(".") &&
          line !== line.toUpperCase());

      if (isLikelyHeading) {
        const HeadingTag =
          line.includes("📜") || line.length < 40 ? "h3" : "h4";
        const headingClass =
          HeadingTag === "h3"
            ? "structured-heading-3 mt-4 mb-2"
            : "structured-heading-4 mt-3 mb-2";
        acc.push(
          React.createElement(
            HeadingTag,
            { key: `heading-${index}`, className: headingClass },
            line
          )
        );
      } else {
        acc.push(
          <p key={`p-${index}`} className="structured-paragraph mb-3">
            {line}
          </p>
        );
      }
      // Logika untuk blok paragraf multi-baris
    } else {
      acc.push(
        <p
          key={`p-${index}`}
          className="structured-paragraph mb-3"
          style={{ whiteSpace: "pre-line" }}
        >
          {trimmedBlock}
        </p>
      );
    }
    return acc;
  }, []);

  return elements.length > 0 ? (
    elements
  ) : (
    <p className="text-muted">Konten tidak dapat ditampilkan.</p>
  );
}

// Fungsi helper untuk mengkonversi URL YouTube ke format embed
function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== "string") return "";
  // Regex yang lebih kuat untuk berbagai format URL YouTube, termasuk shorts
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : ""; // Mengembalikan string kosong jika tidak valid
}

export default function CourseContent() {
  const { materialId } = useParams();
  const [contentItems, setContentItems] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Mulai dengan true untuk loading awal
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!materialId) {
        setError("Material ID tidak valid atau tidak ditemukan.");
        setIsLoading(false);
        setContentItems([]);
        return;
      }

      setIsLoading(true);
      setError(null); // Reset error sebelum fetch baru
      try {
        const sections = await service.getSectionsByMaterialId(materialId);
        setContentItems(Array.isArray(sections) ? sections : []); // Pastikan sections adalah array
      } catch (err) {
        console.error("Gagal mengambil data section:", err);
        setError(err.message || "Terjadi kesalahan saat memuat konten kursus.");
        setContentItems([]); // Kosongkan item jika ada error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [materialId]); // Hanya jalankan ulang jika materialId berubah

  const handleSelectSection = useCallback((section) => {
    setSelectedSection(section);
    if (window.innerWidth < 768) {
      // md breakpoint Bootstrap
      setIsSidebarOpen(false);
    }
  }, []); // useCallback karena fungsi ini tidak bergantung pada state lain yang sering berubah

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // Memoized structured content
  const structuredContentToDisplay = useMemo(() => {
    if (selectedSection?.content) {
      return renderStructuredContent(selectedSection.content);
    }
    return (
      <p className="text-muted">
        Tidak ada deskripsi atau konten tekstual untuk bagian ini.
      </p>
    );
  }, [selectedSection?.content]);

  // Komponen untuk menampilkan status di area konten utama
  const MainContentPlaceholder = () => {
    if (error) {
      return (
        <div className="placeholder-content text-center text-danger">
          <h4>Oops! Terjadi Kesalahan</h4>
          <p>{error}</p>
        </div>
      );
    }
    if (contentItems.length === 0) {
      return (
        <div className="placeholder-content text-center text-muted">
          <h4>Konten Tidak Tersedia</h4>
          <p>Belum ada bagian yang dapat ditampilkan untuk materi ini.</p>
        </div>
      );
    }
    return (
      <div className="placeholder-content text-center text-muted">
        {/* Anda bisa menambahkan ikon atau ilustrasi di sini */}
        {/* <i className="bi bi-journal-text display-1 mb-3"></i> */}
        <h4>Pilih Bagian Konten</h4>
        <p>
          Silakan pilih salah satu bagian dari menu di samping untuk memulai.
        </p>
      </div>
    );
  };

  // Render utama komponen
  if (isLoading) {
    // Pastikan komponen Loading Anda bisa menerima prop 'show' atau sejenisnya,
    // atau dirancang sebagai overlay yang menutupi layar.
    // Jika Loading adalah overlay, Anda mungkin tidak perlu return di sini dan bisa menampilkannya secara kondisional di JSX utama.
    // Untuk contoh ini, kita anggap Loading adalah komponen yang mengisi halaman.
    return (
      <div className="course-content-page container-fluid min-vh-100 d-flex justify-content-center align-items-center">
        <Loading />
        {/* Atau jika Loading adalah komponen kecil:
        <div>
          <Loading />
          <p>Memuat Konten...</p>
        </div>
        */}
      </div>
    );
  }

  return (
    <div className="course-content-page container-fluid min-vh-100 d-flex flex-column">
      {contentItems.length > 0 && (
        <button
          className="btn btn-warning position-fixed bottom-0 end-0 m-4 shadow-lg rounded-pill px-4 py-2 d-flex align-items-center gap-2 animate__animated animate__fadeIn d-md-none"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          aria-expanded={isSidebarOpen}
        >
          <i className="bi bi-list fs-5"></i>
          <span className="fw-semibold">Materi</span>
        </button>
      )}

      <div className="row flex-grow-1">
        {/* Sidebar */}
        {contentItems.length > 0 && ( // Hanya tampilkan sidebar jika ada item
          <nav
            className={`col-md-3 col-lg-2 sidebar bg-light border-end py-4 ${
              isSidebarOpen ? "open" : ""
            }`}
            aria-label="Daftar Isi Kursus"
          >
            <div className="position-sticky" style={{ top: "20px" }}>
              <h5 className="sidebar-title px-3 mb-3">Daftar Isi</h5>
              <ul className="list-group list-group-flush">
                {contentItems.map((section) => (
                  <li
                    key={section.id}
                    className={`list-group-item list-group-item-action p-3 ${
                      selectedSection?.id === section.id ? "active-section" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelectSection(section)}
                    role="button" // Tambahkan role untuk aksesibilitas
                    tabIndex={0} // Memungkinkan fokus keyboard
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSelectSection(section)
                    } // Memungkinkan pemilihan dengan Enter
                  >
                    <div className="fw-semibold">
                      {section.title || "Bagian Tanpa Judul"}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        {/* Main Content Area */}
        <main
          className={`${
            contentItems.length > 0 ? "col-md-9 ms-sm-auto col-lg-10" : "col-12"
          } px-md-4 py-4 main-content-area`}
        >
          {selectedSection ? (
            <>
              {/* Area untuk menampilkan video (jika ada, dengan asumsi 'images' berisi data video) */}
              {/* Idealnya, nama properti adalah 'videos' jika memang untuk video */}
              {selectedSection.images && selectedSection.images.length > 0 && (
                <div className="videos-area mb-4">
                  {/* <h5 className="mb-3 images-title">Video Materi</h5> */}
                  {selectedSection.images.map((mediaItem, index) => {
                    // Asumsi: jika imageUrl mengandung 'youtube' atau 'youtu.be', itu adalah video.
                    // Anda mungkin perlu logika yang lebih baik untuk membedakan gambar dan video.
                    const videoUrl = getYouTubeEmbedUrl(mediaItem.imageUrl);
                    if (videoUrl) {
                      // Jika ini adalah URL video YouTube yang valid
                      return (
                        <div
                          key={mediaItem.id || `video-${index}`}
                          className="mb-4"
                        >
                          <div className="ratio ratio-16x9 ">
                            <iframe
                              src={videoUrl}
                              title={
                                mediaItem.title || `Video Materi ${index + 1}`
                              }
                              className="rounded rounded-5 shadow "
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            ></iframe>
                          </div>

                          <h2 className="main-title my-3 border-bottom pb-2">
                            {selectedSection.title || "Konten Bagian"}
                          </h2>

                          {mediaItem.caption && (
                            <p className="text-muted text-center mt-1">
                              <small>{mediaItem.caption}</small>
                            </p>
                          )}
                        </div>
                      );
                    }

                    // Fallback untuk merender sebagai gambar jika bukan video YouTube
                    // (atau jika Anda memiliki properti lain untuk gambar)
                    return (
                      <figure
                        key={mediaItem.id || `image-${index}`}
                        className="text-center m-2"
                      >
                        <img
                          src={mediaItem.imageUrl}
                          alt={mediaItem.caption || `Gambar ${index + 1}`}
                          className="img-fluid rounded shadow-sm"
                          style={{ maxHeight: "400px", maxWidth: "100%" }}
                        />
                        {mediaItem.caption && (
                          <figcaption className="mt-1 text-muted small">
                            {mediaItem.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  })}
                </div>
              )}

              {/* Area untuk menampilkan konten teks yang sudah diproses */}
              <div className="text-content-area mb-4">
                {structuredContentToDisplay}
              </div>
            </>
          ) : (
            // Tampilkan placeholder jika tidak ada section terpilih (setelah loading selesai)
            <MainContentPlaceholder />
          )}
        </main>
      </div>
    </div>
  );
}

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Muhammad Hafizh Naufal",
    email: "hapis@email.com",
    phone: "08123456789",
    institution: "Universitas Gunadarma",
    major: "Sistem Informasi",
    semester: "6",
  });

  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  // Dummy data untuk statistik
  const stats = {
    totalQuizzes: 45,
    completedQuizzes: 38,
    averageScore: 85,
    totalLearningTime: "24 jam",
    streak: 7,
    rank: 12,
  };

  const recentActivities = [
    {
      type: "quiz",
      title: "JavaScript Fundamentals",
      score: 90,
      date: "2024-06-07",
    },
    {
      type: "material",
      title: "React Hooks",
      progress: 100,
      date: "2024-06-06",
    },
    { type: "quiz", title: "CSS Grid Layout", score: 78, date: "2024-06-05" },
    {
      type: "material",
      title: "Node.js Basics",
      progress: 60,
      date: "2024-06-04",
    },
  ];

  const achievements = [
    { title: "First Quiz Completed", icon: "🏆", earned: true },
    { title: "Perfect Score", icon: "⭐", earned: true },
    { title: "7 Day Streak", icon: "🔥", earned: true },
    { title: "Top 20 Leaderboard", icon: "🥉", earned: true },
    { title: "Speed Runner", icon: "⚡", earned: false },
    { title: "Knowledge Master", icon: "🎓", earned: false },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setTempUserInfo(userInfo);
  };

  const handleSave = () => {
    setUserInfo(tempUserInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUserInfo(userInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <main className="min-vh-100 full-page-bg">
        <div className="container py-5">
          {/* Profile Header */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="bg-dark text-white rounded-4 p-4 text-center">
                <div className="position-relative d-inline-block mb-3">
                  <img
                    src="https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg"
                    alt="Profile"
                    className="rounded-circle border border-3 border-light"
                    width="120"
                    height="120"
                  />
                  <span className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-1">
                    <i className="bi bi-check-circle-fill text-white"></i>
                  </span>
                </div>
                <h2 className="fontG fw-bold animated-gradient-text mb-2">
                  {userInfo.name}
                </h2>
                <p className="mb-1">{userInfo.institution}</p>
                <p className="text-muted">
                  {userInfo.major} - Semester {userInfo.semester}
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Left Column - User Info */}
            <div className="col-lg-4 mb-4">
              <div className="bg-white rounded-4 shadow p-4 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Informasi Pengguna</h5>
                  {!isEditing ? (
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={handleEdit}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                  ) : (
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-success" onClick={handleSave}>
                        <i className="bi bi-check"></i> Simpan
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCancel}
                      >
                        <i className="bi bi-x"></i> Batal
                      </button>
                    </div>
                  )}
                </div>

                {!isEditing ? (
                  <div>
                    <div className="mb-3">
                      <small className="text-muted">Nama Lengkap</small>
                      <p className="mb-0 fw-medium">{userInfo.name}</p>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Email</small>
                      <p className="mb-0 fw-medium">{userInfo.email}</p>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">No. Telepon</small>
                      <p className="mb-0 fw-medium">{userInfo.phone}</p>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Institusi</small>
                      <p className="mb-0 fw-medium">{userInfo.institution}</p>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Jurusan</small>
                      <p className="mb-0 fw-medium">{userInfo.major}</p>
                    </div>
                    <div className="mb-0">
                      <small className="text-muted">Semester</small>
                      <p className="mb-0 fw-medium">{userInfo.semester}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={tempUserInfo.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={tempUserInfo.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        No. Telepon
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        value={tempUserInfo.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        Institusi
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={tempUserInfo.institution}
                        onChange={(e) =>
                          handleInputChange("institution", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        Jurusan
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={tempUserInfo.major}
                        onChange={(e) =>
                          handleInputChange("major", e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-0">
                      <label className="form-label small text-muted">
                        Semester
                      </label>
                      <select
                        className="form-select"
                        value={tempUserInfo.semester}
                        onChange={(e) =>
                          handleInputChange("semester", e.target.value)
                        }
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                          <option key={sem} value={sem}>
                            {sem}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
              {/* Achievements
              <div className="bg-white rounded-4 shadow p-4">
                <h5 className="fw-bold mb-3">Pencapaian</h5>
                <div className="row g-2">
                  {achievements.map((achievement, index) => (
                    <div className="col-6" key={index}>
                      <div
                        className={`text-center p-3 rounded-3 ${
                          achievement.earned
                            ? "bg-light border border-success"
                            : "bg-light opacity-50"
                        }`}
                      >
                        <div className="fs-4 mb-1">{achievement.icon}</div>
                        <small
                          className={
                            achievement.earned
                              ? "text-dark fw-medium"
                              : "text-muted"
                          }
                        >
                          {achievement.title}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Right Column - Stats & Activities */}
            <div className="col-lg-8">
              {/* Statistics Cards */}
              {/* <div className="row mb-4">
                <div className="col-md-4 mb-3">
                  <div className="bg-white rounded-4 shadow p-4 text-center">
                    <div className="text-primary fs-2 mb-2">
                      <i className="bi bi-journal-check"></i>
                    </div>
                    <h4 className="fw-bold text-primary mb-1">
                      {stats.completedQuizzes}
                    </h4>
                    <small className="text-muted">Kuis Selesai</small>
                    <div className="mt-2">
                      <small className="text-muted">
                        dari {stats.totalQuizzes} total
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="bg-white rounded-4 shadow p-4 text-center">
                    <div className="text-success fs-2 mb-2">
                      <i className="bi bi-graph-up"></i>
                    </div>
                    <h4 className="fw-bold text-success mb-1">
                      {stats.averageScore}%
                    </h4>
                    <small className="text-muted">Rata-rata Skor</small>
                    <div className="mt-2">
                      <div className="progress" style={{ height: "4px" }}>
                        <div
                          className="progress-bar bg-success"
                          style={{ width: `${stats.averageScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="bg-white rounded-4 shadow p-4 text-center">
                    <div className="text-warning fs-2 mb-2">
                      <i className="bi bi-fire"></i>
                    </div>
                    <h4 className="fw-bold text-warning mb-1">
                      {stats.streak}
                    </h4>
                    <small className="text-muted">Hari Berturut</small>
                    <div className="mt-2">
                      <small className="text-muted">Keep it up!</small>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Additional Stats */}
              {/* <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <div className="bg-white rounded-4 shadow p-4">
                    <div className="d-flex align-items-center">
                      <div className="text-info fs-3 me-3">
                        <i className="bi bi-clock"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0">
                          {stats.totalLearningTime}
                        </h5>
                        <small className="text-muted">
                          Total Waktu Belajar
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="bg-white rounded-4 shadow p-4">
                    <div className="d-flex align-items-center">
                      <div className="text-danger fs-3 me-3">
                        <i className="bi bi-trophy"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0">#{stats.rank}</h5>
                        <small className="text-muted">
                          Peringkat Leaderboard
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Recent Activities */}
              {/* <div className="bg-white rounded-4 shadow p-4">
                <h5 className="fw-bold mb-3">Aktivitas Terbaru</h5>
                <div className="timeline">
                  {recentActivities.map((activity, index) => (
                    <div className="d-flex mb-3" key={index}>
                      <div className="flex-shrink-0 me-3">
                        <div
                          className={`rounded-circle p-2 ${
                            activity.type === "quiz"
                              ? "bg-primary"
                              : "bg-success"
                          }`}
                        >
                          <i
                            className={`bi ${
                              activity.type === "quiz"
                                ? "bi-question-circle"
                                : "bi-book"
                            } text-white`}
                          ></i>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 fw-medium">{activity.title}</h6>
                        <div className="d-flex align-items-center gap-3 mb-1">
                          {activity.type === "quiz" ? (
                            <span
                              className={`badge ${
                                activity.score >= 80
                                  ? "bg-success"
                                  : activity.score >= 60
                                  ? "bg-warning"
                                  : "bg-danger"
                              }`}
                            >
                              Skor: {activity.score}%
                            </span>
                          ) : (
                            <span className="badge bg-success">
                              Progress: {activity.progress}%
                            </span>
                          )}
                        </div>
                        <small className="text-muted">
                          <i className="bi bi-calendar3"></i>{" "}
                          {new Date(activity.date).toLocaleDateString("id-ID")}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-outline-primary">
                    <i className="bi bi-eye"></i> Lihat Semua Aktivitas
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

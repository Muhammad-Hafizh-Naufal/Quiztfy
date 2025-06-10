// Frontend - Perbaikan untuk Profile Component
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import service from "../services/service";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [tempUserInfo, setTempUserInfo] = useState({});
  const [newPassword, setNewPassword] = useState(""); // State terpisah untuk password baru
  const [confirmPassword, setConfirmPassword] = useState(""); // Konfirmasi password

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await service.getUserInfo();
        setUserInfo(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setTempUserInfo(userInfo);
    setNewPassword(""); // Reset password fields
    setConfirmPassword("");
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Validasi password jika diisi
      if (newPassword && newPassword !== confirmPassword) {
        alert("Password dan konfirmasi password tidak cocok!");
        return;
      }

      // Buat data untuk dikirim
      const updateData = {
        fullName: tempUserInfo.fullName,
      };

      // Hanya tambahkan password jika diisi
      if (newPassword && newPassword.trim() !== "") {
        updateData.password = newPassword;
      }

      await service.updateUser(updateData);
      setUserInfo(tempUserInfo);
      setIsEditing(false);
      setNewPassword("");
      setConfirmPassword("");
      alert("Data berhasil diperbarui!");
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan perubahan.");
    }
  };

  const handleCancel = () => {
    setTempUserInfo(userInfo);
    setNewPassword("");
    setConfirmPassword("");
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
                  {userInfo.fullName}
                </h2>
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
                      <p className="mb-0 fw-medium">{userInfo.fullName}</p>
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
                        value={tempUserInfo.fullName || ""}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
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
                        value={tempUserInfo.email || ""}
                        disabled
                      />
                      <small className="text-muted">
                        Email tidak dapat diubah
                      </small>
                    </div>

                    {/* Section untuk ubah password */}
                    <div className="border-top pt-3 mt-3">
                      <h6 className="text-muted mb-3">
                        Ubah Password (Opsional)
                      </h6>
                      <div className="mb-3">
                        <label className="form-label small text-muted">
                          Password Baru
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Kosongkan jika tidak ingin mengubah password"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label small text-muted">
                          Konfirmasi Password Baru
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Ulangi password baru"
                        />
                      </div>
                      {newPassword &&
                        confirmPassword &&
                        newPassword !== confirmPassword && (
                          <small className="text-danger">
                            Password tidak cocok!
                          </small>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Stats & Activities */}
            <div className="col-lg-8">
              {/* Konten lainnya bisa ditambahkan di sini */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

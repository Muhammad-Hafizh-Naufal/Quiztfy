export default function Leaderboard() {
  const dataLeaderboard = [
    { no: 1, nama: "Hapis", score: 95 },
    { no: 2, nama: "Bagas", score: 90 },
    { no: 3, nama: "Naufal", score: 85 },
    { no: 4, nama: "Azmi", score: 80 },
    { no: 5, nama: "Al Hafizh", score: 75 },
    { no: 6, nama: "Hapis", score: 95 },
    { no: 7, nama: "Bagas", score: 90 },
    { no: 8, nama: "Naufal", score: 85 },
    { no: 9, nama: "Azmi", score: 80 },
    { no: 10, nama: "Al Hafizh", score: 75 },
    { no: 11, nama: "Hapis", score: 95 },
    { no: 12, nama: "Bagas", score: 90 },
    { no: 13, nama: "Naufal", score: 85 },
    { no: 14, nama: "Azmi", score: 80 },
    { no: 15, nama: "Al Hafizh", score: 75 },
  ];

  return (
    <div className="container min-vh-100 py-5 d-flex flex-column align-items-center">
      <h1 className="text-center mb-4 fw-bold text-primary">
        🏆 Leaderboard 🏆
      </h1>
      <div
        className="table-responsive w-75 shadow-lg p-3 bg-white rounded"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <table className="table table-hover text-center align-middle">
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-3">No</th>
              <th className="py-3">Nama</th>
              <th className="py-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {dataLeaderboard.map((player, index) => (
              <tr key={index} className="fs-5">
                <td className="fw-bold text-secondary">{player.no}</td>
                <td className="fw-semibold">{player.nama}</td>
                <td className="fw-bold text-success">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

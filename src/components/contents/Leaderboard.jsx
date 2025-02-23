import service from "../../services/service";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [dataLeaderboard, setDataLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.leaderboard();
        setDataLeaderboard(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
            {dataLeaderboard.map((user, index) => (
              <tr key={index} className="fs-5">
                <td className="fw-bold text-secondary">{index + 1}</td>
                <td className="fw-semibold">{user.fullName}</td>
                <td className="fw-bold text-success">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

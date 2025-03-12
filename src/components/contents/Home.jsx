import "bootstrap-icons/font/bootstrap-icons.css";

export default function Home() {
  return (
    <>
      <div className="container vh-100 d-flex align-items-center">
        {/* content 1 */}
        <div className="row w-100">
          <div className="col-md-7 d-flex flex-column justify-content-center">
            <h1>Challenge Yourself, Learn More, Dominate the Leaderboard!</h1>
            <p>
              Test your skills with interactive quizzes, explore learning
              materials, and see who tops the leaderboard. Sharpen your
              knowledge every day!
            </p>
            <a className="btn btn-primary align-self-start " href="#">
              <i className="bi bi-play-fill "></i>
              Start Now
            </a>
          </div>
          <div className="col d-flex justify-content-start">
            <img
              src="assets/todolist.png"
              alt="To-do list"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      <section className="d-flex bg-primary container rounded w-75 h-75">
        <div className="text-center d-flex align-items-center justify-content-center flex-column bg-warning col-md-2">
          <h2>Choose Your Path</h2>
          <p>
            Explore learning materials, test your skills with quizzes, and climb
            the leaderboard.
          </p>
        </div>
        <div>
          <div className="d-flex align-items-center">
            <img src="assets/category/Materi.png" alt="" />
            <h2>Learn & Explore</h2>
          </div>
          <div className="d-flex align-items-center">
            <img src="assets/category/Materi.png" alt="" />
            <h2>Learn & Explore</h2>
          </div>
          <div className="d-flex align-items-center">
            <img src="assets/category/Materi.png" alt="" />
            <h2>Learn & Explore</h2>
          </div>
        </div>
      </section>
    </>
  );
}

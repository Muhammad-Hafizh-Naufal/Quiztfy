import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCategory from "../components/contents/CourseCategory";

export default function Course() {
  return (
    <>
      <div>
        <Navbar />
        <CourseCategory />
        <Footer />
      </div>
    </>
  );
}

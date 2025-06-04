import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseContent from "../components/contents/CourseContent";
export default function CourseSection() {
  return (
    <>
      <div>
        <Navbar />
        <CourseContent />
        <Footer />
      </div>
    </>
  );
}

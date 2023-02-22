import Navbar from "../Navbar/Navbar";
import Leftbar from "../Leftbar/Leftbar";
import Middle from "../Middle/Middle";
import Rightbar from "../Rightbar/Rightbar";
import "./Home.css";
import ScrollButton from "../ScrollButton/ScrollButton";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <Leftbar />
        <Middle />
        <Rightbar />
      </div>
      <ScrollButton />
    </>
  );
};

export default Home;

import Navbar from "../components/Navbar";

const Favorite = () => {
  return (
    <div style={{ backgroundColor: "#EAEFF8", minHeight: "100vh" }}>
    <div className="flex flex-col md:flex-row">
      <div className="md:mr-4">
        <Navbar />
      </div>
      <main>Favorite</main>
    </div>
    </div>
  );
};
export default Favorite;

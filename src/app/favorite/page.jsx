import Navbar from "../components/Navbar";

const Favorite = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:mr-4">
        <Navbar />
      </div>
      <main>Favorite</main>
    </div>
  );
};
export default Favorite;

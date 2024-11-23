import Navbar from "../components/Navbar";
import Image from "next/image";
// const url = "https://jsonplaceholder.typicode.com/todos";
import Link from "next/link";

// const fetchTodos = async () => {
//   await new Promise((resolve) => setInterval(resolve, 1000));

//   const res = await fetch(url);
//   const data = await res.json();
//   // console.log(data)
//   return data;
// };

const Profile = async () => {
  // const data = await fetchTodos();
  // console.log(data);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:mr-4">
        <Navbar />
      </div>
      <main className="overflow-auto h-screen w-full">
        Profile
        <div className="grid grid-cols-3 mt-3 gap-5">
          <div className="shadow-xl my-10 p-10 rounded-xl">
            <h4>Post Title</h4>
            <Image
              src="/path/to/image.jpg"
              width={400}
              height={400}
              alt="image"
              priority
            />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="mt-5">
              <Link
                className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg "
                href="/edit"
              >
                Edit
              </Link>
              <Link
                className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg "
                href="/edit"
              >
                Delete
              </Link>
            </div>
          </div>
          <div className="shadow-xl my-10 p-10 rounded-xl">
            <h4>Post Title</h4>
            <Image
              src="/path/to/image.jpg"
              width={400}
              height={400}
              alt="image"
              priority
            />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="mt-5">
              <Link
                className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg "
                href="/edit"
              >
                Edit
              </Link>
              <Link
                className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg "
                href="/edit"
              >
                Delete
              </Link>
            </div>
          </div>
          <div className="shadow-xl my-10 p-10 rounded-xl">
            <h4>Post Title</h4>
            <Image
              src="/path/to/image.jpg"
              width={400}
              height={400}
              alt="image"
              priority
            />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="mt-5">
              <Link
                className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg "
                href="/edit"
              >
                Edit
              </Link>
              <Link
                className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg "
                href="/edit"
              >
                Delete
              </Link>
            </div>
          </div>
          <div className="shadow-xl my-10 p-10 rounded-xl">
            <h4>Post Title</h4>
            <Image
              src="/path/to/image.jpg"
              width={400}
              height={400}
              alt="image"
              priority
            />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="mt-5">
              <Link
                className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg "
                href="/edit"
              >
                Edit
              </Link>
              <Link
                className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg "
                href="/edit"
              >
                Delete
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Profile;

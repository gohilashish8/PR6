import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Swal from "sweetalert2";

function App() {
  const [data, setdata] = useState({
    fullName: "",
    mNumber: "",
    email: "",
  });

  const [allRecords, setallRecords] = useState([]);

  const hendleformSubmit = (e) => {
    e.preventDefault();
  
    const isDuplicate = allRecords.some(
      (record) =>
        record.fullName === data.fullName &&
        record.mNumber === data.mNumber &&
        record.email === data.email
    );
  
    if (isDuplicate) {
      toast.error("Data already exists in the table.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (data.fullName && data.mNumber && data.email !== "") {
      setallRecords([
        ...allRecords,
        { fullName: data.fullName, mNumber: data.mNumber, email: data.email },
      ]);
      toast.success("Form successfully added", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setdata({ fullName: "", mNumber: "", email: "" });
    } else {
      toast.error("Please fill the form.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  

 

  const hendleInput = ({ target }) => {
    const { value, name } = target;
    setdata({ ...data, [name]: value });
  };

  const hendleRemove = (fullName
    
    ) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your Details has been deleted.", "success");
        const filterData = allRecords.filter(
          (item) => item.fullName !== fullName

          
        );
        setallRecords(filterData);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary Details is safe :)", "error");
      }
      scrollTo;
    });
  };

  return (
    <>
      <div className="relative flex flex-col justify-center  py-[30px] overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl ring-indigo-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-indigo-700  uppercase decoration-wavy">
            Form
          </h1>
          <form className="mt-6" onSubmit={hendleformSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Enter Your Full Name
              </label>
              <input
                value={data.fullName}
                onChange={hendleInput}
                name="fullName"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                className="
               text-sm font-semibold text-gray-800"
              >
                Enter Your Mobile Number
              </label>
              <input
                maxLength="10"
                value={data.mNumber}
                onChange={hendleInput}
                name="mNumber"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                className="
               text-sm font-semibold text-gray-800"
              >
                Enter Your Email
              </label>
              <input
                value={data.email}
                onChange={hendleInput}
                name="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="relative overflow-x-auto w-[70%] mx-auto">
        {allRecords.length >= 1 && (
          <table className="w-full text-sm  text-gray-500 dark:text-gray-400 mb-5 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  fullName
                </th>
                <th scope="col" className="px-6 py-3">
                  Mobile Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allRecords.map((val, id) => {
                return (
                  <tr
                    key={val.email}
                    className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th className="px-6 py-4">{id + 1}</th>
                    <td className="px-6 py-4">{val.fullName}</td>
                    <td className="px-6 py-4">{val.mNumber}</td>
                    <td className="px-6 py-4">{val.email}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          hendleRemove(val.fullName);
                        }}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer />
    </>
  );
}

export default App;

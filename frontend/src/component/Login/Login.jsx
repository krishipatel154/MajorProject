import "./Login.css";

const Login = () => {
  return (
    <>
      {/* <div className="h-[200px] w-[50%] m-auto">
        <form className="flex bg-red-500 flex-col p-0 m-0">
          <h1 className="text-center mt-[10px] mb-[10px]">Login Here</h1>
          <div className="m-auto text-center w-[50%] flex flex-col">
            <label
              for="email"
              class="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[35px]  m-auto"
              placeholder="name@company.com"
              required=""
            />
          </div>
          <button id="send" className="btn m-auto mt-[5px] mb-[5px]">
            SEND OTP
          </button>
        </form>
      </div> */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Sign Up</h3>
          <div className="mt-4 space-y-2">
            <span>Email</span>
            <br />
            <input
              type="email"
              className="w-80 px-3 py-1 rounded-md border outline-none"
              placeholder="Enter your email..."
            />
          </div>
          <div className="mt-4 space-y-2">
            <span>Password</span>
            <br />
            <input
              type="password"
              className="w-80 px-3 py-1 rounded-md border outline-none"
              placeholder="Enter your password..."
            />
          </div>
          <div className="flex justify-around mt-5">
            <button className="bg-pink-500 text-white px-3 py-1 rounded-md hover:bg-pink-700 duration-200">
              Login
            </button>
            <p>
              Don't have account?
              <span className="underline text-blue-500">
                <button>Login</button>
              </span>
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Login;

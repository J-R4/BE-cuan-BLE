import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-full">
      <div className="box-content object-center h-full w-4/12 mx-auto mt-24 shadow-2xl p-4 border-0 text-center" style={{ height: "400px" }}>
        <div className="grid h-4/5 grid-cols-2 gap-4">
          <div className="h-full border-0 shadow-xl">
            <img className="object-center my-24 mx-auto" src="../CUAN.png" alt="CM Logo" width="200px" height="500px" />
          </div>
          <div>
            <div className="border-0 shadow-xl h-1/2">
              <Link to="/watch">
                <button className="py-0 px-1 font-small shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none">
                  WatchList
                </button>
                <img className="object-contain h-3/4 w-full" src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80" alt="CM Logo" width="200px" height="500px" />
              </Link>
            </div>
            <div className="py-1 border-0 shadow-xl h-1/2 hover:scale-110 motion-reduce:transform-none">
              <Link to="/stock">
                <button className="py-0 px-1 font-small shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none">
                  Stocklist
                </button>
                <img className="object-contain h-3/4 w-full" src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="CM Logo" width="200px" height="500px" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
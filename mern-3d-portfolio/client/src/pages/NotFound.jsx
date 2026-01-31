import { Link } from 'react-router-dom';
import { GiSkullCrossedBones, GiReturnArrow } from 'react-icons/gi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <GiSkullCrossedBones className="text-9xl text-red-500 mx-auto animate-pulse" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white font-space mb-4">
          404
        </h1>

        <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500 rounded mb-6">
          <span className="text-red-500 font-mono text-sm">SYSTEM FAILURE</span>
        </div>

        <p className="text-gray-400 text-xl mb-8 max-w-md mx-auto font-mono">
          The level you're looking for doesn't exist or has been removed.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 font-mono"
        >
          <GiReturnArrow />
          RETURN TO MAIN MENU
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
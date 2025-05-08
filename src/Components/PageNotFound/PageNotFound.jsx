import NotFoundImage from '../../assets/404NotFound.png';
const PageNotFound = () => {
    // Scrolling Bug Fixed
    window.scroll({ top: 0 });

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img
                src={NotFoundImage}
                alt="Page Not Found"
                className="w-1/2 h-auto mt-12"
            />
            <p className="mt-4 text-lg text-gray-600">
                Sorry, the page you are looking for does not exist.
            </p>
            <a
                href="/"
                className="mt-6 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900 transition duration-300"
            >
                Go Back to Home
            </a>        
        </div>
    );
};          

export default PageNotFound;

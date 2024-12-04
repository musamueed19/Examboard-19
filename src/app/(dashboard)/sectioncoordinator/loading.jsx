export default function Loading() {
    return (
        <div className="flex flex-col justify-start items-center h-full text-2xl text-gray-600">
            <div className="border-8 border-gray-300 border-t-8 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            <p>Loading...</p>
        </div>
    );
}

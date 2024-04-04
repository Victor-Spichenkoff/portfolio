export default function ServerError() {
    return (
        <div className="flex flex-col justify-center content-center w-screen h-screen">
            <div className="text-center flex justify-center">
                <div className="text-center py-12 px-20 w-fit bg-red-600 opacity-60 rounded-md">
                    <p className="text-2xl text-white">Error 500</p>
                    <p className="text-sm text-gray-300">Try again later</p>
                </div>
            </div>
        </div>
    )
}
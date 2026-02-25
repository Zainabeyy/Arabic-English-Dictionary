
export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex justify-center items-center p-10 rounded-lg">
        <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-primary-light animate-spin"></div>
      </div>
    </div>
  );
}

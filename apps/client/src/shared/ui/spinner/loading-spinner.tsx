export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-4 border-solid border-green-500 border-t-transparent"
      ></div>
      <span className="ml-4 text-gray-700">Перевірка доступу...</span>
    </div>
  );
}

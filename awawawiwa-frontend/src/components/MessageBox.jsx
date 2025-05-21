export default function MessageBox({ type = "error", title, message, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`max-w-sm w-full mx-auto border-l-4 p-4 rounded-md shadow-md relative ${
          {
            error: "bg-red-100 border-red-400 text-red-700",
            success: "bg-green-100 border-green-400 text-green-700",
            info: "bg-blue-100 border-blue-400 text-blue-700",
            warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
          }[type]
        }`}
        role="alert"
      >
        <strong className="font-semibold block">{title}</strong>
        <span className="block text-sm mt-1 mb-3">{message}</span>
        <button
          onClick={onConfirm}
          className="mt-2 px-4 py-1 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}

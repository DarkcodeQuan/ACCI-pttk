export default function ParticipantForm({ index, onRemove, isDeletable }) {
    return (
      <div className="border p-4 rounded space-y-2 relative bg-gray-50">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Participant {index}</h3>
          {isDeletable && (
            <button
              onClick={onRemove}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          )}
        </div>
        <input className="border p-2 w-full" placeholder="Full Name" />
        <input className="border p-2 w-full" placeholder="Email" />
        <input className="border p-2 w-full" placeholder="Phone" />
      </div>
    );
  }
  
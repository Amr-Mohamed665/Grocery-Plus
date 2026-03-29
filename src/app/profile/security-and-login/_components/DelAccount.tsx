export default function DeleteAccount() {
  return (
    <div className="bg-[rgba(169,9,12,0.1)] rounded-lg p-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[#a9090c]">Danger Zone</h3>
        </div>

        <p className="text-[#a9090c] pl-6">
          Once you <span className="font-medium">delete</span> your account,
          there is no going back. Please be certain.
        </p>

        <button className="cursor-pointer bg-[#a9090c] text-white py-2 px-6 rounded-lg w-[200px] hover:bg-[#8a0709] transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}

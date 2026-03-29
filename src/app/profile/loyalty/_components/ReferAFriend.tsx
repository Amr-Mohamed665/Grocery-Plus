export default function ReferAFriend({
  code = "SARAH2024",
  onShareCode,
}: {
  code?: string;
  onShareCode?: () => void;
}) {
  return (
    <div className="bg-[#014162] rounded-lg p-8 flex flex-col gap-4">
      <h3 className="text-[#f7fcff]">Refer a Friend</h3>
      <p className="text-[rgba(255,255,255,0.9)] text-xs">
        Give $20, Get $20. Share your referral code and both earn rewards!
      </p>
      <div className="flex items-center justify-between">
        <div className="bg-[#f7fcff] rounded-lg px-4 py-2 flex gap-4">
          <span className="text-[#0e1112]">Your Code:</span>
          <span className="text-[#014162]">{code}</span>
        </div>
        <button
          onClick={onShareCode}
          className="bg-[#f7fcff] border border-[#014162] text-[#014162] px-4 py-2 rounded-lg w-[150px]"
        >
          Share Code
        </button>
      </div>
    </div>
  );
}

function MoarButton({ component, onClick, value }) {
  return (
    <button
      className="w-full rounded-r-lg bg-[#5380a4] pb-1 text-center text-xl font-black text-white hover:bg-pastelgreen"
      value={value}
      onClick={onClick}
    >
      {component}
    </button>
  );
}

export default MoarButton;

const Blob = ({ size }) => {
  return (
    <div
      className={`rounded-full bg-gradient-radial from-orange-200 via-orange-50/10 to-transparent blur-2xl bg-contain`}
      style={{ height: `${size}px`, width: `${size}px` }}
    ></div>
  );
};

export default Blob;

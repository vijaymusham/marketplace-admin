
const UserHeaderSection = ({ title }) => {
  return (
    <div className="relative h-[150px] md:h-[220px] lg:h-[280px] bg-primary">

      <h2 className="text-3xl font-semibold tracking-wide capitalize font-lus text-white bottom-5 md:bottom-8 lg:bottom-10 left-0 right-0 absolute md:text-4xl lg:text-5xl text-center">
        {title}
      </h2>
    </div>
  );
};

export default UserHeaderSection;

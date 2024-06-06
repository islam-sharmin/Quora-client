

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-12">
            <p className="text-[#118acb] mb-2">---{subHeading}---</p>
            <h3 className="text-3xl font-bold uppercase border-y-4 py-5">{heading}</h3>
        </div>
    );
};

export default SectionTitle;
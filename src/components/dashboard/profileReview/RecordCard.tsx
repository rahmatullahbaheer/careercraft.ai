const RecordCard = ({ rec }: any) => {
  return (
    <div className="relative flex flex-col items-start justify-start py-4 pl-4 pr-12 border border-[#2e2f45] rounded-md">
      <h2 className="text-base dark:text-gray-100 text-gray-950 font-semibold">
        {rec.name}
        {rec.title}
      </h2>

      <span className="text-base dark:text-gray-300 text-gray-950 font-semibold">
        {rec.position}
      </span>

      <span className="text-base dark:text-gray-300 text-gray-950">
        {rec.awardingOrganization}
        {rec.issuingOrganization}
        {rec.company}
      </span>

      <div className="flex flex-row items-center justify-between ">
        <span className="text-sm dark:text-gray-300 text-gray-950">
          {rec.date}
        </span>
        <span className="text-sm dark:text-gray-300 text-gray-950">
          {rec.startDate}
        </span>
        <span className="text-sm dark:text-gray-300 text-gray-950">
          {rec.endDate}
        </span>
      </div>
      <span className="text-sm dark:text-gray-300 text-gray-950">
        {rec.description}
      </span>

      <span className="text-sm dark:text-gray-300 text-gray-950">
        {rec.contactInformation}
        {rec.publisher}
      </span>


      <div className="flex flex-col justify-between">
        <span className="text-base dark:text-gray-300 text-gray-950 font-semibold">
          {rec.language}
        </span>
        <span className="text-sm dark:text-gray-300 text-gray-950">
          {rec.proficiency}
        </span>
      </div>
    </div>
  );
};
export default RecordCard;

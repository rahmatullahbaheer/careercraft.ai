import { Eye, Trash2, FileText, Calendar } from "lucide-react";
const ResumeCard = ({ title, jobTitle, date, onView, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="w-4 h-4" />
            <span className="text-sm">{jobTitle}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{date}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onView}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex-1 justify-center"
          >
            <Eye className="w-4 h-4" />
            View
          </button>

          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors flex-1 justify-center"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ResumeCard;

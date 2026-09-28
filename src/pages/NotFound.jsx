import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-start gap-3">
    <h1 className="text-2xl font-semibold">Page not found</h1>
    <p className="text-stone-600">This address doesn't match any page.</p>
    <Link to="/" className="text-teal-700 hover:underline">
      Back to dashboard
    </Link>
  </div>
);

export default NotFound;
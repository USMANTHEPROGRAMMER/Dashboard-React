const PageHeader = ({ title, description }) => (
  <div>
    <h1 className="text-2xl font-semibold">{title}</h1>
    {description && (
      <p className="mt-1 max-w-xl text-sm text-stone-500">{description}</p>
    )}
  </div>
);

export default PageHeader;
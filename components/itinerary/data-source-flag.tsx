
type DataSourceFlagProps = {
  source: "database" | "static";
};

export function DataSourceFlag({ source }: DataSourceFlagProps) {
  const isDatabase = source === "database";

  return (
    <div className="fixed right-4 top-20 z-50">
      <div
        className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium shadow-sm ${
          isDatabase
            ? "border-green-200 bg-green-50 text-green-800"
            : "border-amber-200 bg-amber-50 text-amber-800"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            isDatabase ? "bg-green-500" : "bg-amber-500"
          }`}
        />
        {isDatabase ? "Source: PostgreSQL" : "Source: Static Data"}
      </div>
    </div>
  );
}

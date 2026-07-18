export function OrderPreview({ items = [] }) {
  const previewItems = items.slice(0, 3);
  const remaining = Math.max(items.length - previewItems.length, 0);

  return (
    <div className="avatar-group -space-x-2">
      {previewItems.map((item, idx) => (
        <div
          key={idx}
          className="avatar placeholder"
          title={item.name}
        >
          <div className="size-10 rounded-full bg-base-300 text-xs font-medium flex items-center justify-center">
            {item.name?.charAt(0)?.toUpperCase() ?? "?"}
          </div>
        </div>
      ))}
      {remaining > 0 ? (
        <div className="avatar placeholder">
          <div className="size-10 rounded-full bg-base-300 text-xs flex items-center justify-center">
            +{remaining}
          </div>
        </div>
      ) : null}
    </div>
  );
}

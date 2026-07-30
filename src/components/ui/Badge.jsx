export default function Badge({ children, variant = "default", size = "sm" }) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-blue-100 text-primary",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    internship: "bg-purple-100 text-purple-700",
    fulltime: "bg-green-100 text-green-700",
    remote: "bg-blue-100 text-blue-700"
  }
  const sizes = { sm: "text-xs px-2 py-0.5", md: "text-sm px-3 py-1" }
  return <span className={`${variants[variant]} ${sizes[size]} rounded-full font-medium`}>{children}</span>
}

const ImpactCard = ({ title, value, description }) => {
  return (
    <div className="bg-green-100 p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default ImpactCard
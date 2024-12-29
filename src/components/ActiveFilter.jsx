const ActiveFilter = ({filter, handleFilter}) => {
    const getFilterLabel = (filter) => {
        return filter.split("_")[1].split("-").join(" ")
    }

    return (
        <div key={filter} className="ActiveFilter" onClick={() => handleFilter(filter)}>{getFilterLabel(filter)}</div>
    )
}

export default ActiveFilter;
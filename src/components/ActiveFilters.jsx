import ActiveFilter from "./ActiveFilter";

const ActiveFilters = ({filters, handleFilter}) => {

    return (
        <div style={{display: "flex", overflow: "scroll", margin: "10px 0"}}>
            {filters.map(filter => <ActiveFilter key={filter} filter={filter} handleFilter={handleFilter}/>)}
        </div>
    )
}

export default ActiveFilters;
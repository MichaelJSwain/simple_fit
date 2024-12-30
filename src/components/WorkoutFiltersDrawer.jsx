import WorkoutListFilters from "./WorkoutListFilters";

const WorkoutFiltersDrawer = ({filtersApplied, handleResetFilters, filterFunc}) => {
    return (
        <div className="filters_content_container">
            <div className="filters_content_header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>FILTERS</h2>
                <button onClick={handleResetFilters} style={{background:'none', height: '40px', color: 'black'}}>Reset</button>
            </div>
            <WorkoutListFilters filterFunc={filterFunc} filtersApplied={filtersApplied}/>
        </div>
    )
}

export default WorkoutFiltersDrawer;
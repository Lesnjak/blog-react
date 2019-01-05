import React from 'react'
import {connect} from 'react-redux'
import {blogFilter} from '../../store/actions/projectActions'




const SearchBar = (props) => {
   const {blogFilter} = props;
    
        return (
            <nav>
                <div className="nav-wrapper searchBar">
                    <form>
                        <div className="input-field">
                            <input id="search"  type="search" required  onChange={(e)=>{blogFilter(e.target.value)}} />
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                        </div>
                    </form>
                </div>
            </nav>
        )

}
const mapDispatchToProps = {
blogFilter
}
export default connect(null,mapDispatchToProps)(SearchBar);
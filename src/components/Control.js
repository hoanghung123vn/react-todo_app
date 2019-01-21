import React, {Component} from 'react';
import SearchControl from './SearchControl';
import SortControl from './SortControl';

class Control extends Component {
    render(){
        return (
            <div className="row mt-15">
                {/*Search*/}
                <SearchControl onSearch={this.props.onSearch}/>
                {/*Sort*/}
                <SortControl onSort={this.props.onSort} />
            </div>
            );
    }
}

export default Control;

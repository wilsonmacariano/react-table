import React from 'react';
import ReactDOM from 'react-dom';
import sortBy from 'sort-by';

var headers = ["id", "name", "value"];

var Register = (id, name, value) => {
    return {id, name, value};
};

var registers = [
    Register(1, "Marianne Dashwood", 13),
    Register(2, "Tom Sawyer", 20),
    Register(3, "Doroth Gale", 11),
    Register(4, "Aragorn", 52),
    Register(5, "James Bond", 99)];

var TableState = {
    registers
};

var sort = (field) => {
    return TableState.registers.sort(sortBy(field));
};

class SampleTable extends React.Component {
    constructor (props) {
	super(props);
	this.state = props.storage;
    }
    
    handleSort (field) {
	var newData = this.props.sort(field);
	this.setState({ registers: newData });
    }

    render () {
	var headers = this.props.headers.map((header) => {
	    var onHeaderClick = this.handleSort.bind(this, header)
	    return <th key={header}
		       onClick={onHeaderClick}>{header}</th>;
	});
	var rows = this.state.registers.map((register) => {
	    return <tr key={register.id}>
		<td>{register.id}</td>
		<td>{register.name}</td>
		<td>{register.value}</td>
	    </tr>;
	});
	return <div>
		<table>
		    <thead>
			<tr>{headers}</tr>
		    </thead>
		    <tbody>{rows}</tbody>
		</table>
	</div>;
    }
    
}

ReactDOM.render(<SampleTable storage={TableState} sort={sort} headers={headers}/>,
		document.getElementById("container"));

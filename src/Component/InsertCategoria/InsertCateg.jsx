import React, {Component} from 'react';

class InsertCateg extends Component{
    fileSelectedHandler = event => {
        console.log(event);
    }
    render() {
        return(
            <div>
                <input type="file" onChange={this.fileSelectedHandler}></input>
            </div>
        )
    }

}

export default InsertCateg;
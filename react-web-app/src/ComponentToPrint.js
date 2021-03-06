import React from "react";
import Paper from './Paper';

export class ComponentToPrint extends React.PureComponent {
    
    imglist = this.props.imgs.map(item => {
        var filterbox = this.props.boxes.filter(box =>{
            if (item.name == box[0] && box[1] != 7){
                return box
            }
        })

        return <>
            <h1>{item.name}</h1>
            <img src={URL.createObjectURL(item)} className="display-img"></img>
            <Paper className ="paper" confi={-5} counter={0} nowbox={filterbox} dl={true} d0={true} d1={true} d2={true} d3={true} d4={true} d5={true} d6={true} d7={true} size={500}></Paper>
            {filterbox}
        </>
    })
    
    render() {
return (
        <div>
            {/* {this.props.boxes}
            <h1>{this.wow}</h1> */}
            {this.imglist}
            {/* <table>
                <thead>
                    <th>column 1</th>
                    <th>column 2</th>
                    <th>column 3</th>
                </thead>
                <tbody>
                    <tr>
                        <td>data 1</td>
                        <td>data 2</td>
                        <td>data 3</td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    );}
}
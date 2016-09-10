import React from 'react';

export default class Layout extends React.Component {

      constructor(){
        super();
        this.state = {
            top: [],
            month: [],
            display: [],
            count: 1
        };
    }

    componentWillMount(){
       
        const topUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
        $.get(topUrl, function (data) {
            this.setState({
                top: data,
                display: data
            });
        }.bind(this));

        const monthUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
        $.get(monthUrl, function (data) {
            this.setState({
                month:data
            });
        }.bind(this));
        
        
    }

    updateToRecent(){
         this.setState({
          display: this.state.month
        });
    }

    updateToTop(){
        this.setState({
          display: this.state.top
        });
    }

    render ( ){
        return (


           <div className="container-fluid ">
                <div className="row">
                    <div className="col-sm-12 col-md-6 offset-md-3 app-card">
                    
                    <div className="container header">
            {/* Title */}
            <div className="row">
                <div className="col-sm-12 header-box">
                    <span className="title">Camper Leaderboard</span>
                </div>
            </div>
            <hr/>
          
            {/* Switch */}
             <div className="row">
                <div className="col-sm-12 header-box">
                    <button 
                     onClick={this.updateToTop.bind(this)}
                    >top
                    </button>
                    
                    <button
                    onClick={this.updateToRecent.bind(this)}
                    >month
                    </button>
                </div>
            </div>
            </div>
            
        {/* Table */}
      <div className="container">
      <div className="row">
        <div className="col-sm-12 content">
        
              <table className="table">
        <thead className="thead">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Month</th>
            <th>All Time</th>
          </tr>
        </thead>
        <tbody>

        {
            

          this.state.display.map(function(camper, index){
            
             return (
              <tr key={camper.username}>
                <th scope="row">{index+1}</th>
                <td>{camper.username}</td>
                <td>{camper.recent}</td>
                <td>{camper.alltime}</td>
              </tr>
             );
          })
        }


        </tbody>
      </table>

        

        </div>
      </div>
      </div>

                    </div>
                </div>
            </div>
        );
    }
}




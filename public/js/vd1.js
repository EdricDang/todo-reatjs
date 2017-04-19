var list;

function addDiv(){
  ReactDOM.render(<InputDiv />, document.getElementById("div-add"));
}

var Note = React.createClass(
  {
    delete(){
      $.post('/delete', {idXoa: this.props.id}, function(data) {
        list.setState({mang: data});
      });
    },

    edit(){
      this.setState({onEdit: true});
    },

    save(){
      var node = this;
      $.post('/save', {idSua: this.props.id, noiDung: this.refs.txt.value}, function(data) {
          list.setState({mang: data});
          node.setState({onEdit: false});
      });
    },

    cancel(){
      this.setState({onEdit: false});
    },

    getInitialState(){
      return { onEdit: false}
    },

    render: function() {
      if(this.state.onEdit){
        return  (
          <div className="div-note">
            <input type="text" defaultValue={this.props.children} ref="txt"/>
            <button onClick={this.save}>Luu</button>
            <button onClick={this.cancel}>Huy</button>
          </div>
        )
      }else{
        return  (
          <div className="div-note">
            <p>{ this.props.children }</p>
            <button onClick={this.delete}>Xoa</button>
            <button onClick={this.edit}>Sua</button>
          </div>
        )
      }
    }
  }
);

var List = React.createClass(
  {
    getInitialState() {
      list = this;
      return { mang: []}
    },

    render: function() {
      return (
        <div className="div-list">
          <button onClick={addDiv}>Them</button>
          <div id="div-add"></div>
          {
            this.state.mang.map( function( note, index ) {
              return <Note key={index} id={index}>{note}</Note>
            })
          }
        </div>
      );
    },

    componentDidMount(){
      var that = this;
      $.post('/getNotes', function(data) {
        that.setState({ mang: data });
      })
    }
  }
);

var InputDiv = React.createClass(
  {
    send(){
      $.post('/add',{ note: this.refs.txt.value },function( data ){
        list.setState({mang: data});
      });
      ReactDOM.unmountComponentAtNode(document.getElementById('div-add'));
    },

    render: function() {
      return (
        <div className="div-input">
          <input type="text" ref="txt" placeholder="Enter your note!"/>
          <button onClick={this.send}>Gui</button>
        </div>
      )
    }
  }
);

ReactDOM.render(
  <div>
    <List />
  </div>
  , document.getElementById("root")
);

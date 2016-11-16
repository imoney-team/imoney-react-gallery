class Pagers extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    var count = this.props.count;
    var current = this.props.current;
    var dataArra = [];
    for (var i=0; i<count; i++) {
      if (i == current) {
        dataArra.push(<i className="current" key={i}>{i}</i>);
      } else {
        dataArra.push(<i key={i}>{i}</i>);
      }
    }
    return (
      <div className="gallery-pagers">{dataArra}</div>
    );
  }
}
class Gallery extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      current:0
    }
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
	}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      current: this.state.current>=this.props.children.length-1?0:this.state.current+1
    });
  }
  handlePrev(){
    this.setState({
      current:this.state.current<=0?this.props.children.length-1:this.state.current-1
    });
  }
  handleNext(){
    this.setState({
      current:this.state.current>=this.props.children.length-1?0:this.state.current+1
    });
  }
  handleEnter(){
    clearInterval(this.timerID);
  }
  handleLeave(){
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }
  render() {
    const self = this;
    const listItems = this.props.children.map((item, index) =>
      <div key={index} className={'gallery-item gallery-item'+ (index+1) + (self.state.current==index?" current":"") }>{item}</div>
    );
    return (
      <div onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
      	<div className="ui-w gallery-nav">
      		<div className="gallery-nav-btn gallery-nav-btn-prev" onClick={this.handlePrev}></div>
      		<div className="gallery-nav-btn gallery-nav-btn-next" onClick={this.handleNext}></div>
      	</div>
      	<div className="gallery-list">{listItems}</div>
        <Pagers count={this.props.children.length} current={this.state.current} />
      </div>
    );
  }
}
export default Gallery;
import React from 'react';
// import ReactDOM from 'react-dom';
class Pagers extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  eventHandle(i) {
    this.props.switchItem(i)
  }
  render(){
    var count = this.props.count;
    var current = this.props.current;
    var dataArra = [];

    for (var i=0; i<count; i++) {
      if (i  ===  current) {
        if (this.props.paginationHandle) {
          //{(e) => this.props.switchItem(e,i)}
          dataArra.push(<i onClick={this.eventHandle.bind(this,i)} className="current" key={i}>{i+1}</i>)
        } else {
          dataArra.push(<i className="current" key={i}>{i}</i>)
        }
      } else {
        if (this.props.paginationHandle) {
          dataArra.push(<i onClick={this.eventHandle.bind(this,i)}  key={i}>{i+1}</i>)
        } else {
          dataArra.push(<i  key={i}>{i}</i>)
        }
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
    this.switchItem = this.switchItem.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }
  componentDidMount() {
    if (this.props.onEndItem) {
      this.props.onEndItem(this.state.current)
    }
    if (this.props.autoPlay) {
      this.timerID = setInterval(
        () => this.tick(),
        this.props.interval
      );
    }
  }
  componentWillUnmount() {
    if (this.props.autoPlay) {
      clearInterval(this.timerID);
    }
  }
  tick() {
    this.next()
  }
  handlePrev(){
    this.prev()
  }
  handleNext(){
    this.next()
  }
  prev(){
    this.switchItem(this.state.current<=0?this.props.children.length-1:this.state.current-1)
  }
  next(){
    this.switchItem(this.state.current>=this.props.children.length-1?0:this.state.current+1)
  }
  switchItem(i){
    this.setState({
      current: i
    });
    if (this.props.onEndItem) {
      this.props.onEndItem(i)
    }
    if (i>=this.props.children.length-1 && this.props.onEnd) {
      this.props.onEnd()
    }
  }
  handleEnter(){
    if (this.props.autoPlay) {
      clearInterval(this.timerID);
    }
  }
  handleLeave(){
    if (this.props.autoPlay) {
      this.timerID = setInterval(
        () => this.tick(),
        this.props.interval
      );
    }
  }
  render() {
    const self = this;
    const listItems = this.props.children.map((item, index) =>
      <div key={index} className={'gallery-item gallery-item'+ (index+1) + (self.state.current === index?" current":"") }>{item}</div>
    );
    return (
      <div className="gallery" onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
        {this.props.showNav &&
          <div className="ui-w gallery-nav">
            <div className="gallery-nav-btn gallery-nav-btn-prev" onClick={this.handlePrev}></div>
            <div className="gallery-nav-btn gallery-nav-btn-next" onClick={this.handleNext}></div>
          </div>
        }
        <div className="gallery-list">{listItems}</div>
        {this.props.showPagination &&
          <Pagers count={this.props.children.length} current={this.state.current} paginationHandle={this.props.paginationHandle} switchItem={this.switchItem} />
        }
      </div>
    );
  }
}
export default Gallery;
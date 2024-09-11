/** @format */
import React from 'react';

type Props = {
  name: { value: string; id: number };
};

type State = {
  name: { value: string };
  birthday: Date;
};

class Example extends React.Component<Props, State> {
  handleTimeout: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = {
      name: { value: 'Now' },
      birthday: new Date(),
    };
    console.log('constructor');
    this.handleTimeout = setTimeout(() => {
      console.log('1213');
    }, 2000);
    this.handleClick3 = this.handleClick3.bind(this); // bind creates new function, change context
  }

  componentDidMount(): void {
    console.log('did mount', this);
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    // logic
  }

  componentWillUnmount(): void {
    // clear data

    console.log('will unmount');
    clearTimeout(this.handleTimeout);
  }

  // shouldComponentUpdate(
  //   nextProps: Readonly<Props>,
  //   nextState: Readonly<{}>,
  //   nextContext: any
  // ): boolean {
  //   const { name: currentName } = this.props;
  //   const { name: nextName } = nextProps;
  //   return currentName.value !== nextName.value;
  // }

  handleClick1(): void {
    console.log('this click 1 ', this);
    console.log('click 1');
  }
  handleClick2() {
    console.log('this click 2 ', this);
    this.setState((prevState) => ({
      ...prevState,
      name: { value: 'Click 2' },
    }));
  }
  handleClick3() {
    console.log('this click 3 ', this);
    this.setState({
      name: { value: 'Click 3' },
    });
  }
  handleClick4 = () => {
    console.log('this click 4 ', this);
    this.setState({
      name: { value: 'click 4' },
    });
  };

  render() {
    console.log('Example @@@');
    return (
      <>
        <h2>hello {this.state.name.value}</h2>
        <button onClick={this.handleClick1}>Click 1</button>
        <button onClick={this.handleClick2}>Click 2</button>
        <button onClick={this.handleClick3}>Click 3</button>
        <button onClick={this.handleClick4}>Click 4</button>
      </>
    );
  }
}

export default Example;

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

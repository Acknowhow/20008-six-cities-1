import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null
      };
    }

    render() {

      return (<Component
        {...this.props}
        activateItem={(i) => this.setState({activeItem: i})}
        deactivateItem={() => this.setState({activeItem: null})}

        isActiveItem={(i, sortingTab = false) => {

          if (sortingTab) {
            return i === this.state.activeItem;
          }
          return i === this.state.activeItem ||
            (i === 0 && this.state.activeItem === null);
        }}
      />);
    }
  }

  WithActiveItem.propTypes = {};
  return WithActiveItem;
};

export default withActiveItem;
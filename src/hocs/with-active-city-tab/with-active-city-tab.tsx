import * as React from 'react';

interface Props {
  isActive: boolean,
  onCityTabButtonClick: () => void,
  city: string
}

interface State {
  isActive: boolean
}

const withActiveCityTab = (Component) => {
  class CityTab extends React.PureComponent<Props, State> {
    private _tabRef: React.RefObject<HTMLAnchorElement>;

    constructor(props) {
      super(props);

      this._tabRef = React.createRef();

      this.state = {
        isActive: props.isActive
      };

      this._onCityTabButtonClick = this._onCityTabButtonClick.bind(this);
    }

    _onCityTabButtonClick() {

      this.props.onCityTabButtonClick();
      this.setState({isActive: !this.state.isActive});
    }

    _activateTab() {
      const tab = this._tabRef.current;

      if (this.props.isActive) {
        tab.className = `locations__item-link tabs__item--active`;
      } else {
        tab.className = `locations__item-link tabs__item`;
      }
    }

    _renderTab(city) {

      return () =>
        (
          <li className="locations__item">
            <a className={`locations__item-link tabs__item`}
              href="#"
              onClick={this._onCityTabButtonClick}
              ref={this._tabRef}
            >
              <span>{city}</span>
            </a>
          </li>);
    }

    render() {
      const {city} = this.props;

      return <Component
        {...this.props}
        renderTab={this._renderTab(city)}/>;

    }

    componentDidMount() {
      this._activateTab();
    }

    componentDidUpdate() {
      this._activateTab();
    }
  }

  return CityTab;
};

export default withActiveCityTab;


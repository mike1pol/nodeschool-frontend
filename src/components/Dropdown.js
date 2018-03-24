import React from 'react';

class Dropdown extends React.Component {
  state = {
    show: false
  };

  toggle() {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  render() {
    const { show } = this.state;
    const { title, children } = this.props;
    const classes = ['dropdown-menu', 'dropdown-menu-right'];
    if (show) {
      classes.push('show');
    }
    return (
      <li className="nav-item dropdown">
        <a
          onClick={() => this.toggle()}
          className="nav-link dropdown-toggle"
          style={{ cursor: 'pointer' }}
          role="button"
        >
          {title}
        </a>
        <div className={classes.join(' ')}>{children}</div>
      </li>
    );
  }
}

export default Dropdown;

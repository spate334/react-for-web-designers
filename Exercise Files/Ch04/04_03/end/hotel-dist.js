"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostForm = function (_React$Component) {
  _inherits(PostForm, _React$Component);

  function PostForm(props) {
    _classCallCheck(this, PostForm);

    // Type options are an object; convert to an array and map
    var _this = _possibleConstructorReturn(this, (PostForm.__proto__ || Object.getPrototypeOf(PostForm)).call(this, props));

    _this.typeOptions = Object.keys(props.messageTypes).map(function (key) {
      if (props.messageTypes.hasOwnProperty(key)) {
        return React.createElement(
          "option",
          { key: key, value: key },
          props.messageTypes[key]
        );
      }
    });

    // so we don't have to type this over and over
    _this.defaultType = _this.typeOptions[0].key;
    return _this;
  }

  _createClass(PostForm, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        null,
        React.createElement(
          "h3",
          null,
          "Post an Update"
        ),
        React.createElement(
          "div",
          { className: "field-group" },
          React.createElement(
            "label",
            { htmlFor: "txt-message" },
            "Message"
          ),
          React.createElement("textarea", { id: "txt-message", rows: "2" })
        ),
        React.createElement(
          "div",
          { className: "field-group" },
          React.createElement(
            "label",
            { htmlFor: "txt-type" },
            "Type"
          ),
          React.createElement(
            "select",
            { id: "txt-type" },
            this.typeOptions
          )
        ),
        React.createElement(
          "div",
          { className: "field-group action" },
          React.createElement("input", { type: "submit", value: "Post Update" })
        )
      );
    }
  }]);

  return PostForm;
}(React.Component);

function StatusMessage(props) {
  var statusDate = date.parse(props.time, "YYYY-MM-DD, HH:mm"),
      dateFormat = "M/D/Y, h:mm A";

  return React.createElement(
    "div",
    { className: "status-message" },
    props.msg,
    React.createElement(
      "span",
      { className: "name" },
      "\u2014\xA0",
      props.type
    ),
    React.createElement(
      "span",
      { className: "time" },
      date.format(statusDate, dateFormat)
    )
  );
}

var StatusMessageList = function (_React$Component2) {
  _inherits(StatusMessageList, _React$Component2);

  function StatusMessageList(props) {
    _classCallCheck(this, StatusMessageList);

    var _this2 = _possibleConstructorReturn(this, (StatusMessageList.__proto__ || Object.getPrototypeOf(StatusMessageList)).call(this, props));

    _this2.stubStatuses = [{
      id: 1,
      msg: "The hot tub is currently closed for maintenance.  We expect it to be back up and running within 48 hours.",
      type: "management",
      time: "2018-03-30, 09:15"
    }, {
      id: 2,
      msg: "The hot tub maintenance is complete.  Please enjoy a dip!",
      type: "management",
      time: "2018-03-30, 17:12"
    }, {
      id: 3,
      msg: "The rice cooker is on the fritz, any fried rice dishes will require some extra time to cook.",
      type: "dining",
      time: "2018-04-02, 15:00"
    }];

    _this2.state = {
      statuses: _this2.stubStatuses
    };
    return _this2;
  }

  _createClass(StatusMessageList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.retrieveStatusMessages();
    }
  }, {
    key: "retrieveStatusMessages",
    value: function retrieveStatusMessages() {
      axios.get("http://localhost/reactjs/status_api/get.php").then(function (response) {
        this.setState({
          statuses: response.data
        });
      }.bind(this));
    }
  }, {
    key: "displayStatusMessages",
    value: function displayStatusMessages() {
      return this.state.statuses.map(function (status) {
        return React.createElement(
          "li",
          { key: status.id },
          React.createElement(StatusMessage, {
            msg: status.msg,
            type: this.props.messageTypes[status.type],
            time: status.time
          })
        );
      }.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "ul",
        { id: "status-list" },
        this.displayStatusMessages()
      );
    }
  }]);

  return StatusMessageList;
}(React.Component);

var StatusMessageManager = function (_React$Component3) {
  _inherits(StatusMessageManager, _React$Component3);

  function StatusMessageManager(props) {
    _classCallCheck(this, StatusMessageManager);

    // just a property, doesn't have to be state
    var _this3 = _possibleConstructorReturn(this, (StatusMessageManager.__proto__ || Object.getPrototypeOf(StatusMessageManager)).call(this, props));

    _this3.messageTypes = {
      management: "Management",
      dining: "Dining Services",
      ops: "Operations",
      plumbing: "Plumbing",
      pool: "Pool"
    };

    _this3.apiUrl = "http://localhost/reactjs/status_api";

    _this3.state = {};
    return _this3;
  }

  _createClass(StatusMessageManager, [{
    key: "render",
    value: function render() {
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          { id: "post-status" },
          React.createElement(PostForm, { messageTypes: this.messageTypes })
        ),
        React.createElement(StatusMessageList, { messageTypes: this.messageTypes })
      );
    }
  }]);

  return StatusMessageManager;
}(React.Component);

ReactDOM.render(React.createElement(StatusMessageManager, null), document.getElementById("react-statusmanager"));
//# sourceMappingURL=hotel-dist.js.map
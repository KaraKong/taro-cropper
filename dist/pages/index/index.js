(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/index/index"],{

/***/ "./src/pages/index/index.scss":
/*!************************************!*\
  !*** ./src/pages/index/index.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/index/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/index/index.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

__webpack_require__(/*! ./index.scss */ "./src/pages/index/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));

    _this.$usedState = ["anonymousState__temp", "anonymousState__temp3", "anonymousState__temp4", "$compid__7", "temp", "imgSrc", "cropImg"];
    _this.config = {
      navigationBarTitleText: '首页'
    };
    _this.genRandomData = function () {
      var rand = Math.ceil(Math.random() * 10);
      _this.setState({
        temp: "sss_" + rand
      });
    };
    _this.onCropImg = function () {
      if (!_this._imgCropper) {
        return;
      }
      _this._imgCropper.fnCrop({
        success: function success(res) {
          console.log(res);
          _this.setState({
            cropImg: res.tempFilePath
          });
        },
        fail: function fail(err) {
          console.log(err);
        }
      });
    };
    _this.onGoOn = function () {
      _taroWeapp2.default.navigateTo({
        url: '/pages/testt/test'
      });
    };
    _this.customComponents = ["Cropper"];
    return _this;
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).apply(this, arguments);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */
      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.genRandomData();
    }
  }, {
    key: "onUploadPhoto",
    value: function onUploadPhoto() {
      var _self = this;
      _taroWeapp2.default.chooseImage({
        success: function success(res) {
          console.log(res);
          var tempFilePaths = res.tempFilePaths;
          _self.setState({
            imgSrc: tempFilePaths[0]
          });
        }
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this2 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__7"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__7 = _genCompid2[0],
          $compid__7 = _genCompid2[1];

      var _state = this.__state,
          cropImg = _state.cropImg,
          imgSrc = _state.imgSrc,
          temp = _state.temp;

      var anonymousState__temp = (0, _taroWeapp.internal_inline_style)({ position: 'fixed', top: '0px' });
      var anonymousState__temp4 = (0, _taroWeapp.internal_inline_style)({ fontSize: '26px' });
      var anonymousState__temp3 = cropImg ? (0, _taroWeapp.internal_inline_style)({ position: 'fixed', bottom: '10px', left: '10px', width: '100px' }) : null;
      imgSrc && _taroWeapp.propsManager.set({
        "imgSrc": imgSrc
      }, $compid__7, $prevCompid__7);
      this.$$refs.pushRefs([{
        type: "component",
        id: "hzzzz",
        refName: "",
        fn: function fn(ele) {
          return _this2._imgCropper = ele;
        }
      }]);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        $compid__7: $compid__7,
        temp: temp,
        imgSrc: imgSrc,
        cropImg: cropImg
      });
      return this.__state;
    }
  }]);

  return Index;
}(_taroWeapp.Component);

Index.$$events = ["onUploadPhoto", "onCropImg"];
Index.$$componentPath = "pages/index/index";
exports.default = Index;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Index, true));

/***/ })

},[["./src/pages/index/index.tsx","runtime","vendors"]]]);
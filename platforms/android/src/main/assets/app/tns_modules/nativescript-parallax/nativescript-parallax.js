"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app = require('application');
var Platform = require('platform');
var scroll_view_1 = require('ui/scroll-view');
var grid_layout_1 = require('ui/layouts/grid-layout');
var absolute_layout_1 = require('ui/layouts/absolute-layout');
var view_1 = require('ui/core/view');
var label_1 = require('ui/label');
var stack_layout_1 = require('ui/layouts/stack-layout');
var color_1 = require('color');
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        _super.apply(this, arguments);
    }
    return Header;
}(stack_layout_1.StackLayout));
exports.Header = Header;
var Anchored = (function (_super) {
    __extends(Anchored, _super);
    function Anchored() {
        _super.call(this);
        this.dropShadow = false;
    }
    Object.defineProperty(Anchored.prototype, "dropShadow", {
        get: function () {
            return this._dropShadow;
        },
        set: function (value) {
            this._dropShadow = value;
        },
        enumerable: true,
        configurable: true
    });
    return Anchored;
}(stack_layout_1.StackLayout));
exports.Anchored = Anchored;
var Content = (function (_super) {
    __extends(Content, _super);
    function Content() {
        _super.apply(this, arguments);
    }
    return Content;
}(stack_layout_1.StackLayout));
exports.Content = Content;
var ParallaxView = (function (_super) {
    __extends(ParallaxView, _super);
    function ParallaxView() {
        var _this = this;
        _super.call(this);
        this._addChildFromBuilder = function (name, value) {
            if (value instanceof view_1.View) {
                _this._childLayouts.push(value);
            }
        };
        this._childLayouts = [];
        var headerView;
        var contentView;
        var scrollView = new scroll_view_1.ScrollView();
        var viewsToFade;
        var maxTopViewHeight;
        var controlsToFade;
        var anchoredRow = new absolute_layout_1.AbsoluteLayout();
        var row = new grid_layout_1.ItemSpec(2, grid_layout_1.GridUnitType.star);
        var column = new grid_layout_1.ItemSpec(1, grid_layout_1.GridUnitType.star);
        var invalidSetup = false;
        this._minimumHeights = this.getMinimumHeights();
        if (this.bounce == null) {
            this.bounce = false;
        }
        this.verticalAlignment = 'top';
        scrollView.verticalAlignment = 'top';
        anchoredRow.verticalAlignment = 'top';
        this._includesAnchored = false;
        this._topOpacity = 1;
        this._loaded = false;
        this.on(grid_layout_1.GridLayout.loadedEvent, function (data) {
            if (!_this._loaded) {
                _this._loaded = true;
                _this.addRow(row);
                _this.addColumn(column);
                _this.addChild(scrollView);
                _this.addChild(anchoredRow);
                grid_layout_1.GridLayout.setRow(scrollView, 1);
                grid_layout_1.GridLayout.setRow(anchoredRow, 0);
                grid_layout_1.GridLayout.setColumn(scrollView, 1);
                grid_layout_1.GridLayout.setColumn(anchoredRow, 0);
                var wrapperStackLayout_1 = new stack_layout_1.StackLayout();
                scrollView.content = wrapperStackLayout_1;
                _this._childLayouts.forEach(function (element) {
                    if (element instanceof Header) {
                        wrapperStackLayout_1.addChild(element);
                        headerView = element;
                    }
                });
                _this._childLayouts.forEach(function (element) {
                    if (element instanceof Content) {
                        wrapperStackLayout_1.addChild(element);
                        contentView = element;
                    }
                });
                _this._childLayouts.forEach(function (element) {
                    if (element instanceof Anchored) {
                        anchoredRow.addChild(element);
                        if (element.dropShadow) {
                            anchoredRow.height = element.height;
                            anchoredRow.addChild(_this.addDropShadow(element.height, element.width));
                        }
                        else {
                            anchoredRow.height = element.height;
                        }
                        element.verticalAlignment = 'top';
                        _this._includesAnchored = true;
                    }
                });
                if (headerView == null || contentView == null) {
                    _this.displayDevWarning('Parallax ScrollView Setup Invalid. You must have Header and Content tags', headerView, contentView, contentView);
                    return;
                }
                if (isNaN(headerView.height)) {
                    _this.displayDevWarning('Header MUST have a height set.', headerView, anchoredRow, contentView);
                    return;
                }
                if (_this._includesAnchored && isNaN(anchoredRow.height)) {
                    _this.displayDevWarning('Anchor MUST have a height set.', anchoredRow, headerView, contentView);
                    return;
                }
                maxTopViewHeight = headerView.height;
                if (_this._includesAnchored) {
                    anchoredRow.marginTop = maxTopViewHeight;
                    if (app.android) {
                        anchoredRow.marginTop = anchoredRow.marginTop - 5;
                    }
                    contentView.marginTop = anchoredRow.height;
                }
                if (_this.bounce === false) {
                    if (app.ios) {
                        scrollView.ios.bounces = false;
                    }
                    else if (app.android) {
                        scrollView.android.setOverScrollMode(2);
                    }
                }
                viewsToFade = [];
                if (_this.controlsToFade == null) {
                    controlsToFade = [];
                }
                else {
                    controlsToFade = _this.controlsToFade.split(',');
                }
                controlsToFade.forEach(function (id) {
                    var newView = headerView.getViewById(id);
                    if (newView != null) {
                        viewsToFade.push(newView);
                    }
                });
                var prevOffset_1 = -10;
                _this.setMinimumHeight(contentView, anchoredRow, Platform.screen.mainScreen.heightDIPs);
                app.on(app.orientationChangedEvent, function (args) {
                    _this.setMinimumHeight(contentView, anchoredRow, _this._minimumHeights[args.newValue]);
                });
                scrollView.on(scroll_view_1.ScrollView.scrollEvent, function (args) {
                    if (_this._includesAnchored) {
                        anchoredRow.marginTop = _this.getAnchoredTopHeight(maxTopViewHeight, scrollView.verticalOffset);
                    }
                    headerView.height = _this.getTopViewHeight(maxTopViewHeight, scrollView.verticalOffset);
                    _this.fadeViews(maxTopViewHeight, scrollView.verticalOffset, viewsToFade);
                    if (prevOffset_1 <= scrollView.verticalOffset) {
                    }
                    else {
                    }
                    prevOffset_1 = scrollView.verticalOffset;
                });
            }
        });
    }
    Object.defineProperty(ParallaxView.prototype, "bounce", {
        get: function () {
            return this._bounce;
        },
        set: function (value) {
            this._bounce = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParallaxView.prototype, "controlsToFade", {
        get: function () {
            return this._controlsToFade;
        },
        set: function (value) {
            this._controlsToFade = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParallaxView.prototype, "android", {
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParallaxView.prototype, "ios", {
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    ParallaxView.prototype.setMinimumHeight = function (contentView, anchoredRow, minHeight) {
        if (this._includesAnchored) {
            minHeight = minHeight - (anchoredRow.height * 0.9);
        }
        contentView.minHeight = minHeight;
    };
    ParallaxView.prototype.getMinimumHeights = function () {
        var height1 = Platform.screen.mainScreen.heightDIPs;
        var height2 = Platform.screen.mainScreen.widthDIPs;
        if (height1 > height2) {
            return {
                portrait: height1,
                landscape: height2
            };
        }
        else {
            return {
                portrait: height2,
                landscape: height1
            };
        }
    };
    ParallaxView.prototype.addDropShadow = function (marginTop, width) {
        var wrapper = new stack_layout_1.StackLayout();
        wrapper.width = width;
        wrapper.height = 3;
        wrapper.marginTop = marginTop;
        wrapper.addChild(this.shadowView(0.4, width));
        wrapper.addChild(this.shadowView(0.2, width));
        wrapper.addChild(this.shadowView(0.05, width));
        return wrapper;
    };
    ParallaxView.prototype.shadowView = function (opacity, width) {
        var shadowRow = new stack_layout_1.StackLayout();
        shadowRow.backgroundColor = new color_1.Color('black');
        shadowRow.opacity = opacity;
        shadowRow.height = 1;
        return shadowRow;
    };
    ParallaxView.prototype.fadeViews = function (topHeight, verticalOffset, viewsToFade) {
        var _this = this;
        if (verticalOffset < topHeight) {
            this._topOpacity = parseFloat((1 - (verticalOffset * 0.01)).toString());
            if (this._topOpacity > 0 && this._topOpacity <= 1) {
                viewsToFade.forEach(function (view) {
                    view.opacity = _this._topOpacity;
                });
            }
        }
    };
    ParallaxView.prototype.getAnchoredTopHeight = function (topHeight, verticalOffset) {
        var marginTop;
        if (verticalOffset <= topHeight) {
            marginTop = topHeight - (verticalOffset * 2);
            if (marginTop > topHeight) {
                marginTop = topHeight;
            }
            if (app.android) {
                marginTop = marginTop - 5;
            }
        }
        else {
            marginTop = 0;
        }
        if (marginTop < 0) {
            marginTop = 0;
        }
        return marginTop;
    };
    ParallaxView.prototype.getTopViewHeight = function (topHeight, verticalOffset) {
        if ((topHeight - verticalOffset) >= 0) {
            return topHeight - verticalOffset;
        }
        else {
            return 0;
        }
    };
    ParallaxView.prototype.displayDevWarning = function (message) {
        var viewsToCollapse = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            viewsToCollapse[_i - 1] = arguments[_i];
        }
        var warningText = new label_1.Label();
        warningText.text = message;
        warningText.color = new color_1.Color('red');
        warningText.textWrap = true;
        warningText.marginTop = 50;
        this.addChild(warningText);
        viewsToCollapse.forEach(function (view) {
            if (view != null) {
                view.visibility = 'collapse';
            }
        });
    };
    return ParallaxView;
}(grid_layout_1.GridLayout));
exports.ParallaxView = ParallaxView;
//# sourceMappingURL=nativescript-parallax.js.map
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Utils;
        (function (Utils) {
            (function (TransitionToggleInterruptionAction) {
                TransitionToggleInterruptionAction[TransitionToggleInterruptionAction["ignore"] = 0] = "ignore";
                TransitionToggleInterruptionAction[TransitionToggleInterruptionAction["immediate"] = 1] = "immediate";
                TransitionToggleInterruptionAction[TransitionToggleInterruptionAction["wait"] = 2] = "wait";
            })(Utils.TransitionToggleInterruptionAction || (Utils.TransitionToggleInterruptionAction = {}));
            var TransitionToggleInterruptionAction = Utils.TransitionToggleInterruptionAction;
            var TransitionToggle = (function () {
                function TransitionToggle(root) {
                    this._roots = null;
                    this.classReady = "tt-ready";
                    this.classApply = "tt-apply";
                    this.transitionEnabled = false;
                    this.transitionMaxTime = 2000;
                    this.interruptionAction = TransitionToggleInterruptionAction.immediate;
                    this.interruptionWaitTime = 0;
                    this.transitionEndTargets = null;
                    this._isTransitioning = false;
                    this._isApplied = false;
                    this._timeoutId = -1;
                    this._transitionCallback = null;
                    this._waitTimeoutId = -1;
                    this._onTime = -1;
                    this._waitCallbackToggleOnOff = false;
                    this._roots = root;
                }
                Object.defineProperty(TransitionToggle.prototype, "roots", {
                    get: function () {
                        return this._roots;
                    },
                    enumerable: true,
                    configurable: true
                });
                TransitionToggle.prototype.dispose = function () {
                    if (this._roots && this._transitionCallback) {
                        this._roots.off(TransitionToggle._transitionEvents, this._transitionCallback);
                        this._transitionCallback = null;
                    }
                    if (this._timeoutId !== -1) {
                        clearTimeout(this._timeoutId);
                        this._timeoutId = -1;
                    }
                    this._roots = null;
                    this.classReady = null;
                    this.classApply = null;
                    this.transitionEnabled = false;
                    this.transitionMaxTime = -1;
                    this.interruptionAction = null;
                    this.interruptionWaitTime = -1;
                    this.transitionEndTargets = null;
                    if (this._waitTimeoutId !== -1) {
                        clearTimeout(this._waitTimeoutId);
                        this._waitTimeoutId = -1;
                    }
                    this._waitCallback = null;
                    this._waitCallbackToggleOnOff = false;
                };
                TransitionToggle.prototype.update = function (options) {
                    if (!options)
                        return;
                    if (options.classReady !== undefined)
                        this.classReady = options.classReady;
                    if (options.classApply !== undefined)
                        this.classApply = options.classApply;
                    if (options.transitionEnabled !== undefined)
                        this.transitionEnabled = options.transitionEnabled;
                    if (options.transitionMaxTime !== undefined)
                        this.transitionMaxTime = options.transitionMaxTime;
                    if (options.transitionEndTargets !== undefined)
                        this.transitionEndTargets = options.transitionEndTargets;
                    if (options.interruptionAction !== undefined)
                        this.interruptionAction = options.interruptionAction;
                    if (options.interruptionWaitTime !== undefined)
                        this.interruptionWaitTime = options.interruptionWaitTime;
                };
                Object.defineProperty(TransitionToggle.prototype, "isTransitioning", {
                    get: function () {
                        return this._isTransitioning;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TransitionToggle.prototype, "isApplied", {
                    get: function () {
                        return this._isApplied;
                    },
                    enumerable: true,
                    configurable: true
                });
                TransitionToggle.prototype.toggle = function (onOff, callback) {
                    var _this = this;
                    if (!this._roots || !this._roots.length)
                        throw "Cannot transition without root";
                    if (!callback || typeof (callback) !== "function")
                        callback = TransitionToggle._no_op;
                    if (this._isTransitioning && this.interruptionAction === TransitionToggleInterruptionAction.ignore) {
                        callback(false);
                        return;
                    }
                    var roots = this._roots;
                    var interruptAction = this.interruptionAction;
                    var waitOnTime = this.interruptionWaitTime;
                    var endTargets = this.transitionEndTargets;
                    var events = TransitionToggle._transitionEvents;
                    var wasApplied = this._isApplied;
                    var newApplied = onOff !== undefined ? onOff : !wasApplied;
                    if (this._waitTimeoutId !== -1) {
                        clearTimeout(this._waitTimeoutId);
                        this._waitTimeoutId = -1;
                        this._waitCallback = null;
                        this._waitCallbackToggleOnOff = false;
                    }
                    if (interruptAction === TransitionToggleInterruptionAction.wait) {
                        if (this._isTransitioning) {
                            this._waitCallback = callback;
                            this._waitCallbackToggleOnOff = newApplied;
                            return;
                        }
                        else if (wasApplied && !newApplied && waitOnTime >= 0 && this._onTime !== -1) {
                            var timeDiff = Math.max(0, Date.now() - this._onTime);
                            if (timeDiff < waitOnTime) {
                                this._waitTimeoutId = setTimeout(function () {
                                    _this._waitTimeoutId = 1;
                                    _this.toggle(false, callback);
                                }, waitOnTime - timeDiff);
                                return;
                            }
                        }
                    }
                    this._isApplied = newApplied;
                    if (this._isApplied !== wasApplied) {
                        roots.off(events, this._transitionCallback);
                        clearTimeout(this._timeoutId);
                        this._timeoutId = -1;
                    }
                    if (this._isApplied && !wasApplied) {
                        if (lt.LTHelper.supportsCSSTransitions && this.transitionEnabled && callback) {
                            var showTransitionCallback = function (e) {
                                if (TransitionToggle.matches(e, roots, endTargets)) {
                                    showCallback();
                                }
                            };
                            this._transitionCallback = showTransitionCallback;
                            var showCallback = function () {
                                roots.off(events, showTransitionCallback);
                                _this._transitionCallback = null;
                                if (_this._timeoutId !== -1) {
                                    clearTimeout(_this._timeoutId);
                                    _this._timeoutId = -1;
                                }
                                if (_this._isTransitioning) {
                                    _this._isTransitioning = false;
                                    callback(true);
                                    _this._onTime = Date.now();
                                    _this._handleWaitCallback();
                                }
                            };
                            roots.one(events, this._transitionCallback);
                            this._timeoutId = setTimeout(function () {
                                showCallback();
                            }, this.transitionMaxTime);
                            this._isTransitioning = true;
                            roots.addClass(this.classReady);
                            roots.addClass(this.classApply);
                        }
                        else {
                            roots.addClass(this.classReady);
                            roots.addClass(this.classApply);
                            callback(true);
                            this._onTime = Date.now();
                            this._handleWaitCallback();
                        }
                    }
                    else if (!this._isApplied && wasApplied) {
                        if (lt.LTHelper.supportsCSSTransitions && this.transitionEnabled) {
                            var hideTransitionCallback = function (e) {
                                if (TransitionToggle.matches(e, roots, endTargets)) {
                                    hideCallback();
                                }
                            };
                            this._transitionCallback = hideTransitionCallback;
                            var hideCallback = function () {
                                roots.off(events, hideTransitionCallback);
                                _this._transitionCallback = null;
                                if (_this._timeoutId !== -1) {
                                    clearTimeout(_this._timeoutId);
                                    _this._timeoutId = -1;
                                }
                                if (_this._isTransitioning) {
                                    _this._isTransitioning = false;
                                    roots.removeClass(_this.classReady);
                                    callback(true);
                                    _this._handleWaitCallback();
                                }
                            };
                            roots.one(events, this._transitionCallback);
                            this._timeoutId = setTimeout(function () {
                                hideCallback();
                            }, this.transitionMaxTime);
                            this._isTransitioning = true;
                            roots.removeClass(this.classApply);
                        }
                        else {
                            roots.removeClass(this.classApply);
                            roots.removeClass(this.classReady);
                            callback(true);
                            this._handleWaitCallback();
                        }
                    }
                    else {
                        callback(false);
                    }
                };
                TransitionToggle.prototype._handleWaitCallback = function () {
                    var cb = this._waitCallback;
                    this._waitCallback = null;
                    var onOff = this._waitCallbackToggleOnOff;
                    if (cb && this._waitTimeoutId === -1) {
                        var toggleOp = this.toggle.bind(this, onOff, cb);
                        if (!onOff) {
                            this._waitTimeoutId = setTimeout(toggleOp, this.interruptionWaitTime);
                        }
                        else {
                            this._waitTimeoutId = setTimeout(toggleOp, 0);
                        }
                    }
                };
                TransitionToggle.matches = function (e, roots, targets) {
                    if (!e || !e.target)
                        return false;
                    if (targets) {
                        if (targets instanceof jQuery)
                            return targets.is(e.target);
                    }
                    else {
                        return roots.is(e.target);
                    }
                    return false;
                };
                TransitionToggle._transitionEvents = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";
                TransitionToggle._no_op = function () { };
                return TransitionToggle;
            }());
            Utils.TransitionToggle = TransitionToggle;
        })(Utils = Demos.Utils || (Demos.Utils = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Dialogs;
        (function (Dialogs) {
            var InnerDialog = (function () {
                function InnerDialog(root) {
                    var _this = this;
                    this._root = null;
                    this.transitionToggle = null;
                    this._isBackgroundMouseDown = false;
                    this._onMouseDown = function (e) {
                        if (e.target === _this._root.get(0)) {
                            _this._isBackgroundMouseDown = true;
                            e.stopPropagation();
                        }
                        else {
                            _this._isBackgroundMouseDown = false;
                        }
                    };
                    this._onMouseUp = function (e) {
                        var mouseWasDown = _this._isBackgroundMouseDown;
                        _this._isBackgroundMouseDown = false;
                        if (mouseWasDown && e.target === _this._root.get(0) && _this.onRootClick)
                            _this.onRootClick();
                    };
                    this.onRootClick = null;
                    this.lockState = false;
                    if (root.length === 0)
                        throw "Provided root element for dialog could not be found";
                    this._root = root.eq(0);
                    var toggle = new Demos.Utils.TransitionToggle(root);
                    toggle.update({
                        classReady: "dlg-ready",
                        classApply: "dlg-show",
                        transitionEnabled: true,
                        transitionMaxTime: 1000,
                        transitionEndTargets: null,
                        interruptionAction: Demos.Utils.TransitionToggleInterruptionAction.ignore,
                        interruptionWaitTime: 1000,
                    });
                    this.transitionToggle = toggle;
                    var rootElement = root.get(0);
                    root.on("mousedown pointerdown", this._onMouseDown);
                    root.on("mouseup pointerup", this._onMouseUp);
                }
                Object.defineProperty(InnerDialog.prototype, "root", {
                    get: function () {
                        return this._root;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InnerDialog.prototype, "isShowing", {
                    get: function () {
                        return this.transitionToggle && this.transitionToggle.isApplied;
                    },
                    enumerable: true,
                    configurable: true
                });
                InnerDialog.prototype.show = function (postTransitionCallback) {
                    if (!this.transitionToggle || this.lockState) {
                        if (postTransitionCallback)
                            postTransitionCallback(false);
                        return;
                    }
                    this.transitionToggle.toggle(true, postTransitionCallback);
                };
                InnerDialog.prototype.hide = function (postTransitionCallback) {
                    if (!this.transitionToggle || this.lockState) {
                        if (postTransitionCallback)
                            postTransitionCallback(false);
                        return;
                    }
                    this.transitionToggle.toggle(false, postTransitionCallback);
                };
                InnerDialog.prototype.dispose = function () {
                    if (this._root) {
                        this._root.off("mousedown pointerdown", this._onMouseDown);
                        this._root.off("mouseup pointerup", this._onMouseUp);
                        this._root = null;
                    }
                    if (this.transitionToggle) {
                        this.transitionToggle.dispose();
                        this.transitionToggle = null;
                    }
                };
                return InnerDialog;
            }());
            Dialogs.InnerDialog = InnerDialog;
        })(Dialogs = Demos.Dialogs || (Demos.Dialogs = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Dialogs;
        (function (Dialogs) {
            var AboutDialog = (function () {
                function AboutDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._onHideClicked = function () {
                        _this.inner.hide();
                    };
                    this.el = {
                        title: root.find(selectors.title),
                        hide: root.find(selectors.hide)
                    };
                    this.inner = new Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHideClicked;
                    this.el.hide.on("click", this._onHideClicked);
                }
                Object.defineProperty(AboutDialog.prototype, "name", {
                    set: function (value) {
                        this.el.title.text(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                AboutDialog.prototype.show = function (postTransitionCallback) {
                    this.inner.show(postTransitionCallback);
                };
                AboutDialog.prototype.dispose = function () {
                    this.el.hide.off("click", this._onHideClicked);
                    this._onHideClicked = null;
                    if (this.inner) {
                        this.inner.dispose();
                        this.inner = null;
                    }
                    this.el = null;
                };
                return AboutDialog;
            }());
            Dialogs.AboutDialog = AboutDialog;
        })(Dialogs = Demos.Dialogs || (Demos.Dialogs = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Dialogs;
        (function (Dialogs) {
            var LoadingDialog = (function () {
                function LoadingDialog(root, selectors) {
                    this.inner = null;
                    this.el = null;
                    this.el = {
                        title: root.find(selectors.title)
                    };
                    this.inner = new Dialogs.InnerDialog(root);
                    this.inner.transitionToggle.update({
                        interruptionAction: Demos.Utils.TransitionToggleInterruptionAction.wait,
                        interruptionWaitTime: 1000,
                    });
                }
                LoadingDialog.prototype.show = function (title, postTransitionCallback) {
                    this.title = title;
                    this.inner.show(postTransitionCallback);
                };
                Object.defineProperty(LoadingDialog.prototype, "title", {
                    set: function (value) {
                        this.el.title.text(value || "");
                    },
                    enumerable: true,
                    configurable: true
                });
                LoadingDialog.prototype.hide = function (postTransitionCallback) {
                    this.inner.hide(postTransitionCallback);
                };
                LoadingDialog.prototype.dispose = function () {
                    if (this.inner) {
                        this.inner.dispose();
                        this.inner = null;
                    }
                    this.el = null;
                };
                return LoadingDialog;
            }());
            Dialogs.LoadingDialog = LoadingDialog;
        })(Dialogs = Demos.Dialogs || (Demos.Dialogs = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Dialogs;
        (function (Dialogs) {
            var OpenFileDialog = (function () {
                function OpenFileDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._onHideClicked = function () {
                        _this.inner.hide();
                    };
                    this._onSelectChanged = function () {
                        if (_this.el.itemSelect.val() === "Enter URL") {
                            _this.el.urlInput.container.show();
                        }
                        else {
                            _this.el.urlInput.container.hide();
                            if (_this.onIndexSelected)
                                _this.onIndexSelected(_this.el.itemSelect.prop("selectedIndex"));
                            _this.inner.hide();
                        }
                    };
                    this._onAcceptClicked = function () {
                        if (_this.onUrlGoClick)
                            _this.onUrlGoClick(_this.el.urlInput.textInput.val());
                        _this.inner.hide();
                    };
                    this.el = Demos.Utils.findSelectorsInRoot(root, selectors);
                    this.inner = new Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHideClicked;
                    this.el.hide.on("click", this._onHideClicked);
                    this.el.itemSelect.prop("selectedIndex", 0);
                    this.el.itemSelect.on("change", this._onSelectChanged);
                    this.el.urlInput.container.hide();
                    this.el.urlInput.acceptButton.on("click", this._onAcceptClicked);
                }
                OpenFileDialog.prototype.show = function (postTransitionCallback) {
                    this.inner.show(postTransitionCallback);
                };
                OpenFileDialog.prototype.dispose = function () {
                    this.el.hide.off("click", this._onHideClicked);
                    this.el.itemSelect.off("change", this._onSelectChanged);
                    this.el.urlInput.acceptButton.off("click", this._onAcceptClicked);
                    this._onHideClicked = null;
                    this._onSelectChanged = null;
                    this._onAcceptClicked = null;
                    if (this.inner) {
                        this.inner.dispose();
                        this.inner = null;
                    }
                    this.el = null;
                };
                return OpenFileDialog;
            }());
            Dialogs.OpenFileDialog = OpenFileDialog;
        })(Dialogs = Demos.Dialogs || (Demos.Dialogs = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Dialogs;
        (function (Dialogs) {
            var TextResultDialog = (function () {
                function TextResultDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._onHideClicked = function () {
                        _this.inner.hide();
                    };
                    this.el = {
                        title: root.find(selectors.title),
                        textResult: root.find(selectors.textResult),
                        hide: root.find(selectors.hide)
                    };
                    this.inner = new Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHideClicked;
                    this.el.hide.on("click", this._onHideClicked);
                }
                TextResultDialog.prototype.update = function (title, text) {
                    this.el.title.text(title);
                    this.el.textResult.text(Demos.Utils.UI.normalizeIEText(text));
                };
                TextResultDialog.prototype.show = function (postTransitionCallback) {
                    this.inner.show(postTransitionCallback);
                };
                TextResultDialog.prototype.dispose = function () {
                    this.el.hide.off("click", this._onHideClicked);
                    this._onHideClicked = null;
                    if (this.inner) {
                        this.inner.dispose();
                        this.inner = null;
                    }
                    this.el = null;
                };
                return TextResultDialog;
            }());
            Dialogs.TextResultDialog = TextResultDialog;
        })(Dialogs = Demos.Dialogs || (Demos.Dialogs = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Utils;
        (function (Utils) {
            function findSelectorsInRoot(root, selectors) {
                var newObject = {};
                var keys = Object.keys(selectors);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var value = selectors[key];
                    if (typeof value === "string") {
                        newObject[key] = root.find(value);
                    }
                    else if (typeof value === "object" && !Array.isArray(value)) {
                        newObject[key] = findSelectorsInRoot(root, value);
                    }
                }
                return newObject;
            }
            Utils.findSelectorsInRoot = findSelectorsInRoot;
            function byteArrayToArrayBuffer(array) {
                var bytes = new Uint8Array(array.length);
                array.forEach(function (val, i) {
                    bytes[i] = val;
                });
                return bytes.buffer;
            }
            Utils.byteArrayToArrayBuffer = byteArrayToArrayBuffer;
            function objectAssign(target) {
                var sources = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    sources[_i - 1] = arguments[_i];
                }
                if (typeof Object["assign"] === "function") {
                    return Object["assign"].apply(Object, arguments);
                }
                else {
                    if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert undefined or null to object');
                    }
                    var output = Object(target);
                    for (var index = 1; index < arguments.length; index++) {
                        var source = arguments[index];
                        if (source !== undefined && source !== null) {
                            for (var nextKey in source) {
                                if (source.hasOwnProperty(nextKey)) {
                                    output[nextKey] = source[nextKey];
                                }
                            }
                        }
                    }
                    return output;
                }
            }
            Utils.objectAssign = objectAssign;
            function stringFormat(template) {
                var replacements = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    replacements[_i - 1] = arguments[_i];
                }
                return template.replace(/{(\d+)}/g, function (matchedString, matchedNumber) {
                    return typeof replacements[matchedNumber] !== "undefined" ? replacements[matchedNumber] : matchedString;
                });
            }
            Utils.stringFormat = stringFormat;
        })(Utils = Demos.Utils || (Demos.Utils = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Utils;
        (function (Utils) {
            var Network = (function () {
                function Network() {
                }
                Object.defineProperty(Network, "queryString", {
                    get: function () {
                        return Network._queryString;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Network.isValidURI = function (uri) {
                    var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                    if (RegExp.test(uri)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                Network.showRequestError = function (jqueryXHR, statusText, errorThrown) {
                    var body = null;
                    var detail = null;
                    try {
                        body = JSON.parse(jqueryXHR.responseText);
                        detail = "(" + body["detail"] + ")";
                        (window.console && console.log && console.log("Error: " + detail));
                    }
                    catch (e) {
                        (window.console && console.log && console.log("Could not parse JSON from Error"));
                        detail = "(Error " + jqueryXHR.status + ": " + jqueryXHR.statusText + ")";
                    }
                    var message = [
                        "An error has occurred in the application.",
                        detail
                    ].join("\n");
                    window.alert(message);
                    jqueryXHR = null;
                };
                Network._queryString = (function () {
                    var queryString = {};
                    var search = window.location.search;
                    var hash = window.location.hash;
                    if (search === "" && hash) {
                        search = hash;
                    }
                    var query = search.substring(1);
                    if (query[query.length - 1] === "/")
                        query = query.substring(0, query.length - 1);
                    var vars = query.split("&");
                    for (var i = 0; i < vars.length; i++) {
                        var keyVal = vars[i].split("=");
                        var key = keyVal[0];
                        var val = decodeURIComponent(keyVal[1]);
                        if (typeof queryString[key] === "undefined") {
                            queryString[key] = [val];
                        }
                        else {
                            queryString[key].push(val);
                        }
                    }
                    return queryString;
                })();
                return Network;
            }());
            Utils.Network = Network;
        })(Utils = Demos.Utils || (Demos.Utils = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Utils;
        (function (Utils) {
            var NotificationGroup = (function () {
                function NotificationGroup(root) {
                    this._id = 0;
                    this._currentNotifications = [];
                    this.showGroupNotifications = true;
                    this._isShowingNotification = false;
                    this._root = root;
                    this._root.addClass("lt-notify-root");
                    this._id = NotificationGroup._id++;
                    var container = this._root.children(".lt-notify-container");
                    if (!container.length) {
                        this._container = $(document.createElement("div")).addClass("lt-notify-container");
                        this._root.append(this._container);
                    }
                    else {
                        this._container = container;
                    }
                }
                Object.defineProperty(NotificationGroup.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NotificationGroup.prototype, "isShowingNotification", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                NotificationGroup.prototype.notify = function (header, message, opts) {
                    if (!this.showGroupNotifications || !NotificationGroup._showAllNotifications)
                        return;
                    this._isShowingNotification = true;
                    opts = Utils.objectAssign({}, opts || {}, NotificationGroup.defaultOpts);
                    var notification = new Notification(this, header, message, opts);
                    notification.groupToggleGroupChange = this._toggleGroupChange.bind(this);
                    notification.groupToggleAllChange = this._toggleAllChange.bind(this);
                    notification.groupHide = this._hideNotification.bind(this);
                    this._currentNotifications.push(notification);
                    this._container.append(notification.ui.root);
                    setTimeout(function () {
                        notification.show();
                    }, 500);
                };
                NotificationGroup.prototype.dispose = function () {
                    this._currentNotifications.forEach(function (notification) {
                        notification.dispose();
                    });
                    this._currentNotifications = null;
                    this._root = null;
                    this._container = null;
                };
                NotificationGroup.prototype._toggleAllChange = function (checked) {
                    var show = !checked;
                    if (NotificationGroup._showAllNotifications !== show) {
                        NotificationGroup._showAllNotifications = show;
                        $(".lt-notify").each(function (index, element) {
                            var $notify = $(element);
                            $notify.find(".lt-notify-check-all input").prop("checked", checked);
                            $notify.find(".lt-notify-check-group input").prop("disabled", checked);
                        });
                    }
                };
                NotificationGroup.prototype._toggleGroupChange = function (checked) {
                    var show = !checked;
                    if (this.showGroupNotifications !== show) {
                        this.showGroupNotifications = show;
                        $(".lt-notify-input-group-" + this.id).prop("checked", checked);
                    }
                };
                NotificationGroup.prototype._hideNotification = function (notification) {
                    var index = this._currentNotifications.indexOf(notification);
                    if (index !== -1) {
                        this._currentNotifications.splice(index, 1);
                        setTimeout(function () {
                            notification.dispose();
                        }, 1000);
                    }
                };
                NotificationGroup._id = 0;
                NotificationGroup._showAllNotifications = true;
                NotificationGroup.defaultOpts = {
                    seconds: 5,
                    useTransitions: true,
                    className: null
                };
                return NotificationGroup;
            }());
            Utils.NotificationGroup = NotificationGroup;
            var Notification = (function () {
                function Notification(group, header, message, opts) {
                    this._header = header;
                    this._message = message;
                    this._group = group;
                    this._opts = opts;
                    this.ui = new NotificationUI(group.id, opts.useTransitions);
                    if (this._opts.className)
                        this.ui.root.addClass(this._opts.className);
                    this.ui.header.text(header);
                    this.ui.message.text(message);
                    this.ui.checkGroupInput.change(this.toggleGroupChange.bind(this));
                    this.ui.checkAllInput.change(this.toggleAllChange.bind(this));
                    this.ui.controlsButton.click(this.controlsButtonClick.bind(this));
                    this.ui.time.click(this.stopTimeout.bind(this));
                    this.ui.close.click(this.hide.bind(this));
                }
                Notification.prototype.stopTimeout = function () {
                    this.ui.root.addClass("lt-notify-no-time");
                    if (this._intervalId !== -1) {
                        clearInterval(this._intervalId);
                        this._intervalId = -1;
                    }
                };
                Notification.prototype.controlsButtonClick = function () {
                    this.stopTimeout();
                    this.ui.root.addClass("lt-notify-show-controls");
                };
                Notification.prototype.toggleGroupChange = function () {
                    this.stopTimeout();
                    var checked = this.ui.checkGroupInput.is(":checked");
                    this.groupToggleGroupChange(checked);
                };
                Notification.prototype.toggleAllChange = function () {
                    this.stopTimeout();
                    var checked = this.ui.checkAllInput.is(":checked");
                    this.groupToggleAllChange(checked);
                };
                Notification.prototype.show = function () {
                    var _this = this;
                    this.ui.show(function () {
                        var timeLeft = _this._opts.seconds;
                        var update = function () {
                            if (timeLeft <= 0) {
                                clearInterval(_this._intervalId);
                                _this._intervalId = -1;
                                _this.hide();
                                return;
                            }
                            _this.ui.time.text(timeLeft);
                            timeLeft--;
                        };
                        _this._intervalId = setInterval(function () {
                            update();
                        }, 1000);
                        update();
                    });
                };
                Notification.prototype.hide = function () {
                    var _this = this;
                    this.stopTimeout();
                    this.ui.hide(function () {
                        _this.groupHide(_this);
                    });
                };
                Notification.prototype.dispose = function () {
                    this.stopTimeout();
                    this.ui.dispose();
                    this._opts = null;
                    this.groupHide = null;
                    this.groupToggleAllChange = null;
                    this.groupToggleGroupChange = null;
                    this._group = null;
                    this._header = null;
                    this._message = null;
                    this._intervalId = -1;
                };
                return Notification;
            }());
            var NotificationUI = (function () {
                function NotificationUI(groupId, useTransitions) {
                    this._useTransitions = true;
                    this._toggle = null;
                    this.root = null;
                    this.time = null;
                    this.close = null;
                    this.header = null;
                    this.message = null;
                    this.controlsButton = null;
                    this.controls = null;
                    this.checkGroupInput = null;
                    this.checkAllInput = null;
                    this._useTransitions = useTransitions && lt.LTHelper.supportsCSSTransitions;
                    this.constructUI(NotificationUI.id++, groupId);
                    this._toggle = new Utils.TransitionToggle(this.root);
                    this._toggle.update({
                        classReady: NotificationUI._readyClass,
                        classApply: NotificationUI._showClass
                    });
                }
                NotificationUI.prototype.show = function (postTransitionCallback) {
                    this._toggle.toggle(true, postTransitionCallback);
                };
                NotificationUI.prototype.hide = function (postTransitionsCallback) {
                    this._toggle.toggle(false, postTransitionsCallback);
                };
                NotificationUI.prototype.constructUI = function (uiId, groupId) {
                    this.root = $(document.createElement("div")).addClass("lt-notify");
                    var $inner = $(document.createElement("div")).addClass("lt-notify-inner");
                    this.time = $(document.createElement("span")).addClass("lt-notify-time");
                    this.close = $(document.createElement("span")).addClass("lt-notify-close").text("x");
                    var $headerBorder = $(document.createElement("div")).addClass("lt-notify-header-border");
                    this.header = $(document.createElement("h3")).addClass("lt-notify-header");
                    $headerBorder.append(this.header);
                    this.message = $(document.createElement("p")).addClass("lt-notify-message");
                    this.controlsButton = $(document.createElement("button")).addClass("lt-notify-controls-button");
                    this.controls = $(document.createElement("div")).addClass("lt-notify-controls");
                    var inputId = "lt_notify_inputA_" + uiId;
                    var $checkGroupHolder = $(document.createElement("div")).addClass("lt-notify-check-holder lt-notify-check-group");
                    this.checkGroupInput = $(document.createElement("input")).attr({ type: "checkbox", id: inputId }).addClass("lt-notify-input-group-" + groupId);
                    var $checkGroupHolderCheckLabel = $(document.createElement("label")).addClass("lt-notify-label-special").attr({ for: inputId });
                    var $checkGroupHolderLabel = $(document.createElement("label")).addClass("lt-notify-label").text("Don't show notifications like this").attr({ for: inputId });
                    $checkGroupHolder.append(this.checkGroupInput, $checkGroupHolderCheckLabel, $checkGroupHolderLabel);
                    inputId = "lt_notify_inputB_" + uiId;
                    var $checkAllHolder = $(document.createElement("div")).addClass("lt-notify-check-holder lt-notify-check-all");
                    this.checkAllInput = $(document.createElement("input")).attr({ type: "checkbox", id: inputId });
                    var $checkAllHolderCheckLabel = $(document.createElement("label")).addClass("lt-notify-label-special").attr({ for: inputId });
                    var $checkAllHolderLabel = $(document.createElement("label")).addClass("lt-notify-label").text("Don't show any more notifications").attr({ for: inputId });
                    $checkAllHolder.append(this.checkAllInput, $checkAllHolderCheckLabel, $checkAllHolderLabel);
                    this.controls.append($checkGroupHolder, $checkAllHolder);
                    $inner.append(this.time, this.close, $headerBorder, this.message, this.controlsButton, this.controls);
                    this.root.append($inner);
                };
                NotificationUI.prototype.dispose = function () {
                    if (this.root) {
                        this._toggle.dispose();
                        this._toggle = null;
                        this.root.empty();
                        this.root.remove();
                        this.root = null;
                        this.time = null;
                        this.close = null;
                        this.header = null;
                        this.message = null;
                        this.controlsButton = null;
                        this.controls = null;
                        this.checkGroupInput = null;
                        this.checkAllInput = null;
                    }
                };
                NotificationUI.id = 0;
                NotificationUI._readyClass = "lt-notify-ready";
                NotificationUI._showClass = "lt-notify-show";
                return NotificationUI;
            }());
        })(Utils = Demos.Utils || (Demos.Utils = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Utils;
        (function (Utils) {
            var UI = (function () {
                function UI() {
                }
                UI.normalizeIEText = function (text) {
                    if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer && lt.LTHelper.device === lt.LTDevice.desktop) {
                        if (lt.LTHelper.version === 9) {
                            text = text.replace(new RegExp('\r\n|\n', 'g'), '\n\r');
                        }
                        else if (lt.LTHelper.version > 9) {
                            text = text.replace(new RegExp('\r\n', 'g'), '\n');
                        }
                    }
                    return text;
                };
                UI.createThumbnailCanvas = function (originalCanvas, thumbnailCanvas, maxWidth, maxHeight) {
                    var scaleFactor = 1;
                    var originalWidth = originalCanvas.width;
                    var originalHeight = originalCanvas.height;
                    if (originalWidth > originalHeight)
                        scaleFactor = maxWidth / originalWidth;
                    else
                        scaleFactor = maxHeight / originalHeight;
                    thumbnailCanvas.width = originalWidth * scaleFactor;
                    thumbnailCanvas.height = originalHeight * scaleFactor;
                    var thumbnailCtx = thumbnailCanvas.getContext("2d");
                    thumbnailCtx.save();
                    thumbnailCtx.scale(scaleFactor, scaleFactor);
                    thumbnailCtx.drawImage(originalCanvas, 0, 0);
                    thumbnailCtx.restore();
                };
                UI.cloneCanvas = function (oldCanvas) {
                    var newCanvas = document.createElement('canvas');
                    var context = newCanvas.getContext('2d');
                    newCanvas.width = oldCanvas.width;
                    newCanvas.height = oldCanvas.height;
                    context.drawImage(oldCanvas, 0, 0);
                    return newCanvas;
                };
                UI.toggleChecked = function (element, checkUncheck) {
                    element.toggleClass("checked", checkUncheck);
                };
                UI.isChecked = function (element) {
                    return element.hasClass("checked");
                };
                UI.selectText = function (textElement, startIndex, endIndex) {
                    if (textElement.setSelectionRange) {
                        textElement.setSelectionRange(startIndex, endIndex);
                    }
                    else if (textElement["createTextRange"]) {
                        var range = textElement["createTextRange"]();
                        range.moveStart("character", startIndex);
                        range.moveEnd("character", endIndex);
                        range.select();
                    }
                    textElement.focus();
                };
                UI.isValidURI = function (uri) {
                    var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                    if (RegExp.test(uri)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                UI.ensureSafeIEButtons = function () {
                    if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer && (lt.LTHelper.version == 9 || lt.LTHelper.version == 10)) {
                        $("button:not([type])").each(function (idx, el) {
                            el.setAttribute("type", "button");
                        });
                        $("body").on("DOMNodeInserted", "button:not([type])", function () {
                            this.setAttribute("type", "button");
                        });
                    }
                };
                return UI;
            }());
            Utils.UI = UI;
        })(Utils = Demos.Utils || (Demos.Utils = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Utils;
        (function (Utils) {
            var Visibility = (function () {
                function Visibility() {
                }
                Visibility._init = function () {
                    if (this._hideElementsClassStyle)
                        return;
                    this._hideElementsClassStyle = document.createElement("style");
                    this._hideElementsClassStyle.innerHTML = "." + this._hideElementClass + " { display: none !important; }";
                    document.head.appendChild(this._hideElementsClassStyle);
                };
                Visibility.isHidden = function (element) {
                    return element.length &&
                        ((this._hideElementsClassStyle && lt.LTHelper.hasClass(element[0], this._hideElementClass)) ||
                            element[0].style.display === "none" ||
                            (element[0].style.display === "" && element.css("display") === "none"));
                };
                Visibility.toggle = function (elements, showOrHide) {
                    var toggleEach = typeof showOrHide === "undefined";
                    if (!this._hideElementsClassStyle && !toggleEach && showOrHide)
                        return;
                    this._init();
                    var remove;
                    for (var i = 0; i < elements.length; i++) {
                        var el = elements[i];
                        if (toggleEach)
                            remove = lt.LTHelper.hasClass(el, this._hideElementClass);
                        else
                            remove = showOrHide;
                        if (remove)
                            lt.LTHelper.removeClass(el, this._hideElementClass);
                        else
                            lt.LTHelper.addClass(el, this._hideElementClass);
                    }
                };
                Visibility._hideElementClass = "lt_utils_hide";
                Visibility._hideElementsClassStyle = null;
                return Visibility;
            }());
            Utils.Visibility = Visibility;
        })(Utils = Demos.Utils || (Demos.Utils = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));

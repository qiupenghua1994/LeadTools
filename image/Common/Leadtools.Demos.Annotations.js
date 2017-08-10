var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var AnnPropertyInfo = (function () {
                function AnnPropertyInfo(propertyName, readOnly, value, groupName, description, displayName, visible, editorType) {
                    var _this = this;
                    this.editorType_OnValueChanged = function (oldValue, newValue) {
                        _this._value = newValue;
                        if (_this.valueChanged != null)
                            _this.valueChanged(oldValue, newValue);
                    };
                    this._values = {};
                    this._isReadOnly = readOnly;
                    this._type = value;
                    this._groupName = groupName;
                    this._description = description;
                    this._isVisible = visible;
                    if (!displayName)
                        this._displayName = propertyName;
                    else
                        this._displayName = displayName;
                    this._editor = new editorType(value, groupName, propertyName, this._displayName);
                    this._editor.onValueChanged = this.editorType_OnValueChanged;
                    this._value = value;
                }
                Object.defineProperty(AnnPropertyInfo.prototype, "editor", {
                    get: function () { return this._editor; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "isReadOnly", {
                    get: function () { return this._isReadOnly; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "isVisible", {
                    get: function () { return this._isVisible; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.valueChanged != null)
                            this.valueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "displayName", {
                    get: function () { return this._displayName; },
                    set: function (value) { this._displayName = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "values", {
                    get: function () { return this._values; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "type", {
                    get: function () { return this._type; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "hasValues", {
                    get: function () { return this._hasValues; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "groupName", {
                    get: function () { return this._groupName; },
                    set: function (value) { this._groupName = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "description", {
                    get: function () { return this._description; },
                    set: function (value) { this._description = value; },
                    enumerable: true,
                    configurable: true
                });
                return AnnPropertyInfo;
            }());
            Annotations.AnnPropertyInfo = AnnPropertyInfo;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var AudioPlayerDialog = (function () {
                function AudioPlayerDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._onHide = function () {
                        if (_this.inner.isShowing) {
                            if (_this._audioElement) {
                                _this._audioElement.pause();
                                if (_this._sourceElement1.parentNode === _this._audioElement)
                                    _this._audioElement.removeChild(_this._sourceElement1);
                                if (_this._sourceElement2.parentNode === _this._audioElement)
                                    _this._audioElement.removeChild(_this._sourceElement2);
                                if (_this._sourceElement3.parentNode === _this._audioElement)
                                    _this._audioElement.removeChild(_this._sourceElement3);
                            }
                        }
                        _this.inner.hide();
                    };
                    this.el = {
                        audioObject: root.find(selectors.audioObject),
                        hide: root.find(selectors.hide)
                    };
                    this.inner = new lt.Demos.Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHide;
                    this.el.hide.on("click", this._onHide);
                }
                AudioPlayerDialog.prototype.play = function (source1, source2, source3) {
                    var _this = this;
                    if (!source1 && !source2 && !source3)
                        return;
                    this._audioElement = this.el.audioObject.get(0);
                    var canPlay = typeof (this._audioElement.play) === "function";
                    if (!canPlay) {
                        this._audioElement.innerHTML = "Your browser does not support HTML5 video.";
                    }
                    else {
                        this._sourceElement1 = document.createElement("source");
                        this._sourceElement1.src = source1;
                        this._sourceElement2 = document.createElement("source");
                        this._sourceElement2.src = source2;
                        this._sourceElement3 = document.createElement("source");
                        this._sourceElement3.src = source3;
                        this._audioElement.appendChild(this._sourceElement1);
                        this._audioElement.appendChild(this._sourceElement2);
                        this._audioElement.appendChild(this._sourceElement3);
                        this._audioElement.load();
                    }
                    this.inner.show(function () {
                        if (canPlay) {
                            _this._audioElement.play();
                        }
                    });
                };
                Object.defineProperty(AudioPlayerDialog.prototype, "audioElement", {
                    get: function () {
                        return this._audioElement;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AudioPlayerDialog;
            }());
            Annotations.AudioPlayerDialog = AudioPlayerDialog;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var AutomationUpdateObjectDialog = (function () {
                function AutomationUpdateObjectDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._targetObject = null;
                    this._automation = null;
                    this._userName = "";
                    this.showProperties = true;
                    this.showContent = true;
                    this.showReviews = true;
                    this.$allTabsAndPages = null;
                    this._onHideClicked = function () {
                        if (_this.showReviews) {
                            _this._reviewsPage.replacesReviewsIn(_this._targetObject);
                            _this._reviewsPage.cleanUp();
                        }
                        _this.showProperties = true;
                        _this.showContent = true;
                        _this.showReviews = true;
                        var annObjCol = new lt.Annotations.Core.AnnObjectCollection();
                        annObjCol.add(_this._targetObject);
                        _this._automation.invokeAfterObjectChanged(annObjCol, lt.Annotations.Automation.AnnObjectChangedType.modified);
                        _this._automation.invokeAfterObjectChanged(annObjCol, lt.Annotations.Automation.AnnObjectChangedType.metadata);
                        _this._automation.invalidate(lt.LeadRectD.empty);
                        if (_this.onHide)
                            _this.onHide();
                        _this.inner.hide();
                    };
                    this.el = lt.Demos.Utils.findSelectorsInRoot(root, selectors);
                    this.inner = new lt.Demos.Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHideClicked;
                    this.el.hide.on("click", this._onHideClicked);
                    this._propertiesPage = new lt.Demos.Annotations.PropertiesPage(this.el.properties.page);
                    this._contentPage = new lt.Demos.Annotations.ContentPage(this.el.content.page);
                    this._reviewsPage = new lt.Demos.Annotations.ReviewsPage(this.el.reviews.page);
                    var selectedClass = AutomationUpdateObjectDialog.selectedClass;
                    this.$allTabsAndPages = this.el.properties.tab.add(this.el.properties.page).add(this.el.content.tab).add(this.el.content.page).add(this.el.reviews.tab).add(this.el.reviews.page);
                    this.$allTabsAndPages.removeClass(selectedClass);
                    var targets = [
                        [this.el.properties.tab, this.el.properties.page],
                        [this.el.content.tab, this.el.content.page],
                        [this.el.reviews.tab, this.el.reviews.page]
                    ];
                    targets.forEach(function (target) {
                        var $tab = target[0];
                        var $page = target[1];
                        $tab.on("click", function () {
                            if (!$tab.hasClass(selectedClass)) {
                                _this.$allTabsAndPages.removeClass(selectedClass);
                                $tab.addClass(selectedClass);
                                $page.addClass(selectedClass);
                            }
                        });
                    });
                }
                Object.defineProperty(AutomationUpdateObjectDialog.prototype, "targetObject", {
                    get: function () { return this._targetObject; },
                    set: function (value) {
                        if (this._targetObject != value) {
                            this._targetObject = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationUpdateObjectDialog.prototype, "automation", {
                    get: function () { return this._automation; },
                    set: function (value) {
                        if (this._automation != value) {
                            if (this._automation != null)
                                this._automation.active = false;
                            this._automation = value;
                            this._automation.active = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationUpdateObjectDialog.prototype, "userName", {
                    get: function () { return this._userName; },
                    set: function (value) { this._userName = value; },
                    enumerable: true,
                    configurable: true
                });
                AutomationUpdateObjectDialog.prototype.show = function () {
                    var _this = this;
                    if (this._automation && !this._targetObject) {
                        this._targetObject = this._automation.currentEditObject;
                    }
                    if (!this._targetObject) {
                        alert("No target object specified");
                        return;
                    }
                    if (!this._automation)
                        this.showProperties = false;
                    var numTabs = 0;
                    var showProperties = this.showProperties;
                    var $propertiesTab = this.el.properties.tab;
                    $propertiesTab.toggle(showProperties);
                    $propertiesTab.parent().removeClass("dlg-tabs-0 dlg-tabs-1 dlg-tabs-2 dlg-tabs-3 dlg-tabs-4 dlg-tabs-5 dlg-tabs-plus");
                    var $propertiesPage = this.el.properties.page;
                    if (showProperties) {
                        numTabs++;
                        this._propertiesPage.automation = this._automation;
                        lt.Demos.Annotations.PropertiesPage.onPropertiesChanged = function () {
                            _this._automation.invalidate(lt.LeadRectD.empty);
                        };
                        this._propertiesPage.initialize();
                    }
                    var showContent = this.showContent;
                    var $contentTab = this.el.content.tab;
                    $contentTab.toggle(showContent);
                    var $contentPage = this.el.content.page;
                    if (showContent) {
                        numTabs++;
                        if (this._targetObject != null) {
                            var metadata = this._targetObject.metadata;
                            if (metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] != undefined || metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] != null)
                                this._contentPage.contentText = this._targetObject.metadata[lt.Annotations.Core.AnnObject.contentMetadataKey];
                        }
                        this._contentPage.targetObject = this._targetObject;
                        this._contentPage.initialize();
                        this._contentPage.onContentChange = function () {
                            _this._reviewsPage.updateContent(_this.targetObject);
                        };
                    }
                    var showReviews = this.showReviews;
                    var $reviewsTab = this.el.reviews.tab;
                    $reviewsTab.toggle(showReviews);
                    var $reviewsPage = this.el.reviews.page;
                    if (showReviews) {
                        numTabs++;
                        this._reviewsPage.userName = this._userName;
                        this._reviewsPage.initialize();
                        this._reviewsPage.copyReviewsFrom(this._targetObject);
                    }
                    $propertiesTab.parent().addClass("dlg-tabs-" + numTabs);
                    var selectedClass = AutomationUpdateObjectDialog.selectedClass;
                    this.$allTabsAndPages.removeClass(selectedClass);
                    if (showProperties) {
                        $propertiesTab.addClass(selectedClass);
                        $propertiesPage.addClass(selectedClass);
                    }
                    else if (showContent) {
                        $contentTab.addClass(selectedClass);
                        $contentPage.addClass(selectedClass);
                    }
                    else if (showReviews) {
                        $reviewsTab.addClass(selectedClass);
                        $reviewsPage.addClass(selectedClass);
                    }
                    this.inner.show();
                };
                AutomationUpdateObjectDialog.selectedClass = "selected";
                return AutomationUpdateObjectDialog;
            }());
            Annotations.AutomationUpdateObjectDialog = AutomationUpdateObjectDialog;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var ContentPage = (function () {
                function ContentPage($propertiesPage) {
                    var _this = this;
                    this._ui = {
                        textArea: "#contentTextArea"
                    };
                    this._targetObject = null;
                    this._contentText = "";
                    this.initialize = function () {
                        _this.empty();
                        var $textArea = $(_this._ui.textArea);
                        $textArea.val(_this._contentText);
                        $textArea.change(function () {
                            _this._contentText = $textArea.val();
                            _this._targetObject.metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] = _this._contentText;
                            if (_this._onContentChange != null) {
                                _this._onContentChange();
                            }
                        });
                    };
                    this.empty = function () {
                        $(_this._ui.textArea).empty();
                    };
                    this._pageElement = $propertiesPage;
                }
                Object.defineProperty(ContentPage.prototype, "targetObject", {
                    get: function () { return this._targetObject; },
                    set: function (value) {
                        if (this._targetObject != value) {
                            this._targetObject = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ContentPage.prototype, "onContentChange", {
                    set: function (value) {
                        this._onContentChange = null;
                        this._onContentChange = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ContentPage.prototype, "contentText", {
                    get: function () { return this._contentText; },
                    set: function (value) { this._contentText = value; },
                    enumerable: true,
                    configurable: true
                });
                return ContentPage;
            }());
            Annotations.ContentPage = ContentPage;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var RichTextDialog = (function () {
                function RichTextDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._password = "";
                    this._onHideClicked = function () {
                        if (_this.onHide)
                            _this.onHide();
                        _this.inner.hide();
                    };
                    this.el = {
                        editor: root.find(selectors.editor),
                        hide: root.find(selectors.hide)
                    };
                    this.inner = new lt.Demos.Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHideClicked;
                    this.el.hide.on("click", this._onHideClicked);
                    var editor = this.el.editor;
                    this._richTextEditor = editor.get(0);
                    if (lt.LTHelper.device === lt.LTDevice.mobile || lt.LTHelper.device === lt.LTDevice.tablet) {
                        if (editor["jqte"])
                            editor.jqte({ title: false });
                    }
                    else {
                        if (editor["jqte"])
                            editor.jqte();
                    }
                }
                Object.defineProperty(RichTextDialog.prototype, "richTextEditor", {
                    get: function () {
                        return this._richTextEditor;
                    },
                    enumerable: true,
                    configurable: true
                });
                RichTextDialog.prototype.show = function () {
                    this.inner.show();
                };
                return RichTextDialog;
            }());
            Annotations.RichTextDialog = RichTextDialog;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var ListTreeNode = (function () {
                function ListTreeNode() {
                    this._isTouchHold = false;
                    this._currentTouchPoint = null;
                    this._touchMoveTolerance = 20;
                    this._isExpanded = false;
                }
                Object.defineProperty(ListTreeNode.prototype, "childNodes", {
                    get: function () {
                        return this._childNodes;
                    },
                    set: function (value) {
                        this._childNodes = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "isExpanded", {
                    get: function () {
                        return this._isExpanded;
                    },
                    set: function (value) {
                        this._isExpanded = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "parentDiv", {
                    get: function () {
                        return this._parentDiv;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "headingDiv", {
                    get: function () {
                        return this._headingDiv;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "headingLabel", {
                    get: function () {
                        return this._headingLabel;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "collapseExpandBtn", {
                    get: function () {
                        return this._collapseExpandBtn;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "contentDiv", {
                    get: function () {
                        return this._contentDiv;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "contextMenu", {
                    set: function (value) {
                        this._contextMenu = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "contextMenu_collapseExpandBtn", {
                    set: function (value) {
                        this._contextMenu_collapseExpandBtn = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                ListTreeNode.prototype.createTreeNode = function () {
                    var _this = this;
                    this._parentDiv = document.createElement("div");
                    lt.LTHelper.addClass(this._parentDiv, "panel");
                    lt.LTHelper.addClass(this._parentDiv, "panel-default");
                    this._headingDiv = document.createElement("div");
                    lt.LTHelper.addClass(this._headingDiv, "panel-heading");
                    this._collapseExpandBtn = document.createElement("a");
                    lt.LTHelper.addClass(this._collapseExpandBtn, "accordion-toggle");
                    this._collapseExpandBtn.setAttribute("data-toggle", "collapse");
                    this._collapseExpandBtn.onclick = function (e) { return _this.collapseExpandBtn_Click(e); };
                    this._headingLabel = document.createElement("label");
                    lt.LTHelper.addClass(this._headingLabel, "collapse-expand");
                    lt.LTHelper.addClass(this._headingLabel, "toggleToExpand");
                    this._contentDiv = document.createElement("div");
                    lt.LTHelper.addClass(this._contentDiv, "panel-collapse");
                    lt.LTHelper.addClass(this._contentDiv, "collapse");
                    this._collapseExpandBtn.appendChild(this._headingLabel);
                    this._headingDiv.appendChild(this._collapseExpandBtn);
                    this._parentDiv.appendChild(this._headingDiv);
                    this._parentDiv.appendChild(this._contentDiv);
                    if (this._contextMenu) {
                        if (lt.LTHelper.supportsTouch) {
                            this._headingDiv.addEventListener("touchstart", function (e) { return _this.touchstart(e); }, false);
                            this._headingDiv.addEventListener("touchmove", function (e) { return _this.touchmove(e); }, false);
                            this._headingDiv.addEventListener("touchend", function (e) { return _this.touchend(e); }, false);
                        }
                        else {
                            $(this._headingDiv).bind("contextmenu", $.proxy(this.contextmenu, this));
                        }
                        $(document).bind("click", $.proxy(this.hideContextMenu, this));
                    }
                    this.updateNodeExpansion();
                };
                ListTreeNode.prototype.clearContent = function () {
                    while (this._contentDiv.firstChild) {
                        this._contentDiv.removeChild(this._contentDiv.firstChild);
                    }
                };
                ListTreeNode.prototype.collapseExpandBtn_Click = function (e) {
                    this._isExpanded = !this._isExpanded;
                    this.updateNodeExpansion();
                    this.updateObjectInfoVisibility();
                };
                ListTreeNode.prototype.updateNodeExpansion = function () {
                    if (this._isExpanded) {
                        lt.LTHelper.removeClass(this._headingLabel, "toggleToExpand");
                        lt.LTHelper.addClass(this._headingLabel, "toggleToCollapse");
                        lt.LTHelper.removeClass(this._collapseExpandBtn, "collapsed");
                        lt.LTHelper.addClass(this._contentDiv, "in");
                    }
                    else {
                        lt.LTHelper.removeClass(this._headingLabel, "toggleToCollapse");
                        lt.LTHelper.addClass(this._headingLabel, "toggleToExpand");
                        lt.LTHelper.addClass(this._collapseExpandBtn, "collapsed");
                        lt.LTHelper.removeClass(this._contentDiv, "in");
                    }
                };
                ListTreeNode.prototype.updateObjectInfoVisibility = function () {
                    var objectInfoContainerDiv = this._headingDiv.getElementsByClassName("objectInfoContainer").item(0);
                    if (objectInfoContainerDiv) {
                        var objectNameLabel = objectInfoContainerDiv.getElementsByClassName("objectName").item(0);
                        objectNameLabel.style.visibility = this.isExpanded ? "visible" : "hidden";
                        var dateTimeLabel = objectInfoContainerDiv.getElementsByClassName("dateTime").item(0);
                        dateTimeLabel.style.visibility = this.isExpanded ? "visible" : "hidden";
                    }
                };
                ListTreeNode.prototype.showContextMenu = function (point) {
                    var _this = this;
                    this.onShowContextMenu();
                    this._contextMenu_collapseExpandBtn.children[0].textContent = this._isExpanded ? "Collapse" : "Expand";
                    this._contextMenu_collapseExpandBtn.onclick = null;
                    this._contextMenu_collapseExpandBtn.onclick = function (e) { return _this.contextMenu_collapseExpandBtn_Click(e); };
                    var menus = $(".dropup.clearfix");
                    menus.css("display", "none");
                    if (point != null) {
                        $(this._contextMenu).css({
                            display: "block",
                            left: point.x,
                            top: point.y
                        });
                    }
                };
                ListTreeNode.prototype.onShowContextMenu = function () { };
                ListTreeNode.prototype.contextMenu_collapseExpandBtn_Click = function (e) {
                    this._isExpanded = !this._isExpanded;
                    this.updateNodeExpansion();
                    this.updateObjectInfoVisibility();
                };
                ListTreeNode.prototype.hideContextMenu = function (e) {
                    $(this._contextMenu).hide();
                };
                ListTreeNode.prototype.contextmenu = function (e) {
                    e.preventDefault();
                    var point = lt.LeadPointD.create(e.pageX, e.pageY);
                    this.showContextMenu(point);
                };
                ListTreeNode.prototype.touchstart = function (e) {
                    var _this = this;
                    this._isTouchHold = true;
                    this._currentTouchPoint = lt.LeadPointD.create(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
                    this._touchHoldTimeOutHandler = window.setTimeout(function () {
                        if (_this._isTouchHold) {
                            _this.showContextMenu(_this._currentTouchPoint);
                        }
                    }, 500);
                };
                ListTreeNode.prototype.touchmove = function (e) {
                    var hasShownMenu = $("#annTreeNodeContextMenu").css("display") == "block" || $("#annReviewNodeContextMenu").css("display") == "block";
                    if (hasShownMenu)
                        e.preventDefault();
                    var point = lt.LeadPointD.create(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
                    var dx = point.x - this._currentTouchPoint.x;
                    var dy = point.y - this._currentTouchPoint.y;
                    if (dx > this._touchMoveTolerance || dx < -(this._touchMoveTolerance) || dy > this._touchMoveTolerance || dy < -(this._touchMoveTolerance)) {
                        window.clearTimeout(this._touchHoldTimeOutHandler);
                        this._isTouchHold = false;
                    }
                };
                ListTreeNode.prototype.touchend = function (e) {
                    window.clearTimeout(this._touchHoldTimeOutHandler);
                    this._isTouchHold = false;
                };
                ListTreeNode.BtnChecked = function (btn, check) {
                    check ? btn.addClass("checked") : btn.removeClass("checked");
                };
                return ListTreeNode;
            }());
            Annotations.ListTreeNode = ListTreeNode;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var AnnObjectTreeNode = (function (_super) {
                __extends(AnnObjectTreeNode, _super);
                function AnnObjectTreeNode(owner, automation, imageViewer, annContainer, annObject) {
                    if (!automation)
                        throw new Error("automation cannot be null");
                    if (!imageViewer)
                        throw new Error("imageViewer cannot be null");
                    if (!annContainer)
                        throw new Error("annContainer cannot be null");
                    if (!annObject)
                        throw new Error("annObject cannot be null");
                    if (annObject.id == lt.Annotations.Core.AnnObject.selectObjectId || annObject.id == lt.Annotations.Core.AnnObject.none)
                        throw new Error("Cannot create this item with a selection or none annotation object");
                    _super.call(this);
                    this._owner = owner;
                    this._automation = automation;
                    this._imageViewer = imageViewer;
                    this._annContainer = annContainer;
                    this._annObject = annObject;
                    this.contextMenu = document.getElementById("annTreeNodeContextMenu");
                    this.contextMenu_collapseExpandBtn = document.getElementById("annTreeNodeContextMenu_collapseExpand");
                    this._contextMenu_replyBtn = document.getElementById("annTreeNodeContextMenu_reply");
                    this._contextMenu_deleteBtn = document.getElementById("annTreeNodeContextMenu_delete");
                    this._contextMenu_propertiesBtn = document.getElementById("annTreeNodeContextMenu_properties");
                    this.childNodes = new Array();
                    this.createTreeNode();
                    this.customizeTreeNode();
                    this.updateContent();
                    this.hookEvents();
                }
                Object.defineProperty(AnnObjectTreeNode.prototype, "annObject", {
                    get: function () {
                        return this._annObject;
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnObjectTreeNode.createContextMenu = function () {
                    var menuHtml = "";
                    menuHtml += "<div id='annTreeNodeContextMenu' class='dropup clearfix' tabindex='-1' style='display:none;'>";
                    menuHtml += "<ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu' style='display:block;margin-bottom:5px;'>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annTreeNodeContextMenu_collapseExpand' class='menuItem'>";
                    menuHtml += "<span class='text'></span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annTreeNodeContextMenu_reply' class='menuItem'>";
                    menuHtml += "<span class='text'>Reply</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annTreeNodeContextMenu_delete' class='menuItem'>";
                    menuHtml += "<span class='text'>Delete</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annTreeNodeContextMenu_properties' class='menuItem'>";
                    menuHtml += "<span class='text'>Properties</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "</ul>";
                    menuHtml += "</div>";
                    var contextMenu = document.createElement("div");
                    contextMenu.innerHTML = menuHtml;
                    document.body.appendChild(contextMenu);
                };
                AnnObjectTreeNode.prototype.customizeTreeNode = function () {
                    lt.LTHelper.addClass(this.parentDiv, "object-panel");
                    var labelSpan = document.createElement("span");
                    lt.LTHelper.addClass(labelSpan, "annObjectImage");
                    this.headingDiv.appendChild(labelSpan);
                    var objectInfoContainerDiv = document.createElement("div");
                    lt.LTHelper.addClass(objectInfoContainerDiv, "objectInfoContainer");
                    this.headingDiv.appendChild(objectInfoContainerDiv);
                    var userNameLabel = document.createElement("label");
                    lt.LTHelper.addClass(userNameLabel, "userName");
                    var objectNameLabel = document.createElement("label");
                    lt.LTHelper.addClass(objectNameLabel, "objectName");
                    objectNameLabel.style.visibility = "hidden";
                    var dateTimeLabel = document.createElement("label");
                    lt.LTHelper.addClass(dateTimeLabel, "dateTime");
                    dateTimeLabel.style.visibility = "hidden";
                    objectInfoContainerDiv.appendChild(userNameLabel);
                    objectInfoContainerDiv.appendChild(objectNameLabel);
                    objectInfoContainerDiv.appendChild(dateTimeLabel);
                    var annAutomationObject = this._automation.manager.findObjectById(this._annObject.id);
                    if (annAutomationObject != null) {
                        objectNameLabel.textContent = annAutomationObject.name;
                        labelSpan.style.backgroundImage = "url(" + annAutomationObject.toolBarImage + ")";
                    }
                    else {
                        objectNameLabel.textContent = this._annObject.friendlyName;
                        labelSpan.style.backgroundImage = null;
                    }
                    if (this._annObject.metadata[lt.Annotations.Core.AnnObject.authorMetadataKey] != null && this._annObject.metadata[lt.Annotations.Core.AnnObject.authorMetadataKey] != "") {
                        userNameLabel.textContent = this._annObject.metadata[lt.Annotations.Core.AnnObject.authorMetadataKey];
                    }
                    else {
                        userNameLabel.textContent = "[Author]";
                    }
                    if (this._annObject.metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey] != null && this._annObject.metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey] != "") {
                        var date = this._annObject.metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey];
                        dateTimeLabel.textContent = date.substring(0, date.indexOf("GMT"));
                    }
                    else {
                        dateTimeLabel.textContent = "[Date]";
                    }
                    if (!lt.Annotations.Core.AnnTextObject.isInstanceOfType(this._annObject)) {
                        var textareaContainerDiv = document.createElement("div");
                        lt.LTHelper.addClass(textareaContainerDiv, "textareaContainer");
                        this._contentTextArea = document.createElement("textarea");
                        this._contentTextArea.setAttribute("rows", "2");
                        textareaContainerDiv.appendChild(this._contentTextArea);
                        this._contentTextArea.textContent = this._annObject.metadata[lt.Annotations.Core.AnnObject.contentMetadataKey];
                        this.headingDiv.appendChild(textareaContainerDiv);
                    }
                };
                AnnObjectTreeNode.prototype.updateContent = function () {
                    if (this._annObject.reviews.length > 0) {
                        for (var i = 0; i < this._annObject.reviews.length; i++) {
                            var annReview = this._annObject.reviews[i];
                            var reviewNode = this.childNodes.filter(function (node) { return (node.annReview == annReview); })[0];
                            if (reviewNode) {
                                reviewNode.clearContent();
                                this.contentDiv.appendChild(reviewNode.parentDiv);
                                reviewNode.updateContent();
                            }
                            else {
                                reviewNode = new Annotations.ReviewTreeNode(this._automation, this._annObject, this._annObject.reviews[i], this);
                                this.childNodes.push(reviewNode);
                                this.contentDiv.appendChild(reviewNode.parentDiv);
                                reviewNode.updateContent();
                            }
                        }
                    }
                };
                AnnObjectTreeNode.prototype.hookEvents = function () {
                    var _this = this;
                    this.parentDiv.onmousedown = function (e) { return _this.parentDiv_MouseDown(e); };
                    if (!lt.Annotations.Core.AnnTextObject.isInstanceOfType(this._annObject))
                        this._contentTextArea.onchange = function (e) { return _this.contentTextArea_Change(e); };
                };
                AnnObjectTreeNode.prototype.parentDiv_MouseDown = function (e) {
                    if (e.button != 1) {
                        $(".object-panel>.panel-heading").removeClass("selected");
                        lt.LTHelper.addClass(this.headingDiv, "selected");
                        var invalidRect = lt.LeadRectD.empty;
                        if (this._annObject != null)
                            invalidRect = lt.LeadRectD.unionRects(invalidRect, this._automation.getObjectInvalidateRect(this._annObject));
                        this._automation.activeContainer = this._annContainer;
                        this._automation.selectObject(this._annObject);
                        this._imageViewer.ensureBoundsVisible(invalidRect);
                    }
                };
                AnnObjectTreeNode.prototype.contentTextArea_Change = function (e) {
                    var hasChanged = false;
                    var metadata = this._annObject.metadata;
                    if (metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] || metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] === "") {
                        var newVal = this._contentTextArea.value || "";
                        var oldVal = metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] || "";
                        if (newVal.toLowerCase() !== oldVal.toLowerCase()) {
                            metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] = newVal;
                            hasChanged = true;
                        }
                    }
                    if (hasChanged && this._owner && this._automation) {
                        var modifiedObjects = new lt.Annotations.Core.AnnObjectCollection();
                        modifiedObjects.add(this._annObject);
                        this._owner.beginIgnoreChanged();
                        try {
                            this._automation.invokeAfterObjectChanged(modifiedObjects, lt.Annotations.Automation.AnnObjectChangedType.metadata);
                        }
                        finally {
                            this._owner.endIgnoreChanged();
                        }
                    }
                };
                AnnObjectTreeNode.prototype.selectNode = function (select) {
                    if (select) {
                        lt.LTHelper.addClass(this.headingDiv, "selected");
                    }
                    else {
                        lt.LTHelper.removeClass(this.headingDiv, "selected");
                    }
                };
                AnnObjectTreeNode.prototype.onShowContextMenu = function () {
                    var _this = this;
                    this._contextMenu_deleteBtn.disabled = !this._automation.canDeleteObjects;
                    this._contextMenu_propertiesBtn.disabled = !this._automation.canShowObjectContextMenu;
                    this._contextMenu_replyBtn.onclick = null;
                    this._contextMenu_replyBtn.onclick = function (e) { return _this.contextMenu_replyBtn_Click(e); };
                    this._contextMenu_deleteBtn.onclick = null;
                    this._contextMenu_deleteBtn.onclick = function (e) { return _this.contextMenu_deleteBtn_Click(e); };
                    this._contextMenu_propertiesBtn.onclick = null;
                    this._contextMenu_propertiesBtn.onclick = function (e) { return _this.contextMenu_propertiesBtn_Click(e); };
                };
                AnnObjectTreeNode.prototype.contextMenu_replyBtn_Click = function (e) {
                    var review = new lt.Annotations.Core.AnnReview();
                    review.author = Annotations.AutomationObjectsListControl.userName;
                    review.date = new Date();
                    review.status = lt.Annotations.Core.AnnReview.reply;
                    this._annObject.reviews.push(review);
                    var reviewNode = new Annotations.ReviewTreeNode(this._automation, this._annObject, review, this);
                    this.childNodes.push(reviewNode);
                    this.contentDiv.appendChild(reviewNode.parentDiv);
                    reviewNode.updateContent();
                    this.isExpanded = true;
                    this.updateNodeExpansion();
                    this.updateObjectInfoVisibility();
                };
                AnnObjectTreeNode.prototype.contextMenu_deleteBtn_Click = function (e) {
                    this._automation.deleteSelectedObjects();
                };
                AnnObjectTreeNode.prototype.contextMenu_propertiesBtn_Click = function (e) {
                    if (this._automation != null && this._automation.canShowObjectProperties)
                        this._automation.showObjectProperties();
                };
                return AnnObjectTreeNode;
            }(Annotations.ListTreeNode));
            Annotations.AnnObjectTreeNode = AnnObjectTreeNode;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var AutomationObjectsListControl = (function () {
                function AutomationObjectsListControl() {
                    this._ignoreChangedCounter = 0;
                    this._pages = new Array();
                    Annotations.ReviewTreeNode.createContextMenu();
                    Annotations.AnnObjectTreeNode.createContextMenu();
                }
                Object.defineProperty(AutomationObjectsListControl.prototype, "automation", {
                    get: function () {
                        return this._automation;
                    },
                    set: function (value) {
                        if (this._automation != value) {
                            if (this._automation != null) {
                                this.hookEvents(false);
                                this._pages = new Array();
                            }
                        }
                        this._automation = value;
                        if (this._automation != null)
                            this.hookEvents(true);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationObjectsListControl.prototype, "imageViewer", {
                    get: function () {
                        return this._imageViewer;
                    },
                    set: function (value) {
                        this._imageViewer = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationObjectsListControl.prototype, "listContainerDiv", {
                    get: function () {
                        return this._listContainerDiv;
                    },
                    set: function (value) {
                        this._listContainerDiv = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                AutomationObjectsListControl.prototype.hookEvents = function (hook) {
                    var _this = this;
                    if (hook) {
                        this._automation_AfterObjectChanged = this._automation.afterObjectChanged.add(function (sender, e) { return _this.automation_AfterObjectChanged(sender, e); });
                        this._automationContainers_CollectionChanged = this._automation.containers.collectionChanged.add(function (sender, e) { return _this.automationContainers_CollectionChanged(sender, e); });
                        this._automation_CurrentDesignerChanged = this._automation.currentDesignerChanged.add(function (sender, e) { return _this.automation_CurrentDesignerChanged(sender, e); });
                        this._automation_AfterUndoRedo = this._automation.afterUndoRedo.add(function (sender, e) { return _this.automation_AfterUndoRedo(sender, e); });
                        this._automation_Edit = this._automation.edit.add(function (e) { return _this.automation_Edit(e); });
                    }
                    else {
                        this._automation.afterObjectChanged.remove(this._automation_AfterObjectChanged);
                        this._automation.containers.collectionChanged.remove(this._automationContainers_CollectionChanged);
                        this._automation.currentDesignerChanged.remove(this._automation_CurrentDesignerChanged);
                        this._automation.afterUndoRedo.remove(this._automation_AfterUndoRedo);
                        this._automation.edit.remove(this._automation_Edit);
                    }
                };
                AutomationObjectsListControl.prototype.automationContainers_CollectionChanged = function (sender, e) {
                    this.populate();
                };
                AutomationObjectsListControl.prototype.automation_AfterUndoRedo = function (sender, e) {
                    this.populate();
                };
                AutomationObjectsListControl.prototype.automation_Edit = function (e) {
                    this.populateContainer(this._automation.activeContainer);
                };
                AutomationObjectsListControl.prototype.beginIgnoreChanged = function () {
                    this._ignoreChangedCounter++;
                };
                AutomationObjectsListControl.prototype.endIgnoreChanged = function () {
                    this._ignoreChangedCounter--;
                };
                AutomationObjectsListControl.prototype.automation_AfterObjectChanged = function (sender, e) {
                    if (this._ignoreChangedCounter > 0)
                        return;
                    switch (e.changeType) {
                        case lt.Annotations.Automation.AnnObjectChangedType.added:
                        case lt.Annotations.Automation.AnnObjectChangedType.designerDraw:
                        case lt.Annotations.Automation.AnnObjectChangedType.deleted:
                        case lt.Annotations.Automation.AnnObjectChangedType.modified:
                        case lt.Annotations.Automation.AnnObjectChangedType.metadata:
                            this.populateContainer(this._automation.activeContainer);
                            break;
                        default:
                            break;
                    }
                };
                AutomationObjectsListControl.prototype.automation_CurrentDesignerChanged = function (sender, e) {
                    var editObject = this._automation.currentEditObject;
                    if (editObject != null) {
                        var selectedNodes;
                        if (lt.Annotations.Core.AnnSelectionObject.isInstanceOfType(editObject)) {
                            var selectionObject = editObject;
                            selectedNodes = new Array();
                        }
                        for (var i = 0; i < this._pages.length; i++) {
                            if (this._pages[i].annContainer != this._automation.activeContainer)
                                continue;
                            var annObjectNodes = this._pages[i].childNodes;
                            for (var j = 0; j < annObjectNodes.length; j++) {
                                if (selectionObject == null) {
                                    if (annObjectNodes[j].annObject == editObject) {
                                        annObjectNodes[j].selectNode(true);
                                    }
                                    else {
                                        annObjectNodes[j].selectNode(false);
                                    }
                                }
                                else {
                                    for (var k = 0; k < selectionObject.selectedObjects.count; k++) {
                                        if (annObjectNodes[j].annObject == selectionObject.selectedObjects.item(k)) {
                                            annObjectNodes[j].selectNode(true);
                                            selectedNodes.push(annObjectNodes[j]);
                                        }
                                        else {
                                            var node = selectedNodes.filter(function (node) { return (node.annObject == selectionObject.selectedObjects.item(k)); })[0];
                                            if (!node) {
                                                annObjectNodes[j].selectNode(false);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        $(".object-panel").removeClass("selected");
                    }
                };
                AutomationObjectsListControl.prototype.clear = function () {
                    while (this._listContainerDiv.firstChild) {
                        this._listContainerDiv.removeChild(this._listContainerDiv.firstChild);
                    }
                };
                AutomationObjectsListControl.prototype.populate = function () {
                    this.clear();
                    if (this._automation != null) {
                        for (var i = 0; i < this._automation.containers.count; i++) {
                            var container = this._automation.containers.get_item(i);
                            if (container.children.count > 0) {
                                var pageNode = this._pages.filter(function (node) { return (node.annContainer.pageNumber == container.pageNumber); })[0];
                                if (pageNode) {
                                    pageNode.clearContent();
                                    this._listContainerDiv.appendChild(pageNode.parentDiv);
                                    pageNode.updateContent();
                                }
                                else {
                                    pageNode = new Annotations.PageTreeNode(this, this._automation, this._imageViewer, container);
                                    this._pages.push(pageNode);
                                    this._listContainerDiv.appendChild(pageNode.parentDiv);
                                    pageNode.updateContent();
                                }
                            }
                        }
                    }
                };
                AutomationObjectsListControl.prototype.populateContainer = function (annContainer) {
                    var pageNode = this._pages.filter(function (node) { return (node.annContainer.pageNumber == annContainer.pageNumber); })[0];
                    if (pageNode) {
                        pageNode.clearContent();
                        if (annContainer.children.count > 0) {
                            pageNode.updateContent();
                        }
                        else {
                            var nodeIndex = this._pages.indexOf(pageNode);
                            this._pages.splice(nodeIndex, 1);
                            this._listContainerDiv.removeChild(pageNode.parentDiv);
                        }
                    }
                    else {
                        if (annContainer.children.count > 0) {
                            pageNode = new Annotations.PageTreeNode(this, this._automation, this._imageViewer, annContainer);
                            pageNode.updateContent();
                            this._pages.push(pageNode);
                            this._pages.sort(function (a, b) { return (a.annContainer.pageNumber - b.annContainer.pageNumber); });
                            var pageAfter = this._pages.filter(function (node) { return (node.annContainer.pageNumber > annContainer.pageNumber); })[0];
                            if (pageAfter) {
                                this._listContainerDiv.insertBefore(pageNode.parentDiv, pageAfter.parentDiv);
                            }
                            else {
                                this._listContainerDiv.appendChild(pageNode.parentDiv);
                            }
                        }
                    }
                };
                return AutomationObjectsListControl;
            }());
            Annotations.AutomationObjectsListControl = AutomationObjectsListControl;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var PageTreeNode = (function (_super) {
                __extends(PageTreeNode, _super);
                function PageTreeNode(owner, automation, imageViewer, annContainer) {
                    if (automation == null)
                        throw new Error("automation cannot be null");
                    if (imageViewer == null)
                        throw new Error("imageViewer cannot be null");
                    if (annContainer == null)
                        throw new Error("annContainer cannot be null");
                    _super.call(this);
                    this._owner = owner;
                    this._automation = automation;
                    this._imageViewer = imageViewer;
                    this._annContainer = annContainer;
                    this.isExpanded = true;
                    this.createTreeNode();
                    lt.LTHelper.addClass(this.parentDiv, "page-panel");
                    this.headingLabel.textContent = "Page " + annContainer.pageNumber;
                }
                Object.defineProperty(PageTreeNode.prototype, "annContainer", {
                    get: function () {
                        return this._annContainer;
                    },
                    enumerable: true,
                    configurable: true
                });
                PageTreeNode.prototype.updateContent = function () {
                    this.childNodes = new Array();
                    for (var j = 0; j < this._annContainer.children.count; j++) {
                        var annObject = this._annContainer.children.get_item(j);
                        if (annObject.id != lt.Annotations.Core.AnnObject.selectObjectId && annObject.id != lt.Annotations.Core.AnnObject.none) {
                            var annNode = new Annotations.AnnObjectTreeNode(this._owner, this._automation, this._imageViewer, this._annContainer, annObject);
                            this.childNodes.push(annNode);
                            this.contentDiv.appendChild(annNode.parentDiv);
                            annNode.updateContent();
                        }
                    }
                };
                return PageTreeNode;
            }(Annotations.ListTreeNode));
            Annotations.PageTreeNode = PageTreeNode;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var ReviewTreeNode = (function (_super) {
                __extends(ReviewTreeNode, _super);
                function ReviewTreeNode(automation, annObject, annReview, parentTreeNode) {
                    if (automation == null)
                        throw new Error("automation cannot be null");
                    if (annObject == null)
                        throw new Error("annObject cannot be null");
                    if (annObject.id == lt.Annotations.Core.AnnObject.selectObjectId || annObject.id == lt.Annotations.Core.AnnObject.none)
                        throw new Error("Cannot create this item with a selection or none annotation object");
                    _super.call(this);
                    this._automation = automation;
                    this._annObject = annObject;
                    this._annReview = annReview;
                    this._parentTreeNode = parentTreeNode;
                    this.contextMenu = document.getElementById("annReviewNodeContextMenu");
                    this.contextMenu_collapseExpandBtn = document.getElementById("annReviewNodeContextMenu_collapseExpand");
                    this._contextMenu_replyBtn = document.getElementById("annReviewNodeContextMenu_reply");
                    this._contextMenu_checkBtn = document.getElementById("annReviewNodeContextMenu_check");
                    this._contextMenu_addBtn = document.getElementById("annReviewNodeContextMenu_add");
                    this._contextMenu_deleteBtn = document.getElementById("annReviewNodeContextMenu_delete");
                    this._statusBtns = $(".reviewStatus");
                    this.childNodes = new Array();
                    this.createTreeNode();
                    this.customizeTreeNode();
                    this.updateContent();
                    this.hookEvents();
                }
                Object.defineProperty(ReviewTreeNode.prototype, "annReview", {
                    get: function () {
                        return this._annReview;
                    },
                    enumerable: true,
                    configurable: true
                });
                ReviewTreeNode.createContextMenu = function () {
                    var menuHtml = "";
                    menuHtml += "<div id='annReviewNodeContextMenu' class='dropup clearfix' tabindex='-1' style='display:none;'>";
                    menuHtml += "<ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu' style='display:block;margin-bottom:5px;'>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annReviewNodeContextMenu_collapseExpand' class='menuItem'>";
                    menuHtml += "<span class='text'></span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annReviewNodeContextMenu_reply' class='menuItem'>";
                    menuHtml += "<span class='text'>Reply</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='dropdown-submenu'>";
                    menuHtml += "<button class='menuItem'>";
                    menuHtml += "<span class='text'>Set Status</span>";
                    menuHtml += "</button>";
                    menuHtml += "<ul class='dropdown-menu'>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='accepted' value='Accepted' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Accepted</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='cancelled' value='Cancelled' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Cancelled</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='completed' value='Completed' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Completed</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='creted' value='Created' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Created</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='modified' value='Modified' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Modified</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='none' value='None' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>None</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='rejected' value='Rejected' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Rejected</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='reply' value='Reply' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Reply</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "</ul>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annReviewNodeContextMenu_check' class='menuItem'>";
                    menuHtml += "<span class='text'></span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annReviewNodeContextMenu_add' class='menuItem'>";
                    menuHtml += "<span class='text'>Add</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annReviewNodeContextMenu_delete' class='menuItem'>";
                    menuHtml += "<span class='text'>Delete</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "</ul>";
                    var contextMenu = document.createElement("div");
                    contextMenu.innerHTML = menuHtml;
                    document.body.appendChild(contextMenu);
                };
                ReviewTreeNode.prototype.customizeTreeNode = function () {
                    var labelSpan = document.createElement("span");
                    lt.LTHelper.addClass(labelSpan, "annObjectImage");
                    labelSpan.style.backgroundImage = ReviewTreeNode.undoImageUrl;
                    this.headingDiv.appendChild(labelSpan);
                    lt.LTHelper.addClass(this.parentDiv, "review-panel");
                    this._checkedCheckbox = document.createElement("input");
                    this._checkedCheckbox.type = "checkbox";
                    this.headingDiv.appendChild(this._checkedCheckbox);
                    var objectInfoContainerDiv = document.createElement("div");
                    lt.LTHelper.addClass(objectInfoContainerDiv, "objectInfoContainer");
                    this.headingDiv.appendChild(objectInfoContainerDiv);
                    var userNameLabel = document.createElement("label");
                    lt.LTHelper.addClass(userNameLabel, "userName");
                    var objectNameLabel = document.createElement("label");
                    lt.LTHelper.addClass(objectNameLabel, "objectName");
                    objectNameLabel.style.visibility = "hidden";
                    this._dateTimeLabel = document.createElement("label");
                    lt.LTHelper.addClass(this._dateTimeLabel, "dateTime");
                    this._dateTimeLabel.style.visibility = "hidden";
                    objectInfoContainerDiv.appendChild(userNameLabel);
                    objectInfoContainerDiv.appendChild(objectNameLabel);
                    objectInfoContainerDiv.appendChild(this._dateTimeLabel);
                    var annAutomationObject = this._automation.manager.findObjectById(this._annObject.id);
                    if (annAutomationObject != null) {
                        objectNameLabel.textContent = annAutomationObject.name;
                    }
                    else {
                        objectNameLabel.textContent = this._annObject.friendlyName;
                    }
                    if (this._annReview.author != null && this._annReview.author != "") {
                        userNameLabel.textContent = this._annReview.author;
                    }
                    else {
                        userNameLabel.textContent = "[Author]";
                    }
                    this._dateTimeLabel.textContent = this._annReview.status + ": " + this._annReview.date.toLocaleString();
                    var textareaContainerDiv = document.createElement("div");
                    lt.LTHelper.addClass(textareaContainerDiv, "textareaContainer");
                    this._commentTextArea = document.createElement("textarea");
                    this._commentTextArea.setAttribute("rows", "2");
                    textareaContainerDiv.appendChild(this._commentTextArea);
                    this._commentTextArea.textContent = this._annReview.comment;
                    this._checkedCheckbox.checked = this._annReview.isChecked;
                    this.headingDiv.appendChild(textareaContainerDiv);
                };
                ReviewTreeNode.prototype.updateContent = function () {
                    if (this._annReview.replies.length > 0) {
                        for (var i = 0; i < this._annReview.replies.length; i++) {
                            var reply = this._annReview.replies[i];
                            var reviewNode = this.childNodes.filter(function (node) { return (node.annReview == reply); })[0];
                            if (reviewNode) {
                                reviewNode.clearContent();
                                this.contentDiv.appendChild(reviewNode.parentDiv);
                                reviewNode.updateContent();
                            }
                            else {
                                reviewNode = new ReviewTreeNode(this._automation, this._annObject, reply, this);
                                this.childNodes.push(reviewNode);
                                this.contentDiv.appendChild(reviewNode.parentDiv);
                                reviewNode.updateContent();
                            }
                        }
                    }
                };
                ReviewTreeNode.prototype.hookEvents = function () {
                    var _this = this;
                    this._checkedCheckbox.onchange = function (e) { return _this.checkedCheckbox_Change(e); };
                    this._commentTextArea.onchange = function (e) { return _this.commentTextArea_Change(e); };
                };
                ReviewTreeNode.prototype.checkedCheckbox_Change = function (e) {
                    this._annReview.isChecked = this._checkedCheckbox.checked;
                };
                ReviewTreeNode.prototype.commentTextArea_Change = function (e) {
                    this._annReview.comment = this._commentTextArea.value;
                };
                ReviewTreeNode.prototype.onShowContextMenu = function () {
                    var _this = this;
                    this._contextMenu_checkBtn.children[0].textContent = this._annReview.isChecked ? "Uncheck" : "Check";
                    Annotations.ListTreeNode.BtnChecked(this._statusBtns, false);
                    Annotations.ListTreeNode.BtnChecked($(document.getElementById(this._annReview.status.toLowerCase())), true);
                    $(this._statusBtns).unbind("click");
                    $(this._statusBtns).bind("click", $.proxy(this.statusBtns_BtnClicked, this));
                    this._contextMenu_replyBtn.onclick = null;
                    this._contextMenu_replyBtn.onclick = function (e) { return _this.contextMenu_replyBtn_Click(e); };
                    this._contextMenu_checkBtn.onclick = null;
                    this._contextMenu_checkBtn.onclick = function (e) { return _this.contextMenu_checkBtn_Click(e); };
                    this._contextMenu_addBtn.onclick = null;
                    this._contextMenu_addBtn.onclick = function (e) { return _this.contextMenu_addBtn_Click(e); };
                    this._contextMenu_deleteBtn.onclick = null;
                    this._contextMenu_deleteBtn.onclick = function (e) { return _this.contextMenu_deleteBtn_Click(e); };
                };
                ReviewTreeNode.prototype.contextMenu_replyBtn_Click = function (e) {
                    var review = new lt.Annotations.Core.AnnReview();
                    review.author = Annotations.AutomationObjectsListControl.userName;
                    review.date = new Date();
                    review.status = lt.Annotations.Core.AnnReview.reply;
                    this.annReview.replies.push(review);
                    var reviewNode = new ReviewTreeNode(this._automation, this._annObject, review, this);
                    this.childNodes.push(reviewNode);
                    this.contentDiv.appendChild(reviewNode.parentDiv);
                    reviewNode.updateContent();
                    this.isExpanded = true;
                    this.updateNodeExpansion();
                    this.updateObjectInfoVisibility();
                };
                ReviewTreeNode.prototype.contextMenu_checkBtn_Click = function (e) {
                    this._checkedCheckbox.checked = !this._checkedCheckbox.checked;
                    this._annReview.isChecked = this._checkedCheckbox.checked;
                };
                ReviewTreeNode.prototype.contextMenu_addBtn_Click = function (e) {
                    var review = new lt.Annotations.Core.AnnReview();
                    review.author = Annotations.AutomationObjectsListControl.userName;
                    review.date = new Date();
                    review.status = lt.Annotations.Core.AnnReview.reply;
                    this._annObject.reviews.push(review);
                    var reviewNode = new ReviewTreeNode(this._automation, this._annObject, review, this._parentTreeNode);
                    this._parentTreeNode.childNodes.push(reviewNode);
                    this._parentTreeNode.contentDiv.appendChild(reviewNode.parentDiv);
                    reviewNode.updateContent();
                };
                ReviewTreeNode.prototype.contextMenu_deleteBtn_Click = function (e) {
                    var index = this._parentTreeNode.childNodes.indexOf(this);
                    this._parentTreeNode.childNodes.splice(index, 1);
                    if (Annotations.AnnObjectTreeNode.isInstanceOfType(this._parentTreeNode)) {
                        this._parentTreeNode.annObject.reviews.splice(index, 1);
                    }
                    else if (ReviewTreeNode.isInstanceOfType(this._parentTreeNode)) {
                        this._parentTreeNode.annReview.replies.splice(index, 1);
                    }
                    this._parentTreeNode.contentDiv.removeChild(this.parentDiv);
                };
                ReviewTreeNode.prototype.statusBtns_BtnClicked = function (e) {
                    this._annReview.status = $(e.currentTarget).val();
                    Annotations.ListTreeNode.BtnChecked(this._statusBtns, false);
                    Annotations.ListTreeNode.BtnChecked($(document.getElementById(this._annReview.status.toLowerCase())), true);
                    this._dateTimeLabel.textContent = this._annReview.status + ": " + this._annReview.date.toLocaleString();
                };
                return ReviewTreeNode;
            }(Annotations.ListTreeNode));
            Annotations.ReviewTreeNode = ReviewTreeNode;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var AutomationTextArea = (function () {
                function AutomationTextArea(parent, automation, editTextEvent, removeAction) {
                    var _this = this;
                    this.textAreaElement_StopPropagation = function (e) {
                        e.stopPropagation();
                    };
                    this.textAreaElement_FocusOut = function (e) {
                        _this.tryInternalRemove(true);
                    };
                    this.viewer_GotFocus = function (sender, e) {
                        _this.tryInternalRemove(true);
                    };
                    if (parent == null)
                        throw new Error("parent passed as null");
                    if (editTextEvent == null)
                        throw new Error("editTextEvent passed as null");
                    this.textObject = editTextEvent.textObject;
                    if (this.textObject == null)
                        throw new Error("No annotation text object was found in the event");
                    this._removeAction = removeAction;
                    this._automation = automation;
                    this._textAreaElement = document.createElement("textArea");
                    this._textAreaElement.style.left = editTextEvent.bounds.left + 'px';
                    this._textAreaElement.style.top = editTextEvent.bounds.top + 'px';
                    this._textAreaElement.style.position = 'absolute';
                    this._textAreaElement.style.zIndex = '100';
                    this._textAreaElement.style.height = editTextEvent.bounds.height + 'px';
                    this._textAreaElement.style.width = editTextEvent.bounds.width + 'px';
                    this._textAreaElement.value = editTextEvent.textObject.text;
                    this._textAreaElement.style.color = editTextEvent.textObject.textForeground.color;
                    this._textAreaElement.style.fontFamily = editTextEvent.textObject.font.fontFamilyName;
                    this._textAreaElement.style.fontSize = editTextEvent.textObject.font.fontSize + 'pt';
                    this._textAreaElement.wrap = "off";
                    parent.appendChild(this._textAreaElement);
                    this._textAreaElement.focus();
                    this._textAreaElement.onkeydown = function (e) { return _this.textAreaElement_KeyDown(e); };
                    this._textAreaElement.addEventListener("focusout", this.textAreaElement_FocusOut);
                    this._textAreaElement.addEventListener("mousedown", this.textAreaElement_StopPropagation);
                    this._textAreaElement.addEventListener("pointerdown", this.textAreaElement_StopPropagation);
                    var imageViewerAutomationControl = this._automation.automationControl;
                    imageViewerAutomationControl.imageViewer.interactiveService.tap.add(this.viewer_GotFocus);
                }
                AutomationTextArea.prototype.remove = function (update) {
                    this._removeAction = null;
                    if (update)
                        this.updateTextObject();
                    var parent = this._textAreaElement.parentElement;
                    if (parent != null) {
                        this._textAreaElement.parentElement.removeChild(this._textAreaElement);
                        parent.focus();
                    }
                    this._textAreaElement = null;
                };
                AutomationTextArea.prototype.updateTextObject = function () {
                    if (!this.textObject)
                        return;
                    this.textObject.text = this._textAreaElement.value;
                    if (this._automation) {
                        var annObjects = new lt.Annotations.Core.AnnObjectCollection();
                        annObjects.add(this.textObject);
                        this._automation.invokeObjectModified(annObjects, lt.Annotations.Automation.AnnObjectChangedType.text);
                        this._automation.invokeAfterObjectChanged(annObjects, lt.Annotations.Automation.AnnObjectChangedType.text);
                    }
                    this._automation.invalidate(lt.LeadRectD.empty);
                };
                AutomationTextArea.prototype.tryInternalRemove = function (update) {
                    if (this._removeAction)
                        this._removeAction(update);
                };
                AutomationTextArea.prototype.textAreaElement_KeyDown = function (e) {
                    switch (e.keyCode) {
                        case 27:
                            this.tryInternalRemove(false);
                            break;
                        default:
                            e.stopPropagation();
                            break;
                    }
                };
                return AutomationTextArea;
            }());
            Annotations.AutomationTextArea = AutomationTextArea;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var TreeView = (function () {
                function TreeView(divID) {
                    this._selectedNode = null;
                    this._nodes = [];
                    this.childNodesDiv = document.createElement("div");
                    this.root = document.getElementById(divID);
                    this.root.appendChild(this.childNodesDiv);
                }
                Object.defineProperty(TreeView.prototype, "selectedNode", {
                    get: function () { return this._selectedNode; },
                    set: function (value) {
                        if (this._selectedNode != null)
                            this._selectedNode.isSelected = false;
                        this._selectedNode = value;
                        if (this._selectedNode != null)
                            this._selectedNode.isSelected = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeView.prototype, "nodes", {
                    get: function () { return this._nodes; },
                    set: function (value) { this._nodes = value; },
                    enumerable: true,
                    configurable: true
                });
                TreeView.prototype.addNode = function (node) {
                    node.parentDiv = this.root;
                    node.parent = null;
                    this.childNodesDiv.appendChild(node.root);
                    this._nodes.push(node);
                };
                TreeView.prototype.deleteNode = function (node) {
                    this.childNodesDiv.removeChild(node.root);
                    var index = this._nodes.indexOf(node, 0);
                    if (index != undefined) {
                        this._nodes.splice(index, 1);
                    }
                    this.selectedNode = null;
                };
                TreeView.prototype.updateUIElements = function () {
                };
                return TreeView;
            }());
            Annotations.TreeView = TreeView;
            var TreeNode = (function () {
                function TreeNode(treeView) {
                    var _this = this;
                    this.isCollapsed = true;
                    this._isSelected = false;
                    this._nodes = [];
                    this.root = document.createElement("div");
                    $(this.root).addClass("tree-node");
                    this.root.addEventListener("click", function (ev) { return _this.mainDiv_Click(ev); }, true);
                    this.header = document.createElement("div");
                    $(this.header).addClass("tree-header");
                    this.collapseLabel = document.createElement("label");
                    $(this.collapseLabel).addClass("tree-indicator").text("+");
                    this.collapseLabel.addEventListener("click", function (ev) { return _this.collapseLabel_Click(ev); });
                    this.childNodesDiv = document.createElement("div");
                    $(this.childNodesDiv).addClass("tree-children").hide();
                    $(this.root)
                        .append(this.collapseLabel)
                        .append(this.header)
                        .append(this.childNodesDiv);
                    this.treeView = treeView;
                }
                Object.defineProperty(TreeNode.prototype, "isSelected", {
                    get: function () { return this._isSelected; },
                    set: function (value) {
                        this._isSelected = value;
                        $(this.header).toggleClass("selected", value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeNode.prototype, "nodes", {
                    get: function () { return this._nodes; },
                    set: function (value) { this._nodes = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeNode.prototype, "tag", {
                    get: function () { return this._tag; },
                    set: function (value) { this._tag = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeNode.prototype, "content", {
                    get: function () { return this._content; },
                    set: function (value) {
                        this._content = value;
                        while (this.header.firstChild) {
                            this.header.removeChild(this.header.firstChild);
                        }
                        this.header.appendChild(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                TreeNode.prototype.mainDiv_Click = function (ev) {
                    this.treeView.selectedNode = this;
                    if (this.treeView.onSelectionChanged != null) {
                        this.treeView.onSelectionChanged(ev);
                    }
                };
                TreeNode.prototype.collapseLabel_Click = function (ev) {
                    this.isCollapsed = !this.isCollapsed;
                    if (this.isCollapsed) {
                        $(this.collapseLabel).text("+");
                        $(this.childNodesDiv).hide();
                    }
                    else {
                        $(this.collapseLabel).text("-");
                        $(this.childNodesDiv).show();
                    }
                };
                TreeNode.prototype.addNode = function (node) {
                    node.parentDiv = this.root;
                    node.parent = this;
                    this.childNodesDiv.appendChild(node.root);
                    this._nodes.push(node);
                };
                TreeNode.prototype.deleteNode = function (node) {
                    this.childNodesDiv.removeChild(node.root);
                    var index = this._nodes.indexOf(node, 0);
                    if (index != undefined) {
                        this._nodes.splice(index, 1);
                    }
                    this.treeView.selectedNode = null;
                };
                return TreeNode;
            }());
            Annotations.TreeNode = TreeNode;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var MediaPlayerDialog = (function () {
                function MediaPlayerDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._onHideClicked = function () {
                        if (_this.inner.isShowing) {
                            if (_this._videoElement) {
                                _this._videoElement.pause();
                                if (_this._sourceElement1.parentNode === _this._videoElement)
                                    _this._videoElement.removeChild(_this._sourceElement1);
                                if (_this._sourceElement2.parentNode === _this._videoElement)
                                    _this._videoElement.removeChild(_this._sourceElement2);
                                if (_this._sourceElement3.parentNode === _this._videoElement)
                                    _this._videoElement.removeChild(_this._sourceElement3);
                            }
                        }
                        _this.inner.hide();
                    };
                    this.el = {
                        videoObject: root.find(selectors.videoObject),
                        hide: root.find(selectors.hide)
                    };
                    this.inner = new lt.Demos.Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHideClicked;
                    this.el.hide.on("click", this._onHideClicked);
                }
                MediaPlayerDialog.prototype.play = function (source1, source2, source3) {
                    var _this = this;
                    if (!source1 && !source2 && !source3)
                        return;
                    this._videoElement = this.el.videoObject.get(0);
                    var canPlay = typeof (this._videoElement.play) === "function";
                    if (!canPlay) {
                        this._videoElement.innerHTML = "Your browser does not support HTML5 video.";
                    }
                    else {
                        this._sourceElement1 = document.createElement("source");
                        this._sourceElement1.src = source1;
                        this._sourceElement2 = document.createElement("source");
                        this._sourceElement2.src = source2;
                        this._sourceElement3 = document.createElement("source");
                        this._sourceElement3.src = source3;
                        this._videoElement.appendChild(this._sourceElement1);
                        this._videoElement.appendChild(this._sourceElement2);
                        this._videoElement.appendChild(this._sourceElement3);
                        this._videoElement.load();
                    }
                    this.inner.show(function () {
                        if (canPlay) {
                            _this._videoElement.play();
                        }
                    });
                };
                Object.defineProperty(MediaPlayerDialog.prototype, "videoElement", {
                    get: function () {
                        return this._videoElement;
                    },
                    enumerable: true,
                    configurable: true
                });
                return MediaPlayerDialog;
            }());
            Annotations.MediaPlayerDialog = MediaPlayerDialog;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var norbergObjectId = -1008;
            var AnnEditor = (function () {
                function AnnEditor() {
                    this._properties = {};
                }
                Object.defineProperty(AnnEditor.prototype, "groupName", {
                    get: function () {
                        return this._groupName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnEditor;
            }());
            Annotations.AnnEditor = AnnEditor;
            var AnnColorEditor = (function (_super) {
                __extends(AnnColorEditor, _super);
                function AnnColorEditor(color, groupName) {
                    _super.call(this);
                    this._groupName = groupName;
                    this.value = color;
                }
                Object.defineProperty(AnnColorEditor.prototype, "value", {
                    get: function () { return this._color; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._color, value);
                        this._color = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnColorEditor;
            }(AnnEditor));
            Annotations.AnnColorEditor = AnnColorEditor;
            var AnnBooleanEditor = (function (_super) {
                __extends(AnnBooleanEditor, _super);
                function AnnBooleanEditor(value, groupName) {
                    _super.call(this);
                    this._value = value;
                    this._groupName = groupName;
                }
                Object.defineProperty(AnnBooleanEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnBooleanEditor;
            }(AnnEditor));
            Annotations.AnnBooleanEditor = AnnBooleanEditor;
            var AnnLengthEditor = (function (_super) {
                __extends(AnnLengthEditor, _super);
                function AnnLengthEditor(annLength, groupName, propertyName, displayName) {
                    var _this = this;
                    _super.call(this);
                    this.info_ValueChanged = function (oldValue, newValue) {
                        _this._annLength.value = newValue;
                        _this.onValueChanged(oldValue, newValue);
                    };
                    this._annLength = annLength;
                    this._groupName = groupName;
                    var info = new Annotations.AnnPropertyInfo(propertyName, false, annLength.get_value(), groupName, "Length", displayName, true, AnnDoubleEditor);
                    info.valueChanged = this.info_ValueChanged;
                    this._properties[propertyName] = info;
                }
                return AnnLengthEditor;
            }(AnnEditor));
            Annotations.AnnLengthEditor = AnnLengthEditor;
            var AnnSolidColorBrushEditor = (function (_super) {
                __extends(AnnSolidColorBrushEditor, _super);
                function AnnSolidColorBrushEditor(annSolidColorBrush, groupName, propertyName, displayName) {
                    var _this = this;
                    _super.call(this);
                    this._annSolidColorBrush = null;
                    this.info_ValueChanged = function (oldValue, newValue) {
                        if (_this._annSolidColorBrush != null) {
                            _this._annSolidColorBrush.color = newValue;
                        }
                        if (_this.onValueChanged != null) {
                            _this.onValueChanged(oldValue, newValue);
                        }
                    };
                    this._annSolidColorBrush = annSolidColorBrush;
                    this._groupName = groupName;
                    var info;
                    if (annSolidColorBrush != null) {
                        info = new Annotations.AnnPropertyInfo(propertyName, false, annSolidColorBrush.get_color(), groupName, "Color", displayName, true, AnnColorEditor);
                    }
                    else {
                        info = new Annotations.AnnPropertyInfo(propertyName, false, "transparent", groupName, "Color", displayName, true, AnnColorEditor);
                    }
                    info.valueChanged = this.info_ValueChanged;
                    this._properties[propertyName] = info;
                }
                return AnnSolidColorBrushEditor;
            }(AnnEditor));
            Annotations.AnnSolidColorBrushEditor = AnnSolidColorBrushEditor;
            var AnnDoubleEditor = (function (_super) {
                __extends(AnnDoubleEditor, _super);
                function AnnDoubleEditor(value, groupName) {
                    _super.call(this);
                    this._value = 0;
                    this._groupName = groupName;
                    this.value = value;
                }
                Object.defineProperty(AnnDoubleEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnDoubleEditor;
            }(AnnEditor));
            Annotations.AnnDoubleEditor = AnnDoubleEditor;
            var AnnStringEditor = (function (_super) {
                __extends(AnnStringEditor, _super);
                function AnnStringEditor(value, groupName) {
                    _super.call(this);
                    this._value = "";
                    this._groupName = groupName;
                    this.value = value;
                }
                Object.defineProperty(AnnStringEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnStringEditor;
            }(AnnEditor));
            Annotations.AnnStringEditor = AnnStringEditor;
            var AnnPictureEditor = (function (_super) {
                __extends(AnnPictureEditor, _super);
                function AnnPictureEditor(value, groupName) {
                    _super.call(this);
                    this._value = lt.Annotations.Core.AnnPicture.empty;
                    this._groupName = groupName;
                    this.value = value;
                }
                Object.defineProperty(AnnPictureEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnPictureEditor;
            }(AnnEditor));
            Annotations.AnnPictureEditor = AnnPictureEditor;
            var AnnMediaEditor = (function (_super) {
                __extends(AnnMediaEditor, _super);
                function AnnMediaEditor(value, groupName) {
                    _super.call(this);
                    this._value = new lt.Annotations.Core.AnnMedia();
                    this._groupName = groupName;
                    this.value = value;
                }
                Object.defineProperty(AnnMediaEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnMediaEditor;
            }(AnnEditor));
            Annotations.AnnMediaEditor = AnnMediaEditor;
            var AnnIntegerEditor = (function (_super) {
                __extends(AnnIntegerEditor, _super);
                function AnnIntegerEditor(value, groupName) {
                    _super.call(this);
                    this._value = 0;
                    this._groupName = groupName;
                    this.value = value;
                }
                Object.defineProperty(AnnIntegerEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnIntegerEditor;
            }(AnnEditor));
            Annotations.AnnIntegerEditor = AnnIntegerEditor;
            var AnnStrokeEditor = (function (_super) {
                __extends(AnnStrokeEditor, _super);
                function AnnStrokeEditor(annStroke, groupName) {
                    var _this = this;
                    _super.call(this);
                    this.strokePropertyInfo_ValueChanged = function (oldValue, newValue) {
                        if (_this.onValueChanged != null) {
                            _this.onValueChanged(oldValue, newValue);
                        }
                    };
                    this._groupName = groupName;
                    var strokePropertyInfo = new Annotations.AnnPropertyInfo("Stroke", false, annStroke.get_stroke(), groupName, "Stroke", "", true, AnnSolidColorBrushEditor);
                    strokePropertyInfo.valueChanged = this.strokePropertyInfo_ValueChanged;
                    this._properties["Stroke"] = strokePropertyInfo;
                    var thicknessPropertyInfo = new Annotations.AnnPropertyInfo("Thickness", false, annStroke.get_strokeThickness(), groupName, "Thickness", "", true, AnnLengthEditor);
                    thicknessPropertyInfo.valueChanged = this.strokePropertyInfo_ValueChanged;
                    this._properties["Thickness"] = thicknessPropertyInfo;
                }
                return AnnStrokeEditor;
            }(AnnEditor));
            Annotations.AnnStrokeEditor = AnnStrokeEditor;
            var AnnFontEditor = (function (_super) {
                __extends(AnnFontEditor, _super);
                function AnnFontEditor(annFont, groupName) {
                    var _this = this;
                    _super.call(this);
                    this._annFont = null;
                    this.fontSize_ValueChanged = function (oldValue, newValue) {
                        _this._annFont.fontSize = newValue;
                    };
                    this.fontFamilyName_ValueChanged = function (oldValue, newValue) {
                        _this._annFont.fontFamilyName = newValue;
                        _this.onValueChanged(oldValue, newValue);
                    };
                    this._groupName = groupName;
                    this._annFont = annFont;
                    var fontFamilyNameInfo = new Annotations.AnnPropertyInfo("", false, annFont.get_fontFamilyName(), groupName, "Stroke", "Family Name", true, AnnStringEditor);
                    fontFamilyNameInfo.valueChanged = this.fontFamilyName_ValueChanged;
                    fontFamilyNameInfo.values["Arial"] = "Arial";
                    fontFamilyNameInfo.values["Courier New"] = "Courier New";
                    fontFamilyNameInfo.values["Times New Roman"] = "Times New Roman";
                    fontFamilyNameInfo.values["Verdana"] = "Verdana";
                    var fontSize = new Annotations.AnnPropertyInfo("", false, annFont.get_fontSize(), groupName, "FontSize", "Size in Points", true, AnnDoubleEditor);
                    fontSize.values["8"] = 8;
                    fontSize.values["10"] = 10;
                    fontSize.values["11"] = 11;
                    fontSize.values["12"] = 12;
                    fontSize.values["13"] = 13;
                    fontSize.values["14"] = 14;
                    fontSize.values["16"] = 16;
                    fontSize.values["18"] = 18;
                    fontSize.values["20"] = 20;
                    fontSize.valueChanged = this.fontSize_ValueChanged;
                    this._properties["FontFamilyName"] = fontFamilyNameInfo;
                    this._properties["FontSize"] = fontSize;
                }
                return AnnFontEditor;
            }(AnnEditor));
            Annotations.AnnFontEditor = AnnFontEditor;
            var AnnObjectEditor = (function () {
                function AnnObjectEditor(annObject) {
                    var _this = this;
                    this._properties = {};
                    this.wordWrapInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(_this._annObject)) {
                            var annTextObject = _this._annObject;
                            annTextObject.set_wordWrap(_this.properties["WordWrap"].values[newValue]);
                        }
                    };
                    this.pictureInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnStampObject.isInstanceOfType(_this._annObject)) {
                            var annStampObject = _this._annObject;
                            annStampObject.set_picture(newValue);
                        }
                        if (lt.Annotations.Core.AnnHotspotObject.isInstanceOfType(_this._annObject)) {
                            var annHotspotObject = _this._annObject;
                            annHotspotObject.set_picture(newValue);
                        }
                        if (lt.Annotations.Core.AnnFreehandHotspotObject.isInstanceOfType(_this._annObject)) {
                            var annFreehandHotspotObject = _this._annObject;
                            annFreehandHotspotObject.set_picture(newValue);
                        }
                    };
                    this.hyperlink_ValueChanged = function (oldValue, newValue) {
                        if (_this._annObject != null) {
                            _this._annObject.set_hyperlink(newValue);
                        }
                    };
                    this.showPictureInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPointObject.isInstanceOfType(_this._annObject)) {
                            var annPointObject = _this._annObject;
                            annPointObject.set_showPicture(_this.properties["ShowPicture"].values[newValue]);
                        }
                    };
                    this.expandedInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextRollupObject.isInstanceOfType(_this._annObject)) {
                            var annTextRollup = _this._annObject;
                            annTextRollup.set_expanded(_this.properties["Expanded"].values[newValue]);
                        }
                    };
                    this.fillPropertyInfo_ValueChanged = function (oldValue, newValue) {
                        if (newValue != null) {
                            if (_this._annObject != null) {
                                if (lt.Annotations.Core.AnnHiliteObject.isInstanceOfType(_this._annObject)) {
                                    var annHiliteObject = _this._annObject;
                                    annHiliteObject.set_hiliteColor(newValue);
                                }
                                else {
                                    _this._annObject.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create(newValue));
                                }
                            }
                        }
                    };
                    this.strokePropertyInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(_this._annObject)) {
                            var annPolyRulerObject = _this._annObject;
                            annPolyRulerObject.set_tickMarksStroke(annPolyRulerObject.stroke);
                        }
                    };
                    this.ruberStampTypeinfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnRubberStampObject.isInstanceOfType(_this._annObject)) {
                            var annRubberStampObject = _this._annObject;
                            annRubberStampObject.set_rubberStampType(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnRubberStampType, "Stamp" + _this.properties["RuberStampType"].values[newValue]));
                        }
                        if (lt.Annotations.Core.AnnSelectionObject.isInstanceOfType(_this._annObject)) {
                            var annSelectionObject = _this._annObject;
                            annSelectionObject.applyProperties();
                            for (var i = 0; i < annSelectionObject.get_selectedObjects().count; i++) {
                                var ruler = annSelectionObject.get_selectedObjects().item(i);
                                if (ruler != null) {
                                    ruler.set_stroke(annSelectionObject.get_stroke());
                                    ruler.set_tickMarksStroke(annSelectionObject.get_stroke());
                                }
                            }
                        }
                    };
                    this.acuteInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnProtractorObject.isInstanceOfType(_this._annObject)) {
                            var annProtractorObject = _this._annObject;
                            annProtractorObject.set_acute(_this.properties["Acute"].values[newValue]);
                        }
                    };
                    this.fixedPointerInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextPointerObject.isInstanceOfType(_this._annObject)) {
                            var annTextPointerObject = _this._annObject;
                            annTextPointerObject.set_fixedPointer(_this.properties["FixedPointer"].values[newValue]);
                        }
                    };
                    this.anglePrecisionInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnProtractorObject.isInstanceOfType(_this._annObject)) {
                            var annProtractorObject = _this._annObject;
                            annProtractorObject.set_anglePrecision(_this.properties["AnglePrecision"].values[newValue]);
                        }
                    };
                    this.precisionInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(_this._annObject)) {
                            var annPolyRulerObject = _this._annObject;
                            annPolyRulerObject.set_precision(_this.properties["Precision"].values[newValue]);
                        }
                    };
                    this.angularUnitInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnProtractorObject.isInstanceOfType(_this._annObject)) {
                            var annProtractorObject = _this._annObject;
                            annProtractorObject.set_angularUnit(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnAngularUnit, _this.properties["AngularUnit"].values[newValue]));
                        }
                    };
                    this.showTickMarksInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(_this._annObject)) {
                            var annPolyRulerObject = _this._annObject;
                            annPolyRulerObject.set_showTickMarks(_this.properties["ShowTickMarks"].values[newValue]);
                        }
                    };
                    this.measurementUnitInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(_this._annObject)) {
                            var annPolyRulerObject = _this._annObject;
                            annPolyRulerObject.set_measurementUnit(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnUnit, _this.properties["MeasurementUnit"].values[newValue]));
                        }
                    };
                    this.showGauge_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(_this._annObject)) {
                            var annPolyRulerObject = _this._annObject;
                            annPolyRulerObject.set_showGauge(_this.properties["ShowGauge"].values[newValue]);
                        }
                    };
                    this.tensionInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnCurveObject.isInstanceOfType(_this._annObject)) {
                            var curve = _this._annObject;
                            var tenstion = newValue;
                            if (tenstion < 0) {
                                tenstion = 0;
                                alert("set value between 0 and 1");
                            }
                            else if (tenstion > 1) {
                                tenstion = 1;
                                alert("set value between 0 and 1");
                            }
                            curve.tension = tenstion;
                        }
                    };
                    this.horizontalAlignment_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(_this._annObject)) {
                            var annTextObject = _this._annObject;
                            annTextObject.set_horizontalAlignment(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnHorizontalAlignment, _this.properties["HorizontalAlignment"].values[newValue]));
                        }
                    };
                    this.verticalAlignment_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(_this._annObject)) {
                            var annTextObject = _this._annObject;
                            annTextObject.set_verticalAlignment(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnVerticalAlignment, _this.properties["VerticalAlignment"].values[newValue]));
                        }
                    };
                    this.text_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(_this._annObject)) {
                            var annTextObject = _this._annObject;
                            annTextObject.set_text(newValue);
                        }
                    };
                    this.media_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnMediaObject.isInstanceOfType(_this._annObject)) {
                            var annVideoObject = _this._annObject;
                            annVideoObject.set_media(newValue);
                        }
                    };
                    this.encryptKey_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnEncryptObject.isInstanceOfType(_this._annObject)) {
                            var annEncryptObject = _this._annObject;
                            annEncryptObject.set_key(newValue);
                        }
                    };
                    this.encryptor_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnEncryptObject.isInstanceOfType(_this._annObject)) {
                            var annEncryptObject = _this._annObject;
                            annEncryptObject.set_encryptor(_this.properties["Encryptor"].values[newValue]);
                        }
                    };
                    this._annObject = annObject;
                    if (annObject.supportsFill && !(annObject instanceof lt.Annotations.Core.AnnHotspotObject)) {
                        var fill = null;
                        var fillPropertyInfo;
                        if (annObject instanceof lt.Annotations.Core.AnnHiliteObject) {
                            var annHiliteObject = annObject;
                            fill = lt.Annotations.Core.AnnSolidColorBrush.create(annHiliteObject.hiliteColor);
                            fillPropertyInfo = new Annotations.AnnPropertyInfo("Hilite", false, fill, "Hilite", "Hilite the object", "", annObject.supportsFill, AnnSolidColorBrushEditor);
                        }
                        else {
                            if (!annObject.fill)
                                annObject.fill = lt.Annotations.Core.AnnSolidColorBrush.create("Transparent");
                            fill = annObject.fill;
                            fillPropertyInfo = new Annotations.AnnPropertyInfo("Fill", false, fill, "Fill", "Fill the object", "", annObject.supportsFill, AnnSolidColorBrushEditor);
                        }
                        fillPropertyInfo.valueChanged = this.fillPropertyInfo_ValueChanged;
                        this._properties["Fill"] = fillPropertyInfo;
                    }
                    if (annObject.supportsStroke && !(annObject instanceof lt.Annotations.Core.AnnHotspotObject)) {
                        var strokePropertyInfo = new Annotations.AnnPropertyInfo("Stroke", false, annObject.stroke, "Stroke", "Stroke the object", "", annObject.supportsStroke, AnnStrokeEditor);
                        strokePropertyInfo.valueChanged = this.strokePropertyInfo_ValueChanged;
                        this._properties["Stroke"] = strokePropertyInfo;
                    }
                    if (annObject.supportsFont) {
                        this._properties["Font"] = new Annotations.AnnPropertyInfo("", false, annObject.font, "Font", "Select Font", "", annObject.supportsFont, AnnFontEditor);
                    }
                    if (annObject.id !== lt.Annotations.Core.AnnObject.mediaObjectId || annObject.id !== lt.Annotations.Core.AnnObject.audioObjectId) {
                        var hyperlink = new Annotations.AnnPropertyInfo("", false, annObject.get_hyperlink(), "Hyperlink", "Hyperlink", "Hyperlink", true, AnnStringEditor);
                        hyperlink.valueChanged = this.hyperlink_ValueChanged;
                        this._properties["Hyperlink"] = hyperlink;
                    }
                    if (lt.Annotations.Core.AnnCurveObject.isInstanceOfType(annObject)) {
                        var closedCurveObject = annObject;
                        var tensionInfo;
                        if (closedCurveObject != null) {
                            tensionInfo = new Annotations.AnnPropertyInfo("", false, closedCurveObject.get_tension(), "Curve", "Tension", "Tension", true, AnnDoubleEditor);
                        }
                        else {
                            var curveObject = annObject;
                            tensionInfo = new Annotations.AnnPropertyInfo("", false, curveObject.get_tension(), "Curve", "Tension", "Tension", true, AnnDoubleEditor);
                        }
                        tensionInfo.valueChanged = (this.tensionInfo_ValueChanged);
                        this._properties["Tension"] = tensionInfo;
                    }
                    if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(annObject) && this._annObject.id != norbergObjectId) {
                        var annPolyRulerObject = annObject;
                        var showGauge = new Annotations.AnnPropertyInfo("", false, annPolyRulerObject.get_showGauge(), "Ruler", "ShowGauge", "Show Gauge", true, AnnBooleanEditor);
                        showGauge.values["True"] = true;
                        showGauge.values["False"] = false;
                        showGauge.valueChanged = this.showGauge_ValueChanged;
                        this._properties["ShowGauge"] = showGauge;
                        var gaugeLengthInfo = new Annotations.AnnPropertyInfo("GaugeLength", false, annPolyRulerObject.get_gaugeLength(), "Ruler", "GaugeLength", "Gauge Length", true, AnnLengthEditor);
                        this._properties["GaugeLength"] = gaugeLengthInfo;
                        var tickMarksLengthInfo = new Annotations.AnnPropertyInfo("TickMarksLength", false, annPolyRulerObject.get_tickMarksLength(), "Ruler", "TickMarksLength", "TickMarks Length", true, AnnLengthEditor);
                        this._properties["TickMarksLength"] = tickMarksLengthInfo;
                        var measurementUnit = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnUnit, annPolyRulerObject.get_measurementUnit());
                        var measurementUnitInfo = new Annotations.AnnPropertyInfo("", false, measurementUnit, "Ruler", "Measurement Unit", "Measurement Unit", true, AnnStringEditor);
                        measurementUnitInfo.valueChanged = this.measurementUnitInfo_ValueChanged;
                        this.fillEnumValue(measurementUnitInfo, lt.Annotations.Core.AnnUnit);
                        this._properties["MeasurementUnit"] = measurementUnitInfo;
                        var precisionInfo = new Annotations.AnnPropertyInfo("", false, annPolyRulerObject.get_precision(), "Ruler", "Precision", "Precision", true, AnnStringEditor);
                        precisionInfo.values["0"] = 0;
                        precisionInfo.values["1"] = 1;
                        precisionInfo.values["2"] = 2;
                        precisionInfo.values["3"] = 3;
                        precisionInfo.values["4"] = 4;
                        precisionInfo.values["5"] = 5;
                        precisionInfo.values["6"] = 6;
                        precisionInfo.valueChanged = this.precisionInfo_ValueChanged;
                        this._properties["Precision"] = precisionInfo;
                        var showTickMarksInfo = new Annotations.AnnPropertyInfo("", false, annPolyRulerObject.get_showTickMarks(), "Ruler", "ShowTickMarks", "Show Tick Marks", true, AnnBooleanEditor);
                        showTickMarksInfo.values["True"] = true;
                        showTickMarksInfo.values["False"] = false;
                        showTickMarksInfo.valueChanged = this.showTickMarksInfo_ValueChanged;
                        this._properties["ShowTickMarks"] = showTickMarksInfo;
                    }
                    if (lt.Annotations.Core.AnnProtractorObject.isInstanceOfType(annObject)) {
                        var annProtractorObject = annObject;
                        var acuteInfo = new Annotations.AnnPropertyInfo("", false, annProtractorObject.get_acute(), "Protractor", "Acute", "Acute", true, AnnStringEditor);
                        acuteInfo.values["True"] = true;
                        acuteInfo.values["False"] = false;
                        acuteInfo.valueChanged = this.acuteInfo_ValueChanged;
                        this._properties["Acute"] = acuteInfo;
                        var anglePrecisionInfo = new Annotations.AnnPropertyInfo("", false, annProtractorObject.get_anglePrecision(), "Protractor", "Angle Precision", "Precision", true, AnnStringEditor);
                        anglePrecisionInfo.values["0"] = 0;
                        anglePrecisionInfo.values["1"] = 1;
                        anglePrecisionInfo.values["2"] = 2;
                        anglePrecisionInfo.values["3"] = 3;
                        anglePrecisionInfo.values["4"] = 4;
                        anglePrecisionInfo.values["5"] = 5;
                        anglePrecisionInfo.values["6"] = 6;
                        anglePrecisionInfo.valueChanged = this.anglePrecisionInfo_ValueChanged;
                        this._properties["AnglePrecision"] = anglePrecisionInfo;
                        var angulartUnit = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnAngularUnit, annProtractorObject.get_angularUnit());
                        var angularUnitInfo = new Annotations.AnnPropertyInfo("", false, angulartUnit, "Protractor", "AngularUnit", "Angular Unit", true, AnnStringEditor);
                        angularUnitInfo.valueChanged = this.angularUnitInfo_ValueChanged;
                        this.fillEnumValue(angularUnitInfo, lt.Annotations.Core.AnnAngularUnit);
                        this._properties["AngularUnit"] = angularUnitInfo;
                    }
                    if (lt.Annotations.Core.AnnRubberStampObject.isInstanceOfType(annObject)) {
                        var annRubberStampObject = annObject;
                        var rubberStamp = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnRubberStampType, annRubberStampObject.get_rubberStampType());
                        rubberStamp = rubberStamp.replace("Stamp", "");
                        var ruberStampTypeinfo = new Annotations.AnnPropertyInfo("", false, rubberStamp, "RubberStamp", "RuberStampType", "Rubber Stamp Type", true, AnnStringEditor);
                        this.fillEnumValue(ruberStampTypeinfo, lt.Annotations.Core.AnnRubberStampType);
                        ruberStampTypeinfo.valueChanged = this.ruberStampTypeinfo_ValueChanged;
                        this._properties["RuberStampType"] = ruberStampTypeinfo;
                    }
                    if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(annObject)) {
                        var annTextObject = annObject;
                        this._properties["TextBackground"] = new Annotations.AnnPropertyInfo("TextBackground", false, annTextObject.textBackground, "Text", "TextBackground", "Background", true, AnnSolidColorBrushEditor);
                        this._properties["TextForeground"] = new Annotations.AnnPropertyInfo("TextForeground", false, annTextObject.textForeground, "Text", "TextForeground", "Foreground", true, AnnSolidColorBrushEditor);
                        var text = new Annotations.AnnPropertyInfo("", false, annTextObject.get_text(), "Text", "Acute", "Text", true, AnnStringEditor);
                        text.valueChanged = this.text_ValueChanged;
                        this._properties["Text"] = text;
                        var vertical = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnVerticalAlignment, annTextObject.get_verticalAlignment());
                        var verticalAlignment = new Annotations.AnnPropertyInfo("", false, vertical, "Text", "VerticalAlignment", "Vertical Alignment", true, AnnStringEditor);
                        verticalAlignment.valueChanged = this.verticalAlignment_ValueChanged;
                        this.fillEnumValue(verticalAlignment, lt.Annotations.Core.AnnVerticalAlignment);
                        this._properties["VerticalAlignment"] = verticalAlignment;
                        var horizontal = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnHorizontalAlignment, annTextObject.get_horizontalAlignment());
                        var horizontalAlignment = new Annotations.AnnPropertyInfo("", false, horizontal, "Text", "HorizontalAlignment", "Horizontal Alignment", true, AnnStringEditor);
                        horizontalAlignment.valueChanged = this.horizontalAlignment_ValueChanged;
                        this.fillEnumValue(horizontalAlignment, lt.Annotations.Core.AnnHorizontalAlignment);
                        this._properties["HorizontalAlignment"] = horizontalAlignment;
                        var wordWrapInfo = new Annotations.AnnPropertyInfo("", false, annTextObject.get_wordWrap(), "Text", "Word Wrap", "Word Wrap", true, AnnBooleanEditor);
                        wordWrapInfo.values["True"] = true;
                        wordWrapInfo.values["False"] = false;
                        this._properties["WordWrap"] = wordWrapInfo;
                        wordWrapInfo.valueChanged = this.wordWrapInfo_ValueChanged;
                    }
                    if (lt.Annotations.Core.AnnTextRollupObject.isInstanceOfType(annObject)) {
                        var annTextRollupObject = annObject;
                        var expandedInfo = new Annotations.AnnPropertyInfo("", false, annTextRollupObject.get_expanded(), "TextRollup", "Expanded", "Expanded", true, AnnBooleanEditor);
                        expandedInfo.values["True"] = true;
                        expandedInfo.values["False"] = false;
                        expandedInfo.valueChanged = this.expandedInfo_ValueChanged;
                        this._properties["Expanded"] = expandedInfo;
                    }
                    if (lt.Annotations.Core.AnnTextPointerObject.isInstanceOfType(annObject)) {
                        var annTextPointerObject = annObject;
                        var fixedPointerInfo = new Annotations.AnnPropertyInfo("", false, annTextPointerObject.get_fixedPointer(), "TextPointer", "FixedPointer", "Fixed", true, AnnStringEditor);
                        fixedPointerInfo.valueChanged = this.fixedPointerInfo_ValueChanged;
                        fixedPointerInfo.values["True"] = true;
                        fixedPointerInfo.values["False"] = false;
                        this._properties["FixedPointer"] = fixedPointerInfo;
                    }
                    if (lt.Annotations.Core.AnnStampObject.isInstanceOfType(annObject)) {
                        var annStampObject = annObject;
                        var pictureInfo = new Annotations.AnnPropertyInfo("", false, annStampObject.get_picture(), "Picture", "Picture", "Picture", true, AnnPictureEditor);
                        pictureInfo.valueChanged = this.pictureInfo_ValueChanged;
                        this._properties["Picture"] = pictureInfo;
                    }
                    if (lt.Annotations.Core.AnnHotspotObject.isInstanceOfType(annObject)) {
                        var annHotspotObject = annObject;
                        var pictureInfo = new Annotations.AnnPropertyInfo("", false, annHotspotObject.get_picture(), "Picture", "Picture", "Picture", true, AnnPictureEditor);
                        pictureInfo.valueChanged = this.pictureInfo_ValueChanged;
                        this._properties["Picture"] = pictureInfo;
                    }
                    if (lt.Annotations.Core.AnnFreehandHotspotObject.isInstanceOfType(annObject)) {
                        var annFreehandHotspotObject = annObject;
                        var pictureInfo = new Annotations.AnnPropertyInfo("", false, annFreehandHotspotObject.get_picture(), "Picture", "Picture", "Picture", true, AnnPictureEditor);
                        pictureInfo.valueChanged = this.pictureInfo_ValueChanged;
                        this._properties["Picture"] = pictureInfo;
                    }
                    if (lt.Annotations.Core.AnnPointObject.isInstanceOfType(annObject)) {
                        var annPointObject = annObject;
                        var showPictureInfo = new Annotations.AnnPropertyInfo("", false, annPointObject.get_showPicture(), "Point", "ShowPicture", "Show Picture", true, AnnBooleanEditor);
                        showPictureInfo.values["True"] = true;
                        showPictureInfo.values["False"] = false;
                        showPictureInfo.valueChanged = this.showPictureInfo_ValueChanged;
                        this._properties["ShowPicture"] = showPictureInfo;
                    }
                    if (annObject.get_id() == lt.Annotations.Core.AnnObject.mediaObjectId || annObject.get_id() == lt.Annotations.Core.AnnObject.audioObjectId) {
                        var annMediaObject = annObject;
                        var media = new Annotations.AnnPropertyInfo("", false, annMediaObject.get_media(), "Media", "Media", "Source", true, AnnMediaEditor);
                        media.valueChanged = this.media_ValueChanged;
                        this._properties["Media"] = media;
                    }
                    if (annObject.get_id() == lt.Annotations.Core.AnnObject.encryptObjectId) {
                        var annEncryptObject = annObject;
                        if (annEncryptObject != null) {
                            var key = new Annotations.AnnPropertyInfo("", false, annEncryptObject.get_key(), "Encrypt", "", "Key", true, AnnIntegerEditor);
                            key.valueChanged = this.encryptKey_ValueChanged;
                            this._properties["Key"] = key;
                            if (!annEncryptObject.get_isEncrypted()) {
                                var encryptor = new Annotations.AnnPropertyInfo("", false, annEncryptObject.get_encryptor(), "Encrypt", "", "Encryptor", true, AnnBooleanEditor);
                                encryptor.values["True"] = true;
                                encryptor.values["False"] = false;
                                encryptor.valueChanged = this.encryptor_ValueChanged;
                                this._properties["Encryptor"] = encryptor;
                            }
                        }
                    }
                }
                Object.defineProperty(AnnObjectEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnObjectEditor.prototype.RubberStampTypeToString = function (type) {
                    return lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnRubberStampType, type);
                };
                AnnObjectEditor.prototype.fillEnumValue = function (info, type) {
                    for (var entry in type) {
                        var member = entry.substr(0, 1).toUpperCase() + entry.substr(1);
                        if (member == "__typeName")
                            break;
                        member = member.replace("Stamp", "");
                        info.values[member] = member;
                    }
                };
                return AnnObjectEditor;
            }());
            Annotations.AnnObjectEditor = AnnObjectEditor;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            (function (ObjectsAlignment) {
                ObjectsAlignment[ObjectsAlignment["toLeft"] = -1] = "toLeft";
                ObjectsAlignment[ObjectsAlignment["toCenter"] = -2] = "toCenter";
                ObjectsAlignment[ObjectsAlignment["toRight"] = -3] = "toRight";
                ObjectsAlignment[ObjectsAlignment["toTop"] = -4] = "toTop";
                ObjectsAlignment[ObjectsAlignment["toMiddle"] = -5] = "toMiddle";
                ObjectsAlignment[ObjectsAlignment["toBottom"] = -6] = "toBottom";
                ObjectsAlignment[ObjectsAlignment["sameWidth"] = -7] = "sameWidth";
                ObjectsAlignment[ObjectsAlignment["sameHeight"] = -8] = "sameHeight";
                ObjectsAlignment[ObjectsAlignment["sameSize"] = -9] = "sameSize";
            })(Annotations.ObjectsAlignment || (Annotations.ObjectsAlignment = {}));
            var ObjectsAlignment = Annotations.ObjectsAlignment;
            var ObjectsAlignmentDialog = (function () {
                function ObjectsAlignmentDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._automation = null;
                    this._onHideClicked = function () {
                        _this.inner.hide();
                    };
                    this._enableObjectsAlignment_Changed = function (e) {
                        _this._automation.manager.enableObjectsAlignment = _this.el.enabledCheckbox.prop("checked");
                        _this.el.objectAlignments.prop("disabled", !(_this._automation.manager.enableObjectsAlignment && _this._automation.canAlign));
                    };
                    this._objectsAlignmentButtons_Clicked = function (e) {
                        var actionId = parseInt($(e.target).val(), 10);
                        if (_this.onApply)
                            _this.onApply(actionId);
                        _this.inner.hide();
                    };
                    this.el = {
                        enabledCheckbox: root.find(selectors.enabledCheckbox),
                        objectAlignments: root.find(selectors.objectAlignments),
                        hide: root.find(selectors.hide)
                    };
                    this.inner = new lt.Demos.Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHideClicked;
                    this.el.hide.on("click", this._onHideClicked);
                    this.el.enabledCheckbox.on("change", this._enableObjectsAlignment_Changed);
                    this.el.objectAlignments.on("click", this._objectsAlignmentButtons_Clicked);
                }
                Object.defineProperty(ObjectsAlignmentDialog.prototype, "automation", {
                    get: function () { return this._automation; },
                    set: function (value) {
                        if (this._automation != value) {
                            this._automation = value;
                            this._automation.active = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ObjectsAlignmentDialog.prototype.show = function () {
                    this.el.enabledCheckbox.prop("checked", this._automation.manager.enableObjectsAlignment);
                    this.el.objectAlignments.prop("disabled", !(this._automation.manager.enableObjectsAlignment && this._automation.canAlign));
                    this.inner.show();
                };
                return ObjectsAlignmentDialog;
            }());
            Annotations.ObjectsAlignmentDialog = ObjectsAlignmentDialog;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var PasswordDialog = (function () {
                function PasswordDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._password = "";
                    this._onHideClicked = function () {
                        _this.inner.hide();
                    };
                    this._onSubmitClicked = function (e) {
                        _this._password = _this.el.input.val();
                        if (_this._password) {
                            if (_this.onVerify) {
                                var shouldHide = _this.onVerify();
                                if (shouldHide)
                                    _this.inner.hide();
                            }
                            else {
                                _this.inner.hide();
                            }
                        }
                        else {
                            window.alert("Password can't be empty");
                        }
                    };
                    this.el = lt.Demos.Utils.findSelectorsInRoot(root, selectors);
                    this.inner = new lt.Demos.Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHideClicked;
                    this.el.hide.on("click", this._onHideClicked);
                    this.el.submit.on("click", this._onSubmitClicked);
                }
                PasswordDialog.prototype.setLock = function (lock) {
                    this._lock = lock;
                    var lockText = this._lock ? "Lock" : "Unlock";
                    this.el.title.text(lockText);
                    this.el.submit.text(lockText);
                    this.el.input.val("");
                };
                Object.defineProperty(PasswordDialog.prototype, "password", {
                    get: function () {
                        return this._password;
                    },
                    enumerable: true,
                    configurable: true
                });
                PasswordDialog.prototype.show = function () {
                    this.inner.show();
                };
                return PasswordDialog;
            }());
            Annotations.PasswordDialog = PasswordDialog;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var norbergObjectId = -1008;
            var PropertiesPage = (function () {
                function PropertiesPage($propertiesPage) {
                    var _this = this;
                    this._tabs = [];
                    this._tabHolder = null;
                    this._pageHolder = null;
                    this._automation = null;
                    this._dialogUI = {
                        propertiesPage: "#auoDlg_propertiesPage",
                    };
                    this._groups = [];
                    this._currentSelected = null;
                    this._pageElement = $propertiesPage;
                    this._tabHolder = $(document.createElement("ul")).addClass("dlg-tabs dlg-tabs-props");
                    this._pageHolder = $(document.createElement("div")).addClass("dlg-tabview dlg-tabview-props");
                    this._pageElement.append(this._tabHolder).append(this._pageHolder);
                    var tabs = [
                        "Common",
                        "Text",
                        "Curve",
                        "Ruler",
                        "Protractor",
                        "RubberStamp",
                        "TextRollup",
                        "Picture",
                        "Point",
                        "Media",
                        "Encrypt",
                    ];
                    tabs.forEach(function (tabName) {
                        _this._tabs.push(new Tab(tabName));
                    });
                }
                Object.defineProperty(PropertiesPage.prototype, "automation", {
                    get: function () { return this._automation; },
                    set: function (value) {
                        if (this._automation != value) {
                            if (this._automation != null)
                                this._automation.active = false;
                            this._automation = value;
                            this._automation.active = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropertiesPage.prototype, "groupCount", {
                    get: function () { return this._groups.length; },
                    enumerable: true,
                    configurable: true
                });
                PropertiesPage.prototype.initialize = function () {
                    if (!this._automation)
                        return;
                    var editObject = this._automation.currentEditObject;
                    if (!editObject)
                        return;
                    if (editObject.isLocked) {
                        alert('Cannot change properties for a locked object.');
                        return;
                    }
                    this.clear();
                    if (editObject.id == lt.Annotations.Core.AnnObject.selectObjectId) {
                        var selection = this._automation.currentEditObject;
                        for (var i = 0; i < selection.selectedObjects.count; i++) {
                            var object = selection.selectedObjects.item(i);
                            if (object) {
                                var annEditObject = new Annotations.AnnObjectEditor(object);
                                this.recursiveProcessProperties(annEditObject.properties);
                            }
                        }
                    }
                    else {
                        var annEditObject = new Annotations.AnnObjectEditor(editObject);
                        this.recursiveProcessProperties(annEditObject.properties);
                    }
                    this.renderAllProperties();
                };
                PropertiesPage.prototype.recursiveProcessProperties = function (properties) {
                    for (var propertyName in properties) {
                        var property = properties[propertyName];
                        if (property && property.isVisible) {
                            if (property.editor && property.editor.properties && Object.keys(property.editor.properties).length) {
                                this.recursiveProcessProperties(property.editor.properties);
                            }
                            else {
                                var editor = property.editor;
                                var dropdownFields = null;
                                var htmlType = HTMLType.label;
                                if (editor instanceof Annotations.AnnStringEditor && !property.isReadOnly) {
                                    htmlType = HTMLType.input;
                                }
                                else if (editor instanceof Annotations.AnnColorEditor) {
                                    htmlType = HTMLType.dropdown;
                                    dropdownFields = ["Transparent", "Red", "Blue", "Green", "Yellow", "Black", "White"];
                                }
                                else if (editor instanceof Annotations.AnnBooleanEditor) {
                                    htmlType = HTMLType.dropdown;
                                    dropdownFields = ["True", "False"];
                                }
                                else if (editor instanceof Annotations.AnnDoubleEditor) {
                                    htmlType = HTMLType.num;
                                }
                                else if (editor instanceof Annotations.AnnPictureEditor) {
                                    htmlType = HTMLType.picture;
                                }
                                else if (editor instanceof Annotations.AnnIntegerEditor) {
                                    htmlType = HTMLType.integerInput;
                                }
                                else if (editor instanceof Annotations.AnnMediaEditor) {
                                    htmlType = HTMLType.media;
                                }
                                if (htmlType !== HTMLType.dropdown) {
                                    var keys = Object.keys(property.values);
                                    if (keys.length) {
                                        htmlType = HTMLType.dropdown;
                                        dropdownFields = keys;
                                    }
                                }
                                var propertyItem = new PropertyItem(propertyName, htmlType, dropdownFields, editor, property.value, property.displayName);
                                this.addPropertyItemToGroup(propertyItem, property.groupName);
                            }
                        }
                    }
                };
                PropertiesPage.prototype.addPropertyItemToGroup = function (propertyItem, groupName) {
                    var matchingGroup = null;
                    for (var i = 0; i < this._groups.length; i++) {
                        var potentialGroup = this._groups[i];
                        if (potentialGroup.groupName === groupName) {
                            matchingGroup = potentialGroup;
                            break;
                        }
                    }
                    if (!matchingGroup) {
                        matchingGroup = new Group(groupName);
                        this._groups.push(matchingGroup);
                    }
                    var byGroupByPropName = matchingGroup.itemsByPropName[propertyItem.propertyName];
                    if (byGroupByPropName && byGroupByPropName.length)
                        matchingGroup.itemsByPropName[propertyItem.propertyName].push(propertyItem);
                    else
                        matchingGroup.itemsByPropName[propertyItem.propertyName] = [propertyItem];
                };
                PropertiesPage.prototype.renderAllProperties = function () {
                    var _this = this;
                    try {
                        this._currentSelected = null;
                        var commonTab = null;
                        for (var i = 0; i < this._groups.length; i++) {
                            var group = this._groups[i];
                            if (!group)
                                continue;
                            var foundTab = false;
                            for (var j = 0; j < this._tabs.length; j++) {
                                var tab = this._tabs[j];
                                if (tab.tabName === "Common")
                                    commonTab = tab;
                                if (tab.tabName === group.groupName) {
                                    tab.groups.push(group);
                                    foundTab = true;
                                    break;
                                }
                            }
                            if (!foundTab) {
                                commonTab.groups.push(group);
                            }
                        }
                        var totalTabs = 0;
                        this._tabs.forEach(function (tab, index) {
                            if (tab.groups.length) {
                                totalTabs++;
                                var $tab = $(document.createElement("li")).text(tab.tabName);
                                var $page = $(document.createElement("div"));
                                _this._tabHolder.append($tab);
                                _this._pageHolder.append($page);
                                $tab.on("click", function () {
                                    if ($tab.hasClass("selected"))
                                        return;
                                    if (_this._currentSelected) {
                                        _this._currentSelected.removeClass("selected");
                                    }
                                    _this._currentSelected = $tab.add($page);
                                    _this._currentSelected.addClass("selected");
                                });
                                if (index === 0) {
                                    _this._currentSelected = $tab.add($page);
                                    _this._currentSelected.addClass("selected");
                                }
                                tab.groups.forEach(function (group) {
                                    if (group) {
                                        var $collapse = $(document.createElement("div")).addClass("group collapse-container");
                                        var $collapseHeader = $(document.createElement("div")).addClass("collapse-header");
                                        var $collapseHeading = $(document.createElement("h4")).addClass("collapse-header-text").text(group.groupName);
                                        var $collapseIndicator = $(document.createElement("div")).addClass("collapse-indicator").text("+");
                                        $collapseHeader.append($collapseHeading, $collapseIndicator);
                                        var $collapseHeight = $(document.createElement("div")).addClass("collapse-height");
                                        var $collapseTransform = $(document.createElement("div")).addClass("collapse-transform");
                                        $collapseHeight.append($collapseTransform);
                                        $collapse.append($collapseHeader, $collapseHeight);
                                        $collapseHeader.on("click", function () {
                                            $collapse.toggleClass("open");
                                            $collapseIndicator.text($collapse.hasClass("open") ? "-" : "+");
                                        });
                                        var keys = Object.keys(group.itemsByPropName);
                                        if (keys.length) {
                                            for (var m = 0; m < keys.length; m++) {
                                                var sameGroupSamePropName = group.itemsByPropName[keys[m]];
                                                var first = null;
                                                var editors = [];
                                                for (var n = 0; n < sameGroupSamePropName.length; n++) {
                                                    var propertyItem = sameGroupSamePropName[n];
                                                    if (!first)
                                                        first = propertyItem;
                                                    if (propertyItem.editor)
                                                        editors.push(propertyItem.editor);
                                                }
                                                if (first && editors.length)
                                                    $collapseTransform.append(_this.createPropertyItemsHTML(first, editors));
                                            }
                                        }
                                        $page.append($collapse);
                                    }
                                });
                            }
                        });
                        if (totalTabs < 5)
                            this._tabHolder.addClass("dlg-tabs-" + totalTabs);
                        else
                            this._tabHolder.addClass("dlg-tabs-plus");
                    }
                    catch (e) {
                        alert(e);
                    }
                };
                PropertiesPage.prototype.createPropertyItemsHTML = function (item, allEditors) {
                    var $row = $(document.createElement("div"))
                        .addClass("ann-dlg-property");
                    var isSingleElement = false;
                    switch (item.htmlType) {
                        case HTMLType.label:
                        case HTMLType.input:
                        case HTMLType.integerInput:
                        case HTMLType.num:
                        case HTMLType.picture:
                        case HTMLType.dropdown:
                            isSingleElement = true;
                            break;
                        case HTMLType.media:
                            isSingleElement = false;
                            break;
                    }
                    if (isSingleElement) {
                        var $label = $(document.createElement("label")).addClass("input-label")
                            .text(item.displayName)
                            .attr({
                            for: item.htmlId
                        });
                        var $element = null;
                        if (item.htmlType === HTMLType.label) {
                            $element = $(document.createElement("input")).attr({
                                type: "text",
                                value: item.defaultValue
                            });
                        }
                        else if (item.htmlType === HTMLType.input) {
                            $element = $(document.createElement("input"))
                                .attr({
                                type: "text",
                                value: item.defaultValue
                            });
                            $element.on("change", function () {
                                PropertiesPage._update(allEditors, -1, $element.val());
                            });
                        }
                        else if (item.htmlType === HTMLType.integerInput) {
                            $element = $(document.createElement("input"))
                                .attr({
                                type: "number",
                                value: item.defaultValue
                            });
                            $element.on("keypress", function (e) {
                                PropertiesPage.validateNumericKey(e);
                            });
                            $element.on("change", function () {
                                PropertiesPage._update(allEditors, -1, $element.val());
                            });
                        }
                        else if (item.htmlType === HTMLType.num) {
                            $element = $(document.createElement("input"))
                                .attr({
                                type: "text",
                                value: item.defaultValue
                            });
                            $element.on("change", function () {
                                PropertiesPage._update(allEditors, -1, $element.val());
                            });
                        }
                        else if (item.htmlType === HTMLType.picture) {
                            $label.text($label.text() + " URL");
                            var source = "";
                            if (item.defaultValue) {
                                source = item.defaultValue.get_source();
                            }
                            $element = $(document.createElement("input"))
                                .attr({
                                type: "text",
                                value: source
                            });
                            $element.on("change", function () {
                                var val = $element.val();
                                PropertiesPage._update(allEditors, -1, !val ? null : new lt.Annotations.Core.AnnPicture(val));
                            });
                        }
                        else if (item.htmlType === HTMLType.dropdown) {
                            $label = null;
                            $element = $(document.createElement("div")).addClass("dropdown").attr("title", item.displayName);
                            var $select = $(document.createElement("select")).addClass("dropdown-button");
                            var $span = $(document.createElement("span")).addClass("dropdown-indicator");
                            $select.on("change", function () {
                                PropertiesPage._update(allEditors, -1, $select.val());
                            });
                            $element.append($select);
                            $element.append($span);
                            if (item.dropdownFields && item.dropdownFields.length) {
                                $select.append($(document.createElement("option")).val(item.displayName).text(item.displayName).attr("disabled", ""));
                                var defaultValue = item.defaultValue.toString().toLowerCase();
                                item.dropdownFields.forEach(function (value) {
                                    var $option = $(document.createElement("option")).val(value).text(value);
                                    if (defaultValue === value.toLowerCase())
                                        $option.attr("selected", "");
                                    $select.append($option);
                                });
                            }
                        }
                        if ($label)
                            $row.append($label);
                        $element.attr({
                            id: item.htmlId
                        });
                        $element.addClass("ann-dlg-value");
                        $row.append($element);
                    }
                    else if (item.htmlType === HTMLType.media) {
                        var sources = [
                            (item.defaultValue && item.defaultValue.source1) || "",
                            (item.defaultValue && item.defaultValue.source2) || "",
                            (item.defaultValue && item.defaultValue.source3) || ""
                        ];
                        sources.forEach(function (source, index) {
                            var id = item.htmlId + "_" + index;
                            var $label = $(document.createElement("label")).addClass("input-label")
                                .text("URL " + (index + 1))
                                .attr({
                                for: id
                            });
                            var $element = $(document.createElement("input"))
                                .attr({
                                id: id,
                                type: "text",
                                value: source
                            });
                            $element.on("change", function () {
                                var val = $element.val();
                                PropertiesPage._update(allEditors, index + 1, $element.val());
                            });
                            var $container = $(document.createElement("div")).addClass("ann-dlg-property");
                            $container.append($label).append($element);
                            $row.append($container);
                        });
                    }
                    return $row;
                };
                PropertiesPage.validateNumericKey = function (event) {
                    var keyEvent = (event || window.event);
                    var key = keyEvent.keyCode || keyEvent.which;
                    switch (key) {
                        case 8:
                        case 37:
                        case 39:
                        case 46:
                            return;
                    }
                    key = parseFloat(String.fromCharCode(key).toString());
                    var regex = /[0-9]/;
                    if (!regex.test(key.toString())) {
                        if (keyEvent.preventDefault) {
                            keyEvent.preventDefault();
                        }
                    }
                };
                PropertiesPage._update = function (editors, mediaIndex, value) {
                    var didWarnNumber = false;
                    for (var i = 0; i < editors.length; i++) {
                        var editor = editors[i];
                        if (mediaIndex && mediaIndex > 0) {
                            var media = editor.value;
                            switch (mediaIndex) {
                                case 1:
                                    media.source1 = value;
                                    break;
                                case 2:
                                    media.source2 = value;
                                    break;
                                case 3:
                                    media.source3 = value;
                                    break;
                            }
                            value = media;
                        }
                        var change = true;
                        if (editor instanceof Annotations.AnnDoubleEditor && isNaN(value) && !didWarnNumber) {
                            didWarnNumber = true;
                            alert("Insert numeric value");
                            change = false;
                        }
                        if (change) {
                            editor["value"] = value;
                            if (PropertiesPage.onPropertiesChanged != null) {
                                PropertiesPage.onPropertiesChanged(value, editor);
                            }
                        }
                    }
                };
                PropertiesPage.prototype.clear = function () {
                    this._groups = [];
                    this._tabs.forEach(function (tab) {
                        tab.groups = [];
                    });
                    this._tabHolder.empty().removeClass("dlg-tabs-0 dlg-tabs-1 dlg-tabs-2 dlg-tabs-3 dlg-tabs-4 dlg-tabs-5 dlg-tabs-plus");
                    this._pageHolder.empty();
                };
                return PropertiesPage;
            }());
            Annotations.PropertiesPage = PropertiesPage;
            (function (HTMLType) {
                HTMLType[HTMLType["label"] = 0] = "label";
                HTMLType[HTMLType["input"] = 1] = "input";
                HTMLType[HTMLType["dropdown"] = 2] = "dropdown";
                HTMLType[HTMLType["num"] = 3] = "num";
                HTMLType[HTMLType["picture"] = 4] = "picture";
                HTMLType[HTMLType["integerInput"] = 5] = "integerInput";
                HTMLType[HTMLType["media"] = 6] = "media";
            })(Annotations.HTMLType || (Annotations.HTMLType = {}));
            var HTMLType = Annotations.HTMLType;
            var Tab = (function () {
                function Tab(tabName) {
                    this.tabName = tabName;
                    this.groups = [];
                }
                return Tab;
            }());
            var Group = (function () {
                function Group(groupName) {
                    this.groupName = groupName;
                    this.itemsByPropName = [];
                }
                return Group;
            }());
            var PropertyItem = (function () {
                function PropertyItem(propertyName, htmlType, dropdownFields, editor, defaultValue, displayName) {
                    this.propertyName = propertyName;
                    this.displayName = displayName;
                    this.htmlType = htmlType;
                    this.defaultValue = defaultValue;
                    this.dropdownFields = dropdownFields;
                    this.editor = editor;
                    this.htmlId = 'pg1_item_' + PropertyItem._index;
                    PropertyItem._index++;
                }
                PropertyItem._index = 0;
                return PropertyItem;
            }());
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var ReviewsPage = (function () {
                function ReviewsPage($propertiesPage) {
                    var _this = this;
                    this._userName = "";
                    this.date = new Date();
                    this.pageUI = {
                        header: "reviewsHeader",
                        content: "reviewsContnetText",
                        details: "detailsDiv",
                        author: "authorTextInput",
                        day: "dayInput",
                        month: "monthInput",
                        year: "yearInput",
                        status: "statusMenu",
                        checked: "isCheckedBox",
                        comment: "commentTextArea",
                        reply: "replyNode",
                        add: "addNode",
                        deleteBtn: "deleteNode",
                        treeView: "treeViewDiv",
                    };
                    this.empty = function () {
                        _this._pageElement.empty();
                    };
                    this.createUIElement = function () {
                        var htmlText = "";
                        htmlText += "<div class='ann-tree'>";
                        htmlText += "<div class='ann-tree-header'>";
                        htmlText += "<h3 id='" + _this.pageUI.header + "'>By [Author] at [Date]</h3>";
                        htmlText += "<textarea class='ann-tree-textarea' id='" + _this.pageUI.content + "' disabled='disabled'></textarea>";
                        htmlText += "<div class='ann-tree-controls'>";
                        htmlText += "<button id='" + _this.pageUI.reply + "' type='button'>Reply</button>";
                        htmlText += "<button id='" + _this.pageUI.add + "' type='button'>Add</button>";
                        htmlText += "<button id='" + _this.pageUI.deleteBtn + "' type='button'>Delete</button>";
                        htmlText += "</div>";
                        htmlText += "<div class='ann-tree-view' id='" + _this.pageUI.treeView + "'></div>";
                        htmlText += "</div>";
                        htmlText += "<div class='ann-tree-details' id='" + _this.pageUI.details + "'>";
                        htmlText += "<h3>Details</h3>";
                        htmlText += "<input class='ann-tree-details-long' id='" + _this.pageUI.author + "' type='text' placeholder='Author'>";
                        htmlText += "<div class='ann-tree-date'>";
                        htmlText += "<input id='" + _this.pageUI.day + "' type='text' placeholder='Day'>";
                        htmlText += "<input id='" + _this.pageUI.month + "' type='text' placeholder='Month'>";
                        htmlText += "<input id='" + _this.pageUI.year + "' type='text' placeholder='Year'>";
                        htmlText += "</div>";
                        htmlText += "<div class='dropdown ann-tree-details-status' title='Status'>";
                        htmlText += "<select class='dropdown-button' id='" + _this.pageUI.status + "' >";
                        htmlText += "<option value='Status' disabled>Status</option>";
                        htmlText += "<option value='Accepted'>Accepted</option>";
                        htmlText += "<option value='Cancelled'>Cancelled</option>";
                        htmlText += "<option value='Completed'>Completed</option>";
                        htmlText += "<option value='Created'>Created</option>";
                        htmlText += "<option value='Modified'>Modified</option>";
                        htmlText += "<option value='None'>None</option>";
                        htmlText += "<option value='Rejected'>Rejected</option>";
                        htmlText += "<option value='Reply' selected>Reply</option>";
                        htmlText += "</select>";
                        htmlText += "<span class='dropdown-indicator'></span>";
                        htmlText += "</div>";
                        htmlText += "<div>";
                        htmlText += "<label for='" + _this.pageUI.checked + "' class='input-label'>Checked</label>";
                        htmlText += "<input id='" + _this.pageUI.checked + "' type='checkbox' class='custom-check' />";
                        htmlText += "<label class='custom-check' for='" + _this.pageUI.checked + "'></label>";
                        htmlText += "</div>";
                        htmlText += "<textarea class='ann-tree-textarea' id='" + _this.pageUI.comment + "' placeholder='Comment'></textarea>";
                        htmlText += "</div>";
                        htmlText += "</div>";
                        _this._pageElement.html(htmlText);
                    };
                    this.treeView_SelectionChanged = function (ev) {
                        _this.updateUIState();
                        _this.reviewToDetails();
                    };
                    this._pageElement = $propertiesPage;
                }
                Object.defineProperty(ReviewsPage.prototype, "userName", {
                    get: function () { return this._userName; },
                    set: function (value) { this._userName = value; },
                    enumerable: true,
                    configurable: true
                });
                ReviewsPage.prototype.initialize = function () {
                    this.empty();
                    this.createUIElement();
                    this.addUIEventHandler();
                    this.treeView = new Annotations.TreeView("treeViewDiv");
                    this.treeView.onSelectionChanged = this.treeView_SelectionChanged;
                    this.treeView_SelectionChanged(null);
                };
                ReviewsPage.prototype.addUIEventHandler = function () {
                    $("#" + this.pageUI.author).on("change", this.detailsTextBox_TextChanged.bind(this));
                    $("#" + this.pageUI.day).on("change", this.dateTimePicker_ValueChanged.bind(this));
                    $("#" + this.pageUI.month).on("change", this.dateTimePicker_ValueChanged.bind(this));
                    $("#" + this.pageUI.year).on("change", this.dateTimePicker_ValueChanged.bind(this));
                    $("#" + this.pageUI.status).on("change", this.detailsTextBox_TextChanged.bind(this));
                    $("#" + this.pageUI.checked).on("change", this.checkedCheckBox_ValueChanged.bind(this));
                    $("#" + this.pageUI.comment).on("change", this.detailsTextBox_TextChanged.bind(this));
                    $("#" + this.pageUI.reply).on("click", this.replayNode_Click.bind(this));
                    $("#" + this.pageUI.add).on("click", this.addNode_Click.bind(this));
                    $("#" + this.pageUI.deleteBtn).on("click", this.deleteNode_Click.bind(this));
                };
                ReviewsPage.prototype.copyReviewsFrom = function (annObject) {
                    if (annObject == null)
                        throw new Error("annObject cannot be null");
                    this.updateContent(annObject);
                    for (var i = 0; i < annObject.reviews.length; i++) {
                        lt.Demos.Annotations.ReviewsPage.addNode(this.treeView, null, true, annObject.reviews[i]);
                    }
                    this.updateUIState();
                };
                ReviewsPage.prototype.updateContent = function (annObject) {
                    var metadata = annObject.metadata;
                    var author = "";
                    if (metadata[lt.Annotations.Core.AnnObject.authorMetadataKey] != undefined || metadata[lt.Annotations.Core.AnnObject.authorMetadataKey] != null)
                        author = metadata[lt.Annotations.Core.AnnObject.authorMetadataKey];
                    if (!author)
                        author = "[author]";
                    var lastModified = "";
                    if (metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey] != undefined || metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey] != null)
                        lastModified = metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey];
                    if (!lastModified)
                        lastModified = "[date]";
                    $("#" + this.pageUI.header).val("By " + author + " at " + lastModified);
                    var text = "";
                    if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(annObject)) {
                        var textObject = annObject;
                        text = textObject.text;
                    }
                    else {
                        if (metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] != undefined || metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] != null)
                            text = metadata[lt.Annotations.Core.AnnObject.contentMetadataKey];
                    }
                    $("#" + this.pageUI.content).val(text);
                };
                ReviewsPage.prototype.replacesReviewsIn = function (annObject) {
                    if (annObject == null)
                        throw new Error("annObject cannot be null");
                    annObject.reviews.splice(0, annObject.reviews.length);
                    for (var i = 0; i < this.treeView.nodes.length; i++) {
                        lt.Demos.Annotations.ReviewsPage.getNode(this.treeView, this.treeView.nodes[i], annObject, null);
                    }
                };
                ReviewsPage.getNode = function (treeView, node, annObject, parentReview) {
                    var nodeReview = node != null ? node.tag : null;
                    var review = nodeReview != null ? nodeReview.clone() : null;
                    for (var i = 0; i < node.nodes.length; i++) {
                        lt.Demos.Annotations.ReviewsPage.getNode(treeView, node.nodes[i], annObject, review);
                    }
                    if (parentReview != null)
                        parentReview.replies.push(review);
                    else
                        annObject.reviews.push(review);
                };
                ReviewsPage.addNode = function (treeView, relativeNode, sibling, review) {
                    var node = new Annotations.TreeNode(treeView);
                    node.tag = review != null ? review.clone() : null;
                    review = node.tag;
                    for (var i = 0; i < review.replies.length; i++) {
                        lt.Demos.Annotations.ReviewsPage.addNode(treeView, node, true, review.replies[i]);
                    }
                    review.replies.splice(0, review.replies.length);
                    if (sibling) {
                        if (relativeNode != null)
                            relativeNode.addNode(node);
                        else
                            treeView.addNode(node);
                    }
                    else {
                        if (relativeNode != null) {
                            if (relativeNode.parent != null)
                                relativeNode.parent.addNode(node);
                            else
                                treeView.addNode(node);
                        }
                        else {
                            treeView.addNode(node);
                        }
                    }
                    var label = document.createElement("label");
                    label.className = label.className + "treeNodeLabel";
                    label.textContent = this.getReviewNodeText(review);
                    node.content = label;
                    return node;
                };
                ReviewsPage.getReviewNodeText = function (review) {
                    var text = "";
                    if (review == null)
                        return text;
                    var author = review != null ? review.author : "";
                    if (!author)
                        author = "[author]";
                    text += author + ":  ";
                    var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    if (review != null) {
                        text += review.status.toLowerCase() + " " + monthArray[review.date.getMonth()] + " " + review.date.getDate() + " " + review.date.getFullYear();
                        text += "  " + review.comment;
                    }
                    return text;
                };
                ReviewsPage.prototype.updateUIState = function () {
                    var disabled = !this.treeView.selectedNode;
                    $("#" + this.pageUI.reply).prop("disabled", disabled);
                    $("#" + this.pageUI.deleteBtn).prop("disabled", disabled);
                    $("#" + this.pageUI.reply).prop("disabled", disabled);
                    $("#" + this.pageUI.details).prop("disabled", disabled);
                    $("#" + this.pageUI.comment).prop("disabled", disabled);
                };
                ReviewsPage.prototype.replayNode_Click = function () {
                    this.addOrReply(this.treeView.selectedNode, true);
                };
                ReviewsPage.prototype.addNode_Click = function () {
                    this.addOrReply(null, false);
                };
                ReviewsPage.prototype.deleteNode_Click = function () {
                    this.deleteReview(this.treeView.selectedNode);
                };
                ReviewsPage.prototype.deleteReview = function (node) {
                    if (node == null)
                        return;
                    if (node.parent != null) {
                        var parentReview = node.parent.tag;
                        node.parent.deleteNode(node);
                    }
                    else
                        this.treeView.deleteNode(node);
                    this.updateUIState();
                    this.reviewToDetails();
                };
                ReviewsPage.prototype.addOrReply = function (node, isReply) {
                    var review = new lt.Annotations.Core.AnnReview();
                    review.author = this._userName;
                    review.date = this.date;
                    review.status = lt.Annotations.Core.AnnReview.reply;
                    review.comment = "";
                    var newNode = lt.Demos.Annotations.ReviewsPage.addNode(this.treeView, node, isReply, review);
                    this.treeView.selectedNode = newNode;
                    this.updateUIState();
                    this.reviewToDetails();
                };
                ReviewsPage.prototype.detailsTextBox_TextChanged = function () {
                    this.detailsToReview();
                };
                ReviewsPage.prototype.checkedCheckBox_ValueChanged = function () {
                    this.detailsToReview();
                };
                ReviewsPage.prototype.dateTimePicker_ValueChanged = function () {
                    this.detailsToReview();
                };
                ReviewsPage.prototype.reviewToDetails = function () {
                    var node = this.treeView.selectedNode;
                    var review = node != null ? node.tag : null;
                    var disable = !node;
                    $("#" + this.pageUI.details).prop("disabled", disable);
                    $("#" + this.pageUI.author).val(review != null ? review.author : "").prop("disabled", disable);
                    var date = review != null ? review.date : this.date;
                    $("#" + this.pageUI.day).val(date.getDate().toString()).prop("disabled", disable);
                    $("#" + this.pageUI.month).val((date.getMonth() + 1).toString()).prop("disabled", disable);
                    $("#" + this.pageUI.year).val(date.getFullYear().toString()).prop("disabled", disable);
                    var statusSelectMenu = $("#" + this.pageUI.status);
                    statusSelectMenu.prop("disabled", disable);
                    statusSelectMenu.prop("selectedIndex", this.getStatusSelectIndex(!!review ? review.status : "accepted"));
                    $("#" + this.pageUI.checked).prop("disabled", disable);
                    var isCheckedBox = document.getElementById(this.pageUI.checked);
                    if (review != null) {
                        isCheckedBox.checked = review.isChecked;
                    }
                    else {
                        isCheckedBox.checked = false;
                    }
                    $("#" + this.pageUI.comment).val(review != null ? review.comment : "").prop("disabled", disable);
                };
                ReviewsPage.prototype.detailsToReview = function () {
                    var node = this.treeView.selectedNode;
                    if (node == null)
                        return;
                    var review = node.tag;
                    var author = $("#" + this.pageUI.author).val();
                    var year = $("#" + this.pageUI.year).val();
                    if (year < 1900 || isNaN(year)) {
                        alert("Please Enter Valid Value");
                        year = 2014;
                    }
                    var month = $("#" + this.pageUI.month).val();
                    if (month < 1 || month > 12 || isNaN(month)) {
                        alert("Please Enter Valid Value");
                        month = 1;
                    }
                    else {
                        month -= 1;
                    }
                    var day = $("#" + this.pageUI.day).val();
                    if (day < 1 || day > 31 || isNaN(day)) {
                        alert("Please Enter Valid Value");
                        day = 1;
                    }
                    var date = new Date(year, month, day);
                    var status = $("#" + this.pageUI.status).val() == null ? "reply" : $("#" + this.pageUI.status).val().toLowerCase();
                    var isCheckedBox = document.getElementById(this.pageUI.checked);
                    var isChecked = isCheckedBox.checked;
                    var comment = $("#" + this.pageUI.comment).val();
                    if (review != null) {
                        if (review.author != author)
                            review.author = author;
                        if (review.date != date)
                            review.date = date;
                        if (review.status.toLowerCase() != status)
                            review.status = status;
                        if (review.isChecked != isChecked)
                            review.isChecked = isChecked;
                        if (review.comment != comment)
                            review.comment = comment;
                    }
                    var label = document.createElement("label");
                    label.className = label.className + "treeNodeLabel";
                    label.textContent = lt.Demos.Annotations.ReviewsPage.getReviewNodeText(review);
                    node.content = label;
                };
                ReviewsPage.prototype.getStatusSelectIndex = function (value) {
                    switch (value) {
                        case "accepted":
                            return 1;
                        case "cancelled":
                            return 2;
                        case "completed":
                            return 3;
                        case "created":
                            return 4;
                        case "modified":
                            return 5;
                        case "none":
                            return 6;
                        case "rejected":
                            return 7;
                        case "reply":
                            return 8;
                        default:
                            return 8;
                    }
                };
                ReviewsPage.prototype.cleanUp = function () {
                    $(this.pageUI.treeView).empty();
                    $(this.pageUI.treeView).remove();
                };
                return ReviewsPage;
            }());
            Annotations.ReviewsPage = ReviewsPage;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var SnapToGridPropertiesDialog = (function () {
                function SnapToGridPropertiesDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._onHideClicked = function () {
                        if (_this.onHide)
                            _this.onHide();
                        _this.inner.hide();
                    };
                    this._onApplyClicked = function (e) {
                        var opts = _this._snapToGridOptions;
                        opts.showGrid = _this.el.showGridCheckbox.prop("checked");
                        opts.gridStroke.stroke = lt.Annotations.Core.AnnSolidColorBrush.create(_this.el.gridColorSelect.val());
                        if (_this.el.lineStyleSelect.val().toUpperCase() !== "DASH")
                            opts.gridStroke.strokeDashArray = null;
                        else
                            opts.gridStroke.strokeDashArray = [4, 4];
                        opts.gridLength = parseInt(_this.el.gridLength.val(), 10);
                        opts.lineSpacing = parseInt(_this.el.lineSpacing.val(), 10);
                        opts.enableSnap = _this.el.enableSnapCheckbox.prop("checked");
                        _this._automation.manager.snapToGridOptions = opts.clone();
                        if (_this.onHide)
                            _this.onHide();
                        _this.inner.hide();
                    };
                    this.el = lt.Demos.Utils.findSelectorsInRoot(root, selectors);
                    this.inner = new lt.Demos.Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHideClicked;
                    this.el.hide.on("click", this._onHideClicked);
                    this.el.apply.bind("click", this._onApplyClicked);
                }
                Object.defineProperty(SnapToGridPropertiesDialog.prototype, "automation", {
                    get: function () {
                        return this._automation;
                    },
                    set: function (value) {
                        this._automation = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                SnapToGridPropertiesDialog.prototype.show = function () {
                    var opts = this._automation.manager.snapToGridOptions.clone();
                    this._snapToGridOptions = opts;
                    this.el.showGridCheckbox.prop("checked", opts.showGrid);
                    this.el.lineSpacing.val(opts.lineSpacing.toString());
                    this.el.gridLength.val(opts.gridLength.toString());
                    this.el.gridColorSelect.val(this.getSelectedColorFromStroke(opts.gridStroke));
                    this.el.lineStyleSelect.val(this.getLineStyleFromStroke(opts.gridStroke));
                    this.el.enableSnapCheckbox.prop("checked", opts.enableSnap);
                    this.inner.show();
                };
                SnapToGridPropertiesDialog.prototype.getLineStyleFromStroke = function (annStroke) {
                    return !!annStroke.strokeDashArray ? "Dash" : "Solid";
                };
                SnapToGridPropertiesDialog.prototype.getSelectedColorFromStroke = function (annStroke) {
                    var color = annStroke.stroke.color;
                    return color[0].toUpperCase() + color.substring(1).toLowerCase();
                };
                return SnapToGridPropertiesDialog;
            }());
            Annotations.SnapToGridPropertiesDialog = SnapToGridPropertiesDialog;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            (function (AnnCursorType) {
                AnnCursorType[AnnCursorType["selectObject"] = 0] = "selectObject";
                AnnCursorType[AnnCursorType["selectedObject"] = 1] = "selectedObject";
                AnnCursorType[AnnCursorType["controlPoint"] = 2] = "controlPoint";
                AnnCursorType[AnnCursorType["controlPointNWSE"] = 3] = "controlPointNWSE";
                AnnCursorType[AnnCursorType["controlPointNS"] = 4] = "controlPointNS";
                AnnCursorType[AnnCursorType["controlPointNESW"] = 5] = "controlPointNESW";
                AnnCursorType[AnnCursorType["controlPointWE"] = 6] = "controlPointWE";
                AnnCursorType[AnnCursorType["selectRectangle"] = 7] = "selectRectangle";
                AnnCursorType[AnnCursorType["run"] = 8] = "run";
                AnnCursorType[AnnCursorType["rotateCenterControlPoint"] = 9] = "rotateCenterControlPoint";
                AnnCursorType[AnnCursorType["rotateGripperControlPoint"] = 10] = "rotateGripperControlPoint";
                AnnCursorType[AnnCursorType["Default"] = 11] = "Default";
                AnnCursorType[AnnCursorType["count"] = 12] = "count";
            })(Annotations.AnnCursorType || (Annotations.AnnCursorType = {}));
            var AnnCursorType = Annotations.AnnCursorType;
            var AutomationManagerHelper = (function () {
                function AutomationManagerHelper(manager, resourcesPath) {
                    this._resourcesPath = "../Resources";
                    this._drawCursors = {};
                    this._objectsImages = {};
                    if (manager == null)
                        alert("Error, AnnAutomationManager is null");
                    this._manager = manager;
                    if (this._manager.renderingEngine == null) {
                        this._manager.renderingEngine = new lt.Annotations.Rendering.AnnHtml5RenderingEngine();
                    }
                    AutomationManagerHelper._automationCursors[AnnCursorType.controlPoint] = "url('##RESOURCES_PATH##/Cursors/Edit/ControlPoint.cur'),default";
                    AutomationManagerHelper._automationCursors[AnnCursorType.rotateCenterControlPoint] = "url('##RESOURCES_PATH##/Cursors/Edit/Anchor.cur'), default";
                    AutomationManagerHelper._automationCursors[AnnCursorType.rotateGripperControlPoint] = "url('##RESOURCES_PATH##/Cursors/Edit/Rotate.cur'),default";
                    AutomationManagerHelper._automationCursors[AnnCursorType.selectObject] = "url('##RESOURCES_PATH##/Cursors/Edit/SelectObject.cur'), default";
                    AutomationManagerHelper._automationCursors[AnnCursorType.selectedObject] = "url('##RESOURCES_PATH##/Cursors/Edit/SelectedObject.cur'),default";
                    AutomationManagerHelper._automationCursors[AnnCursorType.run] = "pointer";
                    this.updateResourcePaths(resourcesPath);
                    if (lt.LTHelper.supportsMouse) {
                        lt.Controls.InteractiveService.registerGlobalModifierKeys();
                        var callbacks = lt.Annotations.Automation.AnnAutomationManager.platformCallbacks;
                        callbacks.checkModifier = AutomationManagerHelper.checkModifierKey;
                    }
                    this.updateAutomationObjects();
                }
                Object.defineProperty(AutomationManagerHelper.prototype, "automationManager", {
                    get: function () {
                        return this._manager;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationManagerHelper.prototype, "drawCursors", {
                    get: function () {
                        return this._drawCursors;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationManagerHelper.prototype, "automationCursors", {
                    get: function () {
                        return AutomationManagerHelper._automationCursors;
                    },
                    enumerable: true,
                    configurable: true
                });
                AutomationManagerHelper.prototype.updateResourcePaths = function (resourcesPath) {
                    for (var key in AutomationManagerHelper._drawCursorsTemplate) {
                        var originalValue = AutomationManagerHelper._drawCursorsTemplate[key];
                        var thisValue = originalValue.replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                        this._drawCursors[key] = thisValue;
                    }
                    for (var key in AutomationManagerHelper._objectsImagesTemplate) {
                        var originalValue = AutomationManagerHelper._objectsImagesTemplate[key];
                        var thisValue = originalValue.replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                        this._objectsImages[key] = thisValue;
                    }
                    AutomationManagerHelper._automationCursors[AnnCursorType.controlPoint] = AutomationManagerHelper._automationCursors[AnnCursorType.controlPoint].replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                    AutomationManagerHelper._automationCursors[AnnCursorType.rotateCenterControlPoint] = AutomationManagerHelper._automationCursors[AnnCursorType.rotateCenterControlPoint].replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                    AutomationManagerHelper._automationCursors[AnnCursorType.rotateGripperControlPoint] = AutomationManagerHelper._automationCursors[AnnCursorType.rotateGripperControlPoint].replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                    AutomationManagerHelper._automationCursors[AnnCursorType.selectObject] = AutomationManagerHelper._automationCursors[AnnCursorType.selectObject].replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                    AutomationManagerHelper._automationCursors[AnnCursorType.selectedObject] = AutomationManagerHelper._automationCursors[AnnCursorType.selectedObject].replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                    Annotations.ReviewTreeNode.undoImageUrl = AutomationManagerHelper._undoImageUrlTemplate.replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                };
                AutomationManagerHelper.prototype.updateAutomationObjects = function () {
                    if (this._manager == null)
                        return;
                    for (var i = 0; i < this._manager.objects.count; i++) {
                        var automationObject = this._manager.objects.item(i);
                        AutomationManagerHelper.updateAutomationObject(automationObject);
                    }
                };
                AutomationManagerHelper.updateAutomationObject = function (automationObject) {
                    if (automationObject.objectTemplate != null && automationObject.objectTemplate.supportsFill && automationObject.objectTemplate.fill == null)
                        automationObject.objectTemplate.fill = lt.Annotations.Core.AnnSolidColorBrush.create("transparent");
                };
                AutomationManagerHelper.prototype.getAutomationObjectCursor = function (objectId) {
                    if (objectId == lt.Annotations.Core.AnnObject.imageObjectId)
                        return null;
                    if (objectId == lt.Annotations.Core.AnnObject.textHiliteObjectId ||
                        objectId == lt.Annotations.Core.AnnObject.textStrikeoutObjectId ||
                        objectId == lt.Annotations.Core.AnnObject.textUnderlineObjectId ||
                        objectId == lt.Annotations.Core.AnnObject.textRedactionObjectId)
                        return "text";
                    if (objectId == lt.Annotations.Core.AnnObject.stickyNoteObjectId)
                        return "crosshair";
                    var annObject = this._manager.findObjectById(objectId);
                    if (annObject != null) {
                        return this._drawCursors[objectId.toString()];
                    }
                    return null;
                };
                AutomationManagerHelper.prototype.getAutomationObjectImage = function (objectId) {
                    var annObject = this._manager.findObjectById(objectId);
                    if (annObject != null) {
                        return this._objectsImages[objectId.toString()];
                    }
                    return null;
                };
                AutomationManagerHelper.checkModifierKey = function (annKey) {
                    var AnnKeys = lt.Annotations.Core.AnnKeys;
                    var ControlsKeys = lt.Controls.Keys;
                    var ControlsModifierKeys = lt.Controls.InteractiveService.modifierKeys;
                    if ((annKey & AnnKeys.shift) == AnnKeys.shift)
                        return (ControlsModifierKeys & ControlsKeys.shift) === ControlsKeys.shift;
                    if ((annKey & lt.Annotations.Core.AnnKeys.control) == lt.Annotations.Core.AnnKeys.control)
                        return (ControlsModifierKeys & ControlsKeys.control) === ControlsKeys.control;
                    if ((annKey & lt.Annotations.Core.AnnKeys.alt) == lt.Annotations.Core.AnnKeys.alt)
                        return (ControlsModifierKeys & ControlsKeys.alt) === ControlsKeys.alt;
                    return false;
                };
                AutomationManagerHelper.prototype.LoadPackage = function (annPackage) {
                    if (annPackage != null) {
                        var handler = this._manager.objects.collectionChanged.add(function (sender, e) {
                            if (e.action == lt.Annotations.Core.AnnNotifyCollectionChangedAction.add) {
                                for (var i = 0; i < e.newItems.length; i++)
                                    var automationObject = e.newItems[i];
                                AutomationManagerHelper.updateAutomationObject(automationObject);
                            }
                        });
                        this._manager.loadPackage(annPackage, annPackage.get_friendlyName());
                        this._manager.objects.collectionChanged.remove(handler);
                    }
                };
                AutomationManagerHelper._resourcesTamplate = "##RESOURCES_PATH##";
                AutomationManagerHelper._drawCursorsTemplate = {
                    "-2": "url('##RESOURCES_PATH##/Cursors/Draw/ToolLine.cur'),default",
                    "-3": "url('##RESOURCES_PATH##/Cursors/Draw/ToolRectangle.cur'),default",
                    "-4": "url('##RESOURCES_PATH##/Cursors/Draw/ToolEllipse.cur'),default",
                    "-5": "url('##RESOURCES_PATH##/Cursors/Draw/ToolPolyline.cur'),default",
                    "-6": "url('##RESOURCES_PATH##/Cursors/Draw/ToolPolygon.cur'),default",
                    "-7": "url('##RESOURCES_PATH##/Cursors/Draw/ToolCurve.cur'),default",
                    "-8": "url('##RESOURCES_PATH##/Cursors/Draw/ToolClosedCurve.cur'),default",
                    "-9": "url('##RESOURCES_PATH##/Cursors/Draw/ToolPointer.cur'),default",
                    "-10": "url('##RESOURCES_PATH##/Cursors/Draw/ToolFreehand.cur'),default",
                    "-11": "url('##RESOURCES_PATH##/Cursors/Draw/ToolHilite.cur'),default",
                    "-12": "url('##RESOURCES_PATH##/Cursors/Draw/ToolText.cur'),default",
                    "-14": "url('##RESOURCES_PATH##/Cursors/Draw/ToolTextPointer.cur'),default",
                    "-15": "url('##RESOURCES_PATH##/Cursors/Draw/ToolNote.cur'),default",
                    "-16": "url('##RESOURCES_PATH##/Cursors/Draw/ToolStamp.cur'),default",
                    "-17": "url('##RESOURCES_PATH##/Cursors/Draw/ToolRubberStamp.cur'),default",
                    "-18": "url('##RESOURCES_PATH##/Cursors/Draw/ToolHotspot.cur'),default",
                    "-19": "url('##RESOURCES_PATH##/Cursors/Draw/ToolFreehandHotspot.cur'),default",
                    "-21": "url('##RESOURCES_PATH##/Cursors/Draw/ToolPoint.cur'),default",
                    "-22": "url('##RESOURCES_PATH##/Cursors/Draw/ToolRedaction.cur'),default",
                    "-23": "url('##RESOURCES_PATH##/Cursors/Draw/ToolRuler.cur'),default",
                    "-24": "url('##RESOURCES_PATH##/Cursors/Draw/ToolPolyruler.cur'),default",
                    "-25": "url('##RESOURCES_PATH##/Cursors/Draw/ToolProtractor.cur'),default",
                    "-26": "url('##RESOURCES_PATH##/Cursors/Draw/ToolCrossProduct.cur'),default",
                    "-13": "url('##RESOURCES_PATH##/Cursors/Draw/ToolTextRollup.cur'),default",
                    "-28": "url('##RESOURCES_PATH##/Cursors/Draw/ToolAudio.cur'),default",
                    "-30": "url('##RESOURCES_PATH##/Cursors/Draw/ToolVideo.cur'),default",
                    "-27": "url('##RESOURCES_PATH##/Cursors/Draw/ToolEncrypt.cur'),default"
                };
                AutomationManagerHelper._objectsImagesTemplate = {
                    "-2": "##RESOURCES_PATH##/Images/Icons/Line.png",
                    "-3": "##RESOURCES_PATH##/Images/Icons/Rectangle.png",
                    "-4": "##RESOURCES_PATH##/Images/Icons/Circle.png",
                    "-5": "##RESOURCES_PATH##/Images/Icons/Polyline.png",
                    "-6": "##RESOURCES_PATH##/Images/Icons/Polygon.png",
                    "-7": "##RESOURCES_PATH##/Images/Icons/SCurve.png",
                    "-8": "##RESOURCES_PATH##/Images/Icons/BSpline.png",
                    "-9": "##RESOURCES_PATH##/Images/Icons/Pointer.png",
                    "-10": "##RESOURCES_PATH##/Images/Icons/Pen.png",
                    "-11": "##RESOURCES_PATH##/Images/Icons/Highlight.png",
                    "-12": "##RESOURCES_PATH##/Images/Icons/A.png",
                    "-14": "##RESOURCES_PATH##/Images/Icons/AArrow.png",
                    "-15": "##RESOURCES_PATH##/Images/Icons/Note.png",
                    "-16": "##RESOURCES_PATH##/Images/Icons/Image.png",
                    "-17": "##RESOURCES_PATH##/Images/Icons/Stamp.png",
                    "-18": "##RESOURCES_PATH##/Images/Icons/H.png",
                    "-19": "##RESOURCES_PATH##/Images/Icons/HSquiggles.png",
                    "-21": "##RESOURCES_PATH##/Images/Icons/RoundX.png",
                    "-22": "##RESOURCES_PATH##/Images/Icons/Redact.png",
                    "-23": "##RESOURCES_PATH##/Images/Icons/Ruler.png",
                    "-24": "##RESOURCES_PATH##/Images/Icons/90DegreeRuler.png",
                    "-25": "##RESOURCES_PATH##/Images/Icons/Protractor.png",
                    "-26": "##RESOURCES_PATH##/Images/Icons/Intersect.png",
                    "-13": "##RESOURCES_PATH##/Images/Icons/Pin.png",
                    "-28": "##RESOURCES_PATH##/Images/Icons/Sound.png",
                    "-30": "##RESOURCES_PATH##/Images/Icons/Video.png",
                    "-27": "##RESOURCES_PATH##/Images/Icons/Lock.png",
                    "-33": "##RESOURCES_PATH##/Images/Icons/THighlight.png",
                    "-34": "##RESOURCES_PATH##/Images/Icons/Strikethrough.png",
                    "-35": "##RESOURCES_PATH##/Images/Icons/Underline.png",
                    "-36": "##RESOURCES_PATH##/Images/Icons/TRedact.png",
                    "-32": "##RESOURCES_PATH##/Images/Icons/StickyNotes.png",
                };
                AutomationManagerHelper._undoImageUrlTemplate = "url('##RESOURCES_PATH##/Images/Icons/Undo.png')";
                AutomationManagerHelper._automationCursors = {};
                return AutomationManagerHelper;
            }());
            Annotations.AutomationManagerHelper = AutomationManagerHelper;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var AutomationImageViewer = (function (_super) {
                __extends(AutomationImageViewer, _super);
                function AutomationImageViewer(createOptions) {
                    var _this = this;
                    _super.call(this, createOptions);
                    this.handleGotFocus = function () {
                        _this.automationGotFocus.invoke(_this, lt.LeadEventArgs.empty);
                    };
                    this.automationPointerDown = lt.LeadEvent.create(this, "automationPointerDown");
                    this.automationPointerMove = lt.LeadEvent.create(this, "automationPointerMove");
                    this.automationPointerUp = lt.LeadEvent.create(this, "automationPointerUp");
                    this.automationDoubleClick = lt.LeadEvent.create(this, "automationDoubleClick");
                    this.automationEnabledChanged = lt.LeadEvent.create(this, "automationEnabledChanged");
                    this.automationLostFocus = lt.LeadEvent.create(this, "automationLostFocus");
                    this.automationGotFocus = lt.LeadEvent.create(this, "automationGotFocus");
                    this.automationSizeChanged = lt.LeadEvent.create(this, "automationSizeChanged");
                    this.automationTransformChanged = lt.LeadEvent.create(this, "automationTransformChanged");
                    this.automationUseDpiChanged = lt.LeadEvent.create(this, "automationUseDpiChanged");
                    this.automationAntiAlias = false;
                    this.renderingEngine = null;
                    this.automationContainerIndex = -1;
                    this.get_interactiveService().add_tap(this.handleGotFocus);
                }
                AutomationImageViewer.prototype.get_automationObject = function () { return this.automationObject; };
                AutomationImageViewer.prototype.set_automationObject = function (value) { this.automationObject = value; };
                AutomationImageViewer.prototype.add_automationPointerDown = function (value) { this.automationPointerDown.add(value); };
                AutomationImageViewer.prototype.remove_automationPointerDown = function (value) { this.automationPointerDown.remove(value); };
                AutomationImageViewer.prototype.add_automationPointerMove = function (value) { this.automationPointerMove.add(value); };
                AutomationImageViewer.prototype.remove_automationPointerMove = function (value) { this.automationPointerMove.remove(value); };
                AutomationImageViewer.prototype.add_automationPointerUp = function (value) { this.automationPointerUp.add(value); };
                AutomationImageViewer.prototype.remove_automationPointerUp = function (value) { this.automationPointerUp.remove(value); };
                AutomationImageViewer.prototype.add_automationDoubleClick = function (value) { this.automationDoubleClick.add(value); };
                AutomationImageViewer.prototype.remove_automationDoubleClick = function (value) { this.automationDoubleClick.remove(value); };
                AutomationImageViewer.prototype.onAutomationPointerDown = function (args) {
                    if (this.automationPointerDown != null) {
                        this.automationPointerDown.invoke(this, args);
                    }
                };
                AutomationImageViewer.prototype.onAutomationPointerMove = function (args) {
                    if (this.automationPointerMove != null)
                        this.automationPointerMove.invoke(this, args);
                };
                AutomationImageViewer.prototype.onAutomationPointerUp = function (args) {
                    if (this.automationPointerUp != null)
                        this.automationPointerUp.invoke(this, args);
                };
                AutomationImageViewer.prototype.onAutomationDoubleClick = function (args) {
                    if (this.automationDoubleClick != null)
                        this.automationDoubleClick.invoke(this, args);
                };
                AutomationImageViewer.prototype.get_automationDpiX = function () { return 96; };
                AutomationImageViewer.prototype.get_automationDpiY = function () { return 96; };
                AutomationImageViewer.prototype.get_automationEnabled = function () { return true; };
                AutomationImageViewer.prototype.add_automationEnabledChanged = function (value) { this.automationEnabledChanged.add(value); };
                AutomationImageViewer.prototype.remove_automationEnabledChanged = function (value) { this.automationEnabledChanged.remove(value); };
                AutomationImageViewer.prototype.onEnabledChanged = function (e) {
                    if (this.automationEnabledChanged != null)
                        this.automationEnabledChanged.invoke(this, lt.LeadEventArgs.empty);
                };
                AutomationImageViewer.prototype.add_automationLostFocus = function (value) { this.automationLostFocus.add(value); };
                AutomationImageViewer.prototype.remove_automationLostFocus = function (value) { this.automationLostFocus.remove(value); };
                AutomationImageViewer.prototype.add_automationGotFocus = function (value) { this.automationGotFocus.add(value); };
                AutomationImageViewer.prototype.remove_automationGotFocus = function (value) { this.automationGotFocus.remove(value); };
                AutomationImageViewer.prototype.add_automationSizeChanged = function (value) { this.automationSizeChanged.add(value); };
                AutomationImageViewer.prototype.remove_automationSizeChanged = function (value) { this.automationSizeChanged.remove(value); };
                AutomationImageViewer.prototype.onItemChanged = function (e) {
                    switch (e.get_reason()) {
                        case lt.Controls.ImageViewerItemChangedReason.url:
                        case lt.Controls.ImageViewerItemChangedReason.image:
                        case lt.Controls.ImageViewerItemChangedReason.imageChanged:
                        case lt.Controls.ImageViewerItemChangedReason.size:
                        case lt.Controls.ImageViewerItemChangedReason.transform:
                            if (this.isAutomationAttached) {
                                if (this.automationTransformChanged != null)
                                    this.automationTransformChanged.invoke(this, lt.LeadEventArgs.empty);
                                if (this.automationSizeChanged != null)
                                    this.automationSizeChanged.invoke(this, lt.LeadEventArgs.empty);
                            }
                            break;
                        default:
                            break;
                    }
                    _super.prototype.onItemChanged.call(this, e);
                };
                AutomationImageViewer.prototype.get_automationTransform = function () { return this.getImageTransformWithDpi(false); };
                AutomationImageViewer.prototype.add_automationTransformChanged = function (value) { this.automationTransformChanged.add(value); };
                AutomationImageViewer.prototype.remove_automationTransformChanged = function (value) { this.automationTransformChanged.remove(value); };
                AutomationImageViewer.prototype.onTransformChanged = function (e) {
                    _super.prototype.onTransformChanged.call(this, e);
                    if (this.isAutomationAttached() && this.automationTransformChanged != null) {
                        this.automationTransformChanged.invoke(this, lt.LeadEventArgs.empty);
                    }
                };
                AutomationImageViewer.prototype.get_automationUseDpi = function () { return this.useDpi; };
                AutomationImageViewer.prototype.add_automationUseDpiChanged = function (value) { this.automationUseDpiChanged.add(value); };
                AutomationImageViewer.prototype.remove_automationUseDpiChanged = function (value) { this.automationUseDpiChanged.remove(value); };
                AutomationImageViewer.prototype.get_useDpi = function () { return _super.prototype.get_useDpi.call(this); };
                AutomationImageViewer.prototype.set_useDpi = function (value) {
                    if (_super.prototype.get_useDpi.call(this) != value) {
                        _super.prototype.set_useDpi.call(this, value);
                        if (this.automationUseDpiChanged != null)
                            this.automationUseDpiChanged.invoke(this, lt.LeadEventArgs.empty);
                    }
                };
                AutomationImageViewer.prototype.get_automationXResolution = function () { return this.imageResolution.width; };
                AutomationImageViewer.prototype.get_automationYResolution = function () { return this.imageResolution.height; };
                AutomationImageViewer.prototype.automationInvalidate = function (rc) {
                    if (rc.isEmpty) {
                        this.invalidate(lt.LeadRectD.empty);
                    }
                    else {
                        var rect = lt.LeadRectD.create((rc.x + 0.5), (rc.y + 0.5), (rc.width + 0.5), (rc.height + 0.5));
                        this.invalidate(rect);
                    }
                };
                AutomationImageViewer.prototype.get_automationAntiAlias = function () { return this.automationAntiAlias; };
                AutomationImageViewer.prototype.set_automationAntiAlias = function (value) {
                    this.automationAntiAlias = value;
                    this.invalidate(lt.LeadRectD.empty);
                };
                AutomationImageViewer.prototype.get_renderingEngine = function () { return this.renderingEngine; };
                AutomationImageViewer.prototype.set_renderingEngine = function (value) { this.renderingEngine = value; };
                AutomationImageViewer.prototype.onPostRender = function (e) {
                    if (e == null)
                        alert("Error, ImageViewerRenderEventArgs equals null");
                    if (this.isAutomationAttached()) {
                        var engine = this.get_renderingEngine();
                        var context = e.context;
                        var saveSmoothingMode = context["msImageSmoothingEnabled"];
                        try {
                            if (this.get_automationAntiAlias()) {
                                if (!context["msImageSmoothingEnabled"])
                                    context["msImageSmoothingEnabled"] = true;
                            }
                            else {
                                if (context["msImageSmoothingEnabled"])
                                    context["msImageSmoothingEnabled"] = false;
                            }
                            if (this.automationGetContainersCallback != null) {
                                var containers = this.automationGetContainersCallback().toArray();
                                for (var i = 0; i < containers.length; i++) {
                                    lt.Demos.Annotations.AutomationImageViewer.renderContainer(e, engine, containers[i]);
                                }
                            }
                            else {
                                lt.Demos.Annotations.AutomationImageViewer.renderContainer(e, engine, this.container);
                            }
                        }
                        finally {
                            if (context["msImageSmoothingEnabled"] !== saveSmoothingMode)
                                context["msImageSmoothingEnabled"] = saveSmoothingMode;
                        }
                    }
                    _super.prototype.onPostRender.call(this, e);
                };
                AutomationImageViewer.renderContainer = function (e, engine, container) {
                    var context = e.get_context();
                    var clipRectangle = e.get_clipRectangle();
                    try {
                        engine.attach(container, context);
                        var rc = lt.LeadRectD.empty;
                        engine.render(rc, true);
                    }
                    finally {
                        engine.detach();
                    }
                };
                AutomationImageViewer.prototype.get_automationGetContainersCallback = function () { return this.automationGetContainersCallback; };
                AutomationImageViewer.prototype.set_automationGetContainersCallback = function (value) { this.automationGetContainersCallback = value; };
                AutomationImageViewer.prototype.get_automationContainerIndex = function () { return this.automationContainerIndex; };
                AutomationImageViewer.prototype.set_automationContainerIndex = function (value) { this.automationContainerIndex = value; };
                AutomationImageViewer.prototype.automationAttach = function (container) {
                    this.container = container;
                };
                AutomationImageViewer.prototype.automationDetach = function () { this.container = null; };
                AutomationImageViewer.prototype.get_automationContainer = function () { return this.container; };
                AutomationImageViewer.prototype.isAutomationAttached = function () { return this.renderingEngine != null; };
                AutomationImageViewer.prototype.get_automationDataProvider = function () { return this.automationDataProvider; };
                AutomationImageViewer.prototype.set_automationDataProvider = function (value) { this.automationDataProvider = value; };
                AutomationImageViewer.prototype.get_automationScrollOffset = function () {
                    return this.get_scrollOffset();
                };
                return AutomationImageViewer;
            }(lt.Controls.ImageViewer));
            Annotations.AutomationImageViewer = AutomationImageViewer;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var AutomationInteractiveMode = (function (_super) {
                __extends(AutomationInteractiveMode, _super);
                function AutomationInteractiveMode() {
                    var _this = this;
                    _super.call(this);
                    this.automationId = AutomationInteractiveMode.userModeId;
                    this._id = this.automationId;
                    this.interactiveService_DragStarted = function (sender, e) {
                        if (_this.canStartWork(e)) {
                            _this.onWorkStarted(lt.LeadEventArgs.empty);
                            var annArgs = lt.Demos.Annotations.AutomationInteractiveMode.convertPointerEventArgs(e, false);
                            if (!e.isHandled) {
                                _this.workAutomationControl.onAutomationPointerDown(annArgs);
                                e.isHandled = annArgs.isHandled;
                                if (!e.isHandled)
                                    _this.onWorkCompleted(lt.LeadEventArgs.empty);
                            }
                        }
                    };
                    this.interactiveService_DragDelta = function (sender, e) {
                        if (_this.isWorking) {
                            var annArgs = lt.Demos.Annotations.AutomationInteractiveMode.convertPointerEventArgs(e, false);
                            if (!e.isHandled) {
                                if (_this._lastNativeEvent !== e.nativeEvent) {
                                    _this._lastNativeEvent = e.nativeEvent;
                                    _this.workAutomationControl.onAutomationPointerMove(annArgs);
                                }
                                e.isHandled = annArgs.isHandled;
                            }
                        }
                    };
                    this.interactiveService_DragCompleted = function (sender, e) {
                        if (_this.isWorking) {
                            var annArgs = lt.Demos.Annotations.AutomationInteractiveMode.convertPointerEventArgs(e, false);
                            if (!e.isHandled) {
                                _this.workAutomationControl.onAutomationPointerUp(annArgs);
                                e.isHandled = annArgs.isHandled;
                                _this.onWorkCompleted(lt.LeadEventArgs.empty);
                            }
                        }
                    };
                    this.interactiveService_Tap = function (sender, e) {
                        if (!_this.isWorking && _this.canStartWork(e)) {
                            var annArgs = lt.Demos.Annotations.AutomationInteractiveMode.convertPointerEventArgs(e, true);
                            if (!e.isHandled) {
                                _this.workAutomationControl.onAutomationPointerUp(annArgs);
                                e.isHandled = annArgs.isHandled;
                            }
                        }
                    };
                    this.interactiveService_DoubleTap = function (sender, e) {
                        if (_this.canStartWork(e)) {
                            var annArgs = lt.Demos.Annotations.AutomationInteractiveMode.convertPointerEventArgs(e, true);
                            if (!e.isHandled) {
                                _this.onWorkStarted(lt.LeadEventArgs.empty);
                                _this.workAutomationControl.onAutomationDoubleClick(annArgs);
                                e.isHandled = annArgs.isHandled;
                                _this.onWorkCompleted(lt.LeadEventArgs.empty);
                            }
                        }
                    };
                    this.interactiveService_Move = function (sender, e) {
                        if (_this.workAutomationControl == null) {
                            return;
                        }
                        if (_this._lastNativeEvent !== e.nativeEvent) {
                            _this._lastNativeEvent = e.nativeEvent;
                            var annArgs = lt.Demos.Annotations.AutomationInteractiveMode.convertPointerEventArgs(e, false);
                            _this.workAutomationControl.onAutomationPointerMove(annArgs);
                        }
                    };
                    this.mouseButtons = lt.Controls.MouseButtons.left;
                    this.autoItemMode = lt.Controls.ImageViewerAutoItemMode.autoSet;
                    this.itemPart = lt.Controls.ImageViewerItemPart.image;
                    this.workOnBounds = false;
                    this.isDragMouseWheelEnabled = false;
                }
                AutomationInteractiveMode.prototype.get_id = function () { return this._id; };
                AutomationInteractiveMode.prototype.setId = function (value) {
                    this._id = value;
                };
                Object.defineProperty(AutomationInteractiveMode.prototype, "automationControl", {
                    get: function () {
                        return this._automationControl;
                    },
                    set: function (value) {
                        this._automationControl = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationInteractiveMode.prototype, "workAutomationControl", {
                    get: function () {
                        if (this._automationControl != null)
                            return this._automationControl;
                        else
                            return (this.imageViewer);
                    },
                    enumerable: true,
                    configurable: true
                });
                AutomationInteractiveMode.prototype.get_name = function () {
                    return "AutomationInteractiveMode";
                };
                AutomationInteractiveMode.prototype.canStartWork = function (e) {
                    return _super.prototype.canStartWork.call(this, e) && this.workAutomationControl != null;
                };
                AutomationInteractiveMode.prototype.start = function (imageViewer) {
                    _super.prototype.start.call(this, imageViewer);
                    var interactiveService = this.interactiveService;
                    this._dragStartedHandler = interactiveService.dragStarted.add(this.interactiveService_DragStarted);
                    this._dragDeltaHandler = interactiveService.dragDelta.add(this.interactiveService_DragDelta);
                    this._dragCompletedHandler = interactiveService.dragCompleted.add(this.interactiveService_DragCompleted);
                    this._tapHandler = interactiveService.tap.add(this.interactiveService_Tap);
                    this._doubleTapHandler = interactiveService.doubleTap.add(this.interactiveService_DoubleTap);
                    this._moveHandler = interactiveService.move.add(this.interactiveService_Move);
                };
                AutomationInteractiveMode.prototype.stop = function (imageViewer) {
                    if (this.isStarted) {
                        var interactiveService = _super.prototype.get_interactiveService.call(this);
                        interactiveService.dragStarted.remove(this._dragStartedHandler);
                        interactiveService.dragDelta.remove(this._dragDeltaHandler);
                        interactiveService.dragCompleted.remove(this._dragCompletedHandler);
                        interactiveService.tap.remove(this.interactiveService_Tap);
                        interactiveService.doubleTap.remove(this._doubleTapHandler);
                        interactiveService.move.remove(this._moveHandler);
                        _super.prototype.stop.call(this, imageViewer);
                    }
                };
                AutomationInteractiveMode.convertPointerEventArgs = function (e, isDoubleTap) {
                    var point = lt.LeadPointD.create(e.position.x, e.position.y);
                    var mouseButton = lt.Annotations.Core.AnnMouseButton.none;
                    if (!isDoubleTap) {
                        if (e.mouseButton == lt.Controls.MouseButtons.left)
                            mouseButton = lt.Annotations.Core.AnnMouseButton.left;
                        if (e.mouseButton == lt.Controls.MouseButtons.right)
                            mouseButton = lt.Annotations.Core.AnnMouseButton.right;
                    }
                    else {
                        mouseButton = lt.Annotations.Core.AnnMouseButton.left;
                    }
                    var args = lt.Annotations.Core.AnnPointerEventArgs.create(mouseButton, point);
                    args.isHandled = e.isHandled;
                    return args;
                };
                return AutomationInteractiveMode;
            }(lt.Controls.ImageViewerInteractiveMode));
            Annotations.AutomationInteractiveMode = AutomationInteractiveMode;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var DocumentPackDialog = (function () {
                function DocumentPackDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._onHideClicked = function () {
                        _this._objectID = lt.Annotations.Core.AnnObject.selectObjectId;
                        if (_this.onHide) {
                            _this.onHide(_this._objectID);
                        }
                        _this.inner.hide();
                    };
                    this._documentObjectBtns_BtnClicked = function (e) {
                        _this._objectID = parseInt($(e.target).val(), 10);
                        if (_this.onHide) {
                            _this.onHide(_this._objectID);
                        }
                        _this.inner.hide();
                    };
                    this.el = {
                        objects: root.find(selectors.objects),
                        hide: root.find(selectors.hide)
                    };
                    this.inner = new lt.Demos.Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHideClicked;
                    this.el.hide.on("click", this._onHideClicked);
                    root.on("click", this.el.objects, this._documentObjectBtns_BtnClicked);
                }
                Object.defineProperty(DocumentPackDialog.prototype, "objectID", {
                    get: function () {
                        return this._objectID;
                    },
                    enumerable: true,
                    configurable: true
                });
                DocumentPackDialog.prototype.show = function () {
                    this._objectID = lt.Annotations.Core.AnnObject.selectObjectId;
                    this.inner.show();
                };
                return DocumentPackDialog;
            }());
            Annotations.DocumentPackDialog = DocumentPackDialog;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var CanvasDataProvider = (function (_super) {
                __extends(CanvasDataProvider, _super);
                function CanvasDataProvider(acitveCanvas) {
                    _super.call(this);
                    this._acitveCanvas = null;
                    this._orginalImageData = null;
                    this._acitveCanvas = acitveCanvas;
                    var context = this._acitveCanvas.getContext("2d");
                    this._orginalImageData = context.getImageData(0, 0, this._acitveCanvas.width, this._acitveCanvas.height);
                }
                CanvasDataProvider.prototype.applyEncryptDecrypt = function (flags, bounds, key) {
                    var data = this.getImageData(null, lt.LeadRectD.empty);
                    flags |= lt.Annotations.Core.ScrambleImageFlags.intersect;
                    var scrambleImage = new lt.Annotations.Core.ScrambleImage();
                    scrambleImage.set_key(key.toString());
                    scrambleImage.set_flags(flags);
                    scrambleImage.set_rectangle(bounds);
                    scrambleImage.set_imageWidth(this._acitveCanvas.width);
                    scrambleImage.set_imageHeight(this._acitveCanvas.height);
                    scrambleImage.set_imageData(data.data);
                    var imageBounds = lt.LeadRectD.create(0, 0, this._acitveCanvas.width, this._acitveCanvas.height);
                    if (imageBounds.containsRect(bounds)) {
                        scrambleImage.scramble();
                    }
                    this.setImageData(null, lt.LeadRectD.create(0, 0, this._acitveCanvas.width, this._acitveCanvas.height), data);
                };
                CanvasDataProvider.prototype.decrypt = function (container, bounds, key) {
                    this.applyEncryptDecrypt(lt.Annotations.Core.ScrambleImageFlags.decrypt, bounds, key);
                };
                CanvasDataProvider.prototype.encrypt = function (container, bounds, key) {
                    this.applyEncryptDecrypt(lt.Annotations.Core.ScrambleImageFlags.encrypt, bounds, key);
                };
                CanvasDataProvider.prototype.fill = function (container, bounds, color) {
                    var canvas = document.createElement("canvas");
                    var width = bounds.width;
                    var height = bounds.height;
                    canvas.width = width;
                    canvas.height = height;
                    var tmpContext = canvas.getContext("2d");
                    tmpContext.fillStyle = color;
                    tmpContext.fillRect(0, 0, bounds.width, bounds.height);
                    var imageData = tmpContext.getImageData(0, 0, bounds.width, bounds.height);
                    this.setImageData(container, bounds, imageData);
                };
                CanvasDataProvider.prototype.getImageData = function (container, bounds) {
                    var imageCanvas = this._acitveCanvas;
                    var imageData;
                    var context = imageCanvas.getContext('2d');
                    if (bounds.get_isEmpty()) {
                        imageData = context.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
                    }
                    else {
                        imageData = context.getImageData(bounds.x, bounds.y, bounds.width, bounds.height);
                    }
                    return imageData;
                };
                CanvasDataProvider.prototype.setImageData = function (container, bounds, data) {
                    if (bounds.isEmpty || data == null)
                        return;
                    var imageCanvas = this._acitveCanvas;
                    var context = imageCanvas.getContext("2d");
                    context.putImageData(data, bounds.x, bounds.y);
                };
                return CanvasDataProvider;
            }(lt.Annotations.Core.AnnDataProvider));
            Annotations.CanvasDataProvider = CanvasDataProvider;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            (function (AutomationControlMultiContainerMode) {
                AutomationControlMultiContainerMode[AutomationControlMultiContainerMode["SinglePage"] = 0] = "SinglePage";
                AutomationControlMultiContainerMode[AutomationControlMultiContainerMode["MultiPage"] = 1] = "MultiPage";
            })(Annotations.AutomationControlMultiContainerMode || (Annotations.AutomationControlMultiContainerMode = {}));
            var AutomationControlMultiContainerMode = Annotations.AutomationControlMultiContainerMode;
            var ImageViewerAutomationControl = (function () {
                function ImageViewerAutomationControl() {
                    var _this = this;
                    this._multiContainerMode = AutomationControlMultiContainerMode.SinglePage;
                    this.handleGotFocus = function () {
                        _this.automationGotFocus.invoke(_this, lt.LeadEventArgs.empty);
                    };
                    this.automationPointerDown = lt.LeadEvent.create(this, "automationPointerDown");
                    this.automationPointerMove = lt.LeadEvent.create(this, "automationPointerMove");
                    this.automationPointerUp = lt.LeadEvent.create(this, "automationPointerUp");
                    this.automationDoubleClick = lt.LeadEvent.create(this, "automationDoubleClick");
                    this.automationEnabledChanged = lt.LeadEvent.create(this, "automationEnabledChanged");
                    this.automationLostFocus = lt.LeadEvent.create(this, "automationLostFocus");
                    this.automationGotFocus = lt.LeadEvent.create(this, "automationGotFocus");
                    this.automationSizeChanged = lt.LeadEvent.create(this, "automationSizeChanged");
                    this.imageViewer_ItemChanged = function (sender, e) {
                        switch (e.get_reason()) {
                            case lt.Controls.ImageViewerItemChangedReason.url:
                            case lt.Controls.ImageViewerItemChangedReason.image:
                            case lt.Controls.ImageViewerItemChangedReason.imageChanged:
                            case lt.Controls.ImageViewerItemChangedReason.size:
                            case lt.Controls.ImageViewerItemChangedReason.transform:
                                if (_this.automationTransformChanged != null)
                                    _this.automationTransformChanged.invoke(_this, lt.LeadEventArgs.empty);
                                if (_this.automationSizeChanged != null)
                                    _this.automationSizeChanged.invoke(_this, lt.LeadEventArgs.empty);
                                break;
                            default:
                                break;
                        }
                    };
                    this.imageViewer_ActiveItemChanged = function (sender, e) {
                        _this.syncActiveItemContainer(true);
                    };
                    this.automationObject_ActiveContainerChanged = function (sender, e) {
                        _this.syncActiveItemContainer(false);
                    };
                    this.automationTransformChanged = lt.LeadEvent.create(this, "automationTransformChanged");
                    this.imageViewer_TransformChanged = function (sender, e) {
                        if (_this.automationTransformChanged != null)
                            _this.automationTransformChanged.invoke(_this, lt.LeadEventArgs.empty);
                    };
                    this.automationUseDpiChanged = lt.LeadEvent.create(this, "automationUseDpiChanged");
                    this.imageViewer_PropertyChanged = function (sender, e) {
                        switch (e.propertyName) {
                            case "UseDpi":
                                if (_this.automationUseDpiChanged != null)
                                    _this.automationUseDpiChanged.invoke(_this, lt.LeadEventArgs.empty);
                                break;
                            default:
                                break;
                        }
                    };
                    this.automationAntiAlias = false;
                    this.renderingEngine = null;
                    this.imageViewer_PostRender = function (sender, e) {
                        var renderingEngine = _this.renderingEngine;
                        if (renderingEngine == null)
                            return;
                        var runMode = false;
                        if (_this.automationObject != null && _this.automationObject.manager != null)
                            runMode = (_this.automationObject.manager.userMode == lt.Annotations.Core.AnnUserMode.run);
                        var context = e.get_context();
                        var saveSmoothingMode = context["msImageSmoothingEnabled"];
                        try {
                            if (_this.get_automationAntiAlias()) {
                                if (!context["msImageSmoothingEnabled"])
                                    context["msImageSmoothingEnabled"] = true;
                            }
                            else {
                                if (context["msImageSmoothingEnabled"])
                                    context["msImageSmoothingEnabled"] = false;
                            }
                            var container;
                            if (_this.automationGetContainersCallback != null) {
                                var containers = _this.automationGetContainersCallback().toArray();
                                if (containers != null) {
                                    switch (_this._multiContainerMode) {
                                        case AutomationControlMultiContainerMode.MultiPage:
                                            for (var index = 0; index < containers.length; index++) {
                                                if (index < _this._imageViewer.get_items().get_count()) {
                                                    var container = containers[index];
                                                    var item = _this._imageViewer.get_items().get_item(index);
                                                    var containerBounds = _this.automationObject.getContainerInvalidRect(container, true);
                                                    var intersects = !containerBounds.get_isEmpty();
                                                    if (intersects || !_this._imageViewer.getItemViewBounds(item, lt.Controls.ImageViewerItemPart.item, true).isEmpty)
                                                        lt.Demos.Annotations.ImageViewerAutomationControl.renderContainer(e, renderingEngine, container, runMode);
                                                }
                                            }
                                            break;
                                        case AutomationControlMultiContainerMode.SinglePage:
                                        default:
                                            if (_this._imageViewer.activeItem != null &&
                                                !_this._imageViewer.getItemViewBounds(_this._imageViewer.activeItem, lt.Controls.ImageViewerItemPart.item, true).isEmpty) {
                                                for (var index = 0; index < containers.length; index++) {
                                                    var container = containers[index];
                                                    var containerBounds = _this.automationObject.getContainerInvalidRect(container, true);
                                                    var intersects = !containerBounds.get_isEmpty();
                                                    if (intersects)
                                                        lt.Demos.Annotations.ImageViewerAutomationControl.renderContainer(e, renderingEngine, container, runMode);
                                                }
                                            }
                                            break;
                                    }
                                }
                            }
                            else {
                                container = _this._container;
                                if (container != null)
                                    lt.Demos.Annotations.ImageViewerAutomationControl.renderContainer(e, renderingEngine, container, runMode);
                            }
                        }
                        finally {
                            if (context["msImageSmoothingEnabled"] !== saveSmoothingMode)
                                context["msImageSmoothingEnabled"] = saveSmoothingMode;
                        }
                    };
                    this.automationContainerIndex = -1;
                    this.automationDataProvider = new lt.Annotations.Core.AnnDataProvider();
                }
                Object.defineProperty(ImageViewerAutomationControl.prototype, "multiContainerMode", {
                    get: function () { return this._multiContainerMode; },
                    set: function (value) { this._multiContainerMode = value; },
                    enumerable: true,
                    configurable: true
                });
                ImageViewerAutomationControl.prototype.dispose = function () { this.unHook(); };
                Object.defineProperty(ImageViewerAutomationControl.prototype, "imageViewer", {
                    get: function () { return this._imageViewer; },
                    set: function (value) {
                        if (this._imageViewer != value) {
                            this.unHook();
                            this._imageViewer = value;
                            this.hook();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ImageViewerAutomationControl.prototype.hook = function () {
                    if (this._imageViewer == null)
                        return;
                    this._imageViewer.add_propertyChanged(this.imageViewer_PropertyChanged);
                    this._imageViewer.add_itemChanged(this.imageViewer_ItemChanged);
                    this._imageViewer.add_activeItemChanged(this.imageViewer_ActiveItemChanged);
                    this._imageViewer.add_transformChanged(this.imageViewer_TransformChanged);
                    this._imageViewer.add_postRender(this.imageViewer_PostRender);
                    this._imageViewer.get_interactiveService().add_tap(this.handleGotFocus);
                };
                ImageViewerAutomationControl.prototype.unHook = function () {
                    if (this._imageViewer == null)
                        return;
                    this._imageViewer.remove_propertyChanged(this.imageViewer_PropertyChanged);
                    this._imageViewer.remove_itemChanged(this.imageViewer_ItemChanged);
                    this._imageViewer.remove_activeItemChanged(this.imageViewer_ActiveItemChanged);
                    this._imageViewer.remove_transformChanged(this.imageViewer_TransformChanged);
                    this._imageViewer.remove_postRender(this.imageViewer_PostRender);
                    this._imageViewer.get_interactiveService().remove_tap(this.handleGotFocus);
                    if (this.automationObject != null)
                        this.automationObject.remove_activeContainerChanged(this.automationObject_ActiveContainerChanged);
                };
                ImageViewerAutomationControl.prototype.get_automationObject = function () { return this.automationObject; };
                ImageViewerAutomationControl.prototype.set_automationObject = function (value) {
                    this.automationObject = value;
                    if (this.automationObject != null)
                        this.automationObject.remove_activeContainerChanged(this.automationObject_ActiveContainerChanged);
                    this.automationObject = value;
                    if (this.automationObject != null)
                        this.automationObject.add_activeContainerChanged(this.automationObject_ActiveContainerChanged);
                };
                ImageViewerAutomationControl.prototype.add_automationPointerDown = function (value) { this.automationPointerDown.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationPointerDown = function (value) { this.automationPointerDown.remove(value); };
                ImageViewerAutomationControl.prototype.add_automationPointerMove = function (value) { this.automationPointerMove.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationPointerMove = function (value) { this.automationPointerMove.remove(value); };
                ImageViewerAutomationControl.prototype.add_automationPointerUp = function (value) { this.automationPointerUp.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationPointerUp = function (value) { this.automationPointerUp.remove(value); };
                ImageViewerAutomationControl.prototype.add_automationDoubleClick = function (value) { this.automationDoubleClick.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationDoubleClick = function (value) { this.automationDoubleClick.remove(value); };
                ImageViewerAutomationControl.prototype.onAutomationPointerDown = function (args) {
                    if (this.automationPointerDown != null) {
                        this.automationPointerDown.invoke(this, args);
                    }
                };
                ImageViewerAutomationControl.prototype.onAutomationPointerMove = function (args) {
                    if (this.automationPointerMove != null)
                        this.automationPointerMove.invoke(this, args);
                };
                ImageViewerAutomationControl.prototype.onAutomationPointerUp = function (args) {
                    if (this.automationPointerUp != null)
                        this.automationPointerUp.invoke(this, args);
                };
                ImageViewerAutomationControl.prototype.onAutomationDoubleClick = function (args) {
                    if (this.automationDoubleClick != null)
                        this.automationDoubleClick.invoke(this, args);
                };
                ImageViewerAutomationControl.prototype.get_automationDpiX = function () { return this._imageViewer != null ? this._imageViewer.get_screenDpi().get_width() : 96; };
                ImageViewerAutomationControl.prototype.get_automationDpiY = function () { return this._imageViewer != null ? this._imageViewer.get_screenDpi().get_height() : 96; };
                ImageViewerAutomationControl.prototype.get_automationEnabled = function () { return true; };
                ImageViewerAutomationControl.prototype.add_automationEnabledChanged = function (value) { this.automationEnabledChanged.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationEnabledChanged = function (value) { this.automationEnabledChanged.remove(value); };
                ImageViewerAutomationControl.prototype.onEnabledChanged = function (e) {
                    if (this.automationEnabledChanged != null)
                        this.automationEnabledChanged.invoke(this, lt.LeadEventArgs.empty);
                };
                ImageViewerAutomationControl.prototype.add_automationLostFocus = function (value) { this.automationLostFocus.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationLostFocus = function (value) { this.automationLostFocus.remove(value); };
                ImageViewerAutomationControl.prototype.add_automationGotFocus = function (value) { this.automationGotFocus.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationGotFocus = function (value) { this.automationGotFocus.remove(value); };
                ImageViewerAutomationControl.prototype.add_automationSizeChanged = function (value) { this.automationSizeChanged.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationSizeChanged = function (value) { this.automationSizeChanged.remove(value); };
                ImageViewerAutomationControl.prototype.syncActiveItemContainer = function (fromViewer) {
                    if (this.automationObject == null || this._imageViewer == null)
                        return;
                    var itemsCount = this._imageViewer.get_items().get_count();
                    var containersCount = this.automationObject.get_containers().get_count();
                    if (itemsCount == 0 || itemsCount != containersCount)
                        return;
                    var imageViewerIndex = this._imageViewer.get_items().indexOf(this._imageViewer.get_activeItem());
                    var containerIndex = -1;
                    if (this.automationObject.get_activeContainer() != null)
                        containerIndex = this.automationObject.get_containers().indexOf(this.automationObject.get_activeContainer());
                    if (imageViewerIndex != containerIndex) {
                        if (fromViewer) {
                            if (imageViewerIndex != -1)
                                this.automationObject.set_activeContainer(this.automationObject.get_containers().get_item(imageViewerIndex));
                        }
                        else {
                            if (containerIndex != -1)
                                this._imageViewer.set_activeItem(this._imageViewer.get_items().get_item(containerIndex));
                        }
                    }
                };
                ImageViewerAutomationControl.prototype.getItemForCurrentContainer = function () {
                    if (this._imageViewer == null)
                        return null;
                    if (this.automationContainerIndex != -1) {
                        switch (this._multiContainerMode) {
                            case AutomationControlMultiContainerMode.MultiPage:
                                if (this.automationContainerIndex >= 0 && this.automationContainerIndex < this._imageViewer.get_items().get_count())
                                    return this._imageViewer.get_items().get_item(this.automationContainerIndex);
                                return null;
                            case AutomationControlMultiContainerMode.SinglePage:
                            default:
                                return this._imageViewer.activeItem;
                        }
                    }
                    else {
                        return this._imageViewer.activeItem;
                    }
                };
                ImageViewerAutomationControl.prototype.getCurrentContainer = function () {
                    if (this.automationObject != null && this.automationContainerIndex != -1)
                        return this.automationObject.get_containers().get_item(this.automationContainerIndex);
                    return null;
                };
                ImageViewerAutomationControl.prototype.get_automationTransform = function () {
                    var item = this.getItemForCurrentContainer();
                    var container = this.getCurrentContainer();
                    if (item != null) {
                        return this._imageViewer.getItemImageTransformWithDpi(item, false);
                    }
                    else
                        return lt.LeadMatrix.identity;
                };
                ImageViewerAutomationControl.prototype.add_automationTransformChanged = function (value) { this.automationTransformChanged.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationTransformChanged = function (value) { this.automationTransformChanged.remove(value); };
                ImageViewerAutomationControl.prototype.get_automationUseDpi = function () { return this._imageViewer != null && this._imageViewer.get_useDpi(); };
                ImageViewerAutomationControl.prototype.add_automationUseDpiChanged = function (value) { this.automationUseDpiChanged.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationUseDpiChanged = function (value) { this.automationUseDpiChanged.remove(value); };
                ImageViewerAutomationControl.prototype.get_automationXResolution = function () {
                    var item = this.getItemForCurrentContainer();
                    if (item != null)
                        return item.get_resolution().get_width();
                    else
                        return 96.0;
                };
                ImageViewerAutomationControl.prototype.get_automationYResolution = function () {
                    var item = this.getItemForCurrentContainer();
                    if (item != null)
                        return item.get_resolution().get_height();
                    else
                        return 96.0;
                };
                ImageViewerAutomationControl.prototype.automationInvalidate = function (rc) {
                    if (this._imageViewer != null) {
                        this._imageViewer.invalidate(rc);
                    }
                };
                ImageViewerAutomationControl.prototype.get_automationAntiAlias = function () { return this.automationAntiAlias; };
                ImageViewerAutomationControl.prototype.set_automationAntiAlias = function (value) {
                    this.automationAntiAlias = value;
                    if (this._imageViewer) {
                        this._imageViewer.invalidate(lt.LeadRectD.empty);
                    }
                };
                ImageViewerAutomationControl.prototype.get_renderingEngine = function () { return this.renderingEngine; };
                ImageViewerAutomationControl.prototype.set_renderingEngine = function (value) { this.renderingEngine = value; };
                ImageViewerAutomationControl.renderContainer = function (e, renderingEngine, container, runMode) {
                    var context = e.get_context();
                    var clipRectangle = e.get_clipRectangle();
                    renderingEngine.attach(container, context);
                    try {
                        var annClipRect = container.mapper.rectToContainerCoordinates(clipRectangle);
                        renderingEngine.render(annClipRect, runMode);
                    }
                    finally {
                        renderingEngine.detach();
                    }
                };
                ImageViewerAutomationControl.prototype.get_automationGetContainersCallback = function () { return this.automationGetContainersCallback; };
                ImageViewerAutomationControl.prototype.set_automationGetContainersCallback = function (value) { this.automationGetContainersCallback = value; };
                ImageViewerAutomationControl.prototype.get_automationContainerIndex = function () { return this.automationContainerIndex; };
                ImageViewerAutomationControl.prototype.set_automationContainerIndex = function (value) { this.automationContainerIndex = value; };
                ImageViewerAutomationControl.prototype.automationAttach = function (container) { this._container = container; };
                ImageViewerAutomationControl.prototype.automationDetach = function () { this._container = null; };
                ImageViewerAutomationControl.prototype.get_automationDataProvider = function () { return this.automationDataProvider; };
                ImageViewerAutomationControl.prototype.set_automationDataProvider = function (value) { this.automationDataProvider = value; };
                ImageViewerAutomationControl.prototype.get_automationScrollOffset = function () {
                    return this._imageViewer != null ? this._imageViewer.get_scrollOffset() : lt.LeadPointD.create(0, 0);
                };
                return ImageViewerAutomationControl;
            }());
            Annotations.ImageViewerAutomationControl = ImageViewerAutomationControl;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var MedicalPackDialog = (function () {
                function MedicalPackDialog(root, selectors) {
                    var _this = this;
                    this.inner = null;
                    this.el = null;
                    this._onHideClicked = function () {
                        _this._objectID = lt.Annotations.Core.AnnObject.selectObjectId;
                        if (_this.onHide) {
                            _this.onHide(_this._objectID);
                        }
                        _this.inner.hide();
                    };
                    this._medicalObjectBtns_BtnClicked = function (e) {
                        _this._objectID = parseInt($(e.target).val(), 10);
                        if (_this.onHide) {
                            _this.onHide(_this._objectID);
                        }
                        _this.inner.hide();
                    };
                    this.el = {
                        objects: root.find(selectors.objects),
                        hide: root.find(selectors.hide)
                    };
                    this.inner = new lt.Demos.Dialogs.InnerDialog(root);
                    this.inner.onRootClick = this._onHideClicked;
                    this.el.hide.on("click", this._onHideClicked);
                    root.on("click", this.el.objects, this._medicalObjectBtns_BtnClicked);
                }
                Object.defineProperty(MedicalPackDialog.prototype, "objectID", {
                    get: function () {
                        return this._objectID;
                    },
                    enumerable: true,
                    configurable: true
                });
                MedicalPackDialog.prototype.show = function () {
                    this._objectID = lt.Annotations.Core.AnnObject.selectObjectId;
                    this.inner.show();
                };
                return MedicalPackDialog;
            }());
            Annotations.MedicalPackDialog = MedicalPackDialog;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Annotations;
        (function (Annotations) {
            var RightClickInteractiveMode = (function (_super) {
                __extends(RightClickInteractiveMode, _super);
                function RightClickInteractiveMode() {
                    var _this = this;
                    _super.call(this);
                    this._automation = null;
                    this.RightClickInteractiveMode_ServiceTap = function (sender, e) {
                        if (_this._automation == null)
                            return;
                        if (!_this.canStartWork(e)) {
                            return;
                        }
                        if (_this._automation.manager.userMode === lt.Annotations.Core.AnnUserMode.run) {
                            return;
                        }
                        _this.onWorkStarted(lt.LeadEventArgs.empty);
                        _this.onWorkCompleted(lt.LeadEventArgs.empty);
                        var automation = _this._automation;
                        var currentDesigner = automation.currentDesigner;
                        if (currentDesigner != null && (currentDesigner instanceof lt.Annotations.Designers.AnnDrawDesigner)) {
                            var drawingObject = currentDesigner.targetObject;
                            currentDesigner.end();
                            if (drawingObject != null) {
                                automation.selectObject(drawingObject);
                            }
                            return;
                        }
                        if (_this.onRightClick != null) {
                            _this.onRightClick(e.position.x, e.position.y);
                        }
                    };
                }
                Object.defineProperty(RightClickInteractiveMode.prototype, "automation", {
                    get: function () { return this._automation; },
                    set: function (value) {
                        if (this._automation != value) {
                            if (this._automation != null)
                                this._automation.active = false;
                            this._automation = value;
                            this._automation.active = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                RightClickInteractiveMode.prototype.toString = function () {
                    return "RightClick";
                };
                RightClickInteractiveMode.prototype.start = function (viewer) {
                    this.workOnBounds = false;
                    _super.prototype.start.call(this, viewer);
                    var service = _super.prototype.get_interactiveService.call(this);
                    service.tap.add(this.RightClickInteractiveMode_ServiceTap);
                };
                RightClickInteractiveMode.prototype.stop = function (viewer) {
                    if (this.isStarted) {
                        var service = _super.prototype.get_interactiveService.call(this);
                        service.tap.remove(this.RightClickInteractiveMode_ServiceTap);
                        _super.prototype.stop.call(this, viewer);
                    }
                };
                return RightClickInteractiveMode;
            }(lt.Controls.ImageViewerInteractiveMode));
            Annotations.RightClickInteractiveMode = RightClickInteractiveMode;
        })(Annotations = Demos.Annotations || (Demos.Annotations = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lt;
(function (lt) {
    var Demos;
    (function (Demos) {
        var Basic;
        (function (Basic) {
            var AnnotationsDemo;
            (function (AnnotationsDemo) {
                var AnnTriangleDrawDesigner = (function (_super) {
                    __extends(AnnTriangleDrawDesigner, _super);
                    function AnnTriangleDrawDesigner(automationControl, container, annTriangleObject) {
                        _super.call(this, automationControl, container, annTriangleObject);
                    }
                    AnnTriangleDrawDesigner.prototype.onPointerDown = function (sender, e) {
                        var handled = _super.prototype.onPointerDown.call(this, sender, e);
                        if (this.targetObject.points.count < 3) {
                            this.targetObject.tag = "drawing";
                            if (e.button === lt.Annotations.Core.AnnMouseButton.left) {
                                this.targetObject.points.add(this.snapPointToGrid(e.location, false));
                                this.startWorking();
                                handled = true;
                            }
                        }
                        this.invalidate(lt.LeadRectD.empty);
                        return handled;
                    };
                    AnnTriangleDrawDesigner.prototype.onPointerUp = function (sender, e) {
                        var handled = _super.prototype.onPointerUp.call(this, sender, e);
                        handled = true;
                        if (this.targetObject.points.count >= 3) {
                            this.targetObject.tag = null;
                            this.endWorking();
                        }
                        return handled;
                    };
                    return AnnTriangleDrawDesigner;
                }(lt.Annotations.Designers.AnnDrawDesigner));
                AnnotationsDemo.AnnTriangleDrawDesigner = AnnTriangleDrawDesigner;
                var AnnTriangleEditDesigner = (function (_super) {
                    __extends(AnnTriangleEditDesigner, _super);
                    function AnnTriangleEditDesigner(automationControl, container, annTriangleObject) {
                        _super.call(this, automationControl, container, annTriangleObject);
                    }
                    return AnnTriangleEditDesigner;
                }(lt.Annotations.Designers.AnnPolylineEditDesigner));
                AnnotationsDemo.AnnTriangleEditDesigner = AnnTriangleEditDesigner;
            })(AnnotationsDemo = Basic.AnnotationsDemo || (Basic.AnnotationsDemo = {}));
        })(Basic = Demos.Basic || (Demos.Basic = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));

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
                var AnnTriangleObject = (function (_super) {
                    __extends(AnnTriangleObject, _super);
                    function AnnTriangleObject() {
                        _super.call(this);
                        this.isClosed = true;
                        this.setId(-99);
                        this.tag = null;
                    }
                    AnnTriangleObject.prototype.create = function () {
                        return new AnnTriangleObject();
                    };
                    return AnnTriangleObject;
                }(lt.Annotations.Core.AnnPolylineObject));
                AnnotationsDemo.AnnTriangleObject = AnnTriangleObject;
            })(AnnotationsDemo = Basic.AnnotationsDemo || (Basic.AnnotationsDemo = {}));
        })(Basic = Demos.Basic || (Demos.Basic = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));

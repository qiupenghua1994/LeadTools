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
                var AnnTriangleRenderer = (function (_super) {
                    __extends(AnnTriangleRenderer, _super);
                    function AnnTriangleRenderer() {
                        _super.call(this);
                    }
                    AnnTriangleRenderer.prototype.render = function (mapper, annObject) {
                        _super.prototype.render.call(this, mapper, annObject);
                        if (annObject.tag !== "drawing")
                            return;
                        var engine = _super.prototype.get_renderingEngine.call(this);
                        if (engine) {
                            var context = engine.context;
                            if (context) {
                                context.save();
                                var points = mapper.pointsFromContainerCoordinates(annObject.points.toArray(), annObject.fixedStateOperations);
                                lt.Annotations.Rendering.AnnHtml5RenderingEngine.setStroke(context, lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create('green'), lt.LeadLengthD.create(1)));
                                context.beginPath();
                                for (var x = 0; x < points.length; x++) {
                                    var point = points[x];
                                    if (!point.isEmpty) {
                                        var rect = lt.LeadRectD.create(point.x - 10, point.y - 10, 20, 20);
                                        lt.Annotations.Rendering.AnnHtml5RenderingEngine.drawEllipse(context, rect);
                                    }
                                }
                                context.stroke();
                                context.closePath();
                                context.restore();
                            }
                        }
                    };
                    AnnTriangleRenderer.prototype.renderNote = function (mapper, annObject, operations) { return; };
                    AnnTriangleRenderer.prototype.renderSelection = function (mapper, annObject) { return; };
                    return AnnTriangleRenderer;
                }(lt.Annotations.Rendering.AnnPolylineObjectRenderer));
                AnnotationsDemo.AnnTriangleRenderer = AnnTriangleRenderer;
            })(AnnotationsDemo = Basic.AnnotationsDemo || (Basic.AnnotationsDemo = {}));
        })(Basic = Demos.Basic || (Demos.Basic = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));

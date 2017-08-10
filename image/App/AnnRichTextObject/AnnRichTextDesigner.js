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
                var AnnRichTextDrawDesigner = (function (_super) {
                    __extends(AnnRichTextDrawDesigner, _super);
                    function AnnRichTextDrawDesigner(automationControl, container, annRichTextObject) {
                        _super.call(this, automationControl, container, annRichTextObject);
                    }
                    return AnnRichTextDrawDesigner;
                }(lt.Annotations.Designers.AnnRectangleDrawDesigner));
                AnnotationsDemo.AnnRichTextDrawDesigner = AnnRichTextDrawDesigner;
                var AnnRichTextEditDesigner = (function (_super) {
                    __extends(AnnRichTextEditDesigner, _super);
                    function AnnRichTextEditDesigner(automationControl, container, annRichTextObject) {
                        _super.call(this, automationControl, container, annRichTextObject);
                    }
                    return AnnRichTextEditDesigner;
                }(lt.Annotations.Designers.AnnRectangleEditDesigner));
                AnnotationsDemo.AnnRichTextEditDesigner = AnnRichTextEditDesigner;
            })(AnnotationsDemo = Basic.AnnotationsDemo || (Basic.AnnotationsDemo = {}));
        })(Basic = Demos.Basic || (Demos.Basic = {}));
    })(Demos = lt.Demos || (lt.Demos = {}));
})(lt || (lt = {}));
